(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.StormFocusManager = factory();
  }
}(this, function() {
	'use strict';
    
    function StormFocusManager(el) {
		this.node = el;
    }
	
	StormFocusManager.prototype.getFocusableChildren = function(el) {
		var focusableElements = ['a[href]', 'area[href]', 'input:not([disabled])', 'select:not([disabled])', 'textarea:not([disabled])', 'button:not([disabled])', 'iframe', 'object', 'embed', '[contenteditable]', '[tabindex]:not([tabindex="-1"])'];
		
		/*
		return $$(focusableElements.join(','), node).filter(function (child) {
		  return !!(child.offsetWidth || child.offsetHeight || child.getClientRects().length);
		});
		*/
	};
	
	StormFocusManager.prototype.tab = function() {
		
		/*    var focusableChildren = getFocusableChildren(node);
    var focusedItemIndex = focusableChildren.indexOf(document.activeElement);

    if (event.shiftKey && focusedItemIndex === 0) {
      focusableChildren[focusableChildren.length - 1].focus();
      event.preventDefault();
    } else if (!event.shiftKey && focusedItemIndex === focusableChildren.length - 1) {
      focusableChildren[0].focus();
      event.preventDefault();
    }*/
		
	};
	
	//get list of focusable children of a node
	//remember last active node
	//set focus on first node
	//trap tab to focusable children
	
	function init(sel) {
        var el = [].slice.call(document.querySelector(sel));
        
        if(!!!el) {
            throw new Error('FocusManager cannot be initialised, no augmentable elements found');
        }
		
		return new StormFocusManager(el);
	}
	
	return {
		init: init
	};
	
 }));