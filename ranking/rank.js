module.exports = {


	calculateRank: function(query, callback){
		//do stuff

    
      
		console.log('result ranking');
        

       //example hardcoded query
		var samplequery = "Fun Holiday";
		var stringsplit = samplequery.split(" ");
       
       //Hardcoded database entries 
		var results =

		[           
                  
				{
					locationName:"Port_Elizebeth",

					keywords :{ "Fun":0,"Exciting":5,"Holiday":7},
					
					rating_score: 0
				},

				{
					locationName: "Cape_Town",
					
					keywords : { "Fun":9,"Exciting":4,"Holiday":8},
					
					rating_score:0
				},

				 {
				 	locationName: "Durban",
				 	
				 	keywords:{ "Fun":6,"Exciting":7,"Holiday":6},
				    
				    rating_score: 0
				 },
				  {
				 	locationName: "Saldana",
				 	
				 	keywords:{ "Fun":5,"Exciting":7,"Holiday":3},
				    
				    rating_score: 0
				 },
				 {
				 	locationName: "East_London",
				 	
				 	keywords:{ "Fun":5,"Exciting":5,"Holiday":4,},
				    
				    rating_score: 0
				 }


         		];

            
          
         // var resultsArray = [];
          //ranking formuala
          //Still a work in progress
          //Possible weighting given to order of keywords,and there frequency.

          
          for(var i = 0; i<5;i++){
            //apply scoring formula for search results.
          	var score = Math.sqrt((Math.pow(results[i].keywords[stringsplit[0]+""],2) +Math.pow(results[i].keywords[stringsplit[1]+""],2))/2) ;
            results[i].rating_score = score;	
            
          }
         //sort results based on rating
         function compare(a,b) {
		  if (a.rating_score < b.rating_score)
		    return 1;
		  if (a.rating_score > b.rating_score)
		    return -1;
		  return 0;
		}

		results.sort(compare);




		var err = null;

		callback(results, err);
	}


};


