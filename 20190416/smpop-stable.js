var smpop=function(e){var t={};function o(i){if(t[i])return t[i].exports;var n=t[i]={i:i,l:!1,exports:{}};return e[i].call(n.exports,n,n.exports,o),n.l=!0,n.exports}return o.m=e,o.c=t,o.d=function(e,t,i){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(o.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)o.d(i,n,function(t){return e[t]}.bind(null,n));return i},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="",o(o.s=0)}([function(e,t,o){"use strict";function i(e){var t=document.cookie.match(new RegExp(e+"=[^;]+","i"));return t?decodeURIComponent(t[0].split("=")[1]):null}o.r(t);var n=function(){function e(e){void 0===e&&(e={}),this.defaultOptions={testNodeClasses:"pub_300x250 pub_300x250m pub_728x90 text-ad textAd text_ad text_ads text-ads text-ad-links",testNodeStyle:"height: 10px !important; font-size: 20px; color: transparent; position: absolute; bottom: 0; left: -10000px;",testInterval:51,testRuns:4,blockedOffsetHeight:0},this.options={},this.numCheckRuns=0,this.nodeIsBlocked=!1,this.options=Object.assign({},this.defaultOptions,e||{}),this.checkForAdBlock()}return e.prototype.isBlocked=function(){return this.nodeIsBlocked},e.prototype.checkForAdBlock=function(){try{var e=this.createNode();if(this.nodeIsBlocked=!1,this.numCheckRuns++,this.nodeIsBlocked=this.isNodeBlocked(e),e.parentNode&&e.parentNode.removeChild(e),this.numCheckRuns>=this.options.testRuns)return;var t=this;setTimeout(function(){t.checkForAdBlock()},this.options.testInterval)}catch(e){console.error("ABCheck: Failed to detect AB")}},e.prototype.createNode=function(){var e=window.document,t=e.createElement("div");return t.innerHTML="&nbsp;",t.setAttribute("class",this.options.testNodeClasses),t.setAttribute("style",this.options.testNodeStyle),e.body.appendChild(t),t},e.prototype.isNodeBlocked=function(e){return e.offsetHeight===this.options.blockedOffsetHeight||!document.body.contains(e)||"none"===e.style.display||"hidden"===e.style.visibility},e}(),r=function(){function e(t,o,i,r){void 0===o&&(o={}),void 0===i&&(i=null),void 0===r&&(r=""),this.defaultWindowOptions={debug:!1,top:0,left:0,width:1037,height:805,location:"no",toolbar:"no",status:"no",menubar:"no",scrollbars:"no",resizable:"no"},this.defaultPopOptions={cookieExpires:43200,cookiePath:"/",delayBetweenPopsInMs:432e5,blur:!0,prePopDelayInMs:200},this.chromeNewWindowOptions={scrollbars:"no"},this.lastPopTime=0,this.alertCalled=!1,this.baseName="SMPop",this.url=t,this.index=e.counter++,this.name=this.baseName+"_"+this.index,this.executed=!1,this.parentDocument=top!=self?top:self,this.adBlockDetector=i||new n;var s=r?r.toLowerCase():navigator.userAgent.toLowerCase();this.browser={webkit:/webkit/.test(s),mozilla:/mozilla/.test(s)&&!/(compatible|webkit)/.test(s),chrome:/chrome/.test(s),msie:/msie|trident\//.test(s)&&!/opera/.test(s),firefox:/firefox/.test(s),safari:/safari/.test(s)&&!/chrome/.test(s),opera:/opera/.test(s),version:parseInt(s.match(/(?:[^\s]+(?:ri|ox|me|ra)\/|trident\/.*?rv:)([\d]+)/i)[1],10),mobile:/android|(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|mobile/.test(s)},this.setOptions(o)}return e.prototype.run=function(e){return this.shouldExecute()?((this.browser.mobile?this.loadTabUnder(e):this.loadPopUnder(e))&&this.setExecuted(),!0):(this.options.debug&&console.info("run: determined pop already launched. Exiting without doing anything."),!0)},e.prototype.loadPopUnder=function(e){var t=this;this.options.debug&&console.info("loadPopUnder: loading loadPopUnder");var o=this.name,i=this.url,n=this.getNewWindowParams();if(this.browser.firefox&&this.browser.version>=65)return setTimeout(function(){window.open(i,o,n)},0),setTimeout(function(){var e=window.open("","_self","");e&&e.focus()},0),!0;var r=this.adBlockDetector.isBlocked()?document.location.href:i,s=window.open(r,o,n);return s?(this.adBlockDetector.isBlocked()&&setTimeout(function(){t.options.debug&&console.info("loadPopUnder: redir blk"),s.location.href=i},this.options.prePopDelayInMs),this.options.blur&&!this.browser.chrome&&this.blur(s),!0):(console.error("run: desktop Could not open window, it must have been blocked"),!1)},e.prototype.loadTabUnder=function(e){this.options.debug&&console.info("loadTabUnder: loading tabUnder");var t=e.target||e.srcElement;if(t.parentElement&&!t.getAttribute("href")&&(t=t.parentElement),!t.getAttribute("href"))return!1;var o=t.getAttribute("href");return e.preventDefault(),this.setExecuted(),window.open(o)&&(window.location.href=this.url),!0},e.prototype.shouldExecute=function(){var e=this.lastPopTime;return 0===e&&i(this.name)&&(e=parseInt(i(this.name))),e+this.options.delayBetweenPopsInMs<=(new Date).getTime()},e.prototype.setExecuted=function(){var e,t,o,i,n;this.executed=!0,this.lastPopTime=(new Date).getTime(),e=this.name,t=this.lastPopTime,o=this.options.cookieExpires,i=this.options.cookiePath,null==o?o="":("number"==typeof o?(n=new Date).setTime(n.getTime()+60*o*1e3):n=o,o="; expires="+n.toUTCString()),document.cookie=e+"="+escape(t)+o+"; path="+(i||"/")},e.prototype.setOptions=function(e){this.options=Object.assign({},this.defaultPopOptions,this.defaultWindowOptions,e||{}),this.browser.chrome&&(this.options=Object.assign({},this.options,this.chromeNewWindowOptions))},e.prototype.getNewWindowParams=function(){var e="";for(var t in this.options)void 0!==this.defaultWindowOptions[t]&&(e+=(e?",":"")+t+"="+this.options[t]);return e},e.prototype.blur=function(e){try{if(this.browser.safari&&this.browser.version>=11)return window.name||(window.name=(new Date).getTime()),e.open("",window.name),window.focus(),void document.body.focus();if(e.blur(),e.opener&&e.opener.window&&e.opener.window.focus(),window.self.window.focus(),window.focus(),this.browser.firefox||this.browser.safari)this.openCloseWindow();else if(this.browser.msie)document.focus();else if(this.browser.chrome||this.browser.opera){var t=document.createElement("A");t.id="inffake",document.body.appendChild(t),t.webkitRequestFullscreen();var o=document.createEvent("MouseEvents");o.initMouseEvent("click",!!o.target,!0,window,0,0,0,0,0,!1,!1,!0,!1,0,null),t.dispatchEvent(o),document.webkitCancelFullScreen(),setTimeout(function(){window.getSelection().empty()},250)}}catch(e){console.error(e)}},e.prototype.simulateClick=function(e){void 0===e&&(e="");var t=document.createElement("a"),o=document.createEvent("MouseEvents");t.href=e||"javascript:void(0)",document.body.appendChild(t),o.initMouseEvent("click",!0,!0,window,0,0,0,0,0,!0,!1,!1,!0,0,null),t.dispatchEvent(o),t.parentNode.removeChild(t)},e.prototype.openCloseWindow=function(){var e=window.open("about:blank");e.focus(),e.close()},e.prototype.getBrowser=function(){return this.browser},e.counter=0,e}();function s(e,t,o){void 0===o&&(o=null);var i=o||window;return i.addEventListener?i.addEventListener(e,t):i.attachEvent("on"+e,t)}var a=function(){function e(e){void 0===e&&(e=""),this.webkit=!1,this.mozilla=!1,this.chrome=!1,this.msie=!1,this.firefox=!1,this.safari=!1,this.opera=!1,this.mobile=!1,this.userAgent="";var t=e?e.toLowerCase():navigator.userAgent.toLowerCase();this.userAgent=t,t&&(this.webkit=/webkit/.test(t),this.mozilla=/mozilla/.test(t)&&!/(compatible|webkit)/.test(t),this.chrome=/chrome/.test(t),this.msie=/msie|trident\//.test(t)&&!/opera/.test(t),this.firefox=/firefox/.test(t),this.safari=/safari/.test(t)&&!/chrome/.test(t),this.opera=/opera/.test(t),this.mobile=/android|(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|mobile/.test(t))}return e.prototype.getVersion=function(){return parseInt(this.userAgent.match(/(?:[^\s]+(?:ri|ox|me|ra)\/|trident\/.*?rv:)([\d]+)/i)[1],10)},e.prototype.isWebkit=function(){return this.webkit},e.prototype.isMozilla=function(){return this.mozilla},e.prototype.isChrome=function(){return this.chrome},e.prototype.isMsie=function(){return this.msie},e.prototype.isFirefox=function(){return this.firefox},e.prototype.isSafari=function(){return this.safari},e.prototype.isOpera=function(){return this.opera},e.prototype.isMobile=function(){return this.mobile},e}();function l(e,t,o){void 0===o&&(o={}),function(){try{Object.assign||Object.defineProperty(Object,"assign",{enumerable:!1,configurable:!0,writable:!0,value:function(e,t){if(null==e)throw new TypeError("Cannot convert first argument to object");for(var o=Object(e),i=1;i<arguments.length;i++){var n=arguments[i];if(null!=n)for(var r=Object.keys(Object(n)),s=0,a=r.length;s<a;s++){var l=r[s],u=Object.getOwnPropertyDescriptor(n,l);void 0!==u&&u.enumerable&&(o[l]=n[l])}}return o}})}catch(e){console.error("Could not polyfill Object.assign",e)}}(),function(e,t){for(var o=document.getElementsByClassName(t),i=new a,n=!i.isMobile()&&i.isSafari()?"mousedown":"click",r=0;r<o.length;r++)s(n,function(t){return e.run(t)},o.item(r))}(new r(e,o),t)}o.d(t,"default",function(){return l})}]).default;