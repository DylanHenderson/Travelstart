var SparqlClient = require('sparql-client');
var util = require('util');
var mongo = require('mongodb');
var db = require('mongoskin').db('mongodb://localhost:27017/destination_data');
var fs = require('fs');
	var endpoint = 'http://dbpedia.org/sparql';
	var client = new SparqlClient(endpoint);

function setDB(databaseString){
    db = require('mongoskin').db('mongodb://localhost:27017/'+databaseString);
}

function fetch(keyword_query,collectionName,callback){
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
		var keyword_query = {"keyword":{"$in":query.keywords}};
        var location_query = {"location":{"$in":query.locations}};
        var results = {};
		fetch(keyword_query,"keywordCollection",function(err,keywords){

            if(err){
                callback(err,null);
            }else{
                results.keywords = keywords;
                //callback(err,results);
                fetch({},"flightsCollection",function(err2,flights){

                    if(err2){
                        callback(err2,null);
                    }else{
                        results.flights = flights;
                        fetch(location_query,"destinationCollection",function(err3,locations){
                            if(err3){
                                callback(err3,null);
                            }else{
                                results.locations = locations;
                                callback(null,results);
                            }
                            
                        });
                    }
                    
                });
            }
            

		});
	},

    getLocations: function(query,callback){
        location_query = {"location":{"$in":query.locations}};
        fetch(location_query,"destinationCollection",function(err,results){
            callback(err,results);
        });
    }
}




