(function(a){var c,b,e=a.document;if(typeof BMR==="undefined"){BMR={};}if(BMR.v){return;}c={v:"t7",cN:"BMR=",bU:"",loaded:false,aL:function(f,d){if(a.addEventListener){a.addEventListener(f,d,false);}else{if(a.attachEvent){a.attachEvent("on"+f,d);}}},sT:function(){c.sC({s:new Date().getTime(),r:e.URL.replace(/#.*/,""),r2:e.referrer.replace(/#.*/,"")});},nT:function(){var u=[];if(typeof window.performance!="undefined"){var Q=window.performance;var o=Q.timing;var K=Q.navigation;var t=o.navigationStart;var j=K.type;var z=o.fetchStart;var g=o.domainLookupStart;var i=o.domainLookupEnd;var H=o.connectStart;var y=o.connectEnd;var k=o.requestStart;var s=o.responseStart;var D=o.responseEnd;var O=K.redirectCount;var x=o.domLoading;var F=o.domInteractive;var E=o.domContentLoadedEventStart;var p=o.domContentLoadedEventEnd;var f=o.domComplete;var v=o.loadEventStart;var I=o.loadEventEnd;var N=i-g;var P=y-H;var C=s-k;var B=D-s;var q=F-x;var m=E-F;var r=f-p;var w=v-D;if(I>0){var G=I-v;}else{var G=0;}var A;var M;if(I>0){A=I;}else{A=v;}if(t>0){M=t;}else{M=z;}var L=A-M;var h=D-M;var J=j;u.push("l="+L);u.push("d="+N);u.push("c="+P);u.push("rq="+C);u.push("rs="+B);u.push("nc="+h);u.push("di="+q);u.push("dl="+m);u.push("dc="+r);u.push("pc="+w);u.push("le="+G);u.push("n="+J);}else{return false;}return u.join("&");},eU:function(d){return encodeURIComponent(d);},sC:function(f){var g="",d;for(d in f){if(f.hasOwnProperty(d)){g+="&"+c.eU(d)+"="+c.eU(f[d]);}}g=g.replace(/^&/,"");e.cookie=c.cN+g+"; path=/; domain="+a.location.hostname.replace(/.*?([^.]+\.[^.]+)\.?$/,"$1").toLowerCase();},gC:function(){var h,g=e.cookie+";",f,d,k,j={};if(!((h=g.indexOf(c.cN))>=0)){return null;}h+=c.cN.length;f=g.substring(h,g.indexOf(";",h)).split("&");if(f.length===0){return null;}for(h=0,d=f.length;h<d;h++){k=f[h].split("=");k.push("");j[decodeURIComponent(k[0])]=decodeURIComponent(k[1]);}return j;},run:function(f){if(!f){f=(a.location.protocol?a.location.protocol:"http:")+"//sp.naver.com/sp";}var d=function(){if(c.sT){c.sT.call();}c.sT=null;};c.bU=f;if("onpagehide" in a){c.aL("pagehide",d);}else{c.aL("unload",d);c.aL("beforeunload",d);}c.aL(("onpageshow" in a)?"pageshow":"load",c.done);},done:function(){var j=new Date().getTime(),m,l=0,k=[],f="",i=e.URL.replace(/#.*/,""),d=r2=e.referrer.replace(/#.*/,""),h=c.gC(),g=c.nT();c.loaded=true;c.sC({});k.push(c.bU+"?v="+c.v);if(h!=null){d=h.r;if(d==r2&&(d!=h.r2||d!=i)){l=1;}}if(l==1){m=j-parseInt(h.s,10);k.push("t="+m);}if(g){k.push(g);}k.push("u="+c.eU(i));k.push("r="+c.eU(d));if(l==1||g){c.sendBeacon(k);}},sendBeacon:function(d){var f=new Image();f.src=d.join("&");f.onload=function(){f.onload=null;};}};for(b in c){if(c.hasOwnProperty(b)){BMR[b]=c[b];}}}(window));