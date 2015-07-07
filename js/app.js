(function(){

	window.App = window.App || {};
	
	window.App.goTo = function( page, opts, params ){
		window.location.href = page + '.html' + ( params ? '?' + params : '' );
	};
	
	window.App.alert = function( mx, title, btn, callback ){
		// #FIXME implementare alert Cordova
		alert( mx );
	};
	
	window.App.confirm = function( mx, title, btn, callback ){
		// #FIXME implementare confirm Cordova
		return confirm( mx );
	};
	
	if( window.Notes ){
		window.App.notes = new window.Notes({ keyPrefix: 'tnm-app-note-' });
	}
	
	window.app = window.App;
	
}());