/* sohutv 2018-09-17 10:01:27 */
!function(i){i.guid=i.guid||function(){var i=1;return function(t){return(void 0!==t?t:"sohuHD")+"_"+(i++).toString(36)}}()}(sohuHD),function(i,t){var e=function(s){if(!(this instanceof e))return new e(s);this.container=null,this.guid=t.guid("forward"),this.config=i.extend({},e.config,s||{})};e.config={container:"#shareBox",title:document.title,link:location.href,cid:window.cid||0,videoinfo:window._videoInfo||{},vid:window.vid||0,playlistId:window.playlistId||0,osubcid:window.osubcid||0,cover:window.cover||"",elems:{defaulty:".s_default_wrap",detail:".s_detail_wrap",qrcoder:".qrcoder"},txid:"pg_player_forward",tpl:'<a title="<%=title%>" href="javascript:;" data-arg="<%=arg%>" data-pb-other="<%=pbother %>" class="j-share-item"><img src="<%=img%>">&nbsp;</a>',isplaypage:!0,items:[{title:"QQ\u7a7a\u95f4",img:"qq-zone1.gif",bigimg:"qzone-26.gif",arg:"qq",pbother:"qzone",def:!0,header:!0},{title:"\u65b0\u6d6a\u5fae\u535a",img:"sina-1.gif",bigimg:"sina-26.gif",arg:"weibosina",pbother:"weibo",def:!0,header:!0},{title:"\u4eba\u4eba\u7f51",img:"renren-1.gif",bigimg:"renren-26.gif",arg:"renren",pbother:"renren",def:!0,header:!0},{title:"QQ",img:"qq.png",bigimg:"qq-26.gif",arg:"mqq2",pbother:"qq",header:!0},{title:"\u641c\u72d0\u89c6\u9891\u7a7a\u95f4",img:"sohu-16.gif",arg:"tvspace"},{title:"\u641c\u72d0\u5fae\u535a",img:"tsohu.png",arg:"weibosohu"},{title:"\u817e\u8baf\u5fae\u535a",img:"tencent.gif",arg:"tqq"},{title:"\u5929\u7ffc\u624b\u673a",img:"tianyi.gif",arg:"tianyi"},{title:"\u5f00\u5fc3\u7f51",img:"kaixin.gif",arg:"kaixin001"},{title:"\u817e\u8baf\u670b\u53cb",img:"pengyou.gif",arg:"txpengyou"},{title:"\u7f51\u6613\u5fae\u535a",img:"163.gif",arg:"163"},{title:"i\u8d34\u5427",img:"tieba.gif",arg:"itb"},{title:"\u8c46\u74e3",img:"douban.png",arg:"douban"},{title:"\u98de\u4fe1\u7a7a\u95f4",img:"fetion.png",arg:"fx"},{title:"\u5929\u6daf",img:"tianya.gif",arg:"ty"}],ico_prefix:"//css.tv.itc.cn/global/images/ico/",isFloatShare:!0,produce:function(i,t){return i.img.indexOf("http")<0&&(i.img=this.config.ico_prefix+i.img),i.showtext=t,i.pbother=i.pbother||"",sohuHD.tmpl(this.config.tpl,i).replace("&nbsp;",t?"<span>"+i.title+"</span>":"")}},i.extend(e.prototype,{init:function(){this.shown=!1,this.first_show=!0;for(var t=["<em><i>\u5206\u4eab</i> "],e=[],s=[],o=null,a=0;o=this.config.items[a];a++)o.def&&t.push(this.config.produce.call(this,o)),o.header?(o.img=o.bigimg,e.push('<li class="one">',this.config.produce.call(this,o,!0),"</li>")):s.push("<li>",this.config.produce.call(this,o,!0),"</li>");this.config.isFloatShare&&t.push('<em class="fa-arr"></em></em>'),this.detail_html=e.join("")+s.join(""),this.container=i(this.config.container),this.render(),this.elems={};for(var n in this.config.elems)this.config.elems.hasOwnProperty(n)&&(this.elems[n]=i(this.config.elems[n]));return delete this.config.elems,this.elems.defaulty.html(t.join("")),t=null,this.bind(),this},render:function(){var i=['<div class="vbtn vbtn-fa '+this.config.elems.defaulty.slice(1)+'"></div>','<div class="vCont cfix">','<span class="arr"></span>','<div class="vtit cfix">','    <i class="l">\u5206\u4eab\u5230\uff1a</i>','    <ul class="l fList cfix s_detail_wrap"></ul>',"</div>",'<div class="vL">','<div class="erwm qrcoder"></div>','<p><a href="javascript:;" class="j-qrcoder-helper">\u624b\u673a\u626b\u4e00\u626b\u5206\u4eab\u89c6\u9891&gt;&gt;</a></p>',"</div>",'<div class="vR">',"<h6>\u628a\u89c6\u9891\u8d34\u5230Blog\u6216BBS</h6>","<p>\u901a\u7528\u4ee3\u7801\u53ef\u540c\u65f6\u652f\u6301\u7535\u8111\u548c\u79fb\u52a8\u8bbe\u5907\u7684\u5206\u4eab\u64ad\u653e</p>"];this.config.isplaypage&&i.push(["",'<div class="fcopy">','<span class="cpflash" id="shareBtnFlash_',this.guid,'">',"<span>\u590d\u5236Flash\u4ee3\u7801</span>",'<span class="cpyflash" id="shareBtnFlashSwf_',this.guid,'"></span>',"</span>",'<span class="cpflash cpflash-ok">\u590d\u5236\u6210\u529f</span>','<input type="text" class="in" value="\u70b9\u51fb\u5de6\u4fa7\u6309\u94ae\u590d\u5236\u5bf9\u5e94\u4ee3\u7801" id="shareTxtFlash_',this.guid,'"/>',"</div>",'<div class="fcopy">','<span class="cpflash" id="shareBtnHtml_',this.guid,'">',"<span>\u590d\u5236Html\u4ee3\u7801</span>",'<span class="cpyflash" id="shareBtnHtmlSwf_',this.guid,'"></span>',"</span>",'<span class="cpflash cpflash-ok">\u590d\u5236\u6210\u529f</span>','<input type="text" class="in" value="\u70b9\u51fb\u5de6\u4fa7\u6309\u94ae\u590d\u5236\u5bf9\u5e94\u4ee3\u7801" id="shareTxtHtml_',this.guid,'"/>',"</div>",'<div class="fcopy">','<span class="cpflash" id="shareBtnIfr_',this.guid,'">',"<span>\u590d\u5236\u901a\u7528\u4ee3\u7801</span>",'<span class="cpyflash" id="shareBtnIfrSwf_',this.guid,'"></span>',"</span>",'<span class="cpflash cpflash-ok">\u590d\u5236\u6210\u529f</span>','<input type="text" class="in" value="\u70b9\u51fb\u5de6\u4fa7\u6309\u94ae\u590d\u5236\u5bf9\u5e94\u4ee3\u7801" id="shareTxtIfr_',this.guid,'"/>',"</div>"].join("")),i.push("</div></div>"),this.container.html(i.join(""))},show:function(){if(this.first_show){var t=this;this.elems.detail.html(this.detail_html),delete this.first_show,delete this.detail_html;var e=function(t,e){var s=i("#"+t);s.focus(function(){s.val(e).css("color","#3a3a3a"),setTimeout(function(){s.select()})})},s=function(t,e,s){var o=new ZeroClipboard.Client;o.setHandCursor(!0),o.setText(s),i("#"+e).html(o.getHTML(80,25));var a=i("#"+t).parent(),n=a.find(".cpflash-ok"),r=null;o.addEventListener("complete",function(){i("#"+t).focus(),sohuHD.isIE6&&window.clipboardData.setData("Text",s),n.show(),r&&clearTimeout(r),r=setTimeout(function(){n.hide(),r=null},500)})};this.qrcode(),this.getstr(),e("shareTxtFlash_"+this.guid,this.shareUrl),e("shareTxtHtml_"+this.guid,this.htmlStr),e("shareTxtIfr_"+this.guid,this.ifrStr),kao("clipboard",function(){ZeroClipboard.setMoviePath("//js.tv.itc.cn/base/plugin/ZeroClipboard/swf/ZeroClipboard.swf"),s("shareTxtFlash_"+t.guid,"shareBtnFlashSwf_"+t.guid,t.shareUrl),s("shareTxtHtml_"+t.guid,"shareBtnHtmlSwf_"+t.guid,t.htmlStr),s("shareTxtIfr_"+t.guid,"shareBtnIfrSwf_"+t.guid,t.ifrStr)})}this.container.addClass("vBoxVis").siblings().removeClass("vBoxVis"),this.shown=!0,messagebus.publish("toolbar.vboxvis",{btn:this.container})},hide:function(){this.container.removeClass("vBoxVis"),this.shown=!1},toggle:function(){this.shown?this.hide():this.show()},bind:function(){var t=this;if(this.config.showEvent&&"hover"==this.config.showEvent){var e;this.container.on("mouseenter",function(i){e&&window.clearTimeout(e),e=window.setTimeout(function(){t.show()},300)}).on("mouseleave",function(){e&&window.clearTimeout(e),e=window.setTimeout(function(){t.hide()},200)})}else this.container.click(function(e){e.preventDefault(),e.stopPropagation(),t.config.isFloatShare&&t.toggle(),t.shown&&i(document.body).one("click",function(i){t.hide()}),messagebus.publish("statV2.ping",{url:"mc",type:"click",txid:t.config.txid,other:"btn"})});this.container.on("click",".vCont",function(i){i.stopPropagation()}).on("click",".vbtn-fa a",function(i){i.stopPropagation()}).on("click",".j-share-item",function(i){var e=this.getAttribute("data-arg");e&&("weixin"===e?(t.jumpWeixin(),t.hide()):jump.apply(null,e.split(",")),messagebus.publish("statV2.ping",{url:"mc",type:"click",txid:t.config.txid,other:this.getAttribute("data-pb-other")}),i.preventDefault())}).on("click",".j-qrcoder-helper",function(i){i.preventDefault();var e=["//tv.sohu.com/s2014/ewm-help/index.shtml?","title="+encodeURIComponent(t.config.title),"&link="+encodeURIComponent(t.config.link)];t.config.cover&&e.push("&cover="+encodeURIComponent(t.config.cover)),sohuHD.redirect(e.join(""),"_blank")}),sohuHD.isIE6&&this.container.on("mouseenter",".vbtn-fa",function(t){i(this).addClass("vbtn-fa-hover")}).on("mouseleave",".vbtn-fa",function(t){i(this).removeClass("vbtn-fa-hover")})},qrcode:function(){this.container.find(".qrcoder").html('<img src="//my.tv.sohu.com/user/a/wvideo/getQRCode.do?text='+encodeURIComponent(this.config.link)+'&width=140&height=140&picType=2" width="140" height="140"/>')},getstr:function(){var t=sohuHD.passport.getUid()||"",e=[];e="9001"==this.config.cid&&"0"==this.config.videoinfo.from?[document.location.protocol,"//share.vrs.sohu.com/my/v.swf&topBar=1&id=",this.config.vid,"&autoplay=false"]:[document.location.protocol,"//share.vrs.sohu.com/",this.config.vid,"/v.swf&topBar=1&autoplay=false&plid=",this.config.playlistId,"&pub_catecode=",this.config.osubcid],""!==t&&e.push("&xuid="+t),e.push("&from=page"),e=e.join("");var s=i("#sohuplayer").width()||640,o=i("#sohuplayer").height()||515,a=["<object width=",s," height=",o,">",'<param name="movie" value="',e,'"></param>','<param name="allowFullScreen" value="true"></param>','<param name="allowscriptaccess" value="always"></param>','<param name="wmode" value="Transparent"></param>',"<embed width=",s," height=",o,' wmode="Transparent" allowfullscreen="true" allowscriptaccess="always" ','quality="high" src="',e,'" type="application/x-shockwave-flash"/></embed></object>'].join("");this.shareUrl=e,this.htmlStr=a,this.ifrStr='<iframe frameborder="0" src="'+document.location.protocol+"//tv.sohu.com/upload/static/share/share_play.html#"+this.config.vid+"_"+this.config.playlistId+"_"+(this.config.pid||"0")+"_"+this.config.cid+"_"+(this.config.videoinfo.from||1)+'" allowFullScreen="true"></iframe>'},jumpWeixin:function(){var i=this;e.jumpWeixin(i.config)}}),e.loadQrcode=function(){return"resolved"!=e.loadedQrcode.state()&&kao("qrcode",function(){e.supportCanvas=!!document.createElement("canvas").getContext,e.loadedQrcode.resolve()}),e.loadedQrcode.promise()},e.loadedQrcode=i.Deferred(),e.jumpWeixin=function(t){sohuHD.closeWin();var s=this;s.config=i.extend({},e.config,t||{});var o=this.weixinBox,a=sohuHD.strSub(i.trim(s.config.title.replace("- \u641c\u72d0\u89c6\u9891","")),40,!0),n=a.replace(/[^\x00-\xff]/g,"mm").length>22?"":"tac";o||(o=this.weixinBox=new sohuHD.showWin({htmlStr:["",'<div id="wBox_weixin" class="wBox wBox_weixin">','<div class="wBox-tit cfix"><span class="l">\u626b\u7801\u5206\u4eab\u81f3\u5fae\u4fe1</span><a class="close ico-close r" href="javascript:void(0);"></a></div>','<div class="wBox-con cfix">','<div class="erwm">','<div id="weixinQrcode"> </div>','<p class="fs16 ',n,'">',a,"</p>","</div>","</div>","</div>"].join(""),noMask:!0,autohide:!1}),o.initWin(),i("#weixinQrcode").html('<img src="//my.tv.sohu.com/user/a/wvideo/getQRCode.do?text='+encodeURIComponent(s.config.link)+'&width=178&height=178&picType=2&ecl=1" width="178" height="178"/>')),o.show()},t.Forward=e}(jQuery,sohuHD),"function"!=typeof jump&&kao("share");