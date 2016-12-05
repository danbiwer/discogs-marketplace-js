/*
Discogs Marketplace API
Author: Daniel Biwer (danbiwer@gmail.com)
*/

'use strict';
var cheerio = require('cheerio');
var request = require('request');

var util = module.exports = {};


util.processBody = function(body){
	var result = new Object();
	var pagination = new Object();
	var listing = new Array();
	var $ = cheerio.load(body);
	var paginationBody = $(".pagination.bottom").get();
	pagination = util.processPaginationResponse(paginationBody);
	$(".shortcut_navigable").each(function(i, obj){
		var item = util.processItem(obj);
		listing.push(item);
	});
	result.pagination = pagination;
	result.listing = listing;
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
	return item;
}

util.processPaginationResponse = function(obj){
	var $ = cheerio.load(obj);
	var result = new Object();
	var tempString = $(".pagination_total").text().split("of")[1].trim();
	result.items = parseFloat(tempString.replace(',',""));
	result.hasNext = $(".pagination_next").is("a");
	return result;
}

util.generateResult = function(path, callback){
	var options = {
		url: path,
		headers: {
			'User-Agent': 'DiscogsMarketAPI/1.0'
		}
	};

	function call_result(error, response, body){
		var result;
		result = util.processBody(body);
		if(typeof callback === "function"){
			callback(result);
		}
		else{
			return new Promise(function(resolve, reject){
				if(response)
					p.resolve(response);
			});
		}
	}
	request(options,call_result);
}

util.buildPath = function(id, type, filters, pagination){
	var path = "https://www.discogs.com/sell/list?";
	if(type == "string")
		path = path.concat("q=",id);
	else if(type == "master")
		path = path.concat("master_id=",id);
	else if(type == "release")
		path = path.concat("release_id=",id);
	else if(type == "label")
		path = path.concat("label_id=",id);
	else
		return null;
	path = util.returnQueryString(path);
	if(pagination)
		path += "&" + util.processPagination(pagination);
	if(filters)
		path += "&" + util.processFilters(filters);
	return path;
}

util.processFilters = function(filters){
	var filterString = [];
	for(var property in filters){
		filterString.push(util.handleFilterProperty(property, filters[property]));
	}
	return filterString.join('&');
}

util.handleFilterProperty = function(key,value){
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
