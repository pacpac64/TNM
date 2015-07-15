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


document.addEventListener('deviceready', function(event) 
            {
            	/*var leanModeButton = document.getElementById('leanModeButton'),
					immersiveModeButton = document.getElementById('immersiveModeButton'),
            		showUnderUiButton = document.getElementById('showUnderUiButton'),
            		showUiButton = document.getElementById('showUiButton');*/
            	
            	function successFunction()
            	{
            	    //console.log("It worked!");
            	}
            	function errorFunction(error)
            	{
            	    //console.log(error);
            	}
				
            	function trace(value)
            	{
            	    //console.log(value);
            	}
            	
            	/*leanModeButton.addEventListener('click', function(event)
            	{
            		AndroidFullScreen.leanMode(successFunction, errorFunction);
            	});
            	
            	immersiveModeButton.addEventListener('click', function(event)
            	{
            		AndroidFullScreen.immersiveMode(successFunction, errorFunction);
            	});
            	
            	showUnderUiButton.addEventListener('click', function(event)
             	{
             		AndroidFullScreen.showUnderSystemUI(successFunction, errorFunction);
             	});
            	
            	showUiButton.addEventListener('click', function(event)
             	{
             		AndroidFullScreen.showSystemUI(successFunction, errorFunction);
             	});*/
				
				AndroidFullScreen.leanMode(successFunction, errorFunction);
            	
            });