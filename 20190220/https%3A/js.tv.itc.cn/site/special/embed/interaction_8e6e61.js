/* sohutv 2018-07-02 15:06:41 */
!function(i){i.formatCount2=function(i,t){t=t||",",i=String(i);for(var a=/(\d+)(\d{3})/;a.test(i);)i=i.replace(a,"$1,$2");return i}}(sohuHD),messagebus.subscribe("player.interaction",function(i,t){var a=window.playlistId;if(_e(t.voteId),t.voteId){var s=t.voteId.split(";");if(!(s.length<=0)){var e=function(){var i=s[e.next%s.length];return e.next+=1,i};e.next=0;var n=e(),o=function(){return{retest:"fun_shuzhou_"+n+"_fh",share:"fun_shuzhou_"+n+"_fx",prize:"fun_shuzhou_"+n+"_ckjp",detail:"fun_shuzhou_"+n+"_ckxq",activity:"fun_shuzhou_"+n+"_gd"}};messagebus.publish("statV2.ping",{type:"impress",txid:"pg_player_game",other:n});var r,l,d,i,c={pk:['<div pb-click-a="mc" data-pb-txid="pg_player_gameplay" data-pb-other="pk|<%=id %>">','<div class="pk-v2-tit cfix"><%=theme%></div>',"<% if(options.length == 2) { ","  var pos = options[0],neg = options[1]; %>",'<div class="pk-v2a">','    <div class="rel cfix">','        <span class="pk-v2a-ico ib abs"></span>','        <div class="pk-v2a-box l">','            <div class="pic ra50" style="width:100px;height:100px;margin: 0 auto;overflow:hidden;"><img src="<%=pos.img%>" width="100"></div>',"            <p><%=pos.title%></p>",'            <a data-val="<%=pos.id%>" href="#" data-ping="<%=pingback%>" class="pk-v2-btn1 j-vote ping">\u652f\u6301TA</a>',"        </div>",'        <div class="pk-v2a-box r">','            <div class="pic ra50" style="width:100px;height:100px;margin: 0 auto;overflow:hidden;"><img src="<%=neg.img%>" width="100"></div>',"            <p><%=neg.title%></p>",'            <a data-val="<%=neg.id%>" href="#" data-ping="<%=pingback%>" class="pk-v2-btn2 j-vote ping">\u652f\u6301TA</a>',"        </div>","    </div>","</div>","<% } else { %>",'<div class="pk-v2c">','    <div class="cfix tac">',"        <%if(sharingText) {%>",'        <img src="<%=sharingText %>" width="100%">',"        <%} else {%>",'        <span class="pk-v2c-ico ib"></span>',"        <%}%>","    </div>",'    <ul class="list-pk">',"        <% $.each(options, function(index, item){ %>",'        <li class="ci cfix"><div class="ra50 l" style="width:40px;height:40px;margin-right:10px;overflow:hidden;"><img width="40" src="<%=item.img %>"></div><span class="l c-white"><%=item.title %></span><a data-val="<%=item.id%>" href="#" data-ping="<%=pingback%>" class="pk-v2-btn1 r j-vote ping">\u652f\u6301TA</a></li>',"        <% }); %>","    </ul>","</div>","<% } %>",'<div class="tac fs14 pksnr">','    <span class="va-m ib">\u5df2\u6709</span>','    <em class="pksn"><i class="pksnin"><%for(var i=0;i<votePeoples.length;i++){%><span class="pks_num"><%=votePeoples[i]%></span><%}%></i></em>','    <span class="va-m ib">\u4eba\u53c2\u4e0e</span>',"</div>","</div>"].join(""),normal:['<div class="soldier-topics" pb-click-a="mc" data-pb-txid="pg_player_gameplay" data-pb-other="<%=id %>">','<div class="pk-v2-tit cfix"><span class="l"><%=theme%></span></div>',"<% var opt = options[optionsIndex];",'var submitPing = "";','if((optionsIndex + 1) == options.length) { submitPing =\'pb-click="mc" data-pb-txid="pg_player_gameplay" data-pb-other="submit"\' }%>','<div class="test-v2a">','    <h6><span class="ib va-m fs14"><span class="ico-num va-m"><%=optionsIndex+1 %></span><%=opt.content %></span></h6>','    <div class="tListDiv">','        <ul class="tList cfix">',"        <%for(var i = 0, l = opt.childList.length; i<l; i++){ ",'            var content = opt.childList[i].content.split("__"); ',"            var classOn = (answersMap[i]==user_answer[optionsIndex] ? 'on' : ''); %>",'            <li class="ti <%=classOn %>" data-val="<%=answersMap[i] %>" <%=submitPing %> >','                <%if(content[1]){%><span class="ib va-m ti-imgWrap"><img src="<%=content[1] %>" class="ra50 va-m ti-img"></span>','                <%}else{%><span class="ib va-m ti-imgWrap" style="height:auto;"><%=answersMap[i].toUpperCase() %>.</span><%}%>','                <span class="ib va-m ti-txt"><%=content[0] %></span></span>',"            </li>","        <%}%>","        </ul>","    </div>","</div>",'<%if(optionsIndex > 0){%><div style="margin:35px 0 0;"><a href="javascript:;" class="fs14 hudong-v2-return" style="position:static;margin-left:30px;" data-pb-other="back"><span class="fs18">&lt;</span>\u8fd4\u56de\u4e0a\u9898</a></div><%}%>',"</div>"].join(""),prize:['<div class="unpkFold">','<span class="pkbtn ping" data-ping="<%=prize%>">\u67e5\u770b\u5956\u54c1</span>','<div class="mB10 c-white cfix">','<div class="pkblist">',"<%for(var i=0;i<list.length;i++){%>",'<span class="pbd"><img width="60" height="60" src="<%=list[i].title%>">',"<%if(list[i].vid){%>",'<span class="pkbg"></span><span class="pktx">\u6570\u91cf\uff1a<%=list[i].vid%></span>',"<%}%>","</span>","<%}%>","</div>","</div>",'<ul class="cfix">','<li class="pki pki1">1.\u53c2\u4e0e\u4e92\u52a8</li>','<li class="pki pki2">2.\u8f6c\u53d1\u5206\u4eab</li>','<li class="pki pki3">3.\u62bd\u5956</li>',"</ul>","</div>"].join("")},p={pk:['<div pb-click-a="mc">',,'<div class="pk-v2-tit cfix">','    <span class="l">\u60a8\u652f\u6301\u4e86<%=answer%></span>',"    <a class=\"pk-v2-btn3 <%=islast ? 'pk-v2-btn3b' : 'pk-v2-btn3a' %> r ping\" href=\"#\" id=\"reinteract\" data-ping=\"<%=retest%>\" data-pb-txid=\"pg_player_gameplay\" data-pb-other=\"<%=islast ? 'playagain' : 'playgoon' %>|<%=id%>\"><%=islast ? '\u91cd\u65b0\u73a9' : '\u63a5\u7740\u73a9' %></a>","</div>","<% if(options.length == 2) { ","   var pos = options[0],neg = options[1]; ","   var percent_1 = Math.round(pos.num/votePeople * 100);","   var percent_2 = 100 - percent_1;","%>",'<div class="pk-v2b">','    <div class="pk_bar">','        <div class="row1 cfix">','                <i class="pk"></i>','                <div class="rl l">','                    <div class="pic ra50"><img width="100%" src="<%=pos.answer_data.img%>"></div>','                    <div class="txt tac"><%=pos.answer_data.title%></div>',"                </div>",'                <div class="rr r abs" style="right:0;">','                    <div class="pic ra50"><img width="100%" src="<%=neg.answer_data.img%>"></div>','                    <div class="txt tac"><%=neg.answer_data.title%></div>',"                </div>","            </div>",'        <div class="row2 cfix">','            <em style="width:<%=percent_1 %>%;" class="rl l"></em>','            <em style="width:<%=percent_2 %>%" class="rr r"></em>',"        </div>",'        <div class="row3 cfix">',"            <em class=\"rl l\"><%=pos.num < 100000000 ? pos.num : '99999999+'%></em>","            <em class=\"rr r\"><%=neg.num < 100000000 ? neg.num : '99999999+'%></em>","        </div>","    </div>","</div>","<% } else { %>",'<div class="pk-v2d">','    <ul class="list-pk">',"      <% ","      options.sort(function(item1, item2){","          return item2.num - item1.num;","      });","      $.each(options, function(index, item){ ","          var diClass = 'di-'+ (index + 1); ","          var numHtml = index > 2 ? '' : ('<span class=\"num num-'+(index + 1)+'\"></span>'); ","          var num1 = options[0].num; ","          var percent = index == 0 ? 90 : Math.round(item.num / num1 * 90); ","      %>",'      <li class="di cfix <%=diClass %>">',"          <%=numHtml %>",'          <div class="ra50 l img" style="width:40px;height:40px;overflow:hidden;"><img width="40" src="<%=item.answer_data.img %>"></div>','          <div class="pk-result rel l">','              <span class="pk-v2d-name"><%=item.title %></span>',"              <span class=\"pk-v2d-total\"><%=item.num < 100000000 ? item.num : '99999999+' %>\u7968</span>",'              <span class="pk-result-red ib" style="width:<%=percent %>%"></span>',"          </div>","      </li>","      <% }); %>","  </ul>","</div>","<% } %>",,"</div>",'<div pb-click-a="mc" data-pb-txid="pg_player_gameshare" style="padding-bottom:40px;text-align:center;">','    <span class="fs14">\u5206\u4eab\u7ed9\u597d\u53cb\uff1a</span>','    <a href="javascript:void(0)" class="share-weixin rel j-share" title="\u5fae\u4fe1" data-id="weixin" data-pb-other="weixin|<%=id%>">',"    </a>",'    <a href="javascript:void(0)" class="share-zone j-share ping" title="QQ\u7a7a\u95f4" data-id="qq2" data-ping="<%=share%>" data-pb-other="qqzone|<%=id%>"></a>','    <a href="javascript:void(0)" class="share-qq j-share ping" title="QQ" data-id="mqq" data-ping="<%=share%>" data-pb-other="qqfriend|<%=id%>"></a>','    <a href="javascript:void(0)" class="share-sina j-share ping" title="\u65b0\u6d6a\u5fae\u535a" data-id="weibosina" data-ping="<%=share%>" data-pb-other="weibo|<%=id%>"></a>',"</div>"].join(""),normal:['<div pb-click-a="mc">','<div class="pk-v2-tit cfix">','  <span class="l"><%=description%></span>',"  <% var btnClass = (islast ? 'pk-v2-btn3b' : 'pk-v2-btn3a'),","         btnPbOther = (islast ? 'playagain' : 'playgoon'),","         btnTxt = (islast ? '\u91cd\u65b0\u73a9' : '\u63a5\u7740\u73a9'); %>",'  <a href="#" class="pk-v2-btn3 <%=btnClass %> r ping" id="reinteract" data-ping="<%=retest%>" data-pb-txid="pg_player_gameplay" data-pb-other="<%=btnPbOther %>|<%=id%>"><%=btnTxt %></a>',"</div>",'<div class="test-v2b tac">','  <%if(cover){%><div class="test-v2b-photo"><img src="<%=cover%>" width="140" height="140" class="ra50"></div><%}%>','  <strong class="fs20 test-result"><%=title%></strong>','  <p class="test-result-info"><%=subtitle%></p>',"</div>",'<div pb-click-a="mc" data-pb-txid="pg_player_gameshare" style="margin-top:40px;text-align:center;">','    <span class="fs14">\u5206\u4eab\u7ed9\u597d\u53cb\uff1a</span>','    <a href="javascript:void(0)" class="share-weixin rel j-share" title="\u5fae\u4fe1" data-id="weixin" data-pb-other="weixin|<%=id%>">',"    </a>",'    <a href="javascript:void(0)" class="share-zone j-share ping" title="QQ\u7a7a\u95f4" data-id="qq2" data-ping="<%=share%>" data-pb-other="qqzone|<%=id%>"></a>','    <a href="javascript:void(0)" class="share-qq j-share ping" title="QQ" data-id="mqq" data-ping="<%=share%>" data-pb-other="qqfriend|<%=id%>"></a>','    <a href="javascript:void(0)" class="share-sina j-share ping" title="\u65b0\u6d6a\u5fae\u535a" data-id="weibosina" data-ping="<%=share%>" data-pb-other="weibo|<%=id%>"></a>',"</div>","</div>"].join("")},h={},v={pk_html:null,answer:null,is_auto_forward:!0,menu_instance:null,ispk:null,check:function(){function i(i){var s;if(i)if("init"==i)s=t+"|"+a+":"+e+":1";else{var o;"seconds"==i?(o=new RegExp(a+":\\d{13}:\\d(\\|?)"),s=t.replace(o,function(i,t){return a+":"+e+":1"+t})):"times"==i&&(o=new RegExp(a+":\\d{13}:(\\d)(\\|?)"),s=t.replace(o,function(i,t,s){return t=parseInt(t,10)+1,a+":"+e+":"+t+s}))}else s=a+":"+e+":1";sohuHD.cookie("interaction",s,n)}var t=sohuHD.cookie("interaction"),s=!1,e=(new Date).getTime(),n={expires:1,path:"/",domain:"tv.sohu.com"};if(t){for(var o=t.split("|"),r=null,l=0,d=o.length;l<d;l++)if(r=o[l].split(":"),r[0]==a){e-r[1]>864e5?(s=!0,i("seconds")):r[2]<3&&(s=!0,i("times"));break}l==d&&(s=!0,i("init"))}else s=!0,i();return s},start:function(t){var a=this;$.getJSON("//score.my.tv.sohu.com/vote/vote.do?encode=gbk&callback=?",{voteId:n}).done(function(s){if("200"!=s.status)return void _e("\u4e92\u52a8\u63a5\u53e3\u8fd4\u56de\u5f02\u5e38,\u76f4\u63a5\u9000\u51fa");if(i=s.voteVo,0===i.options.length)return _e("\u4e92\u52a8\u6a21\u5757\u5185\u5bb9\u4e3a\u7a7a "),n=e(),void a.restart();if(i.votePeoples=(i.votePeople+"").split(""),2==i.type)a.ispk=!0,i.pingback="fun_shuzhou_"+n+"_pk",r=sohuHD.tmpl(c.pk,i),d=p.pk;else{a.ispk=!1;var v=!1;if($.each(i.options,function(i,t){if(0==t.childList.length)return v=!0,!1}),v)return void _e("\u4e92\u52a8\u6a21\u5757\u7b54\u9898\u9009\u9879\u4e22\u5931\u6570\u636e");i.pingback="fun_shuzhou_"+n+"_nv",i.optionsIndex=0,i.answersMap="abcdefghijklmn".split(""),i.user_answer=[],r=sohuHD.tmpl(c.normal,i),d=p.normal}i.videoList&&i.videoList.length>0?(h.list=i.videoList,h.url=i.description.split("__"),$.extend(h,o()),l=sohuHD.tmpl(c.prize,h)):l="",t()})},startNextQuestion:function(){var t=this;r=sohuHD.tmpl(c.normal,i),t.container.html(r)},restart:function(){var i=this;i.start(function(){i.container.html(r),i.answer=null,i.container.css("height",$(".tab_cont").height()),i.ispk?i.container.removeClass("test-v2"):i.container.addClass("test-v2"),$("#sohuplayer").height()>480&&$(".unpkFold .pkbtn").trigger("click")})},init:function(){var i=this,t=$("#menu");if(!t.length)return _e("menu render \u672a\u5b8c\u6bd5."),setTimeout(function(){v.init()},100),!1;if(this.menu_instance=sohuHD.UI.getInstance(t.attr("ui-guid")),!this.menu_instance)return void _e("\u83b7\u53d6 menu \u5b9e\u4f8b\u51fa\u9519");var a="9076230"==window.playlistId?"\u6295\u7968":"\u4e92\u52a8";t.find(".tab_cont:last").after('<div class="tab_cont rel" data-tab="album-box-pkinteract"><div class="pk-v2 scroll-bar"></div></div>').end().find(".tab_menu ul").append('<li data-tab="album-tab-pkinteract" pb-click data-pb-txid="pg_player_gametab" data-pb-other="tab|'+n+'"><span>'+a+"</span></li>");var s=["<style>",'.hudTab{font-family:"Microsoft Yahei";background:url(//css.tv.itc.cn/channel/play_v1_img/hd_fox.png) no-repeat center 10px;padding:80px 30px 0;line-height:25px;color:#a4a4a4}',".hudTab h6{font-size:14px;font-weight:normal;color:#fff;background:url(//css.tv.itc.cn/channel/play_v1_img/hd_point.png) no-repeat 0 25px;padding:15px 0 0 10px;}",".hudTab .mL10{margin-left:10px;}",".hudTab .btn_hd{background:#e03835;display:inline-block;width:170px;height:45px;line-height:45px;text-align:center;font-size:18px;color:#fff;}",".hudTab .btn_hd:hover{color:#e2a7a6;background-color:#bc3633;}",".hudTab .join_total{background:#191919;display:inline-block;width:170px;height:30px;line-height:30px;text-align:center;}",".hudTab .row{margin:30px 0 0;}",".hudTab_jyly {background-image: url(//css.tv.itc.cn/channel/play_v1_img/hd_fox_jyly.png)}","</style>"].join("");$("head").append(s),this.container=t.find(".tab_cont:last .scroll-bar"),this.box=t.find(".tab_cont:last"),this.container.html(r),this.box.append(l),i.container.css("height",$(".tab_cont").height()),i.ispk?i.container.removeClass("test-v2"):i.container.addClass("test-v2"),this.bind(),this.ping(),$("#sohuplayer").height()>480&&$(".unpkFold .pkbtn").trigger("click"),i.menu_instance.on("active.pkinteract",function(){if(i.clean_auto_forward(),!i.is_actived){i.is_actived=!0;try{sohuHD.play.adjust()}catch(t){}}}),messagebus.publish("play.loaded_pkinteraction"),this.check()&&messagebus.subscribe("play.onVideoPlayed",function(t,a){var s=function(){i.is_actived||(i.menu_instance.active("pkinteract"),messagebus.publish("statV2.ping",{type:"click",txid:"pg_player_gametab",other:"auto|"+n}),i.auto_forward())};setTimeout(s,15e3)},null,null,{cache:!0})},ping:function(){this.box.on("click",".ping",function(i){var t=$(this).data("ping");if(t){var a=sohuHD.cookie("fuid");sohuHD.pingback("//click.hd.sohu.com.cn/s.gif?_="+(new Date).getTime()+"&type="+t+"&uid="+a)}})},clean_auto_forward:function(){this.timer&&(clearTimeout(this.timer),this.timer=null)},auto_forward:function(){if(this.timer&&clearTimeout(this.timer),!this.is_auto_forward)return void this.container.off("click.soldier");var i=this;this.timer=setTimeout(function(){var t=sohuHD.play&&sohuHD.play.firstTabName;i.menu_instance.active(t||(sohuHD.play.isPianhua?"circum":"vlist"))},3e4)},bind:function(){var t=this;this.container.on("click.soldier",function(i){i.preventDefault(),t.clean_auto_forward()}),this.box.on("click",".j-soldier-retest",function(i){i.preventDefault(),t.reset()}).on("click",".j-share",function(a){a.preventDefault();var s=$(this).attr("data-id");if(s){if("weixin"==s)return void kao("forward_v2",function(){!function(){var i="";window.cateCode?i=window.cateCode:window._videoInfo&&window._videoInfo.cateCode&&(i=window._videoInfo.cateCode)}();sohuHD.Forward.jumpWeixin({link:location.href})});var e=i.shareToWeiboText;t.ispk?e=e.replace("__xxx__",t.answer.title):e.indexOf("__xxx__")>=0&&(e=e.replace("__xxx__",t.answer.title)),kao("share",function(){jump(s,undefined,location.href,e)})}}).on("click",".test-v2a .tList li",function(a){i.user_answer[i.optionsIndex]=$(this).attr("data-val"),i.optionsIndex+1==i.options.length?t.render({val:i.user_answer.join("")}):(i.optionsIndex++,t.startNextQuestion())}).on("click",".soldier-topics .hudong-v2-return",function(a){i.optionsIndex--,t.startNextQuestion()}),this.box.on("click",".j-vote",function(a){if(a.preventDefault(),!t.answer){var s=$(this),e=s.attr("data-val");e&&$.getJSON("//score.my.tv.sohu.com/vote/voteOption.do?encode=gbk&callback=?",{voteId:n,optionIds:e,uid:0},function(a){i=a.voteVo;for(var n=0,o=Math.min(i.answerList.length,i.options.length);n<o;n++)i.options[n].answer_data=i.answerList[n],e==i.options[n].id&&(t.answer=i.options[n]);t.container.find(".j-vote").addClass("fbtn_voted"),s.text("\u5df2\u6295\u7968"),t.pk_html=t.box.html(),t.render({val:e})})}}),this.box.on("click",".j-submit-btn",function(a){a.preventDefault();var s=[];t.container.find(".soldier-topics .pradio_sel").each(function(){s.push($(this).attr("data-val"))}),t.container.find(".pkVote").each(function(){$(this).find(".pradio_sel").length||$(this).hasClass("pkVote_on")||$(this).addClass("pkVote_on").append('<span class="c-red pks_close">\u8bf7\u9009\u62e9</span>')}),s.length==i.options.length&&t.render({val:s.join("")})}),this.box.on("click","#reinteract",function(){n=e(),t.restart()}),this.box.on("click",".pkFold .pkbtn",function(){$(this).parent(".pkFold").removeClass("pkFold").addClass("unpkFold")}).on("click",".unpkFold .pkbtn",function(){$(this).parent(".unpkFold").removeClass("unpkFold").addClass("pkFold")}),$("body").click(function(i){if($("[data-tab=album-tab-pkinteract]").hasClass("on")&&"album-tab-pkinteract"!=$(i.target).closest("li").attr("data-tab")){var t=$(i.target),a=$(".pkFold");!a.length||t.hasClass("pkFold")||t.parents(".pkFold").length||a.find(".pkbtn").trigger("click")}})},reset:function(){this.ispk?this.container.html('<div class="tab_cont1 voteTab">'+this.pk_html+"</div>"):this.container.html(r)},render:function(t){var a={},n=this,r=e.next%s.length==0;if(this.ispk)a={title:i.theme,description:this.answer.answer_data.content,answer:n.answer.answer_data.title,result:i.sharingText,islast:r},a.result.indexOf("__xxx__")>=0&&(a.result=a.result.replace("__xxx__",this.answer.answer_data.title)),a=$.extend(a,o(),i);else{for(var l=0,c=i.answerList.length;l<c;l++)if(t.val==i.answerList[l].title){var p=i.answerList[l].content.split("__");this.answer={title:p[0],subtitle:p[2]||"",description:p[1]||"\u606d\u559c\u60a8\uff0c\u4f60\u662f",cover:i.answerList[l].img,id:i.id,islast:r};break}if(!this.answer)return void _e("\u7528\u6237\u5f53\u524d\u7b54\u6848\u65e0\u914d\u7f6e\u7b54\u6848, \u76f4\u63a5\u8fd4\u56de");a=$.extend({},this.answer,o())}this.container.html(sohuHD.tmpl(d,a));var h=this.container.find(".qrcode");h.length>0&&sohuHD.getWeixinQrcode(sohuHD.user.uid).done(function(i){h.attr("src",i).show()})},flash:function(i){var t=(void 0)[i].vid,a=new SWFObject(vrs_player,"soldier_video_player",280,160,"9,0,115","#000000");a.addParam("allowscriptaccess","always"),a.addParam("allowfullscreen","true"),a.addParam("wmode","Opaque"),a.addVariable("skin","0"),a.addVariable("miniwindow","1"),a.addVariable("skinNum","8"),a.addVariable("sogouBtn","0"),a.addVariable("showRecommend","0"),this.answer.video_isvrs?a.addVariable("vid",t):a.addVariable("id",t),a.addVariable("isListPlay","0"),a.addVariable("playListId","1"),a.addVariable("autoplay",!1),a.addVariable("api_key","bfd3409126d34193b3f9993b8c68dfa0"),a.addVariable("onEndAdStop","sohuHD.interaction.onEndAdStop"),a.addVariable("onPlay","sohuHD.interaction.onVideoPlay"),a.write("soldier_video")}};v.onEndAdStop=function(){return!1},sohuHD.interaction=v,messagebus.subscribe("play.player_menu_inited",function(){v.start(function(){v.init()})},null,null,{cache:!0})}}},null,null,{cache:!0});