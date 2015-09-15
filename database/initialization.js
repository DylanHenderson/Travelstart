var SparqlClient = require('sparql-client');
var util = require('util');
var mongo = require('mongodb');
var db = require('mongoskin').db('mongodb://localhost:27017/destination_data');
var fs = require('fs');
var endpoint = 'http://dbpedia.org/sparql';
var client = new SparqlClient(endpoint);

var file_location_codes = "./database/location_destination.txt";
var file_locations_new = "./database/locations_new.txt";
var file_locations = "./database/locations.txt";

//constructs a DBpedia query from a list of location names
function createDBpediaQuery(locations,callback){
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
		callback(querys,query_count);
}

//recursive function to perform as many dbpedia queries as we need
function dbpediaQueries(queries,query_count,locations,callback){
	if (query_count==0){
		callback(null,locations);
	}else{
		client.query(queries[query_count-1]).execute(function(error, results) {
			if(error){
				console.log("error when retrieving results from DBPedia: " + error);
				callback(error,null);
			}else{
				if(results){
					console.log("retrieving images from DBPedia");					
					for(var i in results.results.bindings){

						//what is the location name for the depiction
				    	var locationName = results.results.bindings[i].s.value;

				        //we want the specific country image, not stuff related to it that dbpedia returns
				        //go through all our locations to see if there's a match

				        for(var j = 0; j< locations.length; j++){
				        	//TODO: work on finding some subset if we cant find an exact match
				        	//if(locations[j].location_name ==="Athens" && locationName==="http://dbpedia.org/resource/Athens"){
				        	//	console.log(locationName);
				        	//	console.log(results.results.bindings[i].q.value);
				        	//}
					        if (locationName === "http://dbpedia.org/resource/"+locations[j].location_name){
						      	var imageUrl = results.results.bindings[i].q.value;
						      	locations[j].imageUrl = imageUrl;
							}
				        }
					}
					
				}
				dbpediaQueries(queries,query_count-1,locations,callback);
			}	
		});
	}

}

//checks if an object is in an array
function inArray(array,object,key){
	for(var i =0; i< array.length; i++){
		if (array[i][key] === object[key]){
			return true
		}
	}
	return false;
}

//checks whether a collection is populated or not yet
function isPopulated(collectionName,callback){
	var collection = db.collection(collectionName);
	collection.findOne({},function(err,data){
		if(err){
			callback(err);
		}else{
			if(data){
				callback(collectionName + " already populated, if you wish to re-populate, drop the collection.");
			}else{
				callback(null);
			}
			
		}
	});
}

//insert an object into a collection
function insert(object,collectionName,callback){
	var collection = db.collection(collectionName);
	collection.insert(object, function(err, data) {
	    if (err){ 
	    	callback(err);
	    }
	    if (data){
	    	callback(null);
	    }
	});
}

//reads a file in
function readFile(filename, callback){
	fs.readFile(filename, 'utf8', function(err, data) {
		if (err){
			callback(err,null);
		}else{
			callback(null,data);
		}
	});
}

//constructs a list of flight routes from route data
function createFlightRoutes(flight_data,callback){

	//split input file into lines
	var line_data = flight_data.split(/\r?\n/);

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

	callback(flight_routes);
}
//constructs a list of flight destinations from route data
function createFlightDestinations(flight_data,callback){
	var line_data = flight_data.split(/\r?\n/);

	
	var destinations = [];

	//create destination array with no duplicates
	for(var i in line_data){
		var locations = line_data[i].split(" ");
		var destination = locations[1];
		if (!(inArray(destinations,{location:destination},"location"))){
			destinations.push({location:destination});
		}
	}

	callback(destinations);
}

module.exports = {
	//get image montages for all our destinations from DBPEDIA
	populateImageAddresses: function(locations,callback){
		//first construct our DBPEDIA query for all our locations
		createDBpediaQuery(locations, function(constructed_query,query_count){
			//check if the collection has already been populated
			isPopulated("destinationCollection",function(err){
				if(err){
					callback(err);
				}else{
					//if it has been perform the dbpedia query
					dbpediaQueries(constructed_query,query_count,locations,function(err,updated_locations){
						if (err){
							callback(err);
						}else{
							//add updated locations to database
							insert(updated_locations,"destinationCollection",function(err){
								if(err){
									callback(err);
								}else{
									//no error
									callback(null);
								}
							});
						}
					});
				}
			})
		});
	},
	//first create a collection of location ->destination objects so we know which routes we can query
	addFlightRoutes: function(callback){
		readFile(file_location_codes,function(err,data){
			if(err){
				console.log("error when retrieving location/destination routes from file: "+ err);
				callback(err);
			}else{
				//create the routes from data file provided by travelstart
				createFlightRoutes(data,function(flight_routes){
					//insert created routes into a routes Collection
					isPopulated("routesCollection",function(err){
						if(err){
							callback(err);
						}else{
							insert(flight_routes,"routesCollection",function(err){
								if(err){
									callback(err);
								}else{
									//no error
									callback(null);
								}
							});
						}
					});					
				});				
			}
		});
	},
	//Create a collection of the possible destinations that we can populate with more information
	addFlightDestinations: function(callback){
		readFile(file_location_codes,function(err,data){
			if(err){
				callback(err,null);
			}else{
				createFlightDestinations(data,function(destinations){
					callback(null,destinations);
				})
			}
		});
	},

	addDestinationDetails: function(destinations,callback){
		console.log("accessing destination information from file");
		readFile(file_locations,function(err,data){
			if(err){
				callback(err,null);
			}else{
				createDestinationDetails(data,destinations, function(updated_destinations){
					callback(null,updated_destinations)
				});

				
			}
		});
	}


}

//add details to our destinations from data from travelstarts website
function createDestinationDetails(destination_data,destinations,callback){
	//split input file into lines
	var line_data = destination_data.split(/\r?\n/);

	

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


	callback(destinations);
}


/*
// get location name, country and continent name and add to available destinations
function addDestinationDetails(destinations,callback){
	
	readFile(file_locations,function(err,data){
		if(err){
			console.log("error when retrieving desination information from file: "+ err);
			callback(err,null);
		}else{


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