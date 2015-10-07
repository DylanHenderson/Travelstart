
$(document).ready(function() {

	console.log("page loaded");
	$('#search').on('click',function(){
		searchTerm();
	})
    
  $('#search1').on('click',function(){
      searchTerm();
  })
});

function searchTerm(){
	    // jQuery AJAX call for JSON
    var name = $("#searchTerm").val();
    var location = $("select").val();    
    var dDate =  $("#dep").val();
    var rDate =  $("#ret").val();
    var minPrice =  $("#min").val();
    var maxPrice =  $("#max").val();

    console.log(name);
    console.log(location);
    console.log(dDate);
    console.log(rDate);
    console.log(minPrice);
    console.log(maxPrice);

    $.post('/query', {searchQuery: name, priceMin: minPrice, priceMax: maxPrice, departureDate: dDate, returnDate: rDate, departureLocation: location}, function(data, textStatus) 
    {
      //data contains the JSON object
      //textStatus contains the status: success, error, etc
      var dig = data.result;

       $.each(dig,function(i,obj){  

          var blah = '<h3>'+obj.locationName+
          '<span>'+obj.price+'</span>'+
          '</h3>'+
          '<a class="btn btn-default"> Book </a>'+
          '<ul>'+
          '<li></li>'+
          '<li></li>'+
          '<li></li>'+
          '<li> <a class="btn btn-default"> Details </a> </li>'+
          '<ul>';

          $('#test').html(blah);
        });

    }, "json");

}

function yesnoCheck() {
	if (document.getElementById('yesCheck').value == "1") 
	{
		document.getElementById('ifYes').style.display = 'block';
	}
	else document.getElementById('ifYes').style.display = 'none';

}