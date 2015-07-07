$( function(){
	
	
	var page = {
		
		
		config: {
			dataFile: 'json/tnm.json',
			selcts: {
				tDim:	'#t-dim',
				tExt:	'#t-ext',
				nText:	'#n-text',
				mVal:	'input[name="m-val"]',
				rlrVal:	'input[name="rlr-val"]',
				mSwitch:'#m-val-switch',
				rlrSwitch:'#rlr-val-switch',
				submit:	'#submit',
				reset:	'#reset',
				form:	'form'
			},
			idCalc: 'tnm'
		},
		
		
		data: {
			els: {},
			prevInputs: {}
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
			this.loadForm();
		},
		
		
		getPrevInputs: function(){
			this.data.prevInputs = this.utils.getQueryParams();
		},
		
		
		querySelctsAll: function(){
			for( s in this.config.selcts ){
				var els = document.querySelectorAll( this.config.selcts[ s ] );
				this.data.els[ s ] = els.length === 1 ? els.item(0) : els;
			}
		},
		
		
		loadForm: function(){
			this.getFormData();
		},
		
		
		getFormData: function(){
			var _t = this;
			this.utils.getData( this.config.dataFile, function( textData ){
				_t.saveData( textData );
				_t.buildForm();
			});
		},
		
		
		saveData: function( textData ){
			// #TODO deep copy?
			this.srcData = JSON.parse( textData );
		},
		
		
		buildForm: function(){
			var selectToBuild = [
					{ html: 'tDim',	json: 't-dim'	},
					{ html: 'tExt',	json: 't-ext'	},
					{ html: 'nText',json: 'n-text'	},
				],
				_t = this;
			/*selectToBuild.forEach( function( s ){
				var options = _t.srcData.texts[ s.json ],
					html = '<option value=""></option>';
				options.forEach( function( o, index ){
					html += '<option value="' + index + '">' + o + '</option>';
				});
				_t.data.els[ s.html ].innerHTML = html;
			});*/
			selectToBuild.forEach( function( s ){
				var options = _t.srcData.texts[ s.json ],
					emptyOption;
				
				emptyOption = document.createElement( 'option' );
				emptyOption.value = '';
				_t.data.els[ s.html ].appendChild( emptyOption );
				
				options.forEach( function( o, index ){
					var option = document.createElement( 'option' );
					option.value = index;
					option.innerHTML = o;
					_t.data.els[ s.html ].appendChild( option );
				});
				
			});
		},
		
		
		bindEvents: function(){
			var _t = this;
			this.data.els.mSwitch.addEventListener( 'click', function( e ){
				//var toggledVal = 1 - e.target.dataset.radioValue;
				var toggledVal = 1 - e.target.getAttribute( 'data-radio-value' );
				$( document.querySelector( _t.config.selcts.mVal + '[value="' + toggledVal + '"]' ) ).prop( 'checked', true );
				//e.target.dataset.radioValue = toggledVal;
				e.target.setAttribute( 'data-radio-value', toggledVal );
				// fix IE bug
				e.target.style.display = 'none';
				e.target.style.display = 'block';
			});
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
			this.data.els.form.addEventListener( 'reset', function( e ){
				_t.onReset( e );
			});
			this.data.els.form.addEventListener( 'submit', function( e ){
				_t.onSubmit( e );
			});
		},
		
		
		onReset: function( e ){
			//this.data.els.mSwitch.dataset.radioValue = 0;
			this.data.els.mSwitch.setAttribute( 'data-radio-value', 0 );
			//this.data.els.rlrSwitch.dataset.radioValue = 0;
			this.data.els.rlrSwitch.setAttribute( 'data-radio-value', 0 );
		},
		
		
		onSubmit: function( e ){
			e.preventDefault();
			var userInputs = this.getInputs(),
				preparedInputs;
			preparedInputs = this.text2nums( userInputs );
			preparedInputs = this.utils.mergeObjs( preparedInputs, userInputs );  // servono i valori pre-calcoli per quando si torna indietro
			preparedInputs.idCalc = this.config.idCalc;
			app.goTo( 'show-results', null, this.utils.serializeAndQueryParam( preparedInputs ) );
		},
		
		
		getInputs: function(){
			var selcts = [ 'tDim', 'tExt', 'nText', 'mVal', 'rlrVal' ],
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
		
		
		text2nums: function( inputs ){
			var t, n, m, rlr;
			
			if( inputs.tDim === '0' && inputs.tExt === '2' ){ t = '1';	}
			if( inputs.tDim === '1' && inputs.tExt === '2' ){ t = '2';	}
			if( inputs.tDim === '2' && inputs.tExt === '2' ){ t = '3';	}
			if( inputs.tDim === '0' && inputs.tExt === '0' ){ t = '4a';	}
			if( inputs.tDim === '1' && inputs.tExt === '0' ){ t = '4a';	}
			if( inputs.tDim === '2' && inputs.tExt === '0' ){ t = '4a';	}
			if( inputs.tDim === '0' && inputs.tExt === '1' ){ t = '4b';	}
			if( inputs.tDim === '1' && inputs.tExt === '1' ){ t = '4b';	}
			if( inputs.tDim === '2' && inputs.tExt === '1' ){ t = '4b';	}
			
			if( inputs.nText === '0' ){ n = '0'; }
			if( inputs.nText === '1' ){ n = '1'; }
			if( inputs.nText === '2' ){ n = '2'; }
			if( inputs.nText === '3' ){ n = '2'; }
			if( inputs.nText === '4' ){ n = '2'; }
			if( inputs.nText === '5' ){ n = '3'; }
			
			if( inputs.mVal === '0' ){ m = '0'; }
			if( inputs.mVal === '1' ){ m = '1'; }
			
			if( inputs.rlrVal === '0' ){ rlr = '0'; }
			if( inputs.rlrVal === '1' ){ rlr = '1'; }
			
			return {
				t: t,
				n: n,
				m: m,
				rlr: rlr
			};
		},
		
		
		loadPrevVals: function(){
			if( Object.keys( this.data.prevInputs ).length > 0 ){
				this.data.els.tDim.value = this.data.prevInputs.tDim;
				this.data.els.tExt.value = this.data.prevInputs.tExt;
				this.data.els.nText.value = this.data.prevInputs.nText;
				if( this.data.prevInputs.mVal === '1' ){
					$( this.data.els.mSwitch ).trigger( 'click' );
				}
				if( this.data.prevInputs.rlrVal === '1' ){
					$( this.data.els.rlrSwitch ).trigger( 'click' );
				}
			}
		}
		
		
	};
	
	
	page.init();
	
});
