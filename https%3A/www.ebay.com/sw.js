const VERSION="1539632459880",ASSETS=[],offlineMap=new Map,PREFETCH_CACHE_KEY="PREFETCH-1539632459880",prefetchCacheKeysMap=new Map,prefetchCacheMaxAgeMap=new Map,prefetchAllowedResourceMap=new Map,prefetchURLsList=[],ACTION_HANDLER_MAP={nav:handleNavAction};function getOfflineKey(e){const t=new URL(e),a=t.pathname.match(/(^\/[^\/]*)\/?/),c=a?a[1]:"";return t.origin+c}function sendBeacon(e){return fetch(e,{credentials:"include",referrerPolicy:"no-referrer",method:"POST",mode:"cors"})}async function swInstall(){const e=await caches.open(VERSION);await e.addAll(ASSETS),await self.skipWaiting()}async function swActivate(){const e=await caches.keys(),t=[];for(const a of e)a!==VERSION&&t.push(caches.delete(a));await Promise.all(t),await self.clients.claim()}async function addToCache(e,t,a=VERSION){(await caches.open(a)).put(e,t)}async function updateCacheEntities(e){const t=await caches.open(VERSION),a=(await t.keys()).map(e=>e.url).filter(t=>!e.includes(t)&&!ASSETS.includes(t));await Promise.all(a.map(e=>t.delete(e)))}async function addCacheEntities(e){const t=await caches.open(VERSION),a=(await t.keys()).map(e=>e.url),c=e.filter(e=>!a.includes(e));await t.addAll(c)}async function fetchFromCache(e,t=VERSION){const a=await caches.open(t),c=await a.match(e);if(!c)throw Error("Item not found in cache");return c}async function fetchFromNetworkAndCache(e,t=VERSION,a){const c={};a&&(c.headers=a),a&&a.Referer&&(c.referrer=a.Referer);const n=await fetch(e,c);return!(n.headers&&n.headers.get("x-sw-no-cache"))&&n.status<400&&addToCache(e,n.clone(),t),n}async function fetchNetworkFirst(e,t=!1){const a=[];try{const c=t?fetchFromNetworkAndCache(e):fetch(e);return await c}catch(e){a.push(e.message)}try{return await fetchFromCache(e)}catch(e){a.push(e.message)}try{const t=offlineMap.get(getOfflineKey(e.url));if(t)return await fetchFromCache(t)}catch(e){a.push(e.message)}throw Error(a.join(", "))}async function fetchCacheFirst(e,t=VERSION,a=!0,c,n){const s=[];try{const a=await fetchFromCache(e,t);if(a&&!swCacheEntryExpiry(a,c))return a}catch(e){s.push(e.message)}try{const c=a?fetchFromNetworkAndCache(e,t,n):fetch(e);return await c}catch(e){s.push(e.message)}throw Error(s.join(", "))}async function fetchFastest(e,t=VERSION,a=!1){return new Promise((c,n)=>{const s=a?fetchFromNetworkAndCache(e,t):fetch(e),i=fetchFromCache(e,t);let r=!1;const o=[],h=e=>{o.push(e.toString()),r?n(Error(o.join(", "))):r=!0};i.then(c,h),s.then(c,h)})}function swCacheEntryExpiry(e,t){if(e&&t){const a=e.headers&&e.headers.get("date");if(a){const e=Date.now();return new Date(a).getTime()+1e3*t<e}}return!1}async function swCleanExpiredCacheEntries(e,t){if(e&&t){const a=await caches.open(e),c=await a.keys();for(const e of c){const c=await a.match(e);c&&swCacheEntryExpiry(c,t)&&a.delete(e)}}}async function swPrefetch(e,t=PREFETCH_CACHE_KEY,a={},c){a.prefetchCacheRefresh&&(await caches.delete(t),prefetchCacheKeysMap.set(c,null),prefetchCacheMaxAgeMap.set(c,null),prefetchAllowedResourceMap.set(c,null),prefetchURLsList.length=0),prefetchCacheKeysMap.set(c,t),prefetchCacheMaxAgeMap.set(c,a.maxCacheAge),prefetchAllowedResourceMap.set(c,a.allowedResources);for(const c of e){prefetchURLsList.includes(c)||prefetchURLsList.push(c),fetchCacheFirst(new Request(c),t,!0,a.maxCacheAge,a.swPrefetchHeaders)}swCleanExpiredCacheEntries(t,a.maxCacheAge)}async function swMessage(e){const t=e.data;if(t)if("PREFETCH"===t.action){const a=`${t.swPrefetchCacheKey}-${VERSION}`,c=e.currentTarget&&e.currentTarget.registration&&e.currentTarget.registration.scope;try{await swPrefetch(t.URLs,a,{swPrefetchHeaders:t.swPrefetchHeaders,prefetchCacheRefresh:t.swPrefetchCacheRefresh,maxCacheAge:t.maxCacheAge,maxCacheEntries:t.maxCacheEntries,allowedResources:t.allowedResources},c)}catch(e){}}else await prepOffline(e)}async function prepOffline(e){try{const t=getOfflineKey(e.data.currentPage);offlineMap.set(t,null);const a=await fetch(e.data.offlineSrc),c=await a.json(),n=c.assets;await updateCacheEntities(n);const s=c.page;n.push(s),await addCacheEntities(n),offlineMap.set(t,s)}catch(e){}}async function getMatchingClient(e){const t=await clients.matchAll({type:"window",includeUncontrolled:!0});let a=null;for(const c of t)if(c.url===e){a=c;break}return a}async function swFetch(e){const t=e.request,a=new URL(t.url);if("GET"!==t.method||"https:"!==a.protocol)return;const c=e.currentTarget&&e.currentTarget.registration&&e.currentTarget.registration.scope,n=prefetchAllowedResourceMap.get(c)||null,s=new RegExp(n);if(!n||s.test(a.pathname))if("navigate"===t.mode){if(a.origin===location.origin)if(prefetchURLsList.includes(a.href)){const a=prefetchCacheKeysMap.get(c)||PREFETCH_CACHE_KEY,n=prefetchCacheMaxAgeMap.get(c);e.respondWith(fetchCacheFirst(t,a,!0,n))}else e.respondWith(fetchNetworkFirst(t))}else e.respondWith(fetchFastest(t))}async function swPush(e){try{const t=e.data.json().data,a="string"==typeof t.options?JSON.parse(t.options):t.options,{data:c}=a,n=await getMatchingClient(c.click),s=sendBeacon(c.tracking.receive);if(n&&n.focused)return void await s;const i=self.registration.showNotification(t.title,a);await Promise.all([s,i])}catch(e){}}async function navigateTo(e){const t=await getMatchingClient(e);return t?(await t.focus(),t.navigate(e)):clients.openWindow(e)}async function handleNavAction(e){const t=e.click;await navigateTo(t)}async function handleAction(e){const t=ACTION_HANDLER_MAP[e.type];if(t){const a=sendBeacon(e.tracking);await Promise.all([a,t(e)])}}async function swNotificationClick(e){try{const t=e.notification;if(t.close(),e.action){const a=t.actions.find(t=>t.action===e.action);await handleAction(a)}else{const e=t.data,a=sendBeacon(e.tracking.click),c=navigateTo(e.click);await Promise.all([a,c])}}catch(e){}}self.addEventListener("install",e=>e.waitUntil(swInstall())),self.addEventListener("activate",e=>e.waitUntil(swActivate())),self.addEventListener("fetch",e=>swFetch(e)),self.addEventListener("message",e=>swMessage(e)),self.addEventListener("push",e=>e.waitUntil(swPush(e))),self.addEventListener("notificationclick",e=>e.waitUntil(swNotificationClick(e))),self.addEventListener("notificationclose",e=>e.waitUntil(sendBeacon(e.notification.data.tracking.dismiss)));