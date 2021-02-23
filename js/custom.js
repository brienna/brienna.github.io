
$(document).ready(function() {

	/* Controls filtering animation */
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


	$("form").submit(function(e){
		// Return false, so that the form submits through jQuery
		// and does not reload the page
		if (e.preventDefault) e.preventDefault();
		else e.returnValue = false;

		// Set some variables
		error = 0;

		// Validate all fields (they can't be empty)
		$(this).find('.validate-required').each(function(){
			if ($(this).val() === ''){
				$(this).addClass('field-error');
				error = 1;
			} else{
				$(this).removeClass('field-error');
			}
		});

		// Validate email
		$(this).find('.validate-email').each(function(){
			if(!(/(.+)@(.+){2,}\.(.+){2,}/.test($(this).val()))){
				$(this).addClass('field-error');
				error = 1;
			}else{
				$(this).removeClass('field-error');
			}
		});

		// If validation is OK, send form, otherwise show error
		if (error == 1) {
			// Show error dialog
			$('.form-error').fadeIn(200);
			setTimeout(function(){$('.form-error').fadeOut(500); }, 5000);
		} else {
			// Hide error dialog
			$('.form-error').fadeOut(200);

		  	$.ajax({
			    type: "POST",
			    url: $(this).attr("action"),
			    crossDomain: true,
			    data: new FormData(this),
			    dataType: "json",
			    contentType: "multipart/form-data",
			    processData: false,
			    contentType: false,
			    headers: {
			      "Accept": "application/json"
			    }
		  	}).done(function(e) {
		  		//console.log(e);
		  		console.log("sent...");
		     	$('.success').fadeIn(1000);
				setTimeout(function(){$('.success').fadeOut(500); }, 5000);
		  	}).fail(function() {
		     	alert('An error occurred please try again later.');
		  	});
		}
	});



});