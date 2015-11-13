
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
      var everything = "";
      var print = "";
      var blah = "";

      console.log(data);

       $.each(dig,function(i,obj){  
          flight = '<div class="plan">'+'<h3>'+obj.location_name+
          '<span>R'+obj.price+'</span>'+
          '</h3>'+
          //'<a class="btn btn-default", onclick="showPopUp('+'"'+obj.location_name+'"'+')\"> Book </a>'+
          '<a class="btn btn-default", onclick=\"showPopUp('+'\''+obj.location+ '\',' +'\''+name+ '\''+')\"> Book </a>'+
          '<ul>'+
          '<li>'+obj.country+'</li>'+
          '<li></li>'+
          '<li></li>'+
          '<ul>'+'</div>';

          everything = everything + flight;          
        });

        back = '<a type="button">'+
        '<buttom id="back" onclick="showSearch()" class="btn btn-default">'+'Back'+'</buttom>'+
        '</a>';

        print = everything + back;

        $('#cent').html(print);

    }, "json");

}

function yesnoCheck() {
	if (document.getElementById('yesCheck').value == "1") 
	{
		document.getElementById('ifYes').style.display = 'block';
	}
	else document.getElementById('ifYes').style.display = 'none';

}