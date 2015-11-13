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
	document.getElementById('main').style.display = 'none';
	document.getElementById('moreOptions').style.display = 'none';
	document.getElementById('car').style.display = 'none';
	document.getElementById('pricing-table').style.display = "block";
}

function showSearch()
{
	document.getElementById('main').style.display = 'block';
	document.getElementById('moreOptions').style.display = 'block';
	document.getElementById('car').style.display = 'block';
	document.getElementById('pricing-table').style.display = "none";
}