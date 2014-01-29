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
	var bsel, pasSel, pasAttrPseudo, r0;

	r0 = /  +/g;
	pasSel = function(s){
		var sels, token, step, key, i, j;
		sels = [];
		token = '';
		i = s.length;
		while( i-- ){
			key = s.charAt(i);
			token = key + token;
			if( key == ' ' || key == '.' || key == '>' || !i ){
				sels.push(token);
				token = '';
			}
		}
		console.log(sels);
		return sels;
	},
	pasAttrPseudo = function(s){
		var sels, key, token, p, a, i, j, k, ty;
		sels = [], token = '',
		i = s.length;
		while( i-- ){
			key = s.charAt(i);
			if( key != ']' ) token = key + token;
			if( key == ' ' || key == ':' || key == '[' || !i ){
				sels.push(token);
				token = '';
			}
		}
		console.log(sels);
		return sels;
	};
	return function($s){
		var ret, el, els, sel, sels, oSel, t0, i, j, k, l, m, n,
			key, hit, pIdx, aIdx, attrs;

		if(isQS) console.log( document.querySelectorAll($s) );
		oSel = [],
		sels = trim( $s.replace( r0, ' ' ).split(',') );
		for( i = sels.length; i--; ){
			sel = sels[i];
			pIdx = sel.indexOf(":");
			aIdx = sel.indexOf("[");
			if( aIdx > -1 && pIdx > -1 ){
				//console.log('#aIdx & pIdx');
				attrs = pasAttrPseudo( aIdx > pIdx ? sel.substr(pIdx):sel.substr(aIdx) );
				sel = aIdx > pIdx ? sel.substr( 0, pIdx ):sel.substr( 0, aIdx );
			}else if( aIdx > -1 ){
				//console.log('#aIdx');
				attrs = pasAttrPseudo( sel.substr(aIdx) );
				sel = sel.substr( 0, aIdx );
			}else if( pIdx > -1 ){
				//console.log('#pIdx');
				attrs = pasAttrPseudo( sel.substr(pIdx) );
				sel = sel.substr( 0, pIdx );
			}else{
				//console.log('#none');
				sel = sel;
				attrs = [];
			}
			oSel.push({
				sel : sel,
				sels : pasSel(sel),
				attrs : attrs
			});
		}
		//console.log(oSel);
		ret = [];
		if( els = document.getElementsByTagName('*') ){
			//console.log(els);
			for( i = 0, j = els.length; i < j; i++ ){
				el = els[i];
				hit = [];
				for( k = oSel.length; k--; ){
					sel = oSel[k].sel,
					key = sel.charAt(0),
					attrs = oSel[k].attrs;
					//console.log(key);
					if( key == '#' ){
						//console.log("ID");
						if( el.id == sel.substr(1) && !attrs.length ){
							hit.push(1);break;
						}else{
							// TODO:ID combination 처리
							for( m = attrs.length; m--; ){
								t0 = attrs[m];
								if( t0.charAt(0) == '[' && el.getAttribute( t0.substr(1) ) !== null ){
									hit.push(1);
								}
							}
						}
					}else if( key == '.' ){
						if( el.className == sel.substr(1) && !attrs.length ){
							hit.push(1);break;
						}else{
							// TODO:class combination 처리
							for( m = attrs.length; m--; ){
								t0 = attrs[m];
								if( t0.charAt(0) == '[' && el.getAttribute( t0.substr(1) ) !== null ){
									hit.push(1);
								}
							}
						}
					}else if( key == '' ){
						// TODO:IE7 에서 A, SCRIPT, UL, LI 등의 요소에 기본 type 속성이 생성되어있는 문제 처리
						for( m = attrs.length; m--; ){
							t0 = attrs[m];
							if( t0.charAt(0) == '[' && el.getAttribute( t0.substr(1) ) !== null ){
								hit.push(1);
							}
						}
					}else{
						if( el.tagName == sel.toUpperCase() && !attrs.length ){
							hit.push(1);break;
						}else{
							console.log('TAG2')
							for( m = attrs.length; m--; ){
								t0 = attrs[m];
								if( t0.charAt(0) == '[' && el.getAttribute( t0.substr(1) ) !== null ){
									hit.push(1);
								}
							}
						}
					}
				}
				//console.log(hit.length, attrs.length)
				if( hit.length && hit.length >= attrs.length ) ret.push(el);
			}
		}
		//echo(ret[0]);
		console.dir(ret);
	}
})();
	return finder;
})();













//
//function querySelectorAll(element, selector) {
//    if(element.querySelectorAll) { // Morden Browser
//        return element.querySelectorAll(selector);
//    }
//    else { // low versioning IE only
//        var a=element.all, c=[], selector = selector.replace(/\[for\b/gi, '[htmlFor').split(','), i, j, s=document.createStyleSheet();
//        for (i=selector.length; i--;) {
//            s.addRule(selector[i], 'k:v');
//            for (j=a.length; j--;) a[j].currentStyle.k && c.push(a[j]);
//            s.removeRule(0);
//        }
//        return c;
//    }
//}

