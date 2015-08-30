var SparqlClient = require('sparql-client');
var util = require('util');
var mongo = require('mongodb');
var db = require('mongoskin').db('mongodb://localhost:27017/destination_data');
var fs = require('fs');
var file_location_codes = "./database/location_destination.txt";

function getLocation(location,callback){
    var collection = db.collection('locationCollection');
    collection.findOne({locationName:location},function(e,docs){
        callback(e,docs);
    });
}

function getKeyword(keyword,callback){
    var collection = db.collection('keywordCollection');
    collection.findOne({keyword:keyword},function(e,docs){
        callback(e,docs);
    });
}

function getRoutes(departure_location,callback){
    var collection = db.collection('routesCollection');
    collection.findOne({location:"JNB"},function(e,docs){
        callback(e,docs);
    });
}


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

}

//Create a collection of the possible destinations that we can populate with more information
function addFlightDestinations(callback){
	console.log("accessing destinations from file");
	readFile(file_location_codes,function(err,data){
		if(err){
			console.log("error when retrieving desination codes from file: "+ err);
			callback(err);
		}else{
			var line_data = data.split(/\r?\n/);

			//
			//var destinations = 

			
		}
	});
}

function readFile(filename, callback){
	fs.readFile(filename, 'utf8', function(err, data) {
		if (err){
			callback(err,null);
		}else{
			callback(null,data);
		}
	});
}



module.exports = {

	//get results from database based on a query incluyding locations and keywords
	retrieve: function(query, callback){
		console.log('database querying');
		

		var locations = query.locations;
		var keywords = query.keywords;
		var results = [];
		console.log(locations);
		console.log(keywords);



		if(keywords){
			var keyword = keywords[0];	
			getKeyword(keyword,function(err,docs){
				//fix order
				if(err){
					callback(null,err);
				}else{
					console.log(docs);
					callback(docs,null);

				}

			});
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


		getRoutes("JNB",function(err,data){
			if(err){
				console.log(err);
			}
			else{
				console.log("checking data");
				console.log(data);
			}
		});

		//query dbpedia for images of all port cities in south africa
		//var query = "SELECT ?s ?q WHERE {   ?s ?o <http://dbpedia.org/class/yago/PortCitiesInSouthAfrica>;     foaf:depiction ?q }limit 10";
		

		/*
		var client = new SparqlClient(endpoint);
		console.log("Query to " + endpoint);
		console.log("Query: " + query);
		client.query(query)
		  .execute(function(error, results) {

		    if(error){
		    	console.log("error when retrieving through sparql: "+error);
		    }else{
		    	 console.log("////////////////");
		    console.log(results.results.bindings);
		    console.log("////////////////");

		    

		  //send results from dbpedia through to database (initial)
		  ///////////////////////////////////////////////////////////////////////

			console.log("adding location items to database");
		    for(var i in results.results.bindings){

		      // Get our values to store 
		      var locationName = results.results.bindings[i].s.value;


		      //name needs to be not a URL
		      var reg = /(?:[A-Z][a-z])\w+/g
		      locationName = (reg.exec(locationName))[0];

		      var image = results.results.bindings[i].q.value;


		      // Set our collection
		      var collection = db.collection('locationCollection');
		      






		      collection.findOne({locationName:locationName}, function(err, result) {
		      	if(err){
		      		console.log(err);
		      	}else{
		      		//if already exists
		      		if(result){
		      			console.log("location already in database");
		      		}else{
				      // Submit to the DB
				      collection.insert({
				          "locationName" : locationName,
				          "image" : image,
				          "keywords:": ["Holdiay", "Fun"]
				      }, function (err, result) {
				          if (err) {
				              // If it failed, return error
				              res.send("There was a problem adding the information to the database.");
				          }
				          else {
				            //console.log("worked!");
				          }
				      });
		      		}
		      	}
			  });
		      

		  


		    }
		    }		   
		 //////////////////////////////////////////////////////////////
		});


		// Set our collection
		var collection = db.collection('keywordCollection');
		console.log("adding keywords to database");

		collection.findOne({keyword:'fun'}, function(err, result) {
		    if (result){
				console.log("keyword already in database");
		    }else{
		    	
		    	// Submit to the DB
				collection.insert({
				    "keyword" : "fun",
				    "locations:": ["Cape_Town", "Saldanha","Durban","Port_Elizabeth","East_London"]
				}, function (err, result) {
				    if (err) {
				        // If it failed, return error
				        res.send("There was a problem adding the information to the database.");
				    }
				    else {
				      //console.log("worked!");
				    }
				});


		    }

		    
		    
		});
*/
	callback();
	}


};







