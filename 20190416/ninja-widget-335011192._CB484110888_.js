!function a(b,c,d){function e(g,h){if(!c[g]){if(!b[g]){var i="function"==typeof require&&require;if(!h&&i)return i(g,!0);if(f)return f(g,!0);var j=new Error("Cannot find module '"+g+"'");throw j.code="MODULE_NOT_FOUND",j}var k=c[g]={exports:{}};b[g][0].call(k.exports,function(a){var c=b[g][1][a];return e(c?c:a)},k,k.exports,a,b,c,d)}return c[g].exports}for(var f="function"==typeof require&&require,g=0;g<d.length;g++)e(d[g]);return e}({1:[function(a,b,c){"use strict";a(3),a(4),a(2)},{2:2,3:3,4:4}],2:[function(a,b,c){"use strict";!function(a,b){var c=50,d=!1,e=function(b){a(b).shoveler({height:"auto",paginate:!1,itemsPerShovel:1,width:"auto",autoScroll:!0,autoScrollInterval:5,resumeAutoScroll:!1,touch:d,buttons:{background:"",opacity:1,padding:"0",cursor:"pointer",height:c,position:"absolute","text-align":"center",top:"50%",width:c,left:{"border-radius":"0",leftPos:0,text:""},right:{"border-radius":"0",rightPos:0,text:""}}})};a.fn.shoveler&&a(".ninja_rotator:not(.shovelerContainer)").each(function(){e(this)})}(jQuery,window)},{}],3:[function(a,b,c){"use strict";!function(a,b,c,d){function e(a){if(null===a)throw new Error;this.$el=a}b.imdb=b.imdb||{},b.imdb.ShovelerContainerView=e,a.extend(e.prototype,{_firstChild:function(){return this.$el.children().first()},childrenWidth:function(){return this._firstChild().width()},childrenHeight:function(){return this._firstChild().height()},childrenCount:function(){return this.$el.children().length}})}(jQuery,window,document)},{}],4:[function(a,b,c){"use strict";!function(a,b,c,d){b.imdb=b.imdb||{},b.imdb.ShovelerButton=function(b){var c=b.direction.charAt(0).toUpperCase()+b.direction.slice(1);this._direction=b.direction,this._name="$shove"+this._direction,this._$el=a('<div class="shove'+c+' shovelerButton">'+b.content+"</div>"),this._clickcallback=b.clickcallback,b.css&&(this._$el.css(b.css),this._opacity=b.css.opacity,this._setcss=!0),this._$el.hover(a.proxy(this._mouseover,this),a.proxy(this._mouseleave,this)).click(a.proxy(this._click,this)).mousedown(a.proxy(this._mousedown,this)).mouseup(a.proxy(this._mouseup,this))},b.imdb.ShovelerButton.prototype.getElement=function(){return this._$el},b.imdb.ShovelerButton.prototype.isEnabled=function(){return!this._$el.hasClass("disabled")},b.imdb.ShovelerButton.prototype.disableButton=function(){this._$el.addClass("disabled")},b.imdb.ShovelerButton.prototype.enableButton=function(){this.isEnabled()||this._$el.removeClass("disabled hover mousedown")},b.imdb.ShovelerButton.prototype._mouseover=function(){this._$el.hasClass("disabled")||(this._$el.addClass("hover"),this._setcss&&this._$el.css({opacity:1}))},b.imdb.ShovelerButton.prototype._mouseleave=function(){this._$el.removeClass("hover"),this._$el.removeClass("mousedown"),this._setcss&&this._$el.css({opacity:this._opacity})},b.imdb.ShovelerButton.prototype._click=function(){this.isEnabled()&&setTimeout(this._clickcallback,1)},b.imdb.ShovelerButton.prototype._mousedown=function(){this.isEnabled()&&this._$el.addClass("mousedown")},b.imdb.ShovelerButton.prototype._mouseup=function(){this._$el.addClass("mousedown")},b.imdb.ShovelerAutoScroll=function(a){this._intervalTimer=null,this._intervalMilliseconds=1e3*a.seconds,this._autoscrollcallback=a.autoscrollcallback},b.imdb.ShovelerAutoScroll.prototype.isAutoscrollOn=function(){return this._intervalTimer!==d},b.imdb.ShovelerAutoScroll.prototype.startAutoScroll=function(){this.stopAutoScroll(),this._intervalTimer=setInterval(a.proxy(this._doAutoScroll,this),this._intervalMilliseconds)},b.imdb.ShovelerAutoScroll.prototype.stopAutoScroll=function(){this.isAutoscrollOn()&&(clearInterval(this._intervalTimer),this._intervalTimer=d)},b.imdb.ShovelerAutoScroll.prototype._doAutoScroll=function(){this.isAutoscrollOn()&&setTimeout(this._autoscrollcallback,1)},b.imdb.Shoveler=function(b,c){var d=a(b),e={buttons:{background:"rgb(177, 177, 177)","font-size":14,color:"#fff",cursor:"pointer",height:20,opacity:.5,padding:"40px 0",position:"absolute","text-align":"center",top:50,width:30,left:{"border-radius":"0 5px 5px 0",leftPos:-12,text:"&lt;",url:null},right:{"border-radius":"5px 0 0 5px",rightPos:-12,text:"&gt;",url:null}},curPage:1,fetchCallback:null,fetchPageNum:null,itemsPerShovel:null,moveCallback:null,paginate:!0,paginator:{"background-color":"#ccc","background-color:selected":"#666","border-radius":4,cursor:"pointer",display:"inline-block",height:8,margin:4,position:"relative",width:8},redrawCallback:null,scrollSpeed:250,touch:!1,useExternalCSS:!1,hammerOptions:{},autoScroll:!1,autoScrollInterval:8,resumeAutoScroll:!1},f=d.data("plugin-options");this._$el=d,this._settings={},this._view=null,this._isDragging=!1,this._buttonLeft=null,this._buttonRight=null,this._init(e,c,f)},b.imdb.Shoveler.prototype._init=function(c,d,e){this._settings=a.extend(!0,{},c,d,e),(this._settings.buttons||this._settings.paginate)&&this._$el.wrap('<div class="shovelerControls" style="padding:0;position:relative;" />'),this._$el.addClass("shovelerContainer"),this._view=new b.imdb.ShovelerContainerView(this._$el),this._calcKids(),this._buttonLeft=this._createButton("left"),this._buttonRight=this._createButton("right"),this._draw(),this._touch(),this._initAutoScroll()},b.imdb.Shoveler.prototype._initAutoScroll=function(){if(this._settings.autoScroll){if(this._autoscroll=new b.imdb.ShovelerAutoScroll({seconds:this._settings.autoScrollInterval,autoscrollcallback:a.proxy(this._autoScrollCallback,this)}),this._$el.bind("mousedown",a.proxy(this._stopAutoScroll,this)),this._isTouchEnabled()){var c=this._settings.hammerOptions;this._$el.children(":not(.shovelerButton)").each(function(){a(this).hammer(c).on("tap doubletap",a.proxy(this._stopAutoScroll,this))})}this._autoscroll.startAutoScroll()}},b.imdb.Shoveler.prototype._autoScrollCallback=function(){this._settings.inMotion||this._isDragging||(this._settings.curPage===this._settings.totalPages?this.moveToPage(1):this.moveLeft())},b.imdb.Shoveler.prototype._resumeAutoScroll=function(){this._settings.autoScroll&&this._settings.resumeAutoScroll&&this._startAutoScroll()},b.imdb.Shoveler.prototype._stopAutoScroll=function(){this._settings.autoScroll&&this._autoscroll.stopAutoScroll()},b.imdb.Shoveler.prototype._calcKids=function(){this._settings.kidCount=this._view.childrenCount(),this._settings.kidH=this._view.childrenHeight(),this._settings.kidW=this._view.childrenWidth()},b.imdb.Shoveler.prototype._createButton=function(c){if(this._settings.buttons){var e=(c.charAt(0).toUpperCase()+c.slice(1),{background:this._settings.buttons.background,"border-radius":this._settings.buttons[c]["border-radius"],color:this._settings.buttons.color,cursor:this._settings.buttons.cursor,height:this._settings.buttons.height,"font-size":this._settings.buttons["font-size"],opacity:this._settings.buttons.opacity,padding:this._settings.buttons.padding,position:this._settings.buttons.position,"text-align":this._settings.buttons["text-align"],top:this._settings.buttons.top,width:this._settings.buttons.width});e[c]=this._settings.buttons[c][c+"Pos"];var f={direction:c,content:this._settings.buttons[c].url||this._settings.buttons[c].text,clickcallback:a.proxy(this._buttonClick,this,c),css:this._settings.useExternalCSS?d:e},g=new b.imdb.ShovelerButton(f);return"left"===c&&g.disableButton(),this._$el.parent().append(g.getElement()),g}},b.imdb.Shoveler.prototype._buttonClick=function(a){this._settings.inMotion||(this._stopAutoScroll(),"left"===a?this.moveRight():this.moveLeft(),this._resumeAutoScroll())},b.imdb.Shoveler.prototype._draw=function(){var c,f,g,h,i,j,k=1,l=1;if(this._settings.itemsPerShovel&&this._settings.curPage&&(c=(this._settings.curPage-1)*this._settings.itemsPerShovel+1),this._$el.css({display:"block",height:this._settings.height||this._settings.kidH,"line-height":this._settings.lineHeight||"inherit",overflow:"hidden",position:"relative","white-space":"nowrap",width:this._settings.width||this._$el.parent().width(),"word-wrap":"normal"}),this._settings.shovW=this._$el.width(),this._settings.itemsPerShovel=this._settings.itemsPerShovel||Math.floor(this._settings.shovW/this._settings.kidW),this._settings.totalPages=Math.ceil(this._settings.kidCount/this._settings.itemsPerShovel),g=this._settings.shovW-this._settings.kidW*this._settings.itemsPerShovel,(g>=this._settings.itemsPerShovel||this._settings.itemsPerShovel<=1)&&(h=Math.floor(g/this._settings.itemsPerShovel),i=g%this._settings.itemsPerShovel),j=this._settings.itemsPerShovel,this._$el.contents().each(function(){var b,c,e,f=a(this);return 3===this.nodeType?(f.remove(),!0):(f.css({display:"inline-block","vertical-align":"top"}),1===j?g%2===0?c=g/2:(c=Math.floor(g/2)+g%2,b=Math.floor(g/2)):(k===j*l&&(h+=i),h%2===0?c=h/2:(b=Math.floor(h/2)+h%2,c=Math.floor(h/2))),c!==d&&(e="0 "+c+"px",b!==d&&(e=e+" 0 "+b+"px"),f.css({margin:e})),f.addClass("shovelerItem"),k%j===0&&l++,void k++)}),this._$el.children(".shovelerSpaceHolder").remove(),f=this._settings.itemsPerShovel*this._settings.totalPages-this._settings.kidCount)for(var m=0;f>m;m++){var n=a('<span class="shovelerSpaceHolder" />').css({display:"inline-block",height:this._settings.height||this._settings.kidH,margin:"0 "+h+"px",width:this._settings.kidW});this._$el.append(n)}this._paginatorCreate(),this._paginatorSync(c);var o=this;a(b).bind("orientationchange",function(){e(a.proxy(o._onOrientationChange,o),500,"orientationchanged")})},b.imdb.Shoveler.prototype._onOrientationChange=function(){"function"==typeof this._settings.redrawCallback&&this._settings.redrawCallback.apply(this),this._$el.parent().width()!==this._settings.shovW&&(this._calcKids(),this._draw())},b.imdb.Shoveler.prototype._fetchMore=function(){"function"!=typeof this._settings.fetchCallback||"number"==typeof this._settings.fetchPageNum&&this._settings.curPage!==this._settings.fetchPageNum||"function"==typeof this._settings.fetchPageNum&&this._settings.curPage!==this._settings.fetchPageNum()||!this._settings.fetchPageNum&&this._settings.curPage!==this._settings.totalPages||(this._settings.fetchCallback.apply(this),this._fetchMoreRedraw())},b.imdb.Shoveler.prototype._fetchMoreRedraw=function(){this._calcKids(),this._draw()},b.imdb.Shoveler.prototype._paginatorCreate=function(){var b,c,d,e=this;if(this._settings.paginate){for(this._$el.parent().children(".shovelerPaginator").remove(),b=a("<div />").addClass("shovelerPaginator"),c=0;c<this._settings.totalPages;c++)d=a('<span data-page="'+(c+1)+'" />').addClass("shovelerBullet"),this._settings.useExternalCSS||d.css(this._settings.paginator),b.append(d),d.on("click",function(a){e._callbackBulletClick(a)});this._$el.parent().append(b)}},b.imdb.Shoveler.prototype._callbackBulletClick=function(b){var c=a(b.target),d=c.data("page");this._settings.inMotion||this._moveToPage(d)},b.imdb.Shoveler.prototype._paginatorSync=function(a){var b,c=Math.ceil(a/this._settings.itemsPerShovel);this._settings.paginate?(b=this._$el.parent().children(".shovelerPaginator"),b.children(".shovelerBullet").css("background-color",this._settings.paginator["background-color"]).removeClass("currentPage"),a?this.moveToPage(c):b.children('.shovelerBullet[data-page="'+this._settings.curPage+'"]').css("background-color",this._settings.paginator["background-color:selected"]).addClass("currentPage")):a&&this.moveToPage(c)},b.imdb.Shoveler.prototype._returnToZero=function(){0!==this._$el.css("left")&&this._animateLeft(0)},b.imdb.Shoveler.prototype._animateScrollLeft=function(a,b){this._$el.stop().animate({scrollLeft:a},b!==d?b:this._settings.scrollSpeed)},b.imdb.Shoveler.prototype._animateLeft=function(a,b){this._$el.stop().animate({left:a},b!==d?b:this._settings.scrollSpeed)},b.imdb.Shoveler.prototype._isTouchEnabled=function(){if(this._settings.touch){if("function"==typeof a.fn.hammer)return!0;a.error("jQuery.shoveler.js touch capabilities require Hammer.js"),this._settings.touch=!1}return!1},b.imdb.Shoveler.prototype._touch=function(){var a=this;this._isTouchEnabled()&&this._$el.hammer(this._settings.hammerOptions).on("panend panright panleft",function(b){a._touchCallback(b)})},b.imdb.Shoveler.prototype._touchCallback=function(a){a.preventDefault();var b=this._settings.shovW*(this._settings.curPage-1);switch(this._stopAutoScroll(),a.type){case"panright":this._isDragging=!0,(1!=this._settings.curPage||a.gesture.deltaX<=0&&1==this._settings.curPage)&&this._animateScrollLeft(b-a.gesture.deltaX,1);break;case"panleft":this._isDragging=!0,(this._settings.curPage!=this._settings.totalPages||a.gesture.deltaX>=0&&this._settings.curPage==this._settings.totalPages)&&this._animateScrollLeft(b-a.gesture.deltaX,1);break;case"panend":this._isDragging=!1,this._returnToZero(),Math.abs(a.gesture.deltaX)>=.2*this._settings.shovW?a.gesture.angle>-90&&a.gesture.angle<90?this.moveRight():this.moveLeft():this.moveToPage(this._settings.curPage)}setTimeout(this._resumeAutoScroll(),10)},b.imdb.Shoveler.prototype.moveLeft=function(){this._settings.curPage===this._settings.totalPages?this.moveToPage(1):this.moveToPage(this._settings.curPage+1)},b.imdb.Shoveler.prototype.moveRight=function(){1===this._settings.curPage?this.moveToPage(this._settings.totalPages):this.moveToPage(this._settings.curPage-1)},b.imdb.Shoveler.prototype.moveToPage=function(a){var b,c,d=this._settings.shovW*(a-1);this._settings.inMotion=!0,this._animateScrollLeft(d),this._settings.curPage=a,1===this._settings.itemsPerShovel&&(this._$el.children().removeClass("curItem"),this._$el.children(":nth-child("+a+")").addClass("curItem")),this._paginatorSync(),this._fetchMore(),"function"==typeof this._settings.moveCallback&&this._settings.moveCallback.apply(this),this._settings.inMotion=!1,b=this._settings.left,c=this._settings.right,1===this._settings.curPage?(this._buttonRight.enableButton(),this._buttonLeft.disableButton()):(this._buttonRight.enableButton(),this._buttonLeft.enableButton())},b.imdb.Shoveler.prototype.getElement=function(){return this._$el},b.imdb.Shoveler.prototype.getButtonLeft=function(){return this._buttonLeft.getElement()},b.imdb.Shoveler.prototype.getButtonRight=function(){return this._buttonRight.getElement()},a.fn.shoveler=function(c){return this.each(function(){var d=new b.imdb.Shoveler(this,c);a(this).data("shoveler",d)})};var e=function(){var a={};return function(b,c,d){d||(d=(new Date).getTime()),a[d]&&clearTimeout(a[d]),a[d]=setTimeout(b,c)}}()}(jQuery,window,document)},{}]},{},[1]);