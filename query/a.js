var natural = require('natural');
var stemmer = natural.PorterStemmer;
var wordnet = new natural.WordNet();
var nounInflector = new natural.NounInflector();
var fs = require('fs');




form();
var d=[];
function getstuff(results) {
	
	for(var i=0;i<results.length;i++){d.push(results[i].lemma);}
}

function form() {

	term=["fiddle","now"];
	for (var i=0;i<2;i++) {
		wordnet.lookup(term[i]);
	}
	
}

function foo() {console.log(d);}
foo();