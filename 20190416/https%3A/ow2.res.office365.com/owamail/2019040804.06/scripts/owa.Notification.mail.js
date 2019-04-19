window.scriptsLoaded = window.scriptsLoaded || {}; window.scriptProcessStart = window.scriptProcessStart || {}; window.scriptProcessStart['owa.Notification.mail.js'] = (new Date()).getTime();(window.$wj=window.$wj||[]).push([[186],{6995:function(n,e,t){"use strict";t.r(e);var r,i=t(427);function a(){return r||(r=new i.a),r}var c,o,s,u,d=t(0),l=t(89),f=function(){return c||(c=Object(l.a)()),c},p=function(){void 0===o&&(o=new Promise(function(n){s=n}))},b=function(){return p(),o},h=function(){p(),s()};!function(n){n[n.Uninitialized=0]="Uninitialized",n[n.Disconnected=1]="Disconnected",n[n.Pending=2]="Pending",n[n.Connected=3]="Connected"}(u||(u={}));var v,m={ChannelData:"ChannelData",SubscriptionAdded:"SubscriptionAdded",SubscriptionRemoved:"SubscriptionRemoved",SubscriptionUpdated:"SubscriptionUpdated",NotificationData:"NotificationData",TraceWarn:"TraceWarn",TraceError:"TraceError"};function g(n){a().emit(m.TraceWarn,n)}var w=!1;function _(){return w||I(),Object.keys(v).map(function(n){return v[n].refs[0].subscription})}function y(n){return w||I(),R(n)?v[n].refs:[]}function k(n){return v[n]}function R(n){return n in v}function I(){v={},w=!0}function S(n){try{n()}catch(n){e=n,a().emit(m.TraceError,e)}var e}var T="Reload";function x(n,e){var t,r;a().emit(m.NotificationData,n);var i=y(n.id).map(function(n){return n.callback}),c=function(e){S(function(){e(n)})};try{for(var o=d.__values(i),s=o.next();!s.done;s=o.next()){c(s.value)}}catch(n){t={error:n}}finally{try{s&&!s.done&&(r=o.return)&&r.call(o)}finally{if(t)throw t.error}}}function C(n){return{id:n,EventType:T}}function D(){var n,e,t=_();try{for(var r=d.__values(t),i=r.next();!i.done;i=r.next()){x(C(i.value.subscriptionId))}}catch(e){n={error:e}}finally{try{i&&!i.done&&(e=r.return)&&e.call(r)}finally{if(n)throw n.error}}}var E=[],U=!1,j=function(){return E},H=function(n){return E.push(n)},M=function(){return E=[]},O=function(n){return U=n},P=function(){return U},A=t(4884),N=t.n(A),q=t(4886),z=t.n(q),W=t(31),F=t(5),G=3,J=8,Q=3e5,X=500;function Y(n){return d.__awaiter(this,void 0,void 0,function(){var e,t=this;return d.__generator(this,function(r){switch(r.label){case 0:return 0!==(e=k(n.subscriptionId)).pendingRetryHandle&&(window.clearTimeout(e.pendingRetryHandle),e.pendingRetryHandle=0),e.status=2,en(n,e),Object(F.d)("fwk-batchSubscriptions")?(H(n),P()||(window.setTimeout(function(){return d.__awaiter(t,void 0,void 0,function(){var n;return d.__generator(this,function(e){switch(e.label){case 0:return n=j(),M(),O(!1),[4,B(n)];case 1:return e.sent(),[2]}})})},X),O(!0)),[3,3]):[3,1];case 1:return[4,B([n])];case 2:r.sent(),r.label=3;case 3:return[2]}})})}function B(n){return d.__awaiter(this,void 0,void 0,function(){var e,t,r=this;return d.__generator(this,function(i){switch(i.label){case 0:return i.trys.push([0,3,,5]),[4,N()({request:{Header:Object(W.getJsonRequestHeader)()},subscriptionData:n.map(function(n){return{SubscriptionId:n.subscriptionId,Parameters:n.subscriptionParameters}})})];case 1:return e=i.sent(),[4,nn(n,function(n,t){return d.__awaiter(r,void 0,void 0,function(){var r;return d.__generator(this,function(i){switch(i.label){case 0:return 0===(r=e.filter(function(n){return n.SubscriptionId===t.subscriptionId})).length?[3,2]:[4,L(r[0],t,n)];case 1:return i.sent(),[3,4];case 2:return[4,V(t,n,new Error(t.subscriptionId+" not in subscription responses"))];case 3:i.sent(),i.label=4;case 4:return[2]}})})})];case 2:return i.sent(),[3,5];case 3:return t=i.sent(),[4,nn(n,function(n,e){return d.__awaiter(r,void 0,void 0,function(){return d.__generator(this,function(r){switch(r.label){case 0:return[4,V(e,n,t)];case 1:return r.sent(),[2]}})})})];case 4:return i.sent(),[3,5];case 5:return[2]}})})}function K(n){return d.__awaiter(this,void 0,void 0,function(){return d.__generator(this,function(e){switch(e.label){case 0:return e.trys.push([0,2,,3]),[4,z()({subscriptionData:[{SubscriptionId:n.subscriptionId,Parameters:n.subscriptionParameters}]})];case 1:return e.sent(),[3,3];case 2:return g("Subscription unsubscribe failed: "+e.sent().message),[3,3];case 3:return[2]}})})}function L(n,e,t){return d.__awaiter(this,void 0,void 0,function(){var r,i,a;return d.__generator(this,function(c){switch(c.label){case 0:return n.SuccessfullyCreated?[3,2]:[4,Z(e,t,n.ErrorInfo)];case 1:return c.sent(),[3,3];case 2:if(t.retries>0)for(r=y(e.subscriptionId),i=0;i<r.length;i++)(a=r[i]).subscription.onReconnected&&S(a.subscription.onReconnected);t.retries=0,t.pendingRetryHandle=0,t.status=3,en(e,t,""),c.label=3;case 3:return[2]}})})}function V(n,e,t){return d.__awaiter(this,void 0,void 0,function(){return d.__generator(this,function(r){switch(r.label){case 0:return[4,Z(n,e,t.message)];case 1:return r.sent(),[2]}})})}function Z(n,e,t){return d.__awaiter(this,void 0,void 0,function(){var r,i,a;return d.__generator(this,function(c){switch(c.label){case 0:if(function(n){var e,t,r=C(n),i=y(n),a=function(n){!0!==n.subscription.noSubscriptionFailureReload&&S(function(){n.callback(r)})};try{for(var c=d.__values(i),o=c.next();!o.done;o=c.next())a(o.value)}catch(n){e={error:n}}finally{try{o&&!o.done&&(t=c.return)&&t.call(c)}finally{if(e)throw e.error}}}(n.subscriptionId),0===e.retries)for(r=y(n.subscriptionId),i=function(n){var e=r[n];e.subscription.onDisconnected&&S(function(){e.subscription.onDisconnected(t)})},a=0;a<r.length;a++)i(a);return e.retries+=1,e.status=1,e.retries<G?[4,Y(n)]:[3,2];case 1:return c.sent(),[3,3];case 2:e.retries<J&&(e.pendingRetryHandle=window.setTimeout(function(){e.pendingRetryHandle=0,Y(n)},Q)),c.label=3;case 3:return en(n,e,t),[2]}})})}function nn(n,e){return d.__awaiter(this,void 0,void 0,function(){var t=this;return d.__generator(this,function(r){switch(r.label){case 0:return[4,Promise.all(n.map(function(n){return d.__awaiter(t,void 0,void 0,function(){var t;return d.__generator(this,function(r){switch(r.label){case 0:return(t=k(n.subscriptionId))?[4,e(t,n)]:[2];case 1:return r.sent(),[2]}})})}))];case 1:return r.sent(),[2]}})})}function en(n,e,t){a().emit(m.SubscriptionUpdated,n,e,t)}var tn,rn,an,cn,on,sn=t(267),un="pg",dn="ReloadAllNotification",ln=-1,fn=6e4;function pn(){tn.qs={UA:"0",cid:an.channelId,"X-OWA-CANARY":Object(sn.getOwaCanaryCookie)()}}function bn(){an.giveUpReconnecting=!1,an.reconnectScheduled=!1,tn.start(rn)}function hn(n){var e,t,r=n;try{for(var i=d.__values(r),a=i.next();!a.done;a=i.next()){var c=a.value;c.id===un?vn(c):c.id===dn?(D(),In("reload all"),an.mark++):(x(c),an.mark++)}}catch(n){e={error:n}}finally{try{a&&!a.done&&(t=i.return)&&t.call(i)}finally{if(e)throw e.error}}}function vn(n){switch("update"!==n.data&&In(n.data),n.data){case"alive1":!function(n){2===an.state&&In("alive1 when channel was already ready");In("channel ids: local "+an.channelId+" server "+n.cid),In("client mark: "+an.mark+", server mark: "+n.mark),an.channelId=n.cid,an.state=2,pn(),mn(n),an.mark=0,h()}(n);break;case"reinitSubscriptions":Promise.all(_().map(function(n){Y(n)})),In("reinit subscriptions");break;case"validateSubscriptions":In("validate subscriptions:"+function(n){var e=[];if(null!=n){for(var t={},r=0;r<n.length;++r)null!=n[r]&&(t[n[r]]=!0);for(var i=_(),a=0;a<i.length;++a)3!=k(i[a].subscriptionId).status||t[i[a].subscriptionId]||(e.push(i[a].subscriptionId),Y(i[a]))}return e}(n.subscriptionIds).join("|"));break;case"update":mn(n);break;case"backendConnectionDropped":!function(){wn();var n=Math.floor(Math.random()*fn);an.reconnectTimeout=cn.backoffMaximum,kn(n)}(),In("backend connection dropped");break;case"diagnostic":In("diagnostic: "+n.message)}}function mn(n){n.mark!==an.mark&&(In("mark mismatch local: "+an.mark+", server: "+n.mark),D(),an.mark=n.mark)}function gn(n){n.context&&(401===n.context.status||440===n.context.status?(In("session timed out"),an.giveUpReconnecting=!0,cn.handleSessionTimeout&&cn.handleSessionTimeout()):449===n.context.status&&(In("Canary cookie expiration"),pn()))}function wn(){In("connection stopped"),an.state=3,an.giveUpReconnecting=!0,tn.stop()}function _n(){1==an.state?an.state=0:2!=an.state&&4!=an.state||(an.state=3),!0!==an.giveUpReconnecting&&kn()}function yn(n){switch(n.newState){case 1:0===an.state?(an.state=1,In("channel initialized")):3===an.state&&(an.state=4,In("channel reconnecting")),an.reconnectTimeout=Math.abs(cn.minimumReconnectInterval),an.checkReadyTimer=window.setTimeout(Rn,cn.readyCheckTimeout);break;case 4:case 2:1===an.state?(an.state=0,In("channel uninitialized")):2===an.state&&(an.state=4,In("channel reconnecting")),an.checkReadyTimer!==ln&&(window.clearTimeout(an.checkReadyTimer),an.checkReadyTimer=ln)}}function kn(n){var e=Math.abs(an.reconnectTimeout);void 0!==n&&(e+=n),In("retrying connection with backoff "+e),window.setTimeout(bn,e),an.reconnectTimeout=Math.min(2*Math.abs(an.reconnectTimeout),Math.abs(cn.backoffMaximum)),an.reconnectScheduled=!0}function Rn(){2!==an.state&&(In("ready check timer expired"),wn(),kn())}function In(n){a().emit(m.ChannelData,n)}function Sn(n,e,t,r){tn=n,rn=e,cn=r,(an=t).channelId=f(),tn.received(hn),tn.error(gn),tn.disconnected(_n),tn.stateChanged(yn),pn();var i=tn.stop.bind(tn);tn.stop=function(n,e){i(!0,e)},$.signalR.ajaxDefaults.timeout=6e4,$.signalR.transports.serverSentEvents.timeOut=6e4,bn()}!function(n){n[n.Connecting=0]="Connecting",n[n.Connected=1]="Connected",n[n.Reconnecting=2]="Reconnecting",n[n.Disconnected=4]="Disconnected"}(on||(on={}));var Tn=t(4887);function xn(n){window.$=Tn,window.jQuery=Tn,t(4888);var e={state:0,channelId:null,mark:0,reconnectTimeout:n.minimumReconnectInterval,reconnectScheduled:!1,giveUpReconnecting:!1,checkReadyTimer:-1};if(Object(F.d)("fwk-patchSignalRGetUrl")){var r=Tn.signalR.transports._logic.getUrl;Tn.signalR.transports._logic.getUrl=function(n,e,t,i,a){return n.appRelativeUrl=n.url,r(n,e,t,i,a)}}Sn(Tn.connection(n.channelEndpoint),{transport:[Tn.signalR.transports.serverSentEvents.name,Tn.signalR.transports.foreverFrame.name],pingInterval:n.pingInterval},e,n)}function Cn(n,e){!function(n,e){w||I(),R(n.subscriptionId)||(v[n.subscriptionId]={refs:[],status:0,retries:0,pendingRetryHandle:0}),v[n.subscriptionId].refs.push({subscription:n,callback:e})}(n,e),function(n){d.__awaiter(this,void 0,void 0,function(){var e;return d.__generator(this,function(t){switch(t.label){case 0:return n.requiresExplicitSubscribe?0!==(e=k(n.subscriptionId)).status?[3,2]:(a().emit(m.SubscriptionAdded,n),[4,Y(n)]):[2];case 1:return t.sent(),[3,3];case 2:en(n,e),t.label=3;case 3:return[2]}})})}(n)}function Dn(n,e){!function(n,e){if(R(n.subscriptionId)){for(var t=v[n.subscriptionId].refs,r=0;r<t.length;r++)if(t[r].callback===e){t.splice(r,1);break}0===t.length&&(0!==v[n.subscriptionId].pendingRetryHandle&&window.clearTimeout(v[n.subscriptionId].pendingRetryHandle),delete v[n.subscriptionId])}else g("Tried to remove "+n.subscriptionId+" from the subscription tracker when it didn't exist")}(n,e),function(n){d.__awaiter(this,void 0,void 0,function(){return d.__generator(this,function(e){switch(e.label){case 0:return n.requiresExplicitSubscribe?R(n.subscriptionId)?[3,2]:(a().emit(m.SubscriptionRemoved,n),[4,K(n)]):[2];case 1:e.sent(),e.label=2;case 2:return[2]}})})}(n)}t.d(e,"SubscriptionStatus",function(){return SubscriptionStatus}),t.d(e,"EventEmitter",function(){return En}),t.d(e,"subscribe",function(){return Cn}),t.d(e,"unsubscribe",function(){return Dn}),t.d(e,"getChannelId",function(){return f}),t.d(e,"getChannelReady",function(){return b}),t.d(e,"initializeNotificationManager",function(){return xn}),t.d(e,"getNotificationEmitter",function(){return a}),t.d(e,"NotificationEventType",function(){return m});var En=typeof i.a}}]);
//# sourceMappingURL=owa.Notification.mail.js.map
window.scriptsLoaded['owa.Notification.mail.js'] = 1; window.scriptProcessEnd = window.scriptProcessEnd || {}; window.scriptProcessEnd['owa.Notification.mail.js'] = (new Date()).getTime();