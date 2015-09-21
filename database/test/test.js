var rewire = require('rewire');

var initialization = rewire('../initialization.js');
var retrieval = rewire('../retrieve.js');
var insertion = rewire('../insertion.js');
var updates = rewire('../updates.js');

var chai = require('chai');
var expect = chai.expect;
var db = require('mongoskin').db('mongodb://localhost:27017/test_data');
var setDB = initialization.__get__('setDB');

var createWeightings = initialization.__get__('createWeightings');
var createDBpediaQuery = initialization.__get__('createDBpediaQuery');
var dbpediaQueries = initialization.__get__('dbpediaQueries');
var inArray = initialization.__get__('inArray');
var isPopulated = initialization.__get__('isPopulated');
var insert= initialization.__get__('insert');
var createFlightRoutes = initialization.__get__('createFlightRoutes');
var createFlightDestinations = initialization.__get__('createFlightDestinations');
var createDestinationDetails = initialization.__get__('createDestinationDetails');

//function dbpediaQueries(queries,query_count,locations,callback){

//function insert(object,collectionName,callback){

//function createFlightRoutes(flight_data,callback){


//function createFlightDestinations(flight_data,callback){

//function createDestinationDetails(destination_data,destinations,callback){

setDB("test_data");
var collectionName = "keywordCollection";

var collection = db.collection(collectionName);

describe('createFlightRoutes',function(){
	it('should be a function',function(){
		expect(createFlightRoutes).to.be.a('function');
	});

	it('should be a function',function(){
		expect(createFlightRoutes).to.be.a('function');
	});

}

describe('isPopulated',function(){

	it('should be a function',function(){
		expect(isPopulated).to.be.a('function');
	});

	it('should callback null if not populated and a message if it is',function(done){
		isPopulated("keywordCollection",function(err){
			expect(err).to.eql(null);
			collection.insert({keyword:"Romantic",location:"NYC",weight:5}, function(err, data) {
			    if (err){ 
			    	console.log(err);
			    }else{
					isPopulated("keywordCollection",function(err){
						expect(err).to.not.eql(null);

						collection.drop(function(err,data){
							if(err){
								console.log(err);
							}else{
								done();
							}
							
						});
					});
			    }
			});
		});
	});


});

describe('inArray',function(){

	it('should be a function',function(){
		expect(inArray).to.be.a('function');
	});

	it('should return true if objects key is in object in array ',function(){
		expect(inArray([{keyword: "Romantic"},{keyword:"Unromantic"}],{keyword:"Romantic"},"keyword")).to.eql(true);
	});

	it('should return false if objects key is not in object in array ',function(){
		expect(inArray([{keyword: "Romantic"},{keyword:"Unromantic"}],{keyword:"Fun"},"keyword")).to.eql(false);
	});

});

describe('createDBpediaQuery',function(){

	it('should be a function',function(){
		expect(createWeightings).to.be.a('function');
	});


});

describe('createWeightings',function(){
	it('should be a function',function(){
		expect(createWeightings).to.be.a('function');
	});

	it('should return an array',function(){
		expect(createWeightings("Romantic - PAR - 5\n Romantic - ROM - 10")).to.be.a('array');
	});

	it('should handle empty inputs',function(){
			expect(createWeightings("")).to.eql([]);
	});

	it('should return a list of objects with 3 keys: keyword, location weight',function(){
			expect(createWeightings("Romantic - PAR - 5\n Romantic - ROM - 10")).to.eql([
				{
					keyword: "Romantic",
					location: "PAR",
					weight: 5
				},
				{
					keyword: "Romantic",
					location: "ROM",
					weight: 10
				}
				]);
	});

	it('handle errors in input',function(){
		expect(createWeightings("Romantic - PAR - 5\n  -Romantic - ROM - 10")).to.eql([
			{
				keyword: "Romantic",
				location: "PAR",
				weight: 5
			}

		]);

		expect(createWeightings("Romantic - hello - PAR - 5\n  -Romantic - ROM - 10")).to.eql([
		]);

		expect(createWeightings("Romantic - PAR - 5  -Romantic - ROM - 10")).to.eql([
		]);
	});
});

