var express = require('express');
var results = express.Router();

/* GET home page. */
results.get('/results', function(req, res, next) {
  
  res.render('results', { title: 'Holidays' });
});

module.exports = results;