KISSY.add("module/floatBox",function(a,b,c,d){function e(a){var b=this;e.superclass.constructor.call(b,a),this._init.apply(this,arguments)}return a.extend(e,d,{_init:function(a){var c=this;c.config=a,c.container=b.one(a.container||document.body),c.floats=c.container.all(a.floats),c.bind()},bind:function(){var a=this;b.one(window).on("scroll",a.scrollEventHandler()),window.onresize=function(){a.container.all(a.floats).css("width",a.container.width())}},initPlaceholder:function(a){if(a=b.one(a),!a.data("fixedPlaceholder")){var c=b.one('<div class="fixed-placeholder"></div>');c.css({height:0,"margin-top":0,overflow:"hidden",display:"none"}),a.after(c),a.data("fixedPlaceholder",c)}},scrollEventHandler:function(){var b=this;return function(){var c=[],d=[],e=null;b.container.all(b.config.floats).each(function(a){b.initPlaceholder(a),b.needFloat(a)?c.push(a):d.push(a)}),a.each(c,function(a){!e||b.lower(a,e)?(e&&d.push(e),e=a):d.push(a)}),a.each(d,function(a){b.relaxItem(a)}),e&&b.floatItem(e)}},lower:function(a,b){var c=a.data("floated"),d=a.data("fixedPlaceholder"),e=b.data("floated"),f=b.data("fixedPlaceholder");return(c?d.offset().top:a.offset().top)>(e?f.offset().top:b.offset().top)},needFloat:function(a){var b=this,d=a.data("floated"),e=a.data("fixedPlaceholder"),f=d?e.offset().top:a.offset().top,g=b.container.offset().top,h=c.scrollTop(),i=b.container.outerHeight();return h>f&&h<g+i},floatItem:function(b){if(!b.data("floated")){var d=b.height(),e=b.width(),f=c.scrollTop();b.css({"z-index":999,width:e,opacity:.98}),a.UA.ie<=6?(b.css({top:f,position:"absolute"}),b.children(".big-button-wrap").css({height:"70px","line-height":"70px"})):(b.css({position:"fixed",top:0}),b.children(".big-button-wrap").css({height:"70px","line-height":"70px"}),b.addClass("header-fixed")),b.data("fixedPlaceholder").height(d).show(),b.data("floated",!0)}},relaxItem:function(a){a.data("floated")&&(a.css({position:"relative",opacity:1}),a.children(".big-button-wrap").css({height:"70px","line-height":"70px"}),a.removeClass("header-fixed"),a.data("fixedPlaceholder").height(0).hide(),a.data("floated",!1))}},{ATTRS:{}}),e},{requires:["node","dom","base"]});