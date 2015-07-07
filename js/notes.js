(function(){
	
	
	//==========================================
	
	
	var w = window,
		d = document,
		ev = w.customEvents;
	
	
	//==========================================
	
	
	w.Notes = (function(){
		
		//
		function Notes( settings ){
			settings = settings || {};
			this.config = {};
			this.config.version = '0.0.2';
			this.config.app = settings.app || w.app;
			this.config.maxTitleLen = settings.maxTitleLen || 25;
			this.config.etc = settings.etc || '...';
			this.config.keyPrefix = settings.keyPrefix || 'app-note-';
		}
		
		
		//
		Notes.prototype.init = function(){};
		
		
		//
		Notes.prototype.insert = function( note ){
			var id = this.generateId(),
				packedNote = this.pack( note );
			this.set( id, packedNote );
		};
		
		
		//
		Notes.prototype.update = function( id, note ){
			var packedNote = this.pack( note );
			this.set( id, packedNote );
		};
		
		
		//
		Notes.prototype.delete = function( id ){
			this.unset( id );
		};
		
		
		// passare array di id, array vuoto per tutte; ritorna un array
		Notes.prototype.query = function( ids ){
			var results = [],
				_t = this;
			
			if( ids.length === 0 ){
				ids = this.keys();
			}
			
			ids.forEach( function( i ){
				results.push({
					id: i,
					note: _t.unpack( _t.get( i ) )
				});
			});
			
			return results;
		};
		
		
		//
		Notes.prototype.generateId = function(){
			return Date.now();
		};
		
		
		//
		Notes.prototype.sliceTitle = function( note ){
			var title;
			if( note.length > this.config.maxTitleLen ){
				title = note.substr( 0, this.config.maxTitleLen - this.config.etc.length ) + this.config.etc;
			} else{
				title = note;
			}
			return title;
		};
		
		
		//
		Notes.prototype.pack = function( note ){
			return JSON.stringify({
				title:	this.sliceTitle( note ),
				body:	note
			});
		};
		
		
		//
		Notes.prototype.unpack = function( str ){
			return JSON.parse( str );
		};
		
		
		//
		Notes.prototype.id2key = function( id ){
			return this.config.keyPrefix + id;
		};
		
		
		//
		Notes.prototype.key2id = function( key ){
			return key.replace( this.config.keyPrefix, '' );
		};
		
		
		//
		Notes.prototype.set = function( id, value ){
			w.localStorage.setItem( this.id2key( id ), value );
		};
		
		
		//
		Notes.prototype.unset = function( id ){
			w.localStorage.removeItem( this.id2key( id ) );
		};
		
		
		//
		Notes.prototype.get = function( id ){
			return w.localStorage.getItem( this.id2key( id ) );
		};
		
		
		//
		Notes.prototype.keys = function(){
			var keys = [],
				_t = this;
			Object.keys( w.localStorage ).forEach( function( k ){
				if( k.indexOf( _t.config.keyPrefix ) !== -1 ){
					keys.push( _t.key2id( k ) );
				}
			});
			return keys;
		};
		
		
		return Notes;
		
	}());
	
	
	//==========================================
	
	
}());