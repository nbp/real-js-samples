!function(a){function b(){return"Microsoft Internet Explorer"===a.navigator.appName&&z.test(a.navigator.userAgent)&&a.XDomainRequest}function c(c,d){var e;b()?(e=new a.XDomainRequest,e.open("get",c)):(e=new XMLHttpRequest,e.open("get",c,!0)),e.ontimeout=function(){d(new Error("Timeout getting publisher config"))},e.onerror=function(){d(new Error("Error getting publisher config"))},e.onprogress=function(){},e.onload=function(){var a={};try{a=JSON.parse(e.responseText)}catch(a){return d(new Error("Error parsing responseText "+a.message))}d(null,a)},setTimeout(function(){e.send()},0)}function d(a,b,d){if(!b)return d(new Error("No site ID provided"));var e=D[a];if(!e)return d(new Error("Missing config endpoint for environment "+a));e+="/"+b+".json",c(e,d)}function e(a,b){a.document.body?b():setTimeout(function(){e(a,b)},10)}function f(a){var b,c,d=!1;try{b=JSON.parse(localStorage.getItem("SHR_V2_OVERRIDES"))}catch(a){}return b&&b.script&&!window.SHR_OVERRIDE_MODE&&(c=document.createElement("script"),c.setAttribute("data-shr-assetbase",b.script.assetbase),c.setAttribute("data-shr-imagebase",b.script.imagebase),c.setAttribute("data-shr-fontbase",b.script.fontbase),c.setAttribute("data-shr-entrypoint",b.script.entrypoint),c.src=b.script.src,window.SHR_OVERRIDE_MODE=!0,e(a,function(){a.publisherConfigLoaded=!0,a.document.body.appendChild(c)}),d=!0),d}function g(){for(var b,c,d=a.document.getElementsByTagName("script"),e=d.length;e--;){if(c=d[e],c.hasAttribute(u))return c;x.test(c.src)&&(b=c)}return b}function h(a,b,c,d,e){function f(){h.onload=function(){var a=this.contentWindow,c=a.document.head;setTimeout(function(){t&&b.push({text:'window.settings.siteid="'+t+'";'});for(var e=0;e<b.length;e++){var f=b[e],g=a.document.createElement("script");g.type="text/javascript",f.text?g.text=f.text:f.src&&(g.src=f.src),c.appendChild(g)}setTimeout(d.bind(null,a),100),this.dataset.loaded="YES"}.bind(this),1)},h.contentWindow.document.open(),g=h.contentWindow.document;var a="https://65156d2850a2480086d4f28a20d8208e@sentry.shareaholic.com/12",c='<script>try{Raven.config("'+a+'", {sampleRate: 0.002}).install()}catch(e){}<\/script>';g.write('<!doctype html><html><head><title></title></head><body><script src="https://cdn.ravenjs.com/3.15.0/raven.min.js"><\/script>'+c+"</body></html>"),g.close()}d=d||function(){};var g,h=a.document.createElement("iframe"),i="SHR-"+Math.round(1e3*Math.random())+1;return h.id=i,c.appendChild(h),e?e(h,f):(h.style.display="none",h.frameBorder="0",setTimeout(f,1)),h}function i(){var a,b,c=!0;return"Microsoft Internet Explorer"===navigator.appName&&(a=navigator.userAgent,b=new RegExp("MSIE ([5-8]{1,}[.0-8]{0,})"),null!=b.exec(a)&&(c=!1)),c}function j(b){var c="";return b&&0!==b.indexOf("http")&&"file:"===a.location.protocol.toString()&&(c="https:"),c}function k(){var a=null;try{a=localStorage.getItem("SHR_LOCAL")}catch(a){}return a}function l(a){var b,c=a.environment||"production";return b=a.bookmarklet||k()?a.assetbase:/[0-9a-f]{5,40}/.test(A)?(a.assetbase||v[c])+A+"/":a.assetbase||v[c],j(b)+b}function m(a){var b=a.environment||"production",c=a.assetbase||v[b];return a.fontbase&&"undefined"!==a.fontbase?c=a.fontbase:/[0-9a-f]{8}/.test(B)?c+="fonts_"+B+"/":c+="fonts/",j(c)+c}function n(a){var b=a.environment||"production",c=a.assetbase||v[b];return a.imagebase&&"undefined"!==a.imagebase?c=a.imagebase:/[0-9a-f]{8}/.test(C)?c+="images_"+C+"/":c+="images/",j(c)+c}function o(a){for(var b,c,d=/^data-shr-/,e={},f=0,g=a.attributes,h=g.length;f<h;f++)c=g[f],d.test(c.nodeName)&&(b=c.nodeName.replace(d,""),e[b]=c.value);return e.entrypoint=e.entrypoint||w,e.namespace=e.namespace||y,e.fontbase=m(e),e.imagebase=n(e),e.assetbase=l(e),e}function p(b,c){function e(e){d(c.environment||"production",e,function(b,c){a.publisherConfigLoaded=!0,f(e,c||{})}),b.init=function(){},t=e}var f=b.init;c.siteid?e(c.siteid):b.init=e}function q(b,c){var d=setInterval(function(){var e=document.getElementById(b);e.attributes["data-loaded"]&&"YES"===e.attributes["data-loaded"].nodeValue&&(e.contentWindow.SHR_FRAME||(clearInterval(d),e.parentNode.removeChild(e),r(a,c)))},1500)}function r(a,b){function c(){}function d(a,b,c){a[b]=function(){var d=Array.prototype.slice.call(arguments);a.push(c.concat(d)),a[b].args=d}}var j,k={};if(!i())return{err:"NOT SUPPORTED"};if(b)E=b;else{if(!(j=g(a)))return{err:"COULD NOT LOCATE SCRIPT TAG"};j.parentNode.removeChild(j),E=o(j)}if(!E.assetbase)return{err:"NO ASSET BASE CONFIGURED"};var l=[{text:"window.SHR_FRAME = true;"},{text:"window.settings = "+JSON.stringify(E)+";"},{src:E.assetbase+E.entrypoint||"shrMain.min.js"}],m=a.document.createElement("link");return m.href=E.assetbase+E.entrypoint||"shrMain.min.js",m.rel="preload",m.as="script",a.document.head.appendChild(m),E.namespace===y&&(c.prototype.Bookmarklet=!0,c.isV2=!0,d(c,"init",["init"]),d(c,"init_bookmarklet",["share",{service:"all"}]),p(c,E),k=c),k.commands=[],k.push=function(a){k.commands.push(a)},f(a)?(k.override=!0,k):(e(a,function(){q(h(a,l,a.document.body).id,E)}),k)}var s,t,u="data-shr-assetbase",v={dev:"//spreadaholic.com:5200/app/client/public/js/",stage:"//cdn-staging-shareaholic.s3.amazonaws.com/v2/",production:"//dsms0mj1bbhn4.cloudfront.net/v2/"},w="shrMain.min.js",x=/shareaholic\.js/,y="Shareaholic",z=/MSIE 9\./,A="3692865b",B="0fc83b14",C="b98b45b9",D={dev:"https://s3.amazonaws.com/publisher_configurations.staging.shareaholic",stage:"https://d3bgaiud9mchb3.cloudfront.net",production:"https://d1zoyh6qfvajy7.cloudfront.net"},E={},F=window.SHR_NAMESPACE||y;a.publisherConfigLoaded=a.publisherConfigLoaded||!1,a.SHR_FRAME&&"function"==typeof define&&define.amd?define(function(){return h}):(s=r(a),F=E.namespace||F,"[object Array]"===Object.prototype.toString.call(a[F])?(s.commands=a[F],a[F]=s):a[F]=a[F]||s)}(this);