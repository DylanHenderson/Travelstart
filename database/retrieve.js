var SparqlClient = require('sparql-client');
var util = require('util');
var mongo = require('mongodb');
var db = require('mongoskin').db('mongodb://localhost:27017/nodetest1');

module.exports = {


	retrieve: function(query, callback){
		//do stuff



		console.log('database querying');
		

		var results =
			[
				{
					locationName: "Cape_Town",
					keywords: ["Holiday","Fun"]

				},

				{
					locationName:"Port_Elizebeth",
					keywords: ["Fun","Exciting"]
				}


			];

		var err = null;
		callback(results, err);
	},




	populate: function(callback){
		
		var endpoint = 'http://dbpedia.org/sparql';

			//query dbpedia for images of all port cities in south africa
		var query = "SELECT ?s ?q WHERE {   ?s ?o <http://dbpedia.org/class/yago/PortCitiesInSouthAfrica>;     foaf:depiction ?q }limit 10";
		var client = new SparqlClient(endpoint);
		console.log("Query to " + endpoint);
		console.log("Query: " + query);
		client.query(query)
		  .execute(function(error, results) {

		    
		    console.log("////////////////");
		    console.log(results.results.bindings);
		    console.log("////////////////");

		    

		  //send results from dbpedia through to database (initial)
		  ///////////////////////////////////////////////////////////////////////


		    for(var i in results.results.bindings){

		      // Get our values to store 
		      var locationName = results.results.bindings[i].s.value;


		      //name needs to be not a URL
		      var reg = /(?:[A-Z][a-z])\w+/g
		      locationName = (reg.exec(locationName))[0];

		      var image = results.results.bindings[i].q.value;


		      // Set our collection
		      var collection = db.collection('locationCollection');
		      console.log("adding location item to database");


		      
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
		            console.log("worked!");
		          }
		      });
		  


		    }

		  //////////////////////////////////////////////////////////////

		});


		// Set our collection
		var collection = db.collection('keywordCollection');
		console.log("adding keywords to database");



		// Submit to the DB
		collection.insert({
		    "keyword" : "Holiday",
		    "locations:": ["Cape_Town", "Saldanha","Durban","Port_Elizabeth","East_London"]
		}, function (err, result) {
		    if (err) {
		        // If it failed, return error
		        res.send("There was a problem adding the information to the database.");
		    }
		    else {
		      console.log("worked!");
		    }
		});

		callback();
	}


};







