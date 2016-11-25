/*
Discogs Marketplace API
Author: Daniel Biwer (danbiwer@gmail.com)
*/
'use strict';
var util = require('./util.js');

var path = "https://www.discogs.com/sell/release/1067610";
var path = "https://www.discogs.com/sell/list?master_id=655666&ev=mb";
var path = "https://www.discogs.com/sell/list?artist_id=39765&ev=ab";

var id_params = {
	id: "1067610",
	type: "release",
	filters: null
};

//type (optional) can be master, release, label.
function searchByID(params, callback){
	var id, type, filters;
	if(typeof params === "object"){//handle params object
		id = params.id;
		type = params.type;
		filters = params.filters;
	}
	else if(typeof params === "string"){//treat params as exact string id
		id = params;
		if(id[0] == 'm')
			type = "master";
		else if(id[0] == 'r')
			type = "release";
		else if(id[0] == 'l')
			type = "label";
		else return null;
		id = id.substr(1);
	}
	var path = util.buildPath(id,type,filters);
	util.generateResult(path, callback);
}

//params can be object or string literal
function searchByString(params, callback){
	var path = util.buildPath(id, "string", filters);
	util.generateResult(path, callback);
}

function print_test(result){
	console.log(result);
}


//look up how a promise is used
//searchByString("black sabbath", "filter");
searchByID(id_params, print_test);