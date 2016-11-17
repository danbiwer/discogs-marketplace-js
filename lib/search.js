/*
Discogs Marketplace API
Author: Daniel Biwer (danbiwer@gmail.com)
*/
'use strict';
var util = require('./util.js');

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


//look up how a promise is used
util.generateResult(path);