"undefined"==typeof nhn&&(window.nhn={}),void 0===nhn.realtime&&(window.nhn.realtime={}),void 0===nhn.realtime.search&&(window.nhn.realtime.search={}),nhn.realtime.search={_oBtn:null,_oNotice:null,_oRoll:null,_oPast:null,_oControl:null,_elBody:null,_htRoll:{nType:0,aData:[],nMaxCount:"undefined"!=typeof realtimeListCount?realtimeListCount:20,nRollInterval:"undefined"!=typeof realtimeRollingInterval?realtimeRollingInterval:5e3,nServerTime:"undefined"!=typeof realtimeAjaxTime?parseInt(1e3*realtimeAjaxTime,10):0,sApiUrl:realtimAjaxMoreUrl_domain,sParams:realtimAjaxMoreUrl_parameter,nA1:a1_realtime,nRoll:0,nIndex:0,nMaxCalls:6,nCalls:1,bState:!0,nRolled:0,nStopInterval:36e4,nNewUpdate:0,nNewUpdateInterval:5e3,aDobleLinkEvent:[],aClickTagEvent:[]},_htSlide:{nInit:0,nInterval:"undefined"!=typeof realtimeSlidingInterval?realtimeSlidingInterval:10},_htPast:{bLoad:!1,bBtnView:"undefined"!=typeof realtimePastButtonView&&realtimePastButtonView,nType:null,nMaxCount:10,sApiUrl:realtimAjaxMoreUrl_domain,sParams:realtimAjaxMoreUrl_parameter,nA1:a1_pastwriting,aData:[],nServerTime:0,nLastRank:1,aDobleLinkEvent:[],aClickTagEvent:[]},_htNotice:{nType:null,sApiUrl:realtimAjaxMoreUrl_domain,sParams:null,aData:[],nServerTime:0,nTotal:0,nRollA1:null,nInit:0,nInterval:0,nCalls:1,nMaxCalls:0,nMaxTotal:0},_htViewLog:{nPs:0,nNd:0,nPastNd:1},_htUserMotionCapture:{nInit:0,nCaptureTime:12e4}};var RealTimeSearchButton=$Class({_htBasic:{},_htRoll:{},_elBody:null,_htElement:{},_htEvent:{},$init:function(){this._htBasic=nhn.realtime.search,this._htRoll=this._htBasic._htRoll,this._elBody=this._htBasic._elBody,this._assignElement()},_assignElement:function(){this._htElement.buttonArea=$$.getSingle("div.rt_update",this._elBody),this._htElement.rollingState=$$.getSingle("span",this._htElement.buttonArea)},_rollStart:function(){this._htBasic._oRoll._rolling()}}),RealTimeSearchNotice=$Class({_htBasic:{},_elNotice:null,_elNoticeBtn:null,_eNoticeBtn:null,_bCall:!1,$init:function(){this._htBasic=nhn.realtime.search,this._elNotice=this._htBasic._oBtn._htElement.rollingState},_noticeState:function(t){if(t){this._htBasic._oControl._clickTagCall("rea.new");var e=$$.getSingle("div>ul",this._htBasic._oControl._getBodyElement()),i=$Element($$.getSingle("li",e));i&&i.removeClass("first_child"),this._htBasic._htPast.bLoad&&(this._htBasic._oPast._reset(),this._htBasic._oPast._showView()),this._htBasic._oBtn._rollStart(),this._detachEvent(),$Element(this._elNotice).html("")}t.stop()},_paint:function(){var t=[];t.push('<a href="#" class="state_new" onclick="return false;">새 글</a> 추가됨'),$Element(this._elNotice).html(""),$Element(this._elNotice).html(t.join("")),this._detachEvent(),this._attachEvent()},_attachEvent:function(){this._eNoticeBtn||(this._elNoticeBtn=$$.getSingle("a",this._elNotice),this._eNoticeBtn=$Fn(this._noticeState,this).attach(this._elNoticeBtn,"click"))},_detachEvent:function(){this._eNoticeBtn&&(this._eNoticeBtn.detach(this._elNoticeBtn,"click"),this._eNoticeBtn=null)},_callNoticeStart:function(){var t=this._htBasic._oControl;t._setNoticeApiParams(),t._setRollApiParams(this._htBasic._htNotice.sParams,!1);var e=this,i=this._htBasic._htNotice.nInterval;this._htBasic._htNotice.nInit=setInterval(function(){e._apiCall()},i)},_callNoticeStop:function(){clearInterval(this._htBasic._htNotice.nInit),this._detachEvent();var t=this._htBasic._oControl;t._setNoticeApiParams(!0),t._setNoticeApiCalls(!0)},_apiCall:function(){if(!this._htBasic._htPast.bLoad||!this._htBasic._oPast._bCall){this._bCall=!0;var t=this,e=this._htBasic._oControl,i=function(){t._htBasic._htNotice.sParams=e._getQueryParams(t._htBasic._htNotice.sParams);var i=[];return i.push(t._htBasic._htNotice.sParams),i.push("&api_type="+t._htBasic._htNotice.nType),e._getApiParams(i.join(""))},a=function(e){var i=e.json();t._htBasic._htNotice.sApiUrl=i.sApi,t._htBasic._htNotice.aData=t._htBasic._htNotice.aData.concat(i.aData),t._htBasic._htNotice.nTotal=t._htBasic._htNotice.aData.length,t._htBasic._htNotice.sParams=i.sParameter,t._htBasic._htNotice.nServerTime=i.sCurrentTime,t._htBasic._htNotice.nRollA1=i.a1_realtime,n()},n=function(){var i=t._htBasic._htNotice.nMaxTotal,a=t._htBasic._htNotice.nTotal;t._htBasic._htNotice.nMaxCalls<=t._htBasic._htNotice.nCalls||i==a?t._callNoticeStop():e._setNoticeApiCalls(),a>0&&(t._paint(),e._setRollIndex(!0)),e._setViewLogPs(),t._bCall=!1};$Ajax(this._htBasic._htNotice.sApiUrl,{type:"jsonp",method:"get",callbackid:"$3361",json_charset:"UTF-8",onload:function(t){a(t)},onerror:function(){t._bCall=!1}}).request(i())}}}),RealTimeSearchRoll=$Class({_htBasic:{},_htRoll:{},_htSlide:{},_nCount:0,_elFirstChild:null,_sNoticeA1:null,$init:function(){this._htBasic=nhn.realtime.search,this._nCount=this._htBasic._htRoll.aData.length;var t=this._htBasic._oControl._getLiElement();this._htBasic._htViewLog.nNd=t.length,this._updateListElement(t)},_updateListElement:function(t){var e=this._htBasic._oControl,i=t||e._getLiElement();e._doubleLinkDetach(),e._clickTagDetach();var a=this._htBasic._htRoll.nRealtimeProfile,n=0;n=0==a?1:2;for(var s=null,l=0,h=i.length;l<h;l++)s=i[l],this._elFirstChild||0!==l||(this._elFirstChild=s),e._collectorTimeChange(s,this._htBasic._htRoll.nServerTime),e._collectorDoubleLink(s,n,!0),e._collectorClickTag(s,n,!0),n++},_rolling:function(){this._isNotice();var t=this._htBasic._oControl;if(0===this._nCount)return t._setRollIndex(!0),this._updateListElement(),t._setRollDivHeight(),t._newUpdateRemove(),void t._setRollData([]);this._sliding(),t._setRollIndex(),this._rolling()},_isNotice:function(){var t=this._htBasic._oControl,e=t._getNoticeTotal(),i=t._getNoticeData(),a=t._getNoticeServerTime();0===a&&0===e||(a>0&&t._setRollServerTime(parseInt(1e3*a,10)),e>0&&(this._nCount=e,t._setRollData(i)),t._resetNoticeData())},_sliding:function(){var t=this._htBasic._oControl,e=$(t._getBodyElement()),i=$$.getSingle("div>ul",e),a=$Element(i),n=this._htBasic._htRoll.nIndex,s=t._getIndexOfData(n);if(null===s)return void(this._nCount=0);e.scrollTop=0,a.prepend(s),this._newUpdateClassRemove(!0);var l=$Element(s);l.hasClass("_updated"),l.hasClass("rt_mt")?(l.addClass("newupdate"),l.addClass("first_child")):(l.className("first_child"),l.addClass("newupdate")),this._elFirstChild=null,this._elFirstChild=s,this._nCount--,t._setViewLogNd()},_newUpdateClassRemove:function(t){if(this._elFirstChild){var e=$Element(this._elFirstChild);if(t)return void e.removeClass("first_child");for(var i=$$(".newupdate",this._htBasic._oControl._getBodyElement()),a=i.length,n=null,s=0;s<a;s++)(n=$Element(i[s]))&&n.removeClass("newupdate")}}}),RealTimeSearchPast=$Class({_htBasic:{},_htElement:{},_htEvent:{},_bCall:!1,_elMoreBtn:null,_elLoadingBtn:null,$init:function(){this._htBasic=nhn.realtime.search,this._assignElement(),this._attachEvent(),this._htBasic._htPast.bBtnView||this._noneView(),this._elMoreBtn='<em>더보기<span class="sprt"></span></em>',this._elLoadingBtn='<em class="lodng"><img width="17" height="17" alt="로딩중" src="http://sstatic.naver.net/search/img3/ico_loading_real.gif">로딩중입니다</em>',"https:"===window.location.protocol&&(this._elLoadingBtn=this._elLoadingBtn.replace(/http:\/\/sstatic.naver.net/gi,"https://ssl.pstatic.net/sstatic/"))},_assignElement:function(){var t=this._htBasic._oControl._getPastDivElement();this._htElement.moreView=$$.getSingle("div.bt_renew",t),this._htElement.moreBtn=$$.getSingle("a._moreBtn",t),this._htElement.noneViewText=$$.getSingle("p",this._htElement.moreView)},_attachEvent:function(){this._htEvent.moreBtn=$Fn(this._more,this).attach(this._htElement.moreBtn,"click")},_more:function(t){var e=this._htBasic._oNotice,i=this._htBasic._oControl;if(!this._bCall){i._clickTagCall("rea.more"),this._bCall=!0,this._loadingView();var a=this;e._bCall?setTimeout(function(){a._apiCall()},1e3):this._apiCall(),t.stop()}},_apiCall:function(){var t=this,e=this._htBasic._oControl,i=function(){var i=e._getPastA1Parameter(),a="&api_type="+t._htBasic._htPast.nType;t._htBasic._htPast.sParams=e._getQueryParams(t._htBasic._htPast.sParams);var n=[];return n.push(t._htBasic._htPast.sParams),n.push(i),n.push(a),e._getApiParams(n.join(""))},a=function(i){var a=i.json();t._htBasic._htPast.aData=a.aData,t._htBasic._htPast.nServerTime=parseInt(1e3*a.sCurrentTime,10),t._htBasic._htPast.sApiUrl=a.sApi,t._htBasic._htPast.sParams=a.sParameter,e._setPastA1Parameter(""),n(a.total)},n=function(i){var a=t._htBasic._htPast.nMaxCount,n=t._htBasic._htPast.aData,s=n.length;0===s?t._noneView():i<a?(t._noneView(),t._extView(n,s),e._setViewLogPs()):(t._extView(n,s),e._setViewLogPs(),t._showView()),t._bCall=!1},s=function(){t._bCall=!1,t._showView()};$Ajax(this._htBasic._htPast.sApiUrl,{type:"jsonp",method:"get",callbackid:"$3361",json_charset:"UTF-8",onload:function(t){a(t)},onerror:function(){s()}}).request(i())},_showView:function(){var t=$Element(this._htElement.moreBtn);t.css("display","block"),t.html(""),t.html(this._elMoreBtn);var e=$Element(this._htElement.moreView);e.hasClass("bt_renew2")||e.addClass("bt_renew2"),null===this._htEvent.moreBtn&&(this._htEvent.moreBtn=$Fn(this._more,this).attach(this._htElement.moreBtn,"click")),$Element(this._htElement.noneViewText).hide()},_noneView:function(){this._htEvent.moreBtn.detach(this._htElement.moreBtn,"click"),this._htEvent.moreBtn=null,$Element(this._htElement.moreBtn).hide(),$Element(this._htElement.moreView).removeClass("bt_renew2"),$Element(this._htElement.noneViewText).show()},_loadingView:function(){var t=$Element(this._htElement.moreBtn);t.html(""),t.html(this._elLoadingBtn)},_extView:function(t,e){var i=this._htBasic._oControl,a=i._getUlElement();a=$Element(a[1]);var n=null;e=parseInt(e-1,10);for(var s=e;s>=0;s--)n=$(t[s]),a.append(n),i._collectorTimeChange(n,this._htBasic._htPast.nServerTime),i._collectorDoubleLink(n,this._htBasic._htPast.nLastRank,!1),i._collectorClickTag(n,this._htBasic._htPast.nLastRank,!1),this._htBasic._htViewLog.nPastNd++,this._htBasic._htPast.nLastRank++;i._setRollDivHeight()},_reset:function(){var t=this._htBasic._oControl,e=t._getUlElement();$Element(e[1]).html(""),this._htBasic._htPast.nLastRank=1,this._htBasic._htViewLog.nPastNd=1,this._htBasic._htPast.aData=[],this._htBasic._htPast.nServerTime=0,this._htBasic._htPast.aDobleLinkEvent=[],this._htBasic._htPast.aClickTagEvent=[],t._setRollDivHeight()}}),RealTimeSearchControl=$Class({_htBasic:{},$init:function(){this._htBasic=nhn.realtime.search},_setRollState:function(){this._htBasic._htRoll.bState=!this._htBasic._htRoll.bState},_getRollState:function(){return this._htBasic._htRoll.bState},_setRollData:function(t){this._htBasic._htRoll.aData=[],this._htBasic._htRoll.aData=t},_setRollIndex:function(t){!0===t?this._htBasic._htRoll.nIndex=0:this._htBasic._htRoll.nIndex++},_setRollApiCalls:function(t){t?this._htBasic._htRoll.nCalls=1:this._htBasic._htRoll.nCalls++},_setRollServerTime:function(t){this._htBasic._htRoll.nServerTime=t},_getRollServerTime:function(){return this._htBasic._htRoll.nServerTime},_setRollApiParams:function(t,e){if(e){var i=this._getNoticeRollA1();i&&(t=t.replace(/\&a1\=[A-Za-z0-9\W]{1,}/gi,"&a1="+i),this._setRollA1Parameter(""),this._htBasic._htNotice.nRollA1=null)}this._htBasic._htRoll.sParams=t},_setRollInterval:function(t){this._htBasic._htRoll.nRollInterval=t},_setRollA1Parameter:function(t){this._htBasic._htRoll.nA1=t},_getRollA1Parameter:function(){var t=this._htBasic._htRoll.nA1;return t?"&a1="+t:""},_setRollDivHeight:function(){var t=this._getUlElement(),e=t[0],i=e?$Element(e).height():0,a=t[1],n=a?$Element(a).height():0,s=parseInt(i+n,10),l=this._getDivElement();$Element(l).css("height",""),$Element(l).css("height",s+"px")},_setViewLogPs:function(){this._htBasic._htViewLog.nPs++},_setViewLogNd:function(t){null==t?this._htBasic._htViewLog.nNd++:this._htBasic._htViewLog.nNd=t},_getBodyElement:function(){return $$.getSingle("div.rt_wrap",this._htBasic._elBody)},_getDivElement:function(){return $$.getSingle("div.rt_wrap>div",this._htBasic._elBody)},_getUlElement:function(){return $$("div.rt_wrap>div>ul",this._htBasic._elBody)},_getLiElement:function(){var t=this._getUlElement();return $$("li",t[0])},_getIndexOfData:function(t){var e=t||0;return $(this._htBasic._htRoll.aData[e])},_setNoticeApiCalls:function(t){t?this._htBasic._htNotice.nCalls=1:this._htBasic._htNotice.nCalls++},_setNoticeApiParams:function(t){var e=this._htBasic._htRoll.sParams+this._getRollA1Parameter();this._htBasic._htNotice.sParams=t?null:e},_getNoticeServerTime:function(){return this._htBasic._htNotice.nServerTime},_getNoticeTotal:function(){return this._htBasic._htNotice.nTotal},_getNoticeData:function(){return this._htBasic._htNotice.aData},_getNoticeRollA1:function(){return this._htBasic._htNotice.nRollA1},_resetNoticeData:function(){this._htBasic._htNotice.nTotal=0,this._htBasic._htNotice.nServerTime=0,this._htBasic._htNotice.aData=[],this._htBasic._htNotice.nCalls=1},_getPastDivElement:function(){return $$.getSingle("div.rt_wrap>div.bt_more",this._htBasic._elBody)},_setPastA1Parameter:function(t){this._htBasic._htPast.nA1=t},_getPastA1Parameter:function(){var t=this._htBasic._htPast.nA1;return t?"&a1="+t:""},_getApiParams:function(t){for(var e=null,i={},a=t.split("&"),n=0,s=a.length;n<s;n++)e=a[n].split("="),e[0]&&(i[e[0]]=decodeURIComponent(e[1]));return i},_applyElement:function(t,e){var i=[],a=null,n=0,s=0;if(e)for(n=parseInt(t.length-1,10),s=n;s>=0;s--)a=$Element($(t[s])),i.push(a.outerHTML());else for(n=t.length,s=0;s<n;s++)a=$Element($(t[s])),i.push(a.outerHTML());return i},_clickTagEvent:function(t,e){for(var i=t.element,a=$Element(i),n=$$.getSingle("div>ul",this._getBodyElement());a.$value()!==n&&null===a.attr("href")&&!a.hasClass("_twitter");)a=a.parent();if(a.$value()===n)return!1;var s=a.attr("crlink"),l=a.hasClass("_twitter")?a.attr("data-src"):a.attr("href"),h=a.attr("crrank"),o=e?this._getLiElement().length:this._htBasic._htViewLog.nPastNd,_=this._htBasic._htViewLog.nPs,c=/\&r\=(.?|[0-9]{1,})\&/gi;return s=s.replace(c,"&r="+h+"&")+urlencode(l),c=/\&ps\=(.?|[0-9]{1,})\&/gi,s=s.replace(c,"&ps="+_+"&"),c=/\&nd\=(.?|[0-9]{1,})\&/gi,s=s.replace(c,"&nd="+o+"&"),t.stop(),a.hasClass("_twitter")?tCR(s,a.attr("data-src")):goOtherCR(a.$value(),s)},_collectorTimeChange:function(t,e){var i=e,a=$$.getSingle("._rt_time",t),n=a.className.match(/time_([0-9]*)/i)[1],s=parseInt((i-1e3*n)/1e3,10),l=[],h=$Element(a),o=$Element($$.getSingle("._timeinfo",a));s<1?(l.push("1초 전"),o.addClass("tim_bg"),h.removeClass("last")):s/60<1?(l.push(parseInt(s,10)),l.push("초 전"),o.addClass("tim_bg"),h.removeClass("last")):s/60>=60?(s/60/60>=24?(l.push(parseInt(s/60/60/24,10)),l.push("일 전")):(l.push(parseInt(s/60/60,10)),l.push("시간 전")),o.removeClass("tim_bg"),h.addClass("last")):(l.push(parseInt(s/60,10)),l.push("분 전"),o.removeClass("tim_bg"),h.addClass("last")),o.html(l.join(""))},_collectorDoubleLink:function(t,e,i){var a=$Element($$.getSingle("._twitter",t));if(a){$Element(a).attr("crrank",e);var n=$Fn(function(t){"a"!==t.element.tagName.toLowerCase()&&"a"!==$Element(t.element).parent().$value().tagName.toLowerCase()&&(this._clickTagEvent(t,i),setTimeout(function(){window.open(a.attr("data-src"),"_blank")},200))},this).attach(a,"click");i&&this._htBasic._htRoll.aDobleLinkEvent.push({event:n,type:"click",element:a});var s=$Fn(function(t){a.removeClass("over"),"a"!==t.element.tagName.toLowerCase()&&"a"!==$Element(t.element).parent().$value().tagName.toLowerCase()&&a.addClass("over")},self).attach(a,"mouseover");i&&this._htBasic._htRoll.aDobleLinkEvent.push({event:s,type:"mouseover",element:a});var l=$Fn(function(t){a.removeClass("over")},self).attach(a,"mouseout");i&&this._htBasic._htRoll.aDobleLinkEvent.push({event:l,type:"mouseout",element:a})}},_collectorClickTag:function(t,e,i){for(var a=$$("a",t),n=this,s=null,l=null,h=0,o=a.length;h<o;h++)s=a[h],$Element(s).attr("crrank",e),l=$Fn(function(t){n._clickTagEvent(t,i)},n).attach(s,"mousedown"),i&&this._htBasic._htRoll.aClickTagEvent.push({event:l,element:s})},_doubleLinkDetach:function(){for(var t=null;0!=this._htBasic._htRoll.aDobleLinkEvent.length;)t=this._htBasic._htRoll.aDobleLinkEvent.pop(),$Fn(t.event).detach(t.element,t.type);this._htBasic._htRoll.aDobleLinkEvent=[]},_clickTagDetach:function(){for(var t=null;0!=this._htBasic._htRoll.aClickTagEvent.length;)t=this._htBasic._htRoll.aClickTagEvent.pop(),$Fn(t.event).detach(t.element,"mousedown");this._htBasic._htRoll.aClickTagEvent=[]},_newUpdateRemove:function(){clearTimeout(this._htBasic._htRoll.nNewUpdate);var t=this._htBasic._oRoll,e=this._htBasic._htRoll.nNewUpdateInterval;this._htBasic._htRoll.nNewUpdate=setTimeout(function(){t._newUpdateClassRemove(!1)},e)},_clickTagCall:function(t){t&&tCR(t,"","",urlencode(document.URL))},_getQueryParams:function(t){var e="&p="+g_puid,i="&s="+g_suid,a="&ps="+this._htBasic._htViewLog.nPs,n="&nd="+this._htBasic._htViewLog.nNd,s=/\&query\=(.?|.{1,})\&b1\=/gi,l=/\&where\=(.?|.{1,})\&rev=[0-9]{1,}&m=[0-9]{1,}/gi,h=t.match(s),o=h[0].replace(/\&query\=/gi,"").replace(/\&b1\=/gi,""),o="&query="+encodeURIComponent(decodeURIComponent(o))+"&b1=",_="&"+t.replace(s,""),c=_.match(l),r=c[0],m=_.replace(r,""),u=[];return u.push(e),u.push(i),u.push(a),u.push(n),u.push(r),u.push(o),u.push(m),u.join("")}}),RealTimeSearchLoad=$Class({_htBasic:{},$init:function(t,e){this._htBasic=nhn.realtime.search,this._htBasic._elBody=$(t),this._assignData(e),this._objectLoad(),this._functionLoad()},_assignData:function(t){var e=t;this._htBasic._htRoll.nRealtimeProfile=e.nRealtimeProfile,this._htBasic._htRoll.nMaxCalls=e.maxApiCallCount,this._htBasic._htRoll.nNewUpdateInterval=e.newUpdateInterval,this._htBasic._htUserMotionCapture.nCaptureTime=e.userMotionCaptureTime,this._htBasic._htNotice.nType=e.noticeType,this._htBasic._htNotice.nInterval=e.noticeInterval,this._htBasic._htNotice.nMaxCalls=e.noticeMaxCalls,this._htBasic._htNotice.nMaxTotal=e.noticeMaxTotal,this._htBasic._htPast.bLoad=e.pastLoad,this._htBasic._htPast.nType=e.pastType,this._htBasic._htPast.nMaxCount=e.pastMaxCount},_objectLoad:function(){this._htBasic._oControl=new RealTimeSearchControl,this._htBasic._oBtn=new RealTimeSearchButton,this._htBasic._oRoll=new RealTimeSearchRoll,this._htBasic._oNotice=new RealTimeSearchNotice,this._htBasic._htPast.bLoad&&(this._htBasic._oPast=new RealTimeSearchPast)},_functionLoad:function(){this._htBasic._oNotice._callNoticeStart()}}),RealTimeSearchPopLoad=$Class({_htBasic:{},$init:function(t,e){this._htBasic=nhn.realtime.search,this._htBasic._elBody=$(t),this._assignData(e),this._objectLoad()},_assignData:function(t){var e=t;this._htBasic._htRoll.nRealtimeProfile=e.nRealtimeProfile},_objectLoad:function(){this._htBasic._oControl=new RealTimeSearchControl,this._htBasic._oRoll=new RealTimeSearchRoll}});"undefined"==typeof nhn&&(nhn={}),nhn.search=nhn.search||{},nhn.search.realtime_search=nhn.search.realtime_search||{},nhn.search.realtime_search.Controller=$Class({$init:function(t){var e={elBase:"._some_selector"};this.option(e),this.option(t,{}),this.welBase=$Element(this.option("elBase"))}}).extend(jindo.Component);