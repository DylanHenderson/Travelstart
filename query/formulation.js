

module.exports = {


	formulate: function(query, callback){
		//do stuff



		console.log('query formulation');
		
		var results = query;
		results = {
					keywords:["fun"],
					locations:[]
				  };
		var err = null;
		callback(results, err);
	}

};



