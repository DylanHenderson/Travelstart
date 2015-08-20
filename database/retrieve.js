var SparqlClient = require('sparql-client');
var util = require('util');
var mongo = require('mongodb');
var db = require('mongoskin').db('mongodb://localhost:27017/destination_data');

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

		//query dbpedia for images of all port cities in south africa
		var query = "SELECT ?s ?q WHERE {   ?s ?o <http://dbpedia.org/class/yago/PortCitiesInSouthAfrica>;     foaf:depiction ?q }limit 10";
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
		    callback();
		});


	}


};







