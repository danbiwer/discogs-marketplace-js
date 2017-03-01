# discogs-marketplace-js

JavaScript library to pull information from the Discogs marketplace.  Returns an object.


##Usage

####Init

````javascript
var marketplace = require('discogs-marketplace-js');
````

####Search By ID

*Note*: Prefix the release ID with one of the following:

- `m` for Master Release
- `r` for Release
- `l` for Label

````javascript
marketplace.searchByID('m1234', function(result){
	if(!(result instanceof Error))
		console.log(result);
});
````

####Search By String

````javascript
marketplace.searchByString("Black Sabbath", function(result){
	if(!(result instanceof Error))
		console.log(result);
});
````

####Filters/Pagination
To specify search filters and pagination options, discogs-marketplace-js will accept an object as an input.

````javascript
var search_parameters = {
	id: "1067610", //id can also be a string
	type: "release", //one of: 'release', 'master', 'label'
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

marketplace.searchByID(search_parameters, function(result){
	if(typeof result !== Error)
		console.log(result);
});
````

####Result

````
{
	id: '1067610',
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


##Installation
[![NPM](https://nodei.co/npm/discogs-marketplace-js.png)](https://nodei.co/npm/discogs-marketplace-js/)

## TODO:
* Add id from params to result object
* Add total page numbers to result object
* Add ability to return a promise when no callback is provided
* Add rate-limiting features
