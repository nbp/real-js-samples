/*!Name: event.js
 * Date: 2019-4-4 18:53:56 */
define("MOD_ROOT/common/tools/event",function(require,exports,module){function t(){this._listeners={}}t.prototype={constructor:t,addListener:function(t,e){void 0===this._listeners[t]&&(this._listeners[t]=[]),this._listeners[t].push(e)},fire:function(t){if("string"==typeof t&&(t={type:t}),t.target||(t.target=this),!t.type)throw new Error("Event object missing 'type' property.");if(this._listeners[t.type]instanceof Array)for(var e=this._listeners[t.type],i=0,n=e.length;i<n;i++)e[i].call(this,t)},removeListener:function(t,e){if(this._listeners[t]instanceof Array)for(var i=this._listeners[t],n=0,s=i.length;n<s;n++)if(i[n]===e){i.splice(n,1);break}}},module.exports.Event=window.pageConfig.eventTarget=new t});
/*!Name: tools.js
 * Date: 2019-4-4 18:53:56 */
define("MOD_ROOT/common/tools/tools",function(require,exports,module){var t=function(){var t=readCookie("ipLoc-djd"),e={areaIds:[1,72,2799,0],commonAreaId:null};if(t){var i=t.indexOf(".");i>-1&&(e.commonAreaId=Number(t.substr(i+1)),t=t.substring(0,i)),e.areaIds=t.split("-");for(var n=0;n<e.areaIds.length;n++)e.areaIds[n]=Number(e.areaIds[n])}return e},e=function(t){var e="//p.3.cn/prices/mgets",i=readCookie("ipLoc-djd"),n=t.skus||[],r=t.loc||i,o=t.$el||$("body"),a=t.type||1,s=t.selector||".J-p-",c=t.text||"\uffe5{NUM}",l=t.pdbp||0,u=t.debug||!1,d=t.callback||function(){},f=t.onReady||function(){},h=t.priceData||[];if(!function(t){return"[object Array]"===Object.prototype.toString.call(t)}(n))throw new Error("Please give skus param with Array type.");if(n.length<1)return!1;r=i?r.replace(/-/g,"_"):1,u&&console.info(e+$.param({type:a,area:r,skuIds:"J_"+n.join(",J_")}));if(h.length>0)return m(h),!1;function m(t){var e,i;if(u&&console.info(t),t&&t.length)for(i=t.length,e=0;e<i;e++){if(!t[e].id)return!1;var n=t[e].id.replace("J_",""),r=parseFloat(t[e].p);parseFloat(t[e].m);r>0?o.find(s+n).html(c.replace("{NUM}",t[e].p)):o.find(s+n).html("\u6682\u65e0\u62a5\u4ef7"),"function"==typeof d&&d(n,t[e])}f(t)}$.ajax({url:e,data:{type:1,area:r,pdtk:readCookie("pdtk")||"",pduid:function(){var t=readCookie("__jda"),e="";return t&&t.indexOf(".")>-1&&(e=t.split(".")[1]),e}(),pdpin:readCookie("pin")||"",pin:decodeURIComponent(readCookie("pin"))||"",pdbp:l,skuIds:"J_"+n.join(",J_"),ext:"11100000",source:"item-pc"},cache:!0,dataType:"jsonp",success:function(t){m(t)}})},i=function(t){var e=t.loc||readCookie("ipLoc-djd")||"1_0_0",i=t.skus||[],n=t.$el||$("body"),r=(t.$target,t.selector||".J-ad-"),o=t.debug||!1,a=t.callback||function(){};$.ajax({url:"//ad.3.cn/ads/mgets",data:{skuids:"AD_"+i.join(",AD_"),areaCode:e},dataType:"jsonp",scriptCharset:"utf-8",success:function(t){var e,i,s,c=0;if(o&&console.log(t),t&&t.length>0)for(e=t.length,c;c<e;c++)i=t[c].ad,s=t[c].id.replace("AD_",""),n.find(r+s).html(i),a(s,t[c])}})},n=function(t){var e=t.skus||[],i=t.$el||$("body"),n=t.selector||".J-comm-",r=t.text||"(\u5df2\u6709{NUM}\u4eba\u8bc4\u4ef7)",o=t.debug||!1,a=t.callback||function(){},s=t.onlyData||!1;if(!$.isArray(e))throw new Error("Please give skus param with Array type.");$.ajax({url:"//club.jd.com/comment/productCommentSummaries.action?referenceIds="+e,dataType:"jsonp",success:function(t){var e,c;if(t&&t.CommentsCount.length){e=t.CommentsCount.length;for(var l=0;l<e;l++)c=i.find(n+t.CommentsCount[l].SkuId),s||(c.find(".star").removeClass("sa5").addClass("sa"+t.CommentsCount[l].AverageScore),c.html(r.replace("{NUM}",t.CommentsCount[l].CommentCountStr))),o&&console.log(c),a&&a(t.CommentsCount[l].SkuId,t.CommentsCount[l])}}})},r=function(t,e){var i=e||"data-src",n=t.find("img["+i+"]");n.length&&n.each(function(t){$(this).attr("src",$(this).attr(i)).removeAttr(i)})},o=function(t,e){for(var i=t.length/e,n=[],r=0;r<i;r++)n.push({tabs:[],increment:null,count:e,skuids:[]});for(var o=0,a=0;a<t.length;a++)a%e==0&&o++,n[o-1].tabs.push(t[a]),n[o-1].increment=o,t[a].wid&&n[o-1].skuids.push(t[a].wid);return n},a=function(){var t=readCookie("ipLoc-djd");return t?t.split("-"):[1,72,2799,0]},s=function(){var t=readCookie("__jda");return t?"-"==t.split(".")[1]?-1:t.split(".")[1]:-1},c=function(t){t=t||function(){},$.ajax({url:"//passport.jd.com/loginservice.aspx?method=Login",dataType:"jsonp",success:function(e){e.Identity&&t(e.Identity)}})};function l(t,e,i){this.milliseconds="number"==typeof t?t:0,this.callback="function"==typeof e?e:function(){},"number"==typeof inverval?this.interval=i:this.interval=1e3,this.start()}l.prototype={constructor:l,start:function(){var t=this,e=0,i=function(){e++;var n=+new Date,r=n-(t.stime+e*t.interval);if(r>1e4){var o=Math.floor(r/t.interval);e+=o,t.milliseconds-=o*t.interval}var a=t.interval-r;a<0&&(a=0),t.callback.call(t,t.format(t.milliseconds/1e3)),t.milliseconds-=t.interval,t.milliseconds<0?clearTimeout(t.timer):t.timer=setTimeout(i,a)};return this.milliseconds>=0&&(this.stime=+new Date,this.timer=setTimeout(i,this.interval)),this},stop:function(){return this.timer&&clearTimeout(this.timer),this},format:function(t){return t="number"==typeof t&&t>=0?t:0,{d:Math.floor(t/86400),h:Math.floor(t%86400/3600),m:Math.floor(t%86400%3600/60),s:Math.floor(t%86400%3600%60)}}};var u=function(t,e,i){var n=null,r=null;return function(){var o=+new Date;r||(r=o),o-r>i?(t(),r=o):(clearTimeout(n),n=setTimeout(function(){t()},e))}},d=function(t,e){return(new Array(t).join("0")+e).slice(-t)},f=function(t,e,i,n){n=n||"\\d*";var r=new RegExp(e+"="+n,"gi"),o="";if(!i)return t;if(t.indexOf(e+"=")>-1)o=t.replace(r,e+"="+i);else{o=t+(t.indexOf("?")<0?"?":"&")+e+"="+i}return o},h={itemUrl:function(t){return t?"//item.jd.com/"+t+".html":""},imgDomain:function(t){var e=[10,11,12,13,14],i=e[t%5];return t&&i?"//img"+i+".360buyimg.com/":""}};function m(t,e,i){this.mode="",this.receivers={},this.actions={failure:function(){},success:function(){}},this.setConditionMode(t),this.addReceiver(e),this.addAction(i)}m.prototype={constructor:m,addReceiver:function(t,e,i,n,r){if("string"==typeof t){if(this.receivers.hasOwnProperty(t))throw"I had this receiver.";this.receivers[t]={onTrue:e,onFalse:i,signal:!!n,data:r}}else if({}.toString()==={}.toString.call(t))for(var o in t)if(t.hasOwnProperty(o)){var a=t[o];if({}.toString()!=={}.toString.call(a))throw"I need a Map Structure.";this.addReceiver(o,a.onTrue,a.onFalse,!!a.signal,a.data)}return this},addAction:function(t,e){if("function"==typeof t){if(!this.actions.hasOwnProperty(e))throw"I do't have this status.";this.actions[e]=t}else if({}.toString()==={}.toString.call(t))for(var i in t)this.addAction(t[i],i);return this},callReceiverAction:function(t){if(!this.receivers.hasOwnProperty(t))throw"I do't have this receiver.";var e=this.receivers[t],i=e.data;e.signal?"function"==typeof e.onTrue&&e.onTrue(i):"function"==typeof e.onFalse&&e.onFalse(i)},callActions:function(){var t,e=[];for(var i in this.receivers)this.receivers.hasOwnProperty(i)&&e.push(+this.receivers[i].signal);"AND"===this.mode?t=-1===e.join("").indexOf(0):"OR"===this.mode&&(t=-1!==e.join("").indexOf(1)),t?this.actions.success():this.actions.failure()},emit:function(t,e,i){if(!this.receivers.hasOwnProperty(t))throw"I do't have this receiver";this.receivers[t].signal=!!e,this.receivers[t].data=i,this.callReceiverAction(t),this.callActions()},setConditionMode:function(t){if("string"!=typeof t)throw'I need a string, it only can be "AND" or "OR".';if("AND"===(t=t.toUpperCase()))this.mode="AND";else{if("OR"!==t)throw"Invalid string.";this.mode="OR"}}},m.globalConditionTrigger=new m("OR"),exports.ConditionTrigger=m,exports.commentMeta=n,exports.priceNum=e,exports.adWords=i,exports.triggerLazyImg=r,exports.reBuildJSON=o,exports.getAreaIds=a,exports.getAreaId=t,exports.checkLogin=c,exports.getUUID=s,exports.Countdown=l,exports.throttle=u,exports.prefix=d,exports.addUrlParam=f,exports.modifier=h});
/*!Name: core.js
 * Date: 2019-4-4 18:53:50 */
define("MOD_ROOT/common/core",function(require,exports,module){var r={},e=pageConfig.product;r.sku=e.skuid,r.cat=e.cat,r.url=e.href,r.src=e.src,r.pType=e.pType,r.name=e.name,r.mdPerfix=1==e.pType?"CR":"GR",r.mbPerfix=1==e.pType?"3C":"GM",r.mp=e.mp,r.jp=e.jp,r.orginSku=pageConfig.product.orginSkuid||r.sku,r.wideVersion=pageConfig.wideVersion&&pageConfig.compatible,r.itemDisabled=e.isOver,r.isPOPSku=function(r){return r>=1e9&&r<=1999999999||r>=10000000001&&r<=99999999999};var t=r.sku;r.isPop=r.isPOPSku(t),r.isFCS=e.fcs,r.isJd=!!r.isFCS||!r.isPop,r.isSelf=r.isJd,r.is3C=652==r.cat[0]||670==r.cat[0]||737==r.cat[0]||9987==r.cat[0],r.isCellphone=655==r.cat[2]||6881==r.cat[2]||6882==r.cat[2],r.isCompleteMachine=670==r.cat[0],r.isVideo=652==r.cat[0],r.isPopBook=r.isPop&&1713==r.cat[0],r.isSelfBook=t>=1e7&&t<=19999999||t>=110000000001&&t<=139999999999,r.isBook=r.isPopBook||r.isSelfBook,r.isPopMvd=r.isPop&&(4051==r.cat[0]||4052==r.cat[0]||4053==r.cat[0]),r.isSelfMvd=t>=2e7&&t<=29999999||t>=140000000001&&t<=149999999999,r.isMvd=r.isPopMvd||r.isSelfMvd,r.disableAddToCart=$("#InitCartUrl").hasClass("btn-disable"),r.isArray=function(r){return"[object Array]"===Object.prototype.toString.call(r)},r.isObject=function(r){return"[object Object]"===Object.prototype.toString.call(r)},r.isEmptyObject=function(r){var e;for(e in r)return!1;return!0},r.isNothing=function(e){return r.isArray(e)?e.length<1:!e},r.getRandomArray=function(r,e){return e=e||1,r.sort(function(){return Math.random()-.5}),r.slice(0,e)},r.toFixed=function(r,e){var t=Math.pow(10,e+1),n=Math.round(r*t).toString(),i=n.length-1;return n=n.substr(0,i),[n.substr(0,i-e),n.substr(-e)].join(".")},r.originBuyUrl=$("#InitCartUrl").attr("href"),r.formatPrice=function(r){var e=parseFloat(r);return isNaN(e)||e<=0?"\u6682\u65e0\u62a5\u4ef7":e.toFixed(2)},r.discount=function(r,e,t){if(t=t||"[{num}\u6298]",void 0!==r&&void 0!==e){if(r=parseFloat(r),e=parseFloat(e),!r||!e)return"";var n=Math.ceil((r/e*100).toFixed(1));return n?t.replace("{num}",parseFloat(n/10)):""}},r.triggerLazyImg=function(r,e){r.find("img").each(function(){var r=$(this),t=r.attr(e);r.attr("src")||(r.attr("src",t),r.removeAttr(e),r.removeClass("err-product loading-style2"))})},r.getNewUserLevel=function(r){switch(r){case 50:return"\u6ce8\u518c\u7528\u6237";case 56:return"\u94dc\u724c\u7528\u6237";case 59:return"\u6ce8\u518c\u7528\u6237";case 60:case 61:return"\u94f6\u724c\u7528\u6237";case 62:return"\u91d1\u724c\u7528\u6237";case 63:return"\u94bb\u77f3\u7528\u6237";case 64:return"\u7ecf\u9500\u5546";case 110:return"VIP";case 66:return"\u4eac\u4e1c\u5458\u5de5";case-1:return"\u672a\u6ce8\u518c";case 88:return"\u94bb\u77f3\u7528\u6237";case 90:return"\u4f01\u4e1a\u7528\u6237";case 103:case 104:case 105:return"\u94bb\u77f3\u7528\u6237"}return"\u672a\u77e5"},r.sendRequest=function(r){var e=new Image;e.setAttribute("src",r),e=null},r.clsLog=function(r,e,t,n,i){var o=new Image,s="//mercury.jd.com/log.gif?t=rec."+r+"&v="+encodeURIComponent("src=rec$action="+e+"$enb=1$sku="+t+"$csku="+n+"$index="+(i||0)+"$expid=0")+"&m=UA-J2011-1&ref="+encodeURIComponent(document.referrer)+"&random="+Math.random();o.setAttribute("src",s)},r.onAttr=function(r,t,n){var i=e.specialAttrs,o="string"==typeof r,s=i.length;if(t=t||function(){},n=n||function(){},i&&i.length){for(var a=0;a<s;a++)if(o){if(i[a]===r)return t(i[a]),!0}else if(r.test(i[a]))return t(i[a]),!0;return n(),!1}return n(),!1},r.calPrice=function(r){for(var e=(r.sku,r.input,r.$el.find('input[type="checkbox"]')),t=e.length,n=(r.$el,r.targetJP),i=r.targetMP,o=0,s=0,a=0,c=[],u=r.callback||function(){},l=0;l<t;l++){var f=e.eq(l),d=f.attr("data-sku"),p=f.attr("data-jp"),h=f.attr("data-mp");if(p=parseFloat(p),h=parseFloat(h),f.attr("checked")){if(isNaN(p))return;if(o+=p,isNaN(h))return;s+=h,c.push(d),a++}}n.html("\uffe5"+(o>0?o.toFixed(2):"\u6682\u65e0\u62a5\u4ef7")),i.html("\uffe5"+(s>0?s.toFixed(2):"\u6682\u65e0\u62a5\u4ef7")),u(a,c)},r.setScroll=function(r){("string"==typeof r?$(r):$("body")).find(".p-scroll").each(function(){var r=$(this).find(".p-scroll-wrap"),e=$(this).find(".p-scroll-next"),t=$(this).find(".p-scroll-prev");r.find("li").length>4&&$.fn.imgScroll&&(r.imgScroll({showControl:!0,width:30,height:30,visible:4,step:1,prev:t,next:e}),e.add(t).show())})},r.thumbnailSwitch=function(r,e,t,n,i){var o=r.find("img"),s=i||"mouseover";o.bind(s,function(){var n=$(this),i=n.attr("src"),o=i.replace(/\/n\d\//,t);e.attr("src",o),r.removeClass("curr"),n.parent().addClass("curr")})},r.serializeUrl=function(r){var e,t,n,i,o=r.indexOf("?"),s=r.substr(0,o),a=r.substr(o+1),c=a.split("&"),u=c.length,l={};for(e=0;e<u;e++)t=c[e].split("="),n=t[0],i=t[1],l[n]=i;return{url:s,param:l}},r.collectSkus=function(r,e,t){var n=[];return e=e||".p-price strong",t=t||"J-p-",r.find(e).each(function(){var r=$(this).attr("class");r&&n.push(r.replace(t,""))}),n},r.getNum=function(){return Number($("#buy-num").val())},r.Countdown={init:function(r,e){this.seconds=r,this.timer=null,this.callback=e||function(){},this.loopCount()},loopCount:function(){var r=this,e=r.formatSeconds(r.seconds);r.callback(e),this.timer=setInterval(function(){var e=r.formatSeconds(r.seconds);0===e.d&&0===e.h&&0===e.m&&0===e.s?clearInterval(r.timer):r.seconds--,r.callback(e)},1e3)},formatSeconds:function(r){var e=Math.floor(r/86400),t=Math.floor(r%86400/3600),n=Math.floor(r%86400%3600/60),r=r%86400%3600%60;return{d:e,h:t,m:n,s:r}}};function n(r,e){var t={}.toString;return t.call(r)===t.call(e)}function i(r){if("string"==typeof r){var e=r,t=/(\w+):(?:\/\/)?(?:([^:]+)(?::(.+))?@)?([^\/:?#]+)(?::(\d*))?([^?#]*)([^#]*)(.*)/,n=/(.+)\[(.+)?\]/;if(t.test(e)){var i={},o=t.exec(e);i.protocol=o[1]||"",i.username=o[2]||"",i.password=o[3]||"",i.host=o[4]||"",i.port=o[5]||"",i.path=o[6]||"",i.filename=i.path.split("/").slice(-1).join(""),i.fragment=o[8]||"";var s=o[7]?o[7].slice(1).split("&"):[],a=s.length;if(a>0){i.query={};for(var c=0;c<a;c+=1){var u=s[c].split("="),l=u[0],f=u[1];if(n.test(l)){var d=n.exec(l),p=d[1],h=d[2];if(h){if(i.query[p]||(i.query[p]={}),{}.toString()!=={}.toString.call(i.query[p]))throw"URL's params part has something wrong.";i.query[p][h]=f}else{if(i.query[p]||(i.query[p]=[]),{}.toString.call([])!=={}.toString.call(i.query[p]))throw"URL's params part has something wrong.";i.query[p].push(f)}}else i.query[l]=f}}else i.query={};return i}throw"The URL is illegal."}throw"Param's data type is String."}function o(r,e){if(n({},r)){var t=[];for(var i in r){var s=r[i];if(n([],s))for(var a=0,c=s.length;a<c;a+=1)if(n([],s[a])||n({},s[a])){var u={};u[i+"["+a+"]"]=s[a],t.push(o(u,!0))}else t.push(i+"[]="+s[a]);else if(n({},s))for(var l in s)if(n([],s[l])||n({},s[l])){var u={};u[i+"["+l+"]"]=s[l],t.push(o(u,!0))}else t.push(i+"["+l+"]="+s[l]);else e?t.push("["+i+"]="+s):t.push(i+"="+s)}return t.join("&")}return""}function s(){var r,e,t,i,o,a,c=arguments[0]||{},u=1,l=arguments.length,f=!1;for("boolean"==typeof c&&(f=c,c=arguments[u]||{},u++),"object"!=typeof c&&"function"!=typeof c&&(c={});u<l;u++)if(null!=(r=arguments[u]))for(e in r)t=c[e],i=r[e],c!==i&&(f&&i&&(n({},i)||(o=n([],i)))?(o?(o=!1,a=t&&n([],t)?t:[]):a=t&&n({},t)?t:{},c[e]=s(f,a,i)):void 0!==i&&(c[e]=i));return c}function a(r,e,t){var a=i(r);if(n({},a)&&n({},e)){if(r="",a=s(!0,a,e),/mailto|data/.test(a.protocol)?r+=a.protocol+":":r+=a.protocol+"://",a.username.length>0&&(r+=a.username),a.password.length>0&&(r+=":"+a.password),a.username.length>0&&(r+="@"),r+=a.host,a.port.length>0&&(r+=":"+a.port),r+=a.path,t)for(var c in a.query)a.query.hasOwnProperty(c)&&(a.query[c]||delete a.query[c]);var u=o(a.query);u.length>0&&(r+="?"+u),a.fragment&&(r+=a.fragment)}return r}r.getHrefWithGift=function(e,t){var n="";if(!t)return e;if(/gids=/.test(e)){var i=r.serializeUrl(e).param.gids;n=e.replace("gids="+i,"gids="+t.join(","))}else n=-1!==e.indexOf("?")?e+"&gids="+t.join(","):e+"?gids="+t.join(",");return n},r.getHrefWithYB=function(e,t){var n="";if(!t)return e;if(/ybId=/.test(e)){var i=r.serializeUrl(e).param.ybId;n=e.replace("ybId="+i,"ybId="+t.join(","))}else n=-1!==e.indexOf("?")?e+"&ybId="+t.join(","):e+"?ybId="+t.join(",");return n},r.getHrefWithJDS=function(e,t){var n="";if(!t)return e;if(/jdhsid=/.test(e)){var i=r.serializeUrl(e).param.jdhsid;n=e.replace("jdhsid="+i,"jdhsid="+t.join(","))}else n=-1!==e.indexOf("?")?e+"&jdhsid="+t.join(","):e+"?jdhsid="+t.join(",");return n},r.getHrefWithJDSF=function(e,t){var n="";if(!t)return e;if(/fsIds=/.test(e)){var i=r.serializeUrl(e).param.fsIds;n=e.replace("fsIds="+i,"fsIds="+t.join(","))}else n=-1!==e.indexOf("?")?e+"&fsIds="+t.join(","):e+"?fsIds="+t.join(",");return n},r.log=function(r,e,t){r=r||"log","undefined"!=typeof errortracker&&errortracker[r]({filename:e,message:t})},r.is=n,r.serializeURL=i,r.buildURLQueryString=o,r.extend=s,r.modifyURL=a,module.exports=r});