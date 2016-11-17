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
util.generateResult = function(path){
	request(path, function(error, response, body){
		var result = util.processBody(body);
		console.log(result);
	});
}