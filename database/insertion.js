
var util = require('util');
var mongo = require('mongodb');
var db = require('mongoskin').db('mongodb://localhost:27017/destination_data');
var fs = require('fs');

module.exports = {

	addKeywords: function(locations,keywords){
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
}


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




