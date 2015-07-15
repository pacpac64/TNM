$( function(){
	
	
	var page = {
		
		
		config: {
			dataFile: 'json/tnm.json',
			selcts: {
				t:		'#t',
				n:		'#n',
				m:		 '#m',
				rlrVal:	'input[name="rlr-val"]',
				rlrSwitch:'#rlr-val-switch',
				submit:	'#submit',
				form:	'form'
			},
			idCalc: 'stad'
		},
		
		
		data: {
			els: {}
		},
		
		
		srcData: {},
		
		
		utils: window.Utils,		
		
		
		init: function(){
			this.setup();
			this.bindEvents();
			this.loadPrevVals();
		},
		
		
		setup: function(){
			this.querySelctsAll();
			this.getPrevInputs();
		},
		
		
		querySelctsAll: function(){
			for( s in this.config.selcts ){
				var els = document.querySelectorAll( this.config.selcts[ s ] );
				this.data.els[ s ] = els.length === 1 ? els.item(0) : els;
			}
		},
		
		
		getPrevInputs: function(){
			this.data.prevInputs = this.utils.getQueryParams();
		},
		
		
		bindEvents: function(){
			var _t = this;
			this.data.els.rlrSwitch.addEventListener( 'click', function( e ){
				//var toggledVal = 1 - e.target.dataset.radioValue;
				var toggledVal = 1 - e.target.getAttribute( 'data-radio-value' );
				$( document.querySelector( _t.config.selcts.rlrVal + '[value="' + toggledVal + '"]' ) ).prop( 'checked', true );
				//e.target.dataset.radioValue = toggledVal;
				e.target.setAttribute( 'data-radio-value', toggledVal );
				// fix IE bug
				e.target.style.display = 'none';
				e.target.style.display = 'block';
			});
			this.data.els.form.addEventListener( 'submit', function( e ){
				_t.onSubmit( e );
			});
		},
		
		
		onSubmit: function( e ){
			e.preventDefault();
			var userInputs = this.getInputs();
			userInputs.rlr = userInputs.rlrVal;  // #FIXME
			userInputs.idCalc = this.config.idCalc;
			app.goTo( 'show-results', null, this.utils.serializeAndQueryParam( userInputs ) );
		},
		
		
		getInputs: function(){
			var selcts = [ 't', 'n', 'm', 'rlrVal' ],
				vals = {},
				_t = this;
			selcts.forEach(function( s ){
				var el = null;
				// #FIXME not only select
				if( _t.data.els[ s ].tagName === 'SELECT' ){
					el = _t.data.els[ s ];
				} else{
					// get checked radio input
					[].slice.call( _t.data.els[ s ] ).forEach( function( e ){
						if( e.checked ){
							el = e;
						}
					});
				}
				vals[s] = el.value;
			});
			return vals;
		},
		
		
		loadPrevVals: function(){
			if( Object.keys( this.data.prevInputs ).length > 0 ){
				this.data.els.t.value = this.data.prevInputs.t;
				this.data.els.n.value = this.data.prevInputs.n;
				this.data.els.m.value = this.data.prevInputs.m;
				if( this.data.prevInputs.rlrVal === '1' ){
					$( this.data.els.rlrSwitch ).trigger( 'click' );
				}
			}
		}
		
		
	};
	
	
	page.init();
	
	
});
