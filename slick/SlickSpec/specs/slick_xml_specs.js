function specsAssetsTemplateXML(specs,context){
	
	Describe('SELECT Selector Engine on XML file',function(){
		
		function makeSlickTestSearch(selector, count, disableQSA) {
			return function(){
				context.SELECT.disableQSA = !!disableQSA;
				value_of( context.SELECT(context.document, selector).length ).should_be( count );
				delete context.SELECT.disableQSA;
			};
		}
		function it_should_find(count,selector){
			if (global.document.querySelectorAll && !global.cannotDisableQSA)
				specs['should find '+count+' `'+selector+'` with    QSA' ] = makeSlickTestSearch(selector, count, false);
			specs['should find '+count+' `'+selector + (!global.cannotDisableQSA ? '` without QSA' : '') ] = makeSlickTestSearch(selector, count, true);
		};
		
		it_should_find(1, 'HTML');
		it_should_find(1, '#id_idnode');
		it_should_find(1, '[id=id_idnode]');
		it_should_find(3, '.class_classNode');
		it_should_find(3, '[class=class_classNode]');
		it_should_find(0, '[className=class_classNode]');
		it_should_find(3, 'camelCasedTag');
		it_should_find(1, '#node[style=border]');
		it_should_find(1, '[href^=http://]');
		
	});
	
};
