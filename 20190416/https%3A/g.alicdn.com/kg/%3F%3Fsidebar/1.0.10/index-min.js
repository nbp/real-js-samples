define("kg/sidebar/1.0.10/index",["util","kg/sidebar/1.0.10/lib/attrs/20161212.js","json","node","kg/xtemplate/4.5.0/runtime","base","anim","ua","io","kg/sidebar/1.0.10/lib/index.css","kg/sidebar/1.0.10/lib/kissyConfig.js"],function(t,e,i){var n,a,r,s,o,l,u,c,d,g=t("util"),h=t("kg/sidebar/1.0.10/lib/attrs/20161212.js"),f=t("json"),p=t("node"),m=t("kg/xtemplate/4.5.0/runtime"),v=t("base"),b=t("anim"),k=t("ua"),y=t("io");t("kg/sidebar/1.0.10/lib/index.css"),t("kg/sidebar/1.0.10/lib/kissyConfig.js");n=function(t){return t=function(){var t=!!~location.hostname.indexOf("daily.taobao.net"),e=t?"//g-assets.daily.taobao.net":"//g.alicdn.com";KISSY.config({modules:{"pk/index":{requires:["./index.css"]}},packages:{pk:{base:e+"/tb/pk/0.1.0/",ignorePackageNameInUri:!0},tp:{base:e+"/tp/",ignorePackageNameInUri:!0},tbc:{base:e+"/tbc/",ignorePackageNameInUri:!0},kg:{base:e+"/kg/",ignorePackageNameInUri:!0}}})}()}(),a=function(t){var e=p.all,i=g,n=h,a=f,r=function(){var t=e("#J_SiteNav")||e("#J_sidebar_config");if(!t)return!1;var i=t.attr("data-tbar")||e("#J_sidebar_config").attr("data-tbar");if(!i)return!1;var n;try{n=a.parse(i)}catch(r){console.log("json parse error",r),n={}}return n},s=function(t,e){var n=t.pluginVersion.value;return e&&e.pluginVersion?i.mix(n,e.pluginVersion):n},o=function(t,e){return e&&e.length?(i.each(e,function(e){i.indexOf(e,t)===-1&&t.push(e)}),t):t},l=function(){var t=n,e=r();return e&&(t.pluginVersion.value=s(t,e),t.blackList.value=o(t.blackList.value,e.blackList),t.hostBLackList.value=o(t.hostBLackList.value,e.page),t.style=e.style&&e.style.name||t.style,t.stylePath=e.style&&e.style.path||t.stylePath),t};return t={getAttrs:l,getInfoFromDom:r}}(),r=function(t){return t={show:{value:!0},render:{value:document.body},created:{value:!1},rendered:{value:!1},expanded:{value:{}},shrinking:{value:{}},items:{value:[{list:["pagenav","redpaper","my1111"],splitLine:!0,topSpacing:"0%"},{list:["cart","history"],splitLine:!0,topSpacing:"30"},{list:["help","gotop"],splitLine:!1,topSpacing:"7%"}]},pluginVersion:{value:{cart:"0.0.4",history:"0.0.3",redpaper:"0.0.6",my1111:"0.0.4",gotop:"0.0.3",help:"0.0.2",ww:"0.0.3",pagenav:"0.0.4"}},defaultSpacing:{value:[{height:"0"},{height:"2%"},{height:"7%"}]},defaultSplitLine:{value:[!0,!0,!1]},style:{value:"20161212"},expandToRight:{value:!0},blackList:{value:[]},hostBLackList:{value:["guang.taobao.com","lu.taobao.com","tw.taobao.com","sea.taobao.com","hk.taobao.com","cun.taobao.com"]}}}(),s=function(t){"use strict";var e=function(t,e){KISSY.use(t,function(){e&&e()})};return t=e}(),o=function(t){var e=g,i=function(t,e){return"kg/"+t+"/"+e+"/"},n=function(t){var i=[];return e.each(t,function(t){i=i.concat(t.list)}),i},a=function(t,i){var a=[],r=n(t);return e.each(r,function(t){var e=i[t];e&&a.push({name:t,version:e})}),a},r=function(t,n,r){if(!t||!n)return!1;var s=a(t,n),o=[],l=[];e.each(s,function(t){var e="sidebar-plug-"+t.name,n=i(e,t.version);l.push(n),o.push(t.name)});var u={};KISSY.use(l,function(){for(var t=-1,e=o.length;++t<e;)u[o[t]]=arguments[t+1];r&&r(u)})};return t=r}(),l=function(t){"use strict";var e=m;return t=function(){var t=new e(function(t){var e=this,i=e.root,n=e.buffer,a=e.scope,r=(e.runtime,e.name,e.pos,a.data,a.affix,i.nativeCommands),s=i.utils;s.callFn,s.callDataFn,s.callCommand,r.range,r["void"],r.foreach,r.forin,r.each,r["with"],r["if"],r.set,r.include,r.parse,r.extend,r.block,r.macro,r["debugger"];return n.data+='<div class="tb-toolbar tb-toolbar-shrinked" id="J_Toolbar" role="toolbar" data-spm="630"></div>\n',n});return t.render.apply(t,arguments)}}(),u=function(t){"use strict";var e=m;return t=function(){var t=new e(function(t){var e=this,i=e.root,n=e.buffer,a=e.scope,r=(e.runtime,e.name,e.pos,a.data,a.affix,i.nativeCommands),s=i.utils;s.callFn,s.callDataFn,s.callCommand,r.range,r["void"],r.foreach,r.forin,r.each,r["with"],r["if"],r.set,r.include,r.parse,r.extend,r.block,r.macro,r["debugger"];return n.data+='<ul class="tb-toolbar-list"></ul>',n});return t.render.apply(t,arguments)}}(),c=function(t){var e,i=v,n=p.all,r=g,c=b,d=y,h="expand",f="shrink",m="afterShrink",k="tb-toolbar-item-hd-active",x=".tb-toolbar-item-hd",I=".tb-toolbar-item-bd",L=a,S=s,C=o,w=l,P=u,T=n("body"),B=!1,j={},E=!1,F=L.getAttrs(),O=i.extend({initializer:function(){if(!B&&!this.hostIsInBlackList()&&this.get("show")&&!this.urlParamsInBlackList()){B=!0,r.namespace("TB.Sidebar",!0).sidebar=this;var t=w();this.el=n(t),this.initStyles(this.el),this.set("created",!0)}},initStyles:function(t){var e=this.get("style")||F.style,i=this.get("zIndex"),a=this.get("narrowThreshold")||1024;i&&t.css("z-index",i),"item.taobao.com"!==location.hostname&&"itempre.taobao.com"!==location.hostname||t.css("z-index",100000020),t.addClass("tb-toolbar-"+e),document.body.clientWidth<a&&t.addClass("tb-toolbar-narrow"),n("body").on("resize",function(){document.body.clientWidth<=a?t.addClass("tb-toolbar-narrow"):t.removeClass("tb-toolbar-narrow")}),this.get("expandToRight")&&t.addClass("tb-toolbar-right")},initPlugins:function(t){var i=this;e=t;var a=i.get("defaultSpacing")||[],s=i.get("defaultSplitLine")||[],o=P(),l=i.get("items");i.getConfig();l&&l[0]&&l[0].list&&3===l[0].list.length&&(l[0].list=["myasset","my1111","pagenav"]),r.each(l,function(t,e){var r=n('<div class="tb-toolbar-space"></div>'),l=t.topSpacing?{height:t.topSpacing}:a[e],u=void 0===t.splitLine?s[e]:t.splitLine;r.css(l),i.el.append(r);for(var c=n(o),d=t.list||[],g=-1,u=u?'<li class="tb-toolbar-item-split"></li>':"";++g<d.length;){var h=d[g],f=i.initPlug(h,c);c.append(f),g!==d.length-1&&c.append(n(u))}t.css&&c.css(t.css),i.el.append(c)})},initPlug:function(t,i){var a,s=this,o=t;if(r.isObject(t)&&(o=t.type,a=t.css),!s.plugIsInBlacKList(o)){i.addClass("tb-toolbar-list-with-"+t);var l=e[o];if(l.config=r.mix(l.config,j[o]),l){var u=l.tpl;if(u){var c=l.data||{};c.name=o;var d=u(c),g=n(d);s.items.push(o),s.set(o,g),a&&g.css(a)}return s.addPlugListener(l,o),g}}},addPlugListener:function(t,e){var i=this,n=t.listeners,a=n&&n.init;a&&a.apply(i,[e]);var s=n&&n.message;if(r.isPlainObject(s))r.each(s,function(t,n){var a=["toolbar",e,n].join(":");T.on(a,r.bind(t,i,e))});else if(r.isFunction(s)){var o=["toolbar",e,"message"].join(":");T.on(o,r.bind(s,i,e))}},destructor:function(){this.el.remove(),this.set("created",!1),this.set("rendered",!1),this.el=null},items:[],render:function(){if(!this.hostIsInBlackList()&&this.get("show")&&!this.urlParamsInBlackList()){var t=this,e=t.getConfig();if(e){var i=e.validTime&&e.validTime.startTime,n=e.validTime&&e.validTime.endTime,a=location.search||"",r=/sidebar\=true/.test(a)||this.get("forceShow");i&&n&&!r?new d({url:"//t.alicdn.com/t/gettime",dataType:"jsonp",timeout:3,cache:!1,success:function(e){e&&e.time&&+e.time>i&&+e.time<n&&t.renderPlugin()},error:function(){}}):this.renderPlugin()}}},renderPlugin:function(){var t=this,i=t.get("pluginVersion")||{},a=t.get("stylePath")||F.stylePath||"kg/sidebar-style-20161212/0.0.1/",s=r.mix(F.pluginVersion.value,i);S(a,function(){C(t.get("items"),s,function(i){if(t.initPlugins(i),t.plugs=i,!t.get("rendered")){n(t.get("render")).append(t.el),t.set("rendered",!0),t.binding();var a=t.items;r.each(a,function(i){var n=e[i].listeners,a=n&&n.afterRender;a&&a.apply(t,[i])})}})})},binding:function(){function t(t,i){function n(){var n=i.type,r=e[t].listeners;r&&r[n]&&r[n].apply(a,[t,i])}a.plugs[t].config.login!==i.type||E?n():KISSY.use("kg/mini-login/6.3.12/",function(t,e){var i=new e({zindex:2e8});i.on("login",function(){T.fire("toolbar:login"),E=!0,n()}),i.show()})}var i=this.el,a=this;i.delegate("click",".tb-toolbar-item-hd",function(e){e.preventDefault();var i=e.currentTarget,a=n(i).parent().attr("data-item");t(a,e)}),i.delegate("mouseenter mouseleave",".tb-toolbar-item",function(e){e.preventDefault();var i=e.currentTarget,a=n(i).attr("data-item");t(a,e)}),n(document).on("click",function(t){var e=n("#J_Lottery .lottery-pc-dialog-rule-left");i.contains(t.target)||i.equals(t.target)||e.contains(t.target)||a.shrink()})},getExpanded:function(){return this.get("expanded").item},getItemEl:function(t){return this.get(t)},getItemHdEl:function(t){var e=this.getItemEl(t);return e&&e.all(x)},getItemBdEl:function(t){var e=this.getItemEl(t);return e&&e.all(I)},expand:function(t,i){var n=this.get("expanded"),a=n.item;if(a&&(a!==t?this.shrink(null,null,!0):this.shrink()),t!==a){this.getItemHdEl(t).addClass(k);var r=e[t].listeners[h];r&&r.apply(this,[t,i]),this.set("expanded",{item:t,data:i}),this.el.removeClass("tb-toolbar-shrinked"),this.get("expandToRight")&&(c.stop(this.el,!0),new c(this.el,{right:this.getItemBdEl(t).outerWidth()},.3,"easeOut",function(){},(!0)).run())}},getConfig:function(){return this.barConfig||(this.barConfig=L.getInfoFromDom()),this.barConfig},shrink:function(t,i,n){var a=this.get("expanded"),r=a.item;if(r){var s=a.data;this.getItemHdEl(r).removeClass(k);var o=e[r].listeners[f];this.set("expanded",{}),this.el.addClass("tb-toolbar-shrinked");var l=this;if(this.get("expandToRight")&&!n)return c.stop(this.el,!0),void new c(this.el,{right:0},.3,"easeOut",function(){o&&o.apply(l,[r,s]),T.fire("toolbar:shrink")},(!0)).run();o&&o.apply(this,[r,s]),T.fire("toolbar:shrink")}},afterShrink:function(){var t=this.get("shrinking"),i=t.item;if(i){var n=t.data,a=e[i].listeners[m];a&&a.apply(this,[i,n]),this.set("shrinking",{}),T.fire("toolbar:afterShrink")}},hostIsInBlackList:function(){var t=location.host,e=this.get("hostBLackList");return r.inArray(t,e)},urlParamsInBlackList:function(){var t=this.getConfig(),e=t.paramsBlackList,i=location.href;if(!e)return!1;e=e.split(",");for(var n=0;n<e.length;n++){var a=e[n];if(i.indexOf(a)!==-1)return!0}return!1},plugIsInBlacKList:function(t){return r.inArray(t,this.get("blackList"))}},{config:function(){if(r.isObject(arguments[0]))return void r.each(arguments[0],function(t,e){j[e]||(j[e]={}),t&&(j[e]=r.mix(j[e],t))});var t=arguments[0],e=arguments[1];return j[t]||(j[t]={}),e&&(j[t]=r.mix(j[t],e)),j[t]},items:[],ATTRS:F});return t=O}(),d=function(t){function e(){var t=s.getInfoFromDom(),e=location.search||"",n=/sidebar\=true/.test(e);if(!n&&(!t||!t.show||o.ipad))return void i()}function i(){var t=n.noop;r=t,r.prototype={expand:t,shrink:t,render:t,getexpanded:t,getitemhdel:t,getitembdel:t,getitemel:t},r.config=t}var n=g,r=c,s=a,o=k;return e(),t=r}(),i.exports=d});