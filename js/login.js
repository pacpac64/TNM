$( function(){
	
	
	var page = {
		
		
		//
		config: {
			selcts: {
				form:	'#page-content form',
				input:	'#pwd',
				button:	'#submit'
			},
			loggedKey: 'tnm-app-unlocked',
			homepage: 'home',
			loginPage: 'http://www.altrimedia-app.com/boldad/tnm/login.php'
		},
		
		
		//
		data: {
			els: {}
		},
		
		
		//
		init: function(){
			this.setup();
			this.bindEvents();
		},
		
		
		//
		setup: function(){
			this.querySelcts();
			if( this.isUnlocked() ){
				this.goNext();
			}
		},
		
		
		//
		isUnlocked: function(){
			return window.localStorage.getItem( this.config.loggedKey ) === 'ok';
		},
		
		
		//
		goNext: function(){
			window.app.goTo( this.config.homepage );
		},
		
		
		//
		querySelcts: function(){
			for( s in this.config.selcts ){
				this.data.els[ s ] = document.querySelector( this.config.selcts[ s ] );
			}
		},
		
		
		//
		bindEvents: function(){
			var _t = this;
			this.data.els.form.addEventListener( 'submit', function( e ){
				_t.onSubmit( e );
			});
		},
		
		
		//
		onSubmit: function( e ){
			e.preventDefault();
			var pwd = this.getInputs();
			this.submitCredentials( pwd );
		},
		
		
		//
		getInputs: function(){
			return this.data.els.input.value;
		},
		
		
		//
		submitCredentials: function( pwd ){
			var _t = this;
			$.ajax({
				url: this.config.loginPage,
				type: 'POST',
				data: { pwd: pwd },
				dataType: 'json',
				cache: false,
				crossDomain: true
			})
				.done( function( resp ){
					if( resp === 'ok' ){
						_t.unlock();
						_t.goNext();
					} else{
						_t.resetInputs();
						_t.echoError( 'Il codice inserito non è corretto' );
					}
				})
				.fail( function( err ){
					_t.echoError( 'Errore durante la connessione al server.\nRiprovare.');
				});
		},
		
		
		//
		unlock: function(){
			window.localStorage.setItem( this.config.loggedKey, 'ok' );
		},
		
		
		//
		resetInputs: function(){
			this.data.els.input.value = '';
		},
		
		
		//
		echoError: function( e ){
			alert( e );
		}
		
	};
	
	
	page.init();
	
});