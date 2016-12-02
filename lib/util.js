'use strict';
var cheerio = require('cheerio');
var request = require('request');

var util = module.exports = {};


util.processBody = function(body){
	var result = new Object();
	var statistics = new Object();//this doesn't work for master search
	var listing = new Array();
	var $ = cheerio.load(body);
	statistics.have = $("#statistics").find("li .coll_num").text();
	statistics.want = $("#statistics").find("li .want_num").text();
	statistics.avg_rating = $("#statistics").find("li .rating_value").text();
	statistics.rating_num = $("#statistics").find("li .rating_count").text();
	$(".shortcut_navigable").each(function(i, obj){
		var item = util.processItem(obj);
		listing.push(item);
	});
	result.statistics = statistics;
	result.listing = listing;
	return result;
}

util.processItem = function(obj){
	var $ = cheerio.load(obj);
	var item = new Object();
	item.title = $(obj).find(".item_description_title").text();
	item.condition_sleeve = $(obj).find(".item_sleeve_condition").text();
	item.condition_media = $(obj).find(".item_condition span").eq(2).text().trim();
	item.seller = $(obj).find(".seller_info a").eq(0).text();
	item.ships_from = $(obj).find(".seller_info li").eq(2).text().replace("Ships From:","");
	item.price = $(obj).find(".price").eq(0).text();
	return item;
}

//todo: handle paging
util.generateResult = function(path, callback){
	var options = {
		url: path,
		headers: {
			'User-Agent': 'DiscogsMarketAPI/1.0'
		}
	};

	function call_result(error, response, body){
		var result = util.processBody(body);
		//console.log(result);
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

util.buildPath = function(id, type, filters){
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
	path = util.returnCustomURI(path);
	return path;
}

util.processFilters = function(filters){
	var filterString = [];
	for(var property in filters){
		//console.log(property);
		filterString.push(util.handleFilterProperty(property, filters[property]));
	}
	return filterString.join('&');
}

util.handleFilterProperty = function(key,value){//good opportunity to try using inheritence/prototypes
	var tag;
	if(Array.isArray(value)){
		tag = [];
		for(var v in value){
			tag.push(key + '=' + util.returnCustomURI(value[v]));
		}
		//console.log(tag);
		return tag.join('&');
	}
	else{
		tag = key + "=" + util.returnCustomURI(value);
		//console.log(tag);
		return tag;
	}
}

util.returnCustomURI = function(value){
	if(typeof value === "string"){
		var customURI = value.replace(/\s/g, '+');
		customURI = encodeURI(customURI);
		return customURI;
	}
	else return value;
}
