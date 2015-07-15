(function(){
	
	document.addEventListener( 'deviceready', function(){
		$( document ).on( 'js-duplicate-menu', function(){
			var rcpBtns = document.querySelectorAll( '#pageslide #nav li a.item-rcp' );
			[].slice.call( rcpBtns ).forEach( function( btn ){
				btn.addEventListener( 'click', function( ev ){
					ev.preventDefault();
					window.open( 'pdf/rcp.pdf', '_blank', 'closebuttoncaption=Chiudi,location=no' );
					$.pageslide.close();
				});
			});
		});
    });
	
}());