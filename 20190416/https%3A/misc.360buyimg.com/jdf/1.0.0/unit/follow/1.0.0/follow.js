/* jdf-1.0.0/ follow.js Date:2019-04-10 15:05:10 */
define("//misc.360buyimg.com/jdf/1.0.0/unit/follow/1.0.0/follow.js",["//misc.360buyimg.com/jdf/1.0.0/unit/login/1.0.0/login.js","//misc.360buyimg.com/jdf/1.0.0/ui/dialog/1.0.0/dialog.js"],function(require,a){var c=require("//misc.360buyimg.com/jdf/1.0.0/unit/login/1.0.0/login.js");require("//misc.360buyimg.com/jdf/1.0.0/ui/dialog/1.0.0/dialog.js");function e(a,b,c){f(a,b,c)}function f(a,b,c){a.live("click",function(a){a.preventDefault();var d=$(this);var e=d.attr("data-id");g(e,b,c)})}function g(a,b,d){if(!a)return!1;var e="//t.jd.com/product/followProduct.action?productId="+a+"&t="+Math.random();d&&$.isPlainObject(d)||(d={isShowInfo:!0}),b=b||function(){},c({clstag1:"login|keycount|5|3",clstag2:"login|keycount|5|4",id:a,modal:!0,complete:function(){d.isShowInfo?$("body").dialog({title:"\u63d0\u793a",width:530,height:440,type:"iframe",autoIframe:!1,fixed:!($.browser.msie&&6==$.browser.version),source:e,mainId:"attboxr",contentId:"attconr",onReady:b}):((new Image).src=e,b())}})}function h(a,b){var c=a||[];b=b||function(){},$.ajax({url:"//fts.jd.com/follow/product/batchIsFollow?",data:{productIds:c.join(","),sysName:"misc"},dataType:"jsonp",success:function(a){function c(a){for(var c in a)a.hasOwnProperty(c)&&b(c,a[c])}a&&a.success&&c(a.data)}})}a.init=e,a.add=g,a.check=h});