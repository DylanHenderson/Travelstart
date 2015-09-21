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



setDB("test_data");
var collectionName = "keywordCollection";

var collection = db.collection(collectionName);

describe('createDestinationDetails',function(){
	it('should be a function',function(){
		expect(createDestinationDetails).to.be.a('function');
	});

	it('should return an array',function(){
		expect(createDestinationDetails("JAalborg - AAL - Denmark\nAarhus - AAC - Denmark",[{location:"AAL"},{location:"AAC"}])).to.be.a('array');
	});

	it('should handle empty inputs',function(){
			expect(createDestinationDetails("",[])).to.eql([


				]);
	});

	it('should return a list of destinations as their own objects with details',function(){
			expect(createDestinationDetails("JAalborg - AAL - Denmark\nAarhus - AAC - Denmark",[{location:"AAL"},{location:"AAC"}])).to.eql([
				{
					location: "AAL",
					location_name: "JAalborg",
					country:"Denmark",
					keywords:[]
					
				},
				{
					location: "AAC",
					location_name: "Aarhus",
					country:"Denmark",
					keywords:[]
					
				}
			]);
	});


	it('handle errors',function(){
			expect(createDestinationDetails("JAalborg - AAL - Denmark\nAarhus -THE- - AAC - Denmark",[{location:"AAL"},{location:"AAC"}])).to.eql([
				{
					location: "AAL",
					location_name: "JAalborg",
					country:"Denmark",
					keywords:[]
					
				},
				{
					location: "AAC",
					keywords:[]

				}
			]);
	});

});

describe('createFlightDestinations',function(){
	it('should be a function',function(){
		expect(createFlightDestinations).to.be.a('function');
	});

	it('should return an array',function(){
		expect(createFlightDestinations("JHB ROM\nCPT PAR")).to.be.a('array');
	});

	it('should handle empty inputs',function(){
			expect(createFlightDestinations("")).to.eql([


				]);
	});

	it('should return a list of destinations as their own objects',function(){
			expect(createFlightDestinations("JNB ROM\nCPT PAR")).to.eql([
				{
					location: "ROM"
					
				},
				{
					location: "PAR"
					
				}
			]);
	});

	it('handle/ignore errors in input',function(){
		expect(createFlightDestinations("JNB - ROM\nCPT PAR")).to.eql([
				{
					location: "PAR"
					
				}
		]);


	});

});

describe('createFlightRoutes',function(){
	it('should be a function',function(){
		expect(createFlightRoutes).to.be.a('function');
	});

	it('should return an array',function(){
		expect(createFlightRoutes("JHB ROM\nCPT PAR")).to.be.a('array');
	});

	it('should handle empty inputs',function(){
			expect(createFlightRoutes("")).to.eql([

				{
					location: "JNB",
					destinations: []
				},
				{
					location: "CPT",
					destinations: []
				},
				{
					location: "DUR",
					destinations:[]
				}


				]);
	});

	it('should return a list of objects containing a location and its destinations',function(){
			expect(createFlightRoutes("JNB ROM\nCPT PAR")).to.eql([
				{
					location: "JNB",
					destinations: ["ROM"]
				},
				{
					location: "CPT",
					destinations: ["PAR"]
				},
				{
					location: "DUR",
					destinations:[]
				}
				]);
	});

	it('handle errors in input',function(){
		expect(createFlightRoutes("JNB - ROM\nCPT PAR")).to.eql([
				{
					location: "JNB",
					destinations: []
				},
				{
					location: "CPT",
					destinations: ["PAR"]
				},
				{
					location: "DUR",
					destinations:[]
				}

		]);


	});

});

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
		expect(createDBpediaQuery).to.be.a('function');
	});

	it('should callback with an array and an int',function(){
		createDBpediaQuery([{location_name :"Paris"},{location_name: "Athens"}],function(querys,query_count){
			expect(querys).to.be.a('array');
			expect(query_count).to.eql(1);
		});
	});

	it('should create a DBPEDIA query from location names',function(){
		createDBpediaQuery([{location_name :"Paris"},{location_name: "Athens"}],function(querys,query_count){
			expect(querys[0]).to.eql("SELECT * {  { SELECT ?s ?q WHERE { ?s <http://dbpedia.org/property/name> \"Paris\"@en; foaf:depiction ?q } } UNION { SELECT ?s ?q WHERE { ?s <http://dbpedia.org/property/name> \"Athens\"@en; foaf:depiction ?q } }}");
		});
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

