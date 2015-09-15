var SparqlClient = require('sparql-client');
var util = require('util');
var mongo = require('mongodb');
var db = require('mongoskin').db('mongodb://localhost:27017/destination_data');
var fs = require('fs');
	var endpoint = 'http://dbpedia.org/sparql';
	var client = new SparqlClient(endpoint);

/*
var file_location_codes = "./database/location_destination.txt";
var file_locations_new = "./database/locations_new.txt";
var file_locations = "./database/locations.txt";
*/

/*
function getLocation(location,callback){
    var collection = db.collection('destinationCollection');
    collection.findOne({location:location},function(e,docs){
        callback(e,docs);
    });
}

function getResults(query,callback){
    var collection = db.collection('keywordCollection');
    console.log(query);
    var keyword_query = {"keyword":{"$in":["cold"]}};
    collection.find(keyword_query).toArray(function(err,data){
        //callback(e,docs);
        if(err){
        	callback(err);
        }else{
        	callback(data);
        }

    });
}

function getRoutes(departure_location,callback){
    var collection = db.collection('routesCollection');


    collection.findOne({location:departure_location},function(e,docs){
        callback(e,docs);
    });
}
*/

function fetch(query,collectionName,callback){
    var collection = db.collection(collectionName);
    
    collection.find(keyword_query).toArray(function(err,data){
        //callback(e,docs);
        if(err){
        	callback(err,null);
        }else{
        	callback(null,data);
        }

    });
}

module.exports = {

	getResults: function(query,callback){
		var keyword_query = {"keyword":{"$in":query.locations}};
		fetch(keyword_query,"keywordCollection",function(err,results){
			callback(err,results);
		});
	}
}

/*
//first create a collection of location ->destination objects so we know which routes we can query
function addFlightRoutes(callback){
	// read in location_destination.txt and store in database
	console.log("accessing location/destination routes from file");
	readFile(file_location_codes,function(err,data){
		if(err){
			console.log("error when retrieving location/destination routes from file: "+ err);
			callback(err);
		}else{
			//split input file into lines
			var line_data = data.split(/\r?\n/);

			//an object holding the 3 possible departure locations and an array for destinations
			var flight_routes = [
				{
					location: "JNB",
					destinations:[]
				},
				{
					location: "CPT",
					destinations:[]
				},
				{
					location: "DUR",
					destinations:[]
				}
				]
			

			//going through our list of location->destination data, push a destination that belongs to a departure location
			for(var i in line_data){
				var locations = line_data[i].split(" ");
				if (locations[0] === "JNB"){
					flight_routes[0].destinations.push(locations[1]);
				}else if(locations[0] === "CPT"){
					flight_routes[1].destinations.push(locations[1]);
				}else{
					flight_routes[2].destinations.push(locations[1]);
				}
			}

			//add our flight routes data to the database


			// Set our collection
		    var collection = db.collection('routesCollection');

		    collection.findOne({},function(err,data){
        		if(err){
        			callback(err);
        		}else{
        			//if we already have items in the collection
        			if(data){
						callback("routesCollection already populated, if you wish to re-populate, drop the collection.");
        			}
        			else{
        				//if it's empty we add our routes
        				collection.insert(flight_routes, function(err, data) {
						    if (err){ 
						    	callback(err);
						    }
						    if (data){
						    	callback(null);
						    }
						});
        			}
        		}
    		});
			
		}
	});

}*/

/*
//checks if an object is in an array
function inArray(array,object,key){
	for(var i =0; i< array.length; i++){
		if (array[i][key] === object[key]){
			return true
		}
	}
	return false;
}
*/

/*
//Create a collection of the possible destinations that we can populate with more information
function addFlightDestinations(callback){
	console.log("accessing destinations from file");
	readFile(file_location_codes,function(err,data){
		if(err){
			console.log("error when retrieving desination codes from file: "+ err);
			callback(null,err);
		}else{
			var line_data = data.split(/\r?\n/);

			
			var destinations = [];

			//create destination array with no duplicates
			for(var i in line_data){
				var locations = line_data[i].split(" ");
				var destination = locations[1];
				if (!(inArray(destinations,{location:destination},"location"))){
					destinations.push({location:destination});
				}
			}

			callback(null,destinations);

			
		}
	});
}*/


/*
// get location name, country and continent name and add to available destinations
function addDestinationDetails(destinations,callback){
	console.log("accessing destination information from file");
	readFile(file_locations,function(err,data){
		if(err){
			console.log("error when retrieving desination information from file: "+ err);
			callback(err,null);
		}else{
			//split input file into lines
			var line_data = data.split(/\r?\n/);

			

			for(var i =0; i< line_data.length; i++){
				var line = line_data[i].split("-");

				//no extra info
				if(line.length === 3){
					var location_name = line[0].trim();
					var code = line[1].trim();
					var country = line[2].trim();

					//check code against each destination and add to destinations array
					for(var j=0; j<destinations.length; j++){
						destinations[j].keywords = [];
						if(destinations[j].location === code){
							destinations[j].location_name = location_name;
							destinations[j].country = country;

						}
					}
				}

				//do extra info steps here
			}

			//get additional location information that wasnt on travelstarts website. Only updates sites that have none
			console.log("accessing destination information from file2");
			readFile(file_locations_new,function(err,data){
				if(err){
					console.log("error when retrieving desination information from file: "+ err);
					callback(err,null);
				}else{
					//split input file into lines
					var line_data = data.split(/\r?\n/);

					

					for(var i =0; i< line_data.length; i++){
						var line = line_data[i].split(/[	]+/);
						




						//no extra info
						if(line.length === 3){

							//remove any extra information that is displayed next to name (comma)
							var line_comma = line[0].split(",");
							if(line_comma.length>0){
								line[0]=line_comma[0];
							}

							//TODO: check alternative names in brackets

							//console.log(line);
							var location_name = line[0].trim();
							var code = line[2].trim();
							var country = line[1].trim();
							
							//check code against each destination and add to destinations array
							for(var j=0; j<destinations.length; j++){
								//destinations[j].keywords = [];
								if(destinations[j].location === code){
									//wasnt found in prev file but was found in this file
									if(!destinations.location_name){
										destinations[j].location_name = location_name;
										destinations[j].country = country;
									}


								}
							}
						}

						//do extra info steps here
					}

					callback(null,destinations);

				}

			});

			//callback(null,destinations);

		}

	});
}
*/


/*
function readFile(filename, callback){
	fs.readFile(filename, 'utf8', function(err, data) {
		if (err){
			callback(err,null);
		}else{
			callback(null,data);
		}
	});
}*/


/*
function addKeywordCollection(location,keyword,callback){
	// Set our collection
    var collection = db.collection('keywordCollection');

    //attempt to find a match for the keyword and the location
    collection.findOne({keyword:keyword,location:location},function(err,data){
    	
    	if(err){
    		callback(err);
    	}else{
    		//if found update weight
    		if(data){
    			collection.update({keyword:keyword,location:location}, {'$set':{"weight":data.weight+=1}}, function(err) {
    				if(err){
    					callback(err);
    				}else{
    					callback(null);
    				}

    			});
    		}else{
    		//if not found add to database
    			collection.insert({keyword:keyword, location:location,weight:5}, function(err) {
    				if (err){
    					callback(err);
    				}else{
    					console.log("added new keyword-location pair to database");
    					callback(null);
    				}
    			});
    		}
    	}

    });


}
*/



/*
function addKeywords(locations,keywords){
	//add such keywords to the location (if given location) and normalize weighting
	for(var i = 0; i<locations.length; i++ ){
		//update location collection
		for(var j=0; j<keywords.length; j++){
			addKeywordCollection(locations[i],keywords[j],function(err){
				if(err){
					console.log(err);
				}else{
					console.log("successfully added a keyword to the keywordCollection")
				}
			});


		}
		//find location, if found, add to keywords.
		//Note we're not so worried about the async nature here, this can take as long as it wants.

		//update keyword collection
	}
}
*/



/*
//get image montages for all our destinations from DBPEDIA
//locations: [{location: "NYC", location_name: "New York City",keywords:[]}]
function populateImageAddresses(locations,callback){

	//first construct our DBPEDIA query for all our locations
	//example shortened query:
	/*
	SELECT * {
    {
        SELECT ?s ?q WHERE {
            ?s <http://dbpedia.org/property/name> "Cape Town"@en;
               foaf:depiction ?q
        }
    } UNION {
        SELECT ?s ?q WHERE {
            ?s <http://dbpedia.org/property/name> "Athens"@en;
               foaf:depiction ?q
        }
    }
    
	





	//we have to make multiple queries cause dbpedia limits us to about 200 unions, we have about 600 locations

	var querys = [];
	var query_start = "SELECT * { ";
	var query_end = "}";

	//how many queries we need to make
	var query_count = Math.ceil((locations.length)/200);


	//cycle through query_count
	//if i== to query count, set limits to the length

	for(var i = 0; i< query_count; i++){
		//add the start of the query
		querys.push(query_start);

		var j_end;
		var j_start = i*200;
		//we are creating the last query
		if(i == query_count-1){
			j_end = locations.length;
		}else{
			j_end = (i+1)*200;
		}


		//for each set of locations update the corresponding i'th query

		for(var j= j_start; j< j_end; j++){
			if(j!=j_end-1)
				if(locations[j].location_name)
				querys[i] += " { SELECT ?s ?q WHERE { ?s <http://dbpedia.org/property/name> " + "\""+locations[j].location_name + "\"" +"@en; foaf:depiction ?q } } UNION"

			if(j==j_end-1)
				querys[i] += " { SELECT ?s ?q WHERE { ?s <http://dbpedia.org/property/name> " + "\""+locations[j].location_name + "\"" +"@en; foaf:depiction ?q } }"
		}

		querys[i]+=query_end;
		//console.log(querys[i]);

	}




    var collection = db.collection('destinationCollection');
    
    collection.findOne({},function(err,data){
		if(err){
			callback(err);
		}else{
			//if we already have items in the collection
			if(data){
				callback("destinationCollection already populated, if you wish to re-populate, drop the collection.");
			}
			else{
				//if it's empty we add our destinations

				dbpediaQueries(querys,query_count,locations,function(err,updated_locations){
					if(err){
						callback(err);
					}else{

						collection.insert(updated_locations, function(err, data) {
						    if (err){ 
						    	callback(err);
						    }
						    if (data){
						    	callback(null);
						    }
						});
					}
				});




			}
		}
	});	
}
*/

/*
module.exports = {

	//get results from database based on a query incluyding locations and keywords
	retrieve: function(query, callback){
		console.log('database querying');
		
		query = {
				locations:["NYC","LON"],
				keywords:["cold","urban"]				
		}
		var locations = query.locations;
		var keywords = query.keywords;
		var results = [];
		console.log(locations);
		console.log(keywords);

		addKeywords(locations,keywords);


		//retrieve results for user
		//if(keywords){
		console.log("retrieving results for user")
		//var keyword = keywords[0];	
		getResults(query,function(err,docs){
			//fix order
			if(err){
				callback(null,err);
			}else{
				console.log(docs);
				callback(docs,null);

			}

		});


		
		//}

	},

	//for when a user selects one of the results, send through the location with keywords to add/update
	updateWeighting: function(query,callback){
		query = {
			location: "ROM",
			keywords:["Romantic","ancient"]
		}

		for(var i =0; i< query.keywords.length; i++){
			addKeywordCollection(query.location, query.keywords[i],function(err){
				if(err){
					console.log(err);
				}else{
					console.log("database updated with new keyword data");
				}
			})
		}
	},




	populate: function(callback){
		
		var endpoint = 'http://dbpedia.org/sparql';

		

		//add location->destination routes from text file
		addFlightRoutes(function(err){
			if(err){
				console.log(err);
			}
			else{
				console.log("successfuly added routes to the database");
			}
		});


		//initial population of database procedure
		addFlightDestinations(function(err,data){
			if(err){
				console.log(err);
			}
			else{
				addDestinationDetails(data,function(err,destinations){
					if (err){
						console.log(err);
					}else{
						console.log("successfuly added destinations and information to the database");

						//now add image urls to the the destinations and push them to the database
						populateImageAddresses(destinations,function(err){
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
	callback();
	}


};
*/






