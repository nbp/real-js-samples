define(function(a,b){b.callback=function(){define("video-html5/circle-preloader_bundle-part",["jquery"],function(a){"use strict";var b={cssClasses:{progress:"",progressCircle:"",backCircle:""},timer:0,timerPeriod:100,onTimer:void 0},c={init:function(c,d){this.options=a.extend(!0,{},b,d),a("<div></div>").addClass(this.options.cssClasses.backCircle).appendTo(c),this.$progress=a("<div></div>").addClass(this.options.cssClasses.progress).appendTo(c),this.$circleProgress=this._createCircle(),this.$circleMask=this._createCircle()},_createCircle:function(){var b=a("<div></div>").css({width:"100%",height:"100%",position:"absolute"}).appendTo(this.$progress);return a("<div></div>").addClass(this.options.cssClasses.progressCircle).appendTo(b),b},_onTimer:function(){this.timerCount++;var a=this.timerCount*this.options.timerPeriod*100/(1e3*this.options.timer);return a>=100?(a=100,this.options.onTimer&&this.options.onTimer(),this.stop(),void this.setProgress(100)):void this.setProgress(a)},reset:function(){this.options.timer>0&&(this.stop(),this.timer=setInterval(this._onTimer.bind(this),this.options.timerPeriod),this.timerCount=0,this.rich50=!1,this.$progress.addClass("half"))},stop:function(){this.timer&&(this.timerCount=0,clearInterval(this.timer))},setProgress:function(a){var b={left:360,right:180};a<50&&this.$circleMask.css("transform","rotate("+Math.ceil(a*(b.right/50))+"deg)"),this.$circleProgress.css("transform","rotate("+Math.ceil(b.left*(a/100))+"deg)"),a>50&&!this.rich50&&(this.$progress.removeClass("half"),this.$circleMask.css("transform","rotate(180deg)"),this.rich50=!0)},destroy:function(){this.stop(),this.$progress.remove()}};return{create:function(a,b){var d=Object.create(c);return d.init(a,b),d}}}),define("video-html5/context-menu_bundle-part",["jquery"],function(a){"use strict";var b={init:function(b){var c;for(this.options=a.extend(!0,{},b),this.$el=a("<div></div>").addClass("b-video-html5__context-menu"),this.$ul=a("<ul></ul>").addClass("b-video-html5__context-menu__ul").appendTo(this.$el),c=0;c<this.options.items.length;c++)this._initItem(this.options.items[c]);return this.clickHandler=this._clickHandler.bind(this),a(window).on("click",this.clickHandler),this.options.target.on("mouseup",this.clickHandler),this.options.target.on("player.click",this.clickHandler),this.options.target.on("contextmenu",this._contextMenuHandler.bind(this)),this.$el.appendTo(this.options.parent),this.$el.hide(),this},_initItem:function(b){a("<li>"+b.name+"</li>").addClass("b-video-html5__context-menu__li").appendTo(this.$ul).on("click",function(a){a.stopPropagation(),b.callback&&b.callback(),this.$el.hide()}.bind(this))},_clickHandler:function(a){2!==a.button&&this.$el.hide()},_contextMenuHandler:function(a){var b=this.options.parent.offset(),c=0,d=0;return a.preventDefault(),a.pageX-b.left+this.$el.width()>this.options.parent.width()&&(c=this.$el.width()),a.pageY-b.top+this.$el.height()>this.options.parent.height()&&(d=this.$el.height()),this.$el.css({left:a.pageX-b.left-c+"px",top:a.pageY-b.top-d+"px"}),this.$el.show(),!1},destroy:function(){this.$el.remove(),this.options.target.off("contextmenu"),this.options.target.off("mouseup",this.clickHandler),this.options.target.off("player.click",this.clickHandler),a(window).off("click",this.clickHandler)}};return{create:function(a){return Object.create(b).init(a)}}}),define("video-html5/link-bubble_bundle-part",["jquery"],function(a){"use strict";var b,c={videoPageUrl:"https://my.mail.ru/",contentVideoHost:"https://content.video.mail.ru/",apiUrl:"https://my.mail.ru/video/embed/",videoUrl:""},d={bubbleLink:"b-video-viral-panel__bubble-link",bubbleLinkClose:"b-video-viral-panel__bubble-link__close",htmlCodeSwitcher:"b-video-viral-panel__html-code-switcher",htmlCodeInput:"b-video-viral-panel__html-code-input"};return b={init:function(b){return this.options=a.extend(!0,{},c,b),this.$bubble=a('<div class="'+d.bubbleLink+'"><div class="'+d.bubbleLinkClose+'"></div>'+this.options.locales.bubbleLinkHeader+"<label >"+this.options.locales.linkToVideo+'<br/><input type="text" name="" value="'+this.getFullUrl()+'" class="ui-form-input" onfocus="this.select();return false;"></label><label>'+this.options.locales.html+'<br/><input type="text" name="" value="'+this.getIframeCode()+'" class="ui-form-input '+d.htmlCodeInput+'" onfocus="this.select();return false;"></label><label>'+this.options.locales.bbCode+'<br/><input type="text" name="" value="'+this.getBbCode()+'" class="ui-form-input b-video__code-bb" onfocus="this.select();return false;"></label>'),this.$htmlCodeInput=this.$bubble.find("."+d.htmlCodeInput),this.$bubbleLinkClose=this.$bubble.find("."+d.bubbleLinkClose),this.$bubbleLinkClose.on("click",this._onBubbleLinkCloseClick.bind(this)),this.$bubble.on("contextmenu",this._contextMenuHandler.bind(this)),this.$bubble},_onBubbleLinkCloseClick:function(a){a.stopPropagation(),this.$bubble.removeClass("show").trigger("close")},_contextMenuHandler:function(a){a.stopPropagation()},getFullUrl:function(){var a=this.options.pageUrl;return 0!==a.indexOf("http")&&(a="https:"+a),a},getIframeCode:function(){return"<iframe src='"+this.options.apiUrl+this.options.videoId+"' width='626' height='367' frameborder='0' scrolling='no' webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>"},getBbCode:function(){return"[url="+this.getFullUrl()+"][img]"+this.getPreviewImage()+"[/img][/url]"},getPreviewImage:function(){var a=this.options.poster;return 0!==a.indexOf("http")&&(a="https:"+a),a}},{create:function(a){var c=Object.create(b);return c.init(a)}}}),define("video-html5/log_bundle-part",["jquery"],function(a){"use strict";var b={url:"//logvideo.my.mail.ru/ferr/html5player"},c={init:function(c){return this.options=a.extend(!0,{},b,c),this},send:function(b){var c={externalId:this.options.externalId,external:this.options.external,error:encodeURIComponent(b)};a.ajax({url:this.options.url,type:"get",data:c})}};return{create:function(a){return Object.create(c).init(a)}}}),define("video-html5/share_bundle-part",["util/helpers","counters"],function(a,b){"use strict";var c={fromPlayer:{mm:2125287,ok:2125289,vk:2125290,tw:2125291,fb:2125297,gplus:6041040},fromVideolayer:{mm:9334550,ok:8986068,vk:8986085,fb:8986100,tw:8986115,gplus:8986131},fromHistory:{mm:6166965,ok:6166763,vk:6166777,fb:6166805}},d={init:function(b){this.config=a.extend(!0,{},b),this.config.videoLocation=this.config.videoLocation.replace(/^\//,"")},openWindow:function(a,d){var e,f=encodeURIComponent(location.protocol+"//my.mail.ru/"+this.config.videoLocation+".html?v-ref="+a),g=600,h=600;switch(a){case"mm":e="//connect.mail.ru/share?share_url="+f+"&imageurl="+this.getPreviewImage(),this.config.title&&(e+="&title="+this.title),this.config.description&&(e+="&description="+this.config.description);break;case"ok":e="//odnoklassniki.ru/dk?st.cmd=addShare&st._surl="+f;break;case"vk":e="//vk.com/share.php?url="+f+"&image="+this.getPreviewImage(),this.config.title&&(e+="&title="+this.config.title),this.config.description&&(e+="&description="+this.config.description);break;case"tw":e="//twitter.com/home?status="+f;break;case"fb":e="//www.facebook.com/sharer.php?u="+f;break;case"gplus":e="https://plus.google.com/share?url="+f}void 0!==c[d]&&void 0!==c[d][a]&&b.myrb(c[d][a]),e&&window.open(e,"_blank","width="+g+",height="+h+",left="+(screen.width/2-g/2)).focus()},getPreviewImage:function(){var a,b=this.config.videoLocation.split("/");return b[b.length-1]="i-"+b[b.length-1]+".jpg",a=b.join("/"),location.protocol+"//content.video.mail.ru/"+a}};return d}),define("video-html5/stat_bundle-part",["jquery","counters","client-server","stream-sense","util/helpers","util/htmlescape"],function(a,b,c,d,e,f){"use strict";var g,h={referer:window.top==window.parent.top?window.location.href:window.parent.location.href,comScore:{id:"9999305",section:"moimir"},listenStatUrl:"/+/video/view_stat/",tnsUrl:"//www.tns-counter.ru/V13a****mail_ru/ru/CP1251/tmsec=mail_videoplayer"};return g={init:function(b){return this.options=a.extend(!0,{},h,b),this.checkpoints={1:!1,5:!1,10:!1,25:!1,50:!1,75:!1,80:!1,100:!1},this.listenStatPoints=[10,20,30,40,50,60,70,80,90,100],this},firstByteLoad:function(){this.send({name:"first_bytes_loaded"})},checkpoint:function(a){var b,d=[];for(Object.keys(this.checkpoints).forEach(function(b){a>=b&&!this.checkpoints[b]&&(d.push({name:"checkpoint",value:b}),this.checkpoints[b]=!0)}.bind(this)),d.length&&this.send(d),b=0;b<this.listenStatPoints.length;b++)if(a>=this.listenStatPoints[b]&&(b==this.listenStatPoints.length-1||a<this.listenStatPoints[b+1])){c.func("",{percent:this.listenStatPoints[b],vid:this.options.accid,iid:this.options.videoId,ext:this.options.external?1:0,flash:0},{url:this.options.listenStatUrl,method:"GET",contentType:"application/x-www-form-urlencoded"},null,null,null,!0),this.sendToGraphite("checkpoint."+this.listenStatPoints[b]),this.listenStatPoints.splice(0,b+1);break}},send:function(a,b){b&&this.sendToGraphite(a.name)},sendToGraphite:function(a){var c=["html5player",this.options.external?"ext":"int",this.options.autoplay?"on":"off",a];b.mygrst(c.join("."))},sendTNS:function(a){(new Image).src=this.options.tnsUrl+a+"/"},comScoreInit:function(a){this.streamingTag=new d.ns_.StreamingTag({customerC2:this.options.comScore.id,secure:!0}),this.comScoreMeta={ns_st_ci:this.options.accid,ns_st_cl:1e3*a.meta.duration,ns_st_st:"*null",ns_st_pu:"*null",ns_st_pr:"*null",ns_st_ep:a.meta.title,ns_st_sn:"*null",ns_st_en:"*null",ns_st_ge:"*null",ns_st_ti:"*null",ns_st_ia:"0",ns_st_ce:"1",ns_st_ddt:"*null",ns_st_tdt:"*null",c3:this.options.comScore.section,c4:"*null",c6:"*null"}},comScoreReinit:function(){this.streamingTag&&(this.streamingTag=new d.ns_.StreamingTag({customerC2:this.options.comScore.id,secure:!0}))},comScorePlayAdv:function(a){this.streamingTag&&this.streamingTag.playVideoAdvertisement({ns_st_cl:Math.floor(1e3*a)},d.ns_.StreamingTag.AdType.LinearOnDemandPreRoll)},comScoreStop:function(){this.streamingTag&&this.streamingTag.stop()},comScorePlayVideo:function(){this.streamingTag&&this.streamingTag.playVideoContentPart(this.comScoreMeta,d.ns_.StreamingTag.ContentType.UserGeneratedShortFormOnDemand)}},{create:function(a){return Object.create(g).init(a)}}}),define("video-html5/storage_bundle-part",function(){"use strict";var a={setParam:function(a,b){var c=this.getParam();c[a]=b,localStorage.html5Video=JSON.stringify(c)},getParam:function(a){var b,c=localStorage.html5Video;try{c=JSON.parse(c)}catch(a){c={}}return b=a?c[a]:c}};return a}),define("video-html5/video-api-response_bundle-part",["util/helpers"],function(a){"use strict";var b={qualityMap:{"280p":"sd","480p":"md2","640p":"md2","854p":"hd","1280p":"hd","1920p":"full_hd","272p":"sd","320p":"md1","360p":"md1","580p":"hd","720p":"hd","1080p":"full_hd"},getQualityNameByKey:function(a){var b;return a=parseInt(a,10),a>0&&a<=272&&(b="sd"),a>272&&a<=360&&(b="md1"),a>360&&a<=480&&(b="md2"),a>480&&a<=720&&(b="hd"),a>720&&(b="full_hd"),b},parse:function(b){var c,d,e=[];if(a.isArray(b.videos))for(d=0;d<b.videos.length;d++)c=b.videos[d].name||b.videos[d].key?b.videos[d].key?this.getQualityNameByKey(b.videos[d].key):b.videos[d].name||this.qualityMap[b.videos[d].key]:this.qualityMap[d],e.push({name:c,src:b.videos[d].url});else if(a.isObject(b.videos))for(d in b.videos)b.videos.hasOwnProperty(d)&&e.push({name:this.qualityMap[d]||d,src:b.videos[d].url||b.videos[d]});return e}};return b})},b.modules=["video-html5/circle-preloader","video-html5/context-menu","video-html5/link-bubble","video-html5/log","video-html5/share","video-html5/stat","video-html5/storage","video-html5/video-api-response"]});