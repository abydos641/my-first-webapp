;(function ( $, window, document, undefined ) {
	'use strict';
	$(document).ready(function() {
		//create the form
		$('#submit').on('click', function(e){
			e.preventDefault();
			console.log(e);
			var user = {
				'name': $('#name').val(),
				'email': $('#email').val()
			};
			console.log(user);
			$.ajax({
				type: 'POST',
				/* JSON Stringify was double-encoding, 
				and this resulted in our fixed code not 
				POSTing correctly. Stringify was removed. */
				data: user,
				url: '/users',
				dataType: 'JSON'
			}).done(function(res){
				console.log(res);
			});
		});
	});
})( jQuery, window, document );