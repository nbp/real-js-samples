var containerDivdd="",sspCallsArray=new Array,sspResultArray=[],anySSPZeroCPM=!0,inexp=0,inexc="ad",aolpp=0,aolc="ad",housetaggot=(inexp=0,inexc="ad",aolpp=0,aolc="ad",""),drawIncrement="0",totalPtrs="0",chox=document.charSet||document.characterSet,klst=["20081","550","2984","267","12576","625","15032","11450","11116","1","58058","293","14339","237","11232","45100","99","172008","26395","11700","281","11233","619","1281","870","10542","316","888","64482","260","1305","220","3252","1249","6000"];function rStringsFunc(){for(var e="am78LMN9cdefIRUAghiklGFbno0KOP123WXT45HDE6VZpqrsBCtuvJQwxySTz",t="",s=0;s<19;s++){var a=Math.floor(Math.random()*e.length);t+=e.substring(a,a+1)}return t}function arrayShuffle(e){for(var t,s,a=e.length;a;)s=Math.floor(Math.random()*a--),t=e[a],e[a]=e[s],e[s]=t;return e}function createRenderIframe(e,t){if(0==drawContentDone)if(collapseAdUnit&&(anySSPZeroCPM||0==sspResultArray.length)){if(drawContentDone=!0,void 0!==window.postMessage)for(var s=0;s<placementIDsList.length;s++)window.parent.postMessage(placementIDsList[s],"*")}else{drawContentDone=!0;var a=window.navigator.userAgent.indexOf("MSIE ")>0,r=document.createElement("iframe");r.setAttribute("id","ad-iframe-"+placementShortCode),r.setAttribute("frameBorder",0),r.setAttribute("allowtransparency",!0),r.setAttribute("hspace",0),r.setAttribute("marginwidth",0),r.setAttribute("marginheight",0),r.setAttribute("scrolling","no"),r.setAttribute("vspace",0),"SRP_RR1_300"==placementShortCode?(r.setAttribute("width","300px"),r.setAttribute("height","600px")):(r.setAttribute("width",adunitw+"px"),r.setAttribute("height",adunith+"px")),containerDivdd&&containerDivdd.appendChild(r);var n=function(t){var s,a,r=((a=(s=t).contentWindow||s.contentDocument)&&a.document&&(a=a.document),a);r&&(r.open(),r.write(e),r.close())};(d=document.getElementById("ad-iframe-"+placementShortCode))&&a?d.onload=function(){loaded||(loaded=!0,n(d))}:d&&(loaded=!0,n(d)),anySSPZeroCPM||(containerDivdd.id=t),"728x90_HP"==placementShortCode&&void 0!==window.postMessage&&window.parent.postMessage("expand_100712_728x90","*")}var d}function findHighestecx(e){for(var t=1,s=0;t<e.length;t++)e[s]<e[t]&&(s=t);return s}var mountexc=[],drawContentDone=!1;function drawContent(){for(var e=[],t=0;t<sspResultArray.length;)e.push(sspResultArray[t].cpm),Number(sspResultArray[t].cpm)>0&&(anySSPZeroCPM=!1),t++;if(anySSPZeroCPM)if(0==sspResultArray.length)createRenderIframe(".",placementShortCode+"-something");else if("undefined"!=typeof strURL&&(housetaggot=strURL),sendYM){var s=document.getElementsByTagName("body")[0],a=s.firstChild,r=document.createElement("div");r.id=ymPlacementId,r.setAttribute("class","ym"),r.style.cssFloat="left",s.insertBefore(r,a);var n=document.createElement("script");n.type="text/javascript",n.src="https://static.yieldmo.com/ym.m2.js",s.insertBefore(n,s.secondChild)}else createRenderIframe(housetaggot,placementShortCode+"-something");else sspResultArray[findHighestecx(e)].nexc.match(/_rubicon/g)?("script"==sspResultArray[findHighestecx(e)].tagtype&&createRenderIframe('<script>rpx_init = {clk: true,dck: "%%CLICK_URL_UNESC%%"};<\/script><div id="rp-clk-omp"><script src=https://ads.rubiconproject.com/utils/ebay/rp-ebay-clk.js><\/script><script type=\'text/javascript\'>'+decodeURIComponent(sspResultArray[findHighestecx(e)].tag)+"<\/script></div><script type='text/javascript'>clk('rp-clk-omp');<\/script>",placementShortCode+"-"+sspResultArray[findHighestecx(e)].nexc),"html"==sspResultArray[findHighestecx(e)].tagtype&&createRenderIframe('<script>rpx_init = {clk: true,dck: "%%CLICK_URL_UNESC%%"};<\/script>rpx_init = {clk: true,dck: "%%CLICK_URL_UNESC%%"};<div id="rp-clk-omp"><script src=https://ads.rubiconproject.com/utils/ebay/rp-ebay-clk.js><\/script>'+decodeURIComponent(sspResultArray[findHighestecx(e)].tag)+"</div><script type='text/javascript'>clk('rp-clk-omp');<\/script>",placementShortCode+"-"+sspResultArray[findHighestecx(e)].nexc)):createRenderIframe(sspResultArray[findHighestecx(e)].tag,placementShortCode+"-"+sspResultArray[findHighestecx(e)].nexc)}function addScripts(e){var t=document.createElement("script");if(t.type="text/javascript",t.async="true",t.src=e,t.setAttribute("async","async"),t.id=1e18*Math.random(),e){t.readyState?t.onreadystatechange=function(){"loaded"!=t.readyState&&"complete"!=t.readyState||(t.onreadystatechange=null)}:(t.onload=function(){},t.onerror=function(){totalPtrs-=1});var s=document.getElementsByTagName("head")[0];s.insertBefore(t,s.secondChild)}}function Logoexc(e,t,s,a){return{nexc:e,cpm:t,tag:s,tagtype:a}}function callbackIndex(e){"seatbid"in e&&(inexp=Number(e.seatbid[0].bid[0].ext.pricelevel/.92),inexc=e.seatbid[0].bid[0].adm),sspResultArray.push(Logoexc(rStringsFunc()+"_index",inexp,inexc,"html")),++drawIncrement==totalPtrs&&drawContent()}function processPubMaticBid(e){var t=e.PubMatic_Bid.ecpm;sspResultArray.push(Logoexc(rStringsFunc()+"_pubmatic",Number(t),e.PubMatic_Bid.creative_tag,"html")),housetaggot=e.PubMatic_Bid.creative_tag,++drawIncrement==totalPtrs&&drawContent()}function callbackAppNexus(e){var t=0;e.result.cpm>0&&(t=e.result.cpm/1e4/.92),"SRP_RR1_300"==placementShortCode?sspResultArray.push(Logoexc(rStringsFunc()+"_apn",Number(t),"<iframe title='ap--nn' name='ap--nn' scrolling=no marginwidth=0 marginheight=0 frameborder=0 src="+e.result.ad+" width=300 height=600></iframe>","html")):sspResultArray.push(Logoexc(rStringsFunc()+"_apn",Number(t),"<iframe title='ap--nn' name='ap--nn' scrolling=no marginwidth=0 marginheight=0 frameborder=0 src="+e.result.ad+" width="+adunitw+" height="+adunith+"></iframe>","html")),++drawIncrement==totalPtrs&&drawContent()}function rp_onAdResponseLoaded(t){var s;if("ok"==t.status)if(e=0,"ok"==t.ads[0].status)for(var a=0;a<t.ads.length;a++)s=t.ads[a],e=s.cpm,"script"==s.type&&sspResultArray.push(Logoexc(rStringsFunc()+"_rubicon",Number(e),s.script,"script")),"html"==s.type&&sspResultArray.push(Logoexc(rStringsFunc()+"_rubicon",Number(e),s.html,"html"));else sspResultArray.push(Logoexc(rStringsFunc()+"_rubicon",Number(e),"ad","html"));++drawIncrement==totalPtrs&&drawContent()}function callbackOpenX(e){for(var t=0;t<e.ads.ad.length;t++)adiexc=e.ads.ad[t],sspResultArray.push(Logoexc(rStringsFunc()+"_openx",Number(adiexc.pub_rev/1e3/.95),adiexc.html,"html"));++drawIncrement==totalPtrs&&drawContent()}function callbackAOL(e){e.seatbid.length>0&&(aolpp=Number(e.seatbid[0].bid[0].price),aolc=e.seatbid[0].bid[0].adm),sspResultArray.push(Logoexc(rStringsFunc()+"_aol",aolpp,aolc,"html")),++drawIncrement==totalPtrs&&drawContent()}var klstfind=[],klstsend=[];for(var key in klstarray)"cat"==key&&(klstfind=klstarray[key]),0==klstfind.length&&"fvi"==key&&(klstfind=klstarray[key]),0==klstfind.length&&"fse"==key&&(klstfind=klstarray[key]),0==klstfind.length&&"fwi"==key&&(klstfind=klstarray[key]),klstsend=klstfind;var iklst,resultklst=[];for(iklst=0;iklst<klst.length;++iklst)klst[klst[iklst]]=1;for(iklst=0;iklst<klstfind.length;++iklst)1===klst[klstfind[iklst]]&&(resultklst.push(klstfind[iklst]),klst[klstfind[iklst]]=0);var randomNum=1e18*Math.random(),adates=new Date,akltstamp=adates.getFullYear()+"-"+(adates.getMonth()+1)+"-"+adates.getDate()+" "+adates.getHours()+":"+adates.getMinutes()+":"+adates.getSeconds(),atimezone=adates.getTimezoneOffset()/60*-1;function initAndAddScripts(){var e=[{ssp:"aol",callSSP:sendAol,path:"https://adserver-us.adtech.advertising.com/pubapi/3.0/"+aolNetworkId+"/"+aolPlacementId+"/0/"+aolSize+"/ADTECH;v=2;cmd=bid;cors=yes;kvrefd=ebay.com;alias="+placementShortCode+";misc="+randomNum+";callback=callbackAOL"},{ssp:"rubicon",callSSP:sendRub,path:"https://fastlane.rubiconproject.com/a/api/fastlane.jsonp?enc=url&account_id="+rp_account1+"&site_id="+rp_site1+"&zone_id="+rp_zoned+"&size_id="+rp_zonedsize+"&rp_callback=rp_onAdResponseLoaded&rp_secure=1&tk_user_key="+rp_user_key1+"&tg_i.usde="+usde+"&tg_i.umde="+umde+"&tg_i.categories="+klstsend.toString()+"&p_pos="+rp_pos+"&p_screen_res="+screen.width+"x"+screen.height+"&rand="+Math.random()+"&rf=https%3A%2F%2F"+urlAdReqs+"%2F"},{ssp:"index",callSSP:sendIndex,path:"https://as-sec.casalemedia.com/cygnus?v=7&fn=callbackIndex&s="+indexsiteid+"&r=%7B%22id%22%3A"+randomNum+"%2C%22site%22%3A%7B%22page%22%3A%22https%3A%2F%2F"+urlAdReqs+"%2F%22%2C%22ref%22%3A%22%22%7D%2C%22imp%22%3A%5B%7B%22id%22%3A%221%22%2C%20%22banner%22%3A%7B%22w%22%3A"+adunitw+"%2C%22h%22%3A"+adunith+"%2C%22topframe%22%3A1%7D%2C%22ext%22%3A%20%7B%22sid%22%3A%22"+indexsiteid+"%22%2C%22custom%22%3A%22"+rp_user_key1+"%22%2C%22kv%22%3A%22cat:"+klstsend.toString()+"%22%2C%22siteID%22%3A"+indexsiteid+"%7D%7D%5D%7D"},{ssp:"pubmatic",callSSP:sendPubm,path:"https://showads.pubmatic.com/AdServer/AdServerServlet?operId=102&pubId="+pubmId+"&siteId="+pubmsiteId+"&adId="+pubmadId+"&kadwidth="+adunitw+"&kadheight="+adunith+"&inIframe=1&sec=1&pageURL=https%3A%2F%2F"+encodeURIComponent(urlAdReqs)+"%2F&rs=2&dctr=cat%3D"+encodeURIComponent(klstsend.toString())+"&kltstamp="+encodeURIComponent(akltstamp)+"&screenResolution="+screen.width+"x"+screen.height+"&timezone="+encodeURIComponent(atimezone)+"&pmZoneId="+resultklst.toString()+"&awt=1&ranreq="+Math.random()},{ssp:"openx",callSSP:sendOpen,path:"https://ebayus-d.openx.net/w/1.0/arj?tg=_blank&ju=https%3A%2F%2F"+urlAdReqs+"%2F&jr=https%3A%2F%2F"+urlAdReqs+"%2F&c.cat="+klstsend.toString()+"&auid="+auid1+"&ch="+chox+"&res="+screen.width+"x"+screen.height+"x"+screen.colorDepth+"&tz="+adates.getTimezoneOffset()+"&aus="+adunitw+"x"+adunith+"&callback=callbackOpenX&be=1&bc=hb_ebayus&cb="+randomNum},{ssp:"appnexus",callSSP:sendAPN,path:"https://secure.adnxs.com/jpt?callback=callbackAppNexus&callback_uid="+randomNum+"&psa=0&id="+apnPlacementId+"&referrer=https%3A%2F%2F"+urlAdReqs+"%2F"}];if("SRP_RR1_300"==placementShortCode&&srpRRAddHPA){var t=1e18*Math.random();e.push({ssp:"aol",callSSP:sendAol,path:"https://adserver-us.adtech.advertising.com/pubapi/3.0/"+aolNetworkId+"/4683804/0/529/ADTECH;v=2;cmd=bid;cors=yes;kvrefd=ebay.com;alias=SRP_600;misc="+t+";callback=callbackAOL"}),e.push({ssp:"rubicon",callSSP:sendRub,path:"https://fastlane.rubiconproject.com/a/api/fastlane.jsonp?enc=url&account_id="+rp_account1+"&site_id=154552&zone_id=735642&size_id=10&rp_callback=rp_onAdResponseLoaded&rp_secure=1&tk_user_key="+rp_user_key1+"&tg_i.usde="+usde+"&tg_i.umde="+umde+"&tg_i.categories="+klstsend.toString()+"&p_pos="+rp_pos+"&p_screen_res="+screen.width+"x"+screen.height+"&rand="+Math.random()+"&rf=https%3A%2F%2F"+urlAdReqs+"%2F"}),e.push({ssp:"index",callSSP:sendIndex,path:"https://as-sec.casalemedia.com/cygnus?v=7&fn=callbackIndex&s=221622&r=%7B%22id%22%3A"+t+"%2C%22site%22%3A%7B%22page%22%3A%22https%3A%2F%2F"+urlAdReqs+"%2F%22%2C%22ref%22%3A%22%22%7D%2C%22imp%22%3A%5B%7B%22id%22%3A%221%22%2C%20%22banner%22%3A%7B%22w%22%3A300%2C%22h%22%3A600%2C%22topframe%22%3A1%7D%2C%22ext%22%3A%20%7B%22sid%22%3A%22221622%22%2C%22custom%22%3A%22"+rp_user_key1+"%22%2C%22kv%22%3A%22cat:"+klstsend.toString()+"%22%2C%22siteID%22%3A221622%7D%7D%5D%7D"}),e.push({ssp:"pubmatic",callSSP:sendPubm,path:"https://showads.pubmatic.com/AdServer/AdServerServlet?operId=102&pubId="+pubmId+"&siteId=219730&adId=1177677&kadwidth=300&kadheight=600&inIframe=1&sec=1&pageURL=https%3A%2F%2F"+encodeURIComponent(urlAdReqs)+"%2F&rs=2&dctr=cat%3D"+encodeURIComponent(klstsend.toString())+"&kltstamp="+encodeURIComponent(akltstamp)+"&screenResolution="+screen.width+"x"+screen.height+"&timezone="+encodeURIComponent(atimezone)+"&pmZoneId="+resultklst.toString()+"&awt=1&ranreq="+Math.random()}),e.push({ssp:"openx",callSSP:sendOpen,path:"https://ebayus-d.openx.net/w/1.0/arj?tg=_blank&ju=https%3A%2F%2F"+urlAdReqs+"%2F&jr=https%3A%2F%2F"+urlAdReqs+"%2F&c.cat="+klstsend.toString()+"&auid=539344325&ch="+chox+"&res="+screen.width+"x"+screen.height+"x"+screen.colorDepth+"&tz="+adates.getTimezoneOffset()+"&aus=300x600&callback=callbackOpenX&be=1&bc=hb_ebayus&cb="+t}),e.push({ssp:"appnexus",callSSP:sendAPN,path:"https://secure.adnxs.com/jpt?callback=callbackAppNexus&callback_uid="+t+"&psa=0&id=12191320&referrer=https%3A%2F%2F"+urlAdReqs+"%2F"})}if("SRP_RR1_300"==placementShortCode&&srpRRAddSKY){var s=1e18*Math.random();e.push({ssp:"aol",callSSP:sendAol,path:"https://adserver-us.adtech.advertising.com/pubapi/3.0/"+aolNetworkId+"/4207774/0/154/ADTECH;v=2;cmd=bid;cors=yes;kvrefd=ebay.com;alias=SRP_ATF;misc="+s+";callback=callbackAOL"}),e.push({ssp:"rubicon",callSSP:sendRub,path:"https://fastlane.rubiconproject.com/a/api/fastlane.jsonp?enc=url&account_id="+rp_account1+"&site_id=32458&zone_id=131042&size_id=9&rp_callback=rp_onAdResponseLoaded&rp_secure=1&tk_user_key="+rp_user_key1+"&tg_i.usde="+usde+"&tg_i.umde="+umde+"&tg_i.categories="+klstsend.toString()+"&p_pos="+rp_pos+"&p_screen_res="+screen.width+"x"+screen.height+"&rand="+Math.random()+"&rf=https%3A%2F%2F"+urlAdReqs+"%2F"}),e.push({ssp:"index",callSSP:sendIndex,path:"https://as-sec.casalemedia.com/cygnus?v=7&fn=callbackIndex&s=169850&r=%7B%22id%22%3A"+s+"%2C%22site%22%3A%7B%22page%22%3A%22https%3A%2F%2F"+urlAdReqs+"%2F%22%2C%22ref%22%3A%22%22%7D%2C%22imp%22%3A%5B%7B%22id%22%3A%221%22%2C%20%22banner%22%3A%7B%22w%22%3A300%2C%22h%22%3A600%2C%22topframe%22%3A1%7D%2C%22ext%22%3A%20%7B%22sid%22%3A%22169850%22%2C%22custom%22%3A%22"+rp_user_key1+"%22%2C%22kv%22%3A%22cat:"+klstsend.toString()+"%22%2C%22siteID%22%3A169850%7D%7D%5D%7D"}),e.push({ssp:"pubmatic",callSSP:sendPubm,path:"https://showads.pubmatic.com/AdServer/AdServerServlet?operId=102&pubId="+pubmId+"&siteId=34669&adId=40625&kadwidth=160&kadheight=600&inIframe=1&sec=1&pageURL=https%3A%2F%2F"+encodeURIComponent(urlAdReqs)+"%2F&rs=2&dctr=cat%3D"+encodeURIComponent(klstsend.toString())+"&kltstamp="+encodeURIComponent(akltstamp)+"&screenResolution="+screen.width+"x"+screen.height+"&timezone="+encodeURIComponent(atimezone)+"&pmZoneId="+resultklst.toString()+"&awt=1&ranreq="+Math.random()}),e.push({ssp:"openx",callSSP:sendOpen,path:"https://ebayus-d.openx.net/w/1.0/arj?tg=_blank&ju=https%3A%2F%2F"+urlAdReqs+"%2F&jr=https%3A%2F%2F"+urlAdReqs+"%2F&c.cat="+klstsend.toString()+"&auid=538169805&ch="+chox+"&res="+screen.width+"x"+screen.height+"x"+screen.colorDepth+"&tz="+adates.getTimezoneOffset()+"&aus=160x600&callback=callbackOpenX&be=1&bc=hb_ebayus&cb="+s}),e.push({ssp:"appnexus",callSSP:sendAPN,path:"https://secure.adnxs.com/jpt?callback=callbackAppNexus&callback_uid="+s+"&psa=0&id=12191320&referrer=https%3A%2F%2F"+urlAdReqs+"%2F"})}for(var a in arrayShuffle(e),e)e.hasOwnProperty(a)&&1==e[a].callSSP&&(totalPtrs++,addScripts(e[a].path))}initAndAddScripts(),containerDivdd=document.getElementById("juno-ad-div-"+placementShortCode);