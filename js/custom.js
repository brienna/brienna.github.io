
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
				$('.validate-email').addClass('field-error');
				error = 1;
			}else{
				$('.validate-email').removeClass('field-error');
			}
		});

		// If validation is OK, send form, otherwise show error
		if (error == 1) {
			// Show error dialog briefly
			$('.error').fadeTo(200, 1);
			setTimeout(function(){$('.error').fadeTo(200, 0); }, 5000);
		} else {
			// Send message
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
		     	$('.success').css('z-index', 2).fadeTo(200, 1);
				setTimeout(function(){$('.success').fadeTo(200, 0).css('z-index', 0); }, 5000);
		  	}).fail(function() {
		     	alert('An error occurred please try again later.');
		  	});
		}
	});



});