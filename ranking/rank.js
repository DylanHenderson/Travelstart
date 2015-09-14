var moment = require('moment');
moment().format();
module.exports = {

	calculateRank: function(query, callback){
		//do stuff
   
      
		console.log('result ranking');
        

       //example hardcoded query
		var samplequery = "Fun Holiday Place";
		var startDate = "2015/05/01";
		var endDate ="2015/06/03";
		var sampleMaxPrice = "4000"
		var stringsplit = samplequery.split(" ");
       
       //Hardcoded database entries 
		var results =

		[           
                  
				{
					locationName:"Port_Elizebeth",

					keywords :{ "Fun":0,"Exciting":5,"Holiday":7},
					
					rating_score: 0,

					price: 2000,

					date: "2015/06/01"
				},

				{
					locationName: "Cape_Town",
					
					keywords : { "Fun":9,"Exciting":4,"Holiday":8},
					
					rating_score:0,

					price: 2000,

					date: "2015/06/03"
				},

				 {
				 	locationName: "Durban",
				 	
				 	keywords:{ "Fun":6,"Exciting":7,"Holiday":6},
				    
				    rating_score: 0,

				    price: 5000,

					date: "2015/07/11"
				 },
				  {
				 	locationName: "Saldana",
				 	
				 	keywords:{ "Fun":5,"Exciting":7,"Holiday":9},
				    
				    rating_score: 0,

				 	price: 2500,

					date: "2015/11/01"
				 },
				 {
				 	locationName: "East_London",
				 	
				 	keywords:{ "Fun":5,"Exciting":0,"Holiday":4,},
				    
				    rating_score: 0,

				 	price: 3000,

					date: "2015/08/03"
				 }


         		];

            
          
         // var resultsArray = [];
          //ranking formuala
          //Still a work in progress
          //Possible weighting given to order of keywords,and there frequency.

          var finalResults =[];
          var priceWeight =1;
          var dateWeight =1;
          var countKeywords =0; //essential to count keywords for ranking formula

          
          //Loop through dummydata array

          for(var i = 0; i<results.length;i++){
            //apply scoring formula for search results.
            var score =0;
           	priceWeighting();
           	dateWeighting();


            //Add a score for each keyword found in the query string
           //var score = Math.sqrt((Math.pow(results[i].keywords[stringsplit[0]+""],2) +Math.pow(results[i].keywords[stringsplit[1]+""],stringsplit.length))/stringsplit.length) ;
           
            for(var j=0;j<stringsplit.length;j++){
               var addScore=0;
               addScore = Math.sqrt((Math.pow(results[i].keywords[stringsplit[j]+""],2)));
               
               //if keyword is not found in query string, add a score of 0
               if(isNaN(addScore)){
               	addScore=0;
               	countKeywords --;
               }
               

               else{
               	//proceed
               }

               score = score + addScore;
               countKeywords++;
              
            }

            score = score/countKeywords;
            //Extra weighting added according to how closely results match user's requested price and date
             if(sampleMaxPrice>results[i].price && dateWithinRange(results[i].date)){
             finalResults[i]=results[i];
             finalResults[i].rating_score = score*dateWeight*priceWeight;
             }

            
          }

          function priceWeighting(){
          //add additional weigting to cheaper flights or flights under the price limit
          
          //Price Weight = square root of selected price/ actual price

          priceWeight =Math.pow(sampleMaxPrice/results[i].price,0.5);
                    
          }


          //add additional wieghts to things closer to the dates
          //soft constraint, still to be added
          function dateWeighting(){
            
          dateWeight = 1;
          }
          
          //check if date is within range
          // for hard contraints
          function dateWithinRange(date) {
		  
		  var currentDate = new Date(date);
		    
		    var minDate = new Date(startDate);
		    var maxDate =  new Date(endDate);

		    if (currentDate > minDate && currentDate < maxDate ){ // checks if dates are within range
		         return true;
		    }

		    if(isNaN(minDate.valueOf() || maxDate.valueOf )){ //if no contraints are entered, return all dates
		    	return true;
		    }
		    else{
		        return false;
		    }
		}


          // finalscore = score*weight1*weight2



         //sort results based on rating
         function compare(a,b) {
		  if (a.rating_score < b.rating_score)
		    return 1;
		   if (a.rating_score > b.rating_score)
		    return -1;
		  return 0;
		}

 //        function getDates(startDate, stopDate) {
	//     var dateArray = [];
	//     var currentDate = moment(startDate);
	//     while (currentDate <= stopDate) {
	//         dateArray.push( moment(currentDate).format('YYYY-MM-DD') )
	//         currentDate = moment(currentDate).add(1, 'days');
	//     }
	//     return dateArray;
	// }
		
        

  //     function compare2(a,b) {
		//   if (a.price < b.price)
		//     return 1;
		//   if (a.price > b.price)
		//     return -1;
		//   return 0;
		// }
        
      
        finalResults.sort(compare);
   		var err = null;
		

		callback(finalResults, err);
	}


};


