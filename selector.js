/*
	bs selector 백승현
	http://css4-selectors.com/browser-selector-test/
	http://kimblim.dk/css-tests/selectors/
*/
var bssel = (function(){
'use strict';
var isQS;
isQS = ( typeof document.querySelector == 'function' ); // <= IE8

var trim = (function(){
	var dotrim = (function(){
		var r0 = /^\s*|\s*$/g;
		return function(str){
			return typeof String.prototype.trim == 'function' ? str.trim() : str.replace(r0, '');
		};
	})();
	return function(t){
		var i;
		if( t.splice ){
			for( i=t.length; i--; ) t[i] = dotrim( t[i] );
			return t;
		}
		return dotrim(t);
	}
})();
var uniqArray = function(arr) {
	var _ret = [], _len = arr.length, i, j;
	for (i = 0; i < _len; i++) {
		for (j = i + 1; j < _len; j++)
			if (arr[i] === arr[j]) j = ++i;
		_ret.push(arr[i]);
	}
	return _ret;
};
var echo = function(target, filter, parentName) {
	var k;
	if (parentName && (typeof parentName != "string" || typeof parentName == "string" && (parentName.split(".").length + parentName.split("]").length) > 3)) return;
	if (!filter) filter = "";
	if (target === null || target === undefined) {
		console.log(((parentName) ? parentName + "." : "") + target);
		return;
	}
	if (typeof target != "object") {
		if (typeof target == filter || filter === "")
			console.log(((parentName) ? parentName + "." : "") + target + "["+ typeof target +"]");
		return;
	}
	(target instanceof Array) ? console.log(((parentName) ? parentName + ":" : "") + "[Array["+ target.length + "]]") : console.log(((parentName) ? parentName + ":" : "") + "[Object]");
	for (k in target) {
		if (target instanceof Array) {
			if (typeof target[k] == "object")
				echo(target[k], filter, ((parentName) ? parentName + "[" : "[") + k + ((parentName) ? "]" : "]"));
			else if (typeof target[k] == filter || filter === "")
				console.log(((parentName) ? parentName + "[" : "[") + k + ((parentName) ? "]" : "]") + ":" + target[k] + " ("+ typeof target[k] +")");
		} else {
			if (typeof target[k] == "object")
				echo(target[k], filter, ((parentName) ? parentName + "." : "")+k);
			else if (typeof target[k] == filter || filter === "")
				console.log(((parentName) ? parentName + "." : "") + k + ":" + target[k] + " ("+ typeof target[k] +")");
		}
	}
};
var CSSSelectors = {
	'CSS1': {
		'Type': ['E'],
		'ID': ['E#ElementID'],
		'Class': ['E.classname'],
		'Descendant combination': ['E F'],
		'User action pseudo-class': ['E:active'],
		'Link history pseudo-class': ['E:link']
	},
	'CSS2': {
		'Universal': ['*'],
		'User action pseudo-class': ['E:hover', 'E:focus'],
		'Dir pseudo-class': ['E:dir(ltr)'],
		'Lang pseudo-class': ['E:lang(en)'],
		'Attribute': ['E[foobar]', 'E[foo=\'bar\']', 'E[foo~=\'bar\']', 'E[foo|=\'en\']'],
		'Structural pseudo-class': ['E:first-child'],
		'Child combination': ['E > F'],
		'Adjacent sibling combination': ['E + F']
	},
	'CSS3': {
		'Negation pseudo-class': ['E:not(s)'],
		'Target pseudo-class': ['E:target'],
		'Scope pseudo-class': ['E:scope'],
		'Enabled and Disabled pseudo-class': ['E:enabled', 'E:disabled'],
		'Selected-option pseudo-class': ['E:checked'],
		'Structural pseudo-class': ['E:root', 'E:empty', 'E:last-child', 'E:only-child', 'E:first-of-type', 'E:last-of-type', 'E:only-of-type', 'E:nth-child(n)', 'E:nth-last-child(n)', 'E:nth-of-type(n)', 'E:nth-last-of-type(n)'],
		'Attribute': ['E[foo^=\'bar\']', 'E[foo$=\'bar\']', 'E[foo*=\'bar\']'],
		'General sibling combinator': ['E ~ F']
	},
	'CSS4': {
		'Negation pseudo-class': ['E:not(s1, s2)'],
		'Matches-any pseudo-class': ['E:matches(s1, s2)'],
		'Local link pseudo-class': ['E:local-link'],
		'Time-dimensional pseudo-class': ['E:current'],
		'Indeterminate-value pseudo-class': ['E:indeterminate'],
		'Default option pseudo-class': ['E:default'],
		'Validity pseudo-class': ['E:in-range', 'E:out-of-range'],
		'Optionality pseudo-class': ['E:required', 'E:optional'],
		'Mutability pseudo-class': ['E:read-only', 'E:read-write'],
		'Structural pseudo-class': ['E:nth-match(n of selector)'],
		'Grid-Structural pseudo-class': ['E:column(selector)', 'E:nth-column(n)', 'E:nth-last-column(n)'],
		'Attribute case-sensitivity': ['E[foo=\'bar\' i]'],
		'Reference combination': ['E /foo/ F'],
		'Subject of a selector with Child combinator': ['E! > F'],
		'Hyperlink pseudo-class': ['E:any-link'],
		'Dir pseudo-class': ['E:dir(*)']
	}
};
//var CSSSelectors = {'CSS1': {'Type': ['E'],'ID': ['E#ElementID'],'Class': ['E.classname'],'Descendant combination': ['E F'],'User action pseudo-class': ['E:active'],'Link history pseudo-class': ['E:link']},'CSS2': {'Universal': ['*'],'User action pseudo-class': ['E:hover','E:focus'],'Dir pseudo-class': ['E:dir(ltr)'],'Lang pseudo-class': ['E:lang(en)'],'Attribute': ['E[foobar]','E[foo=\'bar\']','E[foo~=\'bar\']','E[foo|=\'en\']'],'Structural pseudo-class': ['E:first-child'],'Child combination': ['E > F'],'Adjacent sibling combination': ['E + F']},'CSS3': {'Negation pseudo-class': ['E:not(s)'],'Target pseudo-class': ['E:target'],'Scope pseudo-class': ['E:scope'],'Enabled and Disabled pseudo-class': ['E:enabled','E:disabled'],'Selected-option pseudo-class': ['E:checked'],'Structural pseudo-class': ['E:root','E:empty','E:last-child','E:only-child','E:first-of-type','E:last-of-type','E:only-of-type','E:nth-child(n)','E:nth-last-child(n)','E:nth-of-type(n)','E:nth-last-of-type(n)'],'Attribute': ['E[foo^=\'bar\']','E[foo$=\'bar\']','E[foo*=\'bar\']'],'General sibling combinator': ['E ~ F']},'CSS4': {'Negation pseudo-class': ['E:not(s1, s2)'],'Matches-any pseudo-class': ['E:matches(s1, s2)'],'Local link pseudo-class': ['E:local-link'],'Time-dimensional pseudo-class': ['E:current'],'Indeterminate-value pseudo-class': ['E:indeterminate'],'Default option pseudo-class': ['E:default'],'Validity pseudo-class': ['E:in-range','E:out-of-range'],'Optionality pseudo-class': ['E:required','E:optional'],'Mutability pseudo-class': ['E:read-only','E:read-write'],'Structural pseudo-class': ['E:nth-match(n of selector)'],'Grid-Structural pseudo-class': ['E:column(selector)','E:nth-column(n)','E:nth-last-column(n)'],'Attribute case-sensitivity': ['E[foo=\'bar\' i]'],'Reference combination': ['E /foo/ F'],'Subject of a selector with Child combinator': ['E! > F'],'Hyperlink pseudo-class': ['E:any-link'],'Dir pseudo-class': ['E:dir(*)']}};
var DETECT;
(function(){
	var k, kk, i;
	if( !isQS ) return;
	DETECT = {};
	for( k in CSSSelectors ){
		DETECT[k] = {};
		for( kk in CSSSelectors[k] ){
			DETECT[k][kk] = [];
			for( i=0; i < CSSSelectors[k][kk].length; i++ ){
				try{document.querySelector(CSSSelectors[k][kk][i]),DETECT[k][kk].push(1);}catch(e){DETECT[k][kk].push(0);}
			};
		}
	}
	//console.log(DETECT);
})();

var finder = (function(){
	var bsel, pasAttrPseudo;

	pasAttrPseudo = function(s){
		var attrs, pseudos, p, a, i, j, k, ty;
		attrs = [], pseudos = [],
		i = 0, j = s.length;
		while( i < j ){
			if( s.charAt(i) == ':' ){
				if( ty == 1 ) pseudos.push(k);
				else if( ty == 2 ) attrs.push(k);
				k = '', ty = 1;
			}else if( s.charAt(i) == '[' ){
				if( ty == 1 ) pseudos.push(k);
				else if( ty == 2 ) attrs.push(k);
				k = '', ty = 2;
			}else if( s.charAt(i) == ']' ){
				//if( ty != 2 ) throw new Error('syntax error');
				if( (j-1) == i )
					if( ty == 1 ) pseudos.push(k);
					else if( ty == 2 ) attrs.push(k);
			}else{
				k += s.charAt(i);
				if( (j-1) == i )
					if( ty == 1 ) pseudos.push(k);
					else if( ty == 2 ) attrs.push(k);
			}
			i++;
		}
		return [ uniqArray( trim( attrs ) ), uniqArray( trim( pseudos ) ) ];
	};
	return function($s){
		var ret, el, els, sel, sels, oSel, i, j, k, l, m, n,
			key, hit, pIdx, aIdx, attrs, pseudos;

		oSel = [],
		sels = trim( $s.split(',') );
		for( i = 0, j = sels.length; i < j; i++ ){
			sel = sels[i];
			pIdx = sel.indexOf(":");
			aIdx = sel.indexOf("[");
			if( aIdx > -1 && pIdx > -1 ){
				//console.log('#aIdx & pIdx');
				attrs = pasAttrPseudo( aIdx > pIdx ? sel.substr(pIdx):sel.substr(aIdx) );
				pseudos = attrs[1];
				attrs = attrs[0];
				sel = aIdx > pIdx ? sel.substr( 0, pIdx ):sel.substr( 0, aIdx );
			}else if( aIdx > -1 ){
				//console.log('#aIdx');
				attrs = pasAttrPseudo( sel.substr(aIdx) );
				pseudos = attrs[1];
				attrs = attrs[0];
				sel = sel.substr( 0, aIdx );
			}else if( pIdx > -1 ){
				//console.log('#pIdx');
				attrs = pasAttrPseudo( sel.substr(pIdx) );
				pseudos = attrs[1];
				attrs = attrs[0];
				sel = sel.substr( 0, pIdx );
			}else{
				//console.log('#none');
				sel = sel;
				attrs = [], pseudos = [];
			}
			oSel.push({
				sel:sel,
				attrs:attrs,
				pseudos:pseudos
			});
			//console.log('E :',sel);
		}
		console.log(oSel);
		ret = [];
		if( els = document.getElementsByTagName('*') ){
			console.log(els);
			for( i = 0, j = els.length; i < j; i++ ){
				el = els[i];
				hit = 0;
				for( k = 0, l = oSel.length; k < l; k++ ){
					sel = oSel[k].sel;
					key = sel.charAt(0);
					//console.log(key);
					if( key == '#' ){
						//console.log("ID");
						if( el.id == sel.substr(1) ){
							hit = 1;break;
						}else{
							attrs = oSel[k].attrs;
							for( m = attrs.length; m--; ){
								if( el.getAttribute(attrs[m]) !== null ){
									hit = 1;break;
								}
							}
							pseudos = oSel[k].pseudos;
							for( m = pseudos.length; m--; ){
								
							}
							if(hit) break;
						}
					}else if( key == '.' ){
						if( el.className == sel.substr(1) ){
							hit = 1;break;
						}else{
							attrs = oSel[k].attrs;
							for( m = attrs.length; m--; ){
								if( el.getAttribute(attrs[m]) !== null ){
									hit = 1;break;
								}
							}
							pseudos = oSel[k].pseudos;
							for( m = pseudos.length; m--; ){
								
							}
							if(hit) break;
						}
					}else if( key == '' ){
						// TODO:IE7 에서 A, SCRIPT, UL, LI 등의 요소에 기본 type 속성이 생성되어있는 문제 처리
						attrs = oSel[k].attrs;
						for( m = attrs.length; m--; ){
							if( el.getAttribute(attrs[m]) !== null ){
								console.log(el.tagName)
								hit = 1;break;
							}
						}
						pseudos = oSel[k].pseudos;
						for( m = pseudos.length; m--; ){
							
						}
						if(hit) break;
					}else{
						attrs = oSel[k].attrs;
						pseudos = oSel[k].pseudos;
						sel = sel.toUpperCase();
						if( el.tagName == sel && !attrs.length && !pseudos.length ){
							console.log('TAG1')
							hit = 1;break;
						}else if( el.tagName == sel && ( attrs.length || pseudos.length ) ){
							console.log('TAG2')
							for( m = attrs.length; m--; ){
								if( el.getAttribute(attrs[m]) !== null ){
									hit = 1;break;
								}
							}
							for( m = pseudos.length; m--; ){
								
							}
							if(hit) break;
						}
					}
				}
				if(hit) ret.push(el);
			}
		}
		//echo(ret[0]);
		console.log(ret.length);
	}
})();
	return finder;
})();



















