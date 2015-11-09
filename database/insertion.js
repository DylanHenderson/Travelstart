
var util = require('util');
var mongo = require('mongodb');
var db = require('mongoskin').db('mongodb://localhost:27017/destination_data');
var fs = require('fs');

function setDB(databaseString){
    db = require('mongoskin').db('mongodb://localhost:27017/'+databaseString);
}

module.exports = {

	addKeywords: function(locations,keywords,weight){
		//add such keywords to the location (if given location) and normalize weighting
        addEachKeyword(locations,keywords,weight);
	},

    addKeywordUpdates: function(locations,keyword,weight,callback){
        //add such keywords to the location (if given location) and normalize weighting
        addKeywordCollection(locations,keyword,weight,callback);
    }
};

function addEachKeyword(locations,keywords,weight){
    for(var i = 0; i<locations.length; i++ ){
        //update location collection
        for(var j=0; j<keywords.length; j++){
            //we don't reference i in the function, so it's really not a problem to have the loop here
            addKeywordCollection(locations[i],keywords[j],weight,function(err){
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


function addKeywordCollection(location,keyword,weight_increase,callback){
	// Set our collection
    var collection = db.collection('keywordCollection');

    //attempt to find a match for the keyword and the location
    collection.findOne({keyword:keyword,location:location},function(err,data){
    	
    	if(err){
    		callback(err);
    	}else{
    		//if found update weight
    		if(data){
    			collection.update({keyword:keyword,location:location}, {'$set':{"weight":data.weight+=weight_increase}}, function(err) {
    				if(err){
    					callback(err);
    				}else{
    					callback(null);
    				}
    			});
    		}else{
    		//if not found add to database
    			collection.insert({keyword:keyword, location:location,weight:weight_increase}, function(err) {
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




