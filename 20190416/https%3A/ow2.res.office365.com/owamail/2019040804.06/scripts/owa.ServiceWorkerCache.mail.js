window.scriptsLoaded = window.scriptsLoaded || {}; window.scriptProcessStart = window.scriptProcessStart || {}; window.scriptProcessStart['owa.ServiceWorkerCache.mail.js'] = (new Date()).getTime();(window.$wj=window.$wj||[]).push([[221],{6993:function(e,a,n){"use strict";n.r(a);var r=n(96);var c,t=n(642),o=n(11);!function(e){e[e.Normal=0]="Normal",e[e.CacheCorrupt=1]="CacheCorrupt",e[e.TooManyInstallError=2]="TooManyInstallError"}(c||(c={}));var l,s=c;!function(e){e[e.Install=0]="Install",e[e.UnInstall=1]="UnInstall"}(l||(l={}));var i,u=l;!function(e){e[e.CacheProgress=0]="CacheProgress",e[e.Error=1]="Error"}(i||(i={}));var h,C=i;!function(e){e[e.Checking=0]="Checking",e[e.Downloading=1]="Downloading",e[e.Progress=2]="Progress",e[e.Error=3]="Error",e[e.Cached=4]="Cached",e[e.NoUpdate=5]="NoUpdate",e[e.Obsolete=6]="Obsolete",e[e.UpdateReady=7]="UpdateReady",e[e.Idle=8]="Idle",e[e.UnCached=9]="UnCached",e[e.CleanupError=10]="CleanupError",e[e.CleanupSuceeded=11]="CleanupSuceeded"}(h||(h={}));var d,p=h;!function(e){e[e.CacheInstalled=0]="CacheInstalled",e[e.CacheFailed=1]="CacheFailed",e[e.CacheCleared=2]="CacheCleared"}(d||(d={}));var f=d,v=n(12),g="SWCache";function k(e,a,n,r,c,t,o){var l={};l.ev=a,l.cv=n,l.e=r,l.rc=e.resourcesCached,l.ccs=e.cacheCleanupStatus,l.ncc=e.numberOfCachesCleaned,l.r=c,l.st=t,l.stk=o,l.ch=e.cacheHealth,l.app=e.appName,e.resourcesCached=0,e.cacheCleanupStatus=0,e.numberOfCachesCleaned=0,Object(v.k)(g,l)}var b=n(345);function m(e,a){return e+"_"+a}var S="SWCacheErrorCount";function W(e,a,n){var r=m(a.appName,S);0==n?Object(b.b)(e,r):Object(b.c)(e,r,""+n)}function N(e,a){var n=parseInt(Object(b.a)(e,m(a.appName,S)));return isNaN(n)?0:n}var w="CacheVersion",I="AttemptedCacheVersion";function O(e,a,n,r){switch(n){case f.CacheInstalled:Object(b.c)(e,m(a.appName,w),r),W(e,a,0);break;case f.CacheFailed:Object(b.c)(e,m(a.appName,I),r),W(e,a,N(e,a)+1);break;case f.CacheCleared:Object(b.c)(e,m(a.appName,w),null),Object(b.c)(e,m(a.appName,I),null),W(e,a,0)}}function U(e,a,n){if(null!=n.cacheMessage&&(n.targetClient==a.appName||"global"==n.targetClient)){var r=n.cacheMessage;switch(r.cacheEvent){case p.Checking:o.c.info("[SW Client] Checking");break;case p.Downloading:o.c.info("[SW Client] Downloading");break;case p.Progress:!function(e,a){o.c.info("[SW Client] Progress"),e.resourcesCached++}(a);break;case p.Error:!function(e,a,n){o.c.warn("[SW Client] Error: "+n.error),O(e,a,f.CacheFailed,n.cacheVersion),k(a,"ER",n.cacheVersion,n.error,n.resource,n.status,n.stack)}(e,a,r);break;case p.Cached:!function(e,a,n){o.c.info("[SW Client] Cached"),O(e,a,f.CacheInstalled,n.cacheVersion),k(a,"C",n.cacheVersion)}(e,a,r);break;case p.NoUpdate:!function(e,a,n){o.c.info("[SW Client] NoUpdate"),O(e,a,f.CacheInstalled,n.cacheVersion),k(a,"NU",n.cacheVersion)}(e,a,r);break;case p.Obsolete:!function(e,a,n){o.c.info("[SW Client] Obsolete"),O(e,a,f.CacheCleared,null),k(a,"OB"),a.cacheHealth>s.Normal&&(a.cacheHealth=s.Normal,M())}(e,a);break;case p.UpdateReady:!function(e,a,n){o.c.info("[SW Client] UpdateReady"),O(e,a,f.CacheInstalled,n.cacheVersion),k(a,"UR",n.cacheVersion)}(e,a,r);break;case p.Idle:o.c.info("[SW Client] Idle");break;case p.UnCached:o.c.info("[SW Client] Uncached");break;case p.CleanupError:!function(e,a){o.c.warn("[SW Client] Cleanup Error"),e.cacheCleanupStatus=1}(a);break;case p.CleanupSuceeded:!function(e,a){var n=null!=a.cachesCleaned?a.cachesCleaned.join(","):null;o.c.info("[SW Client] Cleanup Suceeded, "+n),e.cacheCleanupStatus=2,e.numberOfCachesCleaned=null!=a.cachesCleaned?a.cachesCleaned.length:0}(a,r)}}}var E=15,j=null,y=null;function M(){var e=null!=j.serviceWorkerPath?j.serviceWorkerPath+"/"+j.appName+"cache.manifest":"/"+j.appName+"cache.manifest",a=u.Install;j.cacheHealth>s.Normal&&(a=u.UnInstall);var n={source:j.appName,action:a,bootResourcesOnly:!0,language:j.userLanguage,darkMode:void 0!==j.darkMode&&j.darkMode,manifestUrl:e};j.serviceWorkerRegistration.active.postMessage(n)}function P(e){if(null!=e.data){var a=e.data;a.messageType==C.CacheProgress?U(y,j,a):a.messageType==C.Error&&function(e){null!=e.error&&o.c.error({message:"[SW Client] ServiceWorker Unhandled Exception",error:e.error})}(a)}}var V="sw.js",R="activated",H=null,T=null,D=null,F=null,L=null,$=null,x=!1;function A(e,a,n,c){T=(D=e).navigator.serviceWorker;var l,s,i,u=Object(t.a)(D.location);l=u,s=D.location,i=l,null!=l&&(i=Object(r.p)("/"+l,s.pathname)),L=a,$=n,x=c;var h=null!=(F=i)?F+"/"+V:"/"+V,C=null!=u?{scope:"/"+u+"/"}:null;T.register(h,C).then(function(e){o.c.info("[SW Client] service worker registration succeeded")}).catch(function(e){o.c.warn("[SW Client] service worker registraiton failed, error: "+e.message)}),T.ready.then(function(e){!function(e){o.c.info("[SW Client] ready fired, state: "+e.active.state),H=e,T.oncontrollerchange=q,B()}(e)})}function B(){H.active.state==R?z():H.active.onstatechange=_}function _(e){H.active.state==R&&(H.active.onstatechange=null,z())}function q(){null!=H.active&&B()}function z(){var e,a;e={serviceWorkerContainer:T,serviceWorkerRegistration:H,serviceWorkerPath:F,appName:L,userLanguage:$,darkMode:x},a=D,null==j&&((j=e).serviceWorkerContainer.onmessage=P,N(window,j)>E&&(j.cacheHealth=s.TooManyInstallError)),y=a,M()}n.d(a,"registerServiceworker",function(){return A})}},0,[279,51,280,57]]);
//# sourceMappingURL=owa.ServiceWorkerCache.mail.js.map
window.scriptsLoaded['owa.ServiceWorkerCache.mail.js'] = 1; window.scriptProcessEnd = window.scriptProcessEnd || {}; window.scriptProcessEnd['owa.ServiceWorkerCache.mail.js'] = (new Date()).getTime();