	function showPopUpBanner() {
		$('.popUpBannerBox').fadeIn("1000");
	}
	setTimeout(showPopUpBanner, 1000);

	$('.form-control').click(function() {
		$('.popUpBannerBox').fadeOut("1000");
		return false;
	});