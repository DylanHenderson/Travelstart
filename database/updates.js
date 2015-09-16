var util = require('util');
var mongo = require('mongodb');
var db = require('mongoskin').db('mongodb://localhost:27017/destination_data');

//functions used to update the system

//we are only using the following locations to test the system, so only update them
var update_locations = [
	"AMS", "ROM", "PAR","LON","BKK","DXB","ATH"

];

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

function update(update_query,update_change,collectionName,callback){
	var collection = db.collection(collectionName);

	collection.update(update_query,update_change,function(err,data){

		if(err){
			callback(err);			
		}else{
			callback(null);
		}


	});

	
}


module.exports = {

	//method that normalizes the weights out of 100. uses logs for dampening
	normalizeWeights: function(){
		var keyword_query = {"location":{"$in":update_locations}};

		fetch(keyword_query,"keywordCollection",function(err,results){

			if(err){
				console.log(err);
			}else{
				console.log(results);

				//the maximum weight
				var update_max = [];





				//find the maximum weight for each location
				for(var i = 0; i<update_locations.length; i++){
					update_max.push(0);
					for(var j=0; j<results.length; j++){
						if(results[j].location === update_locations[i]){
							var weight = results[j].weight;
							var keyword = results[j].keyword;
							if (weight>update_max[i]){
								update_max[i] = weight;
							}
						}
					}
				}


				

				//finds the value needed to make the weights equal to 100
				for(i = 0; i<update_locations.length; i++){
					//console.log(update_max[i]);
					update_max[i] = 100/(Math.log(update_max[i]));
					//console.log(update_max[i]);

					for(j = 0; j<results.length; j++){

						if(results[j].location === update_locations[i]){
							console.log(results[j].location);
							console.log(results[j].keyword);
							results[j].weight = Math.round((Math.log(results[j].weight))*update_max[i]);
							console.log(results[j].weight);
						}
						update({keyword:results[j].keyword,location:results[j].location},{"$set":{weight:results[j].weight}},"keywordCollection",function(err){

							if(err){
								console.log(err);
							}else{
								console.log("updated a weight");
							}
						});
					}



				}

				//update the database with the new weights




			}
			
		})
	}
}