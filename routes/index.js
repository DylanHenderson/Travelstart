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
	query.formulate(req.body.searchQuery,[1,1,1],[1,1,1],5000,9000,req.body.departureLocation,function(results,err){

		db.retrieve(results,function(results1,err1){

			ranking.calculateRank(results1,function(results2,err2){
				console.log("sending through results");
				console.log(results2);
				//res.send({result: results2},200);
				res.status(200).send({result: results2});
			});
		});


	});

});

// user selects a location from the list such as "PAR"
router.post('/location', function(req, res) {

	db.updateWeighting(req.body);

});

// user enters a keyword for a location they have selected
router.post('/keyword', function(req, res) {

	db.updateWeightingUser(req.body);

});

module.exports = router;
