(function(){

	window.Utils = window.Utils || {};
	
	
	// Agnitio Framework
	window.Utils.getData = function( path, callback ){
		
		var xhr,
			t = this;
		
		xhr = new XMLHttpRequest();
		xhr.open( 'GET', path, false );
		xhr.onreadystatechange = function(){
			if( xhr.readyState !== 4 ){
				return;
			}
			if( xhr.status !== 0 && xhr.status !== 200 ){
				if( xhr.status === 400 ){
					console.log( 'Could not locate ' + path );
				} else{
					console.error( 'utils.getData ' + path + ' HTTP error: ' + xhr.status );
				}
				return;
			}
			return callback( xhr.responseText );
		};
		xhr.send();
		
	};
	
	
	//
	window.Utils.hasClass = function( el, className ){
		if( el.className ){
			return el.className.match( new RegExp( '(\\s|^)' + className + '(\\s|$)' ) );
		} else{
			return false;
		}
	};
	
	
	
	//
	window.Utils.addClass = function( el, className ){
		if( !this.hasClass( el, className ) ){
			el.className += ' ' + className;
		}
	};
	
	
	//
	window.Utils.removeClass = function( el, className ){
		var cleaned = new RegExp( new RegExp( '(\\s|^)' + className + '(\\s|$)' ) );
		el.className = el.className.replace( cleaned, ' ' );
	};
	
	
	//
	window.Utils.toggleClass = function( el, className ){
		if( this.hasClass( el, className ) ){
			this.removeClass( el, className );
		} else{
			this.addClass( el, className );
		}
	};
	
	
	// https://stackoverflow.com/questions/979975/how-to-get-the-value-from-url-parameter#1099670
	window.Utils.getQueryParams = function(){
		var vars = {},
			parts = window.location.href.replace( /[?&]+([^=&]+)=([^&]*)/gi, function( m, key, value ){
				vars[key] = value;
			});
		return vars;
	};
	
	
	// https://stackoverflow.com/questions/3391576/how-can-i-implement-prepend-and-append-with-regular-javascript#3391622
	window.Utils.prepend = function( el, parent ){
		parent.insertBefore( el, parent.children[0] );
	};
	
	
	// https://stackoverflow.com/questions/10425287/convert-string-to-camelcase-with-regular-expression#10425344
	window.Utils.camelCase = function( str ){
		return str.toLowerCase().replace( /-(.)/g, function( match, group1 ){
			return group1.toUpperCase();
		});
	};
	
	
	// https://stackoverflow.com/questions/3199588/fastest-way-to-convert-javascript-nodelist-to-array#15144269
	window.Utils.nl2a = function( collection ){
		var arr = [];
		for( var i = -1 , l = collection.length; ++i !== l; arr[i] = collection[i] );
		return arr;
	};
	
	
	// https://stackoverflow.com/questions/1267283/how-can-i-create-a-zerofilled-value-using-javascript?page=1&tab=votes#1267338
	window.Utils.zeroFill = function( num, width ){
		width -= num.toString().length;
		if( width > 0 ){
			return new Array( width + (/\./.test( num ) ? 2 : 1) ).join( '0' ) + num;
		}
		return num + ''; // always return a string
	};
	
	
	// https://stackoverflow.com/questions/423376/how-to-get-the-file-name-from-a-full-path-using-javascript#423385
	window.Utils.getFileName = function( url ){
		return url.replace( /^.*[\\\/]/, '' );
	};
	
	
	// https://stackoverflow.com/questions/6566456/how-to-serialize-a-object-into-a-list-of-parameters#6566471
	window.Utils.serializeAndQueryParam = function( obj ){
		var str = '';
		for( var key in obj ){
			if( str != '' ){
				str += '&';
			}
			str += key + '=' + encodeURIComponent(obj[key]);
		}
		return str;
	};
	
	
	// https://stackoverflow.com/questions/171251/how-can-i-merge-properties-of-two-javascript-objects-dynamically?page=1&tab=votes#171256
	window.Utils.mergeObjs = function( obj1,obj2 ){
		var obj3 = {};
		for( var attrname in obj1 ){ obj3[attrname] = obj1[attrname]; }
		for( var attrname in obj2 ){ obj3[attrname] = obj2[attrname]; }
		return obj3;
	}
	

}());