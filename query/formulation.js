var natural = require('natural');
var spell = require('./speller.js')
var fs = require('fs');
var wordnet = new natural.WordNet();
var nounInflector = new natural.NounInflector();
var verbInflector = new natural.PresentVerbInflector();
var tokenizer = new natural.WordTokenizer();
var stemmer = natural.PorterStemmer;

var trainingtext = "./query/nsc.txt";
var commontext = "./query/commies.txt";
var stopwords = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',"'", ".", "?","like", "place","a", "about", "above", "above", "across", "after", "afterwards", "again", "against", "all", "almost", "alone", "along", "already", "also","although","always","am","among", "amongst", "amoungst", "amount",  "an", "and", "another", "any","anyhow","anyone","anything","anyway", "anywhere", "are", "around", "as",  "at", "back","be","became", "because","become","becomes", "becoming", "been", "before", "beforehand", "behind", "being", "below", "beside", "besides", "between", "beyond", "bill", "both", "bottom","but", "by", "call", "can", "cannot", "cant", "co", "con", "could", "couldnt", "cry", "de", "describe", "detail", "do", "done", "down", "due", "during", "each", "eg", "eight", "either", "eleven","else", "elsewhere", "empty", "enough", "etc", "even", "ever", "every", "everyone", "everything", "everywhere", "except", "few", "fifteen", "fify", "fill", "find", "fire", "first", "five", "for", "former", "formerly", "forty", "found", "four", "from", "front", "full", "further", "get", "give", "go", "had", "has", "hasnt", "have", "he", "hence", "her", "here", "hereafter", "hereby", "herein", "hereupon", "hers", "herself", "him", "himself", "his", "how", "however", "hundred", "i", "ie", "if", "in", "inc", "indeed", "interest", "into", "is", "it", "its", "itself", "keep", "last", "latter", "latterly", "least", "less", "ltd", "made", "many", "may", "me", "meanwhile", "might", "mill", "mine", "more", "moreover", "most", "mostly", "move", "much", "must", "my", "myself", "name", "namely", "neither", "never", "nevertheless", "next", "nine", "no", "nobody", "none", "noone", "nor", "not", "nothing", "now", "nowhere", "of", "off", "often", "on", "once", "one", "only", "onto", "or", "other", "others", "otherwise", "our", "ours", "ourselves", "out", "over", "own","part", "per", "perhaps", "please", "put", "rather", "re", "same", "see", "seem", "seemed", "seeming", "seems", "serious", "several", "she", "should", "show", "side", "since", "sincere", "six", "sixty", "so", "some", "somehow", "someone", "something", "sometime", "sometimes", "somewhere", "still", "such", "system", "take", "ten", "than", "that", "the", "their", "them", "themselves", "then", "thence", "there", "thereafter", "thereby", "therefore", "therein", "thereupon", "these", "they", "thickv", "thin", "third", "this", "those", "though", "three", "through", "throughout", "thru", "thus", "to", "together", "too", "top", "toward", "towards", "twelve", "twenty", "two", "un", "under", "until", "up", "upon", "us", "very", "via", "was", "we", "well", "were", "what", "whatever", "when", "whence", "whenever", "where", "whereafter", "whereas", "whereby", "wherein", "whereupon", "wherever", "whether", "which", "while", "whither", "who", "whoever", "whole", "whom", "whose", "why", "will", "with", "within", "without", "would", "yet", "you", "your", "yours", "yourself", "yourselves", "the"];

// ====================================================================================================================

function readFile(filename, callback){
	fs.readFile(filename, 'utf8', function(err, data) {
		if (err){
			callback(err,null);
		}else{
			callback(null,data);
		}
	});
}

// ====================================================================================================================

var formulate = function(query, deptDate, arrDate, minPrice, maxPrice, callback) {

	var tempresult = tokenizer.tokenize(query.toLowerCase());
	var removedstopwords = [];
	var locationkeys = [];
	var correctionoccured = false;

	console.log("reading file");
	readFile(trainingtext,function(err,data){
		if (err) {
			console.log("error reading from file: "+ err);
			callback(err);
		} else {
			console.log("training spell-checker");
			spell.train(data);

			// ========================================================================================================
			readFile(commontext,function(err1,commondata){
				if (err1) {
					console.log("error reading from file: "+ err1);
					callback(err1);
				} else {
					commonwords = commondata.split(/\r?\n/);
					
					// take original query and remove stop words and fix spelling errors
					console.log("removing stop words, fixing spelling errors,");
					console.log("singularizing query terms, converting words to most common form");
					for (var i = 0; i < tempresult.length; i++) {
						if (stopwords.indexOf(tempresult[i]) == -1) {
							tempresult[i] = spell.correct(tempresult[i]);
							tempresult[i] = nounInflector.singularize(tempresult[i]);

							var dist=0;
							var tempdist=0;
							var index=0;

							// if the word is in the db's list of words, add to query
							// else if, convert the word to the closest word in the db's list 
							for (var k=0;k<commonwords.length;k++) {
								tempdist = natural.JaroWinklerDistance(tempresult[i], commonwords[k]);
								if (tempdist == 1) {index = k; break;}
								else if (tempdist>dist) {index = k;dist=tempdist;}
							}

							// check if the new word has the same root as the original word, if so add to formulated query
							// if not, add original word
							if (stemmer.stem(tempresult[i]) == stemmer.stem(commonwords[index])) {removedstopwords.push(commonwords[index]);}
							else {removedstopwords.push(tempresult[i]);}

						}
					}

					// find common words/synonym of common words
					var keys = []; // keywords that will be sent to the db, synonyms will be sent as well
					var nokey =[]; // synonyms only will be sent to the db

					// 
					for(var i=0;i<removedstopwords.length;i++) {
						if (commonwords.indexOf(removedstopwords[i]) != -1) { 
							keys.push(removedstopwords[i]);
							nokey.push(removedstopwords[i]);
						}
						else {nokey.push(removedstopwords[i]);}

					}

					wordnetSearch(nokey, 0, keys); // expand query with wordnet
					
					// ========================================================================================

					// recursively finds expansion terms
					function wordnetSearch(toexpand, iteration, keylist) {
						// if last word in query, callback keywords
						if (iteration === toexpand.length) {
							
							var todb = {
								keywords: keylist,
								locations: locationkeys,
								departureDate: deptDate,
								arrivalDate: arrDate,
								priceMin: minPrice,
								priceMax: maxPrice
							};
							
							var err = null;
							callback(todb, err);
							console.log("keywords sent to DB: "+keylist);

						} else {
							// lookup word with wordnet
							wordnet.lookup(toexpand[iteration], function(results) {
								console.log("finding expansion terms");
								for(var k=0; k<results.length;k++) {
									var extraterms = results[k].synonyms;
									
									// add synonyms that are in the db's list of words, but not yet in the list of keywords
									for (var j=0;j<extraterms.length;j++) {
										if (commonwords.indexOf(extraterms[j]) != -1 && keylist.indexOf(extraterms[j]) == -1) {keylist.push(extraterms[j]);}
									}
								}
								wordnetSearch(toexpand,iteration+1,keylist);
							});					
						}
					}
					// ================================================================================================
				}
			});
		}
	});        
}

// ====================================================================================================================

module.exports = {
	formulate: formulate
};

// ====================================================================================================================