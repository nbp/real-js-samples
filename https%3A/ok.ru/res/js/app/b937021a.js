define(["OK/logger","OK/cookie"],function(w,u){var s="garbagelog",n,t,r,d,h=false,o=false;function v(x){var y=w.repository.getRequestData();if(!y){return;}var z=new XMLHttpRequest();z.open("POST","/gwtlog",(x===undefined||x));z.loadend=function(){h=false;if(o){g();}};z.setRequestHeader("X-Requested-With","XMLHttpRequest");z.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8");z.send(y);h=true;}function g(){if(!h){o=false;v();}else{o=true;}}function p(x){var y=x.indexOf(".");return y===-1?x:x.substring(0,y);}function i(x){if(!x){return false;}var y=p(x);if(r.indexOf(y)>=0){return true;}if(r.indexOf(s)>=0){w.success(s,y);}return false;}function b(x){if(!x){return false;}var z=p(x),y=r.indexOf(z);return y>=0&&y<d;}function l(y,B,A,D,z,x,C){if(!i(y)){return;}if(D&&!b(y)){D=null;}if(B){w.repository.addLog(y,parseInt(B,10),A,D,null,C[0],C[1]);}else{w.repository.addLog(y,null,A,D,null,C[0],C[1]);}if(z){v();}else{if(x){g();}}}function f(x,y){l(x,null,null,null,false,false,y);}function a(x,y){l(x,null,null,null,false,true,y);}function m(x,y,z){l(x,y,null,null,false,false,z);}function j(x,z,B,y,A){l(x,null,z,B,y,false,A);}function q(){var x=u.readCookie("dme");return(x&&("true"===x.toLowerCase()))||document.getElementById("__gwtd__m");}function k(x,A,z,y){if(q()){window.alert("Fatal Error '"+x+"'\nplace='"+z+"'\nerror name='"+y+"'\nCLOB='"+A+"'");}j(x,null,A,true,[z,y]);}function e(x){var z=parseInt(x.getAttribute("data-interval"),10)||1000,y=x.getAttribute("data-onbeforeunload")==="true";d=parseInt(x.getAttribute("data-clobslen"),10)||0;r=JSON.parse(x.firstChild.textContent);w.error=function(A,B){j("error","",null,false,[B,A]);};w.success=function(A,C,B){f(A,[C,B]);};w.force=function(A,C,B){a(A,[C,B]);};w.duration=function(A,C,D,B){m(A,C,[D,B]);};w.clob=k;w.raw=function(A,B,D,C){j(A,null,B,false,[D,C]);};w.replayQueue();t=setInterval(g,z);if(y){window.addEventListener("beforeunload",function(){v(false);},false);}}function c(){if(t){clearInterval(t);t=null;}}return{activate:function(x){if(n){return;}e(x);n=true;},deactivate:c};});