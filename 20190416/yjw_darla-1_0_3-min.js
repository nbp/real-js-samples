"use strict";!function(){"undefined"==typeof YAHOO&&(YAHOO={}),"undefined"==typeof YAHOO.JP&&(YAHOO.JP={}),"undefined"==typeof YAHOO.JP.yw&&(YAHOO.JP.yw={})}(),YAHOO.JP.yw.darla=function(){if(window.DARLA){var e={};window.postMessage?(e.width=300,e.height=250):(e.width=448,e.height=600),DARLA_CONFIG=DARLA.Lang.mix(DARLA_CONFIG,{encoding:"UTF-8",mb_source_encoding:"EUCJP-WIN",servicePath:"/darla/php/fc.php",beaconPath:"/darla/php/b.php",renderPath:"/darla/html/ext-render.html",msgPath:"/darla/html/ext-msg.html",positions:{LREC:{pos:"LREC",clean:"boxLREC",dest:"tgtLREC",en:"UTF-8",w:e.width,h:e.height,bg:"transparent"}},events:{},onStartPosRender:function(e){"LREC"!==e.pos||jQuery("#pos-lrec #boxLREC").length||jQuery("#pos-lrec dd").empty().append(jQuery("#boxLREC"))},onSuccess:function(e,t){var n=jQuery("#tgtLREC")[0],i={};i.command="resizeDarlaFrame",n.contentWindow.postMessage(window.JSON.stringify(i),n.src)}});var t=function(e){var t="http://s.yimg.jp",n="https://s.yimg.jp",i=/yahoo\.co\.jp(:[0-9]+)?$/;return e===t||e===n||i.test(e)};window.addEventListener("message",function(e){var n=jQuery("#tgtLREC")[0];if(e.source===n.contentWindow&&t(e.origin)){var i=window.JSON.parse(e.data);if("resizeDarlaFrame"===i.command){var a=jQuery("#boxLREC")[0],o=i.params.width,r=i.params.height;n.style.width=o+"px",n.style.height=r+"px",a.style.width=o+"px",a.style.height=r+"px"}}},!1),DARLA.config(DARLA_CONFIG)}return{setEvents:function(e){"undefined"!=typeof e&&(DARLA_CONFIG=DARLA.Lang.mix(DARLA_CONFIG,{events:e}),DARLA.config(DARLA_CONFIG))},update:function(e){window.DARLA&&e in DARLA_CONFIG.events&&DARLA.event(e)}}}();