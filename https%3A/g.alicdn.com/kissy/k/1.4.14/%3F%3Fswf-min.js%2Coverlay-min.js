/*
Copyright 2014, KISSY v1.49.10
MIT Licensed
build time: Dec 10 15:06
*/
KISSY.add("swf/ua",[],function(h){function j(d){var g="string"===typeof d?d.match(/\d+/g).splice(0,3):d;h.isArray(g)&&(d=parseFloat(g[0]+"."+o(g[1],3)+o(g[2],5)));return d||0}function o(d,g){var d=(d||0)+"",h=g+1-d.length;return Array(0<h?h:0).join("0")+d}function k(h){if(h||i){i=!1;var g;if(navigator.plugins&&navigator.mimeTypes.length)g=(navigator.plugins["Shockwave Flash"]||0).description;else try{g=(new d.ActiveXObject("ShockwaveFlash.ShockwaveFlash")).GetVariable("$version")}catch(k){}p=!g?void 0:
g.match(/\d+/g).splice(0,3)}return p}var p,i=!0,d=h.Env.host;return{fpv:k,fpvGTE:function(d,h){return j(k(h))>=j(d)}}});
KISSY.add("swf",["dom","json","attribute","swf/ua"],function(h,j){function o(a){var c=e;h.each(a,function(a,b){b=b.toLowerCase();b in y?c+=i(b,a):b===z&&(c+=i(b,p(a)))});return c}function k(a,c,d,b){var f=e,g=e;h.each(c,function(a,b){f+=" "+b+'="'+a+'"'});b?(f+=' classid="'+A+'"',g+=i("movie",a)):(f+=' data="'+a+'"',f+=' type="'+B+'"');g+=o(d);return q+r+f+s+g}function p(a){var c=[];h.each(a,function(a,b){"string"!==typeof a&&(a=x.stringify(a));a&&c.push(b+"="+C(a))});return c.join("&")}function i(a,
c){return'<param name="'+a+'" value="'+c+'"></param>'}var d=j("dom"),x=j("json"),g=j("attribute"),u=j("swf/ua"),m=!!h.Env.host.ActiveXObject,B="application/x-shockwave-flash",A="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000",z="flashvars",e="",q="<",s=">",D=h.Env.host.document,v=u.fpv,E=u.fpvGEQ,w=u.fpvGTE,r="object",C=encodeURIComponent,y={wmode:e,allowscriptaccess:e,allownetworking:e,allowfullscreen:e,play:"false",loop:e,menu:e,quality:e,scale:e,salign:e,bgcolor:e,devicefont:e,hasPriority:e,base:e,
swliveconnect:e,seamlesstabbing:e},t;return t=g.extend({constructor:function(a){this.callSuper(a);var c=this.get("expressInstall"),l,b,a=this.get("htmlMode");b=this.get("params");var f=this.get("attrs"),g=this.get("document"),e=d.create("<span>",void 0,g),j=this.get("elBefore"),i=this.get("src"),n=this.get("version");l=f.id=f.id||h.guid("ks-swf-");if(v()){if(n&&!w(n)&&(this.set("status",t.Status.TOO_LOW),c)){i=c;if(!("width"in f)||!/%$/.test(f.width)&&310>parseInt(f.width,10))f.width="310";if(!("height"in
f)||!/%$/.test(f.height)&&137>parseInt(f.height,10))f.height="137";c=b.flashVars=b.flashVars||{};h.mix(c,{MMredirectURL:location.href,MMplayerType:m?"ActiveX":"PlugIn",MMdoctitle:g.title.slice(0,47)+" - Flash Player Installation"})}"full"===a?(m?(c=k(i,f,b,1),delete f.id,delete f.style,n=k(i,f,b,0)):(n=k(i,f,b,0),delete f.id,delete f.style,c=k(i,f,b,1)),b=c+n+q+"/"+r+s+q+"/"+r+s):b=k(i,f,b,m)+q+"/"+r+s;this.set("html",b);j?d.insertBefore(e,j):d.append(e,this.get("render"));"outerHTML"in e?e.outerHTML=
b:e.parentNode.replaceChild(d.create(b),e);l=d.get("#"+l,g);"full"===a?m?this.set("swfObject",l):this.set("swfObject",l.parentNode):this.set("swfObject",l);this.set("el",l);this.get("status")||this.set("status",t.Status.SUCCESS)}else this.set("status",t.Status.NOT_INSTALLED)},callSWF:function(a,c){var d=this.get("el"),b,c=c||[];try{d[a]&&(b=d[a].apply(d,c))}catch(f){b="",0!==c.length&&(b='"'+c.join('", "')+'"'),b=(new Function("swf","return swf."+a+"("+b+");"))(d)}return b},destroy:function(){var a=
this.get("swfObject");m?(a.style.display="none",function l(){if(4===a.readyState){for(var b in a)"function"===typeof a[b]&&(a[b]=null);a.parentNode.removeChild(a)}else setTimeout(l,10)}()):a.parentNode.removeChild(a)}},{ATTRS:{expressInstall:{value:h.config("base")+"swf/assets/expressInstall.swf"},src:{},version:{value:"9"},params:{value:{}},attrs:{value:{}},render:{setter:function(a){"string"===typeof a&&(a=d.get(a,this.get("document")));return a},valueFn:function(){return document.body}},elBefore:{setter:function(a){"string"===
typeof a&&(a=d.get(a,this.get("document")));return a}},document:{value:D},status:{},el:{},swfObject:{},html:{},htmlMode:{value:"default"}},getSrc:function(a){var c=a=d.get(a),e="",b,a=[],e=d.nodeName(c);if("object"===e){(e=d.attr(c,"data"))&&a.push(c);c=c.childNodes;for(e=0;e<c.length;e++)b=c[e],1===b.nodeType&&("movie"===(d.attr(b,"name")||"").toLowerCase()?a.push(b):"embed"===d.nodeName(b)?a.push(b):"object"===d.nodeName(c[e])&&a.push(b))}else"embed"===e&&a.push(c);c=(a=a[0])&&d.nodeName(a);return"embed"===
c?d.attr(a,"src"):"object"===c?d.attr(a,"data"):"param"===c?d.attr(a,"value"):null},Status:{TOO_LOW:"flash version is too low",NOT_INSTALLED:"flash is not installed",SUCCESS:"success"},HtmlMode:{DEFAULT:"default",FULL:"full"},fpv:v,fpvGEQ:E,fpvGTE:w})});
/*
Copyright 2014, KISSY v1.49.10
MIT Licensed
build time: Dec 10 15:04
*/
KISSY.add("overlay/extension/loading",["node"],function(h,e){function c(){}var g=e("node");c.prototype={loading:function(){this._loadingExtEl||(this._loadingExtEl=(new g('<div class="'+this.get("prefixCls")+'ext-loading" style="position: absolute;border: none;width: 100%;top: 0;left: 0;z-index: 99999;height:100%;*height: expression(this.parentNode.offsetHeight);"/>')).appendTo(this.$el));this._loadingExtEl.show()},unloading:function(){var b=this._loadingExtEl;b&&b.hide()}};return c});
KISSY.add("overlay/extension/mask",["node"],function(h,e){function c(a,b){var i=a.view.getBaseCssClasses("mask"),i=m('<div  style="width:'+(f?"expression(KISSY.DOM.docWidth())":"100%")+";left:0;top:0;height:"+(f?"expression(KISSY.DOM.docHeight())":"100%")+";position:"+(f?"absolute":"fixed")+';" class="'+i+" "+b+'">'+(f?'<iframe style="position:absolute;left:0;top:0;background:red;width: expression(this.parentNode.offsetWidth);height: expression(this.parentNode.offsetHeight);filter:alpha(opacity=0);z-index:-1;"></iframe>':
"")+"</div>").prependTo("body");i.unselectable();i.on("mousedown",function(a){a.preventDefault()});return i}function g(){}function b(a,i){var b=a.get("maskNode"),d=a.view.getBaseCssClasses("mask-hidden");i?b.removeClass(d):b.addClass(d)}function a(a,i,d,c){var f=a.effect||k;b(c,d);if(f!==k){var c=a.duration,a=a.easing,e=d?1:0;i.stop(1,1);i.css("display",d?k:"block");i[f+l[f][e]](c,function(){i.css("display","")},a)}}function i(i){var b=this.get("maskNode");if(i=i.newVal){var d=Number(this.$el.css("z-index"));
isNaN(d)||b.css("z-index",d)}a(this.get("mask"),b,i,this)}var d=h.UA,p=e("node"),f=6===d.ie,m=p.all;g.ATTRS={mask:{value:!1},maskNode:{}};var k="none",l={fade:["Out","In"],slide:["Up","Down"]};g.prototype={__renderUI:function(){this.get("mask")&&this.set("maskNode",c(this,this.get("visible")?"":this.view.getBaseCssClasses("mask-hidden")))},__bindUI:function(){var a,b;if(b=this.get("mask")){a=this.get("maskNode");if(b.closeOnClick)a.on(p.Gesture.tap,this.close,this);this.on("afterVisibleChange",i)}},
__destructor:function(){var a;(a=this.get("maskNode"))&&a.remove()}};return g});
KISSY.add("overlay/close-xtpl",[],function(){return function(h){var e,c=this;e=this.config.utils;var g=e.runBlockCommand,b=e.renderOutput,a=e.getProperty,i=e.runInlineCommand,d=e.getPropertyOrRunCommand;e="";var p={},f=[],a=a(c,h,"closable",0,1);f.push(a);p.params=f;p.fn=function(a){var f;f='\n<a href="javascript:void(\'close\')"\n   id="ks-overlay-close-';var e=d(c,a,{},"id",0,3);f+=b(e,!0);f+='"\n   class="';var e={},g=[];g.push("close");e.params=g;e=i(c,a,e,"getBaseCssClasses",4);f+=b(e,!0);f+=
"\"\n   role='button'>\n    <span class=\"";e={};g=[];g.push("close-x");e.params=g;a=i(c,a,e,"getBaseCssClasses",6);f+=b(a,!0);return f+'">close</span>\n</a>\n'};e+=g(c,h,p,"if",1);return e+"\n"}});
KISSY.add("overlay/overlay-xtpl",["overlay/close-xtpl","component/extension/content-xtpl"],function(h,e,c,g){return function(b){var a,i;a=this.config.utils;"undefined"!==typeof g&&g.kissy&&(i=g);var d=a.renderOutput,c=a.runInlineCommand;a="";var f={},m=[];m.push("overlay/close-xtpl");f.params=m;i&&(e("overlay/close-xtpl"),f.params[0]=i.resolveByName(f.params[0]));f=c(this,b,f,"include",1);a+=d(f,!1);a+="\n";f={};m=[];m.push("component/extension/content-xtpl");f.params=m;i&&(e("component/extension/content-xtpl"),
f.params[0]=i.resolveByName(f.params[0]));b=c(this,b,f,"include",2);return a+=d(b,!1)}});
KISSY.add("overlay/overlay-render",["component/container","./overlay-xtpl","component/extension/content-render"],function(h,e){var c=e("component/container"),g=e("./overlay-xtpl"),b=e("component/extension/content-render");return c.getDefaultRender().extend([b],{createDom:function(){this.fillChildrenElsBySelectors({closeBtn:"#ks-overlay-close-{id}"})}},{ATTRS:{contentTpl:{value:g}},HTML_PARSER:{closeBtn:function(a){return a.one("."+this.getBaseCssClass("close"))}}})});
KISSY.add("overlay/extension/overlay-effect",[],function(h){function e(a){var b=a.$el.clone(!0);b.css({visibility:"visible",overflow:"hidden"}).addClass(a.get("prefixCls")+"overlay-ghost");return a.__afterCreateEffectGhost(b)}function c(a,b){a.__effectGhost&&a.__effectGhost.stop(1,1);var c=a.$el,f=h.all,g=a.get("effect"),k=f(g.target),f=g.duration,l={width:k.width(),height:k.height()},j=k.offset(),o={width:c.width(),height:c.height()},r=c.offset(),q,n=e(a),s=g.easing;n.insertAfter(c);b?(k=l,q=j,l=
o,j=r):(k=o,q=r);n.offset(j);h.mix(l,{left:n.css("left"),top:n.css("top")});c.css("visibility","hidden");n.css(k);n.offset(q);a.__effectGhost=n;n.css("visibility","visible");n.animate(l,{Anim:g.Anim,duration:f,easing:s,complete:function(){a.__effectGhost=null;n.remove();c.css("visibility","")}})}function g(b,d,e){var f=b.$el,g=b.get("effect"),k=g.effect||"none",l=g.target;"none"===k&&!l?e():l?c(b,d,e):(b=g.duration,g=g.easing,l=d?1:0,f.stop(1,1),f.css({visibility:"visible",display:d?"none":"block"}),
f[k+a[k][l]](b,function(){f.css({display:"block",visibility:""});e()},g))}function b(){}var a={fade:["Out","In"],slide:["Up","Down"]};b.ATTRS={effect:{value:{effect:"",target:null,duration:0.5,easing:"easeOut"},setter:function(b){var d=b.effect;"string"===typeof d&&!a[d]&&(b.effect="")}}};b.prototype={__afterCreateEffectGhost:function(a){return a},_onSetVisible:function(a){var b=this;g(b,a,function(){b.fire(a?"show":"hide")})}};return b});
KISSY.add("overlay/control","component/container,component/extension/shim,component/extension/align,./extension/loading,./extension/mask,./overlay-render,./extension/overlay-effect".split(","),function(h,e){var c=e("component/container"),g=e("component/extension/shim"),b=e("component/extension/align"),a=e("./extension/loading"),i=e("./extension/mask"),d=e("./overlay-render"),p=e("./extension/overlay-effect"),f={hide:"hide",destroy:"destroy"};return c.extend([g,a,b,i,p],{bindUI:function(){var a=this,
b=a.get("closeBtn");if(b)b.on("click",function(b){a.close();b.preventDefault()})},close:function(){this[f[this.get("closeAction")]||"hide"]();return this}},{ATTRS:{contentEl:{},closable:{value:false,view:1},closeBtn:{view:1},closeAction:{value:"hide"},focusable:{value:false},allowTextSelection:{value:true},handleMouseEvents:{value:false},visible:{value:false},xrender:{value:d}},xclass:"overlay"})});
KISSY.add("overlay/dialog-xtpl",["overlay/close-xtpl"],function(h,e,c,g){return function(b){var a,c=this,d;a=this.config.utils;"undefined"!==typeof g&&g.kissy&&(d=g);var h=a.runBlockCommand,f=a.renderOutput,m=a.getProperty,k=a.runInlineCommand,l=a.getPropertyOrRunCommand;a="";var j={},o=[];o.push("overlay/close-xtpl");j.params=o;d&&(e("overlay/close-xtpl"),j.params[0]=d.resolveByName(j.params[0]));d=k(c,b,j,"include",1);a+=f(d,!1);a+='\n<div id="ks-content-';d=l(c,b,{},"id",0,2);a+=f(d,!0);a+='"\n     class="';
d={};j=[];j.push("content");d.params=j;d=k(c,b,d,"getBaseCssClasses",3);a+=f(d,!0);a+='">\n    <div class="';d={};j=[];j.push("header");d.params=j;d=k(c,b,d,"getBaseCssClasses",4);a+=f(d,!0);a+='"\n         style="\n';d={};j=[];o=m(c,b,"headerStyle",0,6);j.push(o);d.params=j;d.fn=function(a){var b;b=" \n ";var d=l(c,a,{},"xindex",0,7);b=b+f(d,true);b=b+":";a=l(c,a,{},".",0,7);b=b+f(a,true);return b+";\n"};a+=h(c,b,d,"each",6);a+='\n"\n         id="ks-stdmod-header-';d=l(c,b,{},"id",0,10);a+=f(d,!0);
a+='">';d=l(c,b,{},"headerContent",0,10);a+=f(d,!1);a+='</div>\n\n    <div class="';d={};j=[];j.push("body");d.params=j;d=k(c,b,d,"getBaseCssClasses",12);a+=f(d,!0);a+='"\n         style="\n';d={};j=[];o=m(c,b,"bodyStyle",0,14);j.push(o);d.params=j;d.fn=function(a){var b;b=" \n ";var d=l(c,a,{},"xindex",0,15);b=b+f(d,true);b=b+":";a=l(c,a,{},".",0,15);b=b+f(a,true);return b+";\n"};a+=h(c,b,d,"each",14);a+='\n"\n         id="ks-stdmod-body-';d=l(c,b,{},"id",0,18);a+=f(d,!0);a+='">';d=l(c,b,{},"bodyContent",
0,18);a+=f(d,!1);a+='</div>\n\n    <div class="';d={};j=[];j.push("footer");d.params=j;k=k(c,b,d,"getBaseCssClasses",20);a+=f(k,!0);a+='"\n         style="\n';k={};d=[];m=m(c,b,"footerStyle",0,22);d.push(m);k.params=d;k.fn=function(a){var b;b=" \n ";var d=l(c,a,{},"xindex",0,23);b=b+f(d,true);b=b+":";a=l(c,a,{},".",0,23);b=b+f(a,true);return b+";\n"};a+=h(c,b,k,"each",22);a+='\n"\n         id="ks-stdmod-footer-';h=l(c,b,{},"id",0,26);a+=f(h,!0);a+='">';b=l(c,b,{},"footerContent",0,26);a+=f(b,!1);
return a+'</div>\n</div>\n<div tabindex="0"></div>'}});
KISSY.add("overlay/dialog-render",["./overlay-render","./dialog-xtpl"],function(h,e){var c=e("./overlay-render"),g=e("./dialog-xtpl");return c.extend({beforeCreateDom:function(b){h.mix(b.elAttrs,{role:"dialog","aria-labelledby":"ks-stdmod-header-"+this.control.get("id")})},createDom:function(){this.fillChildrenElsBySelectors({header:"#ks-stdmod-header-{id}",body:"#ks-stdmod-body-{id}",footer:"#ks-stdmod-footer-{id}"})},getChildrenContainerEl:function(){return this.control.get("body")},_onSetBodyStyle:function(b){this.control.get("body").css(b)},
_onSetHeaderStyle:function(b){this.control.get("header").css(b)},_onSetFooterStyle:function(b){this.control.get("footer").css(b)},_onSetBodyContent:function(b){var a;a=this.control.get("body");a.html(b)},_onSetHeaderContent:function(b){var a;a=this.control.get("header");a.html(b)},_onSetFooterContent:function(b){var a;a=this.control.get("footer");a.html(b)}},{ATTRS:{contentTpl:{value:g}},HTML_PARSER:{header:function(b){return b.one("."+this.getBaseCssClass("header"))},body:function(b){return b.one("."+
this.getBaseCssClass("body"))},footer:function(b){return b.one("."+this.getBaseCssClass("footer"))},headerContent:function(b){return b.one("."+this.getBaseCssClass("header")).html()},bodyContent:function(b){return b.one("."+this.getBaseCssClass("body")).html()},footerContent:function(b){return(b=b.one("."+this.getBaseCssClass("footer")))&&b.html()}}})});
KISSY.add("overlay/dialog",["./control","./dialog-render","node"],function(h,e){var c=e("./control"),g=e("./dialog-render"),b=e("node"),c=c.extend({__afterCreateEffectGhost:function(a){var b=this.get("body");a.all("."+this.get("prefixCls")+"stdmod-body").css({height:b.height(),width:b.width()}).html("");return a},handleKeyDownInternal:function(c){if(this.get("escapeToClose")&&c.keyCode===b.KeyCode.ESC){if("select"!==c.target.nodeName.toLowerCase()||c.target.disabled)this.close(),c.halt()}else a:if(c.keyCode===
a){var d=this.$el,e=b.all(c.target),f=d.last();if(e.equals(d)&&c.shiftKey)f[0].focus(),c.halt();else if(e.equals(f)&&!c.shiftKey)this.focus(),c.halt();else if(e.equals(d)||d.contains(e))break a;c.halt()}},_onSetVisible:function(a,b){var c=this.el;if(a)this.__lastActive=c.ownerDocument.activeElement,this.focus(),c.setAttribute("aria-hidden","false");else{c.setAttribute("aria-hidden","true");try{this.__lastActive&&this.__lastActive.focus()}catch(f){}}this.callSuper(a,b)}},{ATTRS:{header:{view:1},body:{view:1},
footer:{view:1},bodyStyle:{value:{},view:1},footerStyle:{value:{},view:1},headerStyle:{value:{},view:1},headerContent:{value:"",view:1},bodyContent:{value:"",view:1},footerContent:{value:"",view:1},closable:{value:!0},xrender:{value:g},focusable:{value:!0},escapeToClose:{value:!0}},xclass:"dialog"}),a=b.KeyCode.TAB;return c});
KISSY.add("overlay/popup",["./control"],function(h,e){return e("./control").extend({initializer:function(){var c=this;c.get("trigger")&&("mouse"===c.get("triggerType")?(c._bindTriggerMouse(),c.on("afterRenderUI",function(){c._bindContainerMouse()})):c._bindTriggerClick())},_bindTriggerMouse:function(){var c=this,e=c.get("trigger"),b;c.__mouseEnterPopup=function(a){c._clearHiddenTimer();b=h.later(function(){c._showing(a);b=void 0},1E3*c.get("mouseDelay"))};e.on("mouseenter",c.__mouseEnterPopup);c._mouseLeavePopup=
function(){b&&(b.cancel(),b=void 0);c._setHiddenTimer()};e.on("mouseleave",c._mouseLeavePopup)},_bindContainerMouse:function(){this.$el.on("mouseleave",this._setHiddenTimer,this).on("mouseenter",this._clearHiddenTimer,this)},_setHiddenTimer:function(){var c=this;c._hiddenTimer=h.later(function(){c._hiding()},1E3*c.get("mouseDelay"))},_clearHiddenTimer:function(){this._hiddenTimer&&(this._hiddenTimer.cancel(),this._hiddenTimer=void 0)},_bindTriggerClick:function(){var c=this;c.__clickPopup=function(e){e.preventDefault();
if(c.get("toggle"))c[c.get("visible")?"_hiding":"_showing"](e);else c._showing(e)};c.get("trigger").on("click",c.__clickPopup)},_showing:function(c){this.set("currentTrigger",h.one(c.target));this.show()},_hiding:function(){this.set("currentTrigger",void 0);this.hide()},destructor:function(){var c=this.$el,e=this.get("trigger");e&&(this.__clickPopup&&e.detach("click",this.__clickPopup),this.__mouseEnterPopup&&e.detach("mouseenter",this.__mouseEnterPopup),this._mouseLeavePopup&&e.detach("mouseleave",
this._mouseLeavePopup));c.detach("mouseleave",this._setHiddenTimer,this).detach("mouseenter",this._clearHiddenTimer,this)}},{ATTRS:{trigger:{setter:function(c){return h.all(c)}},triggerType:{value:"click"},currentTrigger:{},mouseDelay:{value:0.1},toggle:{value:!1}},xclass:"popup"})});KISSY.add("overlay",["overlay/control","overlay/dialog","overlay/popup"],function(h,e){var c=e("overlay/control"),g=e("overlay/dialog"),b=e("overlay/popup");c.Dialog=g;h.Dialog=g;c.Popup=b;return h.Overlay=c});
