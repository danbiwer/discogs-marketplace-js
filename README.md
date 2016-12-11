# DiscogsMarketplace.js

JavaScript library to pull information from the Discogs marketplace.  Returns an object.


##Usage

####Init

````javascript
var marketplace = require('DiscogsMarketplace-js');
````

####Search By ID

````javascript
marketplace.searchByID('m1234', function(result){
	if(typeof result !== error)
		console.log(result);
});
````

####Search By String

````javascript
marketplace.searchByID("Black Sabbath", function(result){
	if(typeof result !== error)
		console.log(result);
});
````

####Filters/Pagination
To specify search filters and pagination options, DiscogsMarketplace.js will accept an object as an input.

````javascript
var search_parameters = {
	id: "1067610", //id can also be a string
	type: "release",
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
	if(typeof result !== error)
		console.log(result);
});
````

####Result

````
{ 
	pagination: { 
		items: 24, 
		hasNext: false 
	},
  	listing: 
   	[ { title: 'JC Freaks - Number One (12")',
       condition_sleeve: 'Very Good Plus (VG+)',
       condition_media: 'Very Good Plus (VG+)',
       seller: 'IMP_RECORDS',
       ships_from: 'Greece',
       price: '€15.00' },
     { title: 'JC Freaks - Number One (12")',
       condition_sleeve: 'Near Mint (NM or M-)',
       condition_media: 'Near Mint (NM or M-)',
       seller: 'nobodycandestroyme',
       ships_from: 'Germany',
       price: '€6.00' }
    ]
}
````


##Installation
[![NPM](https://nodei.co/npm/discogs_marketplace_api.png)](https://nodei.co/npm/discogs_marketplace_api/)

## TODO:
* Add total page numbers to result object
* Add ability to return a promise when no callback is provided
* Add rate-limiting features
