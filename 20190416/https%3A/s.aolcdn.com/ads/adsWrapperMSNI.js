var adsLo,atwInfo=0;try{adsLo=top.location.href}catch(e){}if(!adsLo||null==adsLo)try{adsLo=window.location.href}catch(e){}-1<(adsLo=adsLo||"").search(/atwInfo=/i)&&(atwInfo=1),window.atwUAC=window.atwUAC||{},"function"!=typeof window.dap_Resize&&(dap_Resize=function(){});var adsMNS,adsSz,adsIE,adsCA,adsATOth="",adsD=new Date,adsVal="",adsCp=0,atwIP="",adsExcV="",adsKV="",adsFileless=0,adsUA=navigator.userAgent.toLowerCase(),adsTile=1,adsDivs=[],adsCF=[],adsCW=[],adsCH=[],adsCAd=[],adsScr=adsD.getTime()%1e9,adsRRDevil="",adsRRCalled="",atwLoaded=0,adsIEGT9=0,adsIELT10=0,atwLB="728x90,948x250,950x252,940x230,101x1,970x66,970x90,970x250",adsTacOK=1;function atwInfoFn(){try{for(var e,a,t,d,n,i,s,o,r,l,c,m,p,u,w,f,h,v="",A="</td><td>",g='<style>table, .tableClass { border: solid 1px; }</style><table class="tableClass" width="100%" border=1><tr align="left"><th>Ad #</th><th>Magic Number</th><th>Orig Width</th><th>Orig Ht</th><th>Dyn Size</th><th>Actual Width</th><th>Actual Ht</th><th>AdId</th><th>BannerId</th><th>MNUM</th><th>Format</th><th>SeqId</th><th>timeStamp</th><th>Devil Flag</th><th>Ad Call Type</th><th>Parms Sent</th><th>AppNexus Id</th><th>AppNexus Size</th><th>AppNexus Auction Id</th><th>Rotate Time</th><th>Rotate Max</th><th>Keep Size</th></tr>',x=1;x<adsTile;x++)h=u=p=m=c=l=r=o=s=i=n=d=t=a=e="n/a",rT="n/a",rM="n/a",rK="n/a",atwUAC.adsInfo[x]&&((f=atwUAC.adsInfo[x]).sz&&(a=f.sz),f.ttype&&(r=f.ttype),f.other&&(o=f.other),adsDevilAd.ad[x]&&((w=adsDevilAd.ad[x]).adId&&(t=w.adId.split("|")[0]),w.bId&&(h=w.bId),w.mnum&&(d=w.mnum),w.aolFormat&&(n=w.aolFormat),w.seqId&&(i=w.seqId),w.timeStamp&&(s=w.timeStamp),w.width&&(l=w.width),w.height&&(c=w.height),w.anAdId&&(m=w.anAdId),w.anSize&&(p=w.anSize),w.anAuctionId&&(u=w.anAuctionId),w.aolDevilFlag&&"undefined"!=w.aolDevilFlag&&(e=w.aolDevilFlag),w.rTime&&(rT=parseInt(w.rTime)/1e3),w.rMax&&(rM=w.rMax),w.keepSize&&(rK=w.keepSize)),g+="<tr><td>"+x+A+f.mn+A+f.origW+A+f.origH+A+a+A+l+A+c+A+t+A+h+A+d+A+n+A+i+A+s+A+e+A+r+A+o+A+m+A+p+A+u+A+rT+A+rM+A+rK+"</td></tr>");g+='</table><div align="left">';for(x=1;x<adsTile;x++)h=t="",atwUAC.adsInfo[x]&&(v=(f=atwUAC.adsInfo[x]).url.replace(/addyn/,"adiframe"),adsDevilAd.ad[x]&&((w=adsDevilAd.ad[x]).adId&&(t=w.adId.split("|")[0]),h=w.bId,t&&h&&(v=v.replace(/;grp=/,";adid="+t+";bnid="+h+";grp="))),g+="URL for Ad "+x+" "+v+' <a href="'+v+'" target=_blank>Click to View Ad</a><P>');g+="</div>",window.open("","atwInfoWin","resizable=yes,status=no,toolbar=no,location=no,menubar=no,status=no,titlebar=no,scrollbar=yes").document.write(g)}catch(e){}}function adsDisableTacoda(e){adsTacOK=e&&"s"==e?2:e?0:1}function atwGDPRDelay(e,a){if(clearTimeout(atwUAC.GDPRTimeout),e&&"timeout"==e&&atwUAC.GDPRT&&"noCall"==atwUAC.gdprRet)atwUAC.GDPRTimeout=setTimeout(function(){atwGDPRDelay("timeout2")},atwUAC.GDPRT);else{e&&-1<e.indexOf("timeout")&&"noCall"==atwUAC.gdprRet&&(atwUAC.gdprRet="noCallTimeout");var t,d=adsDivs.length,n="",i="",s=0;if(a){var o=(new Date).getTime;i=(s=parseInt(o-a))<50?"1":s<100?"2":s<300?"3":s<500?"4":"5"}else i="no";"1"==atwUAC.gdpr&&(i+=",EU"),n="kvgdprstatus="+atwUAC.gdprRet+","+i+";",-1!=atwUAC.gdprRet.toString().indexOf("noC")||"0"!=atwUAC.gdpr&&"1"!=atwUAC.gdpr||(n+="gdpr="+atwUAC.gdpr+";",atwUAC.gdpr&&"0"!=atwUAC.gdpr&&null!=atwUAC.gdprC&&(n+="euconsent="+atwUAC.gdprC+";"));for(var r=0;r<d;r++)1!=(t=adsGetObj(adsDivs[r])).adLoaded&&(t.adURL=t.adURL.replace(/noperf=1;/,"noperf=1;"+n),t.LoadAd())}}function atwGDPRSetTimeout(e){e&&(atwUAC.GDPRT=1e3*parseInt(e))}function atwGDPR(){atwUAC.gdprRet="noCall";try{if(window.__cmp){atwUAC.GDPRTimeout=setTimeout(function(){atwGDPRDelay("timeout")},500);var a=(new Date).getTime();window.__cmp("getConsentData",null,function(e){null!=e.gdprApplies&&"null"!=e.gdprApplies?(atwUAC.gdpr=e.gdprApplies?"1":"0",atwUAC.gdprC=e.consentData,atwUAC.gdprRet="success",atwGDPRDelay("1",a)):(atwUAC.gdprRet="noCMPGDPRNull",atwGDPRDelay())})}else atwUAC.gdprRet="noCMP",atwGDPRDelay()}catch(e){atwUAC.gdprRet="noCMPCatch",atwGDPRDelay()}}function adsTacFn(){var e;(e=document.createElement("img")).style="display:none",e.src="//cms.analytics.yahoo.com/cms?partner_id=MSFT";try{document.body.appendChild(e)}catch(e){}atwInfo&&setTimeout("atwInfoFn()",3e3),adsTacOK&&adsMSNPing()}function adsBingPing(a,t,e){if(e&&(a+="&ResponseRedirect=appnexus"),"function"==typeof require)require(["c.onload"],function(){var e=document.createElement("script");e.src="//g.bing.com/uac/"+t+"?"+a,document.body.appendChild(e)});else if(-1<adsATOth.indexOf("kvmsft_olk=1")||-1<adsLo.indexOf("skype")){var d=document.createElement("script");d.src="//g.bing.com/uac/"+t+"?"+a,document.body.appendChild(d)}}function adsMSNPing(){var e,a,t=document,d=t.createElement("iframe"),n="";d.style.display="none",d.id="msn",d.name=d.id,d.style.width="0px",d.style.height="0px",n="dom=",a=adsVal||adsGetValues(),-1<adsLo.indexOf("msn")?n+="m":-1<adsLo.indexOf("outlook")?n+="o":-1<adsLo.indexOf("skype")&&(n+="s");var i;i=/(.*?)kvpg=(.*?)[;|$]/i.test(a)?RegExp.$2:"xxxyz",n+="&muid="+(/(.*?)kvmsft_muid=(.*?)[;|$]/i.test(adsATOth)?RegExp.$2:"xxxyz")+"&cd="+(/(.*?)kvmsft_ext_inv_cd=(.*?)[;|$]/i.test(adsATOth)?RegExp.$2:"xxxyz")+"&pg="+i,2==adsTacOK&&(n+="&smart=0"),e="//banner.advertising.com/ads/msn3.html#"+n,d.src=e,t.body.appendChild(d)}function adUACInit(){var e,a=window,t=adsLo.search(/atwcrpr=/i),d=adsLo.toLowerCase();atwGDPR();try{document.readyState&&"complete"==document.readyState?adsTacFn():a.addEventListener?a.addEventListener("load",adsTacFn,!1):a.attachEvent&&a.attachEvent("onload",adsTacFn)}catch(e){}if(adsIE="Microsoft Internet Explorer"==navigator.appName||-1<adsUA.indexOf("trident/")){var n=document.documentMode;n&&9<n&&(adsIEGT9=1),n&&n<=9&&(adsIELT10=1)}if(0<t){adsCA=adsLo.substr(t+8).split(/\||;/),adsCp=1;for(var i=adsCA.length,s=0,o=0;s<i;s+=4,o++)adsCF[o]=adsCA[s],adsCW[o]=adsCA[s+1],adsCH[o]=adsCA[s+2],adsCAd[o]=adsCA[s+3]}if(adsMNS=/(\?|&)atwmn=(.*?)(&|$)/.test(d)?RegExp.$2.split(/\||;/):"",/^[0-9A-Za-z,-.]+$/.test(unescape(adsMNS))||(adsMNS=""),adsKV=/(\?|&)atwkv=(.*?)(&|$)/.test(d)?RegExp.$2:"",/^[0-9A-Za-z,;=\-_]+$/.test(adsKV)||(adsKV=""),adsKV){var r,l=unescape(adsKV).split(";"),c="";for(s=0;s<l.length;s++)2==(r=l[s].split("=")).length&&(0!=r[0].indexOf("kv")&&(c+="kv"),c+=encodeURIComponent(r[0])+"="+encodeURIComponent(r[1])+";");adsKV=c}adsKV&&";"!=adsKV[adsKV.length-1]&&(adsKV+=";"),adsExcV=/(\?|&)atwexc=(.*?)(&|$)/.test(d)?RegExp.$2:"",(e=/(\?|&)atwip=(.*?)(&|$)/.test(d)?RegExp.$2:"")&&/^[0-9\.]+$/.test(unescape(e))&&(atwIP="ip="+e+";"),adsSZ=/(\?|&)atwsz=(.*?)(&|$)/.test(d)?RegExp.$2.split(/\||;/):"",/^[0-9A-Za-z,]+$/.test(unescape(adsSZ))||(adsSZ=""),adsTestCo=/(\?|&)atwtestco=(.*?)(&|$)/.test(d)?RegExp.$2:"",/^[0-9A-Za-z]+$/.test(unescape(adsTestCo))||(adsTestCo=""),adsRotateTime=/(\?|&)atwrotatetime=(.*?)(&|$)/.test(d)?RegExp.$2:"",atwUAC.sandbox=/(\?|&)atwsandbox=(.*?)(&|$)/.test(d)?RegExp.$2:""}function adsCkCol(e,a,t){var d=document.getElementById(e.divName),n="",i="",s=e.contentDocument||e.contentWindow.document,o=e.parentNode,r=0;if(s)try{n=s.body.innerHTML}catch(e){i="ErrorIframe"}e.anAdId&&-1<e.anAdId.toString().indexOf("ErrorAppNexus")&&(i=e.anAdId),"timeout"==t&&(n.indexOf("aolAdId")<0&&!e.anW&&(r=1),0<n.indexOf("aolAppNexus")&&!e.anW&&(r=1));var l=-1!=n.indexOf("AOL - HTML - Blank HTML Ad")||-1!=n.indexOf("ATCollapse.gif")||"noad"==e.anW;!r&&d&&d.col&&!l&&(e.width=e.w,e.height=e.h,e.style.visibility="visible");var c="",m=1,p="";if(!(o=d).rCalled&&1==o.rotate){if(o.rCalled=1,p=/RefreshSmall=(.*?)(\n)/i.test(n)?RegExp.$1:"",c=/RefreshLarge=(.*?)(\n)/i.test(n)?RegExp.$1:"",p||(p=/RefreshMN=("|')(.*?)("|')/i.test(n)?RegExp.$2:""),p){var u=/RefreshExclusive=(.*?)(\n)/i.test(n)?RegExp.$1:"",w=/RefreshReserved=(.*?)(\n)/i.test(n)?RegExp.$1:"",f=/var MP=(.*?)(\n)/i.test(n)?RegExp.$1:"",h=/AdTypePriority=(.*?)(\n)/i.test(n)?parseInt(RegExp.$1):"";("N"==u&&"N"==f&&493<=h||"N"==w&&"N"==f&&200<=h&&h<493)&&(m=0)}m&&p&&(o.rMN=p,c&&(o.rMNL=c),o.rTime||(o.rTime=/RefreshTime=(.*?)(\n)/i.test(n)?1e3*parseInt(RegExp.$1):3e4),o.rTime||(o.rTime=3e4),o.rMax||(o.rMax=/RefreshMax=(.*?)(\n)/i.test(n)?parseInt(RegExp.$1):"5"),o.keepSize||(o.keepSize=/RefreshKeepSize=(.*?)(\n)/i.test(n)?RegExp.$1:""),o.timeout?(clearTimeout(o.timeout),o.rTimes<=o.rMax&&(o.timeout=setTimeout(function(){adsReloadServer(o)},o.rTime))):o.timeout=setTimeout(function(){adsReloadServer(o)},o.rTime),o.mouseIn=0,o.addEventListener&&(o.addEventListener("mousemove",function(){o.mouseIn=1},!1),o.addEventListener("mouseover",function(){o.mouseIn=1},!1),o.addEventListener("mouseout",function(){o.mouseIn=0},!1)),0==atwUAC.rSetup&&(atwUAC.rSetup=1,window.addEventListener&&(window.addEventListener("focus",function(){atwUAC.focus=1},!1),window.addEventListener("blur",function(){atwUAC.focus=0},!1)),void 0!==document.hidden?(atwUAC.hidden="hidden",atwUAC.visCh="visibilitychange"):void 0!==document.msHidden?(atwUAC.hidden="msHidden",atwUAC.visCh="msvisibilitychange"):void 0!==document.webkitHidden&&(atwUAC.hidden="webkitHidden",atwUAC.visCh="webkitvisibilitychange"),void 0!==document[atwUAC.hidden]&&document.addEventListener&&document.addEventListener(atwUAC.visCh,atwVisCh,!1)))}return l?(e.style.width="0px",e.style.height="0px",d.width=0,d.height=0,e.style.display="none",i=i||"1",adsDevilObj(e.divName,"1","1",e,i),!0):(r||1==e.textAd||!d||d.dynSz||0!=e.ado||(e.ado=1,i=i||"0",adsDevilObj(e.divName,e.w,e.h,e,i)),!1)}function adsDoOnL(e,a){if(e&&!adsCkCol(e,a)&&e.divName){var t=a.getElementById("adDiv").innerHTML,d=t.indexOf("\x3c!--");if(0<d){var n=t.substr(d,t.length);document.getElementById(e.divName).innerHTML=n,adsDevilObj(e.divName,e.w,e.h,e,"0")}}}function adSetOthAT(e,a){if(e){adsATOth="",-1<(e=e.toLowerCase()).indexOf("gdpr=")&&(atwUAC.gdprRet="noCadSetOth"),";"!=e.charAt(e.length-1)&&(e+=";");var t,d=e.split(";"),n=d.length;for(i=0;i<n-1;i++)""!=d[i]&&"="!=d[i].charAt(d[i].length-1)&&(-1==(t=d[i].split("="))[0].indexOf("msft")&&(t[0]=t[0].replace("kv","kvmsft_")),(-1<t[0].indexOf("make")||-1<t[0].indexOf("model"))&&(t[1]=t[1].replace(/\+/g,"_")),-1<t[0].indexOf("optout")&&(t[1]=1),-1<t[0].indexOf("ext_inv_c")&&!adsTestCo&&(adsTestCo=t[1]),adsATOth+=escape(t[0])+"="+escape(t[1])+";")}else""==e&&(adsATOth="")}function atwVisCh(){document[atwUAC.hidden]?atwUAC.browsInV=1:atwUAC.browsInV=0}function atwGetVisiblePct(e){var a=e.offsetHeight,t=e.getBoundingClientRect(),d=t.right-t.left,n=t.bottom-t.top,i=0<=t.top&&Math.min(window.innerHeight,t.bottom)-t.top,s=0<=t.left&&Math.min(window.innerWidth,t.right)-t.left;return i=i||t.bottom,s=s||t.right,i<0||s<0||0===a?0:0===n||0===d?0:100*s*i/(d*n)}function adsReloadServer(e){var a,t,d;try{if(e.rMN&&0==atwUAC.browsInV&&1==atwUAC.focus&&1!=e.mouseIn&&50<=atwGetVisiblePct(e)){var n=unescape(e.adURL);n&&(window.adsDevilAd.ad&&window.adsDevilAd.ad[e.adNum+1]?(a=adsDevilAd.ad[e.adNum+1].width,t=adsDevilAd.ad[e.adNum+1].height):(d=document.getElementById("atwAdFrame"+e.adNum))&&(a=d.width,t=d.height),(970<=parseInt(a)||600<=parseInt(t))&&(e.rMN=e.rMNL),1!=e.rTimes&&e.origMN||(e.origMN=e.mn),e.mn=e.rMN,e.rMN&&(1==e.rTimes&&(n=n.replace(/alias=(.*?);/,"alias="+e.rMN+";").replace(/kvmn=(.*?);/,"kvmn="+e.rMN+";kvorigmn="+e.origMN+";"),e.keepSize&&"N"!=e.keepSize&&"n"!=e.keepSize&&a&&t&&(-1!=n.indexOf("allowedSizes=")?n=n.replace(/allowedSizes=.*?;/,"size="+a+"x"+t+";"):-1==n.indexOf("size=")&&(n=n.replace(/\/0\/-1\//,"/0/-1/size="+a+"x"+t+";")),e.w=a,e.h=t)),e.rTimes++,e.col=0,e.adURL=n,e.LoadAd()))}e.rMN&&e.rTimes<=e.rMax&&(e.timeout=setTimeout(function(){adsReloadServer(e)},e.rTime))}catch(e){}}function adsRotateMult(e,a,t,d){var n=adsGetObj(e);n&&(adsRotateTime?n.rTime=1e3*parseInt(adsRotateTime):a&&(n.rTime=1e3*parseInt(a)),t&&(n.rMax=parseInt(t)),d&&(n.keepSize=1),n.rTimes||(n.rTimes=1),n.rotate=1,n.timeout&&(clearTimeout(n.timeout),n.rTimes<=n.rMax&&(n.timeout=setTimeout(function(){adsReloadServer(n)},n.rTime))))}function adsReloadAd(e,a){adsD=new Date;var t=adsGetObj(e),d=t.adURL,n=adsD.getTime()%1e9;if(d){d=unescape(d),a&&(d=d.replace(/alias=(.*?);/,"alias="+a+";").replace(/kvmn=(.*?);/,"kvmn="+a+";"));var i=d.indexOf(";grp="),s="";s=(s=-1==i?d.replace(/ /,"")+" ":d.substring(0,i+5)+n).replace(/kvgrp=[0-9]*;/,"kvgrp="+n+";"),-1<d.indexOf("random=")&&(s=s+";random="+n),t.adURL=s,t.LoadAd()}}function adsReloadIframe(e,a){var t,d="",n="";try{d=document.getElementById(e)}catch(e){}if(d){adsD=new Date;try{n=d.src}catch(e){}if(n){n=unescape(n),a&&(n=n.replace(/alias=(.*?);/,"alias="+a+";").replace(/kvmn=(.*?);/,"kvmn="+a+";"));var i=adsD.getTime()%1e9,s=n.indexOf(";grp=");n=(n=n.substring(0,s+5)+i).replace(/kvgrp=[0-9]*;/,"kvgrp="+i+";");var o=/adclntid=1002;alias=(.*?);/i.test(n)?RegExp.$1:"";t=(n=n.replace(/adclntid=1002;alias=(.*?);(.*?)kvpg=/,"adclntid=1002;alias="+o+";"+adsATOth+"kvpg=")).substr(n.indexOf("/0/-1/")+6,n.length),atwUAC.adsInfo[d.adNum+1].surl=t;try{d.src=n,adsBingPing(t,"request")}catch(e){}}}}function adsDevilObj(e,a,t,d,n){var i,s=document.getElementById(e),o=s.adNum+1,r="",l="";if(n&&!(-1<n.indexOf("Error")||-1<n.indexOf("Iframe")))try{(l=d.contentDocument||d.contentWindow.document)&&(r=l.body.innerHTML)}catch(e){n="ErrorIframe"}n&&n.indexOf("Error")<0&&(-1!=r.indexOf("AOL - HTML - Blank HTML Ad")?n="No Ad":-1!=r.indexOf("ATCollapse.gif")?n="ATCollapse":"noad"==d.anW&&(n="AppNexus No Ad")),n&&"0"!=n&&"1"!=n||(n="Success");var c,m=/mnum=(.*?)\//i.test(r)?RegExp.$1:"",p=/aolAdId=("|')(.*?)("|')/i.test(r)?RegExp.$2:"|",u=/zMoatBannerID=(.*?)(\n)/i.test(r)?RegExp.$1:"",w=/aolFormat=("|')(.*?)("|')/i.test(r)?RegExp.$2:"",f=/aolGUID=("|')(.*?)("|')/i.test(r)?RegExp.$2:"",h=/anAdId=("|')(.*?)("|')/i.test(r)?RegExp.$2:"",v=/anSize=("|')(.*?)("|')/i.test(r)?RegExp.$2:"",A=/anAuctionId=("|')(.*?)("|')/i.test(r)?RegExp.$2:"";try{d.anAdId&&(h=d.anAdId),d.anAuctionId&&(A=d.anAuctionId),d.anSize&&(v=d.anSize)}catch(e){}c=f.split("|"),"|"==p&&(p=""),d.setAttribute("banId",p);try{adsDevilAd.ad[o]={divName:d.divName,mn:d.mn,adId:p.split("|")[0],aolFormat:w,width:a,height:t,mnum:m,sz:d.sz,seqId:c[1],bId:u,timeStamp:c[0],anAdId:h,anSize:v,anAuctionId:A,retType:n},s.rotate&&(adsDevilAd.ad[o].rTime=s.rTime,adsDevilAd.ad[o].rMax=s.rMax,adsDevilAd.ad[o].keepSize=s.keepSize)}catch(e){}if((0<r.indexOf("adnxs.com")||0<r.indexOf("aolAppNexus="))&&(i=1),n&&n.indexOf("Error")<0){try{adsDevilAd.ad[o].aolDevilFlag=top.aol_devil_flag,adsRRDevil||("300x250,300x600,300x1050"==d.sz&&"1050"!=t&&(adsRRDevil="n"),(top.aol_devil_flag||"300x250,300x600,300x1050"==d.sz&&"1050"==t)&&(adsRRDevil="y"))}catch(e){}try{window.adsDevilAd.hasOwnProperty("resized")&&adsDevilAd.resized(e,a,t),window.atwUAC.hasOwnProperty("adLoaded")&&atwUAC.adLoaded(o,adsDevilAd.ad[o]),adsBingPing(atwUAC.adsInfo[o].surl,"response",i);var g=d.textAd?"1":"0";window.adsDevilAd.hasOwnProperty("moat")&&adsDevilAd.moat(o,e,a,t,g),"300"==a&&(adsDevilAd.RRWidth=a,adsDevilAd.RRHeight=t)}catch(e){}}else try{window.atwUAC.hasOwnProperty("adError")&&atwUAC.adError(o,adsDevilAd.ad[o]),adsBingPing(atwUAC.adsInfo[o].surl,"error",i)}catch(e){}}function adsANOnL(e,a,t){try{var d=e.frameElement;if(d.anLoaded=1,d.comment=1,"noad"==t?(d.anW="noad",d.anH="0",d.anAdId="noad",d.anAuctionId="noad",d.anSize="1|1"):"error"==t?(d.anW="noad",d.anH="0",d.anAdId="ErrorAppNexus: "+a.errMessage,d.anAuctionId="error",d.anSize="1|1"):a&&(a.banner?(d.anW=a.banner.width,d.anH=a.banner.height):a.width&&a.height&&(d.anW=a.width,d.anH=a.height),d.anAdId=a.creativeId,d.anAuctionId=a.auctionId,d.anSize=d.anW+"|"+d.anH),d&&(t||a))if(1!=d.textAd){if(!adsCkCol(d,e.document)&&d.divName){var n=parent.document.getElementById(d.divName);n&&1==n.dynSz&&adsRMIFOnL(e,e.document)}}else adsDoOnL(d,e.document);else adsDevilObj(window.frameElement.divName,window.frameElement.w,window.frameElement.h,window.frameElement,"ErrorAppNexus: No adObj")}catch(e){adsDevilObj(window.frameElement.divName,window.frameElement.w,window.frameElement.h,window.frameElement,"ErrorAppNexus: Catch")}}function adsRMIFOnL(e,a,t){var d=e.frameElement,n=d.parentNode,i="",s="",o=0,r="",l=d.contentDocument||d.contentWindow.document,c=0;if(l)try{r=l.body.innerHTML}catch(e){}if(/ACE_AR(.*?)possible_size(.*?)[,}]/i.test(r)?o=1:/ACE_AR(.*?)Size(.*?)['"](.*?)['"]/i.test(r)&&0<unescape(RegExp.$3).indexOf(",")&&(o=1),/anSize=["']([\d]*?)\|([\d]*)["']/i.test(r)&&1<unescape(RegExp.$2))i=unescape(RegExp.$1),s=unescape(RegExp.$2);else if(/aolSize=["']([\d]*?)\|([\d]*)["']/i.test(r)&&1<unescape(RegExp.$2))i=unescape(RegExp.$1),s=unescape(RegExp.$2),"6"==i&&"2"==s&&(i="300",s="250");else if(0!=d.anW&&0!=d.anH)i=d.anW,s=d.anH;else if(/ACE_AR(.*?)Size(.*?)[,}]/i.test(r)&&!o){var m=unescape(RegExp.$2).replace(/[^\d\+]/g,"");i=parseInt(m.substring(0,3),10),s=parseInt(m.substring(3,m.length),10)}else c=1;c?"timeout"!=t&&r.indexOf("aolAppNexus")<0&&setTimeout(function(){adsActualResize(c,d,n,o,a,i,s,0,0)},200):(d.comment=1,adsActualResize(c,d,n,o,a,i,s,0,0))}function adsActualResize(e,a,t,d,n,i,s,o,r){var l="0";if(1==e){var c,m="";try{(c=a.contentDocument||a.contentWindow.document)&&(m=c.body.innerHTML)}catch(e){}if(/anSize=["']([\d]*?)\|([\d]*)["']/i.test(m)&&1<unescape(RegExp.$2))i=unescape(RegExp.$1),s=unescape(RegExp.$2),e="";else if(0!=a.anW&&0!=a.anH)i=a.anW,s=a.anH,e="";else try{i=a.contentWindow.document.body.scrollWidth,s=a.contentWindow.document.body.scrollHeight}catch(e){}var p="";if(p=-1<t.sz.indexOf(atwLB)?"728x90,970x66,970x90,970x250,948x250,800x250,1000x90":t.sz,e&&i&&s&&1<i&&1<s&&(t.w!=i||t.h!=s)&&t.sz){var u,w,f,h,v=p.split(","),A=v.length,g=100,x=0;for(f=0;f<A;f++)u=v[f].split("x"),(w=Math.abs(u[0]-i)+Math.abs(u[1]-s))<g&&(g=w,x=f);h=v[x].split("x"),i=h[0],s=h[1]}}!d&&i&&s&&1<i&&1<s&&(t.w!=i||t.h!=s)?(l="1",a.width=i,a.height=s):!d&&e&&r<10&&(r++,setTimeout(function(){adsActualResize(e,a,t,d,n,i,s,1,r)},200)),0==o&&(0==a.ado&&(adsDevilObj(t.divName,i,s,a,l),a.ado=1),i&&s&&a&&(a.className="uac_"+i+"x"+s))}function adsRmChildren(e){for(;0<e.childNodes.length;){var a=e.childNodes[0],t=a.id;t&&(-1!=t.toString().indexOf("atwAdFrame")&&(a.src="about:blank"),a.i=""),0<a.childNodes.length&&adsRmChildren(a),e.removeChild(a)}}function adsClrDiv(){adsRmChildren(this)}function adsClrAd(e){adsRmChildren(adsGetObj(e))}function adsGetObj(e){return"object"!=typeof e?document.getElementById(e):e}function adsFilelessFn(e,a){var t=e.contentWindow?e.contentWindow:e.contentDocument.document?e.contentDocument.document:e.contentDocument;t.document.open();var d='<html><head><title>Aol Advertisement</title><script type="text/javascript">\n';d+='function adsPageOnL(){try {var f=window.frameElement,inD=f.contentDocument||f.contentWindow.document,aD1=inD.body.innerHTML,appNexusAd=aD1.indexOf("aolAppNexus")>0;adsLoaded=1;\n',d+=" if (f&&f.anLoaded!=1&&!appNexusAd&&f.comment!=1){if (f.textAd!=1){var collapse=parent.adsCkCol(f,document);\n",d+=" if (!collapse&&f.divName){var parDiv=parent.document.getElementById(f.divName);\n",d+=" if (parDiv&&(parDiv.dynSz==1)&&parent.adsRMIFOnL){parent.adsRMIFOnL(window,document)}}}else{parent.adsDoOnL(f,document)}}}catch(e){}}\n",d+='function adsPageTimeout(){try {var f=window.frameElement,inD=f.contentDocument||f.contentWindow.document,aD1=inD.body.innerHTML,appNexusAd=aD1.indexOf("aolAppNexus")>0;\n',d+=' if (f&&f.anLoaded!=1&&!appNexusAd&&f.comment!=1&&!adsLoaded){if (f.textAd!=1){var collapse=parent.adsCkCol(f,document,"timeout");\n',d+=" if (!collapse&&f.divName){var parDiv=parent.document.getElementById(f.divName);\n",d+=" if (parDiv&&(parDiv.dynSz==1)&&parent.adsRMIFOnL){parent.adsRMIFOnL(window,document)}}if (f.comment!=1){var z=setTimeout(function(){adsPageTimeout()},1000);}}}}catch(e){}}\n",d+="<\/script></head>\n",d+='<body id="'+e.id+'"  onload=\'setTimeout("adsPageOnL()",10)\' onerror=\'parent.adsDevilObj(window.frameElement.divName,window.frameElement.w,window.frameElement.h,window.frameElement,"ErrorIframe")\' style="overflow:visible;border:0;background-color:transparent;">\n',d+='<div id="adDiv" style="overflow:visible;border:0;">\n',d+='<script type="text/javascript">\n',d+="var inDapIF=true,inFIF=true,adsLoaded=0;\n",d+="var zz=setTimeout(function(){adsPageTimeout()},2000)\n",d+="<\/script>\n",d+="<script type='text/javascript' onerror='parent.adsDevilObj(window.frameElement.divName,window.frameElement.w,window.frameElement.h,window.frameElement,\"ErrorScript\")' src='"+a+"'><\/script>",d+="</div></body></html>",t.document.write(d);var n=500;adsIELT10&&(n=1e3);setTimeout(function(){t.document.close()},n)}function atwIEDelay(e,a){var t=function(){e.attachEvent?e.detachEvent("onload",t):e.addEventListener&&e.removeEventListener("load",t,!1),window.atwUAC.hasOwnProperty("adStarted")&&atwUAC.adStarted(e.adNum+1,e.divName,e.w,e.h),adsBingPing(atwUAC.adsInfo[e.adNum+1].surl,"request"),"1"==a?adsFilelessFn(e,e.adURL):"iframe"==a&&(e.src=e.adURL,e.attachEvent?e.attachEvent("onload",function(){adsDevilObj(e.divName,e.w,e.h,e,"Iframe")}):e.addEventListener&&e.addEventListener("load",function(){adsDevilObj(e.divName,e.w,e.h,e,"Iframe")},!1))};e.attachEvent?e.attachEvent("onload",t):e.addEventListener&&e.addEventListener("load",t,!1)}function adsLoadAd(){if("noCall"!=atwUAC.gdprRet){this.ClearAd();var e=document.createElement("iframe");e.textAd=this.textAd,this.col||1==this.textAd?(e.visibility="hidden",e.width=0,e.height=0):(e.width=this.w,e.height=this.h),e.title="Ad",e.marginWidth=0,e.marginHeight=0,e.setAttribute("allowtransparency","true"),e.frameBorder=0,e.scrolling="no",e.w=this.w,e.h=this.h,e.mn=this.mn,e.divName=this.divName,e.sz=this.sz,e.adNum=this.adNum,e.adURL=this.adURL,e.comment=0,e.ado=0,e.anW=0,e.anH=0,e.anLoaded=0,atwUAC.sandbox&&e.setAttribute("sandbox","allow-forms allow-scripts allow-popups allow-popups-to-escape-sandbox allow-same-origin"),this.appendChild(e),this.iframe?(e.id="adsF"+this.adNum,e.name=e.id,adsIEGT9?atwIEDelay(e,"iframe"):(e.attachEvent?e.attachEvent("onload",function(){adsDevilObj(e.divName,e.w,e.h,e,"Iframe")}):e.addEventListener&&e.addEventListener("load",function(){adsDevilObj(e.divName,e.w,e.h,e,"Iframe")},!1),e.src=this.adURL,window.atwUAC.hasOwnProperty("adStarted")&&atwUAC.adStarted(e.adNum+1,e.divName,e.w,e.h),adsBingPing(atwUAC.adsInfo[e.adNum+1].surl,"request"))):(e.id="atwAdFrame"+this.adNum,e.name=e.id,adsIEGT9?atwIEDelay(e,adsFileless):(1==adsFileless&&adsFilelessFn(e,this.adURL),window.atwUAC.hasOwnProperty("adStarted")&&atwUAC.adStarted(e.adNum+1,e.divName,e.w,e.h),adsBingPing(atwUAC.adsInfo[e.adNum+1].surl,"request")))}}function adSetupDiv(e,a,t,d,n,i,s,o){var r,l="adsDiv"+adsDivs.length;if(d&&""!=d?r=adsGetObj(d):(document.write("<div id='"+l+"'></div>"),r=document.getElementById(l),d=l),"object"==typeof d)try{""==d.id?(r.divName=l,r.id=l):r.divName=d.id}catch(e){}else r.divName=d;r.LoadAd=adsLoadAd,r.ClearAd=adsClrDiv,r.mn=i,r.textAd="text"==n?1:0,r.dynSz=n&&"text"!=n&&"iframe"!=n?1:0,r.sz=s||0,r.w=e,r.h=a,r.adURL=t,r.adNum=adsDivs.length,r.col=o,r.iframe="iframe"==n?1:0,adsDivs[adsDivs.length]=r}function adsGetValues(){var e,a,t="",d="",n="",i="";(a=/(\?|&)atw[Nn][Tt]=(.*?)(&|$)/.test(adsLo)?RegExp.$2:"")&&(adsNt=a),(e=adsLo.toLowerCase()).match(/(?:https?\:){0,1}\/\/(.*?)(?:[?#]|$)/),150<(t=RegExp.$1).length&&(t=t.substr(0,150)),t=(t="kvpg="+(t=escape(t.replace(/\/$/,"")))+";").replace(/\//g,"%2F"),-1==adsATOth.indexOf("kvugc")&&(d="kvugc=",0==window.adSetUGC?d+="0;":1==window.adSetUGC?d+="1;":-1==adsATOth.indexOf("cmsid")?d+="0;":d+="1;");try{i=document.referrer}catch(e){}return i?n=0<i.toLowerCase().indexOf("spartan/")?"kvrefd=ms-dhp;":(e=i.match(/(?:https?\:){0,1}\/\/(.*?)(?:[?#]|$)/),150<(e=RegExp.$1).length&&(e=e.substr(0,150)),"kvrefd="+(e=(e=escape(e.replace(/\/$/,""))).replace(/\//g,"%2F"))+";"):0<adsLo.toLowerCase().indexOf("ocid=spartan")&&(n="kvrefd=ms-dhp;"),t+d+n}function htmlAdWH(e,a,t,d,n,i){if(!e)return 0;e=e.toString();document;var s,o="",r=0,l=0,c=0,m=0,p=0,u=(window,a),w=t,f=i||"",h="",v="",A="",g="";if(adsVal||(adsVal=adsGetValues()),"240"==a&&"80"==t&&(d="text",adsFileless=1),d&&0<(d=d.toLowerCase()).indexOf("c")&&(c=1,d=d.substr(0,d.length-1)),"2"==a&&"1"==t&&(c=1),"fileless"==d&&(m=adsFileless=1),i?(a=(s=i.split(",")[0].split("x"))[0],t=s[1],m&&(h="r")):i="",adsSZ)for(var x,C=adsSZ.length,R=0;R<C;R+=2)if(adsTile==adsSZ[R+1]){a=(x=adsSZ[R].split("x"))[0],t=x[1];break}if("RR"==a||"rr"==a?(a=300,t=250,m&&(h="r"),i="300x250,300x600,300x1050",p=1,adsRRCalled="1"):"LB"==a||"lb"==a?(a=728,t=90,m&&(h="r"),i=atwLB,-1<adsATOth.indexOf("kvmsft_ext_inv_cd=de")&&(i+=",800x250")):"MM"!=a&&"mm"!=a||(a=300,t=250,m&&(h="r"),i="300x250,320x480,320x50"),adsCp){var E=adsCF.length;for(R=0;R<E;R++)if(/^http[s]{0,1}:\/(\/ibw\.aol\.com\/|\/ibw\-qai\.aol\.com\/|\/sales\.oath\.com\/|\/sales\-qa\.oath\.com\/)(.*?)/.test(adsCF[R])&&/^[0-9A-Za-z\/.:_\-]+$/.test(unescape(adsCF[R]))||/^\d+$/.test(unescape(adsCF[R]))){if(i)for(var D,I=i.split(","),T=I.length,y=0;y<T;y++)D=I[y].split("x"),adsCW[R]==D[0]&&adsCH[R]==D[1]&&(l=1);if(l||adsCW[R]==a&&adsCH[R]==t||adsCAd[R]==adsTile){if(/^\d+$/.test(adsCF[R])){var O=/(\?|&)atwcrprqa=(.*?)(&|$)/.test(adsLo.toLowerCase())?"-qa":"";adsCF[R]="https://sales"+O+".oath.com/store-creative-api/v2/preview/creative/"+adsCF[R]+"/index"}H="iframe"==d?adsCF[R]+".html":adsCF[R]+".js",adsCW[R]=0,r=1;break}}}if(adsMNS){var b,U=adsMNS.length,L=a+"x"+t,N=0,S=0;for(R=0;R<U;R+=2){if(N=0<(b=adsMNS[R+1]).indexOf("a")?(b=b.replace("a",""),1):0,-1<b.indexOf("only")?(b=b.replace("only",""),only=1):only=0,i)for(var M=i.split(","),z=M.length,k=0;k<z;k++)b==M[k]&&(S=1);1==S||adsTile==b||L==b||"RRxRR"==b&&1==p?(e=adsMNS[R],N||(adsMNS[R+1]=""),only&&(adsMNS[R+1]="only")):only&&(e="0")}}if("0"==e)return adsTile++,0;if(0==r){var $="";-1!=atwUAC.gdprRet.toString().indexOf("noC")||"0"!=atwUAC.gdpr&&"1"!=atwUAC.gdpr?"noCall"!=atwUAC.gdprRet&&(A="kvgdprstatus="+atwUAC.gdprRet+",0;"):(A="gdpr="+atwUAC.gdpr+";",atwUAC.gdpr&&"0"!=atwUAC.gdpr&&(null!=atwUAC.gdprC&&(A+="euconsent="+atwUAC.gdprC+";"),g=",EU"),A+="kvgdprstatus=success,0"+g+";"),i&&!p?$="allowedSizes="+i+";":"r"!=h&&($="size="+a+"x"+t+";"),$+="noperf=1;",1!=adsTile&&($+="noaddonpl=y;"),"blank"==adsExcV?o="artexc=all;":"imgOnly"==adsExcV&&(o="artexc=all;artinc=art_image,art_img1x1,art_3pimg,art_rrimage,art_rrimg1x1,art_rr3pimg;"),$+=o+(adsATOth+adsKV+adsVal+atwIP+"kvmn="+e+";kvgrp="+adsScr+";extmirroring=0;kvtile="+adsTile+";target=_blank;aduho="+-1*adsD.getTimezoneOffset()+";")+"grp="+adsScr;var F="5113.1",P="221794",H="//at.atwola.com",W=adsTestCo.toLowerCase();"us"!=W&&"ca"!=W&&"br"!=W&&("jp"!=W?(H="//uk.at.atwola.com",F="1065.1",P="2590140"):H="//jp.at.atwola.com"),-1<adsATOth.indexOf("kvmsft_olk=1")&&H.indexOf("ol.")<0&&(H=H.replace(/\/\//,"//ol.")),H+="/addyn/3.0/"+F+"/"+P+"/0/-1/",H+=v=$.replace(/noperf=1;/,"noperf=1;adclntid=1002;"+A+"alias="+e+";")}atwUAC.adsInfo[adsTile]={mn:e,url:H,surl:v,origW:u,origH:w,sz:f,other:adsATOth,ttype:d},"iframe"==d?adSetupDiv(a,t,H.replace(/addyn\/3.0/,"adiframe/3.0"),n,"iframe",e,i,c):adSetupDiv(a,t,H,n,"text"==d?"text":h,e,i,c),adsDivs[adsDivs.length-1].LoadAd(),adsTile++}adUACInit(),atwUAC.browsInV=0,atwUAC.rSetup=0,atwUAC.focus=1,atwUAC.htmlAdWH=htmlAdWH,atwUAC.adSetOthAT=adSetOthAT,atwUAC.adsInfo=atwUAC.adsInfo||{},atwUAC.adsRotateMult=adsRotateMult,atwUAC.adsReloadAd=adsReloadAd,atwUAC.atwGDPRSetTimeout=atwGDPRSetTimeout,window.adsDevilAd=window.adsDevilAd||{},window.adsDevilAd.ad=window.adsDevilAd.ad||[],"function"==typeof define&&define.amd&&define("atwUAC",[],function(){return atwUAC});