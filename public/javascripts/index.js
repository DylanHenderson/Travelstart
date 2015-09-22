
$(document).ready(function() {

	console.log("page loaded");
	$('#search').on('click',function(){

		searchTerm();

	})

});

function searchTerm(){
	    // jQuery AJAX call for JSON

	console.log("data");
	var name = $("#searchterm").val();

    $.getJSON( '/query?name='+name, function( data ) {

    	/*
    	[
    	{
    		location:"NYC"



    	},
    	{
    		location:"PAR",
    		location_name: "Paris",
    		imageURL: "www.",
    		country: ""

    	}
    	]
    	*/
    	console.log(data.result);


    });
}

function yesnoCheck() {
	if (document.getElementById('yesCheck').value == "1") 
	{
		document.getElementById('ifYes').style.display = 'block';
	}
	else document.getElementById('ifYes').style.display = 'none';

}


$('.carousel').carousel({
	interval: 5000 //changes the speed
});