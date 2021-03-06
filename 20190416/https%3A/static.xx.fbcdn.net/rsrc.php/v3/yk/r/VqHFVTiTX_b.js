if (self.CavalryLogger) { CavalryLogger.start_js(["hZNFK"]); }

__d("RTISubscriptionData",["ChannelConstants","areEqual"],(function(a,b,c,d,e,f){"use strict";__p&&__p();var g=b("ChannelConstants").SUBSCRIPTION_STATE;a=function(){__p&&__p();function a(a,b,c,d,e,f,h){this.$1=a,this.$2=b,this.$7=!0,this.$8=!1,this.$9=g.SUBSCRIBE,this.$10=null,this.$11=Date.now(),this.$3=d,this.$4=e?e:null,this.$5=f?f:null,this.$6=h?h:null,this.$12=c}var c=a.prototype;c.matchesContext=function(a){return b("areEqual")(this.$3,a)};c.getCreatedTime=function(){return this.$11};c.getTopic=function(){return this.$1};c.getViewId=function(){return this.$12};c.getSubscribeCallback=function(){return this.$4};c.setSubscribeCallback=function(a){this.$4=a};c.getUnsubscribeCallback=function(){return this.$6};c.setUnsubscribeCallback=function(a){this.$6=a};c.getUnsubscribeHook=function(){return this.$5};c.setUnsubscribeHook=function(a){this.$5=a};c.getMessageListener=function(){return this.$2};c.setMessageListener=function(a){this.$2=a};c.getArbiterToken=function(){return this.$10};c.setArbiterToken=function(a){this.$10=a};c.isAlive=function(){return this.$9!=g.UNSUBSCRIBE};c.isMutatingContext=function(){return this.$9==g.MUTATE_CONTEXT};c.isDirty=function(){return this.$7};c.setDirty=function(a){this.$7=a};c.getState=function(){return this.$9};c.setState=function(a){this.$9=a};c.getContext=function(){return this.$3};c.isSent=function(){return this.$8};c.setSent=function(a){this.$8=a};c.prepareMutateContext=function(a){this.setState(g.MUTATE_CONTEXT),this.setDirty(!0),this.setSent(!1),this.$3=a};c.prepareUnsubscribe=function(){this.setState(g.UNSUBSCRIBE),this.setDirty(!0),this.setSent(!1),this.$2=null};return a}();e.exports=a}),null);
__d("RTISubscriptionStore",["Arbiter","BanzaiODS","ChannelConstants","ErrorUtils","RTISubscriptionData","SkywalkerUtils"],(function(a,b,c,d,e,f){"use strict";__p&&__p();var g=b("ChannelConstants").SUBSCRIPTION_STATE;a=function(){__p&&__p();function a(){this.$1={},this.$2=1}var c=a.prototype;c.subscribe=function(a,c,d,e,f,h){__p&&__p();d=b("SkywalkerUtils").patchContext(d||{});var i=this.$3(a,d);if(i){var j=i.getState()==g.UNSUBSCRIBE&&i.isDirty()&&!i.isSent();i.isAlive()?b("BanzaiODS").bumpEntityKey("RTISubscriptionStore","duplicate_subscription_alive"):j?b("BanzaiODS").bumpEntityKey("RTISubscriptionStore","duplicate_subscription_unflushed_unsubscribe"):b("BanzaiODS").bumpEntityKey("RTISubscriptionStore","duplicate_subscription_unknown");if(i.isAlive()||j){i.setMessageListener(c);i.setSubscribeCallback(e);i.setUnsubscribeHook(f);i.setUnsubscribeCallback(h);if(j){i.setDirty(!1);i.setSent(!0);i.setState(g.SUBSCRIBE);j=b("ChannelConstants").getRTISkywalkerArbiterType(i.getTopic(),i.getViewId());i.setArbiterToken(this.$4(j,i.getTopic(),i))}return i}}j=this.$2;this.$2+=1;i=new(b("RTISubscriptionData"))(a,c,j,d,e,f,h);c=b("ChannelConstants").getRTISkywalkerArbiterType(a,j);i.setArbiterToken(this.$4(c,a,i));a in this.$1||(this.$1[a]=new Set());this.$1[a].add(i);return i};c.unsubscribe=function(a){if(!this.isSubscribed(a))return;a.prepareUnsubscribe();var c=a.getArbiterToken();c&&(b("Arbiter").unsubscribe(c),a.setArbiterToken(null))};c.mutateContext=function(a,b){if(!this.isSubscribed(a))return;a.prepareMutateContext(b)};c.isSubscribed=function(a){return a.getTopic()in this.$1&&this.$1[a.getTopic()].has(a)&&a.isAlive()};c.clearSubscriptions=function(){this.$1={}};c.deleteSubscriptions=function(a){var b=this,c=[];this.forEachSubscription(function(d){a.call(b,d)&&c.push(d)});c.forEach(function(a){if(a.getTopic()in b.$1){var c=b.$1[a.getTopic()];c["delete"](a)}})};c.forEachSubscription=function(a){__p&&__p();for(var b in this.$1){var c=this.$1[b];for(var c=c,d=Array.isArray(c),e=0,c=d?c:c[typeof Symbol==="function"?Symbol.iterator:"@@iterator"]();;){var f;if(d){if(e>=c.length)break;f=c[e++]}else{e=c.next();if(e.done)break;f=e.value}f=f;if(a.call(this,f))return}}};c.$3=function(a,b){__p&&__p();a=this.$1[a];if(!a)return null;for(var a=a,c=Array.isArray(a),d=0,a=c?a:a[typeof Symbol==="function"?Symbol.iterator:"@@iterator"]();;){var e;if(c){if(d>=a.length)break;e=a[d++]}else{d=a.next();if(d.done)break;e=d.value}e=e;if(e.matchesContext(b))return e}return null};c.$4=function(a,c,d){var e=this;return b("Arbiter").subscribe(a,function(a,f){b("BanzaiODS").bumpEntityKey("RTISubscriptionStore","skywalker_subscription_delivery"),f.obj.forEach(function(a){a={topic:c,payload:a};var f=d.getMessageListener();f&&b("ErrorUtils").applyWithGuard(f,e,[a])})})};return a}();e.exports=a}),null);
__d("StreamStateMachine",["StreamStateMachineConstants"],(function(a,b,c,d,e,f){"use strict";__p&&__p();var g=b("StreamStateMachineConstants").events,h=b("StreamStateMachineConstants").states,i=babelHelpers["extends"]({},g,{GQLS_STATE_TRANSIT_ON_REFRESH:"onRefresh"});a=function(){__p&&__p();function a(a,b){a===void 0&&(a=!1),b===void 0&&(b=1e4),this.$1=b,this.$2=null,this.$3=null,this.$5=a,this.$4=null}var b=a.prototype;b.start=function(){this.$6(i.GQLS_STATE_TRANSIT_ON_CREATE),this.$5||this.$6(i.GQLS_STATE_TRANSIT_ON_ACTIVE)};b.ping=function(){switch(this.$4){case h.GQLS_STATE_ACTIVE:this.$6(i.GQLS_STATE_TRANSIT_ON_REFRESH);break;case h.GQLS_STATE_PAUSED:this.$6(i.GQLS_STATE_TRANSIT_ON_RESUME);break;case h.GQLS_STATE_CREATED:this.$6(i.GQLS_STATE_TRANSIT_ON_ACTIVE);break;case h.GQLS_STATE_TERMINATED:break}};b.kill=function(){this.$6(i.GQLS_STATE_TRANSIT_ON_TERMINATE)};b.setLifecycleHandler=function(a){this.$3=a};b.getState=function(){return this.$4};b.$6=function(a){__p&&__p();switch(a){case i.GQLS_STATE_TRANSIT_ON_CREATE:this.$7();break;case i.GQLS_STATE_TRANSIT_ON_ACTIVE:this.$8();break;case i.GQLS_STATE_TRANSIT_ON_REFRESH:this.$9();break;case i.GQLS_STATE_TRANSIT_ON_PAUSE:this.$10();break;case i.GQLS_STATE_TRANSIT_ON_RESUME:this.$11();break;case i.GQLS_STATE_TRANSIT_ON_TERMINATE:this.$12();break}};b.$7=function(){this.$4=h.GQLS_STATE_CREATED,this.$3&&this.$3(g.GQLS_STATE_TRANSIT_ON_CREATE)};b.$8=function(){this.$4=h.GQLS_STATE_ACTIVE,this.$3&&this.$3(g.GQLS_STATE_TRANSIT_ON_ACTIVE),this.$13()};b.$9=function(){clearTimeout(this.$2),this.$13()};b.$10=function(){this.$4=h.GQLS_STATE_PAUSED,this.$3&&this.$3(g.GQLS_STATE_TRANSIT_ON_PAUSE)};b.$11=function(){this.$4=h.GQLS_STATE_ACTIVE,this.$3&&this.$3(g.GQLS_STATE_TRANSIT_ON_RESUME),this.$13()};b.$12=function(){clearTimeout(this.$2),this.$4=h.GQLS_STATE_TERMINATED};b.$13=function(){var a=this;this.$5&&(this.$2=setTimeout(function(){a.$6(g.GQLS_STATE_TRANSIT_ON_PAUSE)},this.$1))};return a}();e.exports=a}),null);
__d("RTISubscriptionToken",["StreamStateMachine","gkx"],(function(a,b,c,d,e,f){__p&&__p();a=function(){"use strict";__p&&__p();function a(a,c,d,e,f){__p&&__p();this.$1=a;this.$2=c;this.$4=d;this.$5=e;this.$3=f;this.$6=null;if(b("gkx")("676931")){a=this.getContext();c=this.hasHeartbeatOption(a);this.$7=new(b("StreamStateMachine"))(c);this.$7.start()}}var c=a.prototype;c.setFriendFanoutToken=function(a){this.$6=a};c.getFriendFanoutToken=function(){return this.$6};c.getSubscriptionData=function(){return this.$1};c.isSubscribed=function(){return this.$3(this.$1)};c.getContext=function(){return this.$1.getContext()};c.mutateContext=function(a){this.$4(this.$1,a)};c.unsubscribe=function(){var a=this.$1.getUnsubscribeHook();a&&a();this.$2(this.$1);this.$6&&this.$6.unsubscribe();b("gkx")("676931")&&(this.$7&&this.$7.kill())};c.fastUnsubscribe=function(){this.unsubscribe(),this.$5()};c.hasHeartbeatOption=function(a){if(a&&a.transformContext){a=JSON.parse(a.transformContext);if(a.serializedQueryParameters){a=JSON.parse(a.serializedQueryParameters);if(a&&a["%options"]&&a["%options"].heartbeat)return!0}}return!1};c.ping=function(){b("gkx")("676931")&&(this.$7&&this.$7.ping())};c.handleLifecycles=function(a){b("gkx")("676931")&&(this.$7&&this.$7.setLifecycleHandler(a))};return a}();e.exports=a}),null);
__d("SkywalkerWebClientTypedLogger",["Banzai","GeneratedLoggerUtils","nullthrows"],(function(a,b,c,d,e,f){"use strict";__p&&__p();a=function(){__p&&__p();function a(){this.$1={}}var c=a.prototype;c.log=function(){b("GeneratedLoggerUtils").log("logger:SkywalkerWebClientLoggerConfig",this.$1,b("Banzai").BASIC)};c.logVital=function(){b("GeneratedLoggerUtils").log("logger:SkywalkerWebClientLoggerConfig",this.$1,b("Banzai").VITAL)};c.logImmediately=function(){b("GeneratedLoggerUtils").log("logger:SkywalkerWebClientLoggerConfig",this.$1,{signal:!0})};c.clear=function(){this.$1={};return this};c.getData=function(){return babelHelpers["extends"]({},this.$1)};c.updateData=function(a){this.$1=babelHelpers["extends"]({},this.$1,a);return this};c.setClientSessionUuid=function(a){this.$1.client_session_uuid=a;return this};c.setClientTime=function(a){this.$1.client_time=a;return this};c.setEventName=function(a){this.$1.event_name=a;return this};c.setGateway=function(a){this.$1.gateway=a;return this};c.setMessage=function(a){this.$1.message=a;return this};c.setTime=function(a){this.$1.time=a;return this};c.setTopic=function(a){this.$1.topic=a;return this};c.setVC=function(a){this.$1.vc=a;return this};c.setWeight=function(a){this.$1.weight=a;return this};return a}();c={client_session_uuid:!0,client_time:!0,event_name:!0,gateway:!0,message:!0,time:!0,topic:!0,vc:!0,weight:!0};e.exports=a}),null);
__d("SkywalkerLogger",["BanzaiODS","FBLogger","LogHistory","SkywalkerWebClientTypedLogger","nullthrows","uuid"],(function(a,b,c,d,e,f){__p&&__p();var g="skywalker_web_client",h=b("LogHistory").getInstance(g);a=function(){"use strict";__p&&__p();function a(a){a===void 0&&(a={}),this.$1=a,this.$1.client_session_uuid==null&&(this.$1.client_session_uuid=b("uuid")())}var c=a.prototype;c.log=function(a){a=this.$2(a);var c=b("nullthrows")(a.event_name);h.log(c,a);this.$3(a)};c.warn=function(a){a=this.$2(a);var c=b("nullthrows")(a.event_name);h.warn(c,a);b("FBLogger")(g).warn(c);this.$3(a)};c.error=function(a){a=this.$2(a);var c=b("nullthrows")(a.event_name);h.error(c,a);b("FBLogger")(g).mustfix(c);this.$3(a)};c.bump=function(a){b("BanzaiODS").bumpEntityKey(g,a)};c.$2=function(a){a=babelHelpers["extends"]({},this.$1,a);a.client_time==null&&(a.client_time=Date.now());return a};c.$3=function(a){var c=new(b("SkywalkerWebClientTypedLogger"))();c.updateData(a);c.log()};return a}();e.exports=a}),null);
__d("RTISubscriptionManager",["Arbiter","BanzaiODS","Bootloader","ChannelConstants","CurrentUser","ErrorUtils","RTIFriendFanoutConfig","RTISubscriptionManagerConfig","RTISubscriptionStore","RTISubscriptionToken","Run","SkywalkerLogger","SystemEvents","gkx","setTimeoutAcrossTransitions"],(function(a,b,c,d,e,f){"use strict";__p&&__p();var g=b("ChannelConstants").SUBSCRIPTION_STATE;a=function(){__p&&__p();function a(){__p&&__p();var a=this;this.PULL_HINT_DELAY_MILLIS=1e4;this.$1=new(b("RTISubscriptionStore"))();this.$2=new(b("SkywalkerLogger"))({gateway:"chatproxy"});this.$3=!1;this.$4=!1;this.$5=!1;this.$6=!1;this.$7=!1;this.$8=!0;this.$9=0;this.$10=document.readyState==="complete";b("Run").onAfterLoad(function(){a.$10=!0,a.flush()});this.$11=null;b("Arbiter").subscribe(b("ChannelConstants").ON_ENTER_STATE,function(c,d){if(!a.$11)return;c=/pull/.test(d.state);!a.$3&&c?(a.$4=!0,a.$5||(a.$5=!0,b("setTimeoutAcrossTransitions")(function(){a.$3=a.$4,a.$5=!1,a.$3&&a.flush()},a.PULL_HINT_DELAY_MILLIS))):!c?(a.$4=!1,a.$3=!1):c&&(a.$3=!0,a.flush())});b("SystemEvents").subscribe(b("SystemEvents").ONLINE,function(b,c){c||(a.$3=!1,a.$4=!1)});b("SystemEvents").subscribe(b("SystemEvents").USER,function(b,c){a.$3=!1,a.$4=!1,a.$1.clearSubscriptions()});b("Arbiter").subscribe(b("ChannelConstants").RTI_SESSION,function(b,c){!a.$11&&c&&a.deleteSubscriptions(function(a){return a.getState()===g.UNSUBSCRIBE}),a.$11=c,a.$11&&(a.$3=!0,a.flush())});b("Arbiter").subscribe(b("ChannelConstants").ON_INVALID_HISTORY,function(){a.$3=!0,a.forEachSubscription(function(a){return a.setDirty(!0)}),a.getCurrentSession()});this.getCurrentSession();b("Arbiter").subscribe(b("ChannelConstants").SKYWALKER,function(c,d){c=d.obj.topic;var e=d.obj.view_id,f={};c!=null?a.$2.log({event_name:"payload_received",topic:c}):a.$2.error({event_name:"payload_parse_error",message:"Missing Skywalker topic field in payload"});d.obj.payloads===void 0?f.obj=[d.obj.payload]:f.obj=d.obj.payloads;d=b("ChannelConstants").getRTISkywalkerArbiterType(c,e);b("Arbiter").inform(d,f)})}var c=a.prototype;c.subscribe=function(a,c,d,e,f,g){__p&&__p();var h=this;e=this.$1.subscribe(a,function(d){if(!b("gkx")("676931")){c(d);return}h.isHeartbeat(d.payload)?h.$2.log({event_name:"heartbeat_received",topic:a}):c(d);i.ping()},d,e,f,g);var i=this.$12(e);f=a.substr(0,a.lastIndexOf("/"));if(b("RTIFriendFanoutConfig").passFriendFanoutSubscribeGK&&b("RTIFriendFanoutConfig").topicPrefixes.indexOf(f)>=0){g=a+"_user_id_"+b("CurrentUser").getID();f=this.$1.subscribe(g,c,d);g=this.$12(f);i.setFriendFanoutToken(g)}e.isDirty()&&this.flush();return i};c.mutateContext=function(a,b){a.getTopic(),this.$1.isSubscribed(a)&&(this.$1.mutateContext(a,b),this.flush())};c.isHeartbeat=function(a){try{a=JSON.parse(a);if(a.heartbeat)return!0}catch(a){}return!1};c.unsubscribe=function(a){this.$1.unsubscribe(a)};c.unsubscribeAll=function(a){if(!this.isReady()||this.$11==null)return;var b=this.$11;this.$2.bump("unsubscribe_all");var c={reset:"t"};a=a!=null?a:function(a){};b.issueRequest("/sub",c,{},a)};c.activePing=function(){if(!this.isReady()||this.$11==null)return;var a={state:"active"};this.$11.issueRequest("/active_ping",a,{},function(a){})};c.flush=function(){__p&&__p();var a=this;if(!this.isReady()||this.$11==null||this.$6){this.$7=!0;this.$11==null&&this.getCurrentSession();return}var c=this.$11;this.$6=!0;this.$7=!1;var d=this.getMaxConsecutiveFlushFailures();if(this.$9>=d){this.$2.warn({event_name:"reset_state"});this.$9=0;this.$1.clearSubscriptions();this.unsubscribeAll(function(){a.$6=!1});return}var e=[],f={};d=!0;var i=0,j=function(b){__p&&__p();if(i>=a.getMaxFlushBatchSize()){a.$7=!0;return!0}if(b.isDirty()){b.getState()===g.MUTATE_CONTEXT&&(d=!1);var c="subscriptions",h=f[c];h||(h=[],f[c]=h);e.push(b);b.setDirty(!1);b.setSent(!1);c={topic:b.getTopic(),state:b.getState(),context:b.getContext(),viewId:b.getViewId()};i+=1;h.push(c)}else d=!1;return!1};this.forEachSubscription(j);if(d&&f.subscriptions&&f.subscriptions.length>0){j=[];for(var k=0;k<f.subscriptions.length;k++)f.subscriptions[k].state===g.SUBSCRIBE&&j.push(f.subscriptions[k]);f.subscriptions=j;this.$8=!0}k=function(d){__p&&__p();var f=d.data!=null;a.$9=f?0:a.$9+1;a.$8&&f&&(a.$8=!1);for(var i=0;i<e.length;i++){var c=e[i];c.isDirty()||(c.setSent(f),c.setDirty(!f));var j=c.getTopic(),k=f?"success":"failure";k=h(c)+"_"+k;!f&&d.error!=null?a.$2.warn({event_name:k,topic:j,message:d.error}):a.$2.log({event_name:k,topic:j});if(c.getState()===g.SUBSCRIBE){k=c.getSubscribeCallback();k&&b("ErrorUtils").applyWithGuard(k,a,[d])}else if(c.getState()===g.MUTATE_CONTEXT)f&&c.setState(g.SUBSCRIBE);else if(c.getState()===g.UNSUBSCRIBE){j=c.getUnsubscribeCallback();j&&b("ErrorUtils").applyWithGuard(j,a,[d])}}a.deleteSubscriptions(function(a){return a.getState()===g.UNSUBSCRIBE&&a.isSent()&&!a.isDirty()});a.$6=!1;a.$7&&(a.$2.bump("repeated_flush"),a.$7=!1,a.flush())};if(Object.keys(f).length<=0){this.$6=!1;return}j={};this.$8&&(j.reset="t");for(var l=0;l<e.length;l++){var m=e[l],n=h(m)+"_attempt";m=m.getTopic();this.$2.log({event_name:n,topic:m})}c.issueRequest("/sub",j,f,k)};c.deleteSubscriptions=function(a){this.$1.deleteSubscriptions(a)};c.forEachSubscription=function(a){this.$1.forEachSubscription(a)};c.isFlushInProgress=function(){return this.$6};c.getSubscriptions=function(){var a=[];this.forEachSubscription(function(b){return a.push(b)});return a};c.isSubscribed=function(a){return this.$1.isSubscribed(a)};c.isReady=function(){return this.$11!=null&&this.$3&&this.$10};c.getCurrentSession=function(){b("Arbiter").inform(b("ChannelConstants").GET_RTI_SESSION_REQUEST)};c.getMaxConsecutiveFlushFailures=function(){return b("RTISubscriptionManagerConfig").config&&Object.prototype.hasOwnProperty.call(b("RTISubscriptionManagerConfig").config,"max_consecutive_flush_failures")?Number(b("RTISubscriptionManagerConfig").config.max_consecutive_flush_failures):b("ChannelConstants").DEFAULT_MAX_CONSECUTIVE_FLUSH_FAILURES};c.getMaxFlushBatchSize=function(){return b("RTISubscriptionManagerConfig").config&&Object.prototype.hasOwnProperty.call(b("RTISubscriptionManagerConfig").config,"max_subscription_flush_batch_size")?Number(b("RTISubscriptionManagerConfig").config.max_subscription_flush_batch_size):b("ChannelConstants").DEFAULT_MAX_SUBSCRIPTION_FLUSH_BATCH_SIZE};c.$12=function(a){var c=this;return new(b("RTISubscriptionToken"))(a,function(a){return c.unsubscribe(a)},function(a,b){return c.mutateContext(a,b)},function(){return c.flush()},function(a){return c.isSubscribed(a)})};return a}();function h(a){if(a.getState()===g.SUBSCRIBE)return"subscribe";else if(a.getState()===g.MUTATE_CONTEXT)return"mutate_context";else if(a.getState()===g.UNSUBSCRIBE)return"unsubscribe";return"unknown_state"}var i=new a();b("Run").onUnload(function(){return i.unsubscribeAll()});e.exports=i}),null);
__d("RealtimeEntityPresenceTypedLogger",["Banzai","GeneratedLoggerUtils","nullthrows"],(function(a,b,c,d,e,f){"use strict";__p&&__p();a=function(){__p&&__p();function a(){this.$1={}}var c=a.prototype;c.log=function(){b("GeneratedLoggerUtils").log("logger:RealtimeEntityPresenceLoggerConfig",this.$1,b("Banzai").BASIC)};c.logVital=function(){b("GeneratedLoggerUtils").log("logger:RealtimeEntityPresenceLoggerConfig",this.$1,b("Banzai").VITAL)};c.logImmediately=function(){b("GeneratedLoggerUtils").log("logger:RealtimeEntityPresenceLoggerConfig",this.$1,{signal:!0})};c.clear=function(){this.$1={};return this};c.getData=function(){return babelHelpers["extends"]({},this.$1)};c.updateData=function(a){this.$1=babelHelpers["extends"]({},this.$1,a);return this};c.setAction=function(a){this.$1.action=a;return this};c.setActionReason=function(a){this.$1.action_reason=a;return this};c.setAppID=function(a){this.$1.app_id=a;return this};c.setCapabilities=function(a){this.$1.capabilities=a;return this};c.setClientSubscriptionID=function(a){this.$1.client_subscription_id=a;return this};c.setClientTimeMs=function(a){this.$1.client_time_ms=a;return this};c.setEntityHandler=function(a){this.$1.entity_handler=a;return this};c.setEntityID=function(a){this.$1.entity_id=a;return this};c.setEntityType=function(a){this.$1.entity_type=a;return this};c.setEventSource=function(a){this.$1.event_source=a;return this};c.setExceptionMessage=function(a){this.$1.exception_message=a;return this};c.setExceptionType=function(a){this.$1.exception_type=a;return this};c.setGatewayConnected=function(a){this.$1.gateway_connected=a;return this};c.setSequenceID=function(a){this.$1.sequence_id=a;return this};c.setSessionID=function(a){this.$1.session_id=a;return this};c.setSourceHost=function(a){this.$1.source_host=a;return this};c.setSourceTwTaskHandle=function(a){this.$1.source_tw_task_handle=a;return this};c.setTime=function(a){this.$1.time=a;return this};c.setTopic=function(a){this.$1.topic=a;return this};c.setUserAgentString=function(a){this.$1.user_agent_string=a;return this};c.setUserFbid=function(a){this.$1.user_fbid=a;return this};c.setWeight=function(a){this.$1.weight=a;return this};return a}();c={action:!0,action_reason:!0,app_id:!0,capabilities:!0,client_subscription_id:!0,client_time_ms:!0,entity_handler:!0,entity_id:!0,entity_type:!0,event_source:!0,exception_message:!0,exception_type:!0,gateway_connected:!0,sequence_id:!0,session_id:!0,source_host:!0,source_tw_task_handle:!0,time:!0,topic:!0,user_agent_string:!0,user_fbid:!0,weight:!0};e.exports=a}),null);
__d("EntityPresenceLogger",["CurrentUser","EntityPresenceConfig","Random","RealtimeEntityPresenceTypedLogger","UserAgentData","gkx"],(function(a,b,c,d,e,f){"use strict";__p&&__p();a=function(){__p&&__p();function a(a,b,c){this.entityType=a,this.entityID=b,this.subscriptionID=c,this.shouldLog=this.$1(),this.sequenceID=0}var c=a.prototype;c.logEnter=function(a){this.shouldLog&&this.$2().setAction("enter").setSequenceID(++this.sequenceID).setCapabilities(a).log()};c.logReconnect=function(a){this.shouldLog&&this.$2().setAction("enter").setActionReason("reconnect").setSequenceID(++this.sequenceID).setCapabilities(a).log()};c.logSubscribeCallback=function(a){this.shouldLog&&this.$2().setAction("subscribe_completed").setActionReason(a?"succeeded":"failed").log()};c.logPing=function(){this.shouldLog&&this.$2().setAction("ping").setSequenceID(++this.sequenceID).log()};c.logSkippedPing=function(){this.shouldLog&&this.$2().setAction("skipped_ping").setSequenceID(this.sequenceID).log()};c.logChangeCapabilities=function(a){this.shouldLog&&this.$2().setAction("change_capabilities").setSequenceID(++this.sequenceID).setCapabilities(a).log()};c.logLeave=function(){this.shouldLog&&this.$2().setAction("leave").setSequenceID(++this.sequenceID).log()};c.logUnsubscribeCallback=function(a){this.shouldLog&&this.$2().setAction("unsubscribe_completed").setActionReason(a?"succeeded":"failed").log()};c.getLogInfo=function(){return this.shouldLog?{client_subscription_id:this.subscriptionID,sequence_id:this.sequenceID.toString()}:{}};c.getLogInfoMQTT=function(){return this.shouldLog?{clientSubscriptionId:this.subscriptionID,sequenceId:this.sequenceID}:null};c.$1=function(){if(b("gkx")("678741"))return!0;return b("gkx")("678742")?b("Random").random()<b("EntityPresenceConfig").sessionLoggingSamplingRate:!1};c.$2=function(){return new(b("RealtimeEntityPresenceTypedLogger"))().setEntityType(this.entityType).setEntityID(this.entityID).setClientSubscriptionID(this.subscriptionID).setClientTimeMs(Date.now()).setEventSource("client").setAppID("229895473858072").setUserFbid(b("CurrentUser").getID()).setUserAgentString(b("UserAgentData").browserName+"/"+(b("UserAgentData").browserFullVersion||""))};return a}();e.exports=a}),null);
__d("EntityPresenceManager",["Arbiter","ChannelConstants","EntityPresenceConfig","EntityPresenceLogger","FBLogger","FBMqttChannel","RTISubscriptionManager","UserActivity","gkx","uuid"],(function(a,b,c,d,e,f){"use strict";__p&&__p();var g="entity_presence",h="capabilities",i="/entity_presence",j=b("gkx")("885271")&&"WebSocket"in window,k={users:0,activePing:null,ping:function(){j?b("FBMqttChannel").publish(i,"{}"):b("RTISubscriptionManager").activePing()},start:function(){var a=this;this.users++;if(!b("EntityPresenceConfig").activePingEnabled)return;this.ping();this.activePing===null&&(this.activePing=window.setInterval(function(){b("UserActivity").isOnTab()?(a.ping(),b("Arbiter").inform(b("ChannelConstants").ENTITY_PRESENCE_ACTIVE_PING)):b("Arbiter").inform(b("ChannelConstants").ENTITY_PRESENCE_SKIPPED_PING)},b("EntityPresenceConfig").activePingFrequency))},stop:function(){this.users=Math.max(this.users-1,0),this.users===0&&this.activePing!==null&&(window.clearInterval(this.activePing),this.activePing=null)}},l={ENTER:1,LEAVE:2,CHANGE_CAPABILITIES:3},m={publish:function(a,c,d,e,f,g){var h={};a!=null&&(h.action=a);c!=null&&(h.entityType=c);d!=null&&(h.entityId=d);e!=null&&(h.capabilities=e);f!=null&&(h.override=f);g!=null&&(h.logInfo=g);b("FBMqttChannel").publish(i,JSON.stringify(h))}};a={enter:function(a,c,d){__p&&__p();var e=g+"/"+a+"/"+c,f=b("uuid")(),i=new(b("EntityPresenceLogger"))(a,c,f);i.logEnter(d);f=i.getLogInfo();d!=null&&(f[h]=d.toString());var n;j?m.publish(l.ENTER,a,c,d,null,i.getLogInfoMQTT()):n=b("RTISubscriptionManager").subscribe(e,function(){b("FBLogger")(g).warn("Unexpected update received for entity presence")},f,function(a){a=a!=null&&a.data!=null;i.logSubscribeCallback(a)},null,function(a){a=a!=null&&a.data!=null;i.logUnsubscribeCallback(a)});k.start();return{leaveCalled:!1,capabilities:d,entityID:c,pingListener:null,skippedPingListener:null,presenceType:a,changeCapabilities:function(a){i.logChangeCapabilities(a);var b=i.getLogInfo();a&&(b[h]=a.toString());this.capabilities=a;j?m.publish(l.CHANGE_CAPABILITIES,this.presenceType,this.entityID,this.capabilities,null,i.getLogInfoMQTT()):n.mutateContext(b)},leave:function(){__p&&__p();if(this.leaveCalled){b("FBLogger")(g).warn("leave() called twice for same PresenceTokenType");return}i.logLeave();k.stop();b("Arbiter").unsubscribe(this.pingListener);b("Arbiter").unsubscribe(this.skippedPingListener);j?m.publish(l.LEAVE,this.presenceType,this.entityID,this.capabilities,null,i.getLogInfoMQTT()):n.fastUnsubscribe();this.leaveCalled=!0},_onMqttStateChange:function(a){if(a!=="Connected"||this.leaveCalled)return;i.logReconnect(this.capabilities);m.publish(l.ENTER,this.presenceType,this.entityID,this.capabilities,null,i.getLogInfoMQTT())},_init:function(){var a=this;j&&b("FBMqttChannel").subscribeChannelEvents({onMQTTStateChanged:function(b){return a._onMqttStateChange(b)}});this.pingListener=b("Arbiter").subscribe(b("ChannelConstants").ENTITY_PRESENCE_ACTIVE_PING,function(a){i.logPing()});this.skippedPingListener=b("Arbiter").subscribe(b("ChannelConstants").ENTITY_PRESENCE_SKIPPED_PING,function(a){i.logSkippedPing()});return this}}._init()}};e.exports=a}),null);
__d("VideoCTAEndscreen",["cx","Arbiter","AttachmentRelatedShareConstants","CSS","Event","Focus","SubscriptionsHandler","VideoCTALoggingConfig","VideoPlayerLoggerEvent","VideoPlayerReason","logVideosClickTracking"],(function(a,b,c,d,e,f,g){__p&&__p();a=function(){"use strict";__p&&__p();function a(a,c){__p&&__p();var d=this;this.$1=a;this.$2=c.endscreenElement;this.$3=c.replayElement;this.$4=c.ctaElement;this.$5=c.isPausescreen;this.$6=new(b("SubscriptionsHandler"))();this.$6.addSubscriptions(b("Event").listen(this.$3,"click",function(){return d.$7()}),a.addListener("beginPlayback",function(){return d.$8()}),a.addListener("VideoChannelController/exitChannel",function(){a.isState("finished")&&d.$9()}));c=c.isPausescreen?"VideoCTAPausescreen":"VideoCTAEndscreen";this.$4&&(this.$6.addSubscriptions(b("Event").listen(this.$4,"click",function(){return d.$10()})),a.registerOption(c,"ctaElement",function(){return d.$4}));this.$5?this.$6.addSubscriptions(a.addListener("pausePlayback",function(){return d.$11()})):this.$6.addSubscriptions(a.addListener("finishPlayback",function(){return d.$9()}));a.registerOption(c,"available",function(){return!0})}var c=a.prototype;c.$7=function(){var a={reason:b("VideoPlayerReason").USER};this.$1.clickVideo();this.$1.isState("paused")?b("VideoCTALoggingConfig").shouldLogUnpausedEvent&&this.$1.logEvent(b("VideoPlayerLoggerEvent").UNPAUSED,a):this.$1.isState("finished")&&(this.$1.setState("replayed"),this.$1.collectFeedTrackingData(),this.$1.logEvent(b("VideoPlayerLoggerEvent").REPLAYED,a));a=this.$1.getVideoNode();b("logVideosClickTracking")(a);b("Focus").set(a)};c.$10=function(){b("Arbiter").inform(b("AttachmentRelatedShareConstants").FBVIDEO_CLICK,{attachment:this.$1.getRootNode(),fbvideo_id:this.$1.getVideoID()})};c.$9=function(){this.$1.getIsInChannel()||this.$11()};c.$11=function(){b("CSS").addClass(this.$2,"_1qbf")};c.$8=function(){b("CSS").removeClass(this.$2,"_1qbf")};return a}();e.exports=a}),null);
__d("VideoWatchAndScrollOverlay",["csx","cx","Arbiter","Bootloader","CSS","DOM","EventListener","React","ReactDOM","SubscriptionsHandler","UFICentralUpdates","UFIFeedbackTargets","UFIReactionTypes","UFIUserActions","VideoPlaybackTimer.react","VideoPlayerExperiments","VideoPlayerLoggerEvent","VideoPlayerLoggerSource","VideoPlayerReason","VideoScrubber.react","clearTimeout","destroyOnUnload","emptyFunction","getActiveElement","requestAnimationFrame","setImmediate","setTimeoutAcrossTransitions","throttle"],(function(a,b,c,d,e,f,g,h){__p&&__p();var i=b("VideoPlayerExperiments").persistentWNSEnabled,j=b("VideoPlayerExperiments").showWNSClose;a=function(){"use strict";__p&&__p();function a(a,c,d,e){__p&&__p();var f=this;this.$17=c;this.$25=a;this.$21=new(b("SubscriptionsHandler"))();this.$2=e;this.$10=d.likeButton;this.$22=d.unlikeButton;this.$7=d.ftEntID;this.$5=d.feedbackSource;this.$9=d.isLiveStream;this.$1=0;this.$13=0;this.$12=0;this.$7&&(this.$28(),this.$21.addSubscriptions(b("UFICentralUpdates").subscribe("feedback-updated",function(a,b){f.$7 in b.updates&&f.$28()})),b("EventListener").listen(this.$10,"click",this.$29.bind(this)),b("EventListener").listen(this.$22,"click",this.$29.bind(this)));this.$15=b("DOM").find(this.$17,"._n2-");this.$27=b("DOM").find(this.$17,"._4per");this.$3=b("DOM").scry(this.$17,"._35vp")[0];this.$18=b("DOM").find(this.$17,"._11jc");this.$14=b("DOM").find(this.$17,"._5sv5");j&&(this.$4=b("DOM").find(this.$17,"._n2_"));this.$25.addListener("stateChange",this.$30.bind(this));this.$25.addListener("beginPlayback",this.$31.bind(this));this.$25.addListener("pausePlayback",this.$32.bind(this));this.$25.addListener("finishPlayback",this.$33.bind(this));this.$25.addListener("unmuteVideo",this.$34.bind(this));this.$25.addListener("muteVideo",this.$35.bind(this));this.$25.addListener("adBreakIndicatorShowing",this.$36.bind(this));this.$25.addListener("showOverlay",function(){f.$25.isState("fallback")||f.$37()});this.$25.addListener("exitWatchAndScroll",this.$34.bind(this));b("EventListener").listen(this.$15,"click",this.$38.bind(this));b("EventListener").listen(this.$27,"click",this.$39.bind(this));this.$3&&b("EventListener").listen(this.$3,"click",this.$40.bind(this));this.$4&&b("EventListener").listen(this.$4,"click",this.$41.bind(this));c=b("DOM").scry(this.$17,"._3xxo")[0];c&&b("EventListener").listen(c,"click",this.$42.bind(this));b("EventListener").listen(this.$25.getRootNode(),"mousemove",b("throttle")(this.$43.bind(this),200));b("EventListener").listen(this.$25.getRootNode(),"mouseenter",function(){f.$11=!0});var g=["_5190","_5199"];b("EventListener").listen(this.$25.getRootNode(),"mouseleave",function(a){var c=!1;a.toElement&&g.forEach(function(d){b("CSS").hasClass(a.toElement,d)&&(c=!0)});if(c)return;f.$25.isState("playing")&&(f.$11=!1)});this.$44();this.$9||(this.$19=this.$45.bind(this),this.$20=this.$46.bind(this));function h(a,c,d){b("setImmediate")(function(){var e=b("getActiveElement")();e=b("DOM").contains(a,e);e?c():d()})}b("EventListener").listen(this.$17,"focusin",function(){return h(f.$17,function(){f.$47(),f.$37()},b("emptyFunction"))});b("EventListener").listen(this.$17,"focusout",function(){return h(f.$17,b("emptyFunction"),function(){f.$48()})});i||b("destroyOnUnload")(function(){f.$21&&(f.$21.release(),f.$21=null),b("ReactDOM").unmountComponentAtNode(f.$18),b("ReactDOM").unmountComponentAtNode(f.$14)})}var c=a.prototype;c.$44=function(){var a=!(this.$25.isState("loading")||this.$25.isState("fallback"));if(!a)return;this.$12=this.$25.getPlaybackDuration();this.$26=this.$25.getVolume()};c.$49=function(){var a=this;if(this.$16)return;this.$16=b("requestAnimationFrame")(function(){a.$16=null,a.$50()})};c.$50=function(){this.$12||this.$44();if(this.$9){b("ReactDOM").unmountComponentAtNode(this.$18);b("ReactDOM").unmountComponentAtNode(this.$14);return}b("ReactDOM").render(b("React").createElement(b("VideoScrubber.react"),{className:"_2ziq",bufferedPosition:this.$1,hasScrubberPreview:!1,isFullscreen:!1,onScrubBegin:this.$19,onPointOfInterestSelect:function(){},onScrubEnd:this.$20,playbackDuration:this.$12,playbackPosition:this.$13,pointsOfInterest:[],previewThumbnailInformation:{},scrubberPreviewSprites:new Map(),tabIndex:"-1"}),this.$18);var a=this.$13-this.$12;b("ReactDOM").render(b("React").createElement(b("VideoPlaybackTimer.react"),{className:"_5qsr _2zir",playbackPosTimestamp:this.$13,remainingTimestamp:a}),this.$14)};c.$51=function(){this.$25.play(b("VideoPlayerReason").USER)};c.$45=function(){this.$25.pause(b("VideoPlayerReason").SEEK)};c.$46=function(a){this.$25.seek(a),this.$13=a,this.$25.play(b("VideoPlayerReason").SEEK)};c.$28=function(){var a=this;if(!this.$10||!this.$22)return;this.$6=b("UFIFeedbackTargets").getFeedbackTarget(this.$7,function(c){b("CSS").hide(a.$10),b("CSS").hide(a.$22),c.viewercanlike&&(c.hasviewerliked?b("CSS").show(a.$22):b("CSS").show(a.$10))})};c.$29=function(a){var c=this;this.$6=b("UFIFeedbackTargets").getFeedbackTarget(this.$7,function(d){b("UFIUserActions").changeReaction(c.$7,d.hasviewerliked?b("UFIReactionTypes").NONE:b("UFIReactionTypes").LIKE,{source:c.$5,target:a.target},a.target)});b("CSS").shown(this.$10)?this.$10.focus():this.$22.focus()};c.$30=function(){var a=this;(this.$25.isState("ready")||this.$25.isState("playing")||this.$25.isState("paused"))&&(this.$25.isMuted()||this.$25.getVolume()===0?this.$35():this.$34());this.$25.isState("fallback")&&(b("CSS").removeClass(this.$17,"_1he7"),b("CSS").addClass(this.$17,"_x71"));var c=this.$25.getSource();c===b("VideoPlayerLoggerSource").WATCH_SCROLL?(this.$23||(this.$23=this.$25.addListener("updateStatus",function(b){a.$13=b.position,a.$49()})),this.$24||(this.$24=this.$25.addListener("updateBuffer",function(b){a.$1=b.duration+b.offset,a.$49()}))):(this.$23&&(this.$23.remove(),this.$23=null),this.$24&&(this.$24.remove(),this.$24=null))};c.$31=function(){this.$52(),b("CSS").addClass(this.$15,"_n2w"),b("CSS").removeClass(this.$17,"_2v8n"),this.$43()};c.$33=function(){this.$52(),b("CSS").addClass(this.$15,"_n2x"),b("CSS").addClass(this.$17,"_2v8n"),this.$36()};c.$32=function(){this.$52(),b("CSS").addClass(this.$15,"_n2y"),this.$43()};c.$52=function(){b("CSS").removeClass(this.$15,"_n2w"),b("CSS").removeClass(this.$15,"_n2y"),b("CSS").removeClass(this.$15,"_n2x")};c.$38=function(){this.$25.isState("playing")?(this.$25.logEvent(b("VideoPlayerLoggerEvent").WATCH_AND_SCROLL_PAUSED),this.$25.pause(b("VideoPlayerReason").USER)):this.$25.play(b("VideoPlayerReason").USER)};c.$35=function(){b("CSS").removeClass(this.$27,"_4pep"),b("CSS").addClass(this.$27,"_4peq")};c.$34=function(){b("CSS").removeClass(this.$27,"_4peq"),b("CSS").addClass(this.$27,"_4pep")};c.$42=function(a){this.$25.emit("WatchAndScroll/collapse"),a.stopPropagation()};c.$41=function(a){a.stopPropagation(),b("Arbiter").inform("fbVideoWatchAndScroll/closeWNS")};c.$39=function(){this.$25.isMuted()||this.$25.getVolume===0?this.$25.unmute():this.$25.mute()};c.$40=function(){var a=this;this.$25.logEvent(b("VideoPlayerLoggerEvent").WATCH_AND_SCROLL_CHANNEL_ENTERED);b("Bootloader").loadModules(["VideoWatchAndScrollController","TahoeController","URI"],function(b,c,d){var e=new d(a.$25.getVideoURL());d=babelHelpers["extends"]({},d.getRequestURI().getQueryData(),{ref:"tahoe"});b.onEnterTahoe();c.openFromVideoPlayer(a.$25,e.setQueryData(d),a.$25.getVideoChannelID(),a.$2)},"VideoWatchAndScrollOverlay")};c.$43=function(){this.$11&&this.$25.getState()!=="fallback"&&(this.$37(),this.$48())};c.$48=function(){var a=this;this.$47();this.$8=b("setTimeoutAcrossTransitions")(function(){a.$25.isState("playing")&&a.$36()},3e3)};c.$47=function(){b("clearTimeout")(this.$8)};c.$37=function(){if(this.$25.isState("finished")||this.$25.getOption("WatchAndScroll","hideOverlay"))return;b("CSS").addClass(this.$17,"_1he7");this.$25.emit("WatchAndScroll/overlayShown")};c.$36=function(){b("CSS").removeClass(this.$17,"_1he7"),this.$25.emit("WatchAndScroll/overlayHidden")};return a}();e.exports=a}),null);
__d("EntityPresenceTypeEnum",[],(function(a,b,c,d,e,f){e.exports=Object.freeze({GMS_SRT:"gms_srt",LIVE_VIDEO:"live_video",LIVING_ROOM:"living_room",LIVING_ROOM_CVC:"living_room_cvc",SPECTACLES:"spectacles",SRT_CUSTOMER_SUPPORT:"srt_customer_support",VOD:"vod"})}),null);