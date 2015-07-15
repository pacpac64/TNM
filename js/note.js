$( function(){
	
	
	var page = {
		
		
		//
		config: {
			
			selcts: {
				text:	'#text',
				save:	'#save'
			},
			
			notesListPage: 'notes-list'
			
		},
		
		
		//
		data: {
			els: {},
			action: null,
			id: null
		},
		
		
		//
		notes: window.app.notes,
		utils: window.Utils,
		
		
		//
		init: function(){
			this.setup();
			this.bindEvents();
		},
		
		
		//
		setup: function(){
			this.querySelcts();
			
			var queryParams = this.utils.getQueryParams();
			this.data.action = queryParams['note-id'] ? 'update' : 'insert';
			
			if( this.data.action === 'update' ){
				this.data.id = queryParams['note-id'];
				this.loadExistingNote();
			}
		},
		
		
		//
		querySelcts: function(){
			for( s in this.config.selcts ){
				this.data.els[ s ] = document.querySelector( this.config.selcts[ s ] );
			}
		},
		
		
		//
		loadExistingNote: function(){
			var existingNote = this.notes.query( [this.data.id] )[0];
			this.insertText( existingNote.note.body );
		},
		
		
		//
		insertText: function( text ){
			this.data.els.text.value = text;
		},
		
		
		//
		bindEvents: function(){
			var _t = this;
			this.data.els.save.addEventListener( 'click', function( e ){
				e.preventDefault();
				_t.onSave( e );
			});
		},
		
		
		//
		onSave: function(){
			var text = this.getText();
			if( text === '' ){
				if( this.data.action === 'update' ){
					this.notes.delete( this.data.id );
				}
			} else{
				this.data.action === 'update' ? this.notes.update( this.data.id, text ) : this.notes.insert( text );
			}
			window.app.goTo( this.config.notesListPage );
		},
		
		
		//
		getText: function(){
			return this.data.els.text.value;
		}
		
		
	};
	
	
	page.init();
	
});