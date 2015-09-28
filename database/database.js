var initialization = require('./initialization.js');
var retrieval = require('./retrieve.js');
var insertion = require('./insertion.js');
var updates = require('./updates.js');

function normalizeWeightsDaily(){
	updates.normalizeWeights()
}

module.exports = {


	//initial population of the database
	populate: function(callback){	
		var endpoint = 'http://dbpedia.org/sparql';		
		//add location->destination routes from text file
		initialization.addFlightRoutes(function(err){
			if(err){
				console.log(err);
			}
			else{
				console.log("successfuly added routes to the database");
			}
		});

		//normalize the weights once daily
		//86400000 ms
		setInterval(normalizeWeightsDaily,5000);

		initialization.addFlightData(function(err){

		});

		initialization.addKeywordWeightings(function(err){
			if(err){
				console.log(err);
			}
			else{
				console.log("successfuly added keywords to the database");
			}
		});

		//initial population of database procedure
		initialization.addFlightDestinations(function(err,data){
			if(err){
				console.log(err);
			}
			else{
				initialization.addDestinationDetails(data,function(err,destinations){
					if (err){
						console.log(err);
					}else{
						console.log("successfuly added destinations and information to the database");
						//now add image urls to the the destinations and push them to the database
						initialization.populateImageAddresses(destinations,function(err){
							if(err){
								console.log("error adding image addresses + information to database: "+err);
							}else{
								console.log("successfuly added destinations and information to the database");
							}
						});
					}
				});	
			}
		});
		//callback();
	},


	//get keywords from database
	retrieve: function(query, callback){
		console.log('database querying');

		console.log(query);
		//when we do a retrieval that contains locations and keywords, we do the lowest possible weight change
		var weight_change = 1;

		var locations = query.locations;
		var keywords = query.keywords;

		if(locations && keywords)
		insertion.addKeywords(query.locations,query.keywords,weight_change);

		//retrieve results for user
		console.log("retrieving results for user")
		//get results and send them back for ranking
		retrieval.getResults(query,function(err,docs){
			if(err){
				callback(null,err);
			}else{
				console.log(docs.keywords);
				callback(docs,null);
			}
		});
	},

	getLocationInfo: function(query,callback){
		retrieval.getLocations(query,function(err,docs){
			if(err){
				callback(err,null);
			}else{
				//console.log(docs);
				callback(null,docs);
			}
		});
	},

	//for when a user selects one of the results, send through the location with keywords to add/update
	updateWeighting: function(query){
		query = {
			location: "ROM",
			keywords:["Romantic","ancient"]
		}
		var weight_change = 2;
		for(var i =0; i< query.keywords.length; i++){
			insertion.addKeywordCollection(query.location, query.keywords[i],weight_change,function(err){
				if(err){
					console.log(err);
				}else{
					console.log("database updated with new keyword data");
				}
			})
		}
	},

	//for when a user types in a keyword for a location
	updateWeightingUser: function(query){
		query = {
			location: "ROM",
			keywords:["Romantic","ancient"]
		}
		var weight_change = 3;
		for(var i =0; i< query.keywords.length; i++){
			insertion.addKeywordCollection(query.location, query.keywords[i],weight_change,function(err){
				if(err){
					console.log(err);
				}else{
					console.log("database updated with new keyword data");
				}
			})
		}
	}
};