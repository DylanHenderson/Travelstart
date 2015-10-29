var location_selected="";

$(document).ready(function() {

	$('#sub').click(function() 
	{
		sendResults();
		$('.popUpBannerBox').fadeOut("2000");
		return false;
	});
	
});

function showPopUp(location_name)
{
	console.log(location_name);
	location_selected=location_name;
	$('.popUpBannerBox').fadeIn("2000");
}

function sendResults()
{
	var stars = $("input[name=rating]:checked").val();
	var phrase = $("#terms").val();

	console.log(stars);
	console.log(phrase);
	
    $.post('/keyword', {location: location_selected, keyword: phrase}, function(data, textStatus) 
    {


    }, "json");
}

