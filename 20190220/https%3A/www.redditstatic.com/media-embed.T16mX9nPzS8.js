(function(){function s(e){var t="[A-Za-z0-9\\-\\.]+";return new RegExp("^"+(e.replace(/\./g,"\\.").replace(/\*\\\./g,t)+"(:\\d+)?$"))}function u(e){var t=!1;return o.forEach(function(n){n.test(e)&&(t=!0)}),t}function a(s){if(r&&!n&&s.origin==="https://cdn.embedly.com")try{var o=JSON.parse(s.data);if(o.event==="ready"){n=!0,i&&(e.contentWindow.postMessage(i.data,"*"),i=null);return}}catch(a){}if(!u(s.origin))return;if(!t||r&&!n){i=s;return}e&&e.contentWindow.postMessage(s.data,"*")}var e=document.getElementsByTagName("iframe")[0],t=!1,n=!1,r=!1,i,o=AUTHORIZED_DOMAINS.map(s);e.classList.contains("embedly-embed")&&(r=!0),e.addEventListener("load",function(){t=!0;if(i){if(r&&!n)return;a(i),i=null}}),window.addEventListener("message",a,!1),window.parent.postMessage(JSON.stringify({context:"player.js",event:"ready"}),"*")})();