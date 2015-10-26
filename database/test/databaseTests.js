var rewire = require('rewire');
var fs = require('fs');
var initialization = rewire('../initialization.js');
var retrieval = rewire('../retrieve.js');
var insertion = rewire('../insertion.js');
var updates = rewire('../updates.js');

var chai = require('chai');
var expect = chai.expect;
var db = require('mongoskin').db('mongodb://localhost:27017/test_data');
var setDB_initialization = initialization.__get__('setDB');
var setDB_retrieval = retrieval.__get__('setDB');
var setDB_insertion = insertion.__get__('setDB');

var createWeightings = initialization.__get__('createWeightings');
var createDBpediaQuery = initialization.__get__('createDBpediaQuery');
var dbpediaQueries = initialization.__get__('dbpediaQueries');
var inArray = initialization.__get__('inArray');
var isPopulated = initialization.__get__('isPopulated');
var insert= initialization.__get__('insert');
var createFlightRoutes = initialization.__get__('createFlightRoutes');
var createFlightDestinations = initialization.__get__('createFlightDestinations');
var createDestinationDetails = initialization.__get__('createDestinationDetails');
var fetch = retrieval.__get__('fetch');
var addKeywordCollection = insertion.__get__('addKeywordCollection');


setDB_initialization("test_data");
setDB_retrieval("test_data");
setDB_insertion("test_data");

function random (low, high) {
    return Math.floor(Math.random() * (high - low) + low);
}

console.log("testing retrieval times");
var collection = db.collection("keywordCollection");

var test_locations = [
	"AMS", "ROM", "PAR","LON","BKK","DXB","ATH"

];

var test_keywords = [

];

for(var i =0; i<1000; i++ ){
	test_keywords.push("a"+i);
}

var query = [];
var Par = [];
var Rom = []

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

describe('testing inserting times when database contains 10000 documents',function(){

for(var i=0; i< 10000; i++){
	var choice = random(0,test_locations.length);
	query.push({location: test_locations[choice] , keyword: test_keywords[i] });


}


	it('should insert correctly for referencing',function(done){
		expect(createDestinationDetails).to.be.a('function');
		collection.insert(query, function(err,res){
			if(err){
				console.log(err);
			}else{
				console.log("inserted");
				done();
			}
		});	
	});


	var start = new Date().getTime();
	it('testing referencing time for inserting',function(done){
		expect(createDestinationDetails).to.be.a('function');
		collection.insert({location: "PAR",keyword: "a10001"}, function(err,res){
			if(err){
				console.log(err);
			}else{
				var end = new Date().getTime();
				var time = end - start;
				console.log("time taken: "+time);
				collection.drop(function(err,data){
					if(err){
						console.log(err);
					}
					done();
		
				});
			}
		});	
	});
});




describe('testing query times for referencing when database contains 10000 documents',function(){

for(var i=0; i< 10000; i++){
	var choice = random(0,test_locations.length);
	query.push({location: test_locations[choice] , keyword: test_keywords[i] });


}

	it('should insert correctly for referencing',function(done){
		expect(createDestinationDetails).to.be.a('function');
		collection.insert(query, function(err,res){
			if(err){
				console.log(err);
			}else{
				console.log("inserted");
				done();
			}
		});	
	});
	var start = new Date().getTime();
	it('testing referencing time',function(done){
		expect(createDestinationDetails).to.be.a('function');
		collection.findOne({keyword:"i5",location:"PAR"}, function(err,res){
			if(err){
				console.log(err);
			}else{
				collection = db.collection("destinationCollection")
				collection.findOne({location:"PAR"}, function(err,res){
					if(err){
						console.log(err);
					}else{
						var end = new Date().getTime();
						var time = end - start;
						console.log("time taken: "+time);
						var collection = db.collection("keywordCollection");
						collection.drop(function(err,data){
							if(err){
								console.log(err);
							}
							done();
		
						});
					}
				});	
			}
		});	
	});
});




describe('testing query times for embedding when database contains 1000 documents',function(){

	for(var i=0; i< 1000; i++){
		var choice = random(0,test_locations.length);
		query.push({location: test_locations[choice] , keyword: test_keywords[i] });


	}

	it('should insert correctly for embedding',function(done){
		expect(createDestinationDetails).to.be.a('function');
		collection.insert(query, function(err,res){
			if(err){
				console.log(err);
			}else{
				console.log("inserted");
				done();
			}
		});	
	});

	var start = new Date().getTime();
	it('testing referencing time',function(done){
		expect(createDestinationDetails).to.be.a('function');
		collection.findOne({keyword:"i5",location:"PAR"}, function(err,res){
			if(err){
				console.log(err);
			}else{
				var end = new Date().getTime();
				var time = end - start;
				console.log("time taken: "+time);
				
				var collection = db.collection("keywordCollection");
				collection.drop(function(err,data){
					if(err){
						console.log(err);
					}
					done();
					
				});
			}
		});	
	});



});


