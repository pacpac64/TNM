;(function(){
	
	
	//==========================================
	
	
	var w = window,
		d = document,
		ev = w.customEvents;
	
	
	//==========================================
	
	
	w.Calculator = {
		
		
		config: {
			dataPath:	'combinations.json',
			combs:		[],
			info:		[],
			callback:	null
		},
		
		
		
		init: function( settings, callback ){
			if( typeof callback === 'function' ){
				this.config.callback = callback;
			}
			this.setup( settings );
		},
		
		
		
		setup: function( settings ){
			var _t = this;
			if( settings ){
				this.loadSettings( settings );
			}
			this.getData( function( data ){
				_t.loadData( data );
				_t.onInitEnded();
			});
		},
		
		
		
		loadSettings: function( settings ){
			var config = this.config;
			// override config
			for( var prop in settings ){
				if( settings.hasOwnProperty( prop ) ){
					config[prop] = settings[prop];
				}
			}
		},
		
		
		
		getData: function( callback ){
			var xhr,
				path = this.config.dataPath,
			
			xhr = new XMLHttpRequest();
			xhr.open( 'GET', path, false );
			xhr.onreadystatechange = function(){
				if( xhr.readyState !== 4 ){
					return;
				}
				if( xhr.status !== 0 && xhr.status !== 200 ){
					if( xhr.status === 400 ){
						console.log( 'Non si può accedere a ' + path );
					} else{
						console.error( 'HTTP error: ' + xhr.status );
					}
					return;
				}
				return callback( JSON.parse( xhr.responseText ) );
			};
			
			xhr.send();
		},
		
		
		
		loadData: function( data ){
			this.config.combs = data.combinations;
			this.config.info = data.stages;
		},
		
		
		
		onInitEnded: function(){
			if( this.config.callback ){
				this.config.callback();
			}
		},
		
		
		
		filter: function( keys ){
			var results = [];
			
			for( var i = 0, len = this.config.combs.length; i < len; i++ ){
				var combination = this.config.combs[i],
					matched = true;
				
				for( var k in keys ){
					if( combination.hasOwnProperty( k ) ){  // se è una chiave valida
						if( keys[k] != combination[k] ){
							matched = false;
							break;
						}
					}
				}
				
				if( matched ){
					results.push( combination );
				}
			}
			
			return results;
		},
		
		
		
		getStageInfo: function( stage, rlr ){
			var info = null;
			for( var i = 0, len = this.config.info.length; i < len; i++ ){
				if( this.config.info[i].s.indexOf( stage ) !== -1 && this.config.info[i].r == rlr ){
					info = this.config.info[i];
					break;
				}
			}
			return info;
		},
		
		
		
		decimale2roman: function( decimal ){
			var set = {
				'1': 'I',
				'2': 'II',
				'3': 'III',
				'4': 'IV',
				'4a': 'IVA',
				'4b': 'IVB',
				'4c': 'IVC'
			};
			return set[decimal];
		},
		
		
		
		roman2decimale: function( roman ){
			var set = {
				'1': 'I',
				'2': 'II',
				'3': 'III',
				'4': 'IV',
				'4a': 'IVA',
				'4b': 'IVB',
				'4c': 'IVC'
			};
			return Object.keys( set ).filter( function( key ){ return set[key] === roman; })[0];
		}
		
		
		
	};
	
	
	//==========================================
	
}());