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

DMS.searchByID(search_parameters, function(result){
	if(typeof result !== error)
		console.log(result);
});
````


##Installation
[![NPM](https://nodei.co/npm/discogs_marketplace_api.png)](https://nodei.co/npm/discogs_marketplace_api/)

## TODO:
* Add total page numbers to result object
* Add ability to return a promise when no callback is provided
* Add rate-limiting features
