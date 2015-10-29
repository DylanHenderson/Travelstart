var moment = require('moment');
var db = require('../database/database');
moment().format();
module.exports = {

  calculateRank: function(original_data, callback){
    //do stuff
      
        
    console.log('result ranking');
        

       //example hardcoded query
    var samplequery = ["Fun", "Romantic"];
    
    var documentvector =[];
    var queryvector =[];
    var finalLoc;
    var numResults = original_data.keywords.length;
    var finalLocList =[];
    var finalFlightList = [];
    var sampleDocumentFrequency = {}; 
    
        

        for (var i=0; i<original_data.keywords.length; i++){
          if(sampleDocumentFrequency[original_data.keywords[i].keyword.toUpperCase()]===undefined){
            sampleDocumentFrequency[original_data.keywords[i].keyword.toUpperCase()]=1;
          }else{
            sampleDocumentFrequency[original_data.keywords[i].keyword.toUpperCase()]++;
          }
        }
      
      
       

        var locationVectors = [
        // {
          // location: "AMS",
          // vector: [],
          // score:0
          // }
        

        ];
        var locationList=[];

       for(var i=0;i<original_data.keywords.length;i++){
        var qLocation = original_data.keywords[i].location;
        if(qLocation in locationList){}
        
        else{
        locationVectors.push({
         location: qLocation,
         vector: [],
         score:0

        });
        locationList.push(qLocation);
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



     function createQueryVectors(query){

      var documentvector = [];
      
      for (var i = 0;i<query.length;i++){
       if(sampleDocumentFrequency[query[i].toUpperCase()]===undefined){
        sampleDocumentFrequency[query[i].toUpperCase()]=1;
         }

       queryvector[i] = Math.log(1+numResults/sampleDocumentFrequency[query[i].toUpperCase()]);
      
       for (var j = 0;j<locationVectors.length;j++){

       locationVectors[j].vector[i]=0;

       for (var k = 0;k<original_data.keywords.length;k++){
       
        if(locationVectors[j].location == original_data.keywords[k].location){
       
          if(query[i].toUpperCase() == original_data.keywords[k].keyword.toUpperCase()){
           
           locationVectors[j].vector[i] = weightDocument(original_data.keywords[k].weight);
           
        }
      
      } 

      }
     }
     
     }
   }
   function vectorRanking(query){

   createQueryVectors(query);
  
   for(var i=0;i<locationVectors.length;i++){
  
    var numerator = dotProduct(locationVectors[i].vector,queryvector);
    var denominator = normalise(locationVectors[i].vector)*normalise(queryvector);
    var score = numerator;
    locationVectors[i].score =score;
    //console.log(locationVectors[i].score);
    }



   }
         function weightTerm(number){
         
         

         }
         function weightDocument(number){
          //weighting for terms in the document
           return 1+Math.log(number);

         }


         function dotProduct(vector1,vector2){
        var adder =0;
        var total =0;
        for(var i=0;i<vector1.length;i++){
          adder = vector1[i]*vector2[i];
          total = total + adder; 
        }
        
         return total;
        } 
      

        function normalise(vector){
        var adder =0;
        var total =0;
        for(var i=0;i<vector.length;i++){
          adder = Math.pow(vector[i],2);
          total = total + adder; 
        }
         total = Math.sqrt(total);
         return total;
        }

        // function secondRanking(){

        // }
          
         //sort results based on rating
         function compare(a,b) {
      if (a.score < b.score)
        return 1;
       if (a.score > b. score)
        return -1;
      return 0;
    }
         function comparePrice(a,b) {
      if (a.price > b.price)
        return 1;
       if (a.price < b.price)
        return -1;
      return 0;
    }

      function setfinalLocationList(){
      locationVectors.sort(compare);
      for (var i=0;i<locationVectors.length;i++){
        finalLocList[i] = locationVectors[i].location;

      }
      


      }
      function populateFlights(list){
      
    }
    function mergeRecursive(obj1, obj2) {

      for (var p in obj2) {
        try {
          // Property in destination object set; update its value.
          if ( obj2[p].constructor==Object ) {
            obj1[p] = MergeRecursive(obj1[p], obj2[p]);

          } else {
            obj1[p] = obj2[p];

          }

        } catch(e) {
          // Property in destination object not set; create it and set its value.
          obj1[p] = obj2[p];

        }
      }

      return obj1;
    }

      
      setfinalLocationList();

    //  populateFlights(finalLocList);
      finalFlightList.sort(comparePrice);
      vectorRanking(samplequery);
      locationVectors.sort(compare);
    //finalFlightList = finalFlightList.slice(0,8);

    var err = null;
    console.log("Eligible Locations:   ");
    console.log(finalLocList);
    console.log("Eligible Flights");
    //callback()
    
    db.getLocationInfo(finalLocList,function(err,results){
      console.log(finalLocList);
      for(var i =0; i< results.length; i++){


        for(var j=0; j<finalLocList; j++){
          console.log("flight: "+results[i]);
          console.log("location "+finalLocList[j]);
        }
      }




       for (var i =0;i<results.length;i++){
         for (var j=0;j<original_data.flights.length;j++){
        if(results[i].location == original_data.flights[j].destination){
          original_data.flights[j] = mergeRecursive(original_data.flights[j],results[i]);
          
       }
      }
    }
      var finalFlights = [];

      for (var k=0;k<original_data.flights.length;k++){
        if(! original_data.flights[k].location_name){
        }else{
          finalFlights.push(original_data.flights[k]);
        }
      }

      


      
      callback(finalFlights, err);
      /*
      for(everything in flight list){
        add info for each things
        location code =  get location code from flight list

        for(everything in location info){
          if location code is the same

          flightlist[i] = flightlist[i] += locationInfo[i]
        }
        flightlist[i] 
      }
      */
    })
    
  }

};
