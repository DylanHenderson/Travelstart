function showDiv() 
{
   document.getElementById('moreOptions').style.display = "block";
   document.getElementById('search').style.visibility = 'hidden';
   document.getElementById('more').style.visibility = 'hidden';
}

function showDetails() 
{
   document.getElementById('details').style.display = "block";
}

function showResults()
{
	document.getElementById('main').style.height = '0px'
	document.getElementById('moreOptions').style.height = '0px'
	document.getElementById('main').style.visibility = 'hidden';
	document.getElementById('moreOptions').style.visibility = 'hidden';
	document.getElementById('main').style.display = 'none';
	document.getElementById('moreOptions').style.display = 'none';
	document.getElementById('pricing-table').style.display = "block";
}