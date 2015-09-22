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
  
	query.formulate(req.query.name,function(results,err){

		db.retrieve(results,function(results1,err1){

			ranking.calculateRank(results1,function(results2,err2){

				console.log(results2);
				//res.send({result: results2});
				//res.render('results',data, { title: 'Holidays' });

				res.render("results", {
        			locals: {results:results2, title: "Holidays"}
    			});
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
