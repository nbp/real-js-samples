var DeqwasDebug=false;var KcDeqwasAgent=function(){this.initialize.apply(this,arguments)};KcDeqwasAgent.domain="kdex003.deqwas.net";KcDeqwasAgent.appName="common";KcDeqwasAgent.collectaspx="Collection.aspx";KcDeqwasAgent.choiceaspx="Choice.aspx";KcDeqwasAgent.deqwasName="deqwas-k";KcDeqwasAgent.CollectDivId="deqwas-collection-k";KcDeqwasAgent.ScreenDivId="deqwas-screen-k";KcDeqwasAgent.urlLimitation=2083;KcDeqwasAgent.ScriptType="rec";KcDeqwasAgent.urlmaxlength=1024;KcDeqwasAgent.is_smartPhone=function(){var b=["iPhone","iPad","Android","blackberry","windowsPhone"];var a=new RegExp(b.join("|"),"i");return a.test(navigator.userAgent)};KcDeqwasAgent.GetParamaterList=function(){if(KcDeqwasAgent.URLParamaters){return KcDeqwasAgent.URLParamaters}KcDeqwasAgent.URLParamaters=new Object();var c=location.search.split(/[\?\&]/);for(var b=0;b<c.length;b++){if(!c[b]||!c[b].match(/=+/)){continue}var a=c[b].split("=");KcDeqwasAgent.URLParamaters[a[0]]=a[1]}return KcDeqwasAgent.URLParamaters};KcDeqwasAgent.GetBaseUrl=function(){return(location.protocol=="https:"?"https:":"http:")+"//"+KcDeqwasAgent.domain+"/"+KcDeqwasAgent.appName};KcDeqwasAgent.ArrayContains=function(c,b){for(var a=0;a<c.length;a++){if(c[a]===b){return true}}return false};KcDeqwasAgent.Clone=function(d){var c=new Object();for(var b in d){if(d[b]==null){c[b]=null}else{if(typeof d[b]=="Array"){c[b]=new Array();for(var a=0;a<d[b].length;a++){c[b].push(d[b][a])}}else{if(typeof d[b]=="Object"){c[b]=KcDeqwasAgent.Clone()}else{c[b]=d[b]}}}}return c};KcDeqwasAgent.Concat=function(c){var a=arguments[0];for(var b=1;b<arguments.length;b++){a+=arguments[b]}return a};KcDeqwasAgent.ConcatSep=function(b,f){var d="";var a=arguments[1];for(var c=2;c<arguments.length;c++){a+=d;a+=arguments[c];d=b}return a};KcDeqwasAgent.CollectorConst={Keywords:1,Description:2,SiteCatalyst:4,Title:8};KcDeqwasAgent.GetCookie=function(c){var g=c+"=";var f=null;var b=document.cookie+";";var a=b.lastIndexOf(g);if(a!=-1){var d=b.indexOf(";",a);f=unescape(b.substring(a+g.length,d))+";"}return f};KcDeqwasAgent.SetCookie=function(a,b){date=new Date();date.setTime(date.getTime(),(365*24*60*60*1000));myItem=KcDeqwasAgent.Concat(a,"=",escape(b),";");myExpires=KcDeqwasAgent.Concat("expires=",date.toGMTString());document.cookie=KcDeqwasAgent.Concat(myItem,myExpires,"path=/")};KcDeqwasAgent.DeleteCookie=function(a){KcDeqwasAgent.SetCookie(a,"")};KcDeqwasAgent.prototype={codeVersion:"xxx",collectionType:{normal:"i",cart:"c",shipping:"s",top:"t",category:"g"},screenType:{normal:"r",cart:"k",shipping:"h",top:"t2",category:"g2"},screenElementId:KcDeqwasAgent.ScreenDivId,collectionElementId:KcDeqwasAgent.CollectDivId,visibleFunctionIds:{r:true,k:true,h:true,t2:true,g2:true},etccount:0,initialize:function(a,d,c){if(c&&c.constant){for(var b in c.constant){if(c.constant[b]){KcDeqwasAgent[b]=c.constant[b]}}}this.site=a;this.role=d;this.objectId=c.id;if(c.option==undefined){c.option=new Object()}this.silence=c.option.silence;this.parameters={cid:this.site,fc:"",iid:c.id,role:this.role,iname:c.name,l:c.location,caption:c.caption,expression:"",essential:"",uid:c.viewer_id,image:c.image,price:c.price,category:c.category,place:"",cb:(new Date()).getTime()};this.defCollect();this.parameterPriority={higher:["cid","fc","iid","type"],lower:[]};this.noscreen=c.option.noscreen;if(c.option.noscreen||c.option.solitude){this.parameters.expression=c.option.noscreen?"F":"X";this.parameters.expression+=c.option.solitude?"T":"X"}this.targetUrl=KcDeqwasAgent.GetBaseUrl()+"/"+KcDeqwasAgent.collectaspx;this.iframeStyle={width:"0px",height:"0px"};this.iframeOptions={frameborder:"0",scrolling:"no"}},setEssential:function(a){this.parameters.essential=a},_createIframeSrcWithLimit:function(m,c){var a=[];var j=new Object();var f=this._concatKey(this.parameterPriority,m);var l=""+c;var b=l.length;for(var d=0;d<f.length;d++){var k=f[d];if(m[k]&&typeof m[k]!="function"&&typeof j[k]=="undefined"){var h=(typeof m[k]=="string")?m[k].replace(/[\f\n\r\t\v]/g,""):m[k];h=h.toString().replace(/['"]/g,"").replace(/&quot;/g,"");var g=k+"="+encodeURIComponent(h);b+=1+g.length;if(b>KcDeqwasAgent.urlLimitation){break}a.push(g)}}l+="?"+a.join("&");return l},_hasBrackets:function(b){for(var a in b){if(b[a]&&typeof b[a]!="function"){var c=b[a].toString();if(/[\(\)]/g.test(c)){return true}}}return false},_concatKey:function(b,c){var d=[].concat(b.higher,b.lower);for(var a in c){if(!KcDeqwasAgent.ArrayContains(d,a)){d.splice(d.length-b.lower.length,0,a)}}return d},_flatten:function(d,f,b){var a="";for(var c in d){a+=c;a+=f;a+=d[c];a+=b}return a},setAdditionalParameters:function(a){for(var b in a){this.parameters[b]=a[b]}},setScreenElementId:function(a){this.screenElementId=a},setCollectionElementId:function(a){this.collectionElementId=a},setIframeStyle:function(d,a,b){if(!d||!a){return}b=b||{};this.iframeStyle.width=d;this.iframeStyle.height=a;this.parameters.area=d+"x"+a;for(var c in b){this.iframeStyle[c]=b[c]}},setIframeOptions:function(b){if(!b){return}for(var a in b){this.iframeOptions[a]=b[a]}},_createIframe:function(g,h,b,d,a){var f=document.createElement("iframe");f.setAttribute("id",h);f.setAttribute("src",g);f.setAttribute("name",b);f.setAttribute("style",this._flatten(d,":",";"));if(d.width){f.setAttribute("width",d.width)}if(d.height){f.setAttribute("height",d.height)}for(var c in a){f.setAttribute(c,a[c])}if(DeqwasDebug){alert(g)}return f},appendIframeToElement:function(c,d){var b;var g;if(d){g=this.collectionType[c];b=this.collectionElementId}else{g=this.screenType[c];b=this.screenElementId}this.parameters.fc=g;if(!document.getElementById(b)){var f=document.createElement("div");f.setAttribute("id",b);document.body.appendChild(f)}if(this.silence){this.parameters.essential="confirmation"}if(this.noscreen){this.iframeStyle={width:"0px",height:"0px"}}if(this.visibleFunctionIds[g]){b=this.screenElementId}else{b=this.collectionElementId;this.iframeStyle={width:"0px",height:"0px"}}var a=KcDeqwasAgent.deqwasName+"-kc-"+c;if(!document.getElementById(a)){document.getElementById(b).appendChild(this._createIframe(this._createIframeSrcWithLimit(this.parameters,this.targetUrl),a,a,this.iframeStyle,this.iframeOptions))}return a},defCollect:function(){var c=window;if(c.document&&c.document.location){var b=c.document.location.href;if(b.length>KcDeqwasAgent.urlmaxlength){b=b.substring(0,KcDeqwasAgent.urlmaxlength);this.parameters.url_flg="1"}else{this.parameters.url_flg="0"}this.parameters.url=b}if(c.document&&c.document.referrer){var d=c.document.referrer;if(d.length>KcDeqwasAgent.refmaxlength){d=d.substring(0,KcDeqwasAgent.refmaxlength);this.parameters.ref_flg="1"}else{this.parameters.ref_flg="0"}this.parameters.ref=d}var a=KcDeqwasAgent.GetParamaterList()["deqwas_inflow"];if(a){this.parameters.inflow=a}this.collect(KcDeqwasAgent.CollectorConst.Keywords,KcDeqwasAgent.CollectorConst.Description,KcDeqwasAgent.CollectorConst.Title)},collect:function(){var b=0;for(var d=0;d<arguments.length;d++){b|=arguments[d]}var j=document.getElementsByTagName("meta");for(var d=0;d<j.length;d++){var n=j[d];var a=n.getAttribute("name");var g=n.getAttribute("http-equiv");var h=n.getAttribute("content");if(!a||!h){continue}if((KcDeqwasAgent.CollectorConst.Keywords&b)==KcDeqwasAgent.CollectorConst.Keywords){if(a.match(/keywords/i)){this.parameters.keywords=h}}if((KcDeqwasAgent.CollectorConst.Description&b)==KcDeqwasAgent.CollectorConst.Description){if(a.match(/description/i)){this.parameters.description=h}}}var f=window;var c=f;if((KcDeqwasAgent.CollectorConst.Title&b)==KcDeqwasAgent.CollectorConst.Title){this.parameters.title=c.document.title}if((KcDeqwasAgent.CollectorConst.SiteCatalyst&b)==KcDeqwasAgent.CollectorConst.SiteCatalyst){var l={};if(typeof window.s==="object"){var m=window.s.vl_g.split(",");for(var d in m){if(typeof m[d]==="string"){var a=m[d];var k=window.s[a]?typeof window.s[a]:typeof window.s[a.toLowerCase()];if(k==="string"||k==="number"||k==="boolean"){l["s_"+a.toLowerCase()]=window.s[a]}}}}this.catalysts=l}},SetActOption:function(){for(var a=0;a<arguments.length;a++){if(a<10){this.paramater["note"+a]=arguments[a]}else{if(this.etccount<10){this.paramater["etc"+this.etccount]=arguments[a];this.etccount++}else{return}}}},SetItemOption:function(){for(var a=0;a<arguments.length;a++){if(a<10){this.paramater["extra"+a]=arguments[a]}else{if(this.etccount<10){this.paramater["etc"+this.etccount]=arguments[a];this.etccount++}else{return}}}}};if(window.DeqwasCallBacks){var protoArray=new Array();for(var dc_key in window.DeqwasCallBacks){if(window.DeqwasCallBacks[dc_key]&&typeof window.DeqwasCallBacks[dc_key]=="function"&&typeof protoArray[dc_key]=="undefined"){try{window.DeqwasCallBacks[dc_key]()}catch(e){}}}};