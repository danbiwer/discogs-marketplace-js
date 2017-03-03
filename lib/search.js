/*
Discogs Marketplace API
Author: Daniel Biwer (danbiwer@gmail.com)
*/

'use strict'
var util = require('./util.js');
var marketplace = module.exports = {};


marketplace.search = function(params, callback){
	util.generateResult(params, callback);
}

//type (optional) can be master, release, label.
//depreciated
marketplace.searchByID = function(params, callback){
	if(typeof params === "string"){//treat params as exact string id
		var id = params;
		params = new Object();
		if(id[0] == 'm')
			params.type = "master";
		else if(id[0] == 'r')
			params.type = "release";
		else if(id[0] == 'l')
			params.type = "label";
		else
			return callback(new Error("Invalid id."));

		id = id.substr(1);

		if(isNaN(id))
			return callback(new Error("Invalid id."));

		params.id = id;
	}
	else if(typeof params !== "object")
		return callback(new Error("Invalid parameters"));
	util.generateResult(params, callback);
}

//params can be object or string literal
//depreciated
marketplace.searchByString = function(params, callback){
	if(typeof params === "string"){
		var id = params;
		params = new Object();
		params.id = id;
		params.type = "string";
	}
	else if(typeof params !== "object")
		return callback(new Error("Invalid parameters"));
	util.generateResult(params, callback);
}
