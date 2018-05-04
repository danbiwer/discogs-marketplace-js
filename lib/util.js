/*
Discogs Marketplace API
Author: Daniel Biwer (danbiwer@gmail.com)
*/

'use strict';
var cheerio = require('cheerio');
var request = require('request');

var util = module.exports = {};


util.processBody = function(body, params){
	var result = new Object();
	var pagination = new Object();
	var listing = new Array();
	var $ = cheerio.load(body);
	var paginationBody = $(".pagination.bottom").get();
	pagination = util.processPaginationResponse(paginationBody, params);
	$(".shortcut_navigable").each(function(i, obj){
		var item = util.processItem(obj);
		listing.push(item);
	});
	result.pagination = pagination;
	result.listing = listing;
	result.id = params.id;
	result.type = params.type;
	return result;
}

util.processItem = function(obj){
	var $ = cheerio.load(obj);
	var item = new Object();
	item.title = $(".item_description_title").text();
	item.condition_sleeve = $(".item_sleeve_condition").text();
	item.condition_media = $(".item_condition span").eq(2).text().trim();
	item.seller = $(".seller_info a").eq(0).text();
	item.ships_from = $(".seller_info li").eq(2).text().replace("Ships From:","");
	item.price = $(".price").eq(0).text();
  
	var community_result = $(".community_summary").children(".community_result");
	item.community_have =
		community_result.children(".have_indicator")
		.children(".community_number").text().trim();
	item.community_want =
		community_result.children(".want_indicator")
		.children(".community_number").text().trim();

	item.release_link = $(".item_release_link").eq(0).attr('href');

	return item;
}

util.processPaginationResponse = function(obj, params){
	var $ = cheerio.load(obj);
	var result = new Object();
	var tempString = $(".pagination_total").text().split("of")[1].trim();
	var totalItems = parseFloat(tempString.replace(',',"")) || 0;
	var perPage = (params.pagination && params.pagination.per_page) || 25;
	result.items = totalItems;
	result.hasNext = $(".pagination_next").is("a");
	result.totalPages = Math.ceil((totalItems / perPage));
	return result;
}

util.generateResult = function(params, callback){
	var options = {
		url: util.buildPath(params),
		headers: {
			'User-Agent': 'DiscogsMarketAPI/1.0'
		}
	};

	function call_result(error, response, body){
		var result;
		if(error)
			result = error;
		result = util.processBody(body, params);
		callback(result);
	}
	request(options,call_result);
}

util.buildPath = function(params){
	var path = "https://www.discogs.com/sell/list?";
	if(typeof params.seller !== 'undefined')
		path = "https://www.discogs.com/seller/" + params.seller + "/profile?"

	if(params.type == "string")
		path = path.concat("q=",params.id);
	else if(params.type == "master")
		path = path.concat("master_id=",params.id);
	else if(params.type == "release")
		path = path.concat("release_id=",params.id);
	else if(params.type == "label")
		path = path.concat("label_id=",params.id);

	path = util.returnQueryString(path);
	if(params.pagination)
		path += "&" + util.processPagination(params.pagination);
	if(params.filters)
		path += "&" + util.processFilters(params.filters);
	return path;
}

util.processFilters = function(filters){
	var filterString = [];
	for(var property in filters){
		filterString.push(util.handleFilterProperty(property, filters[property]));
	}
	return filterString.join('&');
}

util.handleFilterProperty = function(key, value){
	var tag;
	if(Array.isArray(value)){
		tag = [];
		for(var v in value){
			tag.push(key + '=' + util.returnQueryString(value[v]));
		}
		return tag.join('&');
	}
	else{
		tag = key + "=" + util.returnQueryString(value);
		return tag;
	}
}

util.returnQueryString = function(value){
	if(typeof value === "string"){
		var customURI = value.replace(/\s/g, '+');
		customURI = encodeURI(customURI);
		return customURI;
	}
	else return value;
}

util.processPagination = function(pagination){
	var page = null;
	var sort = null;
	var per_page = null;
	var tag = [];

	switch(pagination.sort){
		case "Listed Newest":
			sort = "sort=listed%2Cdesc";
			break;
		case "Listed Oldest":
			sort = "sort=listed%2Casc";
			break;
		case "Condition (M)-(P)":
			sort = "sort=condition%2Cdesc";
			break;
		case "Condition (P) - (M)":
			sort = "sort=condition%2Casc";
			break;
		case "Artist A-Z":
			sort = "sort=artist%2Casc";
			break;
		case "Artist Z-A":
			sort = "sort=artist%2Cdesc";
			break;
		case "Title A-Z":
			sort = "sort=title%2Casc";
			break;
		case "Title -A":
			sort = "sort=title%2Cdesc";
			break;
		case "Label A-Z":
			sort = "sort=label%2Casc";
			break;
		case "Label Z-A":
			sort = "sort=label%2Cdesc";
			break;
		case "Seller A-Z":
			sort = "sort=seller%2Casc";
			break;
		case "Seller Z-A":
			sort = "sort=seller%2Cdesc";
			break;
		case "Price Lowest Highest":
			sort = "sort=price%2Casc";
			break;
		case "Price Highest Lowest":
			sort = "sort=price%2Cdesc";
			break;
		default://Price Lowest to Highest
			sort = "sort=price%2Casc";
		}

		if(sort != null){
			tag.push(sort);
		}

		switch(pagination.per_page){
			case 25:
				per_page = "limit=25";
				break;
			case 50:
				per_page = "limit=50";
				break;
			case 100:
				per_page = "limit=100";
				break;
			case 250:
				per_page = "limit=250";
				break;
			default:
				per_page = "limit=25";
		}

		tag.push(per_page);

		page = "page=" + pagination.page;
		tag.push(page);

		return tag.join('&');

}
