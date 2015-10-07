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
      /*
      function setfinalList(){
        db.getLocationInfo(finalLocList,function(err,results){
            console.log(results);
            callback(results,err)  
        });
      }*/

      }
      function populateFlights(list){
       for(var i =0;i<original_data.flights.length;i++){
      
       if(list.indexOf(original_data.flights[i].destination)>-1){
        finalFlightList.push(original_data.flights[i]);
       
      }
       finalFlightList.sort(comparePrice);   
       

      }
    }
      
      setfinalLocationList();

      populateFlights(finalLocList);
      finalFlightList.sort(comparePrice);
      vectorRanking(samplequery);
      locationVectors.sort(compare);
          
    var err = null;
    console.log("Eligible Locations:   ");
    console.log(finalLocList);
    console.log("Eligible Flights");
    console.log(finalFlightList);

    //callback()
    

    callback(finalFlightList, err);
  }

};
