$( function(){
	
	if( window.localStorage.getItem( 'tnm-app-unlocked' ) != 'ok' ){
		window.app.goTo( 'login' );
	}
	
});