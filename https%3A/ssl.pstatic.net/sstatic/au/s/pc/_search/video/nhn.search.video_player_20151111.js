/* release date : 2015-11-11 */
nhn=window.nhn||{},nhn.search=nhn.search||{},nhn.search.VideoPlayer=$Class({_htPlayerList:[],_aPlayerList:[],_sSBSPlayerId:null,_sFnVideoClose:null,$init:function(a,b){this._bIE8Below=$Agent().navigator().ie&&$Agent().navigator().version<=8,this._oOptions={sAjaxUrl:"",sPlayerTemplateId:"elVideoTemplate",sDisplayType:"list",nClickCheckTime:2};for(var c in b)this._oOptions[c]=b[c];this._aPlayerList=[];for(var d=0,e=a.length;d<e;d++)this.addLayerForVideoPlayer(a[d]);this._setDefaultSetting()},addLayerForVideoPlayer:function(a){this._aPlayerList=this._aPlayerList.concat($$("._direct_view",a))},removeLayerForVideoPlayer:function(a){for(var b=0,c=this._aPlayerList.length;b<c;b++)if(this._aPlayerList[b]===$$("._direct_view",a)){this._aPlayerList[b].splice(b,1);break}},_setDefaultSetting:function(){this._bAjaxRequest=!1,this._bIsIE=$Agent().navigator().ie?!0:!1,this._bIsWin=navigator.appVersion.toLowerCase().indexOf("win")!=-1?!0:!1,this._bIsOpera=$Agent().navigator().opera?!0:!1,this._sDocumentTitle=document.title,this._sDirectViewOpenMsg="동영상 바로보기",this._sDirectViewCloseMsg="동영상 그만보기",this._nFlashBoxHeight=402,this._nBodyScrollIncreaseValue=.15,this._nPlayerBoxIncreaseValue=.3,this._bOpening=!1,this._bCloseing=!1},_setPlayerInfo:function(a,b){return{elPlayerMainLayer:a,elPlayer:$$.getSingle(".flash_player",a),elPlayButton:$$.getSingle("._play_button",a),elCloseButton:$$.getSingle(".close_btn a",a),elTitle:$$.getSingle("a.tit",a),sPlayerId:"FlashThumbType_FLV_"+b}},_setEvent:function(a){$Fn(this._onClickCloseButton,this).attach(a,"click")},_onClickCloseButton:function(a){this.stop(this._nClickMovieIdx),this._setCloseMovie(this._nClickMovieIdx),this._nPreviousIdx=null,this._goClickLog(".playerclose"),a&&a.stop()},start:function(a,b,c,d){if(this._bOpening||this._bCloseing)return;var e=$Element(a),f=e.hasClass("_movie_play")?!0:!1;if(f){if(typeof this._dClickTime!="undefined"&&Date.parse(new Date)-Date.parse(this._dClickTime)<this._oOptions.nClickCheckTime*1e3)return;this._dClickTime=new Date}this._nClickMovieIdx=$A(this._aPlayerList).indexOf($$.getSingle("!._direct_view",a)),this._sClickLogGdidAreaName=c,this._sVideoTitle=$Element($$.getSingle("!._direct_view .tit",a)).text();if(f){this._displayThumbnailTypeBasicMarkup();var g=this._htPlayerList[this._nClickMovieIdx];g.elPlayButton=a;var h=g.elPlayer;$$.getSingle(".play_data",h.parentNode).style.display="none",this._stopPreviousMovie(),this._displayPlayerArea(b),this._goClickLog(".playeron");var i=this._htPlayerList[this._nClickMovieIdx].elTitle;this._elCurrentPlayerToggleBtn=a,this._elCurrentPlayerLayer=g.elPlayerMainLayer;var j=e,k=j.parent(function(a){return a.hasClass("sub_pack")},20),l=j.parent(function(a){return a.hasClass("sp_video")},20);k!=null&&l!==null&&($Element($("content")).addClass("sub_topindex"),$Element(l[0]).addClass("topindex"))}else this._setCloseMovie(this._nClickMovieIdx),this.stop(this._nClickMovieIdx),this._goClickLog(".playeroff")},_displayThumbnailTypeBasicMarkup:function(a){var b=$("elPlayer_"+this._nClickMovieIdx);b!==null&&$Element(b).hasClass("video_player")?typeof this._htPlayerList[this._nClickMovieIdx]=="undefined"&&(this._htPlayerList[this._nClickMovieIdx]=this._setPlayerInfo(b,this._nClickMovieIdx)):this._createThumbnailTypePlayerMarkup()},_createThumbnailTypePlayerMarkup:function(){var a=$('<div class="video_player"></div>');a.id="elPlayer_"+this._nClickMovieIdx;var b=new $Template(this._oOptions.sPlayerTemplateId);a.innerHTML=b._str,this._htPlayerList[this._nClickMovieIdx]=this._setPlayerInfo(a,this._nClickMovieIdx),$Element($$.getSingle("._video_info",this._aPlayerList[this._nClickMovieIdx])).after(a),this._setEvent(this._htPlayerList[this._nClickMovieIdx].elCloseButton)},_displayPlayerArea:function(a){var b=this._htPlayerList[this._nClickMovieIdx];typeof b.dRequestDate=="undefined"||Date.parse(new Date)-Date.parse(b.dRequestDate)>36e5?this._getMovieInfo(b,a):this._displayFlashPlayer(b)},_stopPreviousMovie:function(){typeof this._nPreviousIdx!="undefined"&&this._nPreviousIdx!==null&&this._nClickMovieIdx!=this._nPreviousIdx&&(this._setCloseMovie(this._nPreviousIdx),this.stop(this._nPreviousIdx))},_setOpenMovie:function(a){var b=this._htPlayerList[a];b.elPlayerMainLayer.style.height="1px",$Element(b.elPlayerMainLayer).show(),this._bOpening=!0,clearInterval(this._oBoxOpenInterval),this._oBoxOpenInterval=null,this._nBoxOpenStartTop=0,this._nBoxOpenTargetTop=this._nFlashBoxHeight,this._bIE8Below?this._doFlayerBoxOpenWithoutMotion(b):this._oBoxOpenInterval=setInterval($Fn(this._doFlayerBoxOpenMotion,this).bind(b),10)},_doFlayerBoxOpenMotion:function(a){if(this._nBoxOpenTargetTop==this._nBoxOpenStartTop){clearInterval(this._oBoxOpenInterval),this._oBoxOpenInterval=null,this._bOpening=!1;var b=$Element(a.elPlayButton);b.removeClass("_movie_play").addClass("_movie_stop"),b.parent().addClass("selected"),$Element($$.getSingle(".play",a.elPlayButton)).html(this._sDirectViewCloseMsg),this._setScrollTop(a)}else this._nBoxOpenStartTop+=this._nPlayerBoxIncreaseValue*(this._nBoxOpenTargetTop-this._nBoxOpenStartTop),this._nBoxOpenTargetTop-this._nBoxOpenStartTop<5&&(this._nBoxOpenStartTop=this._nBoxOpenTargetTop),a.elPlayerMainLayer.style.height=this._nBoxOpenStartTop+"px"},_doFlayerBoxOpenWithoutMotion:function(a){this._nBoxOpenStartTop=this._nBoxOpenTargetTop,a.elPlayerMainLayer.style.height=this._nBoxOpenStartTop+"px",this._oBoxOpenInterval=null,this._bOpening=!1;var b=$Element(a.elPlayButton);b.removeClass("_movie_play").addClass("_movie_stop"),b.parent().addClass("selected"),$Element($$.getSingle(".play",a.elPlayButton)).html(this._sDirectViewCloseMsg),this._setScrollTop(a)},_setCloseMovie:function(a){var b=this._htPlayerList[a];clearInterval(this._oBoxCloseInterval),this._oBoxCloseInterval=null;var c=this._htPlayerList[this._nPreviousIdx];c.elPlayerMainLayer.style.height="1px",$Element(c.elPlayerMainLayer).hide();var d=$Element(b.elPlayButton);d.removeClass("_movie_stop").addClass("_movie_play"),d.parent().removeClass("selected"),$Element($$.getSingle(".play",b.elPlayButton)).html(this._sDirectViewOpenMsg),this._bCloseing=!0,this._nBoxCloseStart=this._nFlashBoxHeight,b.elPlayerMainLayer.style.height=this._nBoxCloseStart+"px",this._nBoxCloseTarget=0,this._bIE8Below?this._doFlayerBoxCloseWithoutMotion(b):this._oBoxCloseInterval=setInterval($Fn(this._doFlayerBoxCloseMotion,this).bind(b),10),$Element($("content")).hasClass("sub_topindex")&&$Element($("content")).removeClass("sub_topindex");var e=d,f=e.parent(function(a){return a.hasClass("sp_video")},20);$Element(f[0]).hasClass("topindex")&&$Element(f[0]).removeClass("topindex")},_doFlayerBoxCloseMotion:function(a){this._nBoxCloseTarget==this._nBoxCloseStart?(clearInterval(this._oBoxCloseInterval),this._oBoxCloseInterval=null,this._bCloseing=!1,a.elPlayerMainLayer.style.height="1px",$Element(a.elPlayerMainLayer).hide()):(this._nBoxCloseStart-=this._nPlayerBoxIncreaseValue*(this._nBoxCloseStart-this._nBoxCloseTarget),this._nBoxCloseStart-this._nBoxCloseTarget<5&&(this._nBoxCloseStart=this._nBoxCloseTarget),a.elPlayerMainLayer.style.height=this._nBoxCloseStart+"px")},_doFlayerBoxCloseWithoutMotion:function(a){this._nBoxCloseStart=this._nBoxCloseTarget,a.elPlayerMainLayer.style.height=this._nBoxCloseStart+"px",this._oBoxCloseInterval=null,this._bCloseing=!1,a.elPlayerMainLayer.style.height="1px",$Element(a.elPlayerMainLayer).hide()},_setScrollTop:function(a){var b=$$.getSingle("!._direct_view",a.elPlayButton),c=$Element(b).offset().top,d=c;this._bIE8Below?this._doScrollWithoutMotion(d):this._doScrollMotion(d)},_getBodyScrollTop:function(){return Math.max(document.documentElement.scrollTop,document.body.scrollTop)},_getBodyScrollLeft:function(){return Math.max(document.documentElement.scrollLeft,document.body.scrollLeft)},_doScrollMotion:function(a){function d(a){if(a==c){clearInterval(this._oScrollInterval),this._oScrollInterval=null;return}a<c?(c-=this._nBodyScrollIncreaseValue*(c-a),c-a<1&&(c=a)):(c+=this._nBodyScrollIncreaseValue*(a-c),a-c<5&&(c=a)),window.scrollTo(this._getBodyScrollLeft(),c)}var b=this._getBodyScrollTop();if(a===b)return;this._oScrollInterval!==null&&(clearInterval(this._oScrollInterval),this._oScrollInterval=null),this._oScrollInterval=setInterval($Fn(d,this).bind(a),10);var c=b},_doScrollWithoutMotion:function(a){window.scrollTo(this._getBodyScrollLeft(),a)},_getMovieInfo:function(a,b){if(this._bAjaxRequest){a.oAjax&&a.oAjax.abort();return}var c=(new $Ajax(this._oOptions.sAjaxUrl,{type:"jsonp",timeout:3,ontimeout:$Fn(function(){var b=[];b.push('<div class="error2">'),b.push('<p><img src="http://sstatic.naver.com/search/img/ico_movie2_error3.gif" alt="일시적으로 동영상을 불러올 수 없습니다. 잠시 뒤에 다시 이용해주세요." width="434" height="79"></p>'),b.push("</div>"),a.elPlayer.innerHTML=window.location.protocol==="https:"?b.join("").replace(/http:\/\/sstatic.naver.com/gi,"https://ssl.pstatic.net/sstatic/"):b.join(""),$Element(a.elPlayerMainLayer).query(".play_data").style.display="",this._bAjaxRequestRequest=!1},this).bind(),callbackid:"cho",onload:$Fn(function(b){this._bAjaxRequest=!0;var c=b.json();this._sFnVideoClose=null,this._sFnVideoClose=typeof c.script=="undefined"?null:c.script,a.dRequestDate=new Date,a.sTitle=this._sVideoTitle,a.sPlayTime=c.sPlayTime,a.sDate=c.sDate,a.sRealUrl=c.sRealUrl,a.sResult=c.result,a.nHeightValue=c.sHeightValue,a.source=c.sSource,this._displayFlashPlayer(a),this._bAjaxRequest=!1},this).bind()})).request({where:"player",vid:b,ie:$Agent().navigator().ie?1:0,rev:31});a.oAjax=c},_displayFlashPlayer:function(htClickMovie){var wel,elPlayer;this.sFlashCallbackName||(this.sFlashCallbackName="onPlayerStatusChange_"+(new Date).getTime(),nhn.search.VideoPlayer[this.sFlashCallbackName]=$Fn(this.onPlayerStatusChange,this).bind()),this._nFlashBoxHeight=htClickMovie.nHeightValue,this._setOpenMovie(this._nClickMovieIdx),this._nPreviousIdx=this._nClickMovieIdx,htClickMovie.source==="tv_cast"?(eval(htClickMovie.sResult.replace(/{=el}/,"htClickMovie.elPlayer")),wel=$Element($Element(htClickMovie.elPlayer).query("div:nth-child(5)")),!wel&&(wel=$Element($Element(htClickMovie.elPlayer).query("> div"))),$A($Element(htClickMovie.elPlayer).child()).forEach(function(a){$Element(a).css("margin","0px auto")}),elPlayer=wel.query("> object")||wel.query("> embed"),htClickMovie.sPlayerId=$Element(elPlayer).attr("id")):(htClickMovie.elPlayer.innerHTML=htClickMovie.sResult,wel=$Element(htClickMovie.elPlayer),elPlayer=wel.query("> object")||wel.query("> embed"),elPlayer&&$Element(elPlayer).attr("id",htClickMovie.sPlayerId)),this._setMovieInfo(htClickMovie)},_setMovieInfo:function(a){var b=$$.getSingle(".tit",a.elPlayerMainLayer);b.href=a.sRealUrl,b.innerHTML=a.sTitle,$$.getSingle(".pd_time",a.elPlayerMainLayer).innerHTML=a.sPlayTime,$$.getSingle(".pd_date",a.elPlayerMainLayer).innerHTML=a.sDate;var c=$$.getSingle(".view",a.elPlayerMainLayer);c.href=a.sRealUrl,$Element(a.elPlayerMainLayer).query(".play_data").style.display="",b.onclick=$Fn(function(){this._goClickLog(".playertit")},this).bind(),c.onclick=$Fn(function(){this._goClickLog(".playeroriginal")},this).bind()},_createFlashMoviePlayerTag:function(a,b,c,d,e,f,g){e=e===undefined?"transparent":e,g=g===undefined?"#23232b ":g;var h=[];return this._bIsIE&&this._bIsWin&&!this._bIsOpera?(h.push('<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="//fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,0,0" width="'+c+'" height="'+d+'" id="'+b+'" align="middle">'),h.push('<param name="allowScriptAccess" value="always" />'),h.push('<param name="quality" value="high" />'),h.push('<param name="movie" value="'+a+'" />'),h.push('<param name="wmode" value="'+e+'" />'),h.push('<param name="allowFullScreen" value="true" />'),h.push('<param name="bgcolor" value="'+g+'" />'),h.push('<param name="FlashVars" value="'+f+'">'),h.push("</object>")):h.push('<embed src="'+a+'" quality="high" wmode="'+e+'" FlashVars="'+f+'" bgcolor="'+g+'" width="'+c+'" height="'+d+'" id="'+b+'" name="'+b+'" align="middle" allowScriptAccess="always" allowFullScreen="true" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" />'),h.join("")},_getFlashMoviePlayer:function(htFlashOptions){var sFlashId=htFlashOptions.layout.flashId,nWidth=htFlashOptions.layout.width,nHeight=htFlashOptions.layout.height,mWmode="transparent",sFlashVar="",sBgColor="#23232b",sHost=htFlashOptions.host,sService=htFlashOptions.qsParam.service,sPlayUrl=htFlashOptions.qsParam.playurl,sVid=htFlashOptions.qsParam.vid,swfURL="",sMini=htFlashOptions.layout.mini;sHost?swfURL+=sMini=="1"?"http://"+sHost+"/flash/miniNFPlayer.swf?":"http://"+sHost+"/flash/NFPlayer.swf?":swfURL+=sMini=="1"?"http://serviceapi.nmv.naver.com/flash/miniNFPlayer.swf?":"http://serviceapi.nmv.naver.com/flash/NFPlayer.swf?";var htParam="",htParamOptions=htFlashOptions.qsParam;for(sField in htParamOptions)htParam+="&"+sField+"="+eval("htParamOptions."+sField);if(sPlayUrl){swfURL=sPlayUrl;if(sService==50001||sService==50002)swfURL+="&amp;autoplay=1"}else{if(sService==90001||sService==90002||sService==90003)return this._createSBSMoviePlayer(sVid);swfURL+=htParam.substring(1,htParam.length)}var htFlashVarBean=htFlashOptions.flashVar;for(sField in htFlashVarBean)sField=="callbackHandler"?eval("htFlashVarBean."+sField)!="null"&&(sFlashVar+="&"+sField+"="+eval("htFlashVarBean."+sField)):sFlashVar+="&"+sField+"="+eval("htFlashVarBean."+sField);return sFlashVar=sFlashVar.substring(1,sFlashVar.length),this._createFlashMoviePlayerTag(swfURL,sFlashId,nWidth,nHeight,mWmode,sFlashVar,sBgColor)},_displayFlashMoviePlayer:function(a){var b=this._getFlashMoviePlayer(a);return b},stop:function(a){var b=this._htPlayerList[a];b.elPlayButton.focus(),this._stopFlashPlayer(a),this._ajaxAbort(),b&&(b.elPlayer.innerHTML="")},_stopFlashPlayer:function(nIdx){var htClickMovie=this._htPlayerList[nIdx];try{var flashObj=$(htClickMovie.sPlayerId);flashObj!==null&&(this._sFnVideoClose?(eval(this._sFnVideoClose),function(){videoClose()}(),this._sFnVideoClose=null):(flashObj.videoStop(),flashObj.videoClose())),this._sSBSPlayerId&&($(this._sSBSPlayerId).src="")}catch(e){htClickMovie&&$Element(htClickMovie.elPlayerMainLayer).hide()}},_ajaxAbort:function(){try{var a=this._htPlayerList[this._nPreviousIdx];a.oAjax&&a.oAjax.abort()}catch(b){}this._bAjaxRequest=!1},_goClickLog:function(a){a!=""&&typeof tCR=="function"&&tCR(this._sClickLogGdidAreaName+a+"&u=javascript")},onPlayerStatusChange:function(){document.title=this._sDocumentTitle.replace("#","")},_createSBSMoviePlayer:function(a){var b=a,c={videoId:b,ownerId:"SBS",host:"http://netv_nhn.sbs.co.kr/netvnhnPlayer.jsp",playerId:"NFP"+Math.floor(Math.random()*1e6),autoPlay:!1,mobile:!1,width:500,height:402},d=function(a){var b=[];return b.push(a.host+"?pmContentId="+a.videoId),b.push(a.autoPlay?"pmAutoPlay=Y":"pmAutoPlay=N"),b.push("pmInitStartTime=0"),b.join("&")},e=function(a){return a.playerId},f=function(a){return a.width},g=function(a){return a.height},h=function(a){var b=d(a),c=e(a),h=f(a),i=g(a),j=[];return j.push('<iframe src="'+b+'" id="'+c+'" width="'+h+'" height="'+i+'" scrolling="no" frameborder="0">'),j.push("</iframe>"),j.join("")};return this._sSBSPlayerId=null,this._sSBSPlayerId=e(c),h(c)}}),function(){var a=function(){__flash__removeCallback=function(a,b){a&&(a[b]=null)},window.setTimeout(a,10)};a()}()