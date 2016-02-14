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
		this.focusableChildren = this.getFocusableChildren();
		this.addListeners();
    }
	
	StormFocusManager.prototype.getFocusableChildren = function(el) {
		var focusableElements = ['a[href]', 'area[href]', 'input:not([disabled])', 'select:not([disabled])', 'textarea:not([disabled])', 'button:not([disabled])', 'iframe', 'object', 'embed', '[contenteditable]', '[tabindex]:not([tabindex="-1"])'];
		
		return [].slice.call(this.node.querySelectorAll(focusableElements.join(','))).filter(function (child) {
		  return !!(child.offsetWidth || child.offsetHeight || child.getClientRects().length);
		});
	};
	
	StormFocusManager.prototype.addListeners = function() {
		
		document.addEventListener('keydown', function (e) {
			if(e.keyCode === 9) {
				this.tab();
			}
		}.bind(this));
		
		document.body.addEventListener('focus', this.setFocusToFirst, true);
	};
	
	StormFocusManager.prototype.removeListeners = function() {
		document.removeEventListener('keydown', this.keyListener);
		document.removeEventListener('focus', this.focusListener);
	};
	
	StormFocusManager.prototype.keyListener = function() {
		
	};
	
	StormFocusManager.prototype.focusListener = function() {};
	
	StormFocusManager.prototype.tab = function(e) {
		
		
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