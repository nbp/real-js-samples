!function(t){"use strict";function o(o){var n=o.attr("data-"+e+"-parameter");if("undefined"!=typeof n){n=n.split(",");var a,l=n.length,i={};for(a=0;a<l;a++){var s=t.trim(n[a]).split(":");"true"===s[1]?s[1]=!0:"false"===s[1]?s[1]=!1:isNaN(Number(s[1]))||(s[1]=Number(s[1])),i[s[0]]=s[1]}t.extend(!0,o.data(e),i)}}var e="libAnchor",n=t(window),a=navigator.userAgent.toLowerCase(),l=function(){var t=a.split("/").reverse()[0],o=document.body.style;return!(a.match("android")&&t<534)&&("transition"in o||"webkitTransition"in o||"msTransition"in o)}(),i=(function(){return!!a.match(/applewebkit/)}(),"transitionend."+e+" webkitTransitionEnd."+e+" msTransitionEnd."+e),s="ontouchstart"in window,r={initialize:function(n){return this.each(function(){t(this).data(e,t.extend(!0,{$toggleTop:null,$offset:null,durationType:"auto",durationMin:function(){return screen.availWidth*screen.availHeight>=786432?400:200}(),durationMax:function(){return screen.availWidth*screen.availHeight>=786432?800:400}(),toggleScroll:!0,toggleTop:200,openClass:"elOpen",showClass:"elShow",closeClass:"elClose",targetSelector:null,forceTouchDevice:!1,status:"close",adjustHeight:0,isEvent:!0,jumpBefore:null,jumpAfter:null},n));var a=t(this);o(a),r.action.apply(a)})},action:function(){var o=t(this),a=o.data(e);r.setEvent.apply(o),a.toggleScroll&&(s&&!a.forceTouchDevice||(o.toggleClass(a.closeClass,!0),n.on("scroll."+e+" resize."+e+" load."+e,function(){r.scroll.apply(o)})))},scroll:function(){var o,a,s,r,u=t(this),c=u.data(e),p=c.openClass,f=c.showClass,g=c.closeClass;c.$toggleTop instanceof jQuery&&null!==c.$toggleTop?o=c.$toggleTop.offset().top:"number"==typeof c.toggleTop?o=c.toggleTop:c.toggleTop.indexOf("%")>-1&&(r=c.toggleTop.replace(/%/,"")/100,o=n.innerHeight()*r),a=n.scrollTop()>o?"open":"close",c.status!==a&&("open"===a?s=!0:"close"===a&&(s=!1),c.status=a,l?u.off(i).toggleClass(p,s).toggleClass(f,!1).toggleClass(g,!s).on(i,function(){"open"===a?u.off(i).toggleClass(p,!1).toggleClass(g,!1).toggleClass(f,!0):u.off(i).toggleClass(p,!1).toggleClass(g,!0).toggleClass(f,!1)}):u.toggleClass(f,s).toggleClass(g,!s))},setEvent:function(){var o=t(this),n=o.data(e);n.isEvent!==!1&&o.on("click."+e,function(t){t.preventDefault?t.preventDefault():t.returnValue=!1,t.stopPropagation(),r.jumpAnchor.apply(o)})},jump:function(){var o=t(this);r.jumpAnchor.apply(o)},jumpAnchor:function(){var o,a,l,i,u,c=t(this),p=c.data(e),f=t(p.$offset),g=t("html, body"),h=f.outerHeight(),d=p.adjustHeight;a=null===p.targetSelector?t(this).attr("href"):p.targetSelector,0===t(a).length?o=0:(o=t(a).offset().top,p.$offset&&(o=o-h-d),o=Math.round(o)),u=t(document).outerHeight()-n.innerHeight(),o=o>u?u:o,"number"==typeof p.durationType?l=p.durationType:(i=n.scrollTop(),l=Math.round(i-o),0!==l&&l<p.durationMin&&(l=Math.floor(p.durationMin)),l>p.durationMax&&(l=Math.floor(p.durationMax))),r.applyCallback.apply([c,"jumpBefore"]),g.stop().animate({scrollTop:o},l,function(){r.applyCallback.apply([c,"jumpAfter"]),n.off("touchstart."+e+"-animatingTouch")}),s&&n.on("touchstart."+e+"-animatingTouch",function(){g.stop(),n.off("touchstart."+e+"-animatingTouch")}),t(this).blur()},applyCallback:function(){var t=this[0],o=t.data(e),n=this[1];"undefined"!=typeof o&&"function"==typeof o[n]&&o[n]()},destroy:function(){var o=t(this),a=o.data(e);"undefined"!=typeof a&&(n.off("."+e),o.off("."+e).removeData(e))}};t.fn[e]=function(t){return r[t]?r[t].apply(this,Array.prototype.slice.call(arguments,1)):"object"!=typeof t&&t?void 0:r.initialize.apply(this,arguments)}}(jQuery);