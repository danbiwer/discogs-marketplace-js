/*
Discogs Marketplace API
Author: Daniel Biwer (danbiwer@gmail.com)
*/
'use strict';
var util = require('./util.js');

var path = "https://www.discogs.com/sell/release/1067610";
var path = "https://www.discogs.com/sell/list?master_id=655666&ev=mb";
var path = "https://www.discogs.com/sell/list?artist_id=39765&ev=ab";

//type (optional) can be master, release, label.  Defaults to id.
function searchByID(id, type, filters){
	if(typeof type === "object"){//type actually holds filters
		//console.log("hit");
		filters = type;
		type = undefined;
	}
	if(typeof type === "undefined"){//type is undefined
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
	//console.log(path);
	util.generateResult(path);
}

//type (optional) can be search, id. Default to id
function searchByString(id, filters){
	var path = util.buildPath(id, "string", filters);
	util.generateResult(path);
}


//look up how a promise is used
//searchByString("black sabbath", "filter");
searchByID("r1067610", {object: "true"});