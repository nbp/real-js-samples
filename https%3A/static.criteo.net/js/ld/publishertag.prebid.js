// Hash: w8liy6DbNrcb6h+CtWG+NsnLoUrrtb6IOaIFU4gEFC9JvvnaSPZKlKP7/nt/KGj4y+AvRZyzOydRPmABknOnKYgbR9NDfJH8z3z3XP0Gi5R299J+PQxfmoX4Et7xM6WPaZeaMhDSQJG/w9Q/sNvJRn5vIj7HCbjPrI2b9MfW9Q8=
!function(){"use strict";var s,t;(t=s||(s={}))[t.Error=0]="Error",t[t.Warning=1]="Warning",t[t.Debug=2]="Debug";var a=["color: #fff;","background: #ff8f1c;","display: inline-block;","padding: 1px 4px;","border-radius: 3px;"].join(" "),g=function(){function r(){}return r.Log=function(t,e){if(!(r.LOGLEVEL<t)){var i=s[t].toUpperCase(),o=window.navigator.userAgent,n=0<o.indexOf("MSIE ")||0<o.indexOf("Trident/");window.console?n?console.log("[PubTag] "+i+": "+e):console.log("%cPubTag",a,i+": "+e):t<=s.Error&&alert("[PubTag] "+i+": "+e)}},r.Debug=function(t){r.Log(s.Debug,t)},r.Warning=function(t){r.Log(s.Warning,t)},r.Error=function(t){r.Log(s.Error,t)},r.LOGLEVEL=s.Error,r}();var d=function(){function i(t){void 0===t&&(t=!0),t&&window.performance&&window.performance.now?this.now=window.performance.now.bind(window.performance):Date.now?this.now=Date.now:this.now=function(){return(new Date).getTime()}}return i.CreateRunning=function(){var t=new i;return t.start(),t},i.CreateWithStartTime=function(t){var e=new i(!1);return e.startTime=t,e},i.TimeSincePageLoad=function(){if(window.performance){if(window.performance.now)return window.performance.now();if(window.performance.timing&&window.performance.timing.navigationStart)return(new Date).getTime()-performance.timing.navigationStart}return 0},i.prototype.start=function(){this.startTime=this.now()},i.prototype.elapsed=function(){return this.now()-this.startTime},i}();function f(t){try{return JSON.parse(t)}catch(t){return}}var u=91,c={};function o(t,i,e){void 0===e&&(e=1e4);var o=d.CreateRunning(),n=!1,r=setTimeout(function(){n=!0,g.Warning("Timeout: Unable to resolve GDPR consent after "+e+"ms"),i(void 0)},e);!function(t,e,i,o){if(!l(t)){g.Debug("No CMP defined on current frame");var r=v(t);t.__cmp=function(t,e,i){if(!r)return g.Warning("CMP not found"),void i({msg:"CMP not found"},!1);var o=Math.random().toString(10),n={__cmpCall:{command:t,parameter:e,callId:o}};c[o]=i,r.postMessage(n,"*")},t.addEventListener("message",function(t){var e="string"==typeof t.data?f(t.data):t.data;if(e&&e.__cmpReturn&&e.__cmpReturn.callId&&e.__cmpReturn.returnValue){var i=e.__cmpReturn;c[i.callId](i.returnValue,i.success),delete c[i.callId]}},!1)}t.__cmp(e,i,o)}(t,"getVendorConsents",[u],function(t,e){n||(clearTimeout(r),e?(g.Debug("Consent retrieved in "+o.elapsed()+"ms"),function(t,e){if(t){var i={};void 0!==t.metadata&&(i.consentData=t.metadata),void 0!==t.gdprApplies&&(i.gdprApplies=!!t.gdprApplies),t.vendorConsents&&void 0!==t.vendorConsents[u.toString()]&&(i.consentGiven=!!t.vendorConsents[u.toString()]),e(i)}else g.Warning("Unable to read GDPR consent data from CMP"),e(void 0)}(t,i)):(g.Warning("Error retrieving GDPR consent data from CMP"),i(void 0)))})}function l(t){return"function"==typeof t.__cmp}function v(t){for(var e,i=t,o=0;o<10;++o){try{i.frames.__cmpLocator&&(e=i)}catch(t){}if(i===t.top)break;i=i.parent}return e}var r=function(){function t(t){this.EXPIRE_SUFFIX="_expires",this.CHECK_STORAGE_KEY="criteo_localstorage_check",this.localStorage=function(t){try{return t.localStorage}catch(t){return}}(t||window)}return t.prototype.checkLocalStorage=function(){if(!this.localStorage)return!1;var t=this.CHECK_STORAGE_KEY;try{return this.localStorage.setItem(t,t),this.localStorage.removeItem(t),!0}catch(t){return!1}},t.prototype.removeItem=function(t){this.localStorage.removeItem(t),this.localStorage.removeItem(t+this.EXPIRE_SUFFIX)},t.prototype.getItem=function(t,e){var i=(new Date).getTime(),o=this.localStorage.getItem(t+this.EXPIRE_SUFFIX),n=o?parseInt(o,10):-1;return-1!==n&&n<i||e&&(-1===n||e<n-i)?(this.removeItem(t),null):this.localStorage.getItem(t)},t.prototype.setItem=function(t,e,i){if(this.localStorage.setItem(t,e),i){var o=(new Date).getTime()+i;this.localStorage.setItem(t+this.EXPIRE_SUFFIX,o.toString())}},t}(),n=function(){function i(){this.localStorageHelper=new r,this.localStorageEnabled=this.localStorageHelper.checkLocalStorage()}return i.prototype.silentModeEnabled=function(){var t=i.SILENT_MODE_KEY;return this.localStorageEnabled&&null!==this.localStorageHelper.getItem(t)},i.prototype.enableSilentMode=function(t){if(this.localStorageEnabled){var e=i.SILENT_MODE_KEY;this.localStorageHelper.setItem(e,"1",t)}},i.SILENT_MODE_KEY="criteo_silent_mode",i}();function h(){return(new Date).getTime()}var p,m,I,e,E=function(){function t(t){this.x=t+"_lock_A",this.y=t+"_lock_B",this.id=Math.floor(1e9*Math.random()).toString()}return t.prototype.get=function(t){var e=localStorage.getItem(t);if(e){var i=e.split("|");if(!(i.length<2||parseInt(i[1],10)<h()))return i[0]}},t.prototype.set=function(t,e){var i=h()+e;localStorage.setItem(t,this.id+"|"+i)},t.prototype.acquire=function(t,e,i){var o=this;void 0===i&&(i=100),i<=0||this.tryAcquire(e)?(t(),this.release()):setTimeout(function(){o.acquire(t,e,i-10)},10)},t.prototype.tryAcquire=function(t){localStorage.setItem(this.x,this.id);var e=this.get(this.y);return!(e&&e!==this.id||(this.set(this.y,t),localStorage.getItem(this.x)!==this.id||this.get(this.y)!==this.id))},t.prototype.release=function(){localStorage.removeItem(this.x),localStorage.removeItem(this.y)},t}(),S=function(){function t(t,e){this.width=t,this.height=e}return t.prototype.toString=function(){return this.width+"x"+this.height},t}(),i=function(){function t(t){this.impressionId=t}return t.prototype.toString=function(){return"ImpId"+this.impressionId},t}(),y=(p=function(t,e){return(p=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var i in e)e.hasOwnProperty(i)&&(t[i]=e[i])})(t,e)},function(t,e){function i(){this.constructor=t}p(t,e),t.prototype=null===e?Object.create(e):(i.prototype=e.prototype,new i)}),_=function(n){function t(t,e,i){var o=n.call(this,t)||this;return o.size=e,o.networkId=i,o}return y(t,n),t.prototype.toString=function(){return n.prototype.toString.call(this)+"_Size"+this.size+"_NetworkId"+this.networkId},t}(i),b=(m=function(t,e){return(m=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var i in e)e.hasOwnProperty(i)&&(t[i]=e[i])})(t,e)},function(t,e){function i(){this.constructor=t}m(t,e),t.prototype=null===e?Object.create(e):(i.prototype=e.prototype,new i)}),w=function(o){function t(t,e){var i=o.call(this,t)||this;return i.zoneId=e,i}return b(t,o),t.prototype.toString=function(){return o.prototype.toString.call(this)+"_ZoneId"+this.zoneId},t}(i),C=function(){function t(t,e){this.useZoneIdIntegration=t,this.networkId=e}return t.prototype.createKeysFromSlotRequest=function(t){if(this.useZoneIdIntegration)return[new w(t.impId,t.zoneId)];for(var e=[],i=0,o=t.sizes;i<o.length;i++){var n=o[i];e.push(new _(t.impId,n,this.networkId))}return e},t.prototype.createKeyFromSlotResponse=function(t){return this.useZoneIdIntegration?new w(t.impid,t.zoneid):new _(t.impid,new S(t.width,t.height),this.networkId)},t.prototype.createKeyFromBid=function(t){return this.useZoneIdIntegration?new w(t.impressionId,t.zoneId):new _(t.impressionId,new S(t.width,t.height),this.networkId)},t}(),O=function(){function l(t,e){this.localStorageHelper=new r,this.localStorageEnabled=this.localStorageHelper.checkLocalStorage(),this.slotKeyFactory=new C(t,e)}return l.useZoneIdIntegration=function(t,e){return void 0===e||0===t.filter(function(t){return void 0!==t.sizes&&0<t.sizes.length}).length},l.prototype.get=function(t){var e=l.BID_KEY_PREFIX+t.toString(),i=this.localStorageHelper.getItem(e),o=i&&f(i);return o&&"object"==typeof o&&"bids"in o?(o.bids=o.bids.filter(function(t){return t.expiration>h()}),o):{bids:[]}},l.prototype.set=function(t,e){var i=l.BID_KEY_PREFIX+t.toString();0<e.bids.length||e.no_bid&&e.no_bid>h()?this.localStorageHelper.setItem(i,JSON.stringify(e)):this.localStorageHelper.removeItem(i)},l.prototype.filterNoBidSlots=function(t){for(var e=[],i=0,o=t;i<o.length;i++){for(var n=o[i],r=[],s=0,a=this.slotKeyFactory.createKeysFromSlotRequest(n);s<a.length;s++){var d=a[s];this.getBid(d,0)!==l.NO_BID&&(d instanceof _?r.push(d.size):e.push(n))}0<r.length&&(n.sizes=r,e.push(n))}return e},l.prototype.getRequestCachedBids=function(t,e){void 0===e&&(e=5e3);for(var i=[],o=0,n=t;o<n.length;o++)for(var r=n[o],s=0,a=this.slotKeyFactory.createKeysFromSlotRequest(r);s<a.length;s++){var d=a[s],c=this.getBid(d,e);void 0!==c&&c!==l.NO_BID&&i.push(c)}return i},l.prototype.getBid=function(t,e){if(void 0===e&&(e=5e3),this.localStorageEnabled){var i=this.get(t);if(i.no_bid&&i.no_bid>h())return l.NO_BID;if(0<e)for(var o=0,n=i.bids;o<n.length;o++){var r=n[o];if(new E(l.BID_KEY_PREFIX+r.bid.slotid).tryAcquire(e))return r.bid}}},l.prototype.storeRequestNoBid=function(t,e){for(var i=0,o=this.slotKeyFactory.createKeysFromSlotRequest(t);i<o.length;i++){var n=o[i];this.storeNoBid(n,e)}},l.prototype.storeResponseBid=function(e,i){var t=this.slotKeyFactory.createKeyFromSlotResponse(e);this.modifyCache(t,function(t){t.bids.push({bid:e,expiration:h()+1e3*i})})},l.prototype.storeNoBid=function(t,e){this.modifyCache(t,function(t){t.no_bid=Math.max(t.no_bid||0,h()+1e3*e)})},l.prototype.removeBid=function(i){var t=this.slotKeyFactory.createKeyFromBid(i);this.modifyCache(t,function(t){for(var e=0;e<t.bids.length;e++)if(t.bids[e].bid.slotid===i.slotId)return void t.bids.splice(e,1)}),new E(t.toString()).release()},l.prototype.modifyCache=function(e,i){var o=this;if(this.localStorageEnabled){var n=new E(e.toString());n.acquire(function(){var t=o.get(e);i(t),o.set(e,t),n.release()},1e3)}},l.NO_BID="nobid",l.BID_KEY_PREFIX="criteo_pt_cdb_bidcache_",l}(),M=function(){function t(t,e,i){var o=O.useZoneIdIntegration(e,i);this.bidManager=new O(o,i),this.silentModeManager=new n,this.context=t}return t.prototype.filterNoBidSlots=function(t){var e=this.bidManager.filterNoBidSlots(t);return this.context.shouldIgnoreSilentMode?(e.length!==t.length&&this.context.setSilentModeIgnored&&this.context.setSilentModeIgnored(),t):e},t.prototype.silentModeEnabled=function(){var t=!1;return this.silentModeManager.silentModeEnabled()&&(this.context.shouldIgnoreSilentMode&&this.context.setSilentModeIgnored?this.context.setSilentModeIgnored():t=!0),t},t.prototype.getCachedBids=function(t){return this.bidManager.getRequestCachedBids(t)},t.prototype.removeBid=function(t){this.bidManager.removeBid(t)},t.prototype.handleResponse=function(t,e,i,o){var n=i.time_to_next_call;0<n&&(g.Debug("Global silent mode enabled for "+n+" seconds"),this.silentModeManager.enableSilentMode(1e3*n));var r={};if(i.slots)for(var s=0,a=i.slots;s<a.length;s++){(f=a[s]).ttl&&(r[f.imp_id]=f.ttl)}if(e.slots)for(var d=0,c=e.slots;d<c.length;d++){var l=0;(f=c[d]).slotid in r&&(l=r[f.slotid],delete r[f.slotid]),o&&0<l&&(g.Debug("Post-timeout bid for slot '"+f.impid+"' cached for "+l+" seconds"),this.bidManager.storeResponseBid(f,l))}for(var u in r)if(r.hasOwnProperty(u))for(var h=0,p=t;h<p.length;h++){var f;if((f=p[h]).slotId===u){l=r[u];g.Debug("Silent mode for slot '"+f.impId+"' enabled for "+l+" seconds"),this.bidManager.storeRequestNoBid(f,l)}}},t}(),T=function(t,e,i,o,n,r,s,a,d,c,l,u){this.publisherTagVersion=t,this.slots=e,this.elapsed=i,this.isTimeout=o,this.pageLoadElapsed=n,this.adapterStartElapsed=r,this.cdbCallStartElapsed=s,this.cdbCallEndElapsed=a,this.adapterEndElapsed=d,this.setTargetingElapsed=c,this.adapterTimeout=l,this.adapterIsTimeout=u},A=function(t,e,i,o){this.impressionId=t,this.zoneId=e,this.adUnitId=i,this.cachedBidUsed=o},R=function(){function t(){this.elapsed=0,this.isTimeout=!1,this.pageLoadElapsed=0,this.adapterStartElapsed=0,this.cdbCallStartElapsed=0,this.cdbCallEndElapsed=0,this.adapterEndElapsed=0,this.cachedBidsReturned=[],this.slots=[]}return t.prototype.withElapsed=function(t){return this.elapsed=Math.round(t),this},t.prototype.withIsTimeout=function(t){return this.isTimeout=t,this},t.prototype.withPageLoadElapsed=function(t){return this.pageLoadElapsed=Math.round(t),this},t.prototype.withAdapterStartElapsed=function(t){return this.adapterStartElapsed=Math.round(t),this},t.prototype.withCdbCallStartElapsed=function(t){return this.cdbCallStartElapsed=Math.round(t),this},t.prototype.withCdbCallEndElapsed=function(t){return this.cdbCallEndElapsed=Math.round(t),this},t.prototype.withSetTargetingElapsed=function(t){return this.setTargetingElapsed=Math.round(t),this},t.prototype.withAdapterEndElapsed=function(t){return this.adapterEndElapsed=Math.round(t),this},t.prototype.withAdapterTimeout=function(t){return this.adapterTimeout=t&&Math.round(t),this},t.prototype.withCachedBidsReturned=function(t){return this.cachedBidsReturned=t,this},t.prototype.addSlot=function(t,e,i){var o=0<this.cachedBidsReturned.filter(function(t){return t.impid===i&&t.zoneid===e}).length;return this.slots.push(new A(t,e,i,o)),this},t.prototype.build=function(){var t;return void 0!==this.adapterTimeout&&(t=this.adapterEndElapsed>this.adapterTimeout),new T(64,this.slots,this.elapsed,this.isTimeout,this.pageLoadElapsed,this.adapterStartElapsed,this.cdbCallStartElapsed,this.cdbCallEndElapsed,this.adapterEndElapsed,this.setTargetingElapsed,this.adapterTimeout,t)},t}(),D=function(){function n(){this.localStorageHelper=new r,this.localStorageEnabled=this.localStorageHelper.checkLocalStorage()}return n.prototype.getMetrics=function(t){if(this.localStorageEnabled){var e=n.METRICS_STORAGE_KEY,i=this.localStorageHelper.getItem(e),o=i?f(i):[];return t&&this.localStorageHelper.removeItem(e),o}return[]},n.prototype.setMetrics=function(t){if(this.localStorageEnabled){var e=n.METRICS_STORAGE_KEY;this.localStorageHelper.setItem(e,JSON.stringify(t),36e5)}},n.prototype.storeMetric=function(t){if(this.localStorageEnabled){var e=this.getMetrics(!1);e.push(t),this.setMetrics(e)}},n.METRICS_STORAGE_KEY="criteo_pt_cdb_metrics",n}();function B(t){switch(t.toLowerCase()){case"amp":return I.AMP;default:return I.Unspecified}}(e=I||(I={}))[e.Unspecified=0]="Unspecified",e[e.AMP=1]="AMP";var x=function(){function t(t,e,i,o,n,r,s,a,d,c){this.slots=t,this.context=e,this.metricsManager=i,this.urlBuilder=o,this.profileId=n,this.integrationMode=r||I.Unspecified,this.networkId=s,this.adapterVersion=a,this.gdprConsent=d,this.wrapperVersion=c}return t.prototype.isValid=function(){return 0<this.slots.length},t.prototype.getRequest=function(){for(var t=[],e=0,i=this.slots;e<i.length;e++){var o=i[e],n={slotid:o.slotId,impid:o.impId};if(void 0!==o.zoneId&&(n.zoneid=o.zoneId),void 0!==o.nativeCallback&&(n.native=!0),void 0!==o.transactionId&&(n.transactionid=o.transactionId),void 0!==o.publisherSubId&&(n.publishersubid=o.publisherSubId),void 0!==o.sizes){for(var r=[],s=0,a=o.sizes;s<a.length;s++){var d=a[s];r.push(d.width+"x"+d.height)}n.sizes=r}t.push(n)}var c={publisher:{url:this.context.highestAccessibleUrl},slots:t};void 0!==this.networkId&&(c.publisher.networkid=this.networkId);var l=this.metricsManager.getMetrics(!0);return l.length&&(c.previousBidFeedback=l),this.gdprConsent&&(c.gdprConsent=this.gdprConsent),c},t.prototype.getUrl=function(){return this.urlBuilder.buildUrl(this.profileId,this.context,this.integrationMode,this.adapterVersion,this.wrapperVersion)},t}();function U(t){var e={slots:void 0,time_to_next_call:0};return void 0!==t.exd&&(void 0!==t.exd.time_to_next_call&&(e.time_to_next_call=t.exd.time_to_next_call),e.slots=t.exd.slots,delete t.exd),e}function k(){var i=(new Date).getTime();return"undefined"!=typeof performance&&"function"==typeof performance.now&&(i+=performance.now()),"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(t){var e=(i+16*Math.random())%16|0;return i=Math.floor(i/16),("x"===t?e:3&e|8).toString(16)})}var N=function(t,e,i,o,n,r){this.slotId=k().replace(/-/g,""),this.impId=t,this.zoneId=e,this.nativeCallback=i,this.transactionId=o,this.sizes=n,this.publisherSubId=r};var L=function(){function t(t,e,i){this.hasSetTargetingBeenCalled=!1,this.builder=t,this.timer=void 0!==e?d.CreateWithStartTime(e):d.CreateRunning();var o=this.timer.elapsed();this.builder.withAdapterStartElapsed(o),this.builder.withPageLoadElapsed(d.TimeSincePageLoad()-o),void 0!==i&&this.builder.withAdapterTimeout(i)}return t.prototype.sendRequest=function(t){this.url=t,this.sendTime=d.CreateRunning(),this.builder.withCdbCallStartElapsed(this.timer.elapsed())},t.prototype.requestReceived=function(t){void 0===t&&(t=!1),this.builder.withElapsed(function(t){if(window.performance&&window.performance.getEntries)for(var e=window.performance.getEntries(),i=e.length-1;0<=i;--i){var o=e[i];if(o.name===t&&o.duration)return Math.round(o.duration)}}(this.url)||this.sendTime.elapsed()),this.builder.withCdbCallEndElapsed(this.timer.elapsed()),this.builder.withIsTimeout(t)},t.prototype.setTargeting=function(){this.hasSetTargetingBeenCalled||(this.builder.withSetTargetingElapsed(this.timer.elapsed()),this.hasSetTargetingBeenCalled=!0)},t.prototype.finish=function(t){if(this.builder.withAdapterEndElapsed(this.timer.elapsed()),t&&0!==t.length)for(var e=0,i=t;e<i.length;e++){var o=i[e];this.builder.addSlot(o.imp_id,o.zone_id,o.ad_unit_id)}else this.builder.addSlot("");return this.build()},t.prototype.build=function(){return this.builder.build()},t}(),P=function(){function t(){}return t.generateCacheBuster=function(){return Math.floor(99999999999*Math.random())},t}(),F=function(){function s(t){void 0===t&&(t=!1),this.auditMode=t}return s.prototype.buildUrl=function(t,e,i,o,n){void 0===i&&(i=I.Unspecified);var r=("https:"===e.protocol?"https:":"http:")+s.CRITEO_BIDDER_URL+this.getHandlerPath();return r+="?ptv=64",r+="&profileId="+String(t),r+=e.ctoIdOnPublisherDomain?"&idcpy="+e.ctoIdOnPublisherDomain:"",r+=e.idfs?"&idfs="+e.idfs:"",r+=e.secureId?"&sid="+e.secureId:"",r+=e.isOptOut?"&optout=1":"",i!==I.Unspecified&&(r+="&im="+i),void 0!==o&&(r+="&av="+String(o)),void 0!==n&&(r+="&wv="+encodeURIComponent(n)),r+=e.silentModeIgnored?"&smi=1":"",r+="&cb="+String(P.generateCacheBuster()),r+=e.getContextFlags()},s.prototype.getHandlerPath=function(){return this.auditMode?s.CRITEO_BIDDER_AUDIT_HANDLER:s.CRITEO_BIDDER_HANDLER},s.CRITEO_BIDDER_URL="//bidder.criteo.com/",s.CRITEO_BIDDER_HANDLER="cdb",s.CRITEO_BIDDER_AUDIT_HANDLER="prebid/audit",s}();function K(t){var e="number"==typeof window.PREBID_TIMEOUT?window.PREBID_TIMEOUT:void 0;return t&&e?Math.min(t,e):t||e||void 0}var q,H,G=function(){function o(t,e,i,o,n){var r,s;this.timer=new L(new R,o.auctionStart,K(o.timeout)),this.auctionId=o.auctionId,this.bidRequests=i,this.slots=[];for(var a=0,d=i;a<d.length;a++){var c=d[a];this.slots.push(new N(c.adUnitCode,c.params.zoneId,c.params.nativeCallback,c.transactionId,c.sizes.map(function(t){return new S(t[0],t[1])}),c.params.publisherSubId)),r=c.params.networkId||r,c.params.integrationMode&&(s=B(c.params.integrationMode))}var l={};o.gdprConsent&&(void 0!==o.gdprConsent.consentString&&(l.consentData=o.gdprConsent.consentString),void 0!==o.gdprConsent.gdprApplies&&(l.gdprApplies=!!o.gdprConsent.gdprApplies),o.gdprConsent.vendorData&&o.gdprConsent.vendorData.vendorConsents&&void 0!==o.gdprConsent.vendorData.vendorConsents[u.toString(10)]&&(l.consentGiven=!!o.gdprConsent.vendorData.vendorConsents[u.toString(10)])),this.metricsManager=new D,this.cache=new M(window.criteo_pubtag.context,this.slots,r),this.requestBuilder=new x(this.cache.filterNoBidSlots(this.slots),window.criteo_pubtag.context,this.metricsManager,new F(!1),t,s,r,e,l,n),this.url=this.requestBuilder.getUrl(),window.Criteo.prebid_adapters=window.Criteo.prebid_adapters||{},window.Criteo.prebid_adapters[this.auctionId]=this}return o.prototype.buildCdbUrl=function(){return this.url},o.prototype.buildCdbRequest=function(){if(this.cache.silentModeEnabled())g.Debug("Request ignored because the global silent mode is enabled");else{if(this.requestBuilder.isValid())return this.timer.sendRequest(this.url),this.requestBuilder.getRequest();g.Debug("Request ignored because it doesnt contain any slot")}},o.GetAllAdapters=function(){return window.Criteo.prebid_adapters},o.GetAdapter=function(t){var e="string"==typeof t?t:t.bidRequests[0].auctionId,i=o.GetAllAdapters();if(i&&e in i)return i[e]},o.prototype.createNativeAd=function(t,e,i){return window.criteo_prebid_native_slots=window.criteo_prebid_native_slots||{},window.criteo_prebid_native_slots[t]={callback:i,payload:e},'<script type="text/javascript">\n            var win = window;\n            for (var i = 0; i < 10; ++i) {\n                win = win.parent;\n                if (win.criteo_prebid_native_slots) {\n                    var responseSlot = win.criteo_prebid_native_slots["'+t+'"];\n                    responseSlot.callback(responseSlot.payload);\n                    break;\n                }\n            }\n        <\/script>'},o.prototype.getBidRequestForSlot=function(t){for(var e=0,i=this.bidRequests;e<i.length;e++){var o=i[e];if(o.adUnitCode===t.impid&&(!o.params.zoneId||parseInt(o.params.zoneId,10)===t.zoneid))return o}},o.prototype.interpretResponse=function(t,e){this.timer.requestReceived();var i=U(t),o={};if(void 0!==i.slots)for(var n=0,r=i.slots;n<r.length;n++){o[(c=r[n]).imp_id]=c}var s=[];if(t.slots&&Array.isArray(t.slots))for(var a=0,d=t.slots;a<d.length;a++){var c=d[a],l=this.getBidRequestForSlot(c);if(l){var u=l.bidId,h=c.native?this.createNativeAd(u,c.native,l.params.nativeCallback):c.creative,p=c.ttl||o[c.slotid]&&o[c.slotid].ttl||60;s.push({requestId:u,adId:k(),cpm:c.cpm,ad:h,currency:c.currency,netRevenue:!0,ttl:p,creativeId:u,width:c.width,height:c.height})}else g.Error('Could not get bid request for slot "'+c+'"')}return this.cache.handleResponse(this.slots,t,i,!1),this.metricsManager.storeMetric(this.timer.finish(i.slots)),s},o.prototype.handleBidWon=function(t){this.updateMetric(t,function(t){t.adapterBidWon=!0})},o.prototype.handleBidTimeout=function(){this.timer.requestReceived(!0),this.metricsManager.storeMetric(this.timer.finish())},o.prototype.handleSetTargeting=function(t){var e=this;this.timer.setTargeting(),this.updateMetric(t,function(){return e.timer.build()})},o.prototype.updateMetric=function(t,e){for(var i=this.metricsManager.getMetrics(!1),o=0;o<i.length;++o)for(var n=0,r=i[o].slots;n<r.length;n++){var s=r[n];if(s.adUnitId===t.adUnitCode){var a=e(s);a&&(i[o]=a)}}this.metricsManager.setMetrics(i)},o}(),W=function(){function t(t){this.name=t}return t.prototype.eval=function(t){},t}(),z=function(){function s(t,e,i,o){void 0===o&&(o=!0),this.url=t,this.data=e,this.contentType=i,this.withCredentials=o}return s.prototype.send=function(t,e,i,o){var n=void 0!==this.data?"POST":"GET",r=this.getXMLHttpRequest(n,t,e,i,o);if(void 0!==r)r.send(this.data);else{var s=this.getXDomainRequest(n,t,e,i,o);void 0!==s&&s.send(this.data)}},s.prototype.getXMLHttpRequest=function(t,e,i,o,n){var r=new XMLHttpRequest;if("withCredentials"in r)return r.open(t,this.url,!0),r.timeout=n||s.LOCAL_PASSBACK_TIMEOUT,this.contentType?r.setRequestHeader("Content-type",this.contentType):"POST"===t&&r.setRequestHeader("Content-type","application/x-www-form-urlencoded"),r.withCredentials=this.withCredentials,r.onload=function(){4===r.readyState&&200===r.status?e(r.responseText):i(r.readyState,r.status)},r.onerror=function(){i(void 0,void 0)},o&&(r.ontimeout=o),r},s.prototype.getXDomainRequest=function(t,e,i,o,n){if("undefined"!=typeof XDomainRequest){var r=new XDomainRequest;return r.timeout=n||s.LOCAL_PASSBACK_TIMEOUT,r.open(t,this.url),r.onload=function(){void 0!==r.responseText?e(r.responseText):i(void 0,void 0)},r.onerror&&(r.onerror=function(){i(void 0,void 0)}),r.ontimeout&&o&&(r.ontimeout=o),r}},s.LOCAL_PASSBACK_TIMEOUT=3e4,s}(),X=(q=function(t,e){return(q=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var i in e)e.hasOwnProperty(i)&&(t[i]=e[i])})(t,e)},function(t,e){function i(){this.constructor=t}q(t,e),t.prototype=null===e?Object.create(e):(i.prototype=e.prototype,new i)}),j=function(u){function h(t,e,i,o,n,r,s,a,d,c){var l=u.call(this,h.NAME)||this;return l.profileId=t,l.urlBuilder=e,l.slots=i,l.metricBuilder=new R,l.metricsManager=new D,l.callbackSuccess=o,l.callbackError=n,l.callbackTimeout=r,l.timeout=s,l.networkId=a,l.integrationMode=d,l.adapterVersion=c,l}return X(h,u),h.prototype.setGDPRConsent=function(t){this.gdprConsent=t},h.prototype.getMetricBuilder=function(){return this.metricBuilder},h.prototype.eval=function(t){this.evalWithTimeout(t,void 0)},h.prototype.evalWithTimeout=function(t,e){var o=this,i=h.getCriteoAdapterBidRequest(),n=h.getRequestAuctionStart(i),r=e||K(i&&i.timeout),s=new L(this.metricBuilder,n,r),a=new x(this.slots,t.context,this.metricsManager,this.urlBuilder,this.profileId,this.integrationMode,this.networkId,this.adapterVersion,this.gdprConsent);if(a.isValid()&&"undefined"!=typeof JSON){var d=a.getRequest(),c=JSON.stringify(d),l=a.getUrl(),u=new z(l,c,"application/x-www-form-urlencoded");s.sendRequest(l),u.send(function(t){s.requestReceived();var e=f(t)||{},i=U(e);void 0!==o.callbackSuccess&&o.callbackSuccess(JSON.stringify(e),i),o.metricsManager.storeMetric(s.finish(i.slots))},function(t,e){s.requestReceived(),void 0!==o.callbackError&&o.callbackError(t,e),o.metricsManager.storeMetric(s.finish())},function(){s.requestReceived(!0),void 0!==o.callbackTimeout&&o.callbackTimeout(),o.metricsManager.storeMetric(s.finish())},this.timeout)}else this.callbackError(void 0,void 0)},h.getCriteoAdapterBidRequest=function(){try{return window.pbjs._bidsRequested.find(function(t){return"criteo"===t.bidderCode})}catch(t){return}},h.getRequestAuctionStart=function(t){return t&&t.auctionStart},h.NAME="directbidding",h}(W),V=(H=function(t,e){return(H=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var i in e)e.hasOwnProperty(i)&&(t[i]=e[i])})(t,e)},function(t,e){function i(){this.constructor=t}H(t,e),t.prototype=null===e?Object.create(e):(i.prototype=e.prototype,new i)}),Y=function(h){function p(t,e,i,o,n,r,s,a,d,c){var l=h.call(this,p.NAME)||this,u=Math.max(10*(s||3e3),3e3);return l.cache=new M(window.criteo_pubtag.context,i,a),l.directBiddingEvent=new j(t,e,l.cache.filterNoBidSlots(i),function(t,e){return l.onSuccess(t,e)},function(t,e){return l.onError(t,e)},function(){return l.onHttpTimeout()},u,a,d,c),l.slots=i,l.callbackSuccess=o,l.callbackError=n,l.callbackTimeout=r,l.timeout=s,l.hasTimeouted=!1,l.hasResponded=!1,l}return V(p,h),p.prototype.eval=function(e){var t,i=this;l(t=window)||void 0!==v(t)?o(window,function(t){i.evalWithCmp(e,t)}):this.evalWithCmp(e,void 0)},p.prototype.evalWithCmp=function(t,e){var i=this;if(this.cache.silentModeEnabled())return g.Debug("Request ignored because the global silent mode is enabled"),void this.callbackSuccess("",void 0);setTimeout(function(){return i.onTimeout()},this.timeout||3e3),this.directBiddingEvent.setGDPRConsent(e),this.directBiddingEvent.evalWithTimeout(t,this.timeout)},p.prototype.onSuccess=function(t,e){if(this.hasResponded=!0,void 0!==e){var i=f(t);this.cache.handleResponse(this.slots,i,e,this.hasTimeouted)}this.hasTimeouted||this.callbackSuccess(t,e)},p.prototype.onError=function(t,e){this.hasResponded=!0,this.hasTimeouted||this.callbackError(t,e)},p.prototype.onHttpTimeout=function(){this.hasResponded=!0,this.hasTimeouted||this.callbackTimeout()},p.prototype.onTimeout=function(){if(!this.hasResponded){this.hasTimeouted=!0;var t=this.cache.getCachedBids(this.slots);0===t.length?this.callbackTimeout():(g.Debug("Cached bids returned because of timeout: ['"+t.map(function(t){return t.impid}).join("', '")+"']"),this.directBiddingEvent.getMetricBuilder().withCachedBidsReturned(t),this.callbackSuccess(JSON.stringify({slots:t}),void 0))}},p.prototype.getMetricBuilder=function(){return this.directBiddingEvent.getMetricBuilder()},p.prototype.getBidCache=function(){return this.cache},p.NAME="directbidding",p}(W),J={prebid:"criteo_fast_bid",standalone:"criteo_fast_bid_standalone"};var Z=function(){function t(){}return t.LoadPolyfills=function(){t.DefineIsArray(),t.DefineIndexOf(),t.DefineFilter()},t.DefineIsArray=function(){Array.isArray||(Array.isArray=function(t){return"[object Array]"===Object.prototype.toString.call(t)})},t.DefineIndexOf=function(){Array.prototype.indexOf||(Array.prototype.indexOf=function(t,e){if(void 0===e&&(e=0),void 0===this)throw new TypeError("'this' is null or not defined");var i=this.length;if(0===i)return-1;if(i<=e)return-1;for(var o=Math.max(0<=e?e:i-Math.abs(e),0);o<i;){if(o in this&&this[o]===t)return o;o++}return-1})},t.DefineFilter=function(){Array.prototype.filter||(Array.prototype.filter=function(t){if(void 0===this||void 0===this)throw new TypeError;var e=this.length;if("function"!=typeof t)throw new TypeError;for(var i=[],o=2<=arguments.length?arguments[1]:void 0,n=0;n<e;n++)if(n in this){var r=this[n];t.call(o,r,n,this)&&i.push(r)}return i})},t}(),Q=function(){function p(){}return p.SetCookie=function(t,e,i,o,n){void 0===n&&(n=!1);var r=o||document,s=r.location.hostname,a=new Date;a.setTime(a.getTime()+60*i*60*1e3);var d="expires="+a.toUTCString();if(!n)return p.setCookieString(t,e,d,void 0,r),s;for(var c=s.split("."),l=0;l<c.length;++l){var u=c.slice(c.length-l-1,c.length).join(".");p.setCookieString(t,e,d,u,r);var h=p.GetCookie(t,o);if(h&&h===e)return u}return s},p.DeleteCookie=function(t,e,i){void 0===i&&(i=!1),p.SetCookie(t,"",0,e,i)},p.GetCookie=function(t,e){for(var i=0,o=(e||document).cookie.split(";");i<o.length;i++){var n=o[i],r=n.substr(0,n.indexOf("=")).replace(/^\s+|\s+$/g,""),s=n.substr(n.indexOf("=")+1);if(r===t)return decodeURIComponent(s)}},p.setCookieString=function(t,e,i,o,n){var r=t+"="+encodeURIComponent(e)+";"+i+";";o&&""!==o&&(r+="domain=."+o+";"),n.cookie=r+"path=/"},p}();function $(e,i){try{return decodeURIComponent(e)}catch(t){return void 0!==i?i:e}}var tt,et,it=function(){function o(t,e,i){this.isDebug=e,this.topWin=t,this.topDoc=t.document,this.localStorageHelper=new r(this.topWin),this.localStorageEnabled=this.localStorageHelper.checkLocalStorage(),this.canWriteCookies=this.checkCookiesAreWriteable(),this.topUrl=i}return o.isSafariBrowser=function(){return null!==navigator.userAgent.match(o.SAFARI_CHECK_REGEX)},o.isAndroidBrowser=function(){return-1<navigator.userAgent.toLowerCase().indexOf("android")},o.isFirefoxBrowser=function(){return-1<navigator.userAgent.toLowerCase().indexOf("firefox")},o.prototype.synchronizeCriteoUid=function(t){var e=this;if((t||o.isSafariBrowser()||o.isAndroidBrowser()||o.isFirefoxBrowser())&&this.topWin.addEventListener)if("complete"===this.topDoc.readyState)this.appendGumIframeIfDoesNotExist();else{var i=function(){e.topDoc.removeEventListener("DOMContentLoaded",i),e.topWin.removeEventListener("load",i),e.appendGumIframeIfDoesNotExist()};this.topWin.addEventListener("load",i,!1),this.topDoc.addEventListener("DOMContentLoaded",i,!1)}},o.prototype.appendGumIframeIfDoesNotExist=function(){var i=this,t=this.createGumIframe();this.topDoc.getElementById(o.SYNCFRAME_ID)||(this.topWin.addEventListener("message",function(t){var e=t.data;e&&e.isCriteoMessage&&(t.stopImmediatePropagation(),e.optout?(i.setClientSideOptOut(),i.deleteClientSideUid(),i.deleteClientSideIdfs(),i.deleteClientSideSecureId()):(e.uid&&i.setClientSideUid(e.uid),e.idfs&&i.setClientSideIdfs(e.idfs),e.removeSid?i.deleteClientSideSecureId():e.sid&&i.setClientSideSecureId(e.sid)))},!0),this.topDoc.body.appendChild(t))},o.prototype.getClientSideUid=function(){return this.getFromAllStorages(o.GUID_COOKIE_NAME)},o.prototype.setClientSideUid=function(t){this.writeOnAllStorages(o.GUID_COOKIE_NAME,t,o.GUID_RETENTION_TIME_HOUR)},o.prototype.deleteClientSideUid=function(){this.deleteFromAllStorage(o.GUID_COOKIE_NAME)},o.prototype.getClientSideOptOut=function(){var t=this.getFromAllStorages(o.OPTOUT_COOKIE_NAME);return Boolean(t)},o.prototype.setClientSideOptOut=function(){this.writeOnAllStorages(o.OPTOUT_COOKIE_NAME,"1",o.OPTOUT_RETENTION_TIME_HOUR)},o.prototype.deleteClientSideIdfs=function(){this.deleteFromAllStorage(o.IDFS_COOKIE_NAME)},o.prototype.getClientSideIdfs=function(){return this.getFromAllStorages(o.IDFS_COOKIE_NAME)},o.prototype.setClientSideIdfs=function(t){this.writeOnAllStorages(o.IDFS_COOKIE_NAME,t,o.GUID_RETENTION_TIME_HOUR)},o.prototype.getClientSideSecureId=function(){return this.getFromAllStorages(o.SECURE_ID_COOKIE_NAME)},o.prototype.setClientSideSecureId=function(t){this.writeOnAllStorages(o.SECURE_ID_COOKIE_NAME,t,o.GUID_RETENTION_TIME_HOUR)},o.prototype.deleteClientSideSecureId=function(){this.deleteFromAllStorage(o.SECURE_ID_COOKIE_NAME)},o.prototype.getLocalWebId=function(){var t=this.getFromAllStorages(o.LOCAL_WEB_ID_COOKIE_NAME);return this.canWriteCookies&&(t||(t=k()),this.writeOnAllStorages(o.LOCAL_WEB_ID_COOKIE_NAME,t,o.GUID_RETENTION_TIME_HOUR),t=this.getFromAllStorages(o.LOCAL_WEB_ID_COOKIE_NAME)),t||"NA"},o.prototype.checkCookiesAreWriteable=function(){var t="cto_writeable";Q.SetCookie(t,"1",1,this.topDoc,!0);var e="1"===Q.GetCookie(t,this.topDoc);return Q.DeleteCookie(t,this.topDoc,!0),e},o.prototype.createGumIframe=function(){var t=this.topDoc.createElement("iframe"),e=this.buildSyncframeSrc();return t.src=e,t.id=o.SYNCFRAME_ID,t.style.display="none",t},o.prototype.writeOnAllStorages=function(t,e,i){this.localStorageEnabled&&this.localStorageHelper.setItem(t,e),Q.SetCookie(t,e,i,this.topDoc,!0)},o.prototype.getFromAllStorages=function(t){var e,i=Q.GetCookie(t,this.topDoc);return this.localStorageEnabled&&(e=this.localStorageHelper.getItem(t)||void 0),i||e},o.prototype.deleteFromAllStorage=function(t){Q.DeleteCookie(t,this.topDoc,!0),this.localStorageEnabled&&this.localStorageHelper.removeItem(t)},o.prototype.getTld=function(){var t=Q.SetCookie(o.TLD_TEST_COOKIE_NAME,"test",1,this.topDoc,!0);return Q.DeleteCookie(o.TLD_TEST_COOKIE_NAME,this.topDoc,!0),t},o.prototype.buildSyncframeSrc=function(){var t,e,i=this.getClientSideUid(),o=this.getClientSideIdfs(),n=this.getClientSideOptOut(),r=this.getClientSideSecureId(),s=this.getLocalWebId(),a=this.getTld(),d=encodeURIComponent((t=this.topUrl,e=document.createElement("a"),e.href=t,{protocol:e.protocol,host:e.host,hostname:e.hostname,pathname:"/"===e.pathname[0]?e.pathname.slice(1):e.pathname,search:e.search,href:e.href}).hostname),c="https://gum.criteo.com/syncframe?topUrl="+d+(this.isDebug?"&debug=1":"");return c+="#"+JSON.stringify({optout:n,uid:i,idfs:o,sid:r,origin:"publishertag",version:64,lwid:s,tld:a,topUrl:d})},o.GUID_COOKIE_NAME="cto_idcpy",o.GUID_RETENTION_TIME_HOUR=9360,o.IDFS_COOKIE_NAME="cto_idfs",o.SECURE_ID_COOKIE_NAME="cto_sid",o.LOCAL_WEB_ID_COOKIE_NAME="cto_lwid",o.OPTOUT_COOKIE_NAME="cto_optout",o.OPTOUT_RETENTION_TIME_HOUR=43200,o.TLD_TEST_COOKIE_NAME="cto_pub_test_tld",o.SYNCFRAME_ID="criteo-syncframe",o.SAFARI_CHECK_REGEX=/^Mozilla\/5\.0 \([^)]+\) AppleWebKit\/[^ ]+ \(KHTML, like Gecko\) Version\/([^ ]+)( Mobile\/[^ ]+)? Safari\/[^ ]+$/i,o}(),ot=function(){function t(){}return t.getHighestAccessibleWindow=function(t){var e=t,i=!1;try{for(;e.parent.document!==e.document;){if(!e.parent.document){i=!0;break}e=e.parent}}catch(t){i=!0}return{topFrame:e,err:i}},t.getHighestAccessibleUrl=function(t){var e=t.topFrame;if(!t.err)return e.location.href;try{var i=e.top.location.href;if(i)return i}catch(t){}try{var o=e.location.ancestorOrigins;if(o)return o[o.length-1]}catch(t){}return e.document.referrer},t.inIframe=function(){try{return window.self!==window.top}catch(t){return!0}},t}();(et=tt||(tt={}))[et.InFriendlyIframe=1]="InFriendlyIframe",et[et.InUnfriendlyIframe=2]="InUnfriendlyIframe",et[et.DirectIntegration=3]="DirectIntegration";var nt=function(){function t(t,e){this.charset=t.charset||t.characterSet||"";var i=ot.getHighestAccessibleWindow(e);this.displayContext=this.getDisplayContext(i),this.highestAccessibleUrl=ot.getHighestAccessibleUrl(i),this.synchronizeCriteoUid(i,this.highestAccessibleUrl);var o,n=this.getQueryStringParams(this.highestAccessibleUrl);this.debugMode="1"===n.pbt_debug||!1,this.noLog="1"===n.pbt_nolog||!1,this.shouldIgnoreSilentMode=this.computeShouldIgnoreSilentMode(),this.silentModeIgnored=!1,this.debugMode&&(o=s.Debug,g.LOGLEVEL=o),this.location=e.location,this.protocol=e.location.protocol,this.dising=!1,this.ct0=void 0,this.wpdt0=void 0,this.isAdBlocked=void 0,this.rtaVarNames=[]}return t.prototype.getContextFlags=function(){var t="";return t+=this.debugMode?"&debug=1":"",t+=this.noLog?"&nolog=1":""},t.prototype.getDisplayContext=function(t){return ot.inIframe()?t.err?tt.InUnfriendlyIframe:tt.InFriendlyIframe:tt.DirectIntegration},t.prototype.getQueryStringParams=function(t){var e={},i=t.split("?");if(1<i.length)for(var o=0,n=i[1].split("&");o<n.length;o++){var r=n[o].split("=");e[$(r[0])]=$(r[1])}return e},t.prototype.synchronizeCriteoUid=function(t,e){var i=t.topFrame,o=new it(i,this.debugMode,e);this.ctoIdOnPublisherDomain=o.getClientSideUid(),this.isOptOut=o.getClientSideOptOut(),this.idfs=o.getClientSideIdfs(),this.secureId=o.getClientSideSecureId(),o.synchronizeCriteoUid()},t.prototype.getIdfs=function(){return[this.idfs,this.secureId].join(":")},t.prototype.setIdfs=function(t){var e=t.split(":");e[0]&&(this.idfs=e[0]),e[1]&&(this.secureId=e[1])},t.prototype.computeShouldIgnoreSilentMode=function(){return Math.floor(100*Math.random())<5},t.prototype.setSilentModeIgnored=function(){this.silentModeIgnored=!0},t}(),rt=function(){this.bids={},this.lineItemRanges=[],this.impIds=[]};var st,at,dt,ct,lt,ut=function(){function t(){this.standaloneBidder=new rt,this.events=[],this.context=new nt(document,window),g.Debug("Publisher Tag loaded")}return t.prototype.push=function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];for(var i=0,o=t;i<o.length;i++){var n=o[i];this.events.push(n)}this.evalEvents()},t.prototype.evalEvents=function(){for(var t=0;t<this.events.length;){var e=this.events[t];if("conditionalEvent"!==e.name||e.canEval()){var i=this.events.splice(t,1);try{i[0].eval(this)}catch(t){g.Error("An exception occurred processing an event: "+t.toString())}}else t++}},t.VERSION=64,t}();function ht(t){var e=t,i=function(){try{return e.apply(this,arguments)}catch(t){g.Error("Exception caught: "+t.toString())}};for(var o in i.prototype=e.prototype,e)e.hasOwnProperty(o)&&(i[o]=e[o]);return i}window.criteo_pubtag||(Z.LoadPolyfills(),window.criteo_pubtag=new ut),window.Criteo=function t(e){for(var i in e)if(e.hasOwnProperty(i)){var o=e[i];"function"==typeof o?e[i]=ht(o):"object"==typeof o&&(e[i]=t(o))}return e}({PubTag:{Adapters:{Prebid:G},DirectBidding:{DirectBiddingEvent:Y,DirectBiddingSlot:N,DirectBiddingUrlBuilder:F,Size:S}},events:window.Criteo?window.Criteo.events:[],passbackEvents:window.Criteo?window.Criteo.passbackEvents:[],usePrebidEvents:!window.Criteo||window.Criteo.usePrebidEvents}),!1!==window.Criteo.usePrebidEvents&&(window.Criteo.events=(st=window.Criteo.events,at={push:function(){for(var t=[],e=0;e<arguments.length;e++)t[e]=arguments[e];if(void 0!==t)for(var i=0,o=t;i<o.length;i++){var n=o[i];"function"==typeof n&&ht(n)()}}},st&&Array.isArray(st)&&at.push.apply(at,st),at)),dt="prebid",ct=new r,lt=J[dt],ct.checkLocalStorage()&&null===ct.getItem(lt,864e5)&&new z("//static.criteo.net/js/ld/publishertag."+dt+".js",void 0,void 0,!1).send(function(t){ct.setItem(lt,t,864e5)},function(t,e){g.Error("Could not update FastBid"+(e?" ("+e+")":""))})}();