/*! Team:2014-06-25 6:10:01 PM */
!function(e){function t(e){e=u({},e||{},this.config),e.isAuto=!1;var t,r;try{if((r=e.globalParam)&&d(r))for(var n in r)if(t=r[n],"string"==typeof t)t in w&&(r[n]=w[t]()),/\s*cookie-(\w+)\s*/gi.test(t)&&(r[n]=o(RegExp.$1||""));else{if(s(t))continue;f(t)&&(r[n]=t[0])}this.delegateHref(e.pingback_container,e)}catch(i){}}function r(t,r){var n=this,i=function(t){t=a.getEvent(t);var i,o,u=a.getTarget(t),c=!1,s=r.type,p=b[s];try{if("string"==typeof r.delegatePattern){for(;u&&!(c="a"===u.nodeName.toLowerCase()&&u.getAttribute&&(o=u.getAttribute(r.delegatePattern)));)u=u.parentNode;if(!c)return;r.urlTempl=o,i=n.processHrefUrl(r,u);for(var f=0;f<i.length;f++)p(i[f])}}catch(d){e.console&&console.log(d.stack)}};if(t)a.addEventListener(t,r.actionType,i);else var o=setInterval(function(){return document.body?(clearInterval(o),a.addEventListener(document.body,r.actionType,i),void 0):!1},25);return r}function n(e,t,r){for(var n,i,a,u,c,p,d=e.urlTempl.split("$$"),l=[],g=[],m=e.customParam,v=0,b=d.length;b>v;v++){if(e.customParam){if(d[v]in m&&(c=[],a=m[d[v]],n=a.url)){for(var y in a)if("url"!=y)if(u=a[y],"string"==typeof u){if(u in w){c.push(y+"="+w[u]());continue}if(p=/\s*cookie-(\w+)\s*/gi.exec(u)){c.push(y+"="+o(p[1]||""));continue}if(p=/\s*key-(\w+)\s*/gi.exec(u)){c.push(y+"="+w[p[1]](r));continue}if(p=/\s*callback-(.+)\s*/gi.exec(u)){var k=h(p[1]);s(k)&&c.push(y+"="+k(e,t,r));continue}c.push(y+"="+u)}else s(u)?c.push(y+"="+u(e,t)):f(u)&&c.push(y+"="+u[0]);n+="?"+c.join("&")}}else if(n=d[v].replace(/\{[^\}]+\}/g,function(r){var n=r.replace(/(^\{\s*)|(\s*\}$)/g,"");return n in w?w[n]():/\s*cookie-(\w+)\s*/gi.test(n)?o(RegExp.$1||""):n in e.processFunc?e.processFunc[n](e,t):""}),i=e.globalParam){var u;for(var T in i)s(u=i[T])?g.push(T+"="+u(e,t)):g.push(T+"="+u);n+=-1===n.indexOf("?")?"?":"&",n+=g.join("&")}l.push(n)}return l}function i(e){e=u({tag:"a",plus:"pb-plus",minus:"pb-minus"},e||{},this.config);var t=this,r=function(r){function n(){for(var t=o,r=!1;t&&!(r=(t.nodeName.toLowerCase()===e.tag||t.getAttributeNode&&t.getAttributeNode(e.plus))&&!(t.getAttributeNode&&t.getAttributeNode(e.minus)));)t=t.parentNode;return r?t:void 0}r=a.getEvent(r);var i,o=a.getTarget(r),u=!1,c=e.type,s=b[c];if(o=n()){for(var p;o&&!(u=o.getAttribute&&(p=o.getAttribute(e.delegatePattern)));)o=o.parentNode;if(!u)return;e.urlTempl=p;try{i=t.processHrefUrl(e,o)}catch(f){}for(var d=0;d<i.length;d++)s(i[d])}},n=setInterval(function(){return document.body?(clearInterval(n),a.addEventListener(document.body,e.actionType,r),void 0):!1},25);return e}var a={addEventListener:function(e,t,r){e&&t&&r&&(e.addEventListener?e.addEventListener(t,r):e.attachEvent?e.attachEvent("on"+t,r):e["on"+t]=r)},removeEventListener:function(e,t,r){e&&t&&r&&(e.removeEventListener?e.removeEventListener(t,r):e.detachEvent?e.detachEvent("on"+t,r):e["on"+t]=null)},getEvent:function(t){return t?t:e.event},getTarget:function(e){return e.target||e.srcElement}},o=function(e,t,r){if("undefined"==typeof t){var n=new RegExp("(?:^|; )"+e+"=([^;]*)").exec(document.cookie);return n?n[1]||"":""}r=r||{},null===t&&(t="",r.expires=-1);var i="";if(r.expires&&("number"==typeof r.expires||r.expires.toUTCString)){var a;"number"==typeof r.expires?(a=new Date,a.setTime(a.getTime()+24*r.expires*60*60*1e3)):a=r.expires,i="; expires="+a.toUTCString()}var o=r.path?"; path="+r.path:"",u=r.domain?"; domain="+r.domain:"",c=r.secure?"; secure":"";document.cookie=[e,"=",t,i,o,u,c].join("")},u=function(e,t,r){if(r&&u(e,r),e&&t)for(var n in t)e[n]=t[n];return e},c=Object.prototype.toString,s=function(e){return e&&"[object Function]"===c.call(e)},p=function(e){return e&&"[object String]"===c.call(e)},f=function(e){return e&&"[object Array]"===c.call(e)},d=function(e){return e&&"[object Object]"===c.call(e)},l=navigator.userAgent,g=!!e.ActiveXObject,m=g&&!e.XMLHttpRequest,v=l.indexOf("msie 7")>-1,h=(l.indexOf("msie 7")>-1,function(t){if(!~t.indexOf("."))return e[t];t=t.split(".");for(var r,n,i=0,a=t.length,o=e;r=t[i];)i===a-2&&(n=o[r]),o=o[r],i++;return function(){return o.apply(n,arguments)}}),b={iframe:function(e){var t=document.createElement("iframe");t.src=e,t.width=1,t.height=1,t.style.display="none",document.getElementsByTagName("body")[0].appendChild(t)},img:function(e){var t=new Image;t.onload=t.onerror=t.onabort=function(){t=null},t.src=e}},y={replaceStamp:function(e){return(e||"").replace(/({\s*stamp\s*})/gi,function(){return(new Date).getTime()})},replaceRandom:function(e){return(e||"").replace(/({\s*random\s*})/gi,function(){return 1e13*Math.random()})},replaceLocation:function(t){return(t||"").replace(/({\s*location\s*})/gi,function(){return escape(e.location.href)})},replaceCookie:function(e){return(e||"").replace(/({\s*cookie-(\w+)\s*})/gi,function(e,t,r){return o(r||"")})},replaceRefer:function(e){return(e||"").replace(/({\s*refer\s*})/gi,function(){return escape(document.referrer)})}},k={url:function(){return escape(location.href)},refer:function(){return escape(document.referrer)},fuid:function(){return o("fuid")},yyid:function(){return o("YYID")},sid:function(){return o("SUV")},idBridge:function(e,t,r,n){var i=n[n.attr][t.index];if(!t.pingbackTime)return this["ref"+e]();switch(e){case"vid":return i.id;case"pid":return i.playlistId;case"cid":return i.cid}},vid:function(e,t,r){return this.idBridge("vid",e,t,r)},pid:function(e,t,r){return this.idBridge("pid",e,t,r)},cid:function(e,t,r){return this.idBridge("cid",e,t,r)},refvid:function(){return e.vid},refpid:function(){return e.playlistId},refcid:function(){return e.cid},msg:function(e){return e.pingbackTime?"click":"impression"},formwork:function(e){return e.formTypeMap[e.formType]},rec:function(e,t,r){return r.callback},alg:function(e,t,r){return r[r.attr][e.index].r},ab:function(e,t,r){var n=r[r.attr][e.index];return e.pingbackTime?n.ab:r.pingback_ab},index:function(e){return e.index},uuid:function(){var t;return t=e.pingback_uuid?e.pingback_uuid:e.pingback_uuid=(new Date).getTime()},passport:function(){return sohuHD&&sohuHD.passport?sohuHD.passport.getPassport():void 0},Lb:function(){return o("pagelianbo")},type:function(e,t,r){return e.pageTypeMap[r.pingback_type]},v:function(){return"maybelike_"+e.cid+"_v20130829"},checkForm:function(e){if(e.checkForm)return e.checkForm;for(var t,r,n=e;e&&"ul"!=e.nodeName.toLowerCase();)e=e.parentNode;for(e=e.parentNode.previousSibling;e&&1!=e.nodeType;)e=e.previousSibling;return t=e.innerHTML,t.indexOf("\u4f60\u6216\u8bb8\u559c\u6b22")>0?r=20:t.indexOf("\u76f8\u5173\u63a8\u8350")>0?r=21:t.indexOf("\u731c\u4f60\u559c\u6b22")>0&&(r=22),n.checkForm=r,r}},T={},x={dataMap:{},config:{pageTypeMap:{play:100,album:200,base:300},formTypeMap:{a:20,b:21,c:22,h:100},pingbackTime:0,isAuto:!0,clickParamMap:{url:1,refer:1,fuid:1,yyid:1,passport:1,sid:1,vid:1,pid:1,cid:1,refvid:1,refpid:1,refcid:1,msg:1,formwork:1,alg:1,ab:1,Lb:1,v:1,index:1,uuid:1,type:1},impressParamMap:{url:1,refer:1,fuid:1,yyid:1,passport:1,sid:1,vid:1,pid:1,cid:1,msg:1,formwork:1,rec:1,ab:1,Lb:1,v:1,uuid:1,type:1},targetUrl:["http://click.hd.sohu.com.cn/r.gif","http://ctr.hd.sohu.com/ctr.gif"],type:"img",delegatePattern:"pb-url",actionType:"click",processUrl:function(e,t,r){e=e||"";for(var n in y)s(y[n])&&(e=y[n](e,t,r));return e},newProcessUrl:function(e,t,r){var n,i,a=[],o=[],u=(new Date).getTime();if(e.pingbackTime){for(var c in e.clickParamMap)"function"==typeof e.clickParamMap[c]?n=e.clickParamMap[c](e,t,r):(i=k[c])&&(n=i.call(k,e,t,r)||"",n=i.call(k,e,t,r),"undefined"==typeof n&&(n="")),a.push(c+"="+n);for(var s=0;s<e.targetUrl.length;s++)o.push(e.targetUrl[s]+"?"+a.join("&")+"&_="+u)}else{for(var c in e.impressParamMap)"function"==typeof e.impressParamMap[c]?n=e.impressParamMap[c](e,t,r):(i=k[c])&&(n=i.call(k,e,t,r),"undefined"==typeof n&&(n="")),a.push(c+"="+n);for(var s=0;s<e.targetUrl.length;s++)o.push(e.targetUrl[s]+"?"+a.join("&")+"&_="+u)}return o}},init:function(e,t,r){T=u({},r||{},this.config),"undefined"!=typeof r&&r.overwrite_url_map&&("undefined"!=typeof r.common_map&&(u(T.clickParamMap,r.common_map),u(T.impressParamMap,r.common_map)),"undefined"!=typeof r.click_map&&u(T.clickParamMap,r.click_map),"undefined"!=typeof T.impress_map&&u(T.impressParamMap,r.impress_map));var n=b[T.type];T.pingbackTime=0,T.formType=e,this.dataMap[e]=t,this.delegate(t.pingback_container,T,t);try{urls=T.newProcessUrl(T,null,t);for(var i=0;i<urls.length;i++)n(urls[i])}catch(a){}},pushProcessURLFn:function(){var e=[].slice.call(arguments);2==e.length&&p(e[0])?y[e[0]]=e[1]:"1"==e.length&&"object"==typeof e[0]&&u(y,e[0])},checkIndex:function(e){if(e.checkIndex)return e.checkIndex;for(var t=0,r=e;e&&"li"!=e.nodeName.toLowerCase();)e=e.parentNode;for(;e&&e.previousSibling;)e=e.previousSibling,t++;return r.checkIndex=t,t},delegate:function(e,t,r){var n=this,i=function(e){e=a.getEvent(e);var i,o=a.getTarget(e),u=!1,c=t.type,s=b[c];try{for(;o&&!(u="a"==o.nodeName.toLowerCase());)o=o.parentNode;if(!u||o.getAttribute("disable-pingback"))return;t.pingbackTime=1,t.index=o.getAttribute("index")||n.checkIndex(o),i=t.newProcessUrl(t,o,r);for(var p=0;p<i.length;p++)s(i[p])}catch(f){console&&console.log(f.stack)}};return a.addEventListener(e,t.actionType,i),t},removeDelegate:function(e){e=e||{},e.container&&e.actionType&&e.handler&&a.removeEventListener(e.container,e.actionType,e.handler)},switchPbType:function(e){e=e||"impress",T.pingbackTime="impress"==e?0:1},ping:function(){for(var e=T.newProcessUrl(T,null,this.dataMap[T.formType]),t=0;t<e.length;t++)b[T.type](e[t])}};e.pingbackBundle=x;var w={stamp:function(){return(new Date).getTime()},staticstamp:function(){if(this.stampNum)return this.stampNum;var e=this.stampNum=(new Date).getTime();return e},url:function(){return escape(location.href)},refer:function(){return escape(document.referrer)},passport:function(){return sohuHD&&sohuHD.passport?sohuHD.passport.getPassport():void 0},random:function(){return 1e13*Math.random()},domHref:function(e){return e.href}};x.initHref=t,x.delegateHref=r,x.processHrefUrl=n,x.initBlock=i,function(){var t={tag:"a",plus:"pb-plus",minus:"pb-minus",delegatePattern:"npb",type:"img",actionType:"click",defaultUrl:"http://www.sohu.com"},r=function(r){function i(){for(var e=c,r=!1;e&&!(r=(e.nodeName.toLowerCase()===t.tag||e.getAttributeNode&&e.getAttributeNode(t.plus))&&!(e.getAttributeNode&&e.getAttributeNode(t.minus)));)e=e.parentNode;return r?e:void 0}e.pingbackConfig&&u(t,pingbackConfig),r=a.getEvent(r);var o,c=a.getTarget(r),s=!1,p=t.type,f=b[p];if(c=i()){for(var d,l=c;c&&!(s=c.getAttributeNode&&c.getAttributeNode(t.delegatePattern+"-txid"));)c=c.parentNode;if(!s)return;var g,h,y,k,T=c.attributes,x=new RegExp("^"+t.delegatePattern+"(\\d*)-(.+$)"),w=0,P={},d=[];if(d[0]="default",P["default"]={url:"http://pv.hd.sohu.com/lm.gif",fuid:"cookie-fuid",refer:"key-refer",vid:"",sid:"cookie-sid",curl:"key-domHref"},m||v)for(var w in T)(k=x.exec(w))&&(g=T[w],""===k[1]&&(k[1]="default"),h=k[1],P[h]||(P[h]={},d.push(h)),y=g.nodeValue,"url"!=k[2]||y?P[h][k[2]]=y:P[h].url=t.defaultUrl);else for(;g=T[w];)(k=x.exec(g.nodeName))&&(""===k[1]&&(k[1]="default"),h=k[1],P[h]||(P[h]={},d.push(h)),y=g.nodeValue,"url"!=k[2]||y?P[h][k[2]]=y:P[h].url=t.defaultUrl),w++;var N=P["default"];if(N.url.indexOf("$$")>-1){var E,L,o=N.url.split("$$"),M=0;for(N.url=o[0];E=o[M];)M>0&&(L=u({},N),L.url=E,P["default"+M]=L,d.push("default"+M)),M++}t.urlTempl=d.join("$$"),t.customParam=P;try{o=n(t,c,l)}catch(A){}for(var w=0;w<o.length;w++)f(o[w])}};setTimeout(function(){if(e.pingbackInit)var n=setInterval(function(){return document.body?(clearInterval(n),a.addEventListener(document.body,t.actionType,r),void 0):!1},25)},100)}()}(window);