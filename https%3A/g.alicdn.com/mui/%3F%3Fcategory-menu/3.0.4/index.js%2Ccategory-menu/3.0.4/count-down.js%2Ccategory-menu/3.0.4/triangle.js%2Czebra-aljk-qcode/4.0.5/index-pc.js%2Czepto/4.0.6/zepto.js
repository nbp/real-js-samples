KISSY.add("mui/category-menu/index",function(n,e,t,a,i){function r(e,t){var a=this;if(!e)return;a.container=n.one(e);a.config=n.merge(r.Config,t);a._init()}r.Config={triggerType:"mousemove",triggerDelay:600,autoPlay:false,hoverStop:true,navContaienrClass:"mui-menu-nav-container",navClass:"mui-menu-nav",selectedClass:"mui-menu-nav-selected",pannelClass:"mui-menu-pannel",timeout:3,currentNav:-1,forceSelect:false};n.augment(r,e.Target,{_init:function(){var e=this;e.navContainer=e.container.one("."+e.config.navContainerClass);e.navs=e.navContainer.all("."+e.config.navClass);e.pannels=e.container.all("."+e.config.pannelClass);e.forceSelect=e.config.forceSelect;e.minNavIdx=e.forceSelect?0:-1;e.currentNav=e.config.currentNav>=e.minNavIdx&&e.config.currentNav<e.navs.length?e.config.currentNav:e.minNavIdx;e.autoPlay=e.config.forceSelect&&e.config.autoPlay;e.countDown=a.register("Slide"+n.guid());e._initStatus();e._bindEvent()},_initStatus:function(){var n=this;n.navs.each(function(e){e.removeClass(n.config.selectedClass)});n.pannels.each(function(n){n.hide()});if(n.forceSelect){n.navs.item(n.currentNav).addClass(n.config.selectedClass);n.pannels.item(n.currentNav).show()}i.init(n.navContainer,n.navs);n.countDown.pause();if(n.autoPlay){var e=n.navs.item(n.currentNav).attr("data-count")||n.pannels.item(n.currentNav).attr("data-count")||n.config.timeout;n.countDown.set(e);n.countDown.end(function(){n.next()});n.countDown.resume();n.countDown.start()}},_switchTo:function(n){var e=this;e.navs.item(e.currentNav).removeClass(e.config.selectedClass);e.navs.item(n).addClass(e.config.selectedClass);e.pannels.item(e.currentNav).hide();e.pannels.item(n).show();e.currentNav=n},_bindEvent:function(){var e=this;e.navs.each(function(t){t.on(e.config.triggerType,function(t){var a=n.one(t.currentTarget);var r=e._indexOf(a,e.navs);if(t.type=="mousemove"){if(e.currentNav==-1||!i.isInTriangle(t)){e.switchTo(r)}}else if(t.type=="click"||t.type=="tap"){e.switchTo(r)}});if(~e.config.triggerType.indexOf("mousemove")){t.on("mouseenter",function(t){var a=n.one(t.currentTarget);var i=e._indexOf(a,e.navs);var r=n.later(function(){e.switchTo(i)},e.config.triggerDelay);e.navs.data("data-delayTimer",r)});t.on("mouseleave",function(){var n=e.navs.data("data-delayTimer");n&&n.cancel()})}});if(!e.forceSelect){e.container.on("mouseleave",function(n){e.switchTo(-1)});n.one(document).on("tap",function(n){if(!e.container.contains(n.target)){e.switchTo(-1)}})}if(!e.autoPlay)return;e.on("beforeSwitch",function(n){var t=n.nav;var a=n.pannel;var i=t.attr("data-count")||a.attr("data-count")||e.config.timeout;e.countDown.set(i)});e.container.on("mousemove mouseleave",function(n){if(n.type=="mousemove"){e.countDown.pause()}else if(n.type=="mouseleave"){e.countDown.resume()}})},switchTo:function(n){var e=this;if(n<e.minNavIdx&&n>=e.navs.length||n==e.currentNav)return;var t=e.currentNav;var a={oldIndex:t,index:n,oldNav:e.navs.item(t),nav:e.navs.item(n),oldPannel:e.pannels.item(t),pannel:e.pannels.item(n)};e.fire("beforeSwitch",a);e._switchTo(n);e.fire("afterSwitch",a)},next:function(){var n=this;var e=(n.currentNav+1)%n.navs.length;n.switchTo(e)},prev:function(){var n=this;var e=(n.currentNav-1+n.navs.length)%n.navs.length;n.switchTo(e)},_indexOf:function(n,e){for(var t=0;t<e.length;t++){if(e.item(t).getDOMNode()==n.getDOMNode())return t}return-1}});return r},{requires:["event","node","mui/category-menu/count-down","mui/category-menu/triangle"]});KISSY.add("mui/category-menu/count-down",function(e,r){var t={registerTimers:[]};var n={init:function(r){var n=this;n.config=e.merge(t,r);n.registerTimers=n.config.registerTimers},register:function(e,r){var t=this;t.set(e,r);return{start:function(){n.start()},set:function(r){t.set(e,r)},resume:function(){t.resume(e)},pause:function(){t.pause(e)},end:function(r){t.on(e+"End",r)}}},set:function(e,r){var t=this;var n=t._find(e);if(!n){t.registerTimers.push({name:e,pause:false,count:r>0?r:-1})}else{n.count=r}return n},resume:function(e){var r=this;var t=r._find(e);if(!t)return;t.pause=false},pause:function(e){var r=this;var t=r._find(e);if(!t)return;t.pause=true},start:function(){var r=this;r.stop();r.counter=e.later(function(){for(var e=0;e<r.registerTimers.length;e++){var t=r.registerTimers[e];if(!t.pause){if(t.count==0){r.fire(t["name"]+"End")}t.count--}}},1e3,true)},stop:function(){var e=this;e.counter&&e.counter.cancel()},_find:function(e){var r=this;for(var t=0;t<r.registerTimers.length;t++){if(r.registerTimers[t]["name"]===e){return r.registerTimers[t]}}return undefined}};e.mix(n,r.Target);n.init();return n},{requires:["event"]});KISSY.add("mui/category-menu/triangle",function(e,n){var t={init:function(n,t){var i=this;i.container=e.one(n);if(typeof t==="string"){i.navs=i.container.all(t)}else{i.navs=e.all(t)}i.containerOffset=i.container.offset();i.containerBox={width:n.width(),height:n.height()};i.triangle={m:{x:i.containerBox.width,y:i.containerBox.height},n:{x:i.containerBox.width,y:0},p:{x:0,y:i.containerBox.height}};i.navs.each(function(e){e.on("mouseenter",function(e){i.triangle.p=i._getVirtualCoordinate(e)})})},isInTriangle:function(e){var n=this;var t=n._getVirtualCoordinate(e);return t.x>n.triangle.m.x||t.x>=n.triangle.p.x&&(t.y>=n.triangle.p.y&&(n.triangle.m.y-t.y)/(n.triangle.m.x-t.x)>=(n.triangle.m.y-n.triangle.p.y)/(n.triangle.m.x-n.triangle.p.x)||t.y<n.triangle.p.y&&(n.triangle.n.y-t.y)/(n.triangle.n.x-t.x)<(n.triangle.n.y-n.triangle.p.y)/(n.triangle.n.x-n.triangle.p.x))},_getVirtualCoordinate:function(e){var n=this;return{x:e.pageX-n.containerOffset.left,y:n.containerBox.height-(e.pageY-n.containerOffset.top)}}};return t},{requires:["node"]});define("mui/zebra-aljk-qcode/index-pc",function(e,c,o){e("mui/kissy-polyfill/index");var r=e("mui/zepto/zepto");function d(e){var c=r("#qrcodeImg").text(),o=r("#qrcodeDesc").text(),d=r("#qrcodeDescSpecial").text(),i=r("#qrcodeBg").text(),t=r("#qrcodeArr").text();if(!!c){window.g_config.mallbarQrcode={qrcodeImg:c,qrcodeDesc:o,qrcodeDescSpecial:d,qrcodeBg:i,qrcodeArr:t}}}o.exports=d});define("mui/zepto/zepto",function(t,e,n){"use strict";function i(t){return t&&typeof Symbol!=="undefined"&&t.constructor===Symbol?"symbol":typeof t}var r=function(){var t,e,n,r,o=[],s=o.concat,u=o.filter,f=o.slice,a=window.document,c={},l={},h={"column-count":1,columns:1,"font-weight":1,"line-height":1,opacity:1,"z-index":1,zoom:1},p=/^\s*<(\w+|!)[^>]*>/,d=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,m=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,g=/^(?:body|html)$/i,v=/([A-Z])/g,y=["val","css","html","text","data","width","height","offset"],b=["after","prepend","before","append"],w=a.createElement("table"),x=a.createElement("tr"),z={tr:a.createElement("tbody"),tbody:w,thead:w,tfoot:w,td:x,th:x,"*":a.createElement("div")},E=/complete|loaded|interactive/,T=/^[\w-]*$/,N={},C=N.toString,P={},S,O,q=a.createElement("div"),M={tabindex:"tabIndex",readonly:"readOnly","for":"htmlFor","class":"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder",contenteditable:"contentEditable"},A=Array.isArray||function(t){return t instanceof Array};P.matches=function(t,e){if(!e||!t||t.nodeType!==1)return false;var n=t.webkitMatchesSelector||t.mozMatchesSelector||t.oMatchesSelector||t.matchesSelector;if(n)return n.call(t,e);var i,r=t.parentNode,o=!r;if(o)(r=q).appendChild(t);i=~P.qsa(r,e).indexOf(t);o&&q.removeChild(t);return i};function L(t){return t==null?String(t):N[C.call(t)]||"object"}function k(t){return L(t)=="function"}function j(t){return t!=null&&t==t.window}function $(t){return t!=null&&t.nodeType==t.DOCUMENT_NODE}function D(t){return L(t)=="object"}function I(t){return D(t)&&!j(t)&&Object.getPrototypeOf(t)==Object.prototype}function _(t){return typeof t.length=="number"}function Z(t){return u.call(t,function(t){return t!=null})}function R(t){return t.length>0?n.fn.concat.apply([],t):t}S=function(t){return t.replace(/-+(.)?/g,function(t,e){return e?e.toUpperCase():""})};function U(t){return t.replace(/::/g,"/").replace(/([A-Z]+)([A-Z][a-z])/g,"$1_$2").replace(/([a-z\d])([A-Z])/g,"$1_$2").replace(/_/g,"-").toLowerCase()}O=function(t){return u.call(t,function(e,n){return t.indexOf(e)==n})};function Y(t){return t in l?l[t]:l[t]=new RegExp("(^|\\s)"+t+"(\\s|$)")}function F(t,e){return typeof e=="number"&&!h[U(t)]?e+"px":e}function V(t){var e,n;if(!c[t]){e=a.createElement(t);a.body.appendChild(e);n=getComputedStyle(e,"").getPropertyValue("display");e.parentNode.removeChild(e);n=="none"&&(n="block");c[t]=n}return c[t]}function X(t){return"children"in t?f.call(t.children):n.map(t.childNodes,function(t){if(t.nodeType==1)return t})}function B(t,e){var n,i=t?t.length:0;for(n=0;n<i;n++){this[n]=t[n]}this.length=i;this.selector=e||""}P.fragment=function(e,i,r){var o,s,u;if(d.test(e))o=n(a.createElement(RegExp.$1));if(!o){if(e.replace)e=e.replace(m,"<$1></$2>");if(i===t)i=p.test(e)&&RegExp.$1;if(!(i in z))i="*";u=z[i];u.innerHTML=""+e;o=n.each(f.call(u.childNodes),function(){u.removeChild(this)})}if(I(r)){s=n(o);n.each(r,function(t,e){if(y.indexOf(t)>-1)s[t](e);else s.attr(t,e)})}return o};P.Z=function(t,e){return new B(t,e)};P.isZ=function(t){return t instanceof P.Z};P.init=function(e,i){var r;if(!e)return P.Z();else if(typeof e=="string"){e=e.trim();if(e[0]=="<"&&p.test(e))r=P.fragment(e,RegExp.$1,i),e=null;else if(i!==t)return n(i).find(e);else r=P.qsa(a,e)}else if(k(e))return n(a).ready(e);else if(P.isZ(e))return e;else{if(A(e))r=Z(e);else if(D(e))r=[e],e=null;else if(p.test(e))r=P.fragment(e.trim(),RegExp.$1,i),e=null;else if(i!==t)return n(i).find(e);else r=P.qsa(a,e)}return P.Z(r,e)};n=function(t,e){return P.init(t,e)};function H(n,i,r){for(e in i){if(r&&(I(i[e])||A(i[e]))){if(I(i[e])&&!I(n[e]))n[e]={};if(A(i[e])&&!A(n[e]))n[e]=[];H(n[e],i[e],r)}else if(i[e]!==t)n[e]=i[e]}}n.extend=function(t){var e,n=f.call(arguments,1);if(typeof t=="boolean"){e=t;t=n.shift()}n.forEach(function(n){H(t,n,e)});return t};P.qsa=function(t,e){var n,i=e[0]=="#",r=!i&&e[0]==".",o=i||r?e.slice(1):e,s=T.test(o);return t.getElementById&&s&&i?(n=t.getElementById(o))?[n]:[]:t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11?[]:f.call(s&&!i&&t.getElementsByClassName?r?t.getElementsByClassName(o):t.getElementsByTagName(e):t.querySelectorAll(e))};function W(t,e){return e==null?n(t):n(t).filter(e)}n.contains=a.documentElement.contains?function(t,e){return t!==e&&t.contains(e)}:function(t,e){while(e&&(e=e.parentNode)){if(e===t)return true}return false};function J(t,e,n,i){return k(e)?e.call(t,n,i):e}function G(t,e,n){n==null?t.removeAttribute(e):t.setAttribute(e,n)}function K(e,n){var i=e.className||"",r=i&&i.baseVal!==t;if(n===t)return r?i.baseVal:i;r?i.baseVal=n:e.className=n}function Q(t){try{return t?t=="true"||(t=="false"?false:t=="null"?null:+t+""==t?+t:/^[\[\{]/.test(t)?n.parseJSON(t):t):t}catch(e){return t}}n.type=L;n.isFunction=k;n.isWindow=j;n.isArray=A;n.isPlainObject=I;n.isEmptyObject=function(t){var e;for(e in t){return false}return true};n.inArray=function(t,e,n){return o.indexOf.call(e,t,n)};n.camelCase=S;n.trim=function(t){return t==null?"":String.prototype.trim.call(t)};n.uuid=0;n.support={};n.expr={};n.noop=function(){};n.map=function(t,e){var n,i=[],r,o;if(_(t))for(r=0;r<t.length;r++){n=e(t[r],r);if(n!=null)i.push(n)}else for(o in t){n=e(t[o],o);if(n!=null)i.push(n)}return R(i)};n.each=function(t,e){var n,i;if(_(t)){for(n=0;n<t.length;n++){if(e.call(t[n],n,t[n])===false)return t}}else{for(i in t){if(e.call(t[i],i,t[i])===false)return t}}return t};n.grep=function(t,e){return u.call(t,e)};if(window.JSON)n.parseJSON=JSON.parse;n.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(t,e){N["[object "+e+"]"]=e.toLowerCase()});n.fn={constructor:P.Z,length:0,forEach:o.forEach,reduce:o.reduce,push:o.push,sort:o.sort,splice:o.splice,indexOf:o.indexOf,concat:function et(){var t,e,n=[];for(t=0;t<arguments.length;t++){e=arguments[t];n[t]=P.isZ(e)?e.toArray():e}return s.apply(P.isZ(this)?this.toArray():this,n)},map:function nt(t){return n(n.map(this,function(e,n){return t.call(e,n,e)}))},slice:function it(){return n(f.apply(this,arguments))},ready:function rt(t){if(E.test(a.readyState)&&a.body)t(n);else a.addEventListener("DOMContentLoaded",function(){t(n)},false);return this},get:function ot(e){return e===t?f.call(this):this[e>=0?e:e+this.length]},toArray:function st(){return this.get()},size:function ut(){return this.length},remove:function ft(){return this.each(function(){if(this.parentNode!=null)this.parentNode.removeChild(this)})},each:function at(t){o.every.call(this,function(e,n){return t.call(e,n,e)!==false});return this},filter:function ct(t){if(k(t))return this.not(this.not(t));return n(u.call(this,function(e){return P.matches(e,t)}))},add:function lt(t,e){return n(O(this.concat(n(t,e))))},is:function ht(t){return this.length>0&&P.matches(this[0],t)},not:function pt(e){var i=[];if(k(e)&&e.call!==t)this.each(function(t){if(!e.call(this,t))i.push(this)});else{var r=typeof e=="string"?this.filter(e):_(e)&&k(e.item)?f.call(e):n(e);this.forEach(function(t){if(r.indexOf(t)<0)i.push(t)})}return n(i)},has:function dt(t){return this.filter(function(){return D(t)?n.contains(this,t):n(this).find(t).size()})},eq:function mt(t){return t===-1?this.slice(t):this.slice(t,+t+1)},first:function gt(){var t=this[0];return t&&!D(t)?t:n(t)},last:function vt(){var t=this[this.length-1];return t&&!D(t)?t:n(t)},find:function yt(t){var e,r=this;if(!t)e=n();else if((typeof t==="undefined"?"undefined":i(t))=="object")e=n(t).filter(function(){var t=this;return o.some.call(r,function(e){return n.contains(e,t)})});else if(this.length==1)e=n(P.qsa(this[0],t));else e=this.map(function(){return P.qsa(this,t)});return e},closest:function bt(t,e){var r=this[0],o=false;if((typeof t==="undefined"?"undefined":i(t))=="object")o=n(t);while(r&&!(o?o.indexOf(r)>=0:P.matches(r,t))){r=r!==e&&!$(r)&&r.parentNode}return n(r)},parents:function wt(t){var e=[],i=this;while(i.length>0){i=n.map(i,function(t){if((t=t.parentNode)&&!$(t)&&e.indexOf(t)<0){e.push(t);return t}})}return W(e,t)},parent:function xt(t){return W(O(this.pluck("parentNode")),t)},children:function zt(t){return W(this.map(function(){return X(this)}),t)},contents:function Et(){return this.map(function(){return this.contentDocument||f.call(this.childNodes)})},siblings:function Tt(t){return W(this.map(function(t,e){return u.call(X(e.parentNode),function(t){return t!==e})}),t)},empty:function Nt(){return this.each(function(){this.innerHTML=""})},pluck:function Ct(t){return n.map(this,function(e){return e[t]})},show:function Pt(){return this.each(function(){this.style.display=="none"&&(this.style.display="");if(getComputedStyle(this,"").getPropertyValue("display")=="none")this.style.display=V(this.nodeName)})},replaceWith:function St(t){return this.before(t).remove()},wrap:function Ot(t){var e=k(t);if(this[0]&&!e)var i=n(t).get(0),r=i.parentNode||this.length>1;return this.each(function(o){n(this).wrapAll(e?t.call(this,o):r?i.cloneNode(true):i)})},wrapAll:function qt(t){if(this[0]){n(this[0]).before(t=n(t));var e;while((e=t.children()).length){t=e.first()}n(t).append(this)}return this},wrapInner:function Mt(t){var e=k(t);return this.each(function(i){var r=n(this),o=r.contents(),s=e?t.call(this,i):t;o.length?o.wrapAll(s):r.append(s)})},unwrap:function At(){this.parent().each(function(){n(this).replaceWith(n(this).children())});return this},clone:function Lt(){return this.map(function(){return this.cloneNode(true)})},hide:function kt(){return this.css("display","none")},toggle:function jt(e){return this.each(function(){var i=n(this);(e===t?i.css("display")=="none":e)?i.show():i.hide()})},prev:function $t(t){return n(this.pluck("previousElementSibling")).filter(t||"*")},next:function Dt(t){return n(this.pluck("nextElementSibling")).filter(t||"*")},html:function It(t){return 0 in arguments?this.each(function(e){var i=this.innerHTML;n(this).empty().append(J(this,t,e,i))}):0 in this?this[0].innerHTML:null},text:function _t(t){return 0 in arguments?this.each(function(e){var n=J(this,t,e,this.textContent);this.textContent=n==null?"":""+n}):0 in this?this.pluck("textContent").join(""):null},attr:function Zt(n,i){var r;return typeof n=="string"&&!(1 in arguments)?!this.length||this[0].nodeType!==1?t:!(r=this[0].getAttribute(n))&&n in this[0]?this[0][n]:r:this.each(function(t){if(this.nodeType!==1)return;if(D(n))for(e in n){G(this,e,n[e])}else G(this,n,J(this,i,t,this.getAttribute(n)))})},removeAttr:function Rt(t){return this.each(function(){this.nodeType===1&&t.split(" ").forEach(function(t){G(this,t)},this)})},prop:function Ut(t,e){t=M[t]||t;return 1 in arguments?this.each(function(n){this[t]=J(this,e,n,this[t])}):this[0]&&this[0][t]},data:function Yt(e,n){var i="data-"+e.replace(v,"-$1").toLowerCase();var Yt=1 in arguments?this.attr(i,n):this.attr(i);return Yt!==null?Q(Yt):t},val:function Ft(t){return 0 in arguments?this.each(function(e){this.value=J(this,t,e,this.value)}):this[0]&&(this[0].multiple?n(this[0]).find("option").filter(function(){return this.selected}).pluck("value"):this[0].value)},offset:function Vt(t){if(t)return this.each(function(e){var i=n(this),r=J(this,t,e,i.offset()),o=i.offsetParent().offset(),s={top:r.top-o.top,left:r.left-o.left};if(i.css("position")=="static")s["position"]="relative";i.css(s)});if(!this.length)return null;if(!n.contains(a.documentElement,this[0]))return{top:0,left:0};var e=this[0].getBoundingClientRect();return{left:e.left+window.pageXOffset,top:e.top+window.pageYOffset,width:Math.round(e.width),height:Math.round(e.height)}},css:function Xt(t,i){if(arguments.length<2){var r,o=this[0];if(!o)return;r=getComputedStyle(o,"");if(typeof t=="string")return o.style[S(t)]||r.getPropertyValue(t);else if(A(t)){var s={};n.each(t,function(t,e){s[e]=o.style[S(e)]||r.getPropertyValue(e)});return s}}var Xt="";if(L(t)=="string"){if(!i&&i!==0)this.each(function(){this.style.removeProperty(U(t))});else Xt=U(t)+":"+F(t,i)}else{for(e in t){if(!t[e]&&t[e]!==0)this.each(function(){this.style.removeProperty(U(e))});else Xt+=U(e)+":"+F(e,t[e])+";"}}return this.each(function(){this.style.cssText+=";"+Xt})},index:function Bt(t){return t?this.indexOf(n(t)[0]):this.parent().children().indexOf(this[0])},hasClass:function Ht(t){if(!t)return false;return o.some.call(this,function(t){return this.test(K(t))},Y(t))},addClass:function Wt(t){if(!t)return this;return this.each(function(e){if(!("className"in this))return;r=[];var i=K(this),o=J(this,t,e,i);o.split(/\s+/g).forEach(function(t){if(!n(this).hasClass(t))r.push(t)},this);r.length&&K(this,i+(i?" ":"")+r.join(" "))})},removeClass:function Jt(e){return this.each(function(n){if(!("className"in this))return;if(e===t)return K(this,"");r=K(this);J(this,e,n,r).split(/\s+/g).forEach(function(t){r=r.replace(Y(t)," ")});K(this,r.trim())})},toggleClass:function Gt(e,i){if(!e)return this;return this.each(function(r){var o=n(this),s=J(this,e,r,K(this));s.split(/\s+/g).forEach(function(e){(i===t?!o.hasClass(e):i)?o.addClass(e):o.removeClass(e)})})},scrollTop:function Kt(e){if(!this.length)return;var n="scrollTop"in this[0];if(e===t)return n?this[0].scrollTop:this[0].pageYOffset;return this.each(n?function(){this.scrollTop=e}:function(){this.scrollTo(this.scrollX,e)})},scrollLeft:function Qt(e){if(!this.length)return;var n="scrollLeft"in this[0];if(e===t)return n?this[0].scrollLeft:this[0].pageXOffset;return this.each(n?function(){this.scrollLeft=e}:function(){this.scrollTo(e,this.scrollY)})},position:function te(){if(!this.length)return;var t=this[0],e=this.offsetParent(),i=this.offset(),r=g.test(e[0].nodeName)?{top:0,left:0}:e.offset();i.top-=parseFloat(n(t).css("margin-top"))||0;i.left-=parseFloat(n(t).css("margin-left"))||0;r.top+=parseFloat(n(e[0]).css("border-top-width"))||0;r.left+=parseFloat(n(e[0]).css("border-left-width"))||0;return{top:i.top-r.top,left:i.left-r.left}},offsetParent:function ee(){return this.map(function(){var t=this.offsetParent||a.body;while(t&&!g.test(t.nodeName)&&n(t).css("position")=="static"){t=t.offsetParent}return t})}};n.fn.detach=n.fn.remove;["width","height"].forEach(function(e){var i=e.replace(/./,function(t){return t[0].toUpperCase()});n.fn[e]=function(r){var o,s=this[0];if(r===t)return j(s)?s["inner"+i]:$(s)?s.documentElement["scroll"+i]:(o=this.offset())&&o[e];else return this.each(function(t){s=n(this);s.css(e,J(this,r,t,s[e]()))})}});function tt(t,e){e(t);for(var n=0,i=t.childNodes.length;n<i;n++){tt(t.childNodes[n],e)}}b.forEach(function(t,e){var i=e%2;n.fn[t]=function(){var t,r=n.map(arguments,function(e){t=L(e);return t=="object"||t=="array"||e==null?e:P.fragment(e)}),o,s=this.length>1;if(r.length<1)return this;return this.each(function(t,u){o=i?u:u.parentNode;u=e==0?u.nextSibling:e==1?u.firstChild:e==2?u:null;var f=n.contains(a.documentElement,o);r.forEach(function(t){if(s)t=t.cloneNode(true);else if(!o)return n(t).remove();o.insertBefore(t,u);if(f)tt(t,function(t){if(t.nodeName!=null&&t.nodeName.toUpperCase()==="SCRIPT"&&(!t.type||t.type==="text/javascript")&&!t.src)window["eval"].call(window,t.innerHTML)})})})};n.fn[i?t+"To":"insert"+(e?"Before":"After")]=function(e){n(e)[t](this);return this}});P.Z.prototype=B.prototype=n.fn;P.uniq=O;P.deserializeValue=Q;n.zepto=P;return n}();n.exports=r});