/*
Discogs Marketplace API
Author: Daniel Biwer (danbiwer@gmail.com)
*/

'use strict';
var util = require('./util.js');
var marketplace = module.exports = {};

//type (optional) can be master, release, label.
marketplace.searchByID = function(params, callback){
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
marketplace.searchByString = function(params, callback){
	var id, type, filters;
	if(typeof params === "object"){//handle params object
		id = params.id;
		type = params.type;
		filters = params.filters;
	}
	else if(typeof params === "string"){
		id = params;
	}
	var path = util.buildPath(id, "string", filters);
	util.generateResult(path, callback);
}
