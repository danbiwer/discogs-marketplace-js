/*
Discogs Marketplace API
Author: Daniel Biwer (danbiwer@gmail.com)
*/
'use strict';
var request = require('request');
var cheerio = require('cheerio');

var path = "https://www.discogs.com/sell/release/1067610";
var path = "https://www.discogs.com/sell/list?master_id=655666&ev=mb";
var path = "https://www.discogs.com/sell/list?artist_id=39765&ev=ab";

//type (optional) can be master, release, label, everything, id.  Defaults to id.
function searchByID(id, type, filters){
	var path = "https://www.discogs.com/sell/list?q=";
	if(typeof type === "undefined"){

	}
	path = path + id;
}

//type (optional) can be search, id. Default to id
function searchByString(id, filters){
	var path = "https://www.discogs.com/sell/list?q=";
}

//todo: handle paging
function generateResult(path){
	request(path, function(error, response, body){
		var result = new Object();
		//add result to statistics
			//have, want, ratings, median, lowest, highest, etc.
		var statistics = new Object();//this doesn't work for master search
		var listing = new Array();
		var $ = cheerio.load(body);
		statistics.have = $("#statistics").find("li .coll_num").text();
		statistics.want = $("#statistics").find("li .want_num").text();
		statistics.avg_rating = $("#statistics").find("li .rating_value").text();
		statistics.rating_num = $("#statistics").find("li .rating_count").text();
		$(".shortcut_navigable").each(function(i, obj){
			var item = processItem(obj);
			listing.push(item);
		});
		result.statistics = statistics;
		result.listing = listing;
		console.log(result);
		//return result;
	});
}

function processItem(obj){
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
//look up how a promise is used
generateResult(path);