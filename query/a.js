var natural = require('natural');
var stemmer = natural.PorterStemmer;
var wordnet = new natural.WordNet();
var nounInflector = new natural.NounInflector();
var fs = require('fs');




form("fiddle");
function getstuff(results) {
	var d=[]
	for(var i=0;i<results.length;i++){d.push(results[i].lemma);}
	return d;
}

function form(term) {

	var a=wordnet.lookup(term, getstuff);
	console.log(a);
}