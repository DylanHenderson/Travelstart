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
router.get('/query', function(req, res, next) {
  	
  	//query, deptDate, arrDate, minPrice, maxPrice, callback
	query.formulate(req.query.name,[1,1,1],[1,1,1],5000,9000,function(results,err){

		db.retrieve(results,function(results1,err1){

			ranking.calculateRank(results1,function(results2,err2){
				console.log("sending through results");
				console.log(results2);
				res.send({result: results2});
				res.end();
			});
		});


	});

});

// user selects a location from the list such as "PAR"
router.get('/location', function(req, res, next) {
  
	

	db.updateWeighting(req.query);




});



// user enters a keyword for a location they have selected
router.get('/keyword', function(req, res, next) {
  
	db.updateWeightingUser(req.query);

});


module.exports = router;
