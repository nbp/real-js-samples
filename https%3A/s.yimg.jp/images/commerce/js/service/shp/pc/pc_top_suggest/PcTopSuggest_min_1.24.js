var top_suggest=function(o,u){f();y();if(!u&&window.parent==window){var g=$("#store_search_box");if(g.length){g.focus();}else{$("#ss_yschsp").focus();}}$("#ss_yschsp").attr({"autocomplete":"off"});$("#adv_ss_yschsp").attr({"autocomplete":"off"});
var e=new YAHOO.JP.shp.sug();var l=o;var a={BOX_POS:l};e.setSugConfig(a);var x={bucket_id:$("#ss_yschsp").data("shp-suggest-bucketid")};e.setSugParams(x);var k;var d=$("#ss_yschsp").val();function f(){$("#ss_yschsp").focus(function(){k=setInterval(function(){if(d!=$("#ss_yschsp").val()){if(!$(".elSuggest > .elBackground > ul li").hasClass("elActive")&&!e.is_pressing){e.getSuggest();
}d=$("#ss_yschsp").val();}},200);});}function y(){$(".elSuggest .elBackground").on("click","li",function(z){z.stopPropagation();e.submitQuery();});$(".elSuggest .elBackground").on("mouseover","li",function(z){z.stopPropagation();
e.mouseOver(z);});$(".elSuggest .elBackground").on("mouseout","li",function(z){z.stopPropagation();e.mouseOut(z);});$("#ss_yschsp").on("keydown",function(z){e.keyDown(z);});$("#ss_yschsp").on("keyup",function(z){e.keyUp(z);
});}YAHOO=typeof YAHOO==="undefined"?{}:YAHOO;YAHOO.JP=typeof YAHOO.JP==="undefined"?{}:YAHOO.JP;YAHOO.JP.shp=typeof YAHOO.JP.shp==="undefined"?{}:YAHOO.JP.shp;YAHOO.JP.shp.pc=typeof YAHOO.JP.shp.pc==="undefined"?{}:YAHOO.JP.shp.pc;
YAHOO.JP.shp.pc.top=typeof YAHOO.JP.shp.pc.top==="undefined"?{}:YAHOO.JP.shp.pc.top;YAHOO.JP.shp.pc.top.setSticky=function(z){if(z){$("#sbn input[name=sc_i][type=hidden]").val("shp_pc_top_with_searchBox");
e.SHP_SUG_CONFIG.BOX_POS="top_with";$("#h_nav").find("a[onmousedown]").each(function(){var A=$(this).attr("onmousedown");var B=A.replace(/shp_pc_top_MHD_/g,"shp_pc_top_with_MHD_");$(this).attr("onmousedown",B);
});}else{$("#sbn input[name=sc_i][type=hidden]").val("shp_pc_top_searchBox");e.SHP_SUG_CONFIG.BOX_POS="top";$("#h_nav").find("a[onmousedown]").each(function(){var B=$(this).attr("onmousedown");var A=B.replace(/shp_pc_top_with_MHD_/g,"shp_pc_top_MHD_");
$(this).attr("onmousedown",A);});}};var w=YAHOO.JP.shp.pc.top.historyLinkTest||null;var c={A:"srchmd_a",B:"srchmd_b",C:"srchmd_c"};var t=5;var m="pc.top.search.history";var b=20;var p='<div id="__id__" class="mdSearchHistory">'+"<dl>"+"<dt>もう一度検索</dt>"+"<dd><ul></ul></dd>"+"</dl>"+"</div>";
if(w&&w.pattern!=="cntl"){s();h();}function s(){$("#sbn").on("submit",function(){var A=$("#sbn [name=p]").val();var C=$("#sbn [name=cid]").val();var B="";var z=!!$("#sbn [name=oq]").val();if(["A","B"].indexOf(w.pattern)>=0){if(!z){i({keyword:A,category:{cid:C,name:B}});
}}if(["C"].indexOf(w.pattern)>=0){if(C){B=$("#adv_ss_sbox_cid option[value="+C+"]").text();}i({keyword:A,category:{cid:C,name:B}});}});}function h(){var A=q();if(A.length===0){return;}var D=c[w.pattern];
var z=$(p.replace(/__id__/,D));var B=z.find("ul");for(var C=0;C<A.length;C++){if(C>=t){break;}B.append(v(A[C],C));}$("#SearchBoxHead").after(z);r(D);}function v(C,z){var D=C.keyword;if(C.category.cid){D+="（カテゴリ）"+C.category.name;
}D=j(D);var A="https://shopping.yahoo.co.jp/search"+"?first=1&tab_ex=commerce&fr=shp-prop&uIv=on&used=0&seller=0"+"&p="+encodeURIComponent(C.keyword)+"&cid="+C.category.cid+"&sc_i=shp_pc_top_searchHistory_"+(z+1);
var E="slk:srchkwd;pos:"+(z+1)+";";var B=$('<a href="'+A+'" data-ylk="'+E+'"><span>'+D+"</span></a>");B.data(C);B.on("click",function(){i($(this).data());});return $("<li>").append(B);}function r(A){if(YAHOO.JP.shp.ins){YAHOO.JP.shp.ins.addModules(A);
YAHOO.JP.shp.ins.refreshModule(A,false);}else{if(YAHOO.JP.shp.data&&YAHOO.JP.shp.data.page_detail&&YAHOO.JP.shp.data.page_detail.module_ids){var z=YAHOO.JP.shp.data.page_detail.module_ids.split(",");z.push(A);
YAHOO.JP.shp.data.page_detail.module_ids=z.join(",");}}}function q(){return JSON.parse(localStorage.getItem(m))||[];}function i(D){D.keyword=D.keyword.replace(/^\s+|\s+$/g,"");if(!D.keyword){return;}var C;
var z=q();for(var A=0;A<z.length;A++){var B=z[A];if(B.keyword===D.keyword&&B.category.cid===D.category.cid){C=B;break;}}if(C){C.timestamp=Date.now();C.count+=1;}else{D.timestamp=Date.now();if(["A","C"].indexOf(w.pattern)>=0&&z.length===b){D.count=Math.min.apply(null,z.map(function(E){return E.count;
}));}else{D.count=1;}z.push(D);}z=n(z);if(z.length>b){z.pop();}localStorage.setItem(m,JSON.stringify(z));}function n(z){if(["A","C"].indexOf(w.pattern)>=0){z.sort(function(B,A){if(B.count>A.count){return -1;
}if(B.count<A.count){return 1;}if(B.timestamp>A.timestamp){return -1;}if(B.timestamp<A.timestamp){return 1;}return 0;});}else{if(["B"].indexOf(w.pattern)>=0){z.sort(function(B,A){if(B.timestamp>A.timestamp){return -1;
}if(B.timestamp<A.timestamp){return 1;}return 0;});}}return z;}function j(z){z=z.replace(/&/g,"&amp;");z=z.replace(/</g,"&lt;");z=z.replace(/>/g,"&gt;");z=z.replace(/"/g,"&quot;");z=z.replace(/'/g,"&#39;");
return z;}};