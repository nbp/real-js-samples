/* Built on 2019-01-17 23:59:04 */
!function(){"ontouchstart"in window||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0||(document.documentElement.className+=" notouch"),"undefined"==typeof window.console&&(window.console={});var e=function(e){for(var t=[],n=1;n<arguments.length;n++){var o=arguments[n],i=typeof o;if("string"===i)t.push(o);else if(null===o)t.push("null");else if("undefined"===i)t.push("undefined");else if("function"===i){var r=o.toString();t.push(r.substr(r,r.indexOf("{")+1)+" ... }")}else"function"==typeof o.toString?t.push(o.toString()):t.push(i)}document.body?"function"==typeof document.body.appendChild&&document.body.appendChild(document.createComment(e+" / "+t.join(", "))):document.write("\x3c!--"+e+" / "+t.join(", ")+"--\x3e")},t=["error","warn","info","debug","log"];for(var n in t)!function(t){"undefined"==typeof window.console[t]&&(window.console[t]=function(){for(var n=[t.toUpperCase()],o=0;o<arguments.length;o++)n.push(arguments[o]);e.apply(null,n)})}(t[n])}(),function(){var e,t={};t.getRootDomain=function(){if("string"==typeof e)return e;var t=window.location.hostname.split(".");if(t.length>=2){e="";for(var n=t.length-2;n<t.length;n++)e+="."+t[n]}return e};var n={},o=function(e,t){var n=e.indexOf(";",t);return-1===n&&(n=e.length),unescape(e.substring(t,n))};n.set=function(e,t,n,o,i,r){var s=[];if(s.push(e+"="+encodeURIComponent(t)),n){var a=new Date;a.setTime(a.getTime());var l=new Date(a.getTime()+n);s.push("expires="+l.toGMTString())}o&&s.push("path="+o),i&&s.push("domain="+i),r&&s.push("secure"),document.cookie=s.join(";")},n.setLocal=function(e,o,i,r,s){n.set(e,o,i,r,t.getRootDomain(),s)},n.get=function(e){for(var t=e+"=",n=t.length,i=document.cookie,r=i.length,s=0;s<r;){var a=s+n;if(i.substring(s,a)===t)return o(i,a);if(0===(s=i.indexOf(" ",s)+1))break}return null},window.xv||(window.xv={}),window.xv.utils=t,window.xv.cookies=n}(),function(){var e=function(){this.s=window.localStorage};e.prototype={type:"local",get:function(e,t){"string"==typeof t&&t.length>0&&(e=t+"."+e);try{return JSON.parse(this.s.getItem(e))}catch(n){return console.log(n),null}},set:function(e,t,n){"string"==typeof n&&n.length>0&&(e=n+"."+e),this.s.setItem(e,JSON.stringify(t))},remove:function(e,t){"string"==typeof t&&t.length>0&&(e=t+"."+e),this.s.removeItem(e)},clear:function(){this.s.clear()}};var t="_globalns_",n=window.xv.cookies,o=function(){this.data={}};o.prototype={type:"cookie",_loadNs:function(e){if("string"==typeof e&&0!==e.length||(e=t),"object"!=typeof this.data[e]){this.data[e]={};var o=n.get("hexavid_storage_"+e);if("string"==typeof o&&o.length>0)try{o=JSON.parse(o),"object"==typeof o&&(this.data[e]=o)}catch(i){console.error(i)}}},_write:function(e){"string"==typeof e&&0!==e.length||(e=t);try{var o=JSON.stringify(this.data[e]);n.setLocal("hexavid_storage_"+e,o,31536e6,"/")}catch(i){console.error(i)}},get:function(e,n){return this._loadNs(n),"undefined"==typeof this.data[n||t][e]?null:this.data[n||t][e]},set:function(e,n,o){this._loadNs(o),this.data[o||t][e]=n,this._write(o)},remove:function(e,n){this._loadNs(n),"undefined"!=typeof this.data[n||t][e]&&(delete this.data[n||t][e],this._write(n))},clear:function(){this._loadNs(ns),this.data[ns||t]={},this._write(ns)}},window.xv||(window.xv={});try{if("object"==typeof window.localStorage){var i=window.localStorage,r="__storage_test__";i.setItem(r,r),i.removeItem(r),window.xv.storage=new e}}catch(s){}window.xv.storage||(window.xv.storage=new o)}(),function(){var e=window.xv.storage,t=function(e,t,n,o,i){var r=document.createElement(e);t&&(r.className=t);for(var s in n)n.hasOwnProperty(s)&&(r.style[s]=n[s]);return o&&(r.innerHTML=o),i&&(r.innerText?r.innerText=i:r.textContent=i),r},n=function(e,t){var n=!1;for(var o in e.childNodes)if(1===e.childNodes[o].nodeType){n=e.childNodes[o];break}n?e.insertBefore(t,n):e.appendChild(t)},o=function(){if(-1!==window.location.href.indexOf("debugjs=1")?(this.is_debug=!0,e.set("enabled",!0,"debugconsole")):e.get("enabled","debugconsole")&&(this.is_debug=!0),this.node,this.logs,"object"==typeof window.onerror){var t=this;window.onerror=function(e,n,o,i,r){var s={};return s.u=n+":"+o,"number"==typeof i&&(s.u+=":"+i),console.error('ERROR: "'+e+'" in '+s.u),"object"==typeof r&&null!==r&&"string"==typeof r.stack&&(console.error(r.stack),s.s=r.stack.split(window.location.protocol+"//"+window.location.hostname).join("")),t.log(e,"Global error",null,s),!0}}};o.prototype={_read:function(){if("object"!=typeof this.logs){this.logsize=0,this.logs=e.get("logs","debugconsole"),this.logs&&"object"==typeof this.logs||(this.logs=[]);for(var t in this.logs)this.logsize+=this.logs[t].s}},_cleanLogs:function(){for(;this.logsize>1e5;){var e=this.logs.pop();this.logsize-=e.s}},getHistory:function(){return e.get("logs","debugconsole")||[]},displayHistory:function(){var e=this.getHistory();if(0===e.length)return void console.info("No history");for(var t=e.length-1;t>=0;t--){var n=e[t],o=new Date(n.t),i=o.toUTCString()+": "+n.a+" - "+n.x;n.eu&&(i+=" IN "+n.eu),console.info(i),"undefined"!=typeof n.js&&(console.info("Status: "+n.js+" / State: "+n.jr),console.info("Response headers:",n.jh),console.info("Response text:",n.jt)),n.rjsm&&console.info("RJS MODULES: "+n.rjsm),n.rjsp&&console.info("RJS MAP: "+n.rjsp),n.es&&console.info("STACK: "+n.es)}},getHtmlHistory:function(){var e=t("div","debug-js-console",{margin:"10px 0",border:"2px solid #000",background:"#ddd",padding:"5px 10px",fontFamily:"monospace",fontSize:"12px",lineHeight:1.3,color:"#000"}),n=this.getHistory();if(0===n.length)return e;for(var o=0;o<n.length;o++)log=n[o],this._addHtml(e,new Date(log.t),log.x,log.a,"undefined"!=typeof log.js&&log,("undefined"!=typeof log.eu||"undefined"!=typeof log.rjsp||"undefined"!=typeof log.rjsm)&&log);return e},logRJS:function(e){var t={};t.u=(e.fileName||"Unknown file")+(e.lineNumber?":"+e.lineNumber:""),"number"==typeof e.columnNumber?t.u+=":"+e.columnNumber:"number"==typeof e.colNumber&&(t.u+=":"+e.colNumber);var n=e.message||"Unknow error";if(console.error("RJS "+e.requireType.toUpperCase()+' ERROR: "'+n+'" in '+t.u),"undefined"!=typeof e.requireMap){try{t.rjsp=JSON.stringify(e.requireMap)}catch(o){}console.info(e.requireMap)}null!==e.requireModules&&"object"==typeof e.requireModules&&(t.rjsm=e.requireModules.join("\n"),console.info(t.rjsm)),"string"==typeof e.stack&&(t.s=e.stack.split(window.location.protocol+"//"+window.location.hostname).join(""),console.error(e.stack)),this.log(n,"RJS "+e.requireType+" error",null,t)},log:function(t,n,o,i){if("cookie"!==e.type||this.is_debug){this._read();var r={};r.t=(new Date).getTime(),r.x=t,r.a=n,o&&(r.js=o.status,r.jr=o.readyState,r.jh=o.getAllResponseHeaders(),r.jt=o.responseText.substr(0,1e3)),i&&(r.eu=i.u,i.s&&(r.es=i.s),i.rjsm&&(r.rjsm=i.rjsm),i.rjsp&&(r.rjsp=i.rjsp)),r.s=1e4;try{r.s=JSON.stringify(r).length}catch(s){}this.logs.unshift(r),this._cleanLogs(),e.set("logs",this.logs,"debugconsole")}},print:function(e,t,n,o){if(this.log(e,t,n,o),this.is_debug){this._getNode();var i=!1;n&&(i.js=n.status,i.jr=n.readyState,i.jh=n.getAllResponseHeaders(),i.jt=n.responseText);var r=!1;o&&(r.eu=r.u,o.s&&(r.es=o.s),o.rjsm&&(r.rjsm=o.rjsm),o.rjsp&&(r.rjsp=o.rjsp)),this._addHtml(this.node,new Date,e,t,i,r)}},_addHtml:function(e,n,o,i,r,s){var a="<i>"+n.toUTCString()+":</i> <strong>"+i+"</strong> - ";s&&(a+="<strong>"),a+=o.replace(/\n/gi,"<br>"),s&&(a+="</strong> IN "+s.eu),e.appendChild(t("p",null,{padding:"0",margin:"2px 0"},a)),r&&(e.appendChild(t("p",null,{padding:"0",margin:"2px 0"},"<strong>Status: "+r.js+"</strong> / State: "+r.jr)),e.appendChild(t("p",null,{padding:"0",margin:"2px 0"},'<strong>Response headers:</strong><br><small style="font-size:10px">'+r.jh.replace("\n","<br>")+"</small>")),e.appendChild(t("p",null,{padding:"0",margin:"2px 0"},"<strong>Response text:</strong>")),e.appendChild(t("pre",null,{fontSize:"10px",margin:"2px 0",padding:"0",border:"none",maxHeight:"100px",overflowX:"hidden",overflowY:"auto"},null,r.jt))),s&&(s.rjsm&&(e.appendChild(t("p",null,{fontSize:"10px",padding:"0",margin:"2px 0"},"<strong>RJS Modules:</strong>")),e.appendChild(t("pre",null,{fontSize:"10px",margin:"2px 0",padding:"0",border:"none"},null,s.rjsm))),s.rjsp&&(e.appendChild(t("p",null,{fontSize:"10px",padding:"0",margin:"2px 0"},"<strong>RJS Map:</strong>")),e.appendChild(t("pre",null,{fontSize:"10px",margin:"2px 0",padding:"0",border:"none"},null,s.rjsp))),s.es&&((s.rjsm||s.rjsp)&&e.appendChild(t("p",null,{fontSize:"10px",padding:"0",margin:"2px 0"},"<strong>Stack trace:</strong>")),e.appendChild(t("pre",null,{fontSize:"10px",margin:"2px 0",padding:"0",border:"none"},null,s.es))))},_getNode:function(){if(this.node)return this.node;var o,i=["main","content","page"],r=0;do{o=document.getElementById(i[r]),r++}while(!o&&r<i.length);o||(o=document.getElementsByTagName("body")[0]);var s=t("div","debug-js-console",{margin:"10px 0",border:"2px solid #000",background:"#ddd",padding:"5px 10px",fontFamily:"monospace",fontSize:"12px",lineHeight:1.3,color:"#000"},'<h4 style="font-weight:bold;font-size:15px;font-family:sans-serif;padding:0;text-decoration:underline;margin:0 0 10px" id="debug-js-console-title">Console</h4>\n<div class="debug-content"></div>\n<div style="font-size:12px;font-weight:bold;font-family:sans-serif;padding:0;margin:10px 0 0;text-align:right;text-decoration:underline"><a href="#" id="debug-js-console-close">Close console</a></div>\n');n(o,s);var a;for(var l in s.childNodes)1===s.childNodes[l].nodeType&&("debug-content"===s.childNodes[l].className&&(this.node=s.childNodes[l]),a=s.childNodes[l]);for(var l in a.childNodes)1===a.childNodes[l].nodeType&&"A"===a.childNodes[l].nodeName&&(a.childNodes[l].onclick=function(t){t.preventDefault(),s.remove(),e.set("enabled",!1,"debugconsole")});return window.xv&&xv.i18n&&xv.i18n.getCatalog("front",function(){var e=document.getElementById("debug-js-console-title");e&&(e.innerHTML=xv.i18n.__("debug.console"));var t=document.getElementById("debug-js-console-close");t&&(t.innerHTML=xv.i18n.__("debug.close_console"))}),this.node}},window.xv||(window.xv={}),window.xv.console=new o}(),function(){window.xv||(window.xv={});var e={};"object"==typeof window.xv.utils&&(e=window.xv.utils),e.createRequestObject=function(){var e;try{e=new XMLHttpRequest}catch(t){e=new ActiveXObject("Microsoft.XMLHTTP")}return e},e.loadScript=function(e,t,n){var o,i=document.getElementsByTagName("head")[0];"string"==typeof e&&(e=[e]);for(var r in e){if(o=document.createElement("script"),o.type="text/javascript","object"==typeof t)for(var s in t)t.hasOwnProperty(s)&&(o[s]=t[s]);if("object"==typeof n)for(var a in n)n.hasOwnProperty(a)&&xv.dom.addEventListener(o,a,n[a]);i.appendChild(o),o.src=e[r]}};var t;e.getStaticDomain=function(){return"string"==typeof t?t:t="object"==typeof xv&&"object"==typeof xv.conf&&xv.conf.domains&&xv.conf.domains["static"]?xv.conf.domains["static"].replace(/^https?:\/\//i,""):"static-"+(-1!==(" "+document.cookie+";").indexOf(" hexavid_static=l3;")?"l3":"hw")+".xvideos.com"},e.escape=function(e,t){var n=document.createElement("div");return n.appendChild(document.createTextNode(e)),t?n.innerHTML.replace(/"/g,"&quot;").replace(/'/g,"&apos;"):n.innerHTML},e.unescape=function(e){var t=document.createElement("div");return t.innerHTML=e,0===t.childNodes.length?"":t.childNodes[0].nodeValue},e.indexOf=function(e,t,n){if(Array.prototype.indexOf)return e.indexOf(t,n||0);for(var o=n||0,i=e.length;o<i;o++)if(e[o]===t)return o;return-1},e.inArray=function(e,t){for(var n=0,o=e.length;n<o;n++)if(e[n]===t)return!0;return!1},e.arraySum=function(e){for(var t=0,n=0,o=e.length;n<o;n++)t+=e[n];return t},e.objLength=function(e){var t=0;for(var n in e)"undefined"!=typeof e[n]&&t++;return t};var n=window.xv.storage,o=n.get("nb_tabs_opened","xvutils")<=0;window.addEventListener&&(n.set("nb_tabs_opened",n.get("nb_tabs_opened","xvutils")+1,"xvutils"),window.addEventListener("beforeunload",function(){n.set("nb_tabs_opened",Math.max(n.get("nb_tabs_opened","xvutils")-1,0),"xvutils")})),e.getNbTabsOpened=function(){return n.get("nb_tabs_opened","xvutils")+0},e.isFirstPage=function(){return o},window.xv.utils=e}(),function(){var e={};e.getChildren=function(e,t){var n=[];for(var o in e.childNodes)1!==e.childNodes[o].nodeType||!t&&"SCRIPT"===e.childNodes[o].nodeName||n.push(e.childNodes[o]);return n},e.getChildrenRecursive=function(e){var t=[];for(var n in e.childNodes)if(1===e.childNodes[n].nodeType){var o=this.getChildrenRecursive(e.childNodes[n]);for(var i in o)t.push(o[i]);t.push(e.childNodes[n])}return t},e.getFirstChild=function(e){for(var t in e.childNodes)if(1===e.childNodes[t].nodeType)return e.childNodes[t]},e.getPreviousSibling=function(e){if(e.previousElementSibling)return e.previousElementSibling;do{e=e.previousSibling}while(e&&1!==e.nodeType);return e},e.getNextSibling=function(e){if(e.nextElementSibling)return e.nextElementSibling;do{e=e.nextSibling}while(e&&1!==e.nodeType);return null},e.hasClass=function(e,t){return-1!==(" "+e.className+" ").indexOf(" "+t+" ")},e.addClass=function(e,t){if(-1===(" "+e.className+" ").indexOf(" "+t+" "))return e.className=e.className+" "+t,e},e.removeClass=function(e,t){if(void 0===t||0===t.length)return e.className="",e;for(var n=" "+e.className+" ",o=t.split(" "),i=0;i<o.length;i++)t=o[i],0!==t.length&&(n=n.replace(" "+t+" "," "));return e.className=n.substring(1,n.length),e},e.addEventListener=function(e,t,n){return e.addEventListener?(e.addEventListener(t,n,!1),!0):e.attachEvent?e.attachEvent("on"+t,n):(t="on"+t,"function"==typeof e[t]&&(n=function(e,t){return function(){e.apply(this,arguments),t.apply(this,arguments)}}(e[t],n)),e[t]=n,!0)};var t;e.getViewportWidth=function(){return"inner"===t||"undefined"!=typeof window.innerWidth?(t="inner",window.innerWidth):"documentElement"===t||"undefined"!=typeof document.documentElement&&"undefined"!=typeof document.documentElement.clientWidth&&0!=document.documentElement.clientWidth?(t="documentElement",document.documentElement.clientWidth):document.getElementsByTagName("body")[0].clientWidth},e.getViewportHeight=function(){return"inner"===t||"undefined"!=typeof window.innerWidth?(t="inner",window.innerHeight):"documentElement"===t||"undefined"!=typeof document.documentElement&&"undefined"!=typeof document.documentElement.clientWidth&&0!=document.documentElement.clientWidth?(t="documentElement",document.documentElement.clientHeight):document.getElementsByTagName("body")[0].clientHeight},e.scrollToTop=function(e){void 0===e&&(e=0),window.jQuery?$("html, body").animate({scrollTop:e},"slow"):(document.getElementsByTagName("body")[0].scrollTop=e,document.getElementsByTagName("html")[0].scrollTop=e)},window.xv||(window.xv={}),window.xv.dom=e}(),function(){var var_regexp=/%\w+%/g,is_IE_lte_9=/MSIE\s/.test(navigator.userAgent)&&parseFloat(navigator.appVersion.split("MSIE")[1])<10,load_handlers={},clean_loc=function(e){return e=e.replace(/\s+/,""),(2===e.length||5===e.length)&&(!!e.match(/^[a-z]{2}(-[A-Z]{2})?$/g)&&e)},get_locale=function(){if("object"==typeof xv&&"object"==typeof xv.conf&&"object"==typeof xv.conf.dyn&&"string"==typeof xv.conf.dyn.locale){var e=clean_loc(xv.conf.dyn.locale);if(e)return e}if(document.documentElement&&document.documentElement.lang&&"string"==typeof document.documentElement.lang){var e=clean_loc(document.documentElement.lang);if(e)return e}return"en"},jsonParse=function(text){return"undefined"!=typeof JSON&&"function"==typeof JSON.parse?JSON.parse(text):eval("("+text+")")},get_version_path=function(e,t){return"object"!=typeof xv||"object"!=typeof xv.conf||"object"!=typeof xv.conf.dyn||"object"!=typeof xv.conf.dyn.i18nvers?"":"object"!=typeof xv.conf.dyn.i18nvers[e]||"string"!=typeof xv.conf.dyn.i18nvers[e][t]?"":"/v-"+xv.conf.dyn.i18nvers[e][t]},load_translations=function(e,t,n){var o=!1,i=get_version_path(t,e);load_handlers[e+"_"+t]=n;try{if(is_IE_lte_9)xv.utils.loadScript(window.location.protocol+"//"+xv.utils.getStaticDomain()+i+"/v3/js/i18n/"+t+"/"+("en"===e?"english":e)+".js");else{var r=xv.utils.createRequestObject();r.open("GET",window.location.protocol+"//"+xv.utils.getStaticDomain()+i+"/v3/js/i18n/"+t+"/"+("en"===e?"english":e)+".json"),r.onreadystatechange=function(e){4==r.readyState&&(200==r.status&&"string"==typeof(o=r.responseText)&&(o=jsonParse(o)),n(o))},r.send(null)}return}catch(s){if(console.error(s.toString()),!is_IE_lte_9)try{xv.utils.loadScript(window.location.protocol+"//"+xv.utils.getStaticDomain()+i+"/v3/js/i18n/"+t+"/"+("en"===e?"english":e)+".js")}catch(s){console.error(s.toString())}}n(o)},strtr_val=function(e,t,n,o){if(!t){if(!n)return e.split("_").join(" ");t=n}return"object"==typeof o&&(t=t.replace(var_regexp,function(e){return"string"==typeof o[e]?o[e]:e})),t},flatten_val=function(e,t){var n=null,o={},i=!1;for(var r in e)e.hasOwnProperty(r)&&("$0"===r?n=strtr_val(r,e[r],null,t):"object"==typeof e[r]?(o[r]=flatten_val(e[r],t),i=!0):(o[r]=strtr_val(r,e[r],null,t),i=!0));return i?o:n},i18n_catalog=function(e,t){this.trs={},this.catalog=e,this.locale=t,this.status="not_loaded",this._on_loaded=[]};i18n_catalog.prototype={getCatalog:function(){return this.catalog},getLocale:function(){return this.locale},getStatus:function(){return this.status},isLoaded:function(){this.status},load:function(e){if("loaded"===this.status)return"function"==typeof e&&e(this),!0;if("#"===this.catalog)return this.status="loaded","function"==typeof e&&e(this),!0;if("function"==typeof e&&this._on_loaded.push(e),"loading"===this.status)return-1;this.status="loading";var t=this;return load_translations(this.locale,this.catalog,function(e){if("object"!=typeof e){console.log("i18n: Cannot load "+t.locale+" translations for catalog "+t.catalog+"."),"en"!==t.locale&&load_translations("en",t.catalog,function(e){"object"==typeof e?(console.log("i18n: Loaded en translations either."),t.trs=e):console.log("i18n: Cannot load en translations either."),t.status="loaded";for(var n in t._on_loaded)t._on_loaded[n](t)}),t.status="loaded";for(var n in t._on_loaded)t._on_loaded[n](t)}else{t.status="loaded",t.trs=e;for(var n in t._on_loaded)t._on_loaded[n](t)}}),-1},__:function(e,t,n){if("loaded"!==this.status)return this.load(),strtr_val(e.split(".").pop(),!1,n,t);var o=e.split("."),i=this.trs;for(var r in o){if("*"===o[r])return flatten_val(i,t);if("object"!=typeof i[o[r]])return strtr_val(o.pop(),!1,n,t);i=i[o[r]]}return"string"!=typeof i.$0?strtr_val(o.pop(),!1,n,t):strtr_val(e,i.$0,n,t)},___:function(e){var t={};for(var n in e)e.hasOwnProperty(n)&&(t[n]=this.__(n,e[n]));return t}};var i18n=function(){this.catalogs={},this.locale=!1,this.default_catalog=!1};i18n.prototype={getLocale:function(){return this.locale||(this.locale=get_locale()),this.locale},setDefaultCatalog:function(e,t){this.default_catalog=e,(void 0===t||t)&&this.getCatalog(e)},getCatalog:function(e,t){return void 0!==e&&e||(this.default_catalog||(console.error("i18n: No default catalog defined"),this.default_catalog="#"),e=this.default_catalog),this.getLocale(),"undefined"==typeof this.catalogs[e]&&(this.catalogs[e]=new i18n_catalog(e,this.locale)),this.catalogs[e].load(t),this.catalogs[e]},__:function(e,t,n,o){return this.getCatalog(n).__(e,t,o)},___:function(e,t){return this.getCatalog(t).__(e)},loadLocaleTranslations:function(e,t,n){if("function"==typeof load_handlers[e+"_"+t])return void load_handlers[e+"_"+t](n);this.getLocale(),"undefined"==typeof this.catalogs[t]&&(this.catalogs[t]=new i18n_catalog(t,this.locale)),"not_loaded"!==this.catalogs[t].getStatus()&&console.warn("i18n: Catalog "+t+" is already being loaded"),this.catalogs[t].status="loaded",this.catalogs[t].trs=n}},window.xv.i18n=new i18n}(),xv.i18n.setDefaultCatalog("info"),function(){window.onSearchSubmit=function(e){var t=document.getElementById("faq-search-term").value;if(t.length<=3)return window.alert(xv.utils.unescape(xv.i18n.__("validation.input_too_short",{"%value%":'"'+t+'"',"%nb_chars%":"3"}))),!1;var n=e.action,o=n.lastIndexOf("/");return e.action=n.substr(0,o+1)+encodeURIComponent(t),e.submit(),!0},window.faqResultSwitchLang=function(e,t,n){document.getElementById("faq-search-result-"+e+"_"+n).style.display="none",document.getElementById("faq-search-result-"+e+"_"+t).style.display="block"};!function(){var e=document.getElementById("faq-tabs");if(e){var t,n=xv.dom.getChildren(e),o=xv.dom.getChildren(n[0]),i={},r=function(e){e!==t&&(xv.dom.removeClass(i[t].nav,"active"),xv.dom.removeClass(i[t].pane,"active"),xv.dom.addClass(i[e].nav,"active"),xv.dom.addClass(i[e].pane,"active"),t=e)};for(var s in o){var a=o[s];if(!xv.dom.hasClass(a,"no-tab")){var l=xv.dom.getFirstChild(a).getAttribute("href").substr(1),d=document.getElementById(l);i[l]={nav:a,pane:d},t||(t=l),function(e,t){xv.dom.addEventListener(e,"click",function(e){r(t),window.location.hash="#_"+t,e.preventDefault?e.preventDefault():e.returnValue=!1})}(a,l)}}var c=window.location.hash;"string"==typeof c&&c.length>2&&"object"==typeof i[c.substr(2)]&&r(c.substr(2))}}()}();