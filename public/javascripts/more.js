function showDiv() 
{
   document.getElementById('moreOptions').style.display = "block";
   document.getElementById('sub').style.visibility = 'hidden';
   document.getElementById('more').style.visibility = 'hidden';
}

function showDetails() 
{
   document.getElementById('details').style.display = "block";
}

function showResults()
{
	document.getElementById('pricing-table').style.display = "block";
	document.getElementById('main').style.visibility = 'hidden';
	document.getElementById('moreOptions').style.visibility = 'hidden';
	//$('#pricing-table').slideToggle();
  	//$('#pricing-table').animate({ top: 100 }, 400);
}