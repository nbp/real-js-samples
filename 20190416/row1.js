window.tmall_ald_tpl||(tmall_ald_tpl={}),window._CTK840e=window._CTK840e||function(){var o={},t="";return function(a,n,e,c){if(c=c||{},c.reject){"object"!=typeof c.reject&&(c.reject=[c.reject]);for(var r=c.reject.length-1;r>=0;r--)if(o[c.reject[r]])return}t||(t=n);var i=(new Date).valueOf();o[n]=i;var d;if(n==t){var u=window.g_config&&g_config.startTime;d=u?i-u:0}else d=i-(o[e||t]||o[t]);switch(c.autoGroup){case"time":c.group=c.autoGroup+"_"+(0>=d?0:Math.floor(Math.log(d)/Math.log(2)))}c.group&&(n=n+"|"+c.group),"object"==typeof a&&(a=a[c.group||"_"]||0);var l=[.49,.48,.43,.33,.25,.2,.2,.18,.14,.16,.17,.17,.05,.1,.12,.08,.1,.08,.06,.12,.05,.11,.14,.16,.05,.05,.08,.14,.1,.08,.12,.02,.06,.09,.06,.06,.14,.07,.17,.1,.11,.23,.22,.21,.12,.18,.33,.37,.41,.54,.62,.76,.93,1.17,1.31,1.32,1.39,1.45,1.49,1.54,1.94,1.87,1.84,1.73,1.88,1.8,1.83,1.75,1.71,1.75,1.59,1.52,1.42,1.4,1.47,1.35,1.51,1.64,1.57,1.41,1.58,1.58,1.41,1.72,1.64,1.67,1.62,1.73,1.58,1.77,1.64,1.68,1.68,1.62,1.59,1.76,1.7,1.58,1.7,1.62,1.6,1.5,1.49,1.44,1.45,1.28,1.3,1.22,1.22,1.09,1.2,1.16,1.11,1.19,1.28,1.33,1.27,1.42,1.43,1.48,1.56,1.49,1.53,1.53,1.63,1.58,1.66,1.6,1.55,1.52,1.55,1.54,1.51,1.49,1.36,1.25,1.17,1.04,1.03,.92,.83,.79,.64,.45],s=l&&l[Math.floor((i+288e5)/6e5)%144]||1,f=Math.round(Math.max(Math.pow(2,a)*s/8192,16));if(!(Math.floor(Math.random()*f)>0)){var p,m="http://ald.taobao.com/track-1/",_=["[u"+m+"]","[t"+d+"]","[c"+function(){return Ald._appVersion}()+"|"+n+"]","[r"+f+"]"].join(""),h="";try{p=/_nk_=([^;]+)/.exec(document.cookie),p&&(h=decodeURIComponent(p[1]))}catch(w){}var v="jsFeImage_"+i+"_"+Math.random(),g=window[v]=new Image;g.onload=g.onerror=function(){window[v]=null},g.src="//gm.mmstat.com/jstracker.2?"+["type=9","id=jstracker","v=0.01","nick="+encodeURIComponent(h),"islogin=0","msg="+encodeURIComponent(_),"file="+encodeURIComponent(c.dataUri||m),"line="+f,"scrolltop="+(document.documentElement&&document.documentElement.scrollTop||document.body&&document.body.scrollTop||0),"screen="+screen.width+"x"+screen.height,"t="+d].join("&"),g=null}}}(),_CTK840e(24,"app.init"),KISSY.add("mui/ald/app",function(o){function t(o){var t,a,n,e=[];return function(c,r){return 0===r||r||(r=1),1&r&&!a&&(a=!0,o(function(o){for(t=o;n=e.shift();)try{n&&n.apply(null,[t])}catch(a){setTimeout(function(){throw a},0)}})),t?(c&&c.apply(null,[t]),t):(2&r||c&&e.push(c),t)}}var a,n=window;return a=window.Ald={createLoader:t,init:function(){a.initPackage()},initPackage:function(){var t=a._appPath=o.Config.packages["mui/ald"].base,n=/\/mui\/ald\/([\d\.]+)\//.exec(t);n=a._appVersion=n?n[1]:"src",_CTK840e(24,"app.init"),window._jstErrCat=(window._jstErrCat||"")+("_v"+n)},onData:function(o,t){function n(t){t&&t.isSuccess!==!1&&(a.checkData(t),t.acurl&&a.sendImage(t.acurl)),o(t)}t.data.preload(function(o){return t.data.preprocess?(t.data.preprocess(o,n),void 0):(n(o),void 0)})},checkData:function(n){window.console&&/(?:tms.taobao.com|localhost)/.test(location.hostname)&&(a._tv4Loader=a._tv4Loader||t(function(t){o.getScript(a._appPath+"data/tv4.js",function(){t(window.tv4)})}),a._dataSchemaLoader=a._dataSchemaLoader||t(function(t){o.getScript(a._appPath+"data/schema_data.js",function(){t(window._schema_data)})}),a._tv4Loader(),a._dataSchemaLoader(function(o){a._tv4Loader(function(t){var a=t.validate(n,o);a?console.log("tv4 data",n,"success"):console.log("tv4 data",n,t.error)})}))},checkConf:function(n){window.console&&/(?:tms.taobao.com|localhost)/.test(location.hostname)&&(a._tv4Loader=a._tv4Loader||t(function(t){o.getScript(a._appPath+"data/tv4.js",function(){t(window.tv4)})}),a._confSchemaLoader=a._confSchemaLoader||t(function(t){o.getScript(a._appPath+"data/schema_conf.js",function(){t(window._schema_conf)})}),a._tv4Loader(),a._confSchemaLoader(function(o){a._tv4Loader(function(t){var a=t.validate(n,o);a?console.log("tv4 conf",n,"success"):console.log("tv4 conf",n,t.error)})}))},sendImage:function(t){var a="jsFeImage_"+o.guid(),e=n[a]=new Image;e.onload=e.onerror=function(){n[a]=null},e.src=t,e=null}}});
KISSY.add("mui/ald/view/row1.tpl",function(){return function(e,t){var a={escapehash:{"<":"&lt;",">":"&gt;","&":"&amp;",'"':"&quot;","'":"&#x27;","/":"&#x2f;"},escapereplace:function(e){return a.escapehash[e]},escaping:function(e){return"string"!=typeof e?e:e.replace(/[&<>"]/gim,this.escapereplace)},detection:function(e){return"undefined"==typeof e?"":e}},c=function(e){if("undefined"!=typeof console){if(console.warn)return console.warn(e),void 0;if(console.log)return console.log(e),void 0}throw e};t=t||{},t.__escapehtml=a,t.__throw=c;var e=e||{},s="";s+="";try{s+="";{var l=e.data,i=(e.index,e.vo,e.conf);e.div,e.h,e.ul,e.li,e.pos,e.a,e.p,e.img,e.ks,e.lazyload,e.custom,e.strong,e.yen,e.b,e.on_comment}s+='<div class="hd">     <h2>',s+=t.__escapehtml.escaping(t.__escapehtml.detection(l.def.title)),s+='</h2> </div> <div class="bd">     <ul>         ',~function(){for(var e in l.def.result)if(l.def.result.hasOwnProperty(e)){var a=l.def.result[e],c=e;s+="         ",(!i.view.maxNum||c<i.view.maxNum)&&(s+="         ","ACTIVITY"==a.entityType&&a.exclusiveIcon?(s+='             <li class="entityExclusive" data-pos="',s+=t.__escapehtml.escaping(t.__escapehtml.detection(c)),s+='">                 <a target="_blank" href="',s+=t.__escapehtml.escaping(t.__escapehtml.detection(a.url)),s+='" title="',s+=t.__escapehtml.escaping(t.__escapehtml.detection(a.title)),s+='">                 <p class="title">',s+=t.__escapehtml.escaping(t.__escapehtml.detection(a.title)),s+='</p>                 <p class="subTitle">',s+=t.__escapehtml.escaping(t.__escapehtml.detection(a.subTitle)),s+='</p>                 <p class="flag">老客专享</p>                 <p class="img"><img ',s+=c<(i.viewSteps||5)?"src":"data-ks-lazyload-custom",s+='="',s+=t.__escapehtml.escaping(t.__escapehtml.detection(a.img)),s+='" alt="',s+=t.__escapehtml.escaping(t.__escapehtml.detection(a.title)),s+='"/></p>                 </a>             </li>         '):"ACTIVITY"==a.entityType?(s+='             <li class="entityActive" data-pos="',s+=t.__escapehtml.escaping(t.__escapehtml.detection(c)),s+='">                 <p class="img"><a target="_blank" href="',s+=t.__escapehtml.escaping(t.__escapehtml.detection(a.url)),s+='" title="',s+=t.__escapehtml.escaping(t.__escapehtml.detection(a.title)),s+='"><img src="',s+=t.__escapehtml.escaping(t.__escapehtml.detection(a.img)),s+='" alt="',s+=t.__escapehtml.escaping(t.__escapehtml.detection(a.title)),s+='"/></a></p>             </li>         '):(s+='             <li class="entityItem" data-pos="',s+=t.__escapehtml.escaping(t.__escapehtml.detection(c)),s+='">                 <p class="img"><a target="_blank" href="',s+=t.__escapehtml.escaping(t.__escapehtml.detection(a.url)),s+='" title="',s+=t.__escapehtml.escaping(t.__escapehtml.detection(a.title)),s+='"><img ',s+=c<(i.viewSteps||5)?"src":"data-ks-lazyload-custom",s+='="',s+=t.__escapehtml.escaping(t.__escapehtml.detection(a.img)),s+='" alt="',s+=t.__escapehtml.escaping(t.__escapehtml.detection(a.title)),s+='"/></a></p>                 ',(a.price||a.marketPrice)&&(s+='<p class="price"><strong>&yen;',a.price?(s+="",s+=t.__escapehtml.escaping(t.__escapehtml.detection(a.price)),s+=""):(s+="",s+=t.__escapehtml.escaping(t.__escapehtml.detection(a.marketPrice)),s+=""),s+="</strong></p>"),s+='                 <p class="title"><a target="_blank" href="',s+=t.__escapehtml.escaping(t.__escapehtml.detection(a.url)),s+='" title="',s+=t.__escapehtml.escaping(t.__escapehtml.detection(a.title)),s+='">',s+=t.__escapehtml.escaping(t.__escapehtml.detection(a.title)),s+="</a></p>                  ",(a.salesWeekly||a.commentNum)&&(s+='                 <p class="summary">                     ',a.salesWeekly&&(s+='<a class="salesUrl">销量：<b>',s+=t.__escapehtml.escaping(t.__escapehtml.detection(a.salesWeekly)),s+="</b></a>"),s+="                     ",a.commentNum&&(s+='<a target="_blank" title="',s+=t.__escapehtml.escaping(t.__escapehtml.detection(a.commentNum)),s+='个评论" class="commentUrl" href="',s+=t.__escapehtml.escaping(t.__escapehtml.detection(a.url)),s+='&on_comment=1">评论：',s+=t.__escapehtml.escaping(t.__escapehtml.detection(a.commentNum)),s+="</a>"),s+="                 </p>                 "),s+="             </li>         "),s+="         "),s+="         "}}(),s+="     </ul> </div>"}catch(p){t.__throw("Juicer Render Exception: "+p.message)}return s+=""}});
KISSY.add("mui/ald/view/row1.css",function(t,e){return e.addStyleSheet(function(t,e){var i={escapehash:{"<":"&lt;",">":"&gt;","&":"&amp;",'"':"&quot;","'":"&#x27;","/":"&#x2f;"},escapereplace:function(t){return i.escapehash[t]},escaping:function(t){return"string"!=typeof t?t:t.replace(/[&<>"]/gim,this.escapereplace)},detection:function(t){return"undefined"==typeof t?"":t}},o=function(t){if("undefined"!=typeof console){if(console.warn)return console.warn(t),void 0;if(console.log)return console.log(t),void 0}throw t};e=e||{},e.__escapehtml=i,e.__throw=o;var t=t||{},n="";n+="";try{n+="";{t.face,t.family,t.ald,t.at,t.t,t.font_,t.format,t.opentype,t.url,t.row,t.size,t.height,t.align,t.zoom,t.decoration,t.bottom,t.left,t.weight,t.verdana,t.sans,t.serif,t.important,t.shadow,t.top,t.of,t.type}n+="@font-face{font-family:iconfont-ald;src:url(//at.alicdn.com/t/font_1394539034_3543801.eot);src:url(//at.alicdn.com/t/font_1394539034_3543801.eot?#iefix) format('embedded-opentype'),url(//at.alicdn.com/t/font_1394539034_420001.woff) format('woff'),url(//at.alicdn.com/t/font_1394539034_2761147.ttf) format('truetype'),url(//at.alicdn.com/t/font_1394539034_4653947.svg#iconfont) format('svg')}.ald-row1{border:1px solid #e5e5e5}.ald-row1 *{padding:0;margin:0}.ald-row1 .hd{background:#f3f3f3}.ald-row1 .hd h2{font-size:12px;line-height:18px;margin:0 5px;padding:0}.ald-row1 .bd ul{text-align:center;*zoom:1}.ald-row1 .bd ul:after{display:block;clear:both;height:0;content:' '}.ald-row1 .bd .entityActive{display:inline;float:left;margin:12px}.ald-row1 .bd .entityActive .img{width:220px;height:270px;border:1px solid #e5e5e5}.ald-row1 .bd .entityActive .img img{width:100%;height:100%}.ald-row1 .bd .entityExclusive{display:inline;float:left;margin:12px;position:relative;text-align:left}.ald-row1 .bd .entityExclusive a{border:1px solid #e5e5e5;display:block;width:220px;height:270px;text-decoration:none}.ald-row1 .bd .entityExclusive .img{height:192px;width:192px}.ald-row1 .bd .entityExclusive .img img{width:100%}.ald-row1 .bd .entityExclusive .subTitle{margin-bottom:14px;padding-left:18px;font-weight:bolder;font-family:arial,verdana,sans-serif!important;color:#999;font-size:13px;line-height:20px;height:20px}.ald-row1 .bd .entityExclusive .flag{background:#DD2727;box-shadow:0 1px 2px 0 rgba(0,0,0,.12);font-size:12px;color:#FFF;line-height:12px;width:32px;text-align:center;padding:4px 0;position:absolute;top:64px}.ald-row1 .bd .entityExclusive .title{margin-top:16px;line-height:24px;height:24px;overflow:hidden;padding:4px 0 0 18px;color:#333;font-size:18px;font-weight:bolder}.ald-row1 .bd .entityExclusive:nth-of-type(4n) .title{color:#cc3d6d}.ald-row1 .bd .entityExclusive:nth-of-type(4n+1) .title{color:#2a418c}.ald-row1 .bd .entityExclusive:nth-of-type(4n+2) .title{color:#6d7d25}.ald-row1 .bd .entityExclusive:nth-of-type(4n+3) .title{color:#b35936}.ald-row1 .bd .entityItem{border-left:1px dotted #E6E6E6;display:inline;float:left;height:232px;margin-left:-1px;padding:10px 2%;text-align:center;width:15.8%;color:#999;overflow:hidden;dispaly:inline}.ald-row1 .bd .entityItem .img{height:160px;width:100%;display:block;overflow:hidden}.ald-row1 .bd .entityItem .price{height:20px;overflow:hidden}.ald-row1 .bd .entityItem .price strong{font-family:arial,verdana,sans-serif!important;color:#C00;font-weight:700;font-size:14px}.ald-row1 .bd .entityItem .title{line-height:18px;overflow:hidden;height:34px;padding:4px 0 0}.ald-row1 .bd .entityItem .title a{color:#666;font-size:12px;font-weight:400;text-decoration:none}.ald-row1 .bd .entityItem .title a:hover{color:#C10001!important;text-decoration:underline}.ald-row1 .bd .entityItem .title a:visited{color:#551a8b!important}"}catch(l){e.__throw("Juicer Render Exception: "+l.message)}return n+=""}())||null},{requires:["dom"]});
KISSY.add("mui/ald/view/row1",function(e,t,i,r,o){function n(e){t.onData(function(n){_CTK840e({time_3:19,time_5:20,time_8:19,time_9:18,time_6:20,time_4:20,time_2:19,time_11:17,time_7:20,time_10:17,time_1:20,time_0:23},"row1.dataSuccess","row1.init",{autoGroup:"time"});var a=e.panel.node,l=e.view.rowNum||4;return n.def.result.length=n.def.result.length-n.def.result.length%l,n&&n.def&&n.def.result.length?(i.addClass(a,"ald-row1"),i.html(a,o({data:n,conf:e})),_CTK840e({vieworder_a:22,paysuccess_a:22,error_a:20,tradesuccess_a:22,noresult_a:19,subject_a:18,noresult:18,noresult_k:18},"row1.show","row1.init",{group:e.panel.name}),n.def.showLogUrl&&t.sendImage(n.def.showLogUrl),r.delegate(a,"click","li",function(t){var r=t.currentTarget;e.view.onClick&&e.view.onClick(r,n.def.result[i.attr(r,"data-pos")])}),void 0):(i.hide(a),_CTK840e(18,"row1.null","row1.init"),void 0)},e)}return e.mix(n,{render:function(e){e=e||{},t.init(),_CTK840e(24,"row1.init"),t.checkConf(e),new n(e)}}),n},{requires:["mui/ald/app","dom","event","mui/ald/view/row1.tpl","mui/ald/view/row1.css"]});