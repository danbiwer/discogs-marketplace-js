# discogs-marketplace-js

JavaScript library to pull information from the Discogs marketplace.  Returns an object.


## Usage

#### Init

````javascript
var marketplace = require('discogs-marketplace-js');
````

#### Search
````javascript
var search_parameters = {
	id: "Black Sabbath",
	type: "string",
	pagination : {
		page: 1
	}
}

marketplace.search(search_parameters, function(result){
	if(!(result instanceof Error))
		console.log(result);
});
````


#### Filters/Pagination
To specify search filters and pagination options, discogs-marketplace-js will accept an object as an input.

````javascript
var search_parameters = {
	id: "1067610", //id can also be a string, if used with type 'string'
	type: "release", //one of: 'release', 'master', 'label', 'string'
	filters: {
		genre: "Rock",
		style: null,
		format: "Vinyl",
		country: "US",
		decade: null,
		condition: ["Very Good Plus", "Mint"],
		year: 2015,
		currency: "USD",
	},
	pagination: {
		page: 1,
		per_page: 25,
		sort: "Price Lowest Highest"
	}
};
````

#### Result

````
{
	id: '1067610',
	type: 'master',
	pagination: 
	{ 
		items: 1112, 
		hasNext: true
		totalPages : 0 
	},
  	listing: 
   	[ 
   		{	
   			title: 'Black Sabbath - Black Sabbath (8-Trk, Album)',
       		condition_sleeve: 'Very Good (VG)',
	       	condition_media: 'Very Good (VG)',
	       	seller: 'easeup',
	       	ships_from: 'United States',
	       	price: '$45.00' 
	   },
	   { 
	   		title: 'Black Sabbath - Black Sabbath (2xLP, Album, Dlx, RE, RM, 180)',
		    condition_sleeve: 'Near Mint (NM or M-)',
		    condition_media: 'Near Mint (NM or M-)',
		    seller: 'fishtown19125',
		    ships_from: 'United States',
		    price: '$35.00' 
		}
	]
}
````


## Installation
[![NPM](https://nodei.co/npm/discogs-marketplace-js.png)](https://nodei.co/npm/discogs-marketplace-js/)

## TODO:
* Add ability to return a promise when no callback is provided
* Add rate-limiting features
