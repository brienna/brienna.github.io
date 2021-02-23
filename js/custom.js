
$(document).ready(function() {

	$('.projects').isotope({
		itemSelector: '.project',
		layoutMode: 'fitRows'
	});

	// If select different filter, mark new filter as active
	// and the old filter as non-active
	$('.filters li').click(function() {
		var currentFilter = $(this);
		currentFilter.siblings('li').removeClass('active');
		currentFilter.addClass('active');
		var filterValue = currentFilter.attr('data-filter');
		//var container = currentFilter.closest('.projects-wrapper').find('projects');
		console.log("Filtering on " + filterValue);
		$('.projects').isotope({filter: filterValue});
	});





});