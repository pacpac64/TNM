$( function(){
	
	document.addEventListener( 'deviceready', function(){
		
		$( '.support-link' ).click( function( ev ){
			ev.preventDefault();
			window.open( ev.target.href, '_system' );
		});
		
	});
	
});