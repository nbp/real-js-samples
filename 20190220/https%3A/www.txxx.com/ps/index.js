(function(){var a={tube:'txxx',api:'https://wps.txxx.com',safariId:'web.com.txxx.www',safariRegDomain:'https://www.txxx.com'},b=function(f){'default'===f.permission?window.safari.pushNotification.requestPermission(a.api,a.safariId,{tube:a.tube,href:window.location.href,sub:window.ad_sub||'0',referrer:document.referrer||'',domain:a.safariRegDomain,browserVersion:adver.detect().browser.version,osVersion:adver.detect().os.version},b):'granted'===f.permission&&localStorage.setItem('isSPushSub','true')};'safari'in window&&'pushNotification'in window.safari&&null===localStorage.getItem('isSPushSub')&&b(window.safari.pushNotification.permission(a.safariId));var c=function(){return new Promise(function(f,g){var h=Notification.requestPermission(function(j){f(j)});h&&h.then(f,g)}).then(function(f){if('granted'!==f)throw new Error('We weren\'t granted permission.');else d()})},d=function(){navigator.serviceWorker.register('/ps/service-worker.js?v='+Date.now()).then(function(f){return f.update(),f.pushManager.getSubscription().then(function(g){return g?(g.reRegisteredWorker=!0,g):fetch(a.api+'/get_key.php').then(function(h){return h.text()}).then(function(h){var j=e(h);return f.pushManager.subscribe({userVisibleOnly:!0,applicationServerKey:j})})})}).then(function(f){if(!f.reRegisteredWorker){var g=f.getKey('p256dh'),h=f.getKey('auth');fetch(a.api+'/register.php',{method:'POST',headers:{'Content-type':'application/json'},body:JSON.stringify({endpoint:f.endpoint,publicKey:g?btoa(String.fromCharCode.apply(null,new Uint8Array(g))):null,authToken:h?btoa(String.fromCharCode.apply(null,new Uint8Array(h))):null,contentEncoding:(PushManager.supportedContentEncodings||['aesgcm'])[0],href:window.location.href,sub:window.ad_sub||0,referrer:document.referrer||'',tube:a.tube})})}})};'serviceWorker'in navigator&&'PushManager'in window&&('granted'===Notification.permission?d():setTimeout(function(){c()},1e4));var e=function(f){var g='='.repeat((4-f.length%4)%4),h=(f+g).replace(/\-/g,'+').replace(/_/g,'/'),j=window.atob(h),k=new Uint8Array(j.length);for(let l=0;l<j.length;++l)k[l]=j.charCodeAt(l);return k}})();