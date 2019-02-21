_.Module.define({path:"tbui/widget/http_transform",sub:{initial:function(){window.BaiduHttps||(window.BaiduHttps={callbacks:function(){}})},httpTransform:function(t){if(window.navigator.userAgent){var i=window.navigator.userAgent;i=i.toLowerCase();var a=new RegExp("/chrome|firefox|safari|msie 10|rsv:11|msie [89]/");a.test(i)&&(t=t.replace("http://www.baidu.com","https://www.baidu.com"))}return t},httpLinkHover:function(t){$(t).hover(function(){$.ajax({url:"https://www.baidu.com/con?from=tieba",type:"get",dataType:"JSONP"})})}}});_.Module.define({path:"search/widget/suggestion/base",requires:["search/widget/suggestion/events"],sub:{runtime:{disabled:!1},initial:function(t){this.options=t,this.input=this.options.input,this.wrapper=this.options.fixWrapper,this.sug=null,this.dataList=[],this.create()},create:function(){var t=['<div class="#{expand}">','<ul class="#{expandList}">',"</ul>","</div>"].join(""),e=this.input,i=e.offset(),s=e.outerWidth()-2,a=e.outerHeight()+i.top-1,n=i.left,r=this.wrapper?this.wrapper:$("body");this.sug=$($.tb.format(t,this.options.classes)).css({left:n,width:s,top:a}).hide(),r.append(this.sug),this.ableControl(),this.bindEvents()},bindEvents:function(){this.requireInstance("search/widget/suggestion/events",[{input:this.input,sug:this.sug,options:this.options}])},ableControl:function(){var t=$('input.jointb[type="radio"]'),e=$('input.authortb[type="radio"]'),i=$('input.searchtb[type="radio"]');t.length>0&&t.bind("click",this.able()),e.length>0&&e.bind("click",this.able()),i.length>0&&i.bind("click",this.disable()),0!=t.length&&t.tbattr("checked")||this.disable()},able:function(){this.runtime.disabled=!1},disable:function(){this.runtime.disabled=!0,this.sug.hide()}}}),_.Module.define({path:"search/widget/suggestion/events",requires:["search/widget/suggestion/data"],sub:{skippedType:["operation_title","often_forum_title","relation_forum_title","relation_game_title","more_title"],initial:function(t){this.options=t,this.input=this.options.input,this.sug=this.options.sug,this.wrapper=this.options.options.fixWrapper,this.skipTime=this.options.options.skipTime,this.target=null,this.toggleFlag=!1,this.mouseIn=!1,this.query="",this.bindEvents(),this.initRequest()},initRequest:function(){this.data=this.requireInstance("search/widget/suggestion/data",[{input:this.input,sug:this.sug,forumName:this.options.options.forumName,maxCount:this.options.options.maxCount}])},delayRequest:function(){return this.query=this.getQuery(),this.data.delayRequest(this.skipTime,this.query)},bindEvents:function(){if(this.options.searchFixed){var t=this.wrapper.offset().top,e=$(window).scrollTop();this.toggleFlag=t>e,this.fixSize(!0)}$(window).bind("scroll",$.proxy(this.fixSize,this)).bind("resize",$.proxy(this.fixSize,this)),this.input.bind("keyup",$.proxy(this.handleKeyup,this)).bind("keydown",$.proxy(this.handleKeydown,this)).bind("paste",$.proxy(this.handleElseEvents,this)).bind("focusin",$.proxy(this.handleElseEvents,this)).bind("click",$.proxy(this.handleElseEvents,this)).bind("focusout",$.proxy(this.handleFocusout,this)).bind("compositionend",$.proxy(this.handleElseEvents,this)),this.sug.on("mouseenter","li",$.proxy(this.handleMouseenter,this)).on("mouseleave","li",$.proxy(this.handleMouseleave,this)).on("click","li",$.proxy(this.handleFire,this))},handleKeyup:function(t){$.inArray(t.keyCode,[16,17,18,20,37,38,39,40])>=0||13!=t.keyCode&&this.delayRequest()},handleKeydown:function(t){if(!($.inArray(t.keyCode,[16,17,18,20,37,39])>=0))switch(t.keyCode){case 13:return this.handleFire();case 38:return this.prevActive(),!1;case 40:return this.nextActive(),!1;default:this.clearState()}},handleMouseenter:function(t){var e=$(t.currentTarget);this.mouseIn=!0,this.active(e)},handleMouseleave:function(){this.mouseIn=!1},handleFocusout:function(){this.mouseIn||(this.clearState(),this.sug.hide())},handleElseEvents:function(){this.delayRequest()},handleFire:function(){var t=this,e=this.input.getData();if(e&&1===+e.sugIsBrand&&$.stats.track("search_forum","brank_forum","frs","click",{searchFname:e.sugValue}),e&&e.sugUrl){this.clickStats(e);var i=setTimeout(function(){$.tb.location.setHref($.tb.unescapeHTML(e.sugUrl)),t.sug.hide(),clearTimeout(i),i=null},200);return!1}return!0},clickStats:function(t){var e=t.sugType;switch(e){case"game_item":this.clickGameStats(t);break;case"operation_item":this.clickOperationItemStats(t)}},clickGameStats:function(t){$.stats.track("\u641c\u7d22\u6846","\u641c\u7d22\u63d0\u793a\u51fa\u6e38\u620f\u5b9e\u9a8c","","\u70b9\u51fb",{obj_name:t.sugValue,obj_url:t.sugUrl,obj_type:"\u6e38\u620f"})},clickOperationItemStats:function(t){$.stats.track(t.sugValue,"\u641c\u7d22\u6846\u8fd0\u8425\u914d\u7f6e\u9879\u7edf\u8ba1","","click",{obj_name:t.sugValue,obj_url:t.sugUrl,obj_type:"\u5e73\u53f0\u5316"})},fixSize:function(t){var e=this;this.fixTime&&clearTimeout(this.fixTime),this.fixTime=setTimeout(function(){var i=e.wrapper.offset().top,s=$(window).scrollTop(),a=e.input,n=a.offset(),r=a.outerHeight()+n.top-1,u=a.outerWidth()-2,o=n.left;if(i>s===e.toggleFlag){if(!t)return}else e.toggleFlag=i>s,e.sug.hide();e.wrapper.hasClass("search_main_fixed")&&(r=a.outerHeight()+10),e.sug.css({width:u,left:o,top:r})},10)},changeState:function(t){var e=t.getData().sugType,i=t.getData().sugUrl,s=t.getData().sugValue,a=t.getData().sugIsBrand;this.input.bindData({sugType:e,sugUrl:i,sugValue:s,sugIsBrand:a})},clearState:function(){this.input.bindData({})},active:function(t){var e=t.getData().sugType,i=this.skippedType.slice(0,-1);return $.inArray(e,i)>-1?(this.clearState(),void 0):(this.target=t,this.addOn(t),this.changeState(t),void 0)},nextActive:function(){var t=this.sug.find("ul li"),e=null;if(0!==t.length&&this.sug.is(":visible")){e=this.target&&0!==this.target.next().length?this.target.next():this.sug.find("ul li").eq(0);var i=e.getData().sugType;$.inArray(i,this.skippedType)>-1?(this.target=e,this.nextActive()):this.active(e)}},prevActive:function(){var t=this.sug.find("ul li"),e=null;if(0!==t.length&&this.sug.is(":visible")){e=this.target&&0!==this.target.prev().length?this.target.prev():this.sug.find("ul li").eq(-1);var i=e.getData().sugType;$.inArray(i,this.skippedType)>-1?(this.target=e,this.prevActive()):this.active(e)}},addOn:function(t){t.siblings("li").removeClass("on"),t.addClass("on")},getQuery:function(){return this.input.tbattr("value")},setQuery:function(t){return this.input.tbattr("value",t)}}}),_.Module.define({path:"search/widget/suggestion/data",requires:["search/widget/suggestion/render"],sub:{settings:{url:"/suggestion",isCache:!0,defaultQuery:"DEFAULTQUERY"},initial:function(t){this.options=t,this.input=this.options.input,this.sug=this.options.sug,this.forumName=this.options.forumName,this.maxCount=this.options.maxCount||10,this.curCount=0,this.query="",this.dataList=[],this.cache={}},handleResponse:function(t,e){if(0!==e.error)return!1;this.curCount=0,this.query=t;var i=e.query_tips.search_data,s=e.query_match.search_data,a=e.query_tag.search_data,n=e.suggest_game&&e.suggest_game.search_data;this.checkData(i)&&(this.formatData("operation_title"),this.formatOperateData(i)),this.checkData(s)&&(this.checkData(i)&&this.formatData("often_forum_title"),this.formatForumData(s)),this.checkData(n)?(this.formatData("relation_game_title"),this.formatGameData(n)):this.checkData(a)&&(this.formatData("relation_forum_title"),this.formatForumData(a)),!this.checkData(s)&&!this.checkData(a)||this.checkMore(t)||this.formatData("more_title","/f/search/fm?ie=UTF-8&qw="+encodeURIComponent($.tb.escapeHTML(t))),this.renderItems(),this.viewStats()},formatOperateData:function(t){var e,i,s=this.requireInstance("tbui/widget/http_transform",[]);for(e=0;e<t.length&&5>e&&this.checkCount();e++){i=t[e];var a=s.httpTransform(this.replaceAmp(i.forum_url));this.dataList.push({sugType:"operation_item",position:e+1,name:i.fname,desc:i.forum_desc,sugUrl:a}),this.curCount++}this.dataList.push({sugType:"operation_item",str:'<li class="bdfengyun" ><a href = "http://top.baidu.com/?fr=bdtb">\u7531\u767e\u5ea6\u641c\u7d22\u98ce\u4e91\u699c\u63d0\u4f9b</a></li> '})},formatGameData:function(t){var e,i,s=[];for(e=0;e<t.length&&this.checkCount();e++)i=t[e],this.dataList.push({sugType:"game_item",name:i.game_name,title:this.highlightForumName(i.game_name),pic:i.icon_url,desc:i.description,sugUrl:i.link_href}),this.curCount++,s.push(i.game_name);s.length>0&&this.viewGameStats(s)},formatForumData:function(t){var e,i;for(e=0;e<t.length&&this.checkCount();e++)i=t[e],i.fname!==this.forumName&&"me0407"!==i.fname&&(this.dataList.push({sugType:"forum_item",name:i.fname,title:this.highlightForumName(i.fname+"\u5427"),pic:i.fpic,desc:i.forum_desc?i.forum_desc:i.fclass2?"\u6240\u5c5e\u76ee\u5f55\uff1a"+i.fclass1+"&nbsp; "+i.fclass2:"",member:i.member_num,thread:i.thread_num,sugUrl:"/f?ie=utf-8&kw="+encodeURIComponent(this.replaceAmp(i.fname)),isBrank:1==i.isbrand,fuzzyBrand:i.source?1:0}),this.curCount++)},queryData:function(){var t=this.query;this.dataList.push({sugType:"reverse_query",name:t,sugUrl:"/f?ie=utf-8&kw="+encodeURIComponent(this.replaceAmp(t))})},formatData:function(t,e){var i=this.query;this.dataList.push({sugType:t,name:i,sugUrl:e})},getQuery:function(){return this.input.tbattr("value")},clearSuggestion:function(){this.dataList=[]},checkCount:function(){return this.curCount<this.maxCount},checkData:function(t){return $.isArray(t)&&t.length>0},checkMore:function(t){return!t||/^\s+$/.test(t)||t===this.forumName},replaceAmp:function(t){return t&&t.replace(/\&amp;/g,"&")},formatString:function(t){return t.replace(/\</g,"&lt;").replace(/\>/g,"&gt;")},highlightForumName:function(t){var e="",i="",s=this.query,a=new RegExp(s.replace(/[\/\\]/g,""),"g");return e=$.tb.escapeHTML(t),i=s?e.replace(a,function(t){return'<em class="highlight">'+t+"</em>"}):e},renderItems:function(){var t="",e=this.requireInstance("search/widget/suggestion/render");this.dataList.length>0&&this.queryData(),t=e.renderSuggestion(this.dataList),""!==t?this.sug.show().find("ul").html(t):this.sug.hide(),this.clearSuggestion()},viewStats:function(){},viewGameStats:function(t){$.stats.track("\u641c\u7d22\u6846","\u641c\u7d22\u63d0\u793a\u51fa\u6e38\u620f\u5b9e\u9a8c","","\u5c55\u73b0",{obj_name:this.query,obj_game_name:t,obj_type:"\u6e38\u620f"})},request:function(t){var e=this;(t===this.forumName||"me0407"===t)&&(t="");var i=""===t?this.settings.defaultQuery:t;this.settings.isCache&&i in this.cache?this.handleResponse(t,this.cache[i]):(this.queryRequest&&this.queryRequest.abort(),this.queryRequest=$.ajax({url:this.settings.url,data:{query:t,ie:"utf-8"},dataType:"json",type:"get",cache:!1,success:function(i){e.responseSuccess(t,i)}}))},delayRequest:function(t,e){var i=this;this.requestTimer&&clearTimeout(this.requestTimer),this.requestTimer=setTimeout(function(){i.request(e),clearTimeout(i.requestTimer),i.requestTimer=null},t)},responseSuccess:function(t,e){if(this.settings.isCache){var i=""===t?this.settings.defaultQuery:t;this.cache[i]=e}this.handleResponse(t,e),this.queryRequest=null}}}),_.Module.define({path:"search/widget/suggestion/render",requires:[],sub:{queryTemplate:'<li class="reserve_query" #{info}></li>',titleTemplate:['<li class="break_title #{special}" #{info}>','<span class="break_tip">#{title}</span>',"</li>"].join(""),forumTemplate:["<li #{info}>",'<div class="forum_item">','<img class="forum_image" src="#{pic}" />','<div class="forum_right">','<div class="forum_name">#{title}','<span title="\u54c1\u724c\u5316\u5427" class="brank #{isBrank}">\u54c1\u724c</span>','<span title="\u4f1a\u5458\u6570" class="forum_member">#{member}</span>','<span title="\u5e16\u5b50\u6570" class="forum_thread">#{thread}</span>',"</div>",'<div class="forum_desc">#{desc}</div>',"</div>","</div>","</li>"].join(""),gameTemplate:["<li #{info}>",'<div class="forum_item">','<img class="forum_image" src="#{pic}" />','<div class="forum_right">','<div class="forum_name">#{title}',"</div>",'<div class="forum_desc">#{desc}</div>',"</div>","</div>","</li>"].join(""),operationTemplate:["<li #{info}>",'<div class="operation_item item_top#{position}">',"<i></i>",'<div class="operation_title">#{name}</div>','<div class="operation_desc">#{desc}</div>',"</div>","</li>"].join(""),initial:function(){},renderQuery:function(t){var e=$.tb.dataField({sugType:t.sugType,sugValue:t.name,sugUrl:t.sugUrl});return $.extend(t,{info:e}),$.tb.format(this.queryTemplate,{info:e})},renderTitle:function(t){var e="",i="",s=t.name,a=$.tb.dataField({sugType:t.sugType,sugValue:s,sugUrl:t.sugUrl});switch(t.sugType){case"operation_title":e="\u5927\u4f19\u6b63\u5728\u804a";break;case"often_forum_title":e="\u6700\u8fd1\u5e38\u901b\u7684\u5427\uff1a";break;case"relation_forum_title":e='\u4e0e\u201c<em class="highlight">'+s+"</em>\u201d\u6709\u5173\u7684\u5427\uff1a";break;case"relation_game_title":e='\u4e0e\u201c<em class="highlight">'+s+"</em>\u201d\u6709\u5173\u7684\u6e38\u620f\uff1a";break;case"more_title":e='\u5728\u8d34\u5427\u4e2d\u641c\u7d22\u66f4\u591a\u4e0e\u201c<em class="highlight">'+s+"</em>\u201d\u76f8\u5173\u7684\u5427",i="special_title more_title"}return $.tb.format(this.titleTemplate,{info:a,special:i,title:e})},renderForum:function(t){var e=t.isBrank?1:0;t.isBrank=t.isBrank?"":"hide";var i=$.tb.dataField({sugType:t.sugType,sugValue:t.name,sugUrl:t.sugUrl,sugIsBrand:e,sugFuzzyBrand:t.fuzzyBrand});return $.extend(t,{info:i}),$.tb.format(this.forumTemplate,t)},renderGame:function(t){var e=$.tb.dataField({sugType:t.sugType,sugValue:t.name,sugUrl:t.sugUrl+(t.sugUrl.indexOf("?")<0?"?":"&")+"gfr=search_suggestion"});return $.extend(t,{info:e}),$.tb.format(this.gameTemplate,t)},renderOperation:function(t){var e=$.tb.dataField({sugType:t.sugType,sugValue:t.name,sugUrl:t.sugUrl});return $.extend(t,{info:e}),$.tb.format(this.operationTemplate,t)},renderSuggestion:function(t){var e,i="",s=null,a=t.length;for(e=0;a>e;e++)switch(s=t[e],s.sugType){case"reverse_query":i+=this.renderQuery(s);break;case"operation_item":i+=s.str?s.str:this.renderOperation(s);break;case"forum_item":i+=this.renderForum(s);break;case"game_item":i+=this.renderGame(s);break;default:i+=this.renderTitle(s)}return i}}}),_.Module.define({path:"search/widget/suggestion",requires:["search/widget/suggestion/base"],sub:{options:{input:null,maxCount:12,skipTime:50,classes:{expand:"suggestion",expandList:"suggestion_list"}},initial:function(t){this.options=$.extend(this.options,t),this.initSug()},initSug:function(){this.options.input&&this.requireInstance("search/widget/suggestion/base",[this.options])}}});_.Module.define({path:"search/widget/search_handler",sub:{_staticUrl:{no_key:"//tieba.baidu.com/","\u8d34\u5427\u6295\u8bc9":"//tieba.baidu.com/tousu/new","\u5e16\u5427\u6295\u8bc9":"//tieba.baidu.com/tousu/new",tiebatousu:"//tieba.baidu.com/tousu/new","\u8d34\u5427\u6295\u8bc9\u5427":"//tieba.baidu.com/tousu/new","\u8d34\u5427\u6295\u8bc9\u4e2d\u5fc3":"//tieba.baidu.com/tousu/new","\u6295\u8bc9\u4e2d\u5fc3":"//tieba.baidu.com/tousu/new","\u6295\u8bc9":"//tieba.baidu.com/tousu/new","\u8d34\u5427\u4e3e\u62a5":"//tieba.baidu.com/tousu/new","\u77e5\u9053\u6295\u8bc9":"http://tousu.baidu.com/zhidao","\u7a7a\u95f4\u6295\u8bc9":"http://tousu.baidu.com/hi","\u767e\u79d1\u6295\u8bc9":"http://tousu.baidu.com/baike",zhidaotousu:"http://tousu.baidu.com/zhidao",kongjiantousu:"http://tousu.baidu.com/hi",baiketousu:"http://tousu.baidu.com/baike"},_sendStatistics:function(t){$.stats.sendRequest("st_mod=search&search_type="+t)},initial:function(){},toStaticUrl:function(t){var e=t.toLowerCase();return this._staticUrl.hasOwnProperty(e)?($.tb.location.setHref(this._staticUrl[e]),!1):void 0},enterBa:function(t,e){if(""==t)return $.tb.location.setHref(this._staticUrl.no_key),!1;this.toStaticUrl(t);var s=[];if(s=-1!=t.indexOf("\uff1a")?t.split("\uff1a"):t.split(":"),2==s.length){if("\u6807\u7b7e"==s[0])return this._sendStatistics("tagsearch",t),$.tb.location.setHref("/f/search/fm?ie=utf-8&tag="+encodeURIComponent($.tb.escapeHTML(s[1]))),!1;if(-1!=s[0].indexOf("\u5427\u5185")){var o=s[0].split("\u5427\u5185")[0];if(o)return this._sendStatistics("baneisearch",t),$.tb.location.setHref("/f/search/res?ie=utf-8&kw="+encodeURIComponent($.tb.escapeHTML(o))+"&qw="+encodeURIComponent($.tb.escapeHTML(s[1]))),!1}}if(PageData.search_what&&"fromBtn"!=e){if("composite"==PageData.search_what)return this._sendStatistics("compositesearch",t),$.tb.location.setHref("/f/search/res?ie=utf-8&qw="+encodeURIComponent($.tb.escapeHTML(t))),!1;if("forum"==PageData.search_what)return this._sendStatistics("forumsearch",t),$.tb.location.setHref("/f/search/fm?ie=utf-8&qw="+encodeURIComponent($.tb.escapeHTML(t))),!1}this._sendStatistics("enterba&from=search",t);var a=$("#head").find(".search_main .suggestion");if(a.is(":visible")){var i=a.find("ul li").eq(0).getData(),n=i.sugValue,c=i.sugFuzzyBrand;if(1===+c)return $.tb.location.setHref("/f?ie=utf-8&kw="+encodeURIComponent(n)+"&fr=search&source="+encodeURIComponent(t)),!1}return $.tb.location.setHref("/f?ie=utf-8&kw="+encodeURIComponent(t)+"&fr=search"),!1},searchPost:function(t){return window.history_search_post||(PageData.user.is_login&&$.tb.post("/f/search/addWord",{word:$.tb.escapeHTML(t)},function(t){0==t.no&&(window.history_search_post=!1)}),window.history_search_post=!0),this._sendStatistics("postsearch",t),setTimeout(function(){$.tb.location.setHref("/f/search/res?ie=utf-8&qw="+encodeURIComponent($.tb.escapeHTML(t)))},100),!1},searchPostInBa:function(t,e){var s="/f/search/res?ie=utf-8&kw="+encodeURIComponent($.tb.escapeHTML(e))+"&qw="+encodeURIComponent($.tb.escapeHTML(t));return window.history_search_post||(PageData.user.is_login&&$.tb.post("/f/search/addWord",{word:$.tb.escapeHTML(t)},function(t){0==t.no&&(window.history_search_post=!1)}),window.history_search_post=!0),this._sendStatistics("baneisearch",t),setTimeout(function(){$.tb.location.setHref(s)},100),!1},searchPeople:function(t){return this._sendStatistics("peoplesearch",t),$.tb.location.setHref("/f/search/sure?ie=utf-8&only_user=1&qw="+encodeURIComponent($.tb.escapeHTML(t))),!1},searchTag:function(t){return this._sendStatistics("tagsearch",t),$.tb.location.setHref("/f/search/fm?ie=utf-8&tag="+encodeURIComponent($.tb.escapeHTML(t))),!1},searchForum:function(t){var e="/f/search/fm?ie=UTF-8&";return-1!=t.indexOf("\u6807\u7b7e\uff1a")?(t=t.substr(t.indexOf("\u6807\u7b7e\uff1a")+3),e=e+"tag="+encodeURIComponent($.tb.escapeHTML(t))):-1!=t.indexOf("\u6807\u7b7e:")?(t=t.substr(t.indexOf("\u6807\u7b7e:")+3),e=e+"tag="+encodeURIComponent($.tb.escapeHTML(t))):e=e+"qw="+encodeURIComponent($.tb.escapeHTML(t)),$.tb.location.setHref(e),!1}}});_.Module.define({path:"search/widget/searchDialog",requires:["search/widget/searchHandler"],sub:{_DLG_ID:"tb_header_search_dlg",_options:{defaultType:"post",style:null,forumName:null,page:null},_searchHandler:null,_jq_wrap:null,_jq_input:null,_jq_form:null,initial:function(t){$.extend(this._options,t),this._initOptPage(),this._searchHandler=this.use("search/widget/searchHandler"),this._initDlg()},_initOptPage:function(){null==this._options.page&&(/^\w+:\/\/[^\/]+\/(index\.html?)|(i\/\d+)/.test($.tb.location.getHref())?this._options.page="index":/^\w+:\/\/[^\/]+\/tb\/picture\/(index\.html?)/.test($.tb.location.getHref())?this._options.page="picture_index":"itieba3"==PageData.product&&(this._options.page="itieba"))},_initDlg:function(){var t=this._createDlgHtml();new $.dialog({html:t,title:"\u8bf7\u8f93\u5165\u60a8\u8981\u627e\u7684\u5185\u5bb9",width:482}),this._jq_wrap=$("#"+this._DLG_ID),this._jq_input=this._jq_wrap.find(".j_kw"),this._jq_form=this._jq_wrap.find(".j_form"),this._bindEvents()},_bindEvents:function(){var t=this;t._jq_form.bind("submit",function(){return t.submit(),!1}),t._jq_input.focus()},_formSubmitHandler:function(){var t=this._getSearchType(),e=this._jq_input.val();return this.handleSubmit(t,e)},submit:function(){var t=this.getSearchWord();switch(this._options.defaultType){case"post":this._searchHandler.searchPost(t);break;case"benba":this._searchHandler.searchPostInBa(t,this._options.forumName)}return!1},getSearchWord:function(){var t=this._jq_input.val();return t=t.replace(/(^[\s\t\xa0\u3000]+)|([\u3000\xa0\s\t]+$)/g,"")},_getSearchType:function(){var t=CommonSearch.SearchConfig.searchTypes.tieba,e=this._jq_wrap.find("input:checked").tbattr("class"),s=CommonSearch.SearchConfig.radioClasses;for(var i in s)if(s[i]==e){t=CommonSearch.SearchConfig.searchTypes[i];break}return t},_createDlgHtml:function(){var t='<div id="'+this._DLG_ID+'" class="search_dialog_bright"><form name="f1" class="j_form"  action="/f"><input autocomplete="off" size="42" tabindex="1" name="kw" class="j_kw s_ipt tb_header_search_input" maxlength="100" /><span class="s_btn_wr">';return t+="post"===this._options.defaultType?'<input type="submit" value="\u8d34\u5427\u641c\u7d22" class="j_submit s_btn" onmousedown="this.className=\'s_btn s_btn_h\'" onmouseout="this.className=\'s_btn\'" /></span></form>':'<input type="submit" value="\u5427\u5185\u641c\u7d22" class="j_submit s_btn" onmousedown="this.className=\'s_btn s_btn_h\'" onmouseout="this.className=\'s_btn\'" /></span></form>',t+="</div>"}}});_.Module.define({path:"search/widget/search_logic",requires:["search/widget/searchDialog","search/widget/searchHandler","search/widget/suggestion"],sub:{_jq_wrap:null,_jq_input:null,_jq_input_box:null,_jq_form:null,_options:{defaultType:"tieba",style:"",forumName:"",page:null},_tip:null,_searchHandler:null,_switchRadios:{},_radioClasses:{tieba:"jointb",itieba:"authortb",post:"searchtb",benba:"nowtb",tag:"searchtag",forum:"searchforum"},_searchTypes:{tieba:1,itieba:2,post:3,benba:4,tag:5,forum:6},_searchFixed:null,initial:function(e,t){var i=this.requireInstance("tbui/widget/http_transform"),s=$(".j_search_nav").find("a[param=wd]");if(i.httpLinkHover(s),this._jq_wrap=e,this._jq_form=e.find(".j_search_form"),this._jq_input=e.find("#wd2"),this._jq_input_box=e.find(".j_search_input"),this._tip=PageUnit.load("search_input_tip"),this._searchFixed=t.searchFixed,this._searchWrapper=e.find(".search_main"),this._sugOn=t.sugOn,$.extend(this._options,t),this._initOptPage(),this._searchHandler=this.use("search/widget/searchHandler"),this._setSwitchRadios(),this._setDefaultType(),this._setSearchType(this._options.defaultType),this._initPlaceholder(),this._bindEvents(),$.browser.msie&&parseInt($.browser.version)<=7)return!1;if(this._searchScrollFixed(),"1"==this._sugOn){var t={input:this._jq_input_box,forumName:t.forumName,searchFixed:t.searchFixed,fixWrapper:this._searchWrapper};this.use("search/widget/suggestion",t)}else{var t={input:this._jq_input_box,forumName:t.forumName,searchFixed:t.searchFixed,fixWrapper:this._searchWrapper};this.use("search/widget/suggestion",t)}},_setSwitchRadios:function(){var e=this;for(var t in this._searchTypes)this._switchRadios[t]=e._jq_wrap.find(".switch_radios ."+e._radioClasses[t]+":first")},_setDefaultType:function(){var e=$.tb.location.getHref();-1!=e.indexOf("/f/search/fm")?this._options.defaultType="forum":-1!=e.indexOf("/f/search/res")?this._options.defaultType="post":-1!=e.indexOf("/f/search/sure")&&(this._options.defaultType="itieba"),"bright_3"==this._options.style&&(this._options.defaultType="benba")},_getSearchType:function(){var e=null;if("pb"===this._options.product)return e=this._searchTypes.benba;e=this._searchTypes.tieba;for(var t in this._switchRadios){var i=this._switchRadios[t];if(i.tbattr("checked")){e=this._searchTypes[t];break}}return e},_setSearchType:function(e){e in this._switchRadios&&("2"==this._searchTypes[e]&&this._switchRadios.tieba.tbattr("checked",!1),this._switchRadios[e].tbattr("checked",!0))},_bindEvents:function(){var e=this;this._jq_wrap.find("#search_button").on("click",function(){"frs"===e._options.product?$.stats.track("FRS_\u53f3\u4fa7\u4e0a\u65b9\u5c0f\u56fe","PC\u7aef\u5546\u4e1a\u5316\u6e38\u620f\u7edf\u8ba1",e._options.product||"","\u70b9\u51fb",{obj_url:"-",obj_name:"-",obj_type:"\u6e38\u620f"}):"pb"===e._options.product&&$.stats.track("PB_\u53f3\u4fa7\u4e0a\u65b9\u5c0f\u56fe","PC\u7aef\u5546\u4e1a\u5316\u6e38\u620f\u7edf\u8ba1",e._options.product||"","\u70b9\u51fb",{obj_url:"-",obj_name:"-",obj_type:"\u6e38\u620f"})}),this._jq_wrap.find(".j_search_nav a").click(function(){e._changeProduct($(this))}),this._jq_form.submit(function(){return"bright_3"==e._options.style||"bright_4"==e._options.style?e.handleSubmit(e._getSearchType(),e.getSearchWord()):e.submit(),!1}),this._jq_wrap.find(".j_enter_ba").click(function(){return e.submit("fromBtn"),!1}),this._jq_wrap.find(".j_search_post").click(function(){return"bright_3"==e._options.style||"bright_4"==e._options.style?e.handleSubmit(e._getSearchType(),e.getSearchWord()):e._searchPost.call(e),!1}),this._jq_wrap.find(".j_benba_search").click(function(){"pb"==e._options.page&&e.handleSubmit(e._getSearchType(),e.getSearchWord())}),this._jq_input_box.bind("webkitspeechchange",function(){e.submit()}),$.browser.webkit?this._jq_input_box.click(function(){this.select()}):this._jq_input_box.focus(function(){this.select()})},submit:function(e){var t=this.getSearchWord();return"me0407"===t?(this._jq_input_box.blur(),$.dialog.assert("\u6b64\u5427\u6682\u65f6\u4e0d\u80fd\u8bbf\u95ee\u54e6~"),!1):($("#searchtag").tbattr("checked")?this._searchHandler.searchTag(t):this._searchHandler.enterBa(t,e),!1)},handleSubmit:function(e,t){var i=!0;switch(e){case this._searchTypes.tieba:i=this._searchHandler.enterBa(t);break;case this._searchTypes.itieba:i=this._searchHandler.searchPeople(t);break;case this._searchTypes.post:i=this._searchHandler.searchPost(t);break;case this._searchTypes.benba:i=this._searchHandler.searchPostInBa(t,this._options.forumName);break;case this._searchTypes.tag:i=this._searchHandler.searchTag(t);break;case this._searchTypes.forum:i=this._searchHandler.searchForum(t);break;default:i=!0}return i},_initOptPage:function(){null==this._options.page&&(/^\w+:\/\/[^\/]+\/(index\.html?)|(i\/\d+)/.test($.tb.location.getHref())?this._options.page="index":/^\w+:\/\/[^\/]+\/tb\/picture\/(index\.html?)/.test($.tb.location.getHref())?this._options.page="picture_index":"itieba3"==this._options.product&&(this._options.page="itieba"))},_changeProduct:function(e){var t=this.getSearchWord(),i=$.tb.unescapeHTML(e.tbattr("href")),s=$.tb.unescapeHTML(e.tbattr("param"));if($.stats.track(e.text(),"pc\u7aef\u8d34\u5427tab\u9875\u5bfc\u51fa\u7edf\u8ba1",this._options?this._options.product:"","\u70b9\u51fb"),""==t){var a=i.match(/^(\w+:\/\/[^\/]+)/i),r=i.match(/fr=[^&]+/i),_=[],h="";null!=r&&r.length>0&&_.push(r[0]),_.length>0&&(h="/?"+_.join("&")),e.tbattr("href",a&&a[1]+h)}else if(null!=s&&""!=s){if(i.indexOf("www.baidu.com")>=0){var n="fr=tb01000&";$.tb.location.getHref().match("ftype=guide")&&(n="fr=tb01se0&");var o=i.indexOf("fr=");o>-1?e.tbattr("href",i.substring(0,o)+n):e.tbattr("href",i+n)}var c=e.tbattr("ie");t=null!=c&&null!=c.match(/utf-?8/gi)?encodeURIComponent(t):t.replace(/\%/gi,"%25").replace(/&/gi,"%26").replace(/\+/gi,"%2B").replace(/[\ \u3000]/gi,"%20").replace(/\//gi,"%2F").replace(/\#/gi,"%23").replace(/\=/gi,"%3D");var o=i.indexOf(s+"=");o>-1?e.tbattr("href",i.substring(0,o)+s+"="+t):e.tbattr("href",i+s+"="+t)}},_searchPost:function(){var e=this.getSearchWord();if("me0407"===e)return $.dialog.assert("\u6b64\u5427\u6682\u65f6\u4e0d\u80fd\u8bbf\u95ee\u54e6~"),void 0;var t=$.extend({},this._options);t.defaultType="post",""==e?this.requireInstance("search/widget/searchDialog",t):this._searchHandler.searchPost(e)},_initPlaceholder:function(){var e=this;$.inArray(e._options.page,["index","picture_index","itieba"])?"0"==e._tip&&_.Module.use("search/widget/Placeholder",[e._jq_input_box,e._tip,{color:"#bbb","font-size":"13px"}]):e._jq_input.bind("mousedown focus",function(){e._jq_input.val()===e._tip&&(e._jq_input.val(""),e._jq_input_box.val(""))})},_voiceInput:function(){var e=this.getSearchWord(),t=e.indexOf(this._tip);0===t&&(e=e.slice(this._tip.length),this._jq_input.val(e),this._jq_input_box.val(e)),this.submit()},getSearchWord:function(){return this._jq_input_box.val()},isDefaultTip:function(){return this._jq_input_box.val()===this._tip&&this._jq_input_box.hasClass("s_ipt_tip")||""===this._jq_input_box.val()},_searchScrollFixed:function(){if(this._searchFixed){var e=$("#head").find(".search_main"),t=$(".search_main").offset().top,i=$(".app_forum_top_nav").length>0?!0:!1;if(!i){var s=!1;$(window).scroll(function(){setTimeout(function(){var i=$(window).scrollTop();if(i>t){if(s)return;e.addClass("search_main_fixed").hide(),e.fadeIn(100),e.find(".search_form").addClass("search_form_fixed"),e.find(".search_ipt").addClass("search_ipt_fixed"),e.find(".search_btn").addClass("search_btn_fixed"),e.find(".search_btn_enter_ba").addClass("search_btn_enter_ba_fixed"),e.find("#search_logo_small").addClass("search_logo_fixed"),e.find("#tb_header_search_form").addClass("j_search_form_fixed"),$("#search_logo_small").addClass("search_logo_fixed"),$("#search_logo_large").hide(),$("#tb_header_search_form").addClass("j_search_form_fixed"),s=!0}else{if(!s)return;$(".senior-search-link").css({visibility:"visible"}),$("#search_baidu_promote").show(),$("#search_button_wrapper").show(),e.removeClass("search_main_fixed"),e.find(".search_form").removeClass("search_form_fixed"),e.find(".search_ipt").removeClass("search_ipt_fixed"),e.find(".search_btn").removeClass("search_btn_fixed"),e.find(".search_btn_enter_ba").removeClass("search_btn_enter_ba_fixed"),e.find("#search_logo_small").removeClass("search_logo_fixed"),$("#search_logo_large").show(),e.find("#tb_header_search_form").removeClass("j_search_form_fixed"),s=!1}},1)})}}}}});