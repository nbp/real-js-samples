!function(e){function t(o){if(n[o])return n[o].exports;var r=n[o]={exports:{},id:o,loaded:!1};return e[o].call(r.exports,r,r.exports,t),r.loaded=!0,r.exports}var n={};return t.m=e,t.c=n,t.p="",t(0)}([function(e,t,n){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}function r(e,t){window.parent.postMessage(JSON.stringify({type:e,content:t}),"*")}var i=n(2),c=o(i);window.__saveUserId=function(e){c.default.set("userId",e)},window.iframeStartup=function(){window.parent!==window||window.__testMode__?(window.addEventListener("message",function(e){if(e.data){var t=void 0;try{t=JSON.parse(e.data)}catch(e){console&&console.log&&console.log("error parse ",e)}if(t&&t.type)switch(t.type){case"setBucUserId":c.default.set("userId",t.content,{domain:".alipay.com"}),r("getBucUserId",t.content);break;case"getBucUserId":r("getBucUserId",c.default.get("userId",{domain:".alipay.com"}))}}},!1),window.onload=function(){var e=c.default.get("userId",{domain:".alipay.com"});r("iframOnload"),r("getBucUserId",e||null)}):console.log("DO NOT OPEN ME DIRECTLY!")}},,function(e,t,n){var o,r;!function(i){var c=!1;if(o=i,r="function"==typeof o?o.call(t,n,t,e):o,!(void 0!==r&&(e.exports=r)),c=!0,e.exports=i(),c=!0,!c){var a=window.Cookies,s=window.Cookies=i();s.noConflict=function(){return window.Cookies=a,s}}}(function(){function e(){for(var e=0,t={};e<arguments.length;e++){var n=arguments[e];for(var o in n)t[o]=n[o]}return t}function t(n){function o(t,r,i){var c;if("undefined"!=typeof document){if(arguments.length>1){if(i=e({path:"/"},o.defaults,i),"number"==typeof i.expires){var a=new Date;a.setMilliseconds(a.getMilliseconds()+864e5*i.expires),i.expires=a}i.expires=i.expires?i.expires.toUTCString():"";try{c=JSON.stringify(r),/^[\{\[]/.test(c)&&(r=c)}catch(e){}r=n.write?n.write(r,t):encodeURIComponent(String(r)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g,decodeURIComponent),t=encodeURIComponent(String(t)),t=t.replace(/%(23|24|26|2B|5E|60|7C)/g,decodeURIComponent),t=t.replace(/[\(\)]/g,escape);var s="";for(var d in i)i[d]&&(s+="; "+d,i[d]!==!0&&(s+="="+i[d]));return document.cookie=t+"="+r+s}t||(c={});for(var u=document.cookie?document.cookie.split("; "):[],l=/(%[0-9A-Z]{2})+/g,f=0;f<u.length;f++){var p=u[f].split("="),w=p.slice(1).join("=");this.json||'"'!==w.charAt(0)||(w=w.slice(1,-1));try{var g=p[0].replace(l,decodeURIComponent);if(w=n.read?n.read(w,g):n(w,g)||w.replace(l,decodeURIComponent),this.json)try{w=JSON.parse(w)}catch(e){}if(t===g){c=w;break}t||(c[g]=w)}catch(e){}}return c}}return o.set=o,o.get=function(e){return o.call(o,e)},o.getJSON=function(){return o.apply({json:!0},[].slice.call(arguments))},o.defaults={},o.remove=function(t,n){o(t,"",e(n,{expires:-1}))},o.withConverter=t,o}return t(function(){})})}]);