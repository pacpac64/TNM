$( function(){
	
	
	var page = {
		
		
		config: {
			selcts: {
				back:	'#back-btn',
				t:		'#t',
				n:		'#n',
				m:		'#m',
				rlr:	'#rlr',
				choiceTab:	'#choice-tab',
				stageNum:	'.stage-num',
				stageDescr:	'.stage-descr',
				lineGuideBtn:'.line-guide-btn',
				aiomTab:	'#aiom-tab',
				aiomLineGuide:'#aiom-line-guide',
				esmoTab:	'#esmo-tab',
				esmoLineGuide:'#esmo-line-guide',
				closeTab:	'.close-popup-btn',
				pageContent: '#page-content'
			}
		},
		
		
		data: {
			els: {},
			inputs: {}
		},
		
		
		utils: window.Utils,
		calc: null,
		
		
		init: function(){
			this.setup();
		},
		
		
		setup: function(){
			this.querySelctsAll();
			this.getInputs();
			this.changeBg();
			this.calc = window.Calculator;
			this.calc.init({
				dataPath: 'json/stages.json'
			});
			this.showTab( 'choice' );
			this.loadInputs();
			this.loadOutputs();
			this.bindEvents();
		},
		
		
		querySelctsAll: function(){
			for( s in this.config.selcts ){
				var els = document.querySelectorAll( this.config.selcts[ s ] );
				this.data.els[ s ] = els.length === 1 ? els.item(0) : els;
			}
		},
		
		
		getInputs: function(){
			this.data.inputs = this.utils.getQueryParams();
		},
		
		
		changeBg: function(){
			//this.data.els.pageContent.dataset.appBgCalc = this.data.inputs.idCalc;
			this.data.els.pageContent.setAttribute( 'data-app-bg-calc', this.data.inputs.idCalc );
		},
		
		
		showTab: function( tab ){
			var tabsList = [ 'choice', 'aiom', 'esmo' ],
				_t = this;
			// first hide all
			tabsList.forEach( function( tabName ){
				_t.utils.removeClass( _t.data.els[ tabName + 'Tab' ], 'tab-show' );
				_t.utils.addClass( _t.data.els[ tabName + 'Tab' ], 'tab-hide' );
			});
			// show
			if( tabsList.indexOf( tab ) !== -1 ){
				_t.utils.removeClass( _t.data.els[ tab + 'Tab' ], 'tab-hide' );
				_t.utils.addClass( _t.data.els[ tab + 'Tab' ], 'tab-show' );
			}
		},
		
		
		loadInputs: function(){
			for( var i in this.data.inputs ){
				if( this.data.els[i] ){
					if( i == 'rlr' ){
						this.data.els[i].innerHTML = this.data.inputs[i] === '1' ? 'Sì' : 'No';
					} else{
						this.data.els[i].innerHTML = this.data.inputs[i];
					}
				}
			}
		},
		
		
		loadOutputs: function(){
			var output = this.calc.filter( this.data.inputs ),
				outputData = this.prepareOutputs( output[0]['s'], this.data.inputs.rlr );
			[].slice.call( this.data.els.stageNum ).forEach( function( el ){ el.innerHTML = outputData.num; });
			[].slice.call( this.data.els.stageDescr ).forEach( function( el ){ el.innerHTML = outputData.descrs; });
			this.data.els.aiomLineGuide.innerHTML = outputData.aiom;
			this.data.els.esmoLineGuide.innerHTML = outputData.esmo;
		},
		
		
		prepareOutputs: function( output, rlr ){
			var num = output !== '0' ? this.calc.decimale2roman( output ) : 0,
				info = this.calc.getStageInfo( output, rlr ) || {};
			return {
				num: 'Stadio ' + num,
				descrs: info.name || '',
				aiom: info.aiom || '',
				esmo: info.esmo || ''
			};
		},
		
		
		bindEvents: function(){
			var _t = this;
			this.data.els.back.addEventListener( 'click', function( ev ){
				_t.goBack( ev );
			});
			[].slice.call( this.data.els.lineGuideBtn ).forEach( function( btn ){
				btn.addEventListener( 'click', function( ev ){
					//var tabName = ev.target.dataset.appTabName;
					var tabName = ev.target.getAttribute( 'data-app-tab-name' );
					_t.showTab( tabName );
				});
			});
			[].slice.call( this.data.els.closeTab ).forEach( function( btn ){
				btn.addEventListener( 'click', function( ev ){
					_t.showTab( 'choice' );
				});
			});
		},
		
		
		goBack: function( ev ){
			var queryParams = this.data.inputs,
				sQueryParams = this.utils.serializeAndQueryParam( queryParams ),
				destPage = queryParams.idCalc === 'tnm' ? 'calc-tnm' : 'calc-stad';
			app.goTo( destPage, {}, sQueryParams );
		}
		
		
	};
	
	page.init();
	
});
