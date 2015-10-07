$(document).ready(function() {

	$('#book').on('click',function(){
		console.log("shows up");
		showPopUp();
	})

	$('#sub').on('click',function(){
		console.log("clicked");
		sendResults();
	})
});

function showPopUp() 
{
		$('.popUpBannerBox').fadeIn("2000");
}


$('#skip').click(function() {
	$('.popUpBannerBox').fadeOut("2000");
	return false;
});

function sendResults()
{
	var stars = $("input[name=rating]:checked").val();
	var phrase = $("#terms").val();

	console.log(stars);
	console.log(phrase);
}