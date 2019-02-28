/*! search-suggest 2014-12-16 */
KISSY.add("tbc/search-suggest/1.3.9/suggest",function(a,b){function c(a){c.superclass.constructor.call(this,a||{})}return c=b.extend({initializer:function(){var a=this;a.on("afterRenderData",function(){a.fire("beforeShow")})},sendRequest:function(a){var b=this,c=b.constructor.superclass.sendRequest;if(b.fire("beforeQueryChange",{query:a})===!1)return!1;b.queryTimer&&clearTimeout(b.queryTimer),b.laterTimer&&clearTimeout(b.laterTimer);var d=arguments;b.queryTimer=setTimeout(function(){b.queryTimer=null,b.laterTimer=setTimeout(function(){b.later=!1},500),c.apply(b,d)},b.later?200:50),b.later=!0},handleKeyDownInternal:function(a){var b=this,c=b.constructor.superclass.handleKeyDownInternal;return b.fire("beforeKeyDown",{event:a})===!1?!1:void c.apply(this,arguments)},handleKeyEventInternal:function(a){var b=this,c=b.constructor.superclass.handleKeyEventInternal;return b.fire("beforeKeyDown",{event:a})===!1?!1:void c.apply(this,arguments)},setValueInternal:function(a){var b=this,c=b.constructor.superclass.setValueInternal;return b.fire("beforeSetInputValue",{event:a})===!1?!1:void c.apply(this,arguments)},setValueFromAutocomplete:function(a){var b=this,c=b.constructor.superclass.setValueFromAutocomplete;return b.fire("beforeSetInputValue",{event:a})===!1?!1:void c.apply(this,arguments)},renderItems:function(b,c,d){var e,f,g=this,h=g.get("sugConfig").resultFormat,i=g.resultArr||(g.resultArr=[]),j="",k=b;a.each(c,function(b,g){if(!b||!b[0])return void c.splice(g,1);for(e=b[0];e.indexOf(k)<0;)k=k.substr(0,k.length-1);""===k?(j=e,e=""):0===e.indexOf(k)&&(j=k,e=e.replace(k,""));for(var l in i)if(f=i[l],f.textContent===b[0]&&f.unique)return;d=d.replace("{format}",h),i.push({textContent:b[0],content:a.substitute(d,{query:j,text:e,index:g+1,count:b[1]}),list:!0})}),g.resultArr=i},alignInternal:function(a){var b=this,c=b.constructor.superclass.alignInternal;return b.fire("beforeShow",{event:a})===!1?!1:void c.apply(this,arguments)}},{ATTRS:{dataSourceCfg:{value:{xhrCfg:{url:"",dataType:"jsonp",scriptCharset:"utf-8",data:{code:"utf-8"}},allowEmpty:!0,paramName:"q",cache:!0}},mods:{value:{},setter:function(a){return a}}}}),c.RemoteDataSource=b.RemoteDataSource,c.LocalDataSource=b.LocalDataSource,c},{requires:["combobox"]}),KISSY.add("tbc/search-suggest/1.3.9/mods/mods",function(){return{"new":{tmpl:'<div class="item-wrapper {prefixCls}menu-extras-xp" data-key="q={$queryUrl}&suggest=new_{$index}&tab=shopping&auction_tag[]=1154"><span class="{prefixCls}menu-xp-tag">\u65b0\u54c1</span><span class="{prefixCls}menu-xp-icon">\u65b0\u54c1</span><span class="{prefixCls}menu-xp">\u201c{$query}\u201d\u76f8\u5173{new}\u65b0\u54c1</span></div>'},shop:{tmpl:'<div class="item-wrapper {prefixCls}menu-extras-dp" data-action="http://shopsearch.taobao.com/search" data-key="q={$queryUrl}&suggest=shop_{$index}"><span class="{prefixCls}menu-dp">{$query} <b>\u76f8\u5173\u5e97\u94fa</b></span><span class="{prefixCls}menu-dp-icon">\u5e97\u94fa</span></div>'},cat:{tmpl:'<div class="{prefixCls}menu-extras-cate" data-key="q={$2}&cat={$1}&suggest=cat_{$index}"><span class="{prefixCls}menu-key">{$2}</span><span class="{prefixCls}menu-cate">\u5728<b>{$0}</b>\u5206\u7c7b\u4e0b\u641c\u7d22</span></div>'},list:{tmpl:"<div data-index='{index}' class='item-wrapper' data-key='q={textContent}&suggest=0_{index}'><span class='item-text'>{query}<b>{text}</b></span><span class='item-count'>{format}</span></div>"},global:{tmpl:'<div class="{prefixCls}menu-extras-cate" data-key="q={$queryUrl}&promote=2097152&suggest=global_{$index}"><span class="{prefixCls}menu-key">{$query}</span><span class="{prefixCls}menu-cate">\u5728\u5168\u7403\u8d2d\u5e02\u573a\u4e2d\u641c\u7d22</span></div>'},history:{tmpl:'<div class="{prefixCls}menu-extras-history" {attr} data-key="q={historyItemQuery}&suggest={extraParam}_{index}" data-index="_his_{index}" data-value="{historyItemValue}"><span class="{prefixCls}menu-history-key">{historyItemValue}</span><span data-type="{extraParam}" class="{prefixCls}menu-history-delete">\u5220\u9664</span></div>'},scene:{tmpl:'<div class="{prefixCls}menu-extras-cate extras-scene" data-action="http://fa.taobao.com/search" data-key="q={scene}&suggest=scene_{$index}"><span class="{prefixCls}menu-key">{scene}</span><b>\u88c5\u4fee\u5b9d\u5178/\u9009\u8d2d\u79d8\u7c4d</b></div>'},dapei_bottom:{tmpl:'<div class="item-wrapper {prefixCls}menu-extras-dp" data-source-stat="source_click=suggest_kfc&source_pv=suggest_kfc#!Content" data-action="http://pose.taobao.com/search" data-key="q={dapei_bottom}"><span class="{prefixCls}menu-dp">{dapei_bottom}<b>\u5168\u5957\u642d\u914d</b></span></div>'},dapei_top:{tmpl:'<div class="{prefixCls}menu-extras-cate" data-source-stat="source_click=suggest_jqc&source_pv=suggest_jqc#!Content" data-action="http://pose.taobao.com/search" data-key="q={dapei_top}"><span class="{prefixCls}menu-key">{dapei_top}</span><span class="{prefixCls}menu-cate">\u5728<b>\u642d\u914d</b>\u4e0b\u641c\u7d22</span></div>'},tmall:{tmpl:'<div class="{prefixCls}menu-extras-cate extras-mall" data-key="q={tmall}&suggest=tmall_{$index}&tab=mall"><span class="{prefixCls}menu-key">{tmall}</span><b>\u5929\u732b\u76f8\u5173</b></div>'},c2c_activity:{tmpl:'<div class="{prefixCls}menu-extras-cate extras-active" data-key="q={c2c_activity_query} {c2c_activity_tag}&suggest=active_{$index}&tab=deal"><span class="{prefixCls}menu-key">{c2c_activity_query}</span><span class="{prefixCls}menu-cate">\u5728 <b>{c2c_activity_tag}</b> \u4e2d\u641c\u7d22</span></div>'},showExtra:!1}}),KISSY.add("tbc/search-suggest/1.3.9/mods/utils",function(a,b){function c(a){return d?d:(c.superclass.constructor.call(this,a||{}),void(d=this))}var d;return a.extend(c,b,{pluginInitializer:function(a){var b=this;b.set("caller",a)},getCookie:function(b){var c=window;if(c.userCookie&&!a.isUndefined(c.userCookie[b]))return c.userCookie[b];if(c.SRP_COOKIES||(c.SRP_COOKIES={})&&a.isUndefined(SRP_COOKIES[b])){var d=document.cookie.match("(?:^|;)\\s*"+b+"=([^;]*)");SRP_COOKIES[b]=d&&d[1]?decodeURIComponent(d[1]):""}return SRP_COOKIES[b]},fireEvent:function(a,b){var c=document;if(c.createEvent){var d=c.createEvent("MouseEvents");d.initEvent(b,!0,!1),a.dispatchEvent(d)}else c.createEventObject&&a.fireEvent("on"+b)}},{ATTRS:{pluginId:{value:"utils"}}}),c},{requires:["base"]}),KISSY.add("tbc/search-suggest/1.3.9/mods/bts",function(a,b,c){function d(a){d.superclass.constructor.call(this,a||{})}return a.extend(d,b,{getBucket:function(){var a=this,b=a.getCookieT(),c=a.getTestBucket()||a.retBucket(b,20,-4,4)-0;return c},getTestBucket:function(){var a=location.search,b=a.match(/alg_bts=(\d+)/);return b&&b[1]?b[1]-0:void 0},getCookieT:function(){var a=new c,b=a.getCookie("t");return b},retBucket:function(a,b,c,d){return!a&&"0"||this.countBucket(a,b,c,d)},countBucket:function(a,b,c,d){var e=a.substr(c,d),f=parseInt(e,16),g=f%b+1;return g+""}},{ATTRS:{pluginId:{value:"bts"}}}),d},{requires:["base","./utils"]}),KISSY.add("tbc/search-suggest/1.3.9/mods/storage",function(a,b,c){function d(a){return e||(d.superclass.constructor.call(this,a||{}),e=this,e.initialize()),e}var e;return d.ATTRS={src:{value:location.protocol+"//g.alicdn.com/tbc/search-suggest/1.3.7/storage.swf"},bridge:{value:null},hasInit:{value:!1}},a.extend(d,b,{initialize:function(b){b=b||{};var c=this;try{c._addFlash(b.appendTo),c.hasInit=!0}catch(d){a.log(d.message)}},_saveToArr:function(a,b){var c=this.lazyArr||[];c.push({func:a,args:b}),this.lazyArr=c},_addFlash:function(b){var c,d=this,e=document,f=e.createElement("div"),g=d.get("src"),h="";window.__StorageIsReady=function(){d.isLoaded=!0;var b=d.lazyArr;a.each(b,function(a){a.func.apply(d,a.args)})},f.id="storagetool",f.style.height=0,f.style.overflow="hidden",h+='<object id="J_StorageObj" name="J_StorageObj" ',h+='classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="1" height="1" ',h+='codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab">',h+='<param name="movie" value="'+g+'" />',h+='<param name="allowScriptAccess" value="always" />',h+='<embed name="J_StorageEmbed" src="'+g+'" width="1" height="1" ',h+='allowScriptAccess="always" type="application/x-shockwave-flash" ',h+='pluginspage="http://www.adobe.com/go/getflashplayer">',h+="</embed></object>",b=b||e.body,b.appendChild(f),f.innerHTML=h,-1!==navigator.appVersion.indexOf("MSIE")?(f.style.zoom=1,f.style.filter="alpha(opacity=10)",c=window.J_StorageObj):(f.style.opacity=.1,c=e.J_StorageEmbed),d.set("bridge",c)},save:function(a,b,d){var e=this,f=e.get("bridge");if(!e.isLoaded)return void e._saveToArr(arguments.callee,arguments);try{return f.save(a,b),f.read(a)?c.parse(f.read(a)).length:(d&&d.onSuccess(val),0)}catch(g){d&&d.onFailure&&d.onFailure(g)}},read:function(a,b,c){var d,e=this,f=e.get("bridge");if(c=c||0,!e.isLoaded)return void e._saveToArr(arguments.callee,arguments);try{if(f.read)d=f.read(a),b&&b.onSuccess(d);else{if(200===c)return void(b&&b.onFailure&&b.onFailure(g));setTimeout(function(){e.read(a,b,c+1)},500)}return d}catch(g){b&&b.onFailure&&b.onFailure(g)}}}),d},{requires:["base","json"]}),KISSY.add("tbc/search-suggest/1.3.9/mods/local-query",function(a,b,c,d,e){function f(a){f.superclass.constructor.call(this,a||{}),this.initialize()}var g="localQuery";return a.extend(f,b,{initialize:function(){var a=this,b=a.get("name"),c=a.get("tab"),d=a.get("user");"item"===c&&(c="baobei"),a.storageKey=g+b+c+d,a._getStorage()},checkFlash:function(a){this.storage.read(a)},_setKey:function(a){var b=this,c=a.name||b.get("name"),d=a.tab||b.get("tab"),e=a.user||b.get("user");"item"===d&&(d="baobei"),b.storageKey=g+c+d+e,b.set("tab",d),b.set("name",c),b.set("user",e),this.datalist=null},_save:function(b,c){if(!b.match(/<>'"/)&&!c.match(/<>'"/)){var d=this._getDatalist(),e=encodeURIComponent(b),f={key:e,value:encodeURIComponent(c),time:a.now()};this._deleteItemByValue(d,e),d.unshift(f)}},_deleteItemByValue:function(a,b){for(var c,d=null,e=0;e<a.length;e++)c=a[e].key,c==b&&(d=a.splice(e,1),e--)},_query:function(b){var c,d,e=this._getDatalist(),f=[];return b?(b=encodeURIComponent(b),a.each(e,function(a){c=a.key,d=a.value,(0===c.indexOf(b)||0===d.indexOf(b))&&f.push(a)}),this._distinctByValue(f)):this._distinctByValue(e)},_distinctByValue:function(a){for(var b,c=[],d=0,e=a.length;e>d;d++)b=a[d],b.value.match(/%3C|%3E|[<>'"]/g)||!this._hasItemOfValue(c,b.value)&&c.push(b);return c},_hasItemOfValue:function(a,b){for(var c=!1,d=a.length-1;d>=0;d--)a[d].value===b&&(c=!0);return c},_cleanBefore:function(a){for(var b,c=this._getDatalist(),d=0,e=c.length-1;e>=0;e--)if(b=c[e],b.time>a){d=e+1;break}c.length=d},_getDatalist:function(){return this.datalist||(this.datalist=this.storage.read()||[]),this.datalist},_getStorage:function(){var a=this.get("storageType");switch(a){case"flashStorage":this.storage=this._initFlashStorage();break;default:this.storage=!1}},_initFlashStorage:function(){var a=this;return{save:function(){return(new d).save(a.storageKey,c.stringify(a.datalist))},read:function(b){var f=(new d).read(a.storageKey,b);if(f){var g=c.parse(f);return g}return e}}},destructor:function(){this.datalist=null,g=null},save:function(b,c){if(""!=c){var d,e=this.storage.read();e&&(d=e.length);var f=this._save(b,c),g=this.storage.save();return d>300&&(this.datalist=this.datalist.slice(0,d-10),a.log("add_before\n"+g+"\n"+d),g=this.storage.save(),a.log("add_after\n"+g+"\n"+d)),f}},query:function(a){return this._query(a)},deleteItem:function(b){var c=this._getDatalist(),d=c.length;this._deleteItemByValue(c,encodeURIComponent(b));var e=this.storage.save();d>300&&(this.datalist=this.datalist.slice(0,d-10),e=this.storage.save(),a.log("delete\n"+e+"\n"+d))},clearByDay:function(b){var c=a.now()-24*b*3600*1e3;this._cleanBefore(c),this.storage.save()},hasHistory:function(){return this._getDatalist().length>0?!0:!1}},{ATTRS:{name:{value:"default",setter:function(a){return a}},user:{value:"",setter:function(b){return a.fromUnicode(b)}},maxLength:{value:500},storageType:{value:"flashStorage",setter:function(a){return a},getter:function(a){return a}}}}),f},{requires:["base","json","tbc/search-suggest/1.3.9/mods/storage"]}),KISSY.add("tbc/search-suggest/1.3.9/mods/stat",function(a,b,c,d,e){function f(a){f.superclass.constructor.call(this,a||{})}return a.extend(f,b,{pluginInitializer:function(a){var b=this,c=b.get("stat");b.set("caller",a),a.on("beforeSubmit",function(a){var c=a.isInitSearch;b.setStat(c)}),c&&(b.sendTongji(),b.bindSearchTrace())},bindSearchTrace:function(){var a=this;d.delegate("body","click","a",a.initSearchTrace,a)},initSearchTrace:function(a){var b=this,c=a.currentTarget,d=c.getAttribute("trace"),e=c.getAttribute("href");if(d)switch(d){case"relatedSearch":b.saveQuery();break;case"auction":var f=b.stat;f&&-1===e.indexOf("initiative_new")&&c.setAttribute("href",e+"&initiative_new=1")}},sendTongji:function(){var a,b=this,c=b.getStatInst();c.checkFlash({onSuccess:function(){a=c.query("stat")[0],a&&a.value&&(b.stat=a.value,b.send("f_stats_show="+a.value,!0))}})},setStat:function(a,b){var c=this,d=c.get("caller"),e=d.query,f=c.saveQuery(e,a);f&&c.send("lf_aclog=null-null-null-null-0&stats_click="+f,b)},getStatInst:function(){var a=this,b=a.get("caller"),c=b.get("sugConfig"),d=c.tab||"",f=new e({name:"stat",tab:d});return f},saveQuery:function(a,b){var c,d,e=this.getStatInst();return b&&a?(c=encodeURIComponent(a),d="initiative_new:1;q:"+c,e.save("stat",d)):e.deleteItem("stat"),d},send:function(a,b){var c,d;b?(c="/tongji",d="H51884970"):(c="/search",d="H51884969"),(window.goldlog_queue||(window.goldlog_queue=[])).push({action:"goldlog.record",arguments:[c,"",a,d]})},renderPlugin:function(){}},{ATTRS:{pluginId:{value:"stat"}}}),f},{requires:["base","cookie","event","tbc/search-suggest/1.3.9/mods/local-query"]}),KISSY.add("tbc/search-suggest/1.3.9/index",function(a,b,c,d,e,f,g,h){var i=(b.all,c.extend([],{initializer:function(){var a=this;a._initCombo(),a.bindUtil()},bindUtil:function(){var a=this;a.Utils=new h},_setComboCache:function(a){var b=this,c=b.get("tab");b.configArr=b.configArr||[],b.configArr[c]={data:a}},_checkHasTab:function(){var a=this,b=a.getPlugin("tab");b||(a.tabNode=a.get("form"))},_initComboEvent:function(){var b=this,c=b.comboBox,e=c.get("input");e.on("mousedown",function(d){if(b.fire("beforeFocus")!==!1){var f=a.trim(e.val()),g=b.get("sugConfig"),h=!0;h&&(g.autoCollapsed||""===f)&&c.sendRequest(f)}d.stopPropagation()}),e.on("focus",function(){b.fire("beforeFocus")}),e.on("blur",function(){return b.fire("beforeBlur")===!1?!1:void 0});var f=b.get("sugConfig").itemClick,g=!0;if(f&&a.isFunction(f)){g=!1;var h=f.apply(this,arguments);h!==!1&&(g=!0)}g&&c.on("click",b.comboClick,b),c.on("afterCollapsedChange",b._addExtraEvent,b),c.on("afterCollapsedChange",function(a){b.fire("afterCollapsedChange",a)}),c.on("beforeQueryChange",function(a){b.fire("beforeQueryChange",a)}),c.on("beforeSetInputValue",function(){var a=b.get("label");a&&d.hide(a)}),b._formSubmitEvent(),b.query=e.val();var i=b.get("label");i&&i.on("click",function(){c.sendRequest(e.val())})},_formSubmitEvent:function(){var b,c=this,d=c.comboBox,e=d.get("input"),f=e.parent("form"),g=d.get("input");f.on("submit",function(d){c.fire("beforeSubmit",{el:f,isInitSearch:!0})!==!1?(b=f.attr("action"),""===a.trim(g.val())&&c._emptyJump(f)===!1&&d.preventDefault(),c.serializeToForm(f,b)):d.halt()})},serializeToForm:function(a,b){var c,d,e,f="",g="";if(b&&a){if(b.indexOf("http")>-1){if(-1===b.indexOf("?"))return;f=b.split("?")[1]}c=f.split("&");for(var h in c)d=c[h].split("="),e=d[0],e&&!a[0][e]&&(g+='<input type="hidden" name="'+d[0]+'" value="'+d[1]+'"/>');a.append(g)}},_defaultPageJump:function(b){var c,d=this,e=d.tabNode;if(!e)return!1;if(c=b.attr("data-defaultpage")||e.attr("data-defaultpage")){if(!a.startsWith(c,"http"))return!1;b.attr("action",c)}},_emptyJump:function(a){{var b,c=this,d=a.one("label"),e=c.get("sugConfig");e.tab}return d?(b=d.one("span"),b&&""!==b.text()?(d.hide(),void c._holderJump(a,b.text())):c._defaultPageJump(a)):c._defaultPageJump(a)},_holderJump:function(a,b){var c=a[0].q;c&&(c.value=b),a.append('<input type="hidden" name="style" value="grid" />')},comboClick:function(a){var c=this,d=a.target.get?a.target.get("el"):b.one(a.currentTarget),e=(c.comboBox,d.one(".item-text,.search-menu-key,.search-menu-history-key")),f=!1,g=c.get("form"),h=c.get("sugConfig").isSendByForm;if(e){var i=e.text(),j=c.historyArr;if(j)for(var k=0,l=j.length-1;l>=k;k++)if(i===j[k]){f=!0;break}}if(c.fire("beforeSubmit",{el:d,isInitSearch:!1,isNotSave:f})!==!1){var m=c.getRedirect(d);h?(c.serializeToForm(g,m),g[0].submit()):c.redirect(m)}},getRedirect:function(a){var b=this,c=(b.comboBox,b.query),e=b.query,f=d.children(a),g=d.attr(f,"data-key")||"q="+c,h=b.get("form")[0],i=d.attr(h,"action"),j=d.attr(f,"data-action")||b.get("action")||i,k=d.attr(f,"data-source-stat")||"source=suggest",l="&_input_charset=utf-8&wq="+encodeURIComponent(e)+"&suggest_query="+encodeURIComponent(c)+"&"+k,m=b._getInputsVal(h);return j+=j.indexOf("?")>-1?"&":"?",j+m+"&"+g+l},redirect:function(a){var b=this,c=b.get("sugConfig").isEncode;c?a=b.urlEncode(a):(a=a.replace(/(#)[^!]/g,function(a,b){return a.replace(b,"%23")}),a=a.replace(/#!/g,"#"));var d=document.createElement("a");d.setAttribute("href",a),d.setAttribute("target","_self"),d.style.display="none",document.body.appendChild(d),d.click()},urlEncode:function(b){var c=/[\u4e00-\u9fa5\uf900-\ufa2d+#\s]+/g.exec(b);if(c)try{b=b.replace("\uff1f","?"),b=b.replace(/[\u4e00-\u9fa5\uf900-\ufa2d+#]+/g,function(a){return encodeURIComponent(a)}),b=b.replace(/\s/g,function(){return"+"}),b+="&ie=utf-8"}catch(d){a.log("url\u7f16\u7801\u51fa\u9519!")}return b},_getInputsVal:function(b){var c,e,f=this,g=f.get("sugConfig"),h=g.excludeParam,i=[];inputs=d.query("input",b);for(var j=inputs.length-1;j>=0;j--)c=inputs[j],e=c.name,e&&!a.inArray(e,h)&&i.push(e+"="+encodeURIComponent(c.value));return i.length<1?"":"&"+i.join("&")},_getDefComboCfg:function(){return{focused:!1,hasTrigger:!1,matchElWidth:!0,srcNode:".allWidth",highlightMatchItem:!1,menu:{align:{overflow:{adjustY:0}}},cache:!0}},_prepareHtml:function(a){var c=this,e=d.get(a.node),f=e.innerHTML,g=a.prefixCls,h=d.get(a.placeholderEl),i=h?h.outerHTML:"",j='<div class="{cls}combobox"><div class="{cls}combobox-input-wrap"></div></div>',k=j.replace(/{cls}/g,g).replace(/{label}/g,i).replace(/{input}/g,f),l=d.create(k),m={"aria-haspopup":"true","aria-combobox":"list",role:"combobox",autocomplete:"off","class":g+"combobox-input","x-webkit-grammar":"builtin:translate"};return d.attr(e,"aria-label")||(m["aria-label"]=c._isOpen("history")?"\u8bf7\u8f93\u5165\u641c\u7d22\u6587\u5b57\u6216\u4ece\u641c\u7d22\u5386\u53f2\u4e2d\u9009\u62e9":"\u8bf7\u8f93\u5165\u641c\u7d22\u6587\u5b57"),d.attr(e,m),d.wrap(e,l),this.get("sugConfig").focused&&d.get(e).focus(),b.one("."+g+"combobox")},_isOpen:function(b){var c=this,d=c.get("mods"),e=d.sort;return a.inArray(b,e)},_getRenderMods:function(){var b=this,c=a.merge(f,b.get("mods"));b.set("mods",c)},_getDataSourceCfg:function(){var b=this,c=b.get("sugConfig"),d=b.get("dataSourceCfg"),e=c.sourceUrl;return location.href.indexOf("debug=test")>-1&&(e=e.replace("suggest.taobao.com/sug?","suggest.proxy.taobao.org/sug?")),-1===e.indexOf("bucketid")&&(e+="&bucketid="+b._getBucketId()),d.xhrCfg.url=e,d.parse=a.bind(b.parse,b),d},_getBucketId:function(){return(new g).getBucket()},_getComboCfg:function(c){var d=this,e=d.get("sugConfig"),f=d._getDefComboCfg(),g=e.prefixCls,h=b.one("."+g+"-combobox");return h||(h=d._prepareHtml(e)),f.srcNode=h,f.dataSource=c,f.format=a.bind(d.format,d),f.prefixCls=e.prefixCls,f.holderEl=b.one(e.placeholderEl),f.maxItemCount=f.maxItemCount||c.maxItemCount,f},_initCombo:function(){var a,b,c=this,d=c._getDataSourceCfg(),f=c.get("sugConfig");c._getRenderMods(),f.sourceUrl?(a=new e.RemoteDataSource(d),a.maxItemCount=10):(a=new e.LocalDataSource(d),a.maxItemCount=0),c._setComboCache(a),b=c._getComboCfg(a);var g=new e(b);g.render(),c.comboBox=g,c._checkHasTab(),c._initComboEvent()},update:function(b){for(var c=this,d=c.get("plugins"),e=0,f=d.length-1;f>=e;e++){var g=d[e];g&&a.isFunction(g.update)&&g.update.call(g,b)}},parse:function(b,c){var d,e=this,f=e.fire("beforeParse",{results:c,query:b});if(f===!1)return[[""]];if(f&&(c=f),!c||!c.result)return a.log("\u63a5\u53e3\u65e0\u6570\u636e!"),[[""]];d=c.result,delete c.result;var g=e.comboBox.get("dataSource");if((g.extraData||(g.extraData=[]))[b]=c,0===d.length)return[[""]];for(var h in d)d[h]||d.splice(h,1);return d},format:function(a,b){var c=this;return c.resultArr=[],c.render(a,b),c.resultArr},render:function(a,b){var c,d,e,f,g,h,i=this,j=i.get("mods"),k=j.sort,l=i._adjustExtra(a,j.showExtra);i.query=a;for(var m=0,n=k.length-1;n>=m;m++)if(h=k[m])if("list"!==h){if(g=i.getPlugin(h),g&&g.renderPlugin)g.renderPlugin({query:a,results:b});else if(d=j[h],d&&l&&(!(f=d.pos)||e!==f)){if(c=d.tmpl,!c)continue;var o=i.resultArr.length,p=i.diffLen||0;e=i.defaultRender({tmpl:c,name:h,pos:f,always:d.always&&b.length>0,callback:d.callback,index:o-p})}}else d=j[h],c=d.tmpl,i._list(a,b,c);i.fire("afterQueryChange",{query:a})},defaultRender:function(b){var c,d=this,e=b.tmpl,f=b.name,g=d.comboBox.get("dataSource"),h=d.query,i=d.get("sugConfig").prefixCls,j=g.extraData,k=b.pos,l=b.index;if(j&&j[h]||b.always){var m,n,o=d._getDate(),p={$query:h,$queryUrl:encodeURIComponent(h),$date:o,prefixCls:i};if(!b.always){if(m=j[h][f],n=!0,!m)return;if(a.isArray(m)){m.length>2&&(m.length=2);for(var q=0,r=m.length-1;r>=q;q++){var s=m[q];if(a.isArray(s)){n=!1;for(var t=0,u=s.length-1;u>=t;t++)p["$"+t]=s[t]||"";p.$index=l+1+q,c=a.substitute(e,p),d.addContent({html:c,query:h,position:k,callback:b.callback})}else p["$"+q]=s,p.$index=l+1+q}return n&&(c=a.substitute(e,p),d.addContent({html:c,query:h,position:k,callback:b.callback})),k}if(a.isObject(m)){for(var v in m)p[f+"_"+v]=m[v];"active"===f&&(p.$query=m.query+" "+m.tag)}else p[f]=m,p.$query=m}return p.$index=l+1,c=a.substitute(e,p),d.addContent({html:c,query:p.$query||h,position:k,callback:b.callback}),k}},_adjustExtra:function(a){return""!==a?!0:!1},getNick:function(){var a=this;return a._getCookie("_nk_")||a._getCookie("tracknick")},_getCookie:function(b){var c=window;if(c.userCookie&&!a.isUndefined(c.userCookie[b]))return c.userCookie[b];if(c.SRP_COOKIES||(c.SRP_COOKIES={})&&a.isUndefined(SRP_COOKIES[b])){var d=document.cookie.match("(?:^|;)\\s*"+b+"=([^;]*)");SRP_COOKIES[b]=d&&d[1]?decodeURIComponent(d[1]):""}return SRP_COOKIES[b]},_getDate:function(){var a=new Date;return a.getFullYear()+"-"+(a.getMonth()+1)+"-"+(a.getDate()+1)},_list:function(b,c,d){var e,f=this,g=f.get("sugConfig").resultFormat,h=f.resultArr||(f.resultArr=[]);a.each(c,function(f,i){if(!f||!f[0])return void c.splice(i,1);var j,k=f[0],l="",m=b;if(k.match(/<b>/))e=k.replace(/<b>(\S+?)<\/b>/g,function(a,b){return b}),l=k,k="";else{for(;k.indexOf(m)<0;)m=m.substr(0,m.length-1);""===m?(l=k,k=""):0===k.indexOf(m)?(l=m,k=k.replace(m,"")):(l=k,k=""),e=f[0]}for(var n in h)if(j=h[n],j.textContent===f[0]&&j.unique)return;d=d.replace("{format}",g),h.push({textContent:e,content:a.substitute(d,{query:l,text:k,index:i+1,count:f[1],textContent:encodeURIComponent(e)}),list:!0})}),f.resultArr=h},addContent:function(a){var b=this,c=a.html,d=a.position,e=a.query;if(!d){var f=b.resultArr||[];return void f.push({content:c,textContent:e})}b["__"+d]={tmpl:c},b._addExtraEvent()},_renderHeader:function(a,c,d){var e=c&&c.type+"-header"||"";if(c){var f=this.get("sugConfig").prefixCls;a||(a=new b("<div class='"+f+"combobox-menu-header "+e+"'></div>").prependTo(d)),a.empty().append(c.tmpl)}else a&&a.remove()},_renderFooter:function(a,c,d){var e=this,f=e.get("sugConfig").prefixCls,g=c&&c.type+"-footer"||"";if(c){a||(a=new b("<div class='"+f+"combobox-menu-footer "+g+"'></div>").appendTo(d)),c.css&&a.css(c.css),a.empty().append(c.tmpl);var h=a.one("."+f+"menu-history-clean");h&&h.on("click",function(a){a.halt();var b=e.getPlugin("history");b._cleanHistory()})}else a&&a.remove()},_addExtraEvent:function(a){var b=this,c=b.comboBox||b,d=b.__header,e=b.__footer,f=b.__lastHeader,g=b.__lastFooter,h=b.get("sugConfig").prefixCls;if(!a||a&&!a.newVal){var i=c.get("menu");if(!i.get)return;var j=i.get("el");if(!j||j.all("."+h+"menuitem").length<1)return;var k=j.one("."+h+"combobox-menu-header"),l=j.one("."+h+"combobox-menu-footer");f!==d&&(b.__lastHeader=d,b._renderHeader(k,d,j)),g!==e&&(b.__lastFooter=e,b._renderFooter(l,e,j))}else b.__header=null,b.__footer=null}},{ATTRS:{sugConfig:{value:{extraPassParams:"",extraPostParams:"",sourceUrl:"",tab:"item",autoCollapsed:!0,focused:!1,prefixCls:"search-",excludeParam:["q"],resultFormat:"\u7ea6{count}\u4e2a\u5b9d\u8d1d"},setter:function(b){var c=this.get("sugConfig");return a.mix(c,b,void 0,void 0,!0)}},mods:{value:{},setter:function(a){return a}},input:{getter:function(a){return a||(a=this.comboBox.get("input"))}},form:{getter:function(a){return a||(a=this.get("input").parent("form"))}},label:{getter:function(a){return a||(a=this.comboBox.get("holderEl"))}},menu:{getter:function(a){return a||(a=this.comboBox.get("menu"))}},dataSourceCfg:{value:{xhrCfg:{url:"",dataType:"jsonp",scriptCharset:"utf-8",data:{code:"utf-8"}},allowEmpty:!0,paramName:"q",cache:!0}}}}));return i},{requires:["node","rich-base","dom","tbc/search-suggest/1.3.9/suggest","tbc/search-suggest/1.3.9/mods/mods","tbc/search-suggest/1.3.9/mods/bts","tbc/search-suggest/1.3.9/mods/utils","tbc/search-suggest/1.3.9/mods/stat"]});