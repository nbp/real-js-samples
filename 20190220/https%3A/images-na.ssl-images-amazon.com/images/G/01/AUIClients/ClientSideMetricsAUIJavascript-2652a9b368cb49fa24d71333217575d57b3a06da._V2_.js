(function(f,c,x){function n(a){for(var b={},d,f,c=0;c<a.length;c++)f=a[c],d=f.r+f.s+f.m,f.c&&(b[d]||(b[d]=[]),b[d].push(a[c]));return b}function w(a){for(var b=1;b<arguments.length;b++){var d=arguments[b];try{if(d.isSupported)return d.send(a)}catch(f){}}}function k(){if(b.length){for(var d=0;d<A.length;d++)A[d]();a._flhs+=1;l();w(n(b.splice(0,b.length)),u,H,F)}L=E=0}function l(){p&&g({k:"chk",f:a._flhs,l:a._lpn,s:"full"},"csm")}function g(d,e,h){h=h||{};0===h.bf&&a.isBF||(d={r:h.r||a.rid,s:h.s||f.ue_sid,
m:h.m||f.ue_mid,mkt:h.mkt||f.ue_mkt,sn:h.sn||f.ue_sn,c:e,d:d,t:h.t||a.d(),cs:h.c&&f.ue_qsl},a._lpn[e]=(a._lpn[e]||0)+1,h.b?w(n([d]),u,F):h.nb?w(n([d]),u,H,F):h.img||S[e]?w(n([d]),F):h.ff?(b.push(d),k()):h.n?(b.push(d),0===M?k():L||(L=c.setTimeout(k,M))):(b.push(d),E||(E=c.setTimeout(k,I))))}function t(a,b,d){K++;K==C&&g({m:"Max number of Forester Logs exceeded",f:"forester-client.js",logLevel:"ERROR"},c.ue_err_chan||"jserr");(K<C||d&&d.il)&&g(a,b,d)}function D(){if(!O){for(var d=0;d<B.length;d++)B[d]();
for(d=0;d<A.length;d++)A[d]();a._flhs+=1;l();w(n(b.splice(0,b.length)),u,F);O=!0}}var y={};(function(){function a(b){return 10>b?"0"+b:b}function b(a){f.lastIndex=0;return f.test(a)?'"'+a.replace(f,function(a){var b=k[a];return"string"===typeof b?b:"\\u"+("0000"+a.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+a+'"'}function d(a,f){var m,k,q,n,T=c,p,r=f[a];r&&"object"===typeof r&&"function"===typeof r.toJSON&&(r=r.toJSON(a));"function"===typeof l&&(r=l.call(f,a,r));switch(typeof r){case "string":return b(r);
case "number":return isFinite(r)?String(r):"null";case "boolean":case "null":return String(r);case "object":if(!r)return"null";c+=g;p=[];if("[object Array]"===Object.prototype.toString.apply(r)){n=r.length;for(m=0;m<n;m+=1)p[m]=d(m,r)||"null";q=0===p.length?"[]":c?"[\n"+c+p.join(",\n"+c)+"\n"+T+"]":"["+p.join(",")+"]";c=T;return q}if(l&&"object"===typeof l)for(n=l.length,m=0;m<n;m+=1)"string"===typeof l[m]&&(k=l[m],(q=d(k,r))&&p.push(b(k)+(c?": ":":")+q));else for(k in r)Object.prototype.hasOwnProperty.call(r,
k)&&(q=d(k,r))&&p.push(b(k)+(c?": ":":")+q);q=0===p.length?"{}":c?"{\n"+c+p.join(",\n"+c)+"\n"+T+"}":"{"+p.join(",")+"}";c=T;return q}}"function"!==typeof Date.prototype.toJSON&&(Date.prototype.toJSON=function(b){return isFinite(this.valueOf())?this.getUTCFullYear()+"-"+a(this.getUTCMonth()+1)+"-"+a(this.getUTCDate())+"T"+a(this.getUTCHours())+":"+a(this.getUTCMinutes())+":"+a(this.getUTCSeconds())+"Z":null},String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(a){return this.valueOf()});
var f=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,c,g,k={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},l;"function"!==typeof y.stringify&&(y.stringify=function(a,b,e){var f;g=c="";if("number"===typeof e)for(f=0;f<e;f+=1)g+=" ";else"string"===typeof e&&(g=e);if((l=b)&&"function"!==typeof b&&("object"!==typeof b||"number"!==typeof b.length))throw Error("JSON.stringify");return d("",{"":a})})})();
var r=function(){function a(b,d){if(null==b)return d.push("!n");if("number"===typeof b)return d.push("!"+b);if("string"===typeof b)return"\\"==b[b.length-1]?d.push("'"+b.replace(/'/g,"\\'")+"u005C'"):d.push("'"+b.replace(/'/g,"\\'")+"'");if("boolean"===typeof b)return d.push(b?"!t":"!f");if(b instanceof Array){d.push("*");for(var f=0;f<b.length;f++)a(b[f],d);return d.push(")")}if("object"==typeof b){d.push("(");for(f in b)b.hasOwnProperty(f)&&(d.push(f),a(b[f],d));return d.push(")")}return d.push("!n")}
return{stringify:function(b){var d=[];a(b,d);return d.join("")}}}(),P=f.ue_qsl||2E3,C=1E3,p=1===window.ue_ddq,z=function(){},G=c.JSON&&c.JSON.stringify||y&&y.stringify,d=r.stringify,a=f.ue||{},r=f.uet||z;(f.uet||z)("bb","ue_frst_v2",{wb:1});var q="//"+f.ue_furl+"/1/batch/1/OE/",b=[],B=[],A=[],O=!1,L,E,M=void 0===f.ue_hpfi?1E3:f.ue_hpfi,I=void 0===f.ue_lpfi?1E4:f.ue_lpfi,S={"scheduled-delivery":1},K=0,H=function(){function d(){if(c.XDomainRequest){var a=new XDomainRequest;a.onerror=z;a.ontimeout=z;
a.onprogress=z;a.onload=z;a.timeout=0;return a}if(c.XMLHttpRequest){a=new XMLHttpRequest;if(!("withCredentials"in a))throw"";return a}if(c.ActiveXObject){for(var b=0;b<g.length&&!a;b++)try{a=new ActiveXObject(g[b]),g=[g[b]]}catch(e){}return a}}function e(b){for(var d=[],e=b[0]||{},c=0;c<b.length;c++){var h={};h[b[c].c]=b[c].d;d.push(h)}return{rid:e.r||a.rid,sid:e.s||f.ue_sid,mid:e.m||f.ue_mid,mkt:e.mkt||f.ue_mkt,sn:e.sn||f.ue_sn,reqs:d}}function h(a){var f=e(a),c=d();if(!c)throw"";c.onerror=function(){for(var d=
0;d<a.length;d++)b.push(a[d]);H.isSupported=!1};c.open("POST",q,!0);c.setRequestHeader&&c.setRequestHeader("Content-type","text/plain");c.send(G(f))}var g="MSXML2.XMLHTTP.6.0 MSXML2.XMLHTTP.5.0 MSXML2.XMLHTTP.4.0 MSXML2.XMLHTTP.3.0 MSXML2.XMLHTTP Microsoft.XMLHTTP".split(" ");return{send:function(a){for(var b in a)a.hasOwnProperty(b)&&a[b].length&&h(a[b])},buildPOSTBodyLog:e,isSupported:!0}}(),F=function(){return{send:function(b){for(var e in b)if(b.hasOwnProperty(e)){for(var c=b[e],g=c,k={},l=void 0,
p=0;p<g.length;p++)l=g[p].c,k[l]||(k[l]=[]),k[l].push(g[p]);var c=c[0]||{},g=c.sn||f.ue_sn,c=q+(c.m||f.ue_mid)+":"+(c.s||f.ue_sid)+":"+(c.r||a.rid)+(g?":"+g:""),g=[],l=c,p=[],n=void 0;for(n in k)if(k.hasOwnProperty(n))for(var r=0;r<k[n].length;r++){var t=k[n][r],u=encodeURIComponent((t.cs?d:G)(t.d));p.push({l:u,t:t.t,p:1,c:n,d:t.cs?"c":"j"})}k=p;p=void 0;n="$";for(t=0;t<k.length;){r=k[t];p!=r.c?(l+=n+r.c+"=",n="&",p=r.c):l+=",";var u=l,C=r.d+":",w=r,l=(w.l.match(".{1,"+(P-l.length)+"}[^%]{0,2}")||
[])[0]||"";w.l=w.l.substr(l.length);l=u+(C+l+":"+r.t);if(r.l)l+=":"+r.p++ +"_",g.push(l),l=c,n="$",p=0;else if(t++,1!=r.p)for(l+=":"+r.p+"_"+r.p,u=0;u<r.p-1;u++)g[g.length-u-1]+=r.p}g.push(l);c=g;for(g=0;g<c.length;g++)(new Image).src=c[g]}},isSupported:!0}}(),u=function(){return{send:function(a){for(var b in a)if(a.hasOwnProperty(b)){var d=H.buildPOSTBodyLog(a[b]);if(!navigator.sendBeacon(q,G(d)))throw"";}},isSupported:!!navigator.sendBeacon}}();a._fic=F;a._fac=H;a._fbc=u;a._flq=b;a.sid=a.sid||f.ue_sid;
a.mid=a.mid||f.ue_mid;a.furl=a.furl||f.ue_furl;a.sn=a.sn||f.ue_sn;a.isBF=function(){var b=c.performance||c.webkitPerformance,d=x.ue_backdetect&&x.ue_backdetect.ue_back&&document.ue_backdetect.ue_back.value,f=a.bfini;return b&&b.navigation&&2===b.navigation.type||1<f||!f&&1<d}();a._flhs=a._flhs||0;a._lpn=a._lpn||{};try{c.amznJQ&&c.amznJQ.declareAvailable&&c.amznJQ.declareAvailable("forester-client"),c.P&&c.P.register&&c.P.register("forester-client",z)}catch(U){f.ueLogError(U,{logLevel:"WARN"})}(function(){a.log&&
a.log.isStub&&(a.log.replay(function(a,b,d){var f=a[2]||{};f.t=b;f.r=d;f.n=1;t(a[0],a[1],f)}),a.onunload.replay(function(a){B.push(a[0])}),a.onflush.replay(function(a){A.push(a[0])}))})();a.log=t;a.log.reset=function(){K=0};a.onunload=function(a){B.push(a)};a.onflush=function(a){A.push(a)};a.attach("beforeunload",D);a.attach("pagehide",D);r("ld","ue_frst_v2",{wb:1})})(ue_csm,window,document);
(function(f,c){function x(d){if(d)return d.replace(/^\s+|\s+$/g,"")}function n(d,a){if(!d)return{};var c="INFO"===a.logLevel;d.m&&d.m.message&&(d=d.m);var b=a.m||a.message||"",b=d.m&&d.m.message?b+d.m.message:d.m&&d.m.target&&d.m.target.tagName?b+("Error handler invoked by "+d.m.target.tagName+" tag"):d.m?b+d.m:d.message?b+d.message:b+"Unknown error",b={m:b,name:d.name,type:d.type,csm:P+" "+(d.fromOnError?"onerror":"ueLogError")},g,k,l=0,n;b.logLevel=a.logLevel||t;a.adb&&(b.adb=a.adb);if(g=a.attribution)b.attribution=
""+g;if(!c){b.pageURL=a.pageURL||""+(window.location?window.location.href:"")||"missing";b.f=d.f||d.sourceURL||d.fileName||d.filename||d.m&&d.m.target&&d.m.target.src;b.l=d.l||d.line||d.lineno||d.lineNumber;b.c=d.c?""+d.c:d.c;b.s=[];b.t=f.ue.d();if((c=d.stack||(d.err?d.err.stack:""))&&c.split)for(b.csm+=" stack",g=c.split("\n");l<g.length&&b.s.length<C;)(c=g[l++])&&b.s.push(x(c));else for(b.csm+=" callee",k=w(d.args||arguments,"callee"),g=l=0;k&&l<C;)n=p,k.skipTrace||(c=k.toString())&&c.substr&&(n=
0===g?4*p:n,n=1==g?2*p:n,b.s.push(c.substr(0,n)),g++),k=w(k,"caller"),l++;if(!b.f&&0<b.s.length&&(l=b)&&l.s){var r,c=0<l.s.length?l.s[0]:"";g=1<l.s.length?l.s[1]:"";c&&(r=c.match(G));r&&3==r.length||!g||(r=g.match(z));r&&3==r.length&&(l.f=r[1],l.l=r[2])}}return b}function w(d,a){try{return d[a]}catch(f){}}function k(d,a){if(d){var k=n(d,a),b=window.ue_err?window.ue_err.addContextInfo:null;b&&b(k);f.ue.log(k,a.channel||g,{nb:1});"function"===typeof ue_err.elh&&ue_err.elh(d,a);try{if(!d.fromOnError){var l=
c.console,p=c.JSON,b="Error logged with the Track&Report JS errors API(http://tiny/1covqr6l8/wamazindeClieUserJava): ";if(l){if(p&&p.stringify)try{b+=p.stringify(k)}catch(r){b+="no info provided; converting to string failed"}else b+=k.m;"function"===typeof l.error?l.error(b,k):"function"===typeof l.log&&l.log(b,k)}}}catch(t){}}}function l(d,a){if(d&&!(f.ue_err.ec>f.ue_err.mxe)){f.ue_err.ter.push(d);a=a||{};var c=d.logLevel||a.logLevel;a.logLevel=c;a.attribution=d.attribution||a.attribution;c&&c!==
t&&c!==D&&c!==y&&c!==r||f.ue_err.ec++;c&&c!=t||ue_err.ecf++;k(d,a)}}if(f.ue_err&&(!f.ueLogError||f.ueLogError.isStub)){var g=f.ue_err_chan||"jserr",t="FATAL",D="ERROR",y="WARN",r="DOWNGRADED",P="v5",C=20,p=256,z=/\(?([^\s]*):(\d+):\d+\)?/,G=/.*@(.*):(\d*)/;k.skipTrace=1;n.skipTrace=1;l.skipTrace=1;(function(){if(f.ue_err.erl){var d=f.ue_err.erl.length,a,c;for(a=0;a<d;a++)c=f.ue_err.erl[a],k(c.ex,c.info);ue_err.erl=[]}})();f.ueLogError=l}})(ue_csm,window);