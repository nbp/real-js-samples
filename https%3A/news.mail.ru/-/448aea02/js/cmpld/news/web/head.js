!function(t,e){if("object"==typeof exports&&"object"==typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var r=e();for(var a in r)("object"==typeof exports?exports:t)[a]=r[a]}}("undefined"!=typeof self?self:this,function(){return function(t){function e(a){if(r[a])return r[a].exports;var n=r[a]={i:a,l:!1,exports:{}};return t[a].call(n.exports,n,n.exports,e),n.l=!0,n.exports}var r={};return e.m=t,e.c=r,e.d=function(t,r,a){e.o(t,r)||Object.defineProperty(t,r,{configurable:!1,enumerable:!0,get:a})},e.n=function(t){var r=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(r,"a",r),r},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="/js/cmpld/",e(e.s=429)}({161:function(t,e){!function(t){function e(){var t={},r=!1,a=0,n=arguments.length;"boolean"==typeof arguments[0]&&(r=arguments[0],a++);for(;a<n;a++){var i=arguments[a];!function(a){for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(r&&"[object Object]"===Object.prototype.toString.call(a[n])?t[n]=e(!0,t[n],a[n]):t[n]=a[n])}(i)}return t}function r(t,e){return(t.matches||t.matchesSelector||t.msMatchesSelector||t.mozMatchesSelector||t.webkitMatchesSelector||t.oMatchesSelector).call(t,e)}function a(t,e,r){t.addEventListener?t.addEventListener(e,r,!1):t.attachEvent&&t.attachEvent("on"+e,r)}var n,i=[],o=1e3,s=60*o,c=60*s,l=24*c,u=t.document,m={interval:10*o,correction:0,agoSelector:".js-ago[datetime]",attr:"datetime",future:null,ranges:[{period:s,format:"только что"},{period:c,format:"%m назад"},{period:l,format:"%h назад"},{period:3*l,format:"%d назад"}]},p=function(){function p(t,e){var r=[2,0,1,1,1,2];return e[t%100>4&&t%100<20?2:r[t%10<5?t%10:5]]}function d(t,e){return e.replace("%s",(t/o|0)+" "+p(t/o|0,["секунду","секунды","секунд"])).replace("%m",(t/s|0)+" "+p(t/s|0,["минуту","минуты","минут"])).replace("%h",(t/c|0)+" "+p(t/c|0,["час","часа","часов"])).replace("%d",(t/l|0)+" "+p(t/l|0,["день","дня","дней"]))}function f(t){var e=/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})([+-]\d{2}):(\d{2})$/,r=e.exec(t);if(!r)return 0;var a=+r[1],n=+r[2],i=+r[3],o=+r[4],s=+r[5],c=+r[6],l=+r[7],u=+r[8],m=(new Date).getTimezoneOffset()+60*l+u;return new Date(a,n-1,i,o,s-m,c)}function h(){for(var t=i.length-1;t>=0;t--)u.documentElement.contains(i[t])?g(i[t]):i.splice(t,1);i.length||(clearInterval(n),n=null)}function g(t){var e=f(t.getAttribute(m.attr)),r=+new Date,a=r-e+m.correction,n=v(t,a);null!=n&&(t.innerHTML=n)}function v(t,e){if(e<0)return m.future;for(var r=0;r<m.ranges.length;r++){var a=m.ranges[r];if(e<a.period)return d(e,a.format)}return t.dataset.ago_content}function w(a){m=e(m,{correction:P,elems:b},a||{}),x||(x=[]),[].forEach.call((m.elems&&Array.isArray(m.elems)?m.elems:[m.elems])||[],function(t){t&&-1===x.indexOf(t)&&x.push(t)}.bind(this)),n||(n=t.setInterval(h,m.interval)),x.forEach(function(t){var e=r(t,m.agoSelector)?t:t.querySelectorAll(m.agoSelector);Array.prototype.forEach.call(e,function(t,e){t.dataset.ago_content=t.innerHTML,-1===i.indexOf(t)&&i.push(t),g(t);for(var a=t;!r(a,m.agoSelector);)a=a.parentNode;a.style.visibility="visible"})})}function y(){if(b=u.getElementsByTagName("body")[0]){clearInterval(k);var e=+b.getAttribute("data-now");P=e?1e3*e-new Date:0;var r=setInterval(w,10);a(t,"load",function(){clearInterval(r),w()})}}var b,P,x,k=setInterval(y,50);return{update:function(t){w(t)}}}();!function(t,e,r){(function t(e,r,a){return 1===e.length?(r[e[0]]=a,r[e[0]]):(null!==r[e[0]]&&void 0!==r[e[0]]||(r[e[0]]=r[e[0]]||{}),t(e.slice(1),r[e[0]],a))})(t.split("."),e,r)}("window.ru.mail.cpf.Instances.Ago",t,p)}(window)},162:function(t,e){!function(t){if(!t.mwManager){var e=function(){function t(e,r){if(!e||"[object Object]"!==Object.prototype.toString.call(e))return void 0===e?r:e;r=r&&"[object Object]"===Object.prototype.toString.call(r)?r:{};for(var a=Object.keys(e),n=0,i=a.length;n<i;++n){var o=a[n];r[o]=t(e[o],r[o])}return r}function e(t){this._separator=t||".",this._paramsData={}}return e.prototype={constructor:e,set:function(e,r){this._paramsData[e||"*"]=t(r,this._paramsData[e||"*"])},get:function(e){return e&&"*"!==e?t(this._paramsData[e],this.get(e.substr(0,e.lastIndexOf(this._separator)))):t(this._paramsData["*"]||null)}},e}(),r=new e("."),a=t.mwManager={prefetch:function(e){var r=a.getInstData(e);!r||!t.myWidget||r.opts.skipUrlsFrom&&r.opts.skipUrlsFrom.length||t.myWidget.prefetch(r.cid,r.opts.sdkParams)},getInstData:function(t){if(!t)return null;var e=t.split(":"),a=e[0],n=e[1],i=r.get(a);return e[1]&&i?{tplName:a,opts:i,cid:n}:null},setParams:function(t,e){r.set(t,e)},setUID:function(t){this._uid=t},getUID:function(){return this._uid}};a.setParams("*",{sdkParams:{timeout:0}}),a.setParams("big",{template:"ct-mywidget-big.xml",sdkParams:{n:3,preview:{width:450,height:252,crop:!0},titleLength:77}}),a.setParams("small",{template:"ct-mywidget-small.xml",sdkParams:{n:3,preview:{width:140,height:100,crop:!0},titleLength:60}}),a.setParams("footer-preview",{template:"ct-mywidget-footer-preview.xml",sdkParams:{n:4,preview:{width:260,height:195,crop:!0},titleLength:55}}),a.setParams("footer-vertical",{template:"ct-mywidget-footer-vertical.xml",sdkParams:{n:4,preview:{width:140,height:100,crop:!0},titleLength:60}}),a.setParams("rb100",{template:"ct-mywidget-rb100.xml",sdkParams:{n:4,preview:{width:320,height:240,crop:!0},titleLength:80}}),a.setParams("article-teaser",{template:"ct-mywidget-article-teaser.xml",sdkParams:{n:1,preview:{width:160,height:95,crop:!0},titleLength:65}}),a.setParams("grid",{template:"ct-mywidget-grid.xml",sdkParams:{n:6,preview:{width:640,height:400,crop:!0},titleLength:80}}),a.setParams("touch-sect",{template:"ct-mywidget-touch-sect.xml",sdkParams:{n:3,preview:{width:160,height:114,crop:!0},titleLength:60}}),a.setParams("touch-rb100",{template:"ct-mywidget-touch-rb100.xml",sdkParams:{n:3,preview:{width:160,height:114,crop:!0},titleLength:80}}),a.setParams("touch-article-teaser",{template:"ct-mywidget-touch-article-teaser.xml",sdkParams:{n:1,preview:{width:160,height:114,crop:!0},titleLength:60}}),a.setParams("touch-article-gallery",{template:"ct-mywidget-touch-article-gallery.xml",sdkParams:{n:4,preview:{width:160,height:114,crop:!0},titleLength:60}})}}(window)},429:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=r(161);r.n(a),r(430)},430:function(t,e,r){"use strict";var a=r(162),n=(r.n(a),r(431));r.n(n)},431:function(t,e){!function(t){"use strict";var e=t.mwManager;e.setUID("08bd59d62021de03a0fda051a0160efb"),e.setParams("tgb-partners",{template:"ct-mywidget-tgb-partners.xml",sdkParams:{n:2,preview:{width:140,height:100,crop:!0},titleLength:50}}),e.setParams("big.newsbytheme",{skipUrlsFrom:["article-teaser"]}),e.setParams("rb100",{skipUrlsFrom:["article-teaser","big.newsbytheme"]})}(window)}})});
//# sourceMappingURL=head.js.map