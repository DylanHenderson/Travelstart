$(document).ready(function() {

	$('#skip, #sub').click(function() 
	{
		sendResults();
		$('.popUpBannerBox').fadeOut("2000");
		return false;
	});
	
});

function showPopUp() 
{
	$('.popUpBannerBox').fadeIn("2000");
}

function sendResults()
{
	var stars = $("input[name=rating]:checked").val();
	var phrase = $("#terms").val();

	console.log(stars);
	console.log(phrase);

	$.post()
	{

	}
}

