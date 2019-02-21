/*
YUI 3.10.0 (build a03ce0e)
Copyright 2013 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/

YUI.add("substitute",function(e,t){var n=e.Lang,r="dump",i=" ",s="{",o="}",u=/(~-(\d+)-~)/g,a=/\{LBRACE\}/g,f=/\{RBRACE\}/g,l=function(t,l,c,h){var p,d,v,m,g,y,b=[],w,E,S=t.length;for(;;){p=t.lastIndexOf(s,S);if(p<0)break;d=t.indexOf(o,p);if(p+1>=d)break;w=t.substring(p+1,d),m=w,y=null,v=m.indexOf(i),v>-1&&(y=m.substring(v+1),m=m.substring(0,v)),g=l[m],c&&(g=c(m,g,y)),n.isObject(g)?e.dump?n.isArray(g)?g=e.dump(g,parseInt(y,10)):(y=y||"",E=y.indexOf(r),E>-1&&(y=y.substring(4)),g.toString===Object.prototype.toString||E>-1?g=e.dump(g,parseInt(y,10)):g=g.toString()):g=g.toString():n.isUndefined(g)&&(g="~-"+b.length+"-~",b.push(w)),t=t.substring(0,p)+g+t.substring(d+1),h||(S=p-1)}return t.replace(u,function(e,t,n){return s+b[parseInt(n,10)]+o}).replace(a,s).replace(f,o)};e.substitute=l,n.substitute=l},"3.10.0",{requires:["yui-base"],optional:["dump"]});
/*
YUI 3.10.0 (build a03ce0e)
Copyright 2013 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/

YUI.add("cookie",function(e,t){function h(e){throw new TypeError(e)}function p(e){(!s(e)||e==="")&&h("Cookie name must be a non-empty string.")}function d(e){(!s(e)||e==="")&&h("Subcookie name must be a non-empty string.")}var n=e.Lang,r=e.Object,i=null,s=n.isString,o=n.isObject,u=n.isUndefined,a=n.isFunction,f=encodeURIComponent,l=decodeURIComponent,c=e.config.doc;e.Cookie={_createCookieString:function(e,t,n,r){r=r||{};var i=f(e)+"="+(n?f(t):t),u=r.expires,a=r.path,l=r.domain;return o(r)&&(u instanceof Date&&(i+="; expires="+u.toUTCString()),s(a)&&a!==""&&(i+="; path="+a),s(l)&&l!==""&&(i+="; domain="+l),r.secure===!0&&(i+="; secure")),i},_createCookieHashString:function(e){o(e)||h("Cookie._createCookieHashString(): Argument must be an object.");var t=[];return r.each(e,function(e,n){!a(e)&&!u(e)&&t.push(f(n)+"="+f(String(e)))}),t.join("&")},_parseCookieHash:function(e){var t=e.split("&"),n=i,r={};if(e.length)for(var s=0,o=t.length;s<o;s++)n=t[s].split("="),r[l(n[0])]=l(n[1]);return r},_parseCookieString:function(e,t,n){var r={};if(s(e)&&e.length>0){var o=t===!1?function(e){return e}:l,a=e.split(/;\s/g),f=i,c=i,h=i;for(var p=0,d=a.length;p<d;p++){h=a[p].match(/([^=]+)=/i);if(h instanceof Array)try{f=l(h[1]),c=o(a[p].substring(h[1].length+1))}catch(v){}else f=l(a[p]),c="";!u(n)&&n.reverseCookieLoading?u(r[f])&&(r[f]=c):r[f]=c}}return r},_setDoc:function(e){c=e},exists:function(e){p(e);var t=this._parseCookieString(c.cookie,!0);return t.hasOwnProperty(e)},get:function(e,t){p(e);var n,r,s;return a(t)?(s=t,t={}):o(t)?s=t.converter:t={},n=this._parseCookieString(c.cookie,!t.raw,t),r=n[e],u(r)?i:a(s)?s(r):r},getSub:function(e,t,n,r){var s=this.getSubs(e,r);return s!==i?(d(t),u(s[t])?i:a(n)?n(s[t]):s[t]):i},getSubs:function(e,t){p(e);var n=this._parseCookieString(c.cookie,!1,t);return s(n[e])?this._parseCookieHash(n[e]):i},remove:function(t,n){return p(t),n=e.merge(n||{},{expires:new Date(0)}),this.set(t,"",n)},removeSub:function(e,t,n){p(e),d(t),n=n||{};var r=this.getSubs(e);if(o(r)&&r.hasOwnProperty(t)){delete r[t];if(!n.removeIfEmpty)return this.setSubs(e,r,n);for(var i in r)if(r.hasOwnProperty(i)&&!a(r[i])&&!u(r[i]))return this.setSubs(e,r,n);return this.remove(e,n)}return""},set:function(e,t,n){p(e),u(t)&&h("Cookie.set(): Value cannot be undefined."),n=n||{};var r=this._createCookieString(e,t,!n.raw,n);return c.cookie=r,r},setSub:function(e,t,n,r){p(e),d(t),u(n)&&h("Cookie.setSub(): Subcookie value cannot be undefined.");var i=this.getSubs(e);return o(i)||(i={}),i[t]=n,this.setSubs(e,i,r)},setSubs:function(e,t,n){p(e),o(t)||h("Cookie.setSubs(): Cookie value must be an object.");var r=this._createCookieString(e,this._createCookieHashString(t),!1,n);return c.cookie=r,r}}},"3.10.0",{requires:["yui-base"]});
/*
YUI 3.10.0 (build a03ce0e)
Copyright 2013 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/

YUI.add("querystring-stringify",function(e,t){var n=e.namespace("QueryString"),r=[],i=e.Lang;n.escape=encodeURIComponent,n.stringify=function(e,t,s){var o,u,a,f,l,c,h=t&&t.sep?t.sep:"&",p=t&&t.eq?t.eq:"=",d=t&&t.arrayKey?t.arrayKey:!1;if(i.isNull(e)||i.isUndefined(e)||i.isFunction(e))return s?n.escape(s)+p:"";if(i.isBoolean(e)||Object.prototype.toString.call(e)==="[object Boolean]")e=+e;if(i.isNumber(e)||i.isString(e))return n.escape(s)+p+n.escape(e);if(i.isArray(e)){c=[],s=d?s+"[]":s,f=e.length;for(a=0;a<f;a++)c.push(n.stringify(e[a],t,s));return c.join(h)}for(a=r.length-1;a>=0;--a)if(r[a]===e)throw new Error("QueryString.stringify. Cyclical reference");r.push(e),c=[],o=s?s+"[":"",u=s?"]":"";for(a in e)e.hasOwnProperty(a)&&(l=o+a+u,c.push(n.stringify(e[a],t,l)));return r.pop(),c=c.join(h),!c&&s?s+"=":c}},"3.10.0",{requires:["yui-base"]});
/*
YUI 3.10.0 (build a03ce0e)
Copyright 2013 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/

YUI.add("intl-base",function(e,t){var n=/[, ]/;e.mix(e.namespace("Intl"),{lookupBestLang:function(t,r){function a(e){var t;for(t=0;t<r.length;t+=1)if(e.toLowerCase()===r[t].toLowerCase())return r[t]}var i,s,o,u;e.Lang.isString(t)&&(t=t.split(n));for(i=0;i<t.length;i+=1){s=t[i];if(!s||s==="*")continue;while(s.length>0){o=a(s);if(o)return o;u=s.lastIndexOf("-");if(!(u>=0))break;s=s.substring(0,u),u>=2&&s.charAt(u-2)==="-"&&(s=s.substring(0,u-2))}}return""}})},"3.10.0",{requires:["yui-base"]});
/*
YUI 3.10.0 (build a03ce0e)
Copyright 2013 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/

YUI.add("intl",function(e,t){var n={},r="yuiRootLang",i="yuiActiveLang",s=[];e.mix(e.namespace("Intl"),{_mod:function(e){return n[e]||(n[e]={}),n[e]},setLang:function(e,t){var n=this._mod(e),s=n[i],o=!!n[t];return o&&t!==s&&(n[i]=t,this.fire("intl:langChange",{module:e,prevVal:s,newVal:t===r?"":t})),o},getLang:function(e){var t=this._mod(e)[i];return t===r?"":t},add:function(e,t,n){t=t||r,this._mod(e)[t]=n,this.setLang(e,t)},get:function(t,n,r){var s=this._mod(t),o;return r=r||s[i],o=s[r]||{},n?o[n]:e.merge(o)},getAvailableLangs:function(t){var n=e.Env._loader,r=n&&n.moduleInfo[t],i=r&&r.lang;return i?i.concat():s}}),e.augment(e.Intl,e.EventTarget),e.Intl.publish("intl:langChange",{emitFacade:!0})},"3.10.0",{requires:["intl-base","event-custom"]});
YUI.add("srp-universal-header-uh3",function(a){a.Search.UniversalHeader={init:function(b){a.Get.script(b.js,{onSuccess:function(){a.once("ucs:helpMenuShow",function(){var e=new a.EventTarget();e.publish("ucs:helpMenuItems",{broadcast:2,emitFacade:true});var f=[],c=0;f[c]=[];for(var d=0;d<b.menu.length;d++){if(!b.menu[d].title){c++;f[c]=[]}else{f[c].push({menuText:b.menu[d].title,actionType:"link",url:b.menu[d].link,target:"_top"})}}e.fire("ucs:helpMenuItems",{menuGroups:f})})}})}}},"1.0.0",{requires:["node"]});(function(){function b(d){this.config=d||{};this.OPENED=d.defaultState||false;this.containerNode=document.getElementById(d.containerId);this.btnNode=document.getElementById(d.btnId);this.menuNode=document.getElementById(d.menuId);this.onShowBeacon=this.btnNode.getAttribute("data-beacon");this.mouseOverOnly=this.config.mouseOverOnly||false;this.bindEvents()}b.prototype.bindEvents=function(){var d=this;if(!this.mouseOverOnly){YUI.Env.add(this.btnNode,"click",function(f){d.toggleDropDown(f)});YUI.Env.add(this.containerNode,"mouseenter",function(){d.cancelTimer()});YUI.Env.add(this.containerNode,"mouseleave",function(){d.onMouseOut()})}else{YUI.Env.add(this.btnNode,"mouseenter",function(){d.cancelTimer();d.showDropDown()});YUI.Env.add(this.btnNode,"mouseleave",function(){d.onMouseOut()})}};b.prototype.toggleDropDown=function(d){d.preventDefault?d.preventDefault():d.returnValue=false;if(this.OPENED===false){this.showDropDown()}else{this.hideDropDown()}};b.prototype.showDropDown=function(){if(this.onShowBeacon){a(this.onShowBeacon)}c(this.menuNode,this.config.menuHideClass);this.btnNode.className+=" "+this.config.btnShowClass;this.OPENED=true};b.prototype.hideDropDown=function(){if(this.OPENED===true){this.cancelTimer();this.menuNode.className+=" "+this.config.menuHideClass;c(this.btnNode,this.config.btnShowClass);this.OPENED=false}};b.prototype.onMouseOut=function(){var d=this;this.hideTimer=setTimeout(function(){d.hideDropDown()},300)};b.prototype.cancelTimer=function(){if(this.hideTimer){window.clearTimeout(this.hideTimer);this.closeTimer=null}};function c(d,e){d.className=d.className.replace(new RegExp("(?:^|\\s+)"+e+"(?:\\s+|$)","g"),"")}function a(e){var d=new Image();d.onload=d.onerror=function(){d.onload=d.onerror=null;d=null};d.src=e+(e.indexOf("?")===-1?"?":"&")+(new Date()).getTime()}if(!window.YAHOO){window.YAHOO={}}if(!window.YAHOO.Util){window.YAHOO.Util={}}window.YAHOO.Util.DropDown=b}());YUI.add("event-to-load",function(e){var c=e.namespace("Search.EventTL"),a={timeout:1000,className:"etl"},d={},g=function(h){e.Search.ULT.beacon(h)},b=function(k,i,h,j){e.Get.js(i,{onSuccess:function(l){d[i]=true;k.simulate("click")},timeout:j,onTimeout:function(l){e.Get.abort(l);e.config.win.location.href=h}})},f=function(l){var m=l.currentTarget,j=m.getData(),h=m.getAttribute("href"),i=j.url,k=j.timeout||a.timeout;if(!d[i]){l.preventDefault();b(m,i,h,k)}else{g(h)}};e.mix(c,{init:function(h){var i=h.className||a.className;e.one("#doc").delegate("click",f,"."+i)}})},"1.0.0",{requires:["get","event","node","node-event-simulate"]});YUI.add("cosmos-compImageListGrid",function(c){var a;function b(d){b.superclass.constructor.apply(this,arguments)}b.NS="GridCosmosPlugin";b.NAME="compImageListGrid";c.extend(b,c.Plugin.Base,{initializer:function(){this.listNode=this.get("host");if(!this.listNode.one("li a")){return}this._events=[];this._bindUI()},destructor:function(){c.Array.each(this._events||[],function(d){d.detach()},this);this._events=[]},_onHover:function(g){var d=g.currentTarget;var f=d.one("span.ico");if(f){f.replaceClass("zzz-videoplay-small","zzz-videoplay-small-hover")}},_onHoverEnd:function(g){var d=g.currentTarget;var f=d.one("span.ico");if(f){f.replaceClass("zzz-videoplay-small-hover","zzz-videoplay-small")}},_bindUI:function(){this._events.push(c.delegate("hover",this._onHover,this._onHoverEnd,this.listNode,"li a",this))}});c.namespace("CosmosPlugin").compImageListGrid=b},"1.0.0",{requires:["plugin","node","event"]});YUI.add("cosmos-compJsToggle",function(d){var a=d.Search.SRP,e=[],j=function(q,p){var n=q.item(0),l,k,m,o;if(n){l=n.ancestor();k=l.get("offsetHeight");l.setStyle("overflow","hidden").setStyle("height",k);q.removeClass("hidden");m=l.get("scrollHeight");o=new d.Anim({node:l,to:{height:m},duration:p,easing:d.Easing.easeOut,on:{end:function(){l.setStyle("height","").setStyle("overflow","")}}});o.run()}},b=function(t,m,o,k){var l=t.item(o),q,s,n,r,p;if(l){q=l.ancestor();s=l.getY()-q.getY();if(k.collapseToStart){p={scrollTop:k.host.get("offsetTop")+"px"}}else{p={height:s}}r=(k.collapseToStart)?(d.UA.ie?document.documentElement:(d.UA.gecko?"html":"body")):q;n=new d.Anim({node:r,to:p,duration:m,easing:d.Easing.easeOut,on:{start:function(){q.setStyle("overflow","hidden")},end:function(){if(o){t.each(function(v,u){if(u>=o){v.addClass("hidden")}})}else{t.addClass("hidden")}q.setStyle("height","").setStyle("overflow","")}}});n.run()}},i=function(l,k){l.expand=false;if(l.duration){b(k,l.duration,l.offset,l)}else{if(l.offset>0){k.each(function(o,m){if(m>=l.offset){o.addClass("hidden")}})}else{k.addClass("hidden")}}},c=function(m,l,n){if(l&&l.size()==1){var k=m.enableRepositionX?parseInt(m.enableRepositionX):0;var o=m.enableRepositionY?parseInt(m.enableRepositionY):0;n.some(function(p){if(!p.hasClass("hidden")){l.item(0).setStyle("position","absolute").setXY([p.getX()+k,p.getY()+o]);return}})}},f=function(k,l,m){k.removeClass(m);k.addClass(l)},h=function(k){var m=k.host;var l=m.all(k.trigger);if(l){l.on("mouseenter",function(n){f(m.all(k.triggerIconSelector),k.triggerIconAddCssClass,k.triggerIconRemoveCssClass)});l.on("mouseleave",function(n){l.each(function(p,o){if(!p.hasClass(k.cssClassforTriggered)){f(m.all(k.triggerIconSelector),k.triggerIconRemoveCssClass,k.triggerIconAddCssClass)}})})}};function g(){g.superclass.constructor.apply(this,arguments)}g.NS="CosmosPlugin";g.NAME="compJsToggle";g.ATTRS={it:{value:""},trigger:{value:""},target:{value:""},expand:{value:false},action:{value:"click"},offset:{getter:function(k){if(k){return +k}return 0}},duration:{getter:function(k){if(k){return +k}return 0}},toggleType:{value:"toggle"},toggleHidden:{value:""},targetImgLazy:{value:false},targetImgNode:{value:""},targetToCollapse:{value:""},collapseOnOutsideClick:{value:false},collapseOnMouseLeave:{value:false},collapseSimilarTargets:{value:false},enableReposition:{value:false},enableRepositionX:{value:""},enableRepositionY:{value:""},collapseToStart:{value:""},cssClassforTriggered:{value:""},triggerIconSelector:{value:""},triggerIconAddCssClass:{value:""},triggerIconRemoveCssClass:{value:""},enableTriggerIconHover:{value:""},enableExpandEventFire:{value:""},hideCurrentTriggerNodeOnly:{value:true},addClassForTarget:{value:false},targetAddCssClass:{value:""},targetRemoveCssClass:{value:""}};d.extend(g,d.Plugin.Base,{initializer:function(k){var m=k.host,l=this.get("trigger"),p=this.get("target"),n=this.get("action"),o=this.get("toggleType"),r=m.all(l),q=m.all(p),s=m.get("id");if(r.size()&&q.size()){k.it=this.get("it")||"";k.duration=this.get("duration");k.offset=this.get("offset");k.expand=this.get("expand");k.toggleHidden=this.get("toggleHidden");k.targetImgLazy=this.get("targetImgLazy");k.targetImgNode=this.get("targetImgNode");k.targetToCollapse=this.get("targetToCollapse");k.enableReposition=this.get("enableReposition");k.enableRepositionX=this.get("enableRepositionX");k.enableRepositionY=this.get("enableRepositionY");k.collapseOnOutsideClick=this.get("collapseOnOutsideClick");k.collapseOnMouseLeave=this.get("collapseOnMouseLeave");k.collapseSimilarTargets=this.get("collapseSimilarTargets");k.collapseToStart=!!this.get("collapseToStart");k.cssClassforTriggered=this.get("cssClassforTriggered");k.triggerIconSelector=this.get("triggerIconSelector");k.triggerIconAddCssClass=this.get("triggerIconAddCssClass");k.triggerIconRemoveCssClass=this.get("triggerIconRemoveCssClass");k.enableTriggerIconHover=this.get("enableTriggerIconHover");k.enableExpandEventFire=this.get("enableExpandEventFire");k.hideCurrentTriggerNodeOnly=this.get("hideCurrentTriggerNodeOnly");k.addClassForTarget=this.get("addClassForTarget");k.targetAddCssClass=this.get("targetAddCssClass");k.targetRemoveCssClass=this.get("targetRemoveCssClass");e[s]=k;if(k.showTrigger){r.item(0).ancestor().removeClass("hidden")}if(k.enableTriggerIconHover==="true"){h(k)}if(k.disableRtClk){m.delegate("contextmenu",this._disableRtClk,l)}if(o==="expand"){m.delegate(n,this._expand,l);if(k.collapseOnOutsideClick==="true"){q.on("clickoutside",function(t){if(k.expand===true){r.each(function(v,u){if(!v.hasClass("hidden")){v.simulate("click")}})}})}if(k.collapseOnMouseLeave==="true"){m.on("mouseleave",function(t){if(k.expand===true){r.each(function(v,u){if(!v.hasClass("hidden")){v.simulate("click")}})}})}if(k.enableReposition==="true"){d.on("windowresize",function(t){c(k,q,r)})}}else{m.delegate(n,this._toggle,l);if(k.dfltState){m.delegate("mouseleave",this._default,l)}}}},_disableRtClk:function(k){k.halt()},_toggle:function(r){var l,k,p,n,q,o,m;r.halt();if(r.currentTarget.hasClass("selected")){return}p=r.container.get("id");n=e[p];if(n){o=n.host.all(n.trigger);m=n.host.all(n.target);o.removeClass("selected");r.currentTarget.addClass("selected");k=o.indexOf(r.currentTarget);q=m.item(k+parseInt(n.offset,0));if(q){m.removeClass("selected");q.addClass("selected");if(n.toggleHidden=="true"){m.addClass("hidden");q.removeClass("hidden")}}}l=r.currentTarget.getAttribute("data-beacon");if(l){if(d.Search&&d.Search.ULT&&d.Search.ULT.beacon_url){d.Search.ULT.beacon_url(l)}}},_default:function(p){var n,o,l,m,k;n=p.container.get("id");l=e[n];if(l){m=l.host.all(l.trigger);k=l.host.all(l.target);m.removeClass("selected");k.removeClass("selected");o=k.item(l.offset-1);if(o){o.addClass("selected")}}},_expand:function(n){var k,s,l,q,o,r,m;n.halt();s=n.container.get("id");l=e[s];if(l){q=l.host.all(l.trigger);o=l.host.all(l.target);r=l.host.all(l.targetToCollapse);if(l.collapseSimilarTargets){var p=d.all(l.trigger);p.each(function(u,t){if(u.hasClass(l.cssClassforTriggered)&&u!==q.item(0)){u.simulate("click")}})}m=l.host.all(l.triggerIconSelector);if(l.expand===false){l.expand=true;if(l.targetImgLazy&&l.host.all(l.targetImgNode)){l.host.all(l.targetImgNode).each(function(t){if(t.getAttribute("data-js-src")){t.setAttribute("src",t.getAttribute("data-js-src"));t.removeClass("hidden");t.removeAttribute("data-js-src")}})}if(l.duration){j(o,l.duration)}else{o.removeClass("hidden");if(l.targetCompJsScroll){if(l.host.one(l.targetCompJsScroll).compJsScroll){setTimeout(function(){l.host.one(l.targetCompJsScroll).compJsScroll._resetContainerAndArrows()},100)}}if(r){r.addClass("hidden")}if(l.enableReposition==="true"){c(l,o,q)}if(l.cssClassforTriggered){q.addClass(l.cssClassforTriggered)}if(m){f(m,l.triggerIconAddCssClass,l.triggerIconRemoveCssClass)}if(l.addClassForTarget){f(o,l.targetAddCssClass,l.targetRemoveCssClass)}}if(l.enableExpandEventFire==="true"){d.Global.fire("compJsToggle:expand_"+l.it)}}else{i(l,o);if(r){r.removeClass("hidden")}if(l.cssClassforTriggered){q.removeClass(l.cssClassforTriggered)}if(m){f(m,l.triggerIconRemoveCssClass,l.triggerIconAddCssClass)}}if(q.size()>1){if(l.hideCurrentTriggerNodeOnly===true){q.removeClass("hidden");n.currentTarget.addClass("hidden")}else{q.addClass("hidden")}}k=n.currentTarget.getAttribute("data-beacon");if(k){if(d.Search&&d.Search.ULT&&d.Search.ULT.beacon_url){d.Search.ULT.beacon_url(k)}}}}});d.namespace("CosmosPlugin").compJsToggle=g},"0.0.1",{requires:["plugin","event-custom","event-mouseenter","anim","srp-lazy"]});YUI.add("drop-down",function(a){a.namespace("Search").DropDown={init:function(b){if(!b.triggerClass){return}this.config=b;this.trigSelector="."+b.triggerClass;this.trigGroupSelector="#"+b.triggerGroup;this.listSelector="."+b.listClass;this.moduleSelector="."+b.moduleClass;this.yOffset=b.yOffset?parseInt(b.yOffset):0;this.gridLeftGutter=b.gridLeftGutter?parseInt(b.gridLeftGutter):124;this.selectedClass=b.selectedClass?b.selectedClass:"OptSelected";this.hideClass=b.hideClass?b.hideClass:"d-n";this.posAbs=b.posAbsClass?b.posAbsClass:"p-a";this.posRelClass=b.posRelClass?b.posRelClass:"p-r";a.delegate("click",this.handleClickEvent,this.trigGroupSelector,this.moduleSelector+" "+this.trigSelector,this);a.one("body").on("click",this.handleClickOutside,this)},handleClickEvent:function(i){var h=i.target,c=a.one("."+this.selectedClass),g=null,d=h.ancestor(this.moduleSelector),j,f=false,e,b;if(c){f=d.contains(c);this.hide(c);if(f){return}}g=d.one(this.listSelector);g.addClass(this.posAbs);if(g.hasClass(this.hideClass)){this.show(g)}d.addClass(this.posRelClass);b=h.getXY();e=parseInt(b[0])-this.yOffset;j=parseInt(a.one(this.trigGroupSelector).getStyle("marginLeft"));if(j==0){e+=this.gridLeftGutter}g.setStyle("left",e)},handleClickOutside:function(c){var b,d=c.target;if(!d.hasClass(this.config.triggerClass)&&!d.hasClass(this.config.listClass)){b=a.one(this.listSelector+"."+this.selectedClass);if(b){this.hide(b)}}},show:function(b){b.removeClass(this.hideClass);b.addClass(this.selectedClass)},hide:function(b){b.addClass(this.hideClass);b.removeClass(this.selectedClass)}}},"1.0.0",{requires:["node","event"]});YUI.add("ymb",function(b){b.namespace("Search.YMB");var a=function(d){var c=new Image();c.onload=c.onerror=function(){c.onload=c.onerror=null;c=null};c.src=d+(d.indexOf("?")===-1?"?":"&")+(new Date()).getTime()};b.Search.YMB={init:function(c){if(c&&c.bcurl&&c.bcurl!=""){a(c.bcurl)}}}},"1.0.0");