KISSY.add("mui/detail-review/index",function(e,a,t){window.codeTrack=function(){};var r={};r.init=function(r,o){var l=this;r=a.get(r);codeTrack("detail-review.init");o=n(o);var d=true;var v={switchs:o.switchs,umidToken:o.umidToken,daily:o.daily,width:o.width,tbtoken:o.tbtoken,sellerId:o.sellerId,tokenLoader:o.tokenLoader,inBucket:s(o.bucketId,o.list&&o.list.listType),inBucketForCloudTag:d};r.innerHTML='<div class="rate-header"></div>'+'<div class="rate-compose"></div>'+'<div class="rate-subject"></div>'+'<div class="rate-charts"></div>'+'<div class="rate-toolbar"></div>'+'<div class="rate-grid"></div>'+'<div class="rate-page"></div>'+'<div class="rate-chat"></div>'+'<div class="rate-tryreport"></div>';if(o.width){a.addClass(r,"rate-w"+o.width)}a.addClass(r,"tm-rate");var c=new Array(0,9,10);if(e.inArray(parseInt(o.list.listType),c)){v.listTypeStr="review/list"}else{v.listTypeStr="review/listmz"}if(o.list){if(!e.isFunction(o.ua)){o.ua=i()}if(g_config.appId==1){t.gm("1.5.1")}v.rememberSort=false;v.tagInput=false;var u={rateScoreDisable:o.rateScoreDisable,rateProgressBarDisable:false,rateCloudDisable:o.rateCloudDisable,rateSubjectDisable:o.rateSubjectDisable,tryReportDisable:o.tryReportDisable};if(!e.Config.packages.hasOwnProperty("sd/data_sufei")){e.config({packages:{"sd/data_sufei":{base:"//g.alicdn.com/sd/data_sufei/1.3.6/sufei",ignorePackageNameInUri:true,charset:"utf8"}}})}if(!e.Config.packages.kg){e.config({packages:{kg:{base:"//g.alicdn.com/kg/",ignorePackageNameInUri:true}}})}if(o.list.listType==0){e.use("mui/detail-review/list",function(e,a){a.init(r,e.merge(v,o.list,{ua:o.ua,groupId:o.groupId},u),o.hasUserLink)})}else if(o.list.listType==1){e.use("mui/detail-review/listmz",function(e,a){a.init(r,e.merge(v,o.list,{ua:o.ua,groupId:o.groupId},u),o.hasUserLink)})}else if(o.list.listType==2){e.use("mui/detail-review/listcuntao",function(e,a){a.init(r,e.merge(v,o.list,{ua:o.ua,groupId:o.groupId},u),o.hasUserLink)})}}e.config({packages:{"mui/tribechat":{version:"3.0.1",path:"//g.alicdn.com/mui/tribechat/3.0.1/",group:"tm",ignorePackageNameInUri:true,debug:true}}})};function i(){var a=window;var t=e.now();var r=t-t%36e5;var i=a.g_config.appId;a["UA_Opt"]={LogVal:"UA_Val",MaxMCLog:10,MaxKSLog:10,MaxMPLog:10,MaxFocusLog:1,Token:(new Date).getTime()+":"+Math.random(),SendMethod:8,Flag:12430};a["UA_Val"]="";a["getUA"]=function(){var e=a["UA_Val"];try{UA_Opt.Token=(new Date).getTime()+":"+Math.random();UA_Opt.reload()}catch(e){}return e};e.getScript("//uaction.alicdn.com/js/ua.js?"+r,function(){try{getUA()}catch(e){}});return a["getUA"]}function n(a){if(!e.isPlainObject(a))return a;var t=a;if(a.rateConfig){if(t.list){t.list["itemId"]=a.rateConfig["itemId"];t.list["listType"]=a.rateConfig["listType"];t.list["spuId"]=a.rateConfig["spuId"]}t["rateCloudDisable"]=a.rateConfig["rateCloudDisable"];t["rateScoreDisable"]=a.rateConfig["rateScoreDisable"];t["rateSubjectDisable"]=a.rateConfig["rateSubjectDisable"];t["sellerId"]=a.rateConfig["sellerId"];t["groupId"]=a.rateConfig["groupId"];t["tryReportDisable"]=a.rateConfig["tryReportDisable"];t["rateNewChartDisable"]=a.rateConfig["rateNewChartDisable"]}return t}function s(e,a){var t={16:[2,19]};e=parseInt(e,10);e=isNaN(e)?-1:e;function r(a){return a[0]<=e&&e<=a[1]}var i=a&&t[a];if(!t[a]){return true}else{return i&&r(i)}}return r},{requires:["dom","mui/detail-review/util"]});