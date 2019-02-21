/*
Copyright 2014, KISSY v1.49.10
MIT Licensed
build time: Dec 10 15:04
*/
KISSY.add("node/base",["dom","event/dom"],function(b,e){function c(f,m,g){if(!(this instanceof c))return new c(f,m,g);if(f)if("string"===typeof f){if(f=h.create(f,m,g),f.nodeType===k.DOCUMENT_FRAGMENT_NODE)return d.apply(this,a(f.childNodes)),this}else{if(b.isArray(f)||j(f))return d.apply(this,a(f)),this}else return this;this[0]=f;this.length=1;return this}var h=e("dom"),i=e("event/dom"),g=Array.prototype,l=g.slice,k=h.NodeType,d=g.push,a=b.makeArray,j=h.isDomNodeList;c.prototype={constructor:c,isNodeList:!0,
length:0,item:function(f){return"number"===typeof f?f>=this.length?null:new c(this[f]):new c(f)},add:function(f,a,b){"number"===typeof a&&(b=a,a=void 0);f=c.all(f,a).getDOMNodes();a=new c(this);void 0===b?d.apply(a,f):(b=[b,0],b.push.apply(b,f),g.splice.apply(a,b));return a},slice:function(){return new c(l.apply(this,arguments))},getDOMNodes:function(){return l.call(this)},each:function(a,d){var k=this;b.each(k,function(b,j){b=new c(b);return a.call(d||b,b,j,k)});return k},getDOMNode:function(){return this[0]},
end:function(){return this.__parent||this},filter:function(a){return new c(h.filter(this,a))},all:function(a){a=0<this.length?c.all(a,this):new c;a.__parent=this;return a},one:function(a){a=this.all(a);if(a=a.length?a.slice(0,1):null)a.__parent=this;return a}};b.mix(c,{all:function(a,d){return"string"===typeof a&&(a=b.trim(a))&&3<=a.length&&b.startsWith(a,"<")&&b.endsWith(a,">")?(d&&(d.getDOMNode&&(d=d[0]),d=d.ownerDocument||d),new c(a,void 0,d)):new c(h.query(a,d))},one:function(a,d){var b=c.all(a,
d);return b.length?b.slice(0,1):null}});c.NodeType=k;c.KeyCode=i.KeyCode;c.Gesture=i.Gesture;c.REPLACE_HISTORY=i.REPLACE_HISTORY;return c});
KISSY.add("node/attach",["dom","event/dom","./base"],function(b,e){function c(d,a,b){b.unshift(a);d=h[d].apply(h,b);return void 0===d?a:d}var h=e("dom"),i=e("event/dom"),g=e("./base"),l=g.prototype,k=b.makeArray;g.KeyCode=i.KeyCode;b.each("nodeName,isCustomDomain,getEmptyIframeSrc,equals,contains,index,scrollTop,scrollLeft,height,width,innerHeight,innerWidth,outerHeight,outerWidth,addStyleSheet,appendTo,prependTo,insertBefore,before,after,insertAfter,test,hasClass,addClass,removeClass,replaceClass,toggleClass,removeAttr,hasAttr,hasProp,scrollIntoView,remove,empty,removeData,hasData,unselectable,wrap,wrapAll,replaceWith,wrapInner,unwrap".split(","),function(d){l[d]=
function(){var a=k(arguments);return c(d,this,a)}});b.each("getWindow,getDocument,filter,first,last,parent,closest,next,prev,clone,siblings,contents,children".split(","),function(d){l[d]=function(){var a=k(arguments);a.unshift(this);a=h[d].apply(h,a);return a===void 0?this:a===null?null:new g(a)}});b.each({attr:1,text:0,css:1,style:1,val:0,prop:1,offset:0,html:0,outerHTML:0,outerHtml:0,data:1},function(d,a){l[a]=function(){var j;j=k(arguments);void 0===j[d]&&!b.isObject(j[0])?(j.unshift(this),j=h[a].apply(h,
j)):j=c(a,this,j);return j}});b.each(["on","detach","delegate","undelegate"],function(d){l[d]=function(){var a=k(arguments);a.unshift(this);i[d].apply(i,a);return this}});b.each(["fire","fireHandler"],function(d){l[d]=function(){var a=k(arguments);a.unshift(this);return i[d].apply(i,a)}})});
KISSY.add("node/override",["dom","./base","./attach"],function(b,e){var c=e("dom"),h=e("./base");e("./attach");var i=h.prototype;b.each(["append","prepend","before","after"],function(b){i[b]=function(e){"object"!==typeof e&&(e=c.create(e+""));if(e)c[b](e,this);return this}});b.each(["wrap","wrapAll","replaceWith","wrapInner"],function(b){var c=i[b];i[b]=function(b){"string"===typeof b&&(b=h.all(b,this[0].ownerDocument));return c.call(this,b)}})});
KISSY.add("node/anim",["./base","dom","anim"],function(b,e){function c(b,d,a){for(var c=[],f={},a=a||0;a<d;a++)c.push.apply(c,l[a]);for(a=0;a<c.length;a++)f[c[a]]=b;return f}var h=e("./base"),i=e("dom"),g=e("anim"),l=[["height","margin-top","margin-bottom","padding-top","padding-bottom"],["width","margin-left","margin-right","padding-left","padding-right"],["opacity"]];b.augment(h,{animate:function(){var c=b.makeArray(arguments);b.each(this,function(d){var a=b.clone(c),e=a[0];e.to?(e.node=d,(new g(e)).run()):
g.apply(void 0,[d].concat(a)).run()});return this},stop:function(c,d,a){b.each(this,function(b){g.stop(b,c,d,a)});return this},pause:function(c,d){b.each(this,function(a){g.pause(a,d)});return this},resume:function(c,d){b.each(this,function(a){g.resume(a,d)});return this},isRunning:function(){for(var b=0;b<this.length;b++)if(g.isRunning(this[b]))return!0;return!1},isPaused:function(){for(var b=0;b<this.length;b++)if(g.isPaused(this[b]))return!0;return!1}});b.each({show:c("show",3),hide:c("hide",3),
toggle:c("toggle",3),fadeIn:c("show",3,2),fadeOut:c("hide",3,2),fadeToggle:c("toggle",3,2),slideDown:c("show",1),slideUp:c("hide",1),slideToggle:c("toggle",1)},function(c,d){h.prototype[d]=function(a,e,f){if(i[d]&&!a)i[d](this);else b.each(this,function(b){(new g(b,c,a,f,e)).run()});return this}})});
KISSY.add("node",["node/base","node/attach","node/override","node/anim"],function(b,e){var c=e("node/base");e("node/attach");e("node/override");e("node/anim");b.mix(b,{Node:c,NodeList:c,one:c.one,all:c.all});return c});
/*
Copyright 2014, KISSY v1.49.10
MIT Licensed
build time: Dec 10 14:46
*/
KISSY.add("anim",["anim/base","anim/timer","anim/transition?"],function(b,g){function a(a,e,d,f,c){if(a.node)c=a;else{"string"===typeof e?(e=b.unparam(""+e,";",":"),b.each(e,function(c,a){var d=b.trim(a);d&&(e[d]=b.trim(c));(!d||d!==a)&&delete e[a]})):e=b.clone(e);if(b.isPlainObject(d))c=b.clone(d);else if(c={complete:c},d&&(c.duration=d),f)c.easing=f;c.node=a;c.to=e}c=b.merge(k,c,{useTransition:b.config("anim/useTransition")});return c.useTransition&&h?new h(c):new i(c)}var j=g("anim/base"),i=g("anim/timer"),
h=g("anim/transition?"),f=j.Utils,k={duration:1,easing:"linear"};b.each(["pause","resume"],function(b){a[b]=function(a,d){return null===d||"string"===typeof d||!1===d?f.pauseOrResumeQueue(a,d,b):f.pauseOrResumeQueue(a,void 0,b)}});a.isRunning=f.isElRunning;a.isPaused=f.isElPaused;a.stop=f.stopEl;a.Easing=i.Easing;b.Anim=a;a.Q=j.Q;return a});
/*
Copyright 2014, KISSY v1.49.10
MIT Licensed
build time: Dec 10 14:46
*/
KISSY.add("anim/base/queue",["dom"],function(c,i){function h(a,b,c){var b=b||f,j,m=d.data(a,g);!m&&!c&&d.data(a,g,m={});m&&(j=m[b],!j&&!c&&(j=m[b]=[]));return j}var d=i("dom"),g=c.guid("ks-queue-"+c.now()+"-"),f=c.guid("ks-queue-"+c.now()+"-"),a;return a={queueCollectionKey:g,queue:function(a,c,d){a=h(a,c);a.push(d);return a},remove:function(e,b,d){var j=h(e,b,1);j&&(d=c.indexOf(d,j),-1<d&&j.splice(d,1));j&&!j.length&&a.clearQueue(e,b);return j},clearQueues:function(a){d.removeData(a,g)},clearQueue:function(a,
b){var b=b||f,l=d.data(a,g);l&&delete l[b];c.isEmptyObject(l)&&d.removeData(a,g)},dequeue:function(c,b){var d=h(c,b,1);d&&(d.shift(),d.length||a.clearQueue(c,b));return d}}});
KISSY.add("anim/base/utils",["./queue","dom"],function(c,i){var h=i("./queue"),d=i("dom"),g=c.guid("ks-anim-unqueued-"+c.now()+"-"),f=c.guid("ks-anim-paused-"+c.now()+"-");return{saveRunningAnim:function(a){var e=a.node,b=d.data(e,g);b||d.data(e,g,b={});b[c.stamp(a)]=a},removeRunningAnim:function(a){var e=a.node,b=d.data(e,g);b&&(delete b[c.stamp(a)],c.isEmptyObject(b)&&d.removeData(e,g))},isAnimPaused:function(a){var e=d.data(a.node,f);return e?!!e[c.stamp(a)]:0},removePausedAnim:function(a){var e=
a.node,b=d.data(e,f);b&&(delete b[c.stamp(a)],c.isEmptyObject(b)&&d.removeData(e,f))},savePausedAnim:function(a){var e=a.node,b=d.data(e,f);b||d.data(e,f,b={});b[c.stamp(a)]=a},isAnimRunning:function(a){var e=d.data(a.node,g);return e?!!e[c.stamp(a)]:0},isElPaused:function(a){return(a=d.data(a,f))&&!c.isEmptyObject(a)},isElRunning:function(a){return(a=d.data(a,g))&&!c.isEmptyObject(a)},pauseOrResumeQueue:function(a,e,b){a=d.data(a,"resume"===b?f:g);a=c.merge(a);c.each(a,function(a){if(void 0===e||
a.config.queue===e)a[b]()})},stopEl:function(a,e,b,f){b&&(void 0===f?h.clearQueues(a):!1!==f&&h.clearQueue(a,f));a=d.data(a,g);a=c.merge(a);c.each(a,function(a){(void 0===f||a.config.queue===f)&&a.stop(e)})}}});
KISSY.add("anim/base",["dom","./base/utils","./base/queue","promise"],function(c,i){function h(j){h.superclass.constructor.call(this);a.Defer(this);this.config=j;var b=j.node;c.isPlainObject(b)||(b=d.get(j.node));this.node=this.el=b;this._backupProps={};this._propsData={}}var d=i("dom"),g=i("./base/utils"),f=i("./base/queue"),a=i("promise"),e=d.NodeType,b=c.noop,l={toggle:1,hide:1,show:1};c.extend(h,a,{on:function(a,c){"complete"===a?this.then(c):"end"===a?this.fin(c):"step"===a&&this.progress(c);
return this},prepareFx:b,runInternal:function(){var a=this,b=a.config,f=a.node,h,i=a._backupProps,o=a._propsData,k=b.to,r=b.delay||0,p=b.duration;g.saveRunningAnim(a);c.each(k,function(a,d){c.isPlainObject(a)||(a={value:a});o[d]=c.mix({delay:r,easing:b.easing,frame:b.frame,duration:p},a)});if(f.nodeType===e.ELEMENT_NODE){if(k.width||k.height)k=f.style,c.mix(i,{overflow:k.overflow,"overflow-x":k.overflowX,"overflow-y":k.overflowY}),k.overflow="hidden","inline"===d.css(f,"display")&&"none"===d.css(f,
"float")&&(10>c.UA.ieMode?k.zoom=1:k.display="inline-block");var q,n;n="none"===d.css(f,"display");c.each(o,function(c,b){h=c.value;if(l[h]){if("hide"===h&&n||"show"===h&&!n)return a.stop(!0),q=!1;i[b]=d.style(f,b);"toggle"===h&&(h=n?"show":"hide");"hide"===h?(c.value=0,i.display="none"):(c.value=d.css(f,b),d.css(f,b,0),d.show(f))}});if(!1===q)return}a.startTime=c.now();c.isEmptyObject(o)?(a.__totalTime=1E3*p,a.__waitTimeout=setTimeout(function(){a.stop(!0)},a.__totalTime)):(a.prepareFx(),a.doStart())},
isRunning:function(){return g.isAnimRunning(this)},isPaused:function(){return g.isAnimPaused(this)},pause:function(){this.isRunning()&&(this._runTime=c.now()-this.startTime,this.__totalTime-=this._runTime,g.removeRunningAnim(this),g.savePausedAnim(this),this.__waitTimeout?clearTimeout(this.__waitTimeout):this.doStop());return this},doStop:b,doStart:b,resume:function(){var a=this;a.isPaused()&&(a.startTime=c.now()-a._runTime,g.removePausedAnim(a),g.saveRunningAnim(a),a.__waitTimeout?a.__waitTimeout=
setTimeout(function(){a.stop(!0)},a.__totalTime):(a.beforeResume(),a.doStart()));return a},beforeResume:b,run:function(){var a;a=this.config.queue;!1===a?this.runInternal():(a=f.queue(this.node,a,this),1===a.length&&this.runInternal());return this},stop:function(a){var b=this.node,e=this.config.queue;if(this.isResolved()||this.isRejected())return this;this.__waitTimeout&&(clearTimeout(this.__waitTimeout),this.__waitTimeout=0);if(!this.isRunning()&&!this.isPaused())return!1!==e&&f.remove(b,e,this),
this;this.doStop(a);g.removeRunningAnim(this);g.removePausedAnim(this);var h=this.defer;if(a){var i,a=this.config.complete;c.isEmptyObject(i=this._backupProps)||d.css(this.node,i);a&&a.call(this);h.resolve([this])}else h.reject([this]);!1!==e&&(b=f.dequeue(b,e))&&b[0]&&b[0].runInternal();return this}});h.Utils=g;h.Q=f;return h});
/*
Copyright 2014, KISSY v1.49.10
MIT Licensed
build time: Dec 10 15:04
*/
KISSY.add("promise",[],function(k){function u(a){"undefined"!==typeof console&&console.error&&console.error(a)}function p(a,b,d){if(a instanceof g)q(function(){d.call(a,a[e])});else{var l=a[e],c=a[i];c?c.push([b,d]):m(l)?p(l,b,d):b&&q(function(){b.call(a,l)})}}function f(a){if(!(this instanceof f))return new f(a);this.promise=a||new c;this.promise.defer=this}function m(a){return a&&a instanceof c}function c(a){this[e]=a;void 0===a&&(this[i]=[],this[n]=[])}function g(a){if(a instanceof g)return a;
c.apply(this,arguments);return this}function j(a,b,d){function l(a){try{return b?b.call(this,a):a}catch(d){return u(d.stack||d),new g(d)}}function e(a){try{return d?d.call(this,a):new g(a)}catch(b){return u(b.stack||b),new g(b)}}function o(a){h||a instanceof c||(h=1,r.resolve(l.call(this,a)))}var r=new f,h=0;a instanceof c?p(a,o,function(a){h||(h=1,r.resolve(e.call(this,a)))}):o(a);return r.promise}function s(a){return!t(a)&&m(a)&&void 0===a[i]&&(!m(a[e])||s(a[e]))}function t(a){return m(a)&&void 0===
a[i]&&a[e]instanceof g}var e="__promise_value",q=k.setImmediate,n="__promise_progress_listeners",i="__promise_pendings";f.prototype={constructor:f,resolve:function(a){var b=this.promise,d;if(!(d=b[i]))return null;b[e]=a;d=[].concat(d);b[i]=void 0;b[n]=void 0;k.each(d,function(a){p(b,a[0],a[1])});return a},reject:function(a){return this.resolve(new g(a))},notify:function(a){k.each(this.promise[n],function(b){q(function(){b(a)})})}};c.prototype={constructor:c,then:function(a,b,d){d&&this.progress(d);
return j(this,a,b)},progress:function(a){this[n]&&this[n].push(a);return this},fail:function(a){return j(this,0,a)},fin:function(a){return j(this,function(b){return a(b,!0)},function(b){return a(b,!1)})},done:function(a,b){(a||b?this.then(a,b):this).fail(function(a){setTimeout(function(){throw a;},0)})},isResolved:function(){return s(this)},isRejected:function(){return t(this)}};k.extend(g,c);KISSY.Defer=f;KISSY.Promise=c;c.Defer=f;k.mix(c,{when:j,isPromise:m,isResolved:s,isRejected:t,all:function(a){var b=
a.length;if(!b)return null;for(var d=new f,c=0;c<a.length;c++)(function(c,o){j(c,function(c){a[o]=c;0===--b&&d.resolve(a)},function(a){d.reject(a)})})(a[c],c);return d.promise},async:function(a){return function(){function b(a,b){var h;try{h=e[a](b)}catch(f){return new g(f)}return h.done?h.value:j(h.value,d,c)}function d(a){return b("next",a)}function c(a){return b("throw",a)}var e=a.apply(this,arguments);return d()}}});return c});
/*
Copyright 2014, KISSY v1.49.10
MIT Licensed
build time: Dec 10 14:46
*/
KISSY.add("anim/timer/easing",[],function(){function j(a){return a}function e(a,b,n,f){var d=3*a-3*n+1,c=3*n-6*a,h=3*a,l=3*b-3*f+1,i=3*f-6*b,j=3*b;return function(a){a:{for(var b=a,f,n,k=0;8>k;k++){n=((d*b+c)*b+h)*b-a;if(m(n)<o){a=b;break a}f=(3*d*b+2*c)*b+h;if(m(f)<o)break;b-=n/f}f=1;k=0;for(b=a;f>k;){n=((d*b+c)*b+h)*b-a;if(m(n)<o)break;0<n?f=b:k=b;b=(f+k)/2}a=b}return((l*a+i)*a+j)*a}}var g=Math.PI,h=Math.pow,b=Math.sin,c=parseFloat,l=/^cubic-bezier\(([^,]+),([^,]+),([^,]+),([^,]+)\)$/i,i={swing:function(a){return-Math.cos(a*
g)/2+0.5},easeNone:j,linear:j,easeIn:function(a){return a*a},ease:e(0.25,0.1,0.25,1),"ease-in":e(0.42,0,1,1),"ease-out":e(0,0,0.58,1),"ease-in-out":e(0.42,0,0.58,1),"ease-out-in":e(0,0.42,1,0.58),toFn:function(a){var b;return(b=a.match(l))?e(c(b[1]),c(b[2]),c(b[3]),c(b[4])):i[a]||j},easeOut:function(a){return(2-a)*a},easeBoth:function(a){return 1>(a*=2)?0.5*a*a:0.5*(1- --a*(a-2))},easeInStrong:function(a){return a*a*a*a},easeOutStrong:function(a){return 1- --a*a*a*a},easeBothStrong:function(a){return 1>
(a*=2)?0.5*a*a*a*a:0.5*(2-(a-=2)*a*a*a)},elasticIn:function(a){return 0===a||1===a?a:-(h(2,10*(a-=1))*b(2*(a-0.075)*g/0.3))},elasticOut:function(a){return 0===a||1===a?a:h(2,-10*a)*b(2*(a-0.075)*g/0.3)+1},elasticBoth:function(a){return 0===a||2===(a*=2)?a:1>a?-0.5*h(2,10*(a-=1))*b(2*(a-0.1125)*g/0.45):0.5*h(2,-10*(a-=1))*b(2*(a-0.1125)*g/0.45)+1},backIn:function(a){1===a&&(a-=0.001);return a*a*(2.70158*a-1.70158)},backOut:function(a){return(a-=1)*a*(2.70158*a+1.70158)+1},backBoth:function(a){var b,
n=(b=2.5949095)+1;return 1>(a*=2)?0.5*a*a*(n*a-b):0.5*((a-=2)*a*(n*a+b)+2)},bounceIn:function(a){return 1-i.bounceOut(1-a)},bounceOut:function(a){return a<1/2.75?7.5625*a*a:a<2/2.75?7.5625*(a-=1.5/2.75)*a+0.75:a<2.5/2.75?7.5625*(a-=2.25/2.75)*a+0.9375:7.5625*(a-=2.625/2.75)*a+0.984375},bounceBoth:function(a){return 0.5>a?0.5*i.bounceIn(2*a):0.5*i.bounceOut(2*a-1)+0.5}},o=1.0E-6,m=Math.abs;return i});
KISSY.add("anim/timer/manager",[],function(j){var e=j.stamp,g,h;g=function(b){return setTimeout(b,15)};h=function(b){clearTimeout(b)};return{runnings:{},timer:null,start:function(b){var c=e(b);this.runnings[c]||(this.runnings[c]=b,this.startTimer())},stop:function(b){this.notRun(b)},notRun:function(b){delete this.runnings[e(b)];j.isEmptyObject(this.runnings)&&this.stopTimer()},pause:function(b){this.notRun(b)},resume:function(b){this.start(b)},startTimer:function(){var b=this;b.timer||(b.timer=g(function l(){b.runFrames()?
b.stopTimer():b.timer=g(l)}))},stopTimer:function(){var b=this.timer;b&&(h(b),this.timer=0)},runFrames:function(){var b,c,h=this.runnings;for(b in h)h[b].frame();for(b in h){c=0;break}return void 0===c}}});
KISSY.add("anim/timer/fx",["dom"],function(j,e){function g(b){j.mix(this,b);this.pos=0;this.unit=this.unit||""}var h=e("dom");g.prototype={isCustomFx:0,constructor:g,load:function(b){j.mix(this,b);this.pos=0;this.unit=this.unit||""},frame:function(b){if(1!==this.pos){var c=this.anim,g=this.prop,i=c.node,e=this.from,m=this.propData,a=this.to;if(void 0===b)var k=j.now(),b=m.duration,k=k-c.startTime-m.delay,b=0>=k?0:k>=b?1:m.easing(k/b);this.pos=b;e===a||0===b||(this.val=e=this.interpolate(e,a,this.pos),
m.frame?m.frame.call(this,c,this):this.isCustomFx||(void 0===e?(this.pos=1,e=a):e+=this.unit,this.val=e,"attr"===this.type?h.attr(i,g,e,1):h.css(i,g,e)))}},interpolate:function(b,c,h){if("number"===typeof b&&"number"===typeof c)return Math.round(1E5*(b+(c-b)*h))/1E5},cur:function(){var b=this.prop,c,e,g=this.anim.node;if(this.isCustomFx)return g[b]||0;if(!(c=this.type))c=this.type=(!g.style||null==g.style[b])&&null!=h.attr(g,b,void 0,1)?"attr":"css";b="attr"===c?h.attr(g,b,void 0,1):h.css(g,b);return isNaN(e=
parseFloat(b))?!b||"auto"===b?0:b:e}};g.Factories={};g.FxTypes={};g.getFx=function(b){var c=g,h,e;if(h=b.fxType)c=g.FxTypes[h];else if(!b.isCustomFx&&(e=g.Factories[b.prop]))c=e;return new c(b)};return g});
KISSY.add("anim/timer/short-hand",[],function(){return{background:[],border:["borderBottomWidth","borderLeftWidth","borderRightWidth","borderTopWidth"],borderBottom:["borderBottomWidth"],borderLeft:["borderLeftWidth"],borderTop:["borderTopWidth"],borderRight:["borderRightWidth"],font:["fontSize","fontWeight"],margin:["marginBottom","marginLeft","marginRight","marginTop"],padding:["paddingBottom","paddingLeft","paddingRight","paddingTop"]}});
KISSY.add("anim/timer/color",["./fx","./short-hand"],function(j,e){function g(b){var b=b+"",f;if(f=b.match(m))return[parseInt(f[1]),parseInt(f[2]),parseInt(f[3])];if(f=b.match(a))return[parseInt(f[1]),parseInt(f[2]),parseInt(f[3]),parseInt(f[4])];if(f=b.match(k)){for(b=1;b<f.length;b++)2>f[b].length&&(f[b]+=f[b]);return[parseInt(f[1],l),parseInt(f[2],l),parseInt(f[3],l)]}return o[b=b.toLowerCase()]?o[b]:[255,255,255]}function h(){h.superclass.constructor.apply(this,arguments)}var b=e("./fx"),c=e("./short-hand"),
l=16,i=Math.floor,o={black:[0,0,0],silver:[192,192,192],gray:[128,128,128],white:[255,255,255],maroon:[128,0,0],red:[255,0,0],purple:[128,0,128],fuchsia:[255,0,255],green:[0,128,0],lime:[0,255,0],olive:[128,128,0],yellow:[255,255,0],navy:[0,0,128],blue:[0,0,255],teal:[0,128,128],aqua:[0,255,255]},m=/^rgb\(([0-9]+)\s*,\s*([0-9]+)\s*,\s*([0-9]+)\)$/i,a=/^rgba\(([0-9]+)\s*,\s*([0-9]+)\s*,\s*([0-9]+),\s*([0-9]+)\)$/i,k=/^#?([0-9A-F]{1,2})([0-9A-F]{1,2})([0-9A-F]{1,2})$/i;c.background.push("backgroundColor");
c.borderColor=["borderBottomColor","borderLeftColor","borderRightColor","borderTopColor"];c.border.push("borderBottomColor","borderLeftColor","borderRightColor","borderTopColor");c.borderBottom.push("borderBottomColor");c.borderLeft.push("borderLeftColor");c.borderRight.push("borderRightColor");c.borderTop.push("borderTopColor");j.extend(h,b,{load:function(){h.superclass.load.apply(this,arguments);this.from&&(this.from=g(this.from));this.to&&(this.to=g(this.to))},interpolate:function(a,b,d){var k=
h.superclass.interpolate;if(3===a.length&&3===b.length)return"rgb("+[i(k(a[0],b[0],d)),i(k(a[1],b[1],d)),i(k(a[2],b[2],d))].join(", ")+")";if(4===a.length||4===b.length)return"rgba("+[i(k(a[0],b[0],d)),i(k(a[1],b[1],d)),i(k(a[2],b[2],d)),i(k(a[3]||1,b[3]||1,d))].join(", ")+")"}});j.each("backgroundColor,borderBottomColor,borderLeftColor,borderRightColor,borderTopColor,color,outlineColor".split(","),function(a){b.Factories[a]=h});return b.FxTypes.color=h});
KISSY.add("anim/timer/transform",["dom","./fx"],function(j,e){function g(a){a=a.split(/,/);return a=j.map(a,function(a){return b(a)})}function h(){return{translateX:0,translateY:0,rotate:0,skewX:0,skewY:0,scaleX:1,scaleY:1}}function b(a){return Math.round(1E5*parseFloat(a))/1E5}function c(a){for(var a=a.split(")"),k=j.trim,n=-1,f=a.length-1,d,e,c=h();++n<f;)switch(d=a[n].split("("),e=k(d[0]),d=d[1],e){case "translateX":case "translateY":case "scaleX":case "scaleY":c[e]=b(d);break;case "rotate":case "skewX":case "skewY":var i=
b(d);j.endsWith(d,"deg")||(i=180*i/Math.PI);c[e]=i;break;case "translate":case "translate3d":d=d.split(",");c.translateX=b(d[0]);c.translateY=b(d[1]||0);break;case "scale":d=d.split(",");c.scaleX=b(d[0]);c.scaleY=b(d[1]||d[0]);break;case "matrix":return a=d,a=g(a),f=n=k=void 0,e=a[0],c=a[1],d=a[2],i=a[3],e*i-c*d?(k=Math.sqrt(e*e+c*c),f=(e*d+c*i)/(e*i-d*c),n=(e*i-c*d)/k,e*i<c*d&&(f=-f,k=-k)):k=n=f=0,{translateX:b(a[4]),translateY:b(a[5]),rotate:b(180*Math.atan2(c,e)/Math.PI),skewX:b(180*Math.atan(f)/
Math.PI),skewY:0,scaleX:b(k),scaleY:b(n)}}return c}function l(){l.superclass.constructor.apply(this,arguments)}var i=e("dom"),o=e("./fx"),m=j.Features.isTransform3dSupported()?"translate3d({translateX}px,{translateY}px,0)":"translate({translateX}px,{translateY}px)";j.extend(l,o,{load:function(){l.superclass.load.apply(this,arguments);this.from=(this.from=i.style(this.anim.node,"transform")||this.from)&&"none"!==this.from?c(this.from):h();this.to=this.to?c(this.to):h()},interpolate:function(a,b,c){var f=
l.superclass.interpolate,d={};d.translateX=f(a.translateX,b.translateX,c);d.translateY=f(a.translateY,b.translateY,c);d.rotate=f(a.rotate,b.rotate,c);d.skewX=f(a.skewX,b.skewX,c);d.skewY=f(a.skewY,b.skewY,c);d.scaleX=f(a.scaleX,b.scaleX,c);d.scaleY=f(a.scaleY,b.scaleY,c);return j.substitute(m+" rotate({rotate}deg) skewX({skewX}deg) skewY({skewY}deg) scale({scaleX},{scaleY})",d)}});return o.Factories.transform=l});
KISSY.add("anim/timer","dom,./base,./timer/easing,./timer/manager,./timer/fx,./timer/short-hand,./timer/color,./timer/transform".split(","),function(j,e){function g(){var a;g.superclass.constructor.apply(this,arguments);j.each(a=this.to,function(b,c){var d=m(c);if(c!==d){a[d]=a[c];delete a[c]}})}var h=e("dom"),b=e("./base"),c=e("./timer/easing"),l=e("./timer/manager"),i=e("./timer/fx"),o=e("./timer/short-hand");e("./timer/color");e("./timer/transform");var m=h._camelCase,a=/^([+\-]=)?([\d+.\-]+)([a-z%]*)$/i;
j.extend(g,b,{prepareFx:function(){var b=this.node,e=this._propsData;j.each(e,function(a){a.duration=a.duration*1E3;a.delay=a.delay*1E3;if(typeof a.easing==="string")a.easing=c.toFn(a.easing)});j.each(o,function(a,c){var d,f=e[c],g;if(f){g=f.value;d={};j.each(a,function(a){d[a]=h.css(b,a)});h.css(b,c,g);j.each(d,function(a,c){c in e||(e[c]=j.merge(f,{value:h.css(b,c)}));h.css(b,c,a)});delete e[c]}});var f,d,g,l,m,p,r,u=0,q;j.isPlainObject(b)&&(u=1);for(f in e){d=e[f];g=d.value;p={isCustomFx:u,prop:f,
anim:this,fxType:d.fxType,type:d.type,propData:d};r=i.getFx(p);l=g;m=r.cur();g=g+"";q="";if(g=g.match(a)){l=parseFloat(g[2]);if((q=g[3])&&q!=="px"&&m){var s=0,t=l;do{++t;h.css(b,f,t+q);s=r.cur()}while(s===0);m=t/s*m;h.css(b,f,m+q)}g[1]&&(l=(g[1]==="-="?-1:1)*l+m)}p.from=m;p.to=l;p.unit=q;r.load(p);d.fx=r}},frame:function(){var a,b=1,c,d=this._propsData;for(a in d){c=d[a];c=c.fx;c.frame();if(this.isRejected()||this.isResolved())return;b=b&c.pos===1}d=j.now();a=this.config.duration*1E3;d=Math.max(0,
this.startTime+a-d);this.defer.notify([this,1-(d/a||0),d]);b&&this.stop(b)},doStop:function(a){var b,c=this._propsData;l.stop(this);if(a)for(b in c){a=c[b];(a=a.fx)&&a.frame(1)}},doStart:function(){l.start(this)}});g.Easing=c;g.Fx=i;return g});
/*
Copyright 2014, KISSY v1.49.10
MIT Licensed
build time: Dec 10 14:46
*/
KISSY.add("anim/transition",["dom","./base"],function(k,n,x,q){function r(a,c){return c.toUpperCase()}function o(a){-1!==a.indexOf("-")&&(a=a.replace(s,r));if(a in g)return g[a];if(!m||a in m)g[a]={propertyName:a,propertyNamePrefix:""};else{for(var c=a.charAt(0).toUpperCase()+a.slice(1),d,b=0;b<t;b++){var e=p[b];d=e+c;d in m&&(g[a]={propertyName:d,propertyNamePrefix:e})}g[a]=g[a]||null}return g[a]}function u(a){var c="";h.each(a,function(a,b){c&&(c+=",");c+=b+" "+a.duration+"s "+a.easing+" "+a.delay+
"s"});return c}function v(a){return a.replace(/[A-Z]/g,function(a){return"-"+a.toLowerCase()})}function i(a,c,d,b,e){if(!(this instanceof i))return new i(a,c,d,b,e);i.superclass.constructor.apply(this,arguments)}var s=/-([a-z])/ig,p=["Webkit","Moz","O","ms"],t=p.length,g={},m=document.documentElement.style,h=k,j=n("dom"),k=n("./base"),l=o("transition").propertyName,w={ease:1,linear:1,"ease-in":1,"ease-out":1,"ease-in-out":1};h.extend(i,k,{prepareFx:function(){var a=this._propsData,c={},d,b;for(b in a)d=
a[b],"string"===typeof d.easing?!h.startsWith(d.easing,"cubic-bezier")&&!w[d.easing]&&(d.easing="linear"):d.easing="linear",(d=o(b))&&(c[v(d.propertyName)]=a[b]);this._propsData=c},doStart:function(){var a=this,c=a.node,d=c.style,b=a._propsData,e=d[l],f=0,g={};h.each(b,function(a,b){var d=a.value;j.css(c,b,j.css(c,b));g[b]=d;f=Math.max(a.duration+a.delay,f)});-1!==e.indexOf("none")?e="":e&&(e+=",");d[l]=e+u(b);setTimeout(function(){j.css(c,g)},0);a._transitionEndTimer=setTimeout(function(){a.stop(!0)},
1E3*f)},beforeResume:function(){var a=this._propsData,c=h.merge(a),d=this._runTime/1E3;h.each(c,function(b,c){var f=d;b.delay>=f?b.delay-=f:(f-=b.delay,b.delay=0,b.duration>=f?b.duration-=f:delete a[c])})},doStop:function(a){var c=this.node,d=c.style,b=this._propsData,e=[],f={};this._transitionEndTimer&&(clearTimeout(this._transitionEndTimer),this._transitionEndTimer=null);h.each(b,function(b,d){a||(f[d]=j.css(c,d));e.push(d)});b=h.trim(d[l].replace(RegExp("(^|,)\\s*(?:"+e.join("|")+")\\s+[^,]+",
"gi"),"$1")).replace(/^,|,,|,$/g,"")||"none";d[l]=b;j.css(c,f)}});h.mix(i,k.Statics);q.exports=i});
