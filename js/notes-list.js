$( function(){
	
	
	var page = {
		
		
		//
		config: {
			selcts: {
				listContainer:'#notes-list',
				add:		'#add',
				dels:		'.delete-note'
			}
		},
		
		
		//
		data: {
			els: {}
		},
		
		
		//
		notes: window.app.notes,
		utils: window.app.utils,
		
		
		//
		init: function(){
			this.querySelcts();
			this.setup();
		},
		
		
		//
		setup: function(){
			this.loadExistingNotes();
			this.querySelcts();
			this.bindEvents();
		},
		
		
		//
		querySelcts: function(){
			this.data.els.listContainer = document.querySelector( this.config.selcts.listContainer );
			this.data.els.add = document.querySelector( this.config.selcts.add );
			this.data.els.dels = document.querySelectorAll( this.config.selcts.dels );
		},
		
		
		//
		loadExistingNotes: function(){
			var existingNotes = this.notes.query([]);
			//if( existingNotes.length > 0 ){
				this.insertList( this.buildHTMLList( existingNotes ) );
			//}
		},
		
		
		//
		insertList: function( HTMLList ){
			this.data.els.listContainer.innerHTML = HTMLList;
		},
		
		
		//
		buildHTMLList: function( notesList ){
			var html = '';
			notesList.forEach( function( n ){
				html += '<div class="note-row">\n';
				html += '	<a href="note.html?note-id=' + n.id + '">' + n.note.title + '</a>\n';
				html += '	<button class="delete-note transparent-btn" data-app-note-id="' + n.id + '"></button>\n';
				html += '</div>\n';
			});
			return html;
		},
		
		
		//
		bindEvents: function(){
			var _t = this;
			[].slice.call( this.data.els.dels ).forEach( function( del ){
				del.addEventListener( 'click', function( ev ){
					_t.onDeleteClick( ev );
				});
			});
		},
		
		
		//
		onDeleteClick: function( ev ){
			//var noteId = ev.target.dataset.appNoteId;
			var noteId = ev.target.getAttribute( 'data-app-note-id' );
			if( window.app.confirm( 'Si vuole davvero cancellare questa nota?' ) ){
				this.notes.delete( noteId );
				//window.app.goTo( 'notes-list' );  // reload
				this.setup();  // reload
			}
		}
		
		
	};
	
	
	page.init();
	
});
