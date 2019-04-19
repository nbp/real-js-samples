define("mui/view-port-listen/index",function(e,t,o){var n=function(){function e(e,t){for(var o=0;o<t.length;o++){var n=t[o];n.enumerable=n.enumerable||false;n.configurable=true;if("value"in n)n.writable=true;Object.defineProperty(e,n.key,n)}}return function(t,o,n){if(o)e(t.prototype,o);if(n)e(t,n);return t}}();function i(e,t){if(!(e instanceof t)){throw new TypeError("Cannot call a class as a function")}}var l=e("mui/zepto/touch"),s=window;var r=function a(e,t,o){var n=undefined,i=undefined;return function(){if(n&&Date.now()-n<t){if(i){clearTimeout(i)}i=setTimeout(function(){e.call(o);n=Date.now()},t);return}e.call(o);n=Date.now()}};var f=function(){function e(t){i(this,e);var o=this;o.options=Object.assign({},{listenItems:[],listenCallback:function n(){},diff:0,bufferTime:200},t);o.scrollEvent=false;o.destroyed=false;o.scrollBuffer=r(o.__listenScroll,o.options.bufferTime,o);if(o.options.listenItems){if(!o.options.listenItems.length){o.options.listenItems=[].concat(o.options.listenItems)}else if(!o.options.listenItems.slice){o.options.listenItems=[].slice.call(o.options.listenItems)}o.__listenScroll()}else{o.options.listenItems=[]}}n(e,[{key:"__listenScroll",value:function t(){var e=this,t=e.options.listenItems,o=e.options.listenCallback,n=e._getViewPortHeight(),i=t.length,r=undefined;if(t.getDOMNodes){t=t.getDOMNodes()}e.destroyed=true;while(i--){r=l(t[i]);var f=e._getElementViewTop(r);if(f){e.destroyed=false;if(e.isInViewPortHeight(f,n)){delete t[i];o&&o.call(r)}}}if(e.scrollEvent&&e.destroyed){l(s).off("scroll",e.scrollBuffer);e.scrollEvent=false}else if(!e.scrollEvent&&!e.destroyed){l(s).on("scroll",e.scrollBuffer);e.scrollEvent=true}}},{key:"addItems",value:function o(e){var t=this;t.options.listenItems=t.options.listenItems.concat(e);t.__listenScroll()}},{key:"isInViewPortHeight",value:function f(e,t){var o=this,n=o.options.diff,i={top:0,bottom:0};if(typeof n==="number"){i.bottom=n}else{i.top=n.top&&typeof n.top==="number"?n.top:0;i.bottom=n.bottom&&typeof n.bottom==="number"?n.bottom:0}return e.min>=-i.top&&e.min<=t+i.bottom||e.max>=-i.top&&e.max<=t+i.bottom||e.min>=-i.top&&e.max<=t+i.bottom||e.min<=-i.top&&e.max>=t+i.bottom}},{key:"_getElementViewTop",value:function a(e){if(e&&e.length){var t=l(e).get(0).getBoundingClientRect().top,o=e.height();return{min:t,max:t+o}}else{return false}}},{key:"_getViewPortHeight",value:function u(){return l(s).height()}}]);return e}();o.exports=f});define("mui/zepto/touch",["mui/zepto/zepto","mui/zepto/event"],function(t,e,n){var i=t("mui/zepto/zepto");t("mui/zepto/event");!function(t){function e(t,e,n,i){return Math.abs(t-e)>=Math.abs(n-i)?t-e>0?"Left":"Right":n-i>0?"Up":"Down"}function n(){u=null,a.last&&(a.el.trigger("longTap"),a={})}function i(){u&&clearTimeout(u),u=null}function o(){r&&clearTimeout(r),u&&clearTimeout(u),r=u=null,a={}}var r,u,s,a={},c=750;t(document).ready(function(){var f,p,l,d=0,h=0;"MSGesture"in window&&(s=new MSGesture,s.target=document.body),t(document).bind("MSGestureEnd",function(t){var e=t.velocityX>1?"Right":t.velocityX<-1?"Left":t.velocityY>1?"Down":t.velocityY<-1?"Up":null;e&&(a.el.trigger("swipe"),a.el.trigger("swipe"+e))}).on("touchstart",function(e){l=e.touches[0],e.touches&&1===e.touches.length&&a.x2&&(a.x2=void 0,a.y2=void 0),f=Date.now(),p=f-(a.last||f),a.el=t("tagName"in l.target?l.target:l.target.parentNode),r&&clearTimeout(r),a.x1=l.pageX,a.y1=l.pageY,p>0&&p<=250&&(a.isDoubleTap=!0),a.last=f,u=setTimeout(n,c)}).on("touchmove",function(t){l=t.touches[0],i(),a.x1?(a.x2=l.pageX,a.y2=l.pageY,d+=Math.abs(a.x1-a.x2),h+=Math.abs(a.y1-a.y2)):d=h=0}).on("touchend",function(n){if(i(),a.x2&&Math.abs(a.x1-a.x2)>30||a.y2&&Math.abs(a.y1-a.y2)>30)a.el&&(a.el.trigger("swipe"),a.el.trigger("swipe"+e(a.x1,a.x2,a.y1,a.y2))),a={};else if("last"in a)if(d<30&&h<30){var u=t.Event("tap");u.cancelTouch=o,a.el&&a.el.trigger(u),a.isDoubleTap?(a.el&&a.el.trigger("doubleTap"),a={}):r=setTimeout(function(){r=null,a.el&&a.el.trigger("singleTap"),a={}},250)}else a={};d=h=0}).on("touchcancel",function(){o(),d=h=0})}),["swipe","swipeLeft","swipeRight","swipeUp","swipeDown","doubleTap","tap","singleTap","longTap"].forEach(function(e){t.fn[e]=function(t){return this.on(e,t)}})}(i),n.exports=i});