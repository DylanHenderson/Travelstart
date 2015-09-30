$(document).ready(function() {

	$('#book').on('click',function(){

		showPopUp();

	})
});

function showPopUp() 
{
		$('.popUpBannerBox').fadeIn("2000");
}


	$('.closeButton, #sub, #skip').click(function() {
		$('.popUpBannerBox').fadeOut("2000");
		return false;
	});