/*
Discogs Marketplace API
Author: Daniel Biwer (danbiwer@gmail.com)
*/

var request = require('request');
var cheerio = require('cheerio');

var path = "https://www.discogs.com/sell/release/1067610";
//var path = "https://www.discogs.com/sell/list?master_id=655666&ev=mb";

function generateUrl(){

}

function generateResult(path){
	request(path, function(error, response, body){
		var result = new Object();
		//add result to statistics
			//have, want, ratings, median, lowest, highest, etc.
		var listing = new Array();
		var $ = cheerio.load(body);
		$(".shortcut_navigable").each(function(i, obj){
			var item = new Object();
			item.title = $(obj).find(".item_description_title").text();
			item.condition_sleeve = $(obj).find(".item_sleeve_condition").text();
			item.condition_media = $(obj).find(".item_condition span").eq(2).text().trim();
			
			//seller info
			//ships from
			//price
			//shipping?
			listing.push(item);
		});
		result.listing = listing;
		console.log(result);
		//return result;
	});
}
//look up how a promise is used
generateResult(path);