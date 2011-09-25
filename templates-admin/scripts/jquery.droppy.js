/*
 * Droppy 0.1.5
 * (c) 2008 Jason Frame (jason@onehackoranother.com)
 *
 * last modified: 06/04/2001 by Philipp Urlich (philipp@urlich.ch)
 *
 * 	NOTE: to provide a solution for the deep nested navigation usability issue
 *	(no really there's people having problems with this type of dropdowns over 1-2 levels ;)),
 *  if timeout isn't really an option...
 *	instead we leave the levels open in case the mouse moves out of navigation
 *	we set a flag [_isoverbody] to use in the close function etc
 *	Also we add a click event on the window to close all sublevels again
 *
 *	
 *
 */
 
(function($) {
  
	$.fn.droppy = function(options) {

		options = $.extend({
			speed: 350
			,timeout: 500
			,className: 'droppy'
			,trigger: 'hover'
			,sticky: false // usability , level keep open until user clicks outside navigation
			,showFX: 'slideDown'
			,hideFX: 'slideUp'
			}
			,options || {});

		this.each(function() {

			var root = this, zIndex = 1000;
			var _isoverbody = false;
			
			$(root).addClass(options.className);
			$(root).find('li:has(> ul) > a').addClass('has-subnav');

			if(options.sticky) {
				$(this).bind('mouseout',function(){ _isoverbody = true }); // bind to maintain backw.comp
				$(this).bind('mouseover',function(){ _isoverbody = false });
				$(document).bind('click',function(){ $('.'+options.className+' ul').hide(); });
			}
	
			function getSubnav(ele) {
				if (ele.nodeName.toLowerCase() == 'li') {
					var subnav = $('> ul', ele);
					return subnav.length ? subnav[0] : null;
				} else {
					return ele;
				}
			};
	
			function getActuator(ele) {
				if (ele.nodeName.toLowerCase() == 'ul') {
					return $(ele).parents('li')[0];
				} else {
					return ele;
				}
			};
	
			function hide() {
				var subnav = getSubnav(this);
				if (!subnav) return;
				$.data(subnav, 'cancelHide', false);
				if(!_isoverbody) {
					setTimeout(function() {
						if (!$.data(subnav, 'cancelHide')) {
							switch(options.hideFX){
								case 'slideUp': $(subnav).slideUp(options.speed);
								case 'hide': $(subnav).hide(options.speed);
								case 'fadeOut': $(subnav).fadeOut(options.speed);
							}
						}
					}, options.timeOut);
				}
			};
	
			function show() {
				var subnav = getSubnav(this);
				if (!subnav) return;
				$.data(subnav, 'cancelHide', true);
				switch(options.showFX){
					case 'slideDown': $(subnav).css({zIndex: zIndex++}).slideDown(options.speed);
					case 'show': $(subnav).css({zIndex: zIndex++}).show(options.speed);
					case 'fadeIn': $(subnav).css({zIndex: zIndex++}).fadeIn(options.speed);
				}
				if (this.nodeName.toLowerCase() == 'ul') {
					var li = getActuator(this);
					$(li).addClass('hover');
					$('> a', li).addClass('hover');
				}
				
				if(!_isoverbody) {
				/* 	to prevent multiple open sublevels behavior,
				 *	close all siblings second levels */
					$(this).siblings('li').find('ul').hide();
				}
				return false;
			};
		  
			if (options.trigger == 'click') {
				$('> li', this).click(
					function(evt) {
						if (evt.target == this || evt.target.parentNode == this) {
							show.call(this);
						}
					});
				
				$('> li ul, > li li', this).hover(show, function() {});
				$('ul, li', this).hover(function() {}, hide);
			}
			else
			{
				if (typeof $.fn.hoverIntent == 'function') {
					$('ul, li', this).hoverIntent($.extend(
						{ sensitivity: 2, interval: 50, timeout: 100 }
						, options.hoverIntent || {}
						, {over: show, out: hide}
					));
				}
				else
				{
					$('ul, li', this).hover(show, hide);
				}
			}
			$('li', this).hover(
				function() { $(this).addClass('hover'); $('> a', this).addClass('hover'); },
				function() { $(this).removeClass('hover'); $('> a', this).removeClass('hover'); }
			);
		});
	};
})(jQuery);
