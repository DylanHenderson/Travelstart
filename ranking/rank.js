module.exports = {


	calculateRank: function(query, callback){
		//do stuff



		console.log('result ranking');



		
		var results =
			[


				{
					locationName:"Port_Elizebeth",
					keywords: ["Fun","Exciting"]
				},


				{
					locationName: "Cape_Town",
					keywords: ["Holiday","Fun"]

				}




			];


		var err = null;
		callback(results, err);
	}

};


