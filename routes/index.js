var express = require('express');
var router = express.Router();
var query = require('../query/formulation.js');
var db = require('../database/database.js');
var ranking = require('../ranking/rank.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// user enters query such as "somewhere fun"
router.post('/query', function(req, res) {
  	//query, deptDate, arrDate, minPrice, maxPrice, callback
  	console.log(req.body);
	query.formulate(req.body.searchQuery,req.body.departureDate,req.body.arrivalDate,req.body.priceMin,req.body.priceMax,req.body.departureLocation,function(results,err){

		db.retrieve(results,function(results1,err1){

			ranking.calculateRank(results1,function(results2,err2){
				console.log("sending through results");
				//console.log(results2);
				//res.send({result: results2},200);
				res.status(200).send({result: results2});
			});
		});


	});

});

// user selects a location from the list such as "PAR"
router.post('/location', function(req, res) {

	query.formulate(req.body.keyword,"","","","","",function(results,err){

		var weight_update = {keywords: results.keywords,location: req.body.location};
		db.updateWeighting(weight_update);

		res.status(200).send({result: "ok"});
		
	});
});

// user enters a keyword for a location they have selected
router.post('/keyword', function(req, res) {
	//formulate entered keyword
	query.formulate(req.body.keyword,"","","","","",function(results,err){
		var weight_update = {keywords: results.keywords,location: req.body.location};
		db.updateWeightingUser(weight_update)
		res.status(200).send({result: "ok"});

		
	});

});

module.exports = router;
