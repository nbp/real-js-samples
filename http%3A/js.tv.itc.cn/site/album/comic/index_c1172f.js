/* sohutv 2019-01-23 14:22:22 */
var cid=2,isZhankai=!0,isVip=!1;!function(i){var a=i.Template;a.registHelper({searchNewTag:function(i,e,a){var s=i;switch(typeurl="//so.tv.sohu.com/",a){case"tv":typeurl+="list_p12";break;case"movie":typeurl+="list_p11";break;case"doc":typeurl+="list_p18";break;case"tech":typeurl+="list_p121";break;case"comic":typeurl+="list_p116";break;case"variety":typeurl+="list_p17"}s=escape(s).replace(/%/g,"_");var t="",l="",n="",o="",r="";switch(e){case 4:case 12:t=s;break;case 7:l=s;break;case 10:n=s;break;case 15:"tv"==a||"movie"==a||"comic"==a?r=s:s;break;case 11:o=s;break;default:s}return[typeurl,"_p2",l,"_p3",t,"_p4",r,"_p5",n,"_p6",o,"_p7","","_p8_p9.html"].join("")},searchKey:function(i,e,a){var s="";if(s="object"==typeof i?i.innerHTML:i,e=e||"",e=parseInt(e),a=(a=a||"").toLowerCase(),/4|7|10|11|12/.test(e.toString())||"15"==e&&/movie|tv|comic/.test(a))return this.searchNewTag(s,e,a);var t="mts?";switch(a){case"tv":t+="&c=2";break;case"movie":t+="&c=1";break;case"doc":t+="&c=8";break;case"tech":t+="&c=21";break;case"comic":t+="&c=16";break;case"variety":t+="&c=7"}switch(e){case 4:t+="&area=";break;case 7:t+="&cat=";break;case 10:t+="&cs=";break;case 15:t+="tv"==a||"movie"==a?"&year=":"&wd=";break;case 11:t+="&age=";break;default:t+="&wd="}return"//so.tv.sohu.com/"+t+(s=escape(s))},isNewPub:function(i){if(i&&i.publishTime){var e=i.publishTime.split("-"),a="0"==e[1].substr(0,1)?parseInt(e[1].substr(1,1))-1:parseInt(e[1])-1,s=parseInt((new Date-new Date(e[0],a,e[2]))/1e3/60/60/24);if(0<=s&&s<2)return!0}return!1},checklen:function(i,e){return(i=i.replace(/[^\x00-\xff]/g,"mm")).length>e||!(i.length<=e)&&void 0}});var s={};s.topInfo=['<div class="infoL l rel">','<a href="<%=topInfo.defaultPageUrl%>" target="_blank" class="J-video-cover"><img src="<%=topInfo.pic240_330%>" width="200" height="265">','<span class="info-mk"></span>','<span class="info-video"></span></a>',"</div>",'<div class="infoR r">','<div class="row1 cf">','<h2 class="dbt c-black l"><%=topInfo.albumName%></h2>','<div class="starDiv l"></div>','<span class="r">\u64ad\u653e\u6570\uff1a<em class="c-black acount" rel="<%=topInfo.playlistid%>"></em></span>',"</div>",'<div class="row2 cf">','<div class="cf">','<p class="p1 colL l">\u7c7b\u578b\uff1a',"<% ","var cat = topInfo.categories;","var cid = topInfo.cid;","for (var i = 0, len = cat.length; i < len; i++) {","if (i != len - 1) {","%>",'<a href="<%=helper.searchKey(cat[i],7,"comic")%>" target="_blank"><%=cat[i]%></a> /',"<%","} else{","%>",'<a href="<%=helper.searchKey(cat[i],7,"comic")%>" target="_blank"><%=cat[i]%></a>',"<%","}","}","%>","</p>",'<p class="p1 colR r">\u5e74\u4efd\uff1a<span class="c-black"><%=topInfo.publishYear%></span></p>',"</div>",'<div class="cf">','<p class="p1 colL l">\u5bfc\u6f14/\u76d1\u7763\uff1a',"<%","var directorMap = topInfo.directorsMap;","var len = directorMap.length > 6 ? 6 : directorMap.length;","for (var i = 0, len = directorMap.length; i < len; i++) {","var item = directorMap[i];","if (i != len - 1) {","%>",'<a href="<%=item.starUrl%>" target="_blank"><%=item.starName%></a> /',"<%","} else {","%>",'<a href="<%=item.starUrl%>" target="_blank"><%=item.starName%></a> ',"<%","}","}","%>","</p>",'<p class="p1 colR r">\u5730\u533a\uff1a<span class="c-black"><%=topInfo.area%></span></p>',"</div>","</div>","<% if(helper.checklen(topInfo.albumDesc,311)){%>",'<div class="row3 rel J-fullintro" style="display:none;">',"\u7b80\u4ecb\uff1a<%=topInfo.albumDesc%>",'<a href="javascript:;" class="shouqi">\u6536\u8d77</a>',"</div>",'<div class="row3 rel J-halfintro">',"\u7b80\u4ecb\uff1a<%=sohuHD.strSub(topInfo.albumDesc,311,true)%>",'<a href="javascript:;" class="zhankai">\u5c55\u5f00</a>',"</div>","<% }else{%>",'<div class="row3 rel">',"\u7b80\u4ecb\uff1a<%=topInfo.albumDesc%>","</div>","<% } %>",'<div class="td-n cf">','<div class="l"><a href="<%=topInfo.defaultPageUrl%>" target="_blank" class="btn-see mr10">\u73b0\u5728\u89c2\u770b</a><span class="vBox-warn"><a href="#" class="btn-grey mr10 vbtn" data-rss-uid="<%=topInfo.playlistid%>">\u8ffd\u5267\u63d0\u9192</a></span></div>','<div class="share">',' <span class="disib vam">\u5206\u4eab\u5230\uff1a</span>',' <a href="javascript:;" data-rel="weixin" class="sharebtn"><img src="//css.tv.itc.cn/album/drama_album_images/logo/16x16/weixin.gif" width="16" height="16" alt="\u5fae\u4fe1"></a>',' <a href="javascript:;" data-rel="weibosina" class="sharebtn"><img src="//css.tv.itc.cn/album/drama_album_images/logo/16x16/sina.gif" width="16" height="16" alt="\u5fae\u4fe1"></a>',' <a href="javascript:;" data-rel="qq2" class="sharebtn"><img src="//css.tv.itc.cn/album/drama_album_images/logo/16x16/zone.gif" width="16" height="16" alt="\u5fae\u4fe1"></a>',' <a href="javascript:;" data-rel="mqq2" class="sharebtn"><img src="//css.tv.itc.cn/album/drama_album_images/logo/16x16/qq.gif" width="16" height="16" alt="\u5fae\u4fe1"></a>',"</div>","</div>","</div>"].join(""),s.listtabs=["<%","var size = videolist.size;","var isS=videolist.isShowTitle;","var tabnum;","if(isS==1){","tabnum=10;","}else{","tabnum=50;","}","var litabs = Math.ceil(size / tabnum);","%>",'<ul class="series-tab cf">',"<%","for (var i = 0; i < litabs; i++){","var start = parseInt(videolist.videos[0].order)+(i * tabnum);","var end = (i + 1) * tabnum;","if(size<tabnum){","end = videolist.totalSet;","}","%>",'<li class="serti"><%=start%>-<%=end%></li>',"<%","}","%>","</ul>"].join(""),s.listcons=["<%","var size = videolist.size;","var videos = videolist.videos;","var isS=videolist.isShowTitle;","var pagenum;","if(isS==1){","pagenum=10;","}else{","pagenum=50;","}","var pagelen = Math.ceil(size/pagenum);","for(var i = 0; i < pagelen; i++){","if(isS==1){","%>",'<ul class="serielist tebbcon">',"<%","for(var j = i * pagenum; j < (i + 1) * pagenum; j++) {","if (j >= size){","break;","}","var video = videos[j];","%>","<% var prevideoslen = videolist.prevideos.length;",,"if( prevideoslen > 0){","var _order = parseInt(videolist.prevideos[0].order);","if((_order-1)==j){","for(var k = 0; k < prevideoslen; k++){","var prevideo = videolist.prevideos[k];","%>","<li>",'<em class="num"><%=prevideo.order%></em>','<a href="<%=prevideo.pageUrl%>" target="_blank" class="fs14 s-tit"><%=prevideo.name%></a>','<i class="xin"></i>',"</li>","<%}","}","}%>","<% if(video){ %>","<li>",'<em class="num"><%=parseInt(j+1)%></em>','<a href="<%=video.pageUrl%>" target="_blank" class="fs14 s-tit"><%=video.name%></a>',"<% if(video.tvIsFee===1){ %>",'<i class="tips_vip"></i>',"<% } else if(helper.isNewPub(video)){ %>",'<i class="yu"></i>',"<% } %>","</li>","<%}%>","<%}%>","<% var prevideoslen = videolist.prevideos.length;",,"if( prevideoslen > 0){","var _order = parseInt(videolist.prevideos[0].order);","if (i==(pagelen-1)&&_order>size) {","for(var k = 0; k < prevideoslen; k++){","var prevideo = videolist.prevideos[k];","%>","<li>",'<em class="num"><%=prevideo.order%></em>','<a href="<%=prevideo.pageUrl%>" target="_blank" class="fs14 s-tit"><%=prevideo.name%></a>','<i class="xin"></i>',"</li>","<%}","}","}%>","</ul>","<%}else if(isS==0){%>",'<ul class="series2 tebbcon">',"<%","for(var j = i * pagenum; j < (i + 1) * pagenum; j++) {","if (j >= size){","break;","}","var video = videos[j];","%>","<% var prevideoslen = videolist.prevideos.length;",,"if( prevideoslen > 0){","var _order = parseInt(videolist.prevideos[0].order);","if((_order-1)==j){","for(var k = 0; k < prevideoslen; k++){","var prevideo = videolist.prevideos[k];","%>",'<li class="sera2">','<a href="<%=prevideo.pageUrl%>" class="sera" target="_blank">',,"<%=prevideo.order%>",'<em class="seri-on-red"></em>','<span class="xin"></span>',"</a>","</li>","<%}","}","}%>","<% if(video){ %>",'<li class="sera2">','<a href="<%=video.pageUrl%>" class="sera" target="_blank">',,"<%=video.order%>",'<em class="seri-on-red"></em>',"<% if(video.tvIsFee===1){ %>",'<em class="tips_vip"></em>',"<% } else if(helper.isNewPub(video)){ %>",'<span class="yu"></span>',"<% } %>","</a>","</li>","<%}%>","<%}%>","<% var prevideoslen = videolist.prevideos.length;",,"if( prevideoslen > 0){","var _order = parseInt(videolist.prevideos[0].order);","if (i==(pagelen-1)&&_order>size) {","for(var k = 0; k < prevideoslen; k++){","var prevideo = videolist.prevideos[k];","%>",'<li class="sera2">','<a href="<%=prevideo.pageUrl%>" class="sera" target="_blank">',,"<%=prevideo.order%>",'<em class="seri-on-red"></em>','<span class="xin"></span>',"</a>","</li>","<%}","}","}%>","</ul>","<%","}","}","%>"].join(""),s.novideolist=['<div class="td-n cf" style="margin-top:60px;">','<div style="text-align:center;font-size:20px;" class="fs14 mb13">\u6b63\u7247\u5728\u8def\u4e0a\uff0c\u656c\u8bf7\u671f\u5f85<p style="color:#e73c31;font-size:14px;padding-top:2px"><a style="color:#e73c31;" href="//tv.sohu.com" target="_blank">\u53bb\u9996\u9875\u770b\u770b\u5176\u4ed6\u7cbe\u5f69\u5185\u5bb9>></a></p></div>',"</div>"].join(""),s.videolist=['<div class="td-n cf">','<p class="fs14">\u5171<%=videolist.totalSet%>\u96c6\uff0c\u66f4\u65b0\u5230<%=videolist.updateSet%>\u96c6\uff0c<em style="color:#e73c31"><%=videolist.updateNotification%></em></p>','<%=sohuHD.render("listtabs", {videolist: videolist})%>','<%=sohuHD.render("listcons", {videolist: videolist,isVip:isVip})%>',"</div>"].join(""),s.videolisttotal=['<div class="td-n cf">','<p class="fs14">\u5171<%=videolist.totalSet%>\u96c6\u5168',"<% var data = videolist;","var isEnd = (data.size === 0 || data.totalSet === 0 || data.totalSet == data.size);","var videos = data.videos,lastVideo = videos[videos.length - 1];","if(videos.length==0||!isEnd || lastVideo.tvIsFee === 1 || (data.cid == 7 && data.updateNotification)){","%>",'\uff0c<em style="color:#e73c31;"><%=videolist.updateNotification%></em>',"<% }%>","</p>",'<%=sohuHD.render("listtabs", {videolist: videolist})%>','<%=sohuHD.render("listcons", {videolist: videolist,isVip:isVip})%>',"</div>"].join(""),s.pianhuapages=["<%","var size = videolist.length||videolist;","var pagelen = Math.ceil(size/pagenum);",'var boxheight = "150px";',"if (pagelen < 6){",'boxheight = "auto";',"}","if (pagelen > 1) {","%>",'<div class="pageB r cfix">','<a href="" class="page-pre" data-page="1">\u4e0a\u4e00\u9875</a>','<div class="page-num">','<div class="pond"><span class="pon">1</span></div>','<div class="pud" style="height:<%=boxheight%>">','<ul class="pu cfix">',"<%","for(var i = pagelen; i > 0; i--) {","%>",'<li class="pi" data-page="<%=i%>"><span class="ps"><%=i%></span></li>',"<%","}","%>","</ul>","</div>","</div>",'<a href="" class="page-next" data-page="2">\u4e0b\u4e00\u9875</a>',"</div>","<%","}","%>"].join(""),s.pianhualist=["<%","var size = videolist.length;","var videos = videolist;","var pagelen = 1;","var pagenum = videolist.length < 8 ? videolist.length : 8;",'var ulcss = "";',"if (lines == null) {","pagenum = 20;","pagelen = Math.ceil(size/pagenum);",'ulcss = "pianhuapage";',"}","for(var i = 0; i < pagelen; i++){","%>",'<ul class="lis lisuu cf <%=ulcss%>" data-type="<%=datatype%>" <% if(datatype!="allpianhua"){%> style="display:none"<%}%> >',"<%","for(var j = i * pagenum; j < (i + 1) * pagenum; j++) {","if (j >= size){","break;","}","var video = videos[j];","%>","<% if(video){ %>",'<li class="lisi">','<a href="<%=video.pageUrl%>" class="load sz170" target="_blank">','<img src="<%=video.tvCropPic170%>" class="sz170" alt="">','<span class="lisBg"></span>','<span class="tmt">',"<%=sohuHD.formatSeconds(video.playLength)%> </span>",'<span title="\u8d85\u6e05" class="super">\u8d85\u6e05</span>','<span class="acount" rel="<%=video.vid%>"></span>',"</a>",'<p class="p_bt"><a href="<%=video.pageUrl%>" title="<%=video.name%>" target="_blank"><%=video.name%></a></p>',"</li>","<%}%>","<%","}","%>","</ul>","<%","}","%>"].join(""),s.infolist=["<%","var videos = videolist;","var size = 0;","var pagenum = 5;","var pagelen = 0;","if (lines == null) {","size = videolist.length;","pagelen = Math.ceil(size / pagenum);","} else {","size = videolist.length > lines ? lines : videolist.length;","pagelen = Math.ceil(size / pagenum);","}","%>","<%","for (var i = 0; i < pagelen; i++) {","%>",'<div class="infopage">',"<%","for(var j = pagenum * i; j < pagenum * (i + 1); j++){","if (j >= size) {","break;","}","video = videos[j];","if((isVip==true&&video.tvIsFee===1)||video.tvIsFee===0){","%>",'<div class="debox">','<div class="tit cf"><h4 class="tith4"><%=video.name%></h4><a href="<%=video.pageUrl%>" class="btn-play r" target="_blank">\u64ad \u653e</a></div>','<div class="con cf">','<div class="colL l">','<a href="<%=video.pageUrl%>" class="colL-img rel"  target="_blank">','<img src="<%=video.tvCropPic170%>" class="sz170" alt="">','<span class="colL-bg abs"></span>','<span class="colL-play abs"></span>',"</a>",'<p class="time"><%=video.publishTime%></p>',"</div>","<% if(helper.checklen(video.videoDesc,276)){%>",'<div class="colR r J-fullintro" style="display:none;">',"<%=video.videoDesc%>",'<div class="rt-bg"><a href="javascript:;" class="shouqi">\u6536\u8d77</a></div>',"</div>",'<div class="colR r J-halfintro">',"<%=sohuHD.strSub(video.videoDesc,276,true)%>",'<div class="rt-bg"><a href="javascript:;" class="zhankai">\u5c55\u5f00</a></div>',"</div>","<% }else{%>",'<div class="colR r">',"<%=video.videoDesc%>","</div>","<% } %>","</div>","<% if(video.ep.length>0){%>",'<ul class="debox-ul cf">',"<% for(var pt=0;pt<video.ep.length;pt++){%>",'<li><a href="<%=[video.pageUrl,\'#_\',video.ep[pt].k].join(\'\') %>" title="<%=video.ep[pt].v%>" target="_blank"><span class="tm"><%=helper.timeFormat(Math.floor(video.ep[pt].k), \'mm:ss\')%></span><%=video.ep[pt].v%></a></li>',"<% }%>","</ul>","<% }%>","</div>","<%","}","}","%>","</div>","<%","}","%>"].join(""),s.serieslist=["<%","var num = 4;","var len = serieslist.length;","var ullen = (lines != null && lines < Math.ceil(len / num)) ? lines : Math.ceil(len / num);","for (var i = 0; i < ullen; i++) {","%>",'<ul class="lis lisuu cf">',"<%","for(var j = i * num; j < (i + 1) * num; j++) {","if (j < len) {","var obj = serieslist[j];","%>",'<li class="lisi">','<a href="<%=obj.albumPageUrl%>" class="load sz170225" target="_blank">','<img src="<%=obj["170225PicUrl"]%>" class="sz170225" alt="">','<span title="\u8d85\u6e05" class="super">\u8d85\u6e05</span>','<span class="pcount" rel="<%=obj.playlistid%>"></span>',"</a>",'<p class="p_bt"><a href="<%=obj.albumPageUrl%>" title="<%=obj.albumName%>" target="_blank"><%=obj.albumName%></a></p></li>',"<%","}","}","%>","</ul>","<%","}","%>"].join(""),s.actors=["<%","var len = actorlist.length;","if(len<6){isZhankai = false;}","len = len > 6 ? 6 : len;","for (var i = 0; i < len; i++) {",'var actorlistHref = "//tv.sohu.com/star/"+actorlist[i].idnameEncode + ".shtml";',"%>",'<li class="lisi">','<a target="_blank" class="load sz70a" href="<%=actorlistHref%>">','<span class="sz70a-mask"></span>','<img width="70" height="85" alt="<%=actorlist[i].star_name%>" src="<%=actorlist[i].imagesmall%>">',"</a>",'<p class="p_bt">','<a target="_blank" href="<%=actorlistHref%>" title="<%=actorlist[i].star_name%>"><%=actorlist[i].star_name%></a>',"</p>",'<p class="p_ming"><%=actorlist[i].role%></p>',"</li>","<%","}","%>"].join(""),s.actorsAll=["<%","var len = actorlist.length;","for (var i = 0; i < len; i++) {",'var actorlistHref = "//tv.sohu.com/star/"+actorlist[i].idnameEncode + ".shtml";',"%>",'<li class="lisi">','<a target="_blank" class="load sz70a" href="<%=actorlistHref%>">','<span class="sz70a-mask"></span>','<img width="70" height="85" alt="<%=actorlist[i].star_name%>" src="<%=actorlist[i].imagesmall%>">',"</a>",'<p class="p_bt">','<a target="_blank" href="<%=actorlistHref%>" title="<%=actorlist[i].star_name%>"><%=actorlist[i].star_name%></a>',"</p>",'<p class="p_ming"><%=actorlist[i].role%></p>',"</li>","<%","}","%>"].join(""),s.likes=["<%","var len = likelist.length;","len = len > 6 ? 6 : len;","for (var i = 0; i < len; i++) {","var namelen =likelist[i].actors.length;","namelen = namelen > 2 ? 2 : namelen;var tempNameArray = [];","for (var j = 0; j < namelen; j++) {","tempNameArray.push(likelist[i].actors[j]);","}",'var nameStrings = tempNameArray.join("/");',"%>",'<li class="lisPi cf">','<a href="<%=likelist[i].url%>" target="_blank" class="sz110 load"><img src="<%=likelist[i].albumPic%>" class="sz110" title="<%=likelist[i].albumName%>" /></a>','<div class="pic">','<p class="fs14 pt"><a href="<%=likelist[i].url%>" target="_blank" title="<%=likelist[i].albumName%>" ><%=likelist[i].albumName%></a></p>','<p class="pi break"><%=nameStrings%></p>',"</div>","</li>","<%","}","%>"].join(""),i.render=function(i,e){return a.render(s[i],e)},i.formatSeconds=function(i){var e=parseInt(i),a=0,s=0;60<e&&(a=parseInt(e/60),e=parseInt(e%60),60<a&&(s=parseInt(a/60),a=parseInt(a%60)));var t=parseInt(e)+"\u79d2";return 0<a&&(t=parseInt(a)+"\u5206"+t),0<s&&(t=parseInt(s)+"\u5c0f\u65f6"+t),t}}(sohuHD),sohuHD.dramaData=new function(){this.subType={tv:2,movie:1,comic:4,tech:7}},function(t,l){function a(i){if(t.playlistId&&0<t.playlistId.length){var e="//pl.hd.sohu.com/videolist?playlistid="+t.playlistId+"&order=0&cnt=1&withLookPoint=1"+(i?"&preVideoRule="+i:"")+"&ssl=0&callback=__get_videolist";sohuHD.getScript(e);var a=sohuHD.passport.getPassport(),s="//rc.vrs.sohu.com/drama/album?pid="+t.playlistId+"&p="+a+"&callback=__get_likelist&encode=gbk";sohuHD.getScript(s)}}t.__get_videolist=function(i){i&&(l.videoList=i,messagebus.publish("album.loaded_video_list",i))},t.__get_pianhualist=function(i){l.pianhuaList=i,messagebus.publish("album.loaded_pianhua_list",i)},t.__get_serieslist=function(i){l.seriesList=[];var a={},s={};$.each(i,function(i,e){$.each(e.albums,function(i,e){a[e.playlistid]||(l.seriesList.push(e),a[e.playlistid]=s)})}),messagebus.publish("album.loaded_series_list",i)},t.__get_actorlist=function(i){l.actorsMap=i.allstars,l.actorsMapAll=i.allstars,messagebus.publish("album.loaded_actor_list",i)},t.__get_likelist=function(i){l.likesMap=i.albums,messagebus.publish("album.loaded_like_list",i)},sohuHD.passport.getPassport()?messagebus.subscribe("core.login.userinfo",function(i,e){2==e.feetype?(isVip=!0,a(2)):(isVip=!1,a(1))},null,null,{cache:!0}):a(1),messagebus.subscribe("album.loaded_video_list",function(){if(t.o_playlistId=l.videoList.pianhuaPid,t.kissId=l.videoList.kissId,t.o_playlistId){var i="//pl.hd.sohu.com/videolist?playlistid="+t.o_playlistId+"&order=1&ssl=0&callback=__get_pianhualist";sohuHD.getScript(i)}else $(".pianhua").remove(),$('.tabCi[data-tab="pianhua"]').remove();if(t.kissId){var e="//pl.hd.sohu.com/series?kissid="+t.kissId+"&callback=__get_serieslist&ssl=0";sohuHD.getScript(e)}else $(".seriesinfo").remove(),$('.tabCi[data-tab="seriesinfo"]').remove()},null,null,{cache:!0})}(window,sohuHD.baseInfo||(sohuHD.baseInfo={})),messagebus.subscribe("album.comic.title",function(){sohuHD.baseInfo.doStar=!1;var e=function(){$.getJSON("//vote.biz.itc.cn/query/score.json?callback=?",{albumId:window.playlistId},function(i){var a,e=i.score,s=Math.floor(e);sohuHD.baseInfo.starcss=s,sohuHD.baseInfo.starscore=e,$("#topInfo .starDiv").html('<div class="starInfo"><span id="starInfo"></span><em></em></div><span class="starTip">\u6253\u5206\u5df2\u63d0\u4ea4\uff0c\u8c22\u8c22\u53c2\u4e0e\uff01</span><span class="star star'+s+'"><em class="starIn"></em></span><span class="socre">'+e+'</span> <span class="vssum">'+i.count+"</span>\u4eba\u8bc4\u5206"),a=[{emleft:"8px",score:"1.0",tip:"\u70c2\u7247\uff0c\u5b8c\u5168\u5728\u6d6a\u8d39\u751f\u547d!"},{emleft:"20px",score:"2.0",tip:"\u70c2\u7247\uff0c\u5b8c\u5168\u5728\u6d6a\u8d39\u751f\u547d!"},{emleft:"32px",score:"3.0",tip:"\u70c2\u7247\uff0c\u5b8c\u5168\u5728\u6d6a\u8d39\u751f\u547d!"},{emleft:"44px",score:"4.0",tip:"\u70c2\u7247\uff0c\u5b8c\u5168\u5728\u6d6a\u8d39\u751f\u547d!"},{emleft:"58px",score:"5.0",tip:"\u4e00\u822c\uff0c\u52c9\u5f3a\u51d1\u5408\u770b\u770b\u5427!"},{emleft:"70px",score:"6.0",tip:"\u4e00\u822c\uff0c\u52c9\u5f3a\u51d1\u5408\u770b\u770b\u5427!"},{emleft:"82px",score:"7.0",tip:"\u5f88\u597d\uff0c\u5927\u591a\u6570\u4eba\u4f1a\u559c\u6b22!"},{emleft:"94px",score:"8.0",tip:"\u5f88\u597d\uff0c\u5927\u591a\u6570\u4eba\u4f1a\u559c\u6b22!"},{emleft:"106px",score:"9.0",tip:"\u5b8c\u7f8e\uff0c\u7edd\u5bf9\u4e0d\u5bb9\u9519\u8fc7\uff01"},{emleft:"118px",score:"10",tip:"\u5b8c\u7f8e\uff0c\u7edd\u5bf9\u4e0d\u5bb9\u9519\u8fc7\uff01"}],$(".star").bind("mousemove",function(i){if(!sohuHD.baseInfo.doStar){var e=Math.ceil((i.clientX-$(".starDiv .star").offset().left)/12);0<(e=10<e?10:e)&&(idx=e-1,$(".starDiv .star").attr("class","star star"+e),$("#starInfo").html(a[idx].tip),$(".starInfo em").css("left",a[idx].emleft),$(".starDiv .socre").html(a[idx].score),$(".starInfo").show())}}),$(".star").bind("mouseout",function(i){sohuHD.baseInfo.doStar||($(".starDiv .star").attr("class","star star"+sohuHD.baseInfo.starcss),$(".starDiv .socre").html(sohuHD.baseInfo.starscore),$(".starInfo").hide())}),$(".star").click(function(){if(!sohuHD.baseInfo.doStar){var i=parseInt($(".starDiv .socre").html()),e="//vote.biz.itc.cn/count/score.json?callback=&albumId="+window.playlistId+"&score="+i;sohuHD.getScript(e),sohuHD.baseInfo.doStar=!0,$(".starInfo").hide(),$(".star").hide(),$(".starTip").show();var a=$(".starDiv .vssum").html();$(".starDiv .vssum").html(parseInt(a)+1),setTimeout(function(){$(".star").show(),$(".starTip").hide(),$(".starDiv .star").attr("class","star star"+sohuHD.baseInfo.starcss),$(".starDiv .socre").html(sohuHD.baseInfo.starscore),$(".starInfo").unbind().css("cursor","default")},3e3)}})})},a=function(){var i,e=sohuHD.baseInfo.videoList,a=0===e.size||0===e.totalSet||e.totalSet==e.size,s=e.videos,t=s[s.length-1];0==s.length||!a||1===t.tvIsFee||7==e.cid&&e.updateNotification?(i="topInfo",kao("rss_play",function(){sohuHD.wemedia.RssBtn.init("#"+i+" .btn-grey",{stateMap:{unsubed:{t:"\u8ffd\u5267\u63d0\u9192",c:""},subed:{t:"\u6b63\u5728\u8ffd",c:"havesubscribe"},cancel:{t:"\u53d6\u6d88\u8ffd\u5267",c:"cancelsubscribe"}}})})):$(".vBox-warn").remove();kao("share"),$(".sharebtn").click(function(i){var e=$(this).attr("data-rel");if("weixin"==e)!function(){sohuHD.closeWin();var i=window.weixinBox;i||(i=window.weixinBox=new sohuHD.showWin({htmlStr:["",'<div id="wBox_weixin" class="wBox wBox_weixin">','<div class="wBox-wrap f-yahei">','<div class="wBox-tit cfix"><span class="l">\u626b\u7801\u5206\u4eab\u81f3\u5fae\u4fe1</span><a class="close ico-close r" href="#"></a></div>','<div class="wBox-con cfix">','<div class="erwm">','<div class="wei_bd">','<div id="weixinQrcode"><img src="//my.tv.sohu.com/user/a/wvideo/getQRCode.do?text='+encodeURIComponent(location.href)+'&width=200&height=200&picType=2" width="178" height="178"/> </div>',"</div>",'<p class="fs16 c-black">',document.title,"</p>","</div>","</div>","</div>","</div>"].join(""),noMask:!0,autohide:!1})).initWin(),i.show();var e=sohuHD.user.passport,a=["//220.181.61.231/get.gif?type=forward&vid=",window.vid||"","&passport=",e,"&suv=",sohuHD.cookie("SUV"),"&fuid=",sohuHD.cookie("fuid"),"&x=weixin&url=",encodeURIComponent(location.href),"&_=",(new Date).getTime()].join("");sohuHD.pingback(a)}();else if("mqq2"==e){var a=window.location.href;/http(s|):\/\/tv.sohu.com\/.*\/.*(?=\/)/.test(a)&&(a=a.match(/http(s|):\/\/tv.sohu.com\/.*\/.*(?=\/)/)[0]),jump("mqq2","",a,document.title)}else jump(e,"",location.href,document.title)}),$("#infolist,#topInfo,#infolistcons").on("click",".zhankai",function(i){$(this).parents(".J-halfintro").hide(),$(this).parents(".J-halfintro").prev(".J-fullintro").show(),$(".header .info .row3").css("height","auto"),i.preventDefault()}).on("click",".shouqi",function(i){$(this).parents(".J-fullintro").hide(),$(this).parents(".J-fullintro").next(".J-halfintro").show(),$(".header .info .row3").css("height","127px"),i.preventDefault()})},s=$.Deferred();messagebus.subscribe("album.loaded_video_list",function(i){s.resolve(sohuHD.baseInfo.videoList)},null,null,{cache:!0}),s.done(function(i){$("#topInfo").html(sohuHD.render("topInfo",{topInfo:sohuHD.baseInfo.videoList}))}).done(function(i){e(),kao("count",function(){sohuHD.count.getCountBy($("#topInfo"),"topInfo")})}).done(function(i){a()})},null,null,{cache:!0});var _pianhuainfo={pianhua2:[],pianhua3:[],pianhua4:[],pianhua5:[],pianhua6:[],pianhua37:[],type:""};function __get_videolist1000(i){for(var e=[],a=i.videos,s=$(".serti-on").index(),t=50*$(".serti-on").index()+1,l=i.isShowTitle,n=0;n<a.length;n++){a[n].order;var o=a[n].pageUrl;a[n].name;1==l?e.push("<li>",'<em class="num"><%=prevideo.order%></em>','<a href="<%=prevideo.pageUrl%>" target="_blank" class="fs14 s-tit"><%=prevideo.name%></a>','<i class="xin"></i>',"</li>"):e.push('<li class="sera2"><a href="'+o+'" class="sera" target="_blank">'+t+++'<em class="seri-on-red"></em></a></li>')}$(".tebbcon").eq(s).html(e.join(""))}messagebus.subscribe("album.comic.main",function(){var e,a=function(){$(".tabCu .tabCi").click(function(i){$(".tabCu .tabCi").removeClass("tabCi-on"),$(this).addClass("tabCi-on"),$(".tabConts").hide();var e=$(this).attr("data-tab");"allinfo"==e?($("#allinfo").show(),$("#jingxuan").show(),$("#comment").show()):$("#"+e).show(),_pianhuainfo.type="",i.preventDefault()}),$(".tabCu .tabCi").eq(0).click(),$("#jingxuan .ico-tabs").click(function(i){var e=$(this).attr("data-box");$("#jingxuan .con").hide(),$("#"+e).show(),"txtlists"==e?($(".ico-view").removeClass("ico-view-on"),$(this).addClass("ico-list-on")):($(".ico-list").removeClass("ico-list-on"),$(this).addClass("ico-view-on"))}),$("#jingxuan .ico-tabs").eq(0).click();var e=function(i){i.find(".pud").show();var e=i.find(".pud .pi");e.removeClass("pi-on");var a=e.length;e.eq(a-1).addClass("pi-on")},a=function(i,e,a){var s=parseInt(e.attr("data-page")),t=i.find(".pud .pi").length;1==s?(i.find(".page-pre").attr("data-page",1),i.find(".page-next").attr("data-page",s+1)):s==t?(i.find(".page-pre").attr("data-page",s-1),i.find(".page-next").attr("data-page",t)):(i.find(".page-pre").attr("data-page",s-1),i.find(".page-next").attr("data-page",s+1)),_pianhuainfo.type?(a.hide(),$('.pianhuapage[data-type="'+_pianhuainfo.type+'"]').eq(s-1).show()):a.hide().eq(s-1).show(),i.find(".pud .pi").removeClass("pi-on"),e.addClass("pi-on"),i.find(".pond .pon").html(s),i.find(".pud").hide()},s=function(i,e){var a=parseInt(e.attr("data-page")),s=i.find(".pud .pi").length;i.find(".pud .pi").eq(s-a).click()};$("#pianhua").on("click",".pond",function(i){e($("#pianhua")),i.preventDefault()}),$("#pianhua").on("click",".pud .pi",function(i){a($("#pianhua"),$(this),$(".pianhuapage")),i.preventDefault()}),$("#pianhua").on("click",".page-pre",function(i){s($("#pianhua"),$(this)),i.preventDefault()}),$("#pianhua").on("click",".page-next",function(i){s($("#pianhua"),$(this)),i.preventDefault()}),$("#fenjiinfo").on("click",".page-pre",function(i){s($("#fenjiinfo"),$(this)),i.preventDefault()}),$("#fenjiinfo").on("click",".page-next",function(i){s($("#fenjiinfo"),$(this)),i.preventDefault()}),$("#fenjiinfo").on("click",".pond",function(i){e($("#fenjiinfo")),i.preventDefault()}),$("#fenjiinfo").on("click",".pud .pi",function(i){a($("#fenjiinfo"),$(this),$("#fenjiinfo .infopage")),i.preventDefault()}),""==$.trim($("#jingxuan .con").html())&&($("#jingxuan").remove(),$('.tabCi[data-tab="jingxuan"]').remove()),$(".tit .more").click(function(i){var e=$(this).attr("data-tab");if($('.tabCi[data-tab="'+e+'"]').click(),$(document).scrollTop($(".main")[0].offsetTop-45),"pianhua"==e){var a=$(this).parents(".pianhua").find("ul.pianhualisttab .serti-on2").data("type");$('#pianhua ul.pianhualisttab li[data-type="'+a+'"]').click()}i.preventDefault()})};messagebus.subscribe("album.loaded_video_list",function(){var i=$.Deferred();i.resolve(sohuHD.baseInfo.videoList),sohuHD.baseInfo.videoList.videos.length<1?($(".fenjiinfo").remove(),$('.tabCi[data-tab="fenjiinfo"]').remove(),$("#allinfo .mod_line:eq(0)").hide(),$("#allinfo .mod_line:eq(1)").hide(),$("#vlistbox").html(sohuHD.render("novideolist",{videolist:sohuHD.baseInfo.videoList})),a()):i.done(function(i){sohuHD.baseInfo.videoList.videos.length<1?($(".fenjiinfo").remove(),$('.tabCi[data-tab="fenjiinfo"]').remove(),$("#vlistbox").html(sohuHD.render("novideolist",{videolist:sohuHD.baseInfo.videoList}))):e=sohuHD.baseInfo.videoList.updateSet>=sohuHD.baseInfo.videoList.totalSet?($("#vlistbox").html(sohuHD.render("videolisttotal",{videolist:sohuHD.baseInfo.videoList,isVip:isVip})),0):($("#vlistbox").html(sohuHD.render("videolist",{videolist:sohuHD.baseInfo.videoList,isVip:isVip})),$(".serti").length-1),$(".forall").click(function(i){$("#vlistbox .dl").hide(),$("#vlistbox .df").show(),i.preventDefault()}),sohuHD.passport.getPassport()?messagebus.subscribe("core.login.userinfo",function(i,e){2==e.feetype?(isVip=!0,preVideoRule=2):(isVip=!1,preVideoRule=1)},null,null,{cache:!0}):preVideoRule=1,sohuHD.switchTab($("#vlistbox .series-tab .serti"),{event:"click",cssName:"serti-on",boxs:$("#vlistbox .tebbcon"),start:e,callback:function(i){$(i).index()}})}).done(function(i){!function(){if(sohuHD.baseInfo.videoList.updateSet>=sohuHD.baseInfo.videoList.totalSet)$("#infolist").html(sohuHD.render("infolist",{videolist:sohuHD.baseInfo.videoList.videos,lines:3,isVip:isVip})),$("#infolistcons").html(sohuHD.render("infolist",{videolist:sohuHD.baseInfo.videoList.videos,lines:null,isVip:isVip}));else{if(0==isVip){var a=[];$.each(sohuHD.baseInfo.videoList.videos,function(i,e){0===e.tvIsFee&&a.push(e)})}var i=a||sohuHD.baseInfo.videoList.videos;"1"==i[0].order&&i.reverse(),$("#infolist").html(sohuHD.render("infolist",{videolist:i,lines:3,isVip:isVip})),$("#infolistcons").html(sohuHD.render("infolist",{videolist:i,lines:null,isVip:isVip}))}var e=$("#infolistcons").find("div.debox").length;if(e){$("#infopages").html(sohuHD.render("pianhuapages",{videolist:e,pagenum:5}));var s=$("#fenjiinfo .pud .pi").length;setTimeout(function(){$("#fenjiinfo .pud .pi").eq(s-1).click()},0)}else $(".fenjiinfo").hide(),$('.tabCi[data-tab="fenjiinfo"]').hide()}()}).done(function(i){a()})},null,null,{cache:!0}),messagebus.subscribe("album.loaded_pianhua_list",function(){var i=$.Deferred();i.resolve(sohuHD.baseInfo.pianhuaList),i.done(function(){!function(){if(sohuHD.baseInfo.pianhuaList.size<1)return $(".pianhua").remove(),$('.tabCi[data-tab="pianhua"]').remove();!sohuHD.baseInfo.videoList.defaultPageUrl&&0<sohuHD.baseInfo.pianhuaList.size&&$("#topInfo .btn-see,.J-video-cover").attr("href",sohuHD.baseInfo.pianhuaList.videos[0].pageUrl),$.each(sohuHD.baseInfo.pianhuaList.videos,function(i,e){_pianhuainfo["pianhua"+e.tvSType].push(e)});var i='<ul class="series-tab2 cf pianhualisttab"><li class="serti2 serti-on2" data-type="allpianhua">\u5168\u90e8</li>',e=sohuHD.render("pianhualist",{videolist:sohuHD.baseInfo.pianhuaList.videos,lines:2,datatype:"allpianhua"}),a=sohuHD.render("pianhualist",{videolist:sohuHD.baseInfo.pianhuaList.videos,lines:null,datatype:"allpianhua"});0<_pianhuainfo.pianhua2.length&&(i+='<li class="serti2" data-type="pianhua2">\u9884\u544a</li>',e+=sohuHD.render("pianhualist",{videolist:_pianhuainfo.pianhua2,lines:2,datatype:"pianhua2"}),a+=sohuHD.render("pianhualist",{videolist:_pianhuainfo.pianhua2,lines:null,datatype:"pianhua2"})),0<_pianhuainfo.pianhua3.length&&(i+='<li class="serti2" data-type="pianhua3">\u5e55\u540e\u82b1\u7d6e</li>',e+=sohuHD.render("pianhualist",{videolist:_pianhuainfo.pianhua3,lines:2,datatype:"pianhua3"}),a+=sohuHD.render("pianhualist",{videolist:_pianhuainfo.pianhua3,lines:null,datatype:"pianhua3"})),0<_pianhuainfo.pianhua4.length&&(i+='<li class="serti2" data-type="pianhua4">\u5236\u4f5c\u7279\u8f91</li>',e+=sohuHD.render("pianhualist",{videolist:_pianhuainfo.pianhua4,lines:2,datatype:"pianhua4"}),a+=sohuHD.render("pianhualist",{videolist:_pianhuainfo.pianhua4,lines:null,datatype:"pianhua4"})),0<_pianhuainfo.pianhua5.length&&(i+='<li class="serti2" data-type="pianhua5">\u7cbe\u5f69\u7247\u82b1</li>',e+=sohuHD.render("pianhualist",{videolist:_pianhuainfo.pianhua5,lines:2,datatype:"pianhua5"}),a+=sohuHD.render("pianhualist",{videolist:_pianhuainfo.pianhua5,lines:null,datatype:"pianhua5"})),0<_pianhuainfo.pianhua6.length&&(i+='<li class="serti2" data-type="pianhua6">\u5176\u4ed6\u5468\u8fb9</li>',e+=sohuHD.render("pianhualist",{videolist:_pianhuainfo.pianhua6,lines:2,datatype:"pianhua6"}),a+=sohuHD.render("pianhualist",{videolist:_pianhuainfo.pianhua6,lines:null,datatype:"pianhua6"})),0<_pianhuainfo.pianhua37.length&&(i+='<li class="serti2" data-type="pianhua37">MV</li>',e+=sohuHD.render("pianhualist",{videolist:_pianhuainfo.pianhua37,lines:2,datatype:"pianhua37"}),a+=sohuHD.render("pianhualist",{videolist:_pianhuainfo.pianhua37,lines:null,datatype:"pianhua37"})),i+="</ul>",$("#pianhualist,#pianhualistcons").before(i),$("#pianhualist").html(e),$("#pianhualistcons").html(a),$("#pianhuapages").html(sohuHD.render("pianhuapages",{videolist:sohuHD.baseInfo.pianhuaList.videos,pagenum:20}));var s=$("#pianhua .pud .pi").length;setTimeout(function(){$("#pianhua .pud .pi").eq(s-1).click()},0)}()})},null,null,{cache:!0}),messagebus.subscribe("album.loaded_series_list",function(){var i=$.Deferred();i.resolve(sohuHD.baseInfo.seriesList),i.done(function(){!function(){sohuHD.render("serieslist",{serieslist:sohuHD.baseInfo.seriesList,lines:2});if(sohuHD.baseInfo.seriesList.length<1)return $(".seriesinfo").remove(),$('.tabCi[data-tab="seriesinfo"]').remove();$("#serieslist").html(sohuHD.render("serieslist",{serieslist:sohuHD.baseInfo.seriesList,lines:2})),$("#serieslistcons").html(sohuHD.render("serieslist",{serieslist:sohuHD.baseInfo.seriesList,lines:null}))}()})},null,null,{cache:!0})},null,null,{cache:!0});var onRankLoaded=function(i){var e=_nameOld="",a="",s=i.videos,t=[];t=['<ul class="ranku cf rankuL">'];for(var l=0;l<5;l++)_nameOld=s[l].tv_name,e=sohuHD.strSub(_nameOld,10,!0,"..."),a=s[l].tv_url||s[l].videoUrl,t.push('<li class="ranki rk',l,'">','<a class="ranka" href="',a,'" target="_blank" title="',_nameOld,'">','<span class="sing elli">',e,"</span>",'<span class="singer elli c-grey"></span>',"</a>","</li>");t.push("</ul>"),t.push('<ul class="ranku cf rankuR">');for(l=5;l<s.length;l++)_nameOld=s[l].tv_name,e=sohuHD.strSub(_nameOld,10,!0,"..."),a=s[l].tv_url||s[l].videoUrl,t.push('<li class="ranki rk',l,'">','<a class="ranka" href="',a,'" target="_blank" title="',_nameOld,'">','<span class="sing elli">',e,"</span>",'<span class="singer elli c-grey"></span>',"</a>","</li>");t.push("</ul>"),$("#tvrank").html(t.join(""))};messagebus.subscribe("album.comic.side",function(){var e=function(){$("#likelist").html(sohuHD.render("likes",{likelist:sohuHD.baseInfo.likesMap}))};messagebus.subscribe("album.loaded_like_list",function(){var i=$.Deferred();i.resolve(sohuHD.baseInfo.videoList),i.done(function(i){e()})},null,null,{cache:!0}),messagebus.subscribe("album.loaded_actor_list",function(){var i=$.Deferred();i.resolve(sohuHD.baseInfo.videoList),i.done(function(i){e()})},null,null,{cache:!0}),sohuHD.getScript("//tv.sohu.com/frag/vrs_inc/phb_tv_dhp_all_day_10_simple.js");if($("#allinfo").on("click","ul.pianhualisttab li",function(){var i=$(this).data("type");$("#allinfo ul.pianhualisttab li").removeClass("serti-on2"),$(this).addClass("serti-on2"),$("#pianhualist ul").hide(),$("#pianhualist").find('ul[data-type="'+i+'"]').show()}),$("#pianhua").on("click","ul.pianhualisttab li",function(){var i=$(this).data("type");$("#pianhua ul.pianhualisttab li").removeClass("serti-on2"),$(this).addClass("serti-on2"),$("#pianhualistcons ul").hide(),$("#pianhualistcons").find('ul[data-type="'+i+'"]').show(),_pianhuainfo.type=i;var e=_pianhuainfo[i];"allpianhua"==i&&(e=sohuHD.baseInfo.pianhuaList.videos),$("#pianhuapages").html(sohuHD.render("pianhuapages",{videolist:e,pagenum:20}));var a=$("#pianhua .pud .pi").length;setTimeout(function(){$("#pianhua .pud .pi").eq(a-1).click()},0)}),0<$("#sFormA").length){$("#sKeyA").val();$("#sFormA").submit(function(){return sohuHD.redirect("//so.tv.sohu.com/mts?wd="+escape($.trim($("#sKeyA").val())),"_blank"),!1}),sohuHD.focusClear($("#sKeyA")[0])}},null,null,{cache:!0});