/**
 * @name storm-focus-manager: Manage focus and tabbing for accessible JS components
 * @version 0.1.0: Mon, 15 Feb 2016 19:53:29 GMT
 * @author stormid
 * @license MIT
 */(function(root, factory) {
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
    }
	
	StormFocusManager.prototype.getFocusableChildren = function(el) {
		var focusableElements = ['a[href]', 'area[href]', 'input:not([disabled])', 'select:not([disabled])', 'textarea:not([disabled])', 'button:not([disabled])', 'iframe', 'object', 'embed', '[contenteditable]', '[tabindex]:not([tabindex="-1"])'];
		
		return [].slice.call(this.node.querySelectorAll(focusableElements.join(','))).filter(function (child) {
		  return !!(child.offsetWidth || child.offsetHeight || child.getClientRects().length);
		});
	};
	
	StormFocusManager.prototype.addListeners = function() {
		document.addEventListener('keydown', this.keyListener.bind(this), true);
		//document.body.addEventListener('focus', this.focusListener.bind(this), true);
	};
	
	StormFocusManager.prototype.removeListeners = function() {
		document.removeEventListener('keydown', this.keyListener);
		//document.removeEventListener('focus', this.focusListener);
	};
	
	StormFocusManager.prototype.keyListener = function(e) {
		if(e.keyCode === 9) {
			this.catchTab(e);
		}
	};
	
	//StormFocusManager.prototype.focusListener = function() {};
	
	StormFocusManager.prototype.catchTab = function(e) {
		var focusedItemIndex = this.focusableChildren.indexOf(document.activeElement);
		
		if (e.shiftKey && focusedItemIndex === 0) {
		  this.focusableChildren[this.focusableChildren.length - 1].focus();
		  e.preventDefault();
		} else if (!event.shiftKey && focusedItemIndex === this.focusableChildren.length - 1) {
		  this.focusableChildren[0].focus();
		  encodeURI.preventDefault();
		}
	};
	
	StormFocusManager.prototype.start = function(){
		this.lastFocused = document.activeElement;
	};
		
	StormFocusManager.prototype.focusFirst = function() {
    	this.focusableChildren[0].focus();
		//this.addListeners(); call this from app merging prototype??
	};
	
	
	function init(el) {
        if(!!!el) {
            throw new Error('FocusManager cannot be initialised, no augmentable elements found');
        }
		
		return new StormFocusManager(el);
	}
	
	return {
		init: init
	};
	
 }));