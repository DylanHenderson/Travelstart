
$(document).ready(function() {

	console.log("page loaded");
	$('#search').on('click',function(){

		searchTerm();

	})

});

function searchTerm(){
	    // jQuery AJAX call for JSON

    var html = $("#test").html();

    $("#cent").html(html);

    console.log("data");

    var name = $("input").val();
    console.log(name)

    $.getJSON( '/query?name='+name, function( data ) {

    	/*
    	[
    	{
           '/query?name='+name
    		location:"PAR",
    		location_name: "Paris",
    		imageURL: "www.",
    		country: ""

    	}
    	]
    	*/
        

        var dig = data.result;

        // var  html = '<h3>'+ obj.locationName+
        //   '<span>'+ obj.price +'</span>'+
        //   '</h3>'+
        //   '<a class="btn.btn-default"> Book </a>'+
        //   '<ul>'+
        //   '<li></li>'+
        //   '<li></li>'+
        //   '<li></li>'+
        //   '<li> <a class="btn.btn-default"> Details </a> </li>'+
        //   '<ul>';

        

        $.each(dig,function(i,obj){  
          
          //var deep = obj.locationName;
          //showRes(obj);
          var blah = '<h3>'+obj.locationName+'<h3>';
          $('#test').text(blah);
          console.log(blah);
          $('#test').html(blah);
        });
        
    	//update the current page results with this data

    	//user jquery find outside div
    	//var location = $("#pricing-table");

    	//use ajax to insert html into outside div for each item in data
    	//testing
        


    });
}

function yesnoCheck() {
	if (document.getElementById('yesCheck').value == "1") 
	{
		document.getElementById('ifYes').style.display = 'block';
	}
	else document.getElementById('ifYes').style.display = 'none';

}