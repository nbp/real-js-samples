window.addEventListener("load",function(t){document.documentElement.style.opacity="1"});var wa_env,wap_tms={};if(wap_tms.utility={},wap_tms.utility.startPerformanceTimer=Date.now(),wap_tms.utility.showHideTimer=3e3,wap_tms.utility.load_tms=function(){var t=!0;switch(!0){case/\/cn\/zh\/test\/iris-speed.html/.test(location.href):t=!1}return"tms_disable"==wap_tms.utility.getUrlParameter("wa_test")&&(t=!1),t},wap_tms.utility.setTealiumDomain=function(t,a,e){var s="cn-zh"==t?"tags.tiqcdn.cn":"tags.tiqcdn.com",i="//"+s+"/utag/intel/"+a+"/"+e+"/";"profile-cq.emea"==a&&(s="tags-eu.tiqcdn.com",i="//"+s+"/utag/intel/"+a+"/"+e+"/");try{utag_cfg_ovrd={path:i}}catch(t){}return s},window.onerror=function(t,a,e,s,i){return sessionStorage.setItem("wapError","true"),sessionStorage.setItem("wapErrorMessage",t),sessionStorage.setItem("wapErrorUrl",a),sessionStorage.setItem("wapErrorLineNo",e),sessionStorage.setItem("wapErrorColumnNo",s),sessionStorage.setItem("wapErrorCause",i),!0},wap_tms.utility.sync_opt_out=function(){switch(!0){case/cn\/zh\/laptops\/pcrefresh\.html|cn\/zh\/2-in-1\/laptop-tablet\.html/.test(location.href):wap_tms.utility.loadSync=!1}},wap_tms.utility.url_path_name=function(t){var a=new Object;for(a.dir=new Array,i=1,a.fullDir="/",t=t.replace(/^\//,"");(node=t.match(/^(.+?)(?:\/)+(.*)/))&&node[0].length;)a.dir[i++]=node[1],a.fullDir+=node[1]+"/",t=node[2];return a.fileName=t,a},wap_tms.utility.set_profile=function(t){var a="",t="intc-drc"==utag_data.wa_section?"drc-drc":t;switch(t="intc-digital-library"==utag_data.wa_section?"digital-library":t,t="intc-solutions-library"==utag_data.wa_section?"solutions-library":t,t="intc-competition-library"==utag_data.wa_section?"competition-library":t){case"us-en":case"ca-en":case"ca-fr":a="profile-cq.asmo-na",wap_tms.utility.showHideTimer=3e3;break;case"br-pt":case"xl-es":case"mx-es":case"co-es":case"cl-es":case"cr-es":a="profile-cq.asmo-lar",wap_tms.utility.showHideTimer=3e3;break;case"ae-ar":case"ae-en":case"az-az":case"bg-bg":case"cz-cs":case"de-de":case"dz-ar":case"dz-fr":case"eg-ar":case"eg-en":case"es-es":case"eu-en":case"fr-fr":case"ge-ka":case"hu-hu":case"ie-en":case"il-he":case"it-it":case"jo-ar":case"ke-en":case"lb-ar":case"ma-ar":case"ma-fr":case"ng-en":case"nl-nl":case"pl-pl":case"pt-pt":case"pt-pt":case"ro-ro":case"ru-ru":case"sa-ar":case"sa-en":case"se-sv":case"tr-tr":case"ua-uk":case"uk-en":case"xe-en":case"xr-ar":case"xr-en":case"za-en":case"ch-de":a="profile-cq.emea",wap_tms.utility.showHideTimer=3e3;break;case"ap-en":case"au-en":case"hk-en":case"id-id":case"in-en":case"in-hi":case"kr-ko":case"lk-en":case"my-en":case"nz-en":case"ph-en":case"pk-en":case"sg-en":case"th-th":case"tw-zh":case"vn-vi":case"xa-en":case"jp-ja":a="profile-cq.apj",wap_tms.utility.showHideTimer=3e3;break;case"cn-zh":a="profile-cq.prc",wap_tms.utility.showHideTimer=3e3;break;default:a="profile-cq",wap_tms.utility.showHideTimer=3e3}return a},wap_tms.utility.wapSetCookieDomain=function(){var t=location.hostname;return t=t.replace(/(.*)\.intel/,".intel")},wap_tms.utility.wapSetCookie=function(t,a,e){var s=new Date;s.setTime(s.getTime()+60*e*1e3),document.cookie=t+"="+escape(a)+";path=/;domain="+wap_tms.utility.wap_domain+";expires="+s.toGMTString()},wap_tms.utility.wapGetCookie=function(t){for(var a=t+"=",e=a.length,s=document.cookie.length,i=0;i<s;){var _=i+e;if(document.cookie.substring(i,_)==a)return wap_tms.utility.wapGetCookieVal(_);if(i=document.cookie.indexOf(" ",i)+1,0==i)break}return null},wap_tms.utility.wapGetCookieVal=function(t){var a=document.cookie.indexOf(";",t);return a==-1&&(a=document.cookie.length),unescape(document.cookie.substring(t,a))},wap_tms.utility.configUdoMain=function(){var t,a=cq_tms.wa_cq_url,e="undefined"==typeof a?location.pathname:cq_tms.wa_cq_url;/\/drc\/drc\//.test(e)&&(utag_data.wa_section="intc-drc"),/\/digital\-library\//.test(e)&&(utag_data.wa_section="intc-digital-library"),/\/content\/solutions\//.test(e)&&(utag_data.wa_section="intc-solutions-library"),/\/content\/competition\//.test(e)&&(utag_data.wa_section="intc-competition-library");var s=wap_tms.utility.url_path_name(e.toLowerCase());if(t=!(""!=cq_tms.wa_local&&!/null/g.test(cq_tms.wa_local)))try{utag_data.wa_local=s.dir[3]+"-"+s.dir[4]}catch(t){}},wap_tms.utility.setEnvCookie=function(){var t=wap_tms.utility.wapGetCookie("utag_env_intel_"+wap_tms.profile);if(null!=t){var a=t.split("intel/")[1];wap_tms.profile="undefined"!=typeof a?a.split("/")[0]:wap_tms.profile,t.indexOf("qa")!=-1&&(wap_tms.env="qa"),t.indexOf("dev")!=-1&&(wap_tms.env="dev")}},wap_tms.utility.getUrlParameter=function(t){t=t.replace(/[\[]/,"\\[").replace(/[\]]/,"\\]");var a=new RegExp("[\\?&]"+t+"=([^&#]*)"),e=a.exec(location.search);return null===e?"":decodeURIComponent(e[1].replace(/\+/g," "))},wap_tms.utility.wap_domain=wap_tms.utility.wapSetCookieDomain(),wap_tms.utility.showHideContent=function(){document.documentElement.style.opacity="0";var t;t="undefined"!=typeof wap_tms&&"undefined"!=typeof wap_tms.utility&&"undefined"!=typeof wap_tms.utility.showHideTimer?wap_tms.utility.showHideTimer:3e3,setTimeout(function(){document.documentElement.style.opacity="1"},t)},wap_tms.utility.startTime=(new Date).getTime(),wap_tms.utility.tmsTimeout=1e4,wap_tms.utility.tmsTimeoutDuration=20,wap_tms.utility.loadSync=!1,wap_tms.utility.sync_opt_out(),wap_tms.load_tms=wap_tms.utility.load_tms(),wap_tms.pub_env=cq_tms.wa_cq_pub_env,wap_tms.env=cq_tms.wa_env,wap_tms.load_tms){var utag_data={};utag_data.wa_section="intc",utag_data.wa_location=cq_tms.wa_location,utag_data.wa_language=cq_tms.wa_language,utag_data.wa_english_title=cq_tms.wa_english_title,utag_data.wa_resource_type=cq_tms.wa_resource_type,utag_data.wa_intel_platform=cq_tms.wa_intel_platform,utag_data.wa_applications=cq_tms.wa_applications,utag_data.wa_local=cq_tms.wa_location+"-"+cq_tms.wa_language,utag_data.wa_intel_technology=cq_tms.wa_intel_technology,utag_data.wa_system_type=cq_tms.wa_system_type,utag_data.wa_program_level=cq_tms.wa_program_level,utag_data.wa_metrics_segment=cq_tms.wa_metrics_segment,utag_data.wa_metrics_campaign=cq_tms.wa_metrics_campaign,utag_data.wa_campaign=cq_tms.wa_campaign,utag_data.wa_user_task=cq_tms.wa_user_task,utag_data.wa_page_type_micro=cq_tms.wa_page_type_micro.toLowerCase(),utag_data.wa_env=cq_tms.wa_env,utag_data.wa_programidentifier=cq_tms.wa_programidentifier,utag_data.wa_vps=cq_tms.wa_vps,utag_data.wa_target_audience="undefined"!=typeof cq_tms.wa_primary_audience?cq_tms.wa_primary_audience:"",utag_data.wa_product_id="undefined"!=typeof cq_tms.wa_vphid_primary?cq_tms.wa_vphid_primary:"",utag_data.wa_product_id_secondary="undefined"!=typeof cq_tms.wa_vphid_secondary?cq_tms.wa_vphid_secondary:"",utag_data.wa_login="",utag_data.wa_profile_id="",utag_data.wa_business_id="",utag_data.wa_program_id="","undefined"!=typeof isTargetEnabled&&isTargetEnabled&&(utag_data.target_enabled="true"),wap_tms.utility.configUdoMain(),wap_tms.profile=wap_tms.utility.set_profile(utag_data.wa_local),"undefined"==typeof wap_tms.pub_env&&(wap_tms.pub_env="publish"),"undefined"==typeof wap_tms.env&&(wap_tms.env="prod"),"prod"==wap_tms.env||"prd"==wap_tms.env?(wa_env=!0,wap_tms.env="prod",utag_data.wa_env="prod"):(wa_env=!1,wap_tms.env="qa"),wap_tms.utility.setEnvCookie(),wap_tms.tms_domain=wap_tms.utility.setTealiumDomain(utag_data.wa_local,wap_tms.profile,wap_tms.env),wap_tms.tms_url="//"+wap_tms.tms_domain+"/utag/intel/"+wap_tms.profile+"/"+wap_tms.env+"/utag.js",wap_tms.tms_url_sync="//"+wap_tms.tms_domain+"/utag/intel/"+wap_tms.profile+"/"+wap_tms.env+"/utag.sync.js",wap_tms.loadasync=function(t,a,e,s){t=wap_tms.tms_url,a=document,e="script",s=a.createElement(e),s.src=t,s.type="text/java"+e,s.async=!0,t=a.getElementsByTagName(e)[0],t.parentNode.insertBefore(s,t)},utag_data.wa_load_tms_sync="async",cq_tms.wa_page_type_micro.indexOf("mf-")!==-1&&"string"==typeof cq_tms.wa_tms_sync_load&&0==cq_tms.wa_tms_sync_load.indexOf("sync")&&(utag_data.wa_load_tms_sync="sync"),"publish"==wap_tms.pub_env&&(0==utag_data.wa_load_tms_sync.indexOf("sync")||wap_tms.utility.loadSync&&"tms_async"!=wap_tms.utility.getUrlParameter("wa_test")?(document.documentElement.style.opacity="0",utag_data.load_method="sync",wap_tms.utility.wapSetCookie("tms_timeout","true",wap_tms.utility.tmsTimeoutDuration),document.write('<script type="text/javascript" src="'+wap_tms.tms_url+'"></script>')):(utag_data.load_method="async",wap_tms.loadasync()))}