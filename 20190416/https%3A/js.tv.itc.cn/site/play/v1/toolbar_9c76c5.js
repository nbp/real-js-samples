/* sohutv 2019-01-03 11:25:43 */
!function(t){var a=function(t){sohuHD.closeWin();var i=a.box;i||(i=a.box=new sohuHD.showWin({htmlStr:["",'<div class="wBox wBoxA">','<div class="wBox-wrap">','<div class="cfix"><a href="#" class="close ico-close r"></a></div>','<div class="wBox-con cfix">','<span class="ico-ok l"></span>','<div class="txt l">','<span class="wBox-msg"></span>','<div><input type="submit" class="close btn-2" value="\u786e \u5b9a"></div>',"</div>","</div>","</div>","</div>"].join(""),noMask:!0,autohide:!0,hidetime:3e3})).initWin(),i.winbox.find(".wBox-msg").html(t),i.show()};t.dialog=a}(sohuHD),function(v,u,t){var r={},h=$("#playtoolbar"),b=["",'<div class="cfix" style="margin-right:340px;" pb-impress data-pb-txid="pgcpg_player_toolbar">','<div id="shareBox" class="vBox vBox-fa" pb-hover data-pb-txid="pgcpg_player_share"></div>','<div class="vBox vBox-fav" pb-click-a data-pb-txid="pgcpg_player_fav"><a href="//my.tv.sohu.com/user/bookmark/list.do" target="_blank" class="vbtn"><em>\u6536\u85cf</em></a></div>','<%if(!(window.pagetype && window.pagetype == "vip") && window.wm_user == "20"){%>','<div class="vBox vBox-xiaPhone" id="phone-download" pb-hover data-pb-txid="pgcpg_player_tomobile" data-pb-other="btn">','<a href="javascript:void(0);" class="vbtn vbtn-xiaPhone">\u624b\u673a\u770b</a>','<div class="vCont">','<span class="arr"></span>','<div class="row1 cfix">','    <span class="l fs18 c-black sm">\u626b\u7801\u7528\u624b\u673a\u7ee7\u7eed\u770b</span>','    <a href="//help.tv.sohu.com/list.do?id=23#top209" class="r sr j-xiaphone-link" target="_blank" data-pb-txid="pgcpg_player_tomobile" data-pb-other="scanhelp">\u5982\u4f55\u626b\u63cf\u4e8c\u7ef4\u7801 <span class="f-song">&gt;&gt;</span></a>',"</div>",'<div class="cfix j-phone-box">','    <div class="l colL">','        <img src="//:0" width="170" height="170">','        <p>\u7528<span class="c-black">\u641c\u72d0\u89c6\u9891APP</span>\u6216\u5fae\u4fe1\u626b\u7801</p>',"    </div>",'    <div class="r colR rel" style="height:193px;">','        <p class="p0 fs16 c-black" title=""></p>','        <p class="p1 fs12"></p>','        <div style="position:absolute;bottom:0;">',"          <p>\u6ca1\u6709\u641c\u72d0\u89c6\u9891APP\uff1f</p>",'          <a href="//tv.sohu.com/sohuapp/" class="btn-az td-n j-xiaphone-link" target="_blank" data-pb-txid="pg_player_tomobile" data-pb-other="appsetup">\u7acb\u5373\u5b89\u88c5</a>',"        </div>","    </div>"," </div>","</div>","</div>","<%}%>",'<div class="vBox vBox-xia" pb-hover data-pb-txid="pgcpg_player_download" data-pb-other="btn" style="display:none;" id="j-download">','    <a href="javascript:;" class="vbtn vbtn-xia">\u4e0b\u8f7d</a>','    <div class="vCont">','        <span class="arr"></span>','        <div class="vtit">',"            <h4>\u4e0b\u8f7d\u89c6\u9891</h4>","        </div>",'        <div class="j-download-cont">','            <div class="row2 ta-c"><img src="//css.tv.itc.cn/channel/play_v1_img/video/down.png" width="100" height="73"></div>','            <a href="javascript:;" class="btn-az td-n j-download" pb-click data-pb-txid="pgcpg_player_download" data-pb-other="downloadvideo">\u4e0b\u8f7d\u89c6\u9891\u5230\u7535\u8111</a>',"        </div>","    </div>","</div>",'<div class="vBox vBox-desktop" pb-hover data-pb-txid="pgcpg_player_desktop" data-pb-other="btn" style="display:none;">','    <a href="javascript:;" class="vbtn vbtn-desktop">\u653e\u5230\u684c\u9762</a>','    <div class="vCont">','        <span class="arr"></span>','        <div class="vtit">',"            <h4>\u653e\u5230\u684c\u9762</h4>","        </div>",'        <div class="j-desktop-cont">','            <div class="row2 ta-c"><img src="//css.tv.itc.cn/channel/play_v1_img/video/tv.png" width="100" height="73"></div>','            <a href="javascript:;" class="btn-az td-n j-desktop" pb-click data-pb-txid="pgcpg_player_desktop" data-pb-other="todesktop">\u5c06\u672c\u7247\u653e\u5230\u684c\u9762</a>',"        </div>","    </div>","</div>",'<div class="r">','<div class="vBox vBox-play"><a href="javascript:;" class="vbtn vbtn-play"><em><i>&nbsp;</i></em></a></div>','<div class="vBox vBox-ding" pb-click data-pb-txid="pgcpg_player_updown" data-pb-other="up"><a href="javascript:;" class="vbtn"><em><i>0</i></em></a></div>','<div class="vBox vBox-cai"  pb-click data-pb-txid="pgcpg_player_updown" data-pb-other="down"><a href="javascript:;" class="vbtn"><em><i>0</i></em></a></div>','<div class="vBox vBox-remark" pb-click data-pb-txid="pgcpg_player_comment">','    <a href="javascript:void(0)" class="vbtn"><em><i>0</i></em></a>','    <div class="pop"><span class="pop-close" data-pb-txid="pgcpg_player_combub_off"></span><div class="pop-txt"></div></div>',"</div>","</div>","</div>"].join("");var m={init:function(){this.btn=h.find(".vBox-fav .vbtn")},isBookmark:function(i,t){var a=this,e=["","//my.tv.sohu.com/user/a/bookmark/isVideoExists.do?callback=?","&vid=",v.vid,"&uid=",u.user.uid,"&source=mainsite"].join("");u.getJSONP(e,function(t){1===t.status?a.setStatus(t,!0):(a.setStatus(t),i&&i())})},setStatus:function(t,i){var a;t=$.extend({},t),(i=i||!1)?(a="<em>\u5df2\u6536\u85cf</em>",this.btn.addClass("mark").data("pb-other","cancel")):(a="<em>\u6536\u85cf</em>",this.btn.removeClass("mark").data("pb-other","store")),this.btn.html(a).data("ismark",i).data("markid",t.id||"")}};v.initLookPoint=function(i){if(!i||!i.length)return!1;$('<div class="vBox vBox-view"><a href="#" class="vbtn"><em>\u72ec\u5bb6\u770b\u70b9</em></a></div>').insertBefore(".vBox-play");var a=function(t){var a=$(t).find("a").attr("rel"),e=[];return"all"==a?$.each(i,function(t,i){e.push('<div class="box" rel="',i.id,'">','      <a href="',i.destUrl,'" target="_blank"><img width="160" src="',i.image,'"></a>','      <strong><a href="',i.destUrl,'" target="_blank">',i.name,"</a></strong>","      <p>",i.desc,'<a class="ms" href="',i.destUrl,'" target="_blank">\u53bb\u770b\u770b&gt;&gt;</a></p>',"  </div>")}):$.each(i,function(t,i){a==i.type&&e.push('<div class="box" rel="',i.id,'">','      <a href="',i.destUrl,'" target="_blank"><img width="160" src="',i.image,'"></a>','      <strong><a href="',i.destUrl,'" target="_blank">',i.name,"</a></strong>","      <p>",i.desc,'<a class="ms" href="',i.destUrl,'" target="_blank">\u53bb\u770b\u770b&gt;&gt;</a></p>',"  </div>")}),$("#point_con").html(e.join("")),setTimeout(function(){$("#point_con").masonry({itemSelector:".box"}).masonry("reload")},50),u.pingback("//click.hd.sohu.com.cn/s.gif?type=fun_kdq_show&r="+(new Date).getTime()),!1},e=function(){var t=e.box;t||((t=e.box=new u.showWin({htmlStr:["",'<div class="viewBox">','<div class="vb-tab cfix">','  <ul class="l cfix">','      <li><a rel="all" href="#">\u5168\u90e8</a></li>','      <li><a rel="person" href="#">\u4eba\u7269</a></li>','      <li><a rel="thing" href="#">\u7269\u54c1</a></li>','      <li><a rel="place" href="#">\u5730\u70b9</a></li>','      <li><a rel="other" href="#">\u5176\u4ed6</a></li>',"  </ul>",'  <span class="vb-close"></span>',"</div>",'<div class="vb-con cfix">','  <div id="point_con"></div>',"</div>","</div>"].join(""),noMask:!0})).initWin(),t.winbox.delegate(".vb-close","click",function(){t.closeWin()})),t.show()};$(".vBox-view").click(function(t){kao("masonry",function(){e(),u.switchTab($(".vb-tab li"),{cssName:"on",callback:a})}),t.preventDefault()}),$("body").delegate(".viewBox a","click",function(){u.pingback("//click.hd.sohu.com.cn/s.gif?type=fun_kdq_"+$(this).parents(".box").attr("rel")+"&r="+(new Date).getTime())})};var s={},d=document.charset||document.characterSet||"gbk";function g(i){var a,o=$("#phone-download");o.bind("mouseover",function(t){a&&v.clearTimeout(a),o.hasClass("vBoxVis")||(a=v.setTimeout(function(){o.siblings().removeClass("vBoxVis"),o.addClass("vBoxVis"),messagebus.publish("toolbar.vboxvis",{btn:o}),function e(t){t.player;var n=t.shareLink||location.href,i=["//api.tv.sohu.com/v4/video/info/",v.vid,".json?callback=?&site=2&api_key=88a12cee7016fe81ac2ab686d918bc7c","&aid=",v.playlistId,"&encoding=",d].join("");function a(t){var i=0,a=v._player||document.getElementById("player");a&&a.playedTime?i=parseInt(a.playedTime()):a&&a.currentTime&&(i=Math.ceil(v._player.currentTime));var e=[n.replace(/#.*/g,"").replace("my.tv.sohu.com","m.tv.sohu.com").split("?")[0],"?channeled=1211060001",,i?"#"+i:"","&sohuaction=sva://action.cmd?action=1.1","&sid=",t.aid,"&vid=",t.vid,"&site=",t.site,"&cid=",t.cid,"&dataType=",t.data_type,"&more=",encodeURIComponent(JSON.stringify({sourcedata:{position:1e3*i,channeled:"1000120056"}}))].join("");e="//my.tv.sohu.com/user/a/wvideo/getQRCode.do?text="+encodeURIComponent(e)+"&width=170&height=170&picType=1";var o=t.video_name,s=["",'<div class="l colL">','    <img src="',e,'" width="170" height="170">','    <p>\u7528<span class="c-black">\u641c\u72d0\u89c6\u9891APP</span>\u6216\u5fae\u4fe1\u626b\u7801</p>',"</div>",'<div class="r colR rel" style="height:193px;">','    <p class="p0 fs16 c-black" title="',o,'">',o,"</p>",'    <p class="p1 fs12">\u60a8\u5df2\u89c2\u770b\u5230\uff1a',u.transPlayTime(i),"</p>",'    <div style="position:absolute;bottom:0;">',"      <p>\u6ca1\u6709\u641c\u72d0\u89c6\u9891APP\uff1f</p>",'      <a href="//tv.sohu.com/sohuapp/" class="btn-az td-n j-xiaphone-link" target="_blank" data-pb-txid="pg_player_tomobile" data-pb-other="appsetup">\u7acb\u5373\u5b89\u88c5</a>',"    </div>","</div>"].join("");$(".j-phone-box").html(s)}s[v.vid]?a(s[v.vid]):u.getJSONP(i,function(t){if(200==t.status){var i=t.data;a(s[v.vid]=i)}})}(i)},300))}).bind("mouseleave",function(){a&&v.clearTimeout(a),a=v.setTimeout(function(){o.removeClass("vBoxVis")},200)}).delegate(".vCont","click",function(t){t.stopPropagation()}).delegate(".j-xiaphone-link","click",function(t){messagebus.publish("statV2.ping",{url:"mc",type:"click",txid:this.getAttribute("data-pb-txid"),other:this.getAttribute("data-pb-other")})})}var f={downloadInit:["",'<div class="row2 ta-c"><img src="//css.tv.itc.cn/channel/play_v1_img/video/down.png" width="100" height="73"></div>','<a href="javascript:;" class="btn-az td-n j-download" pb-click data-pb-txid="pgcpg_player_download" data-pb-other="downloadvideo">\u4e0b\u8f7d\u89c6\u9891\u5230\u7535\u8111</a>'].join(""),downloadSetup:["",'<div class="row1">\u6b63\u5728\u4e3a\u60a8\u4e0b\u8f7d<span class="c-red">\u641c\u72d0\u5f71\u97f3\u5ba2\u6237\u7aef</span>\u5b89\u88c5\u540e\u5373\u53ef\u4e0b\u8f7d\u672c\u7247\u5230\u7535\u8111</div>','<a href="javascript:;" class="btn-az td-n j-download" pb-click data-pb-txid="pgcpg_player_download" data-pb-other="downloadvideo">\u4e0b\u8f7d\u89c6\u9891\u5230\u7535\u8111</a>'].join(""),downloadNewVersion:["",'<div class="row1"><span class="c-red">\u641c\u72d0\u5f71\u97f3</span>\u5373\u5c06\u4e3a\u60a8\u4e0b\u8f7d\u89c6\u9891<br>\u5982\u672a\u5b89\u88c5\uff0c\u8bf7\u5148\u5b89\u88c5<span class="c-red">\u641c\u72d0\u5f71\u97f3</span></div>','<a href="javascript:;" class="btn-az td-n j-todownload" pb-click data-pb-txid="pgcpg_player_download" data-pb-other="downloadvideo">\u4e0b\u8f7d\u641c\u72d0\u5f71\u97f3\u5ba2\u6237\u7aef</a>'].join(""),desktopInit:["",'<div class="row2 ta-c"><img src="//css.tv.itc.cn/channel/play_v1_img/video/tv.png" width="100" height="73"></div>','<a href="javascript:;" class="btn-az td-n j-desktop" pb-click data-pb-txid="pgcpg_player_desktop" data-pb-other="todesktop">\u5c06\u672c\u7247\u653e\u5230\u684c\u9762</a>'].join(""),desktopSetup:["",'<div class="row1">\u6b63\u5728\u4e3a\u60a8\u4e0b\u8f7d<span class="c-red">\u641c\u72d0\u5f71\u97f3\u5ba2\u6237\u7aef</span>\u5b89\u88c5\u540e\u5373\u53ef\u5c06\u672c\u7247\u653e\u5230\u684c\u9762</div>','<a href="javascript:;" class="btn-az td-n j-desktop" pb-click data-pb-txid="pgcpg_player_desktop" data-pb-other="todesktop">\u5c06\u672c\u7247\u653e\u5230\u684c\u9762</a>'].join(""),desktopEnd:["",'<div class="row2 ta-c"><img src="//css.tv.itc.cn/channel/play_v1_img/video/tv.png" width="100" height="73"></div>','<a href="javascript:;" class="btn-az td-n btn-az-grey">\u5df2\u653e\u5230\u684c\u9762</a>'].join(""),desktopNewVersion:["",'<div class="row1"><span class="c-red">\u641c\u72d0\u5f71\u97f3</span>\u5373\u5c06\u628a\u89c6\u9891\u653e\u5230\u684c\u9762<br>\u5982\u672a\u5b89\u88c5\uff0c\u8bf7\u5148\u5b89\u88c5<span class="c-red">\u641c\u72d0\u5f71\u97f3</span></div>','<a href="javascript:;" class="btn-az td-n j-todownload" pb-click data-pb-txid="pgcpg_player_desktop" data-pb-other="todesktop">\u4e0b\u8f7d\u641c\u72d0\u5f71\u97f3\u5ba2\u6237\u7aef</a>'].join(""),loading:["",'<div class="ta-c"><img src="//css.tv.itc.cn/channel/play_v1_img/video/loading.gif" width="60" height="60" style="margin-top:20px;"><div class="tac" style="margin-top:33px;">\u6b63\u5728\u68c0\u6d4b\u5ba2\u6237\u7aef...</div></div>'].join("")};u.initPlayToolbar=function(t,i){$.extend(r,i),(h=$(t)).html(u.tmpl(b,{isAD:i.isAD})),i.isAD&&function s(t){h=$(t),u.getJSONP("//sp.qf.56.com/sohu/playerRight.do?callback=showToolbarTg&encode=GBK",function(t){var i="";if(200==t.status&&t.message.banners&&t.message.banners.length){var a=t.message.banners[0];$("#playtoolbartg").remove(),i=["",'<a id="playtoolbartg" style="position:absolute;top:17px;right:0;" href="',a.url,'"  pb-click data-pb-txid="pgcpg_player_rightad" target="_blank" class="r td-n">','    <img src="',a.picUrl,'" width="17" height="17" alt="',a.title,'" class="va-m">','    <span class="disib va-m" style="cursor:pointer;">',a.title,"</span>","</a>"].join(""),h.append(i)}messagebus.publish("render.playtoolbartg")})}(t),function n(){var o=["\u89c9\u5f97\u4e0d\u9519\uff1f\u7559\u4e2a\u8a00\u5457~","\u8d5e\u90fd\u70b9\u4e86\uff0c\u518d\u5520\u4e24\u53e5\u5457~","\u559c\u6b22\u6211\u5c31\u518d\u5938\u5938\u6211\u5427~","\u542c\u8bf4\u4f60\u559c\u6b22\u6211\uff1f\u7559\u8a00\u544a\u8bc9\u6211~","\u7231\u5c31\u8981\u8bf4\u51fa\u6765\uff0c\u7559\u4e2a\u8a00\u5457~"],s=["\u53ea\u70b9\u8e29\u600e\u4e48\u884c\uff1f\u4e0d\u5410\u4e0d\u5feb\uff01","\u4e0d\u559c\u6b22\uff1f\u5feb\u6765\u5410\u69fd\u5427\uff01","\u8bf4\u8bf4\u54ea\u91cc\u4e0d\u597d\uff0c\u6307\u5bfc\u4e00\u4e0b\u5457\uff1f","\u6c42\u6279\u8bc4\u3001\u6c42\u5efa\u8bae\uff01"];function r(t){var i=o;"down"==(t=t||"up")&&(i=s);var a=i[parseInt(Math.random()*i.length)],e=$(".vBox-remark");e.find(".pop-txt").html(a),e.find(".pop").show(),messagebus.publish("statV2.ping",{url:"mc",type:"impress",txid:"pgcpg_player_combub"}),setTimeout(function(){e.find(".pop").hide()},1e4)}kao.i("updown","plugin",function(){var t=this.UpDown,s=h.find(".vBox-ding"),n=h.find(".vBox-cai"),d=u.formatCount,c=function(t,i){s.html('<a href="javascript:;" class="vbtn vbtn-active"><em><i>'+d(t)+"</i></em></a>"),n.html('<a href="javascript:;" class="vbtn vbtn-dis"><em><i>'+d(i)+"</i></em></a>")},l=function(t,i){s.html('<a href="javascript:;" class="vbtn vbtn-dis"><em><i>'+d(t)+"</i></em></a>"),n.html('<a href="javascript:;" class="vbtn vbtn-active"><em><i>'+d(i)+"</i></em></a>")},p=new t({vid:"null"==v.vid?"-1":v.vid,cid:v.cid,pid:v.pid||_uid,tvid:v.tvid||""});p.init(function(a,e,t){var o=!1;s.find("i").html(d(a)),"up"==t?c(a,e):"down"==t?l(a,e):(s.bind("click",function(t){var i=parseInt(u.cookie("updownNum"))||0;if(passport=u.passport.getPassport(),!passport&&5<=i)kao("login",function(){$.Deferred(),u.initLogin(),u.showLoginWinbox(function(t){if(u.cookie("updownNum",0),o)return!1;o=!0,p.up(function(t){c(t,e),r("up")})})});else{if(o)return!1;o=!0,p.up(function(t){c(t,e),r("up")}),t.preventDefault()}}),n.find("i").html(d(e)),n.bind("click",function(t){var i=parseInt(u.cookie("updownNum"))||0;if(passport=u.passport.getPassport(),!passport&&5<=i)kao("login",function(){$.Deferred(),u.initLogin(),u.showLoginWinbox(function(t){if(u.cookie("updownNum",0),o)return!1;o=!0,p.down(function(t){l(a,t),r("down")})})});else{if(o)return!1;o=!0,p.down(function(t){l(a,t),r("down")}),t.preventDefault()}}))})})}(),function d(a){kao("forward_v2",function(){v.cateCode?v.cateCode:v._videoInfo&&v._videoInfo.cateCode&&v._videoInfo.cateCode;var t=a.shareLink||location.href,i={items:[{title:"\u5fae\u4fe1",img:"",bigimg:"//css.tv.itc.cn/channel/play_v1_img/video/weixin.png",arg:"weixin",pbother:"weixin",def:!0,className:"jsi-weixin",header:!0},{title:"QQ",img:"",bigimg:"//css.tv.itc.cn/channel/play_v1_img/video/qq.png",arg:"mqq,,"+t,pbother:"qq",className:"jsi-qq",def:!0,header:!0},{title:"QQ\u7a7a\u95f4",img:"",bigimg:"//css.tv.itc.cn/channel/play_v1_img/video/zone.png",arg:"qq,,"+t,pbother:"qzone",def:!0,className:"jsi-zone",header:!0},{title:"\u65b0\u6d6a\u5fae\u535a",img:"",bigimg:"//css.tv.itc.cn/channel/play_v1_img/video/sina.png",arg:"weibosina,,"+t,pbother:"weibo",def:!0,className:"jsi-sina",header:!0}],txid:"pgcpg_player_forward",tpl:'<a title="<%=title%>" href="javascript:;" data-arg="<%=arg%>" data-pb-other="<%=showtext ? pbother+2 : pbother+1 %>" class="j-share-item <%=className %>">&nbsp;</a>',link:t.replace("//tv","//m.tv"),vid:a.vid||v.vid,title:document.title,isFloatShare:!1,showEvent:"hover"};u.Forward(i).init()})}(i),function c(){var i=h.find(".vBox-fav .vbtn"),t=u.passport.getPassport();m.init(),t&&m.isBookmark(),i.click(function(t){$(this).data("ismark")||(t.preventDefault(),messagebus.publish("player.do_bookmark",{btn:i,bookmark:m}))}),messagebus.subscribe("core.login.userinfo",function(){m.isBookmark()},null,null,{cache:!0}),messagebus.subscribe("core.logout",function(){m.setStatus()},null,null,{cache:!0})}(),function l(){var i=r.player,a=h.find(".vBox-play");if(a.html('<span class="vbtn vbtn-play"><em><i>&nbsp;</i></em></span>'),"9001"!=cid){var e,t=function(){var t=i.getPlayCount();t&&"wait"!==t&&(clearInterval(e),t=new Function(t+";return count")(),a.find("i").html(u.formatCount(t)))};e=setInterval(t,3e3),t()}else{var o,s="_stat"+u.random();o=_videoInfo.videoType&&"9001"!=_videoInfo.videoType?["//count.vrs.sohu.com/count/query.action?videoId=",vid,"&jsonp=",s,"&type=2"].join(""):["//vstat.my.tv.sohu.com/dostat.do?method=getVideoPlayCount&v=",vid,"&n=",s].join(""),u.getScript(o,function(){var t;t=_videoInfo.videoType&&"9001"!=_videoInfo.videoType?v[s].videos[0]:v[s][0],a.find("i").html(t.countFormat)})}}(),g(i),function p(){var a=$(".vBox-remark");if(v.vid){var e=v.vid;u.getJSONP("//api.my.tv.sohu.com/comment/api/v1/count?callback=?&pgc_vids="+e,function(t){if(t.data&&t.data[e]){var i=t.data[e].commentCountTip;a.find("i").text(i)}})}a.on("click",".vbtn",function(){var t=$("#commList").offset();$("html").animate({scrollTop:t.top-50},function(){$("#commentTextarea").focus()})}),a.on("click",".pop-close",function(){a.find(".pop").hide()})}(),"1013006"==vid&&u.getScript("//tv.sohu.com/frag/test/point_"+vid+".js",function(){initLookPoint(point.points)});var a=$("#j-download"),e=a.find(".j-download-cont"),o=!1;messagebus.subscribe("video.candownload",function(){var i;o||(v.pagetype&&"voice"===v.pagetype||(o=!0,a.show().bind("mouseenter",function(t){i&&v.clearTimeout(i),i=v.setTimeout(function(){a.addClass("vBoxVis"),e.html(f.downloadInit),messagebus.publish("toolbar.vboxvis",{btn:a})},300)}).bind("mouseleave",function(){i&&v.clearTimeout(i),i=v.setTimeout(function(){a.removeClass("vBoxVis")},200)}).delegate(".vCont","click",function(t){t.stopPropagation()}).delegate(".j-download","click",function(t){messagebus.publish("ifox.showdetail"),messagebus.publish("statV2.ping",{url:"mc",type:"click",txid:this.getAttribute("data-pb-txid"),other:this.getAttribute("data-pb-other")})}).delegate(".j-todownload","click",function(t){location.href="//p2p.hd.sohu.com/dcs.do?f=1&s=1084&videoinfo="+[vid,playlistId,cid,"9001"==cid?_uid:pid].join("_"),messagebus.publish("statV2.ping",{url:"mc",type:"click",txid:this.getAttribute("data-pb-txid"),other:this.getAttribute("data-pb-other")})}),messagebus.subscribe("play.changed_body_class",function(t,i){""==i?a.hide():a.show()},null,null,{cache:!0})))},null,null,{cache:!0}),messagebus.subscribe("core.ifox_ready",function(){var o,s=u.ifox,n=[vid,playlistId,cid,"9001"==cid?_uid:pid].join("_");messagebus.subscribe("ifox.showdetail",function(){e.html(f.loading),o&&v.clearTimeout(o),o=v.setTimeout(function(){s&&s.isInstalled()?(i.player.pauseVideo(),"9001"==cid?s.showDetailPage(vid,playlistId,cid,_uid):s.showDetailPage(vid,playlistId,cid,pid),s._isNewPlat?e.html(f.downloadNewVersion):e.html(f.downloadInit)):(s._isNewPlat?location.href="//p2p.hd.sohu.com/dcs.do?f=1&s=1084&videoinfo="+n:location.href="//p2p.hd.sohu.com/dcs.do?f=1&s=1055&videoinfo="+n,e.html(f.downloadSetup))},1e3)}),function(){if("9001"!==cid&&/win/i.test(navigator.userAgent)){var a=h.find(".vBox-desktop"),i=a.find(".j-desktop-cont");if(0!==a.size()){messagebus.subscribe("play.changed_body_class",function(t,i){""==i?a.hide():a.show()},null,null,{cache:!0});var e;a.show().bind("mouseenter",function(t){e&&v.clearTimeout(e),e=v.setTimeout(function(){if(a.addClass("vBoxVis"),s.isInstalled()){var t=s.isShortcutCreated(playlistId);"Exist"===t||"Nonsupport"===t?i.html(f.desktopEnd):i.html(f.desktopInit)}else i.html(f.desktopInit);messagebus.publish("toolbar.vboxvis",{btn:a})},300)}).bind("mouseleave",function(){e&&v.clearTimeout(e),e=v.setTimeout(function(){a.removeClass("vBoxVis")},200)}).delegate(".vCont","click",function(t){t.stopPropagation()}).delegate(".j-desktop","click",function(t){messagebus.publish("statV2.ping",{url:"mc",type:"click",txid:this.getAttribute("data-pb-txid"),other:this.getAttribute("data-pb-other")}),i.html(f.loading),o&&v.clearTimeout(o),o=v.setTimeout(function(){if(s.isInstalled()){var t=document.title||"";s.createShortcut(vid,pid,cid,playlistId,t),u.pingback("//click.hd.sohu.com.cn/ifox.gif?type=PUT_DESKTOP&stype=5&v="+s.getVersion(!0)+"&uid="+s.getUserId()+"&ChannelID="+s.getChannelNum()+"&r="+(new Date).getTime()),s._isNewPlat?i.html(f.desktopNewVersion):i.html(f.desktopEnd)}else s._isNewPlat?location.href="//p2p.hd.sohu.com/dcs.do?f=1&s=1084&videoinfo="+n:location.href="//p2p.hd.sohu.com/dcs.do?f=1&s=1055&videoinfo="+n,i.html(f.desktopSetup)},1e3)}).delegate(".j-todownload","click",function(t){location.href="//p2p.hd.sohu.com/dcs.do?f=1&s=1084&videoinfo="+n,messagebus.publish("statV2.ping",{url:"mc",type:"click",txid:this.getAttribute("data-pb-txid"),other:this.getAttribute("data-pb-other")})})}}}()},null,null,{cache:!0})}}(window,sohuHD),function(t){var d=!1;t.getFaved=function(){return 0};messagebus.subscribe("player.do_bookmark",function(t,i){if(!d){if("string"==typeof(i=i||{}))try{i=$.parseJSON(i)}catch(n){i={}}var a={vid:i.vid||window.vid||"",cid:i.cid||window.cid||"",pid:i.plid||window.playlistId||/\/(\d{1,})\//.exec(location.href)[1]||"",url:encodeURIComponent(location.href),title:escape(document.title.split("-")[0].replace(/\u300a|\u300b/g,""))};i.callback=i.callback||function(){};var e=i.btn,o=i.bookmark;sohuHD.showLoginWinbox(function(){e&&o&&(e.data("ismark")?function a(){var t=e.data("markid");if(t){var i=["","//my.tv.sohu.com/user/a/bookmark/remove.do?callback=?","&uid=",sohuHD.user.uid,"&id=",t].join("");sohuHD.getJSONP(i,function(t){1==t.status&&o.isBookmark()})}}():o.isBookmark(s))})}function s(){var t=["//my.tv.sohu.com/user/a/bookmark/save_update.do?callback=?","&vid=",a.vid,"&url=",a.url,"&title=",a.title,"&type=",a.cid,"&pid=",a.pid].join("");d=!0,sohuHD.getJSONP(t,function(t){d=!1,t&&1==t.status&&o.isBookmark();try{document.getElementById("player").collectionComplete(1)}catch(n){}i.callback&&i.callback()})}})}(sohuHD);