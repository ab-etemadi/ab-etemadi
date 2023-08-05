/***********************************************
 * VLThemes
 ***********************************************/

'use strict';

/**
 * Initialize main helper object
 */
var VLTJS = {
	window: jQuery(window),
	document: jQuery(document),
	html: jQuery('html'),
	body: jQuery('body'),
	is_safari: /^((?!chrome|android).)*safari/i.test(navigator.userAgent),
	is_firefox: navigator.userAgent.toLowerCase().indexOf('firefox') > -1,
	is_chrome: /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor),
	is_ie10: navigator.appVersion.indexOf('MSIE 10') !== -1,
	transitionEnd: 'transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd',
	animIteration: 'animationiteration webkitAnimationIteration oAnimationIteration MSAnimationIteration',
	animationEnd: 'animationend webkitAnimationEnd',
	isEditMode: false,
	isMobileDevice: function() {
		return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
	},
	stripHash: function(href) {
		return href.replace(/#.*/, '');
	},
	equalSize: function(items, attr) {
		var maxSize = 0;
		var value = 0;
		items.each(function() {
			// .replace remove 'px' from returning value
			value = $(this).css(attr).replace(/(^\d+)(.+$)/i, '$1');
			if (value > maxSize) {
				maxSize = +($(this).css(attr).replace(/(^\d+)(.+$)/i, '$1'));
			}
			alert(value);
		});
		var css = {};
		css[attr] = maxSize;
		items.css(css);
	},
	getMousePos: function (e) {
		var posx = 0;
		var posy = 0;
		if (!e) e = window.event;
		if (e.pageX || e.pageY) {
			posx = e.pageX;
			posy = e.pageY;
		} else if (e.clientX || e.clientY) {
			posx = e.clientX + VLTJS.body.scrollLeft() + VLTJS.document.scrollLeft();
			posy = e.clientY + VLTJS.body.scrollTop() + VLTJS.document.scrollTop();
		}
		return {
			x: posx,
			y: posy
		}
	},
	debounce: function (func, wait, immediate) {
		var timeout;
		return function() {
			var context = this, args = arguments;
			var later = function() {
					timeout = null;
					if (!immediate) func.apply(context, args);
			};
			var callNow = immediate && !timeout;
			clearTimeout(timeout);
			timeout = setTimeout(later, wait);
			if (callNow) func.apply(context, args);
		}
	}
};

/**
 * Check edit mode
 */
VLTJS.window.on('elementor/frontend/init', function () {
	VLTJS.isEditMode = elementorFrontend.isEditMode();
});

/**
 * Debounce resize
 */
var resizeArr = [];
var resizeTimeout;
VLTJS.window.on('load resize orientationchange', function (e) {
	if (resizeArr.length) {
		clearTimeout(resizeTimeout);
		resizeTimeout = setTimeout(function () {
			for (var i = 0; i < resizeArr.length; i++) {
				resizeArr[i](e);
			}
		}, 250);
	}
});

VLTJS.debounceResize = function (callback) {
	if (typeof callback === 'function') {
		resizeArr.push(callback);
	} else {
		window.dispatchEvent(new Event('resize'));
	}
}

VLTJS.addLedingZero = function (number) {
	return ('0' + number).slice(-2);
}

/**
 * Throttle scroll
 */
var throttleArr = [];
var didScroll;
var delta = 5;
var lastScrollTop = 0;

VLTJS.window.on('load resize scroll orientationchange', function () {
	if (throttleArr.length) {
		didScroll = true;
	}
});

function hasScrolled() {

	var scrollTop = VLTJS.window.scrollTop(),
		windowHeight = VLTJS.window.height(),
		documentHeight = VLTJS.document.height(),
		scrollState = '';

	// Make sure they scroll more than delta
	if (Math.abs(lastScrollTop - scrollTop) <= delta) {
		return;
	}

	if (scrollTop > lastScrollTop) {
		scrollState = 'down';
	} else if (scrollTop < lastScrollTop) {
		scrollState = 'up';
	} else {
		scrollState = 'none';
	}

	if (scrollTop === 0) {
		scrollState = 'start';
	} else if (scrollTop >= documentHeight - windowHeight) {
		scrollState = 'end';
	}

	for (var i in throttleArr) {
		if (typeof throttleArr[i] === 'function') {
			throttleArr[i](scrollState, scrollTop, lastScrollTop, VLTJS.window);
		}
	}

	lastScrollTop = scrollTop;
}

setInterval(function () {
	if (didScroll) {
		didScroll = false;
		window.requestAnimationFrame(hasScrolled);
	}
}, 250);

VLTJS.throttleScroll = function (callback) {
	if (typeof callback === 'function') {
		throttleArr.push(callback);
	}
}