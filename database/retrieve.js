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
		fetch(keyword_query,"keywordCollection",function(err,results){
			callback(err,results);
		});
	},

    getLocations: function(query,callback){
        var query = {"location":{"$in":query}};
        fetch(keyword_query,"DestinationCollection",function(err,results){
            callback(err,results);
        });
    }
}






