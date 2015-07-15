(function(){
	
	document.addEventListener( 'deviceready', function(){
		var links = document.querySelectorAll( '#page-content a.biblio-link' );
		[].slice.call( links ).forEach( function( l ){
			l.addEventListener( 'click', function( ev ){
				ev.preventDefault();
				window.open( ev.target.href, '_target', 'location=no,closebuttoncaption=Chiudi' );
			});
		});
    });
	
}());