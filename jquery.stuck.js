/*
 * jQuery Stickt plugin 0.2
 *
 * Copyright (c) 2011 Alfonso Gómez-Arzola
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 */

;(function( $ ){
$.fn.extend({
  stuck: function(options) {
    options = $.extend({},$.stucker.defaultOptions,options);
		return this.each(function() {
		  new $.stucker(this, options);
		});
	},
	stuckInit: function() {
	  return this.trigger("stuckInit");
	},
	stuckOptions: function(options) {
	  return this.trigger("setOptions", [options]);
	},
	reachedBottom: function(handler) {
	  return this.bind("reachedBottom", handler);
	}
});
$.stucker = function(theObj, options) {
  var config;
  $(theObj).bind("stuckInit", function() {
    config = {
      theObj: theObj,
			theParent: $(theObj).parent(),
			// dist. between top of doc and top of theObj:
			objTop: $(theObj).offset().top - parseFloat($(theObj).css('marginTop').replace(/auto/, 0)),
			// height of theObj:
			objHeight: parseFloat($(theObj).css('height'))
		}
		if ( options.footer ) {
		  // dist. between top of doc and top of footer:
			config.bottomLength = $(options.footer).offset().top - parseFloat($(options.footer).css('marginTop').replace(/auto/, 0));
			config.bottomLimit = $(document).height() - config.bottomLength;
  		config.contHeight = $(document).height() - config.objTop - config.bottomLimit;
  		// Then, we set the container’s height.
  		// If calculated container height is greater than obj height:
  		if (config.contHeight >= config.objHeight) {
  			// set container height to the calculated height:
  			$(config.theParent).css('height', config.contHeight + "px");
  		} else {
  		  // If calculated height is less than ad height:
  			// set container height to obj height:
  			$(config.theParent).css('height', config.objHeight + "px");
  		}
		}
		if ( options.reachedBottom ) {
		  $(theObj).reachedBottom(options.reachedBottom);
		}
		if ( options.footer && options.bottomClassMargin ) {
  	  config.contHeight -= options.bottomClassMargin;
  	}
		config.init = true;
		$(window).scroll();
  }).bind("stuckOptions",function(){
    $.extend(true, options, arguments[1]);
    this.trigger("stuckInit");
  });
  $(window).scroll(function(){
    // what the y position of the viewport is and add the fixed class’s margin-top value:
  	config.viewPortPos = $(this).scrollTop();
  	if ( options.fixedClassMargin ) {
  	  config.viewPortPos += options.fixedClassMargin;
  	}
  	// calculate viewport height:
  	config.viewPortHeight = $(this).height();
  	// if scroll location is below original ad location, AND
  	// if viewport height is greater than the ad height, AND
  	// if container div height is greater than the ad height:
  	if (config.init == true && config.viewPortPos >= config.objTop && config.viewPortHeight > config.objHeight) {
  	  // do we need to worry about a footer?
  	  if (!options.footer) {
  	    // no need to worry about footer, then just fix if viewport is below original placement of stuck object.
  	    // remove bottom class, in case we’ve applied it:
  			$(config.theObj).removeClass(options.bottomClass);
  			// add fixed class:
  			$(config.theObj).addClass(options.fixedClass);
  	  } else {
  	    // Yes, there is a footer with wich object may collide, so let’s check whether we’re at the bottom.
  	    // if the object is actually larger than its parent (otherwise, no need to move it at all).
  	    if (parseFloat($(config.theParent).css('height')) > config.objHeight) {
  	      // if scroll location is so low that object breaks out of container:
      		if (config.viewPortPos >= (config.contHeight + config.objTop - config.objHeight) ) {
      			// remove fixed class, in case we’ve applied it (likely):
      			$(config.theObj).removeClass(options.fixedClass);
      			// now we check to see if the bottom class has already been applied
      			// this way we avoid the reachedBottom event being fired multiple times
      			// note that it will fire multiple times if the bottom class is removed and applied again.
      			if ( !$(config.theObj).hasClass(options.bottomClass) ) {
      			  // add bottom class:
        			$(config.theObj).addClass(options.bottomClass);
        			// fire reachedBottom handler, if there is one, and pass config object to it (overkill?):
        			// TODO: test if reachedBottom is indeed bound
      			  $(config.theObj).trigger("reachedBottom", config);
      			}
      		// if scroll location is NOT so low that ad breaks out of container:
      		} else {
      			// remove bottom class, in case we’ve applied it:
      			$(config.theObj).removeClass(options.bottomClass);
      			// add fixed class:
      			$(config.theObj).addClass(options.fixedClass);
      		}
  	    }
  	  }
  		
  	// if the criteria for the effect is not met
  	} else {
  		// remove the classes, in case we’re applied them:
  		$(config.theObj).removeClass('fixed').removeClass('bottom');
  	}
  });
  $(theObj).trigger("stuckInit");
};
$.stucker.defaultOptions = {
  fixedClass: 'fixed',
  bottomClass: 'bottom'
}
})( jQuery );