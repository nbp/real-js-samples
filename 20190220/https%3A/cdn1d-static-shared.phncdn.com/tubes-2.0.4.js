function MGTubes(a){var b=this;this.pageType=a;this.hostname=window.location.hostname;this.sampling=100;this.sizes=[10,20,50,100];this.scriptsLoaded=false;this.results=[];this.requests=0;this.replies=0;this.imageMap=[];b.loadScript=function(d,f){var e=document.getElementsByTagName("head")[0];var c=document.createElement("script");c.type="text/javascript";c.src=d;c.onreadystatechange=f;c.onload=f;e.appendChild(c)};b.createCookie=function(d,g,c,h,f){var e=d+"="+escape(g)+";";if(c){if(c instanceof Date){if(isNaN(c.getTime())){c=new Date()}}else{c=new Date(new Date().getTime()+parseInt(c)*1000*60*60*24)}e+="expires="+c.toGMTString()+";"}if(h){e+="path="+h+";"}if(f){e+="domain="+f+";"}document.cookie=e};b.getCookie=function(d){var e=new RegExp("(?:^"+d+"|;s*"+d+")=(.*?)(?:;|$)","g");var c=e.exec(document.cookie);return(c===null)?null:c[1]};b.loadNeededScripts=function(){b.loadScript("https://cdn1d-static-shared.phncdn.com/vortex-simple-1.0.0.js",function(){b.scriptsLoaded=true})};b.logPerformance=function(g,d,e,f,o,h,n,m){if(!b.scriptsLoaded){setTimeout(function(){b.logPerformance(g,d,e,f,o,h,n,m)},250);return}var l="performance_timing";var c=b.getCookie(l);var k=[];if(typeof c!="undefined"&&c){k=c.split(/\|/)}if(k.indexOf(b.pageType)==-1){var j=new VortexSimple(10864,"site-speed");j.set("host",b.hostname);j.set("pageType",b.pageType);j.set("domainLookup",g);j.set("connectTime",d);j.set("ttfb",e);j.set("redirectTime",f);j.set("domInteractive",o);j.set("domComplete",h);j.set("domContentLoadedEventEnd",n);j.set("loadEventEnd",m);j.sendData(function(){k.push(b.pageType);b.createCookie(l,k.join("|"),false,"/")})}};b.getTime=function(){var c=new Date();return c.getTime()};b.loadTestImages=function(){var c=b.sizes[Math.floor(Math.random()*b.sizes.length)];var d=b.getTime();b.loadImage("http://ss.phncdn.com/testimages2/"+c+".png?r="+d);b.loadImage("http://ssb.phncdn.com/testimages2/"+c+".png?r="+d);b.loadImage("http://ssc.phncdn.com/testimages2/"+c+".png?r="+d);b.loadImage("http://cdn-d-ss.pornhub.com/testimages/"+c+".png?r="+d);b.loadImage("https://cdn-d-ss.pornhub.com/testimages/"+c+".png?r="+d);b.loadImage("http://cdn-d-ss2.pornhub.com/testimages/"+c+".png?r="+d)};b.loadImage=function(e){var c=document.createElement("img");var f=new Date();b.imageMap[e]=b.getTime();c.addEventListener("load",(function(){b.results[e]=b.getTime()-b.imageMap[e];b.replies++;if(b.replies==b.requests){if(typeof PerformanceResourceTiming!="undefined"){setTimeout(function(){b.getResources();b.logImageTests()},1000)}}}));b.requests++;c.src=e};b.getResources=function(){var c=window.performance.getEntriesByType("resource");for(i=0;i<c.length;i++){if(b.results.hasOwnProperty(c[i].name)){b.results[c[i].name]=c[i].responseEnd-c[i].fetchStart}}};b.logImageTests=function(){if(!b.scriptsLoaded){setTimeout(function(){b.logImageTests()},250);return}var c=new VortexSimple(10859,"cdn-small-object");c.set("property","shared-cdn");for(var d in b.results){var e=d.match(/http(s*):\/\/([\w\-]+)\..+\/(\d+)\.png\?r=\d+$/);if(e){var f="level3";if(e[2]=="cdn-d-ss2"){if(e[1]=="s"){f="highwinds2_ssl"}else{f="highwinds2"}}else{if(e[2]=="cdn-d-ss"){if(e[1]=="s"){f="highwinds_ssl"}else{f="highwinds"}}else{if(e[2].slice(-1)=="b"){f="limelight"}else{if(e[2].slice(-1)=="c"){f="reflected"}}}}c.set("size",e[3]);c.set(f,Math.floor(b.results[d]))}}c.sendData()};if(typeof mgPerformanceCallbacks=="undefined"){mgPerformanceCallbacks=[]}mgPerformanceCallbacks.push(b.loadNeededScripts);if(Math.floor((Math.random()*100)+1)<10){mgPerformanceCallbacks.push(b.logPerformance);if(window.location.protocol!="https:"){mgPerformanceCallbacks.push(b.loadTestImages)}}}function PlayerMonitor(a,k,p,j,m){var n=this;n.site=a;n.player=k;n.cdn=p;n.videoId=""+j;n.playerVersion=m;n.metrics={};n.metrics.errorCode=0;n.metrics.pauseTime=0;n.metrics.initialBufferingTime=0;n.metrics.internalBufferingTime=0;n.metrics.numDroppedFrames=0;n.metrics.currentFrameRate=0;n.metrics.averageFrameRate=0;n.metrics.startDelayTime=0;n.metrics.videoFail=0;n.metrics.numSeeks=0;n.metrics.numVolumeChanges=0;n.metrics.videoDuration=0;n.metrics.numCorruptedVideoFrames=0;n.metrics.endedCount=0;n.metrics.playCount=0;n.metrics.pauseCount=0;if(k.autoplay){n.metrics.playCount=-1}n.metrics.stalledCount=0;var o={0:"Empty",1:"Idle",2:"Loading",3:"No_Source"};var d=0;var b=0;var g=0;var e=0;var h=false;var c=0;var f=0;var l=0;n.player.addEventListener("pause",function(){if(h){n.metrics.pauseCount++}});n.player.addEventListener("ended",function(){n.metrics.endedCount++});n.player.addEventListener("stalled",function(){n.metrics.stalledCount++});n.player.addEventListener("play",function(){n.metrics.playCount++});n.player.addEventListener("error",function(){n.metrics.errorCode=n.player.error.code});n.player.addEventListener("seeked",function(){n.metrics.numSeeks++});n.player.addEventListener("volumechange",function(){n.metrics.numVolumeChanges++});setInterval(function(){c+=0.25;if(n.player.networkState==n.player.NETWORK_NO_SOURCE){n.metrics.videoFail=1;return}if(n.player.paused&&h){b+=0.25;n.metrics.pauseTime=b}else{if(n.player.readyState<n.player.HAVE_FUTURE_DATA){if(!h){l+=0.25;n.metrics.initialBufferingTime=l}else{f+=0.25;n.metrics.internalBufferingTime=f}}if(h){n.metrics.videoDuration=n.player.duration;if(typeof n.player.getVideoPlaybackQuality!="undefined"){var s=n.player.getVideoPlaybackQuality();n.metrics.numDroppedFrames=s.droppedVideoFrames}else{if(typeof n.player.webkitDroppedFrameCount!="undefined"){n.metrics.numDroppedFrames=n.player.webkitDroppedFrameCount}}if(typeof n.player.getVideoPlaybackQuality!="undefined"){var s=n.player.getVideoPlaybackQuality();n.metrics.numCorruptedVideoFrames=s.corruptedVideoFrames}var r=null;if(typeof n.player.getVideoPlaybackQuality!="undefined"){var s=n.player.getVideoPlaybackQuality();r=s.totalVideoFrames}else{if(typeof n.player.webkitDecodedFrameCount!="undefined"){r=n.player.webkitDecodedFrameCount}else{if(typeof n.player.mozDecodedFrames!="undefined"){r=n.player.mozDecodedFrames}}}var q=(r-d);g+=q;e+=1;n.metrics.currentFrameRate=q*4;n.metrics.averageFrameRate=Math.round(g/e*4);d=r}else{if(n.player.currentTime){h=true;n.metrics.startDelayTime=c}}}},250);n.getUrl=function(){var q=new VortexSimple(10896,"html5-performance");q.set("site",n.site);q.set("cdn",n.cdn);q.set("videoId",n.videoId);q.set("playerVersion",n.playerVersion);q.set("errorCode",n.metrics.errorCode);q.set("pauseTime",n.metrics.pauseTime);q.set("initialBufferingTime",n.metrics.initialBufferingTime);q.set("internalBufferingTime",n.metrics.internalBufferingTime);q.set("numDroppedFrames",n.metrics.numDroppedFrames);q.set("averageFrameRate",n.metrics.averageFrameRate);q.set("startDelayTime",n.metrics.startDelayTime);q.set("videoFail",n.metrics.videoFail);q.set("numSeeks",n.metrics.numSeeks);q.set("numVolumeChanges",n.metrics.numVolumeChanges);q.set("videoDuration",n.metrics.videoDuration);q.set("numCorruptedVideoFrames",n.metrics.numCorruptedVideoFrames);q.set("endedCount",n.metrics.endedCount);q.set("playCount",n.metrics.playCount);q.set("stalledCount",n.metrics.stalledCount);q.set("pauseCount",n.metrics.pauseCount);var r=q.generateUrl();r=r.replace("http://","https://");return r};window.addEventListener("unload",function(){if(typeof navigator.sendBeacon!="undefined"){var q=n.getUrl();navigator.sendBeacon(q)}},false);return n}if(typeof performance!="undefined"){new MGTubes(mgPerformanceTimingSettings.pageType)}var playerMonitor=null;function addMonitor(){if(typeof mgPerformanceTimingSettings.playerObj!="undefined"){if(Math.floor((Math.random()*100)+1)<10){playerMonitor=new PlayerMonitor(window.location.hostname,mgPerformanceTimingSettings.playerObj,mgPerformanceTimingSettings.cdn,mgPerformanceTimingSettings.videoId,mgPerformanceTimingSettings.playerVersion)}}else{setTimeout(function(){addMonitor()},250)}}addMonitor();