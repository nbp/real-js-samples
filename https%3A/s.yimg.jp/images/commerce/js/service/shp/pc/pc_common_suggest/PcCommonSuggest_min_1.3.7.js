YAHOO=YAHOO||{};YAHOO.JP=YAHOO.JP||{};YAHOO.JP.shp=YAHOO.JP.shp||{};YAHOO.JP.shp.sug=YAHOO.JP.shp.sug||{};(function(b){var a=(function(){function d(){this.selected=-1;this.last_req="";this.is_pressing=false;this.is_keyup=false;this.is_first_suggest=true;this.doc=$(document);this.namespace="searchbox-suggest";this.$root=$("[data-"+this.namespace+"]");this.$form=this.$root.find("[data-"+this.namespace+"-form]");this.$textfield=this.$root.find("[data-"+this.namespace+"-textfield]");this.$suggest=this.$root.find("[data-"+this.namespace+"-suggest]");this.$suggestIn=this.$root.find("[data-"+this.namespace+"-suggestIn]");this.tt_pattern=null;this.is_ranking_img=false;this.is_ranking_target=false;this.sug_pos=0;this.is_top=false;if((typeof b.JP.shp.data!=="undefined"&&typeof b.JP.shp.data.page_detail!=="undefined"&&typeof b.JP.shp.data.page_detail.page_type!=="undefined")&&b.JP.shp.data.page_detail.page_type==="top"){this.is_top=true}this.SHP_SUG_API_PARAMS={appid:"dj0zaiZpPVkwMDJ1RHlqOEdwdCZzPWNvbnN1bWVyc2VjcmV0Jng9M2Y-",".src":"shp",format:"jsonp",device:"pc"};this.SHP_SUG_API_INFO={host:"suggest-shop.yahooapis.jp",path:"/Shopping/Suggest/V1/suggester",timeout:500};this.SHP_SUG_CLASS={active:"elActive",dropdownShow:"elSuggestDropDownShow"};if(typeof js_param!=="undefined"&&typeof js_param.spro!=="undefined"&&js_param.spro){this.SHP_SUG_CLASS.active="elSuggestItemActive"}this.cid_before=(!this.$form.find('select[name="cid"]').is(":disabled"))?this.$form.find('select[name="cid"]').val():"";this.SHP_SUG_CONFIG={SUG_RES:"sugres",BOX_POS:"",ENABLED:true,IS_SERP:false,RAPID_INS:null,RAPID_PARAMS:null,VERTICAL:false};this.KEY_CD={BACKSPACE:8,TAB:9,RETURN:13,ESC:27,SPACE:32,PAGEUP:33,PAGEDOWN:34,END:35,HOME:36,LEFT:37,UP:38,RIGHT:39,DOWN:40,DELETE:46,INSERT:45,H_F:229}}if(!String.prototype.trim){String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g,"")}}d.prototype.setSugParams=function(g){if(typeof g==="object"){var f;for(f in g){if(g.hasOwnProperty(f)){this.SHP_SUG_API_PARAMS[f]=g[f]}}}};d.prototype.setTTPattern=function(f){switch(f){case 1:case 2:return"a";break;case 3:case 4:return"b";break;case 5:case 6:return"c";break;case 7:case 8:return"d";break;default:return""}};d.prototype.setSugConfig=function(f){if(typeof f==="object"){var g;for(g in f){if(f.hasOwnProperty(g)){this.SHP_SUG_CONFIG[g]=f[g]}}}};d.prototype.getSuggest=function(){var g=this.$textfield.val();this.last_req=g;var f=this.SHP_SUG_API_PARAMS;f.p=g;this.sendAjax(f).done(function(j){if("Error" in j){this.sugError()}else{var h=typeof js_param!=="undefined"&&typeof js_param.spro!=="undefined"&&js_param.spro?this.createSugHtmlSpro(g,j):this.createSugHtml(g,j);if(h===""){this.sugError()}else{if(this.SHP_SUG_CONFIG.VERTICAL){h+=this.createVerticalHtml()}this.sugSuccess(h)}}}).fail(function(){this.sugError()})};d.prototype.sendAjax=function(j){var h=this.SHP_SUG_API_INFO.host,g=this.SHP_SUG_API_INFO.path,k=this.SHP_SUG_API_INFO.timeout,f=this.SHP_SUG_API_PARAMS.format;return $.ajax({type:"GET",url:location.protocol+"//"+h+g,dataType:f,data:j,timeout:k,context:this})};d.prototype.sugError=function(){this.$root.removeClass(this.SHP_SUG_CLASS.dropdownShow);if(typeof js_param!=="undefined"&&typeof js_param.spro!=="undefined"&&js_param.spro){this.$suggest.removeClass("elShow")}this.$suggestIn.empty()};d.prototype.sugSuccess=function(f){if(this.tt_pattern===null){this.tt_pattern=this.setTTPattern(this.SHP_SUG_API_PARAMS.bucket_id)}if((this.tt_pattern!==null&&this.tt_pattern!==""&&this.is_top)&&this.is_ranking_img){mboxUpdate("shp_pc_suggest_ranking_mbox","suggest_pattern="+this.tt_pattern);this.is_ranking_img=false}this.$root.addClass(this.SHP_SUG_CLASS.dropdownShow);if(typeof js_param!=="undefined"&&typeof js_param.spro!=="undefined"&&js_param.spro){this.$suggest.addClass("elShow")}this.$suggestIn.html("<ul>"+f+"</ul>");if(this.is_first_suggest){this.pushViewBeacon();this.is_first_suggest=false}};d.prototype.createVerticalHtml=function(){var f="";f+="<li id="+this.SHP_SUG_CONFIG.SUG_RES+this.sug_pos+' class="elAuction" data-link="https://auctions.yahoo.co.jp/search/search">';f+="<span>ヤフオク!で探す</span></li>";f+="<li id="+this.SHP_SUG_CONFIG.SUG_RES+(Number(this.sug_pos)+1)+' class="elWeb" data-link="https://search.yahoo.co.jp/search">';f+="<span>ウェブで探す</span></li>";this.sug_pos=this.sug_pos+1;return f};d.prototype.createSugHtml=function(v,o){var q=this,w="",z="",n="",p="",y="",x="",l=1;var t,s,r,u,m;var B=o[1];for(t=0,u=B.length;t<u;t++){for(r in B[t]){if(B[t].hasOwnProperty(r)){if(r==="keyword"){for(s=0,m=B[t][r].length;s<m;s++){z+=this.buildKeyword(B[t][r],s,l,v);l+=1}}else{if(r==="category"){for(s=0,m=B[t][r].length;s<m;s++){var f=this.buildCategory(B[t][r],s,l,v);if(f!==""){n+=f;l+=1}}}else{if(r==="brand"){for(s=0,m=B[t][r].length;s<m;s++){var h=this.buildBrand(B[t][r],s,l,v);if(h!==""){p+=h;l+=1}}}else{if(r==="direct"){for(s=0,m=B[t][r].length;s<m;s++){var g=this.buildDirect(B[t][r],s,l,v);if(g!==""){y+=g;l+=1}}}else{if(r==="ranking"){if(Object.keys(B[t][r]).length!==0){var A=this.buildImgRanking(B[t][r],s,l,v);if(A!==""){x+=A;if(typeof B[t][r].more.display!==undefined&&B[t][r].more.display){l+=6}else{l+=5}}}}}}}}}}}this.sug_pos=l;w=""+n+p+z+y+x;return w};d.prototype.buildKeyword=function(k,h,m,l){var g=k[h];var f=this.boldQuery(g,l);var g=g.replace(/"/g,"&quot;");var j="";j+='<li id="'+this.SHP_SUG_CONFIG.SUG_RES+m+'" class="elUnit" alt="'+g+'">'+f+"</li>";return j};d.prototype.buildCategory=function(k,j,n,g){var l=k[j];var f=l.suggest||"";var m=l.cid||"";var o=l.cat||"";var h="";if(!f||!o){return h}var p=this.boldQuery(f,g);f=f.replace(/"/g,"&quot;");h+='<li id="'+this.SHP_SUG_CONFIG.SUG_RES+n+'" class="elCategory" alt="'+f+'" data-type="category" data-cid="'+m+'">'+p+"<span>"+o+"</span></li>";return h};d.prototype.buildBrand=function(l,k,n,g){var m=l[k];var f=m.suggest||"";var j=m.bid||"";var o=m.brand||"";var h="";if(!f||!j){return h}var p=this.boldQuery(f,g);f=f.replace(/"/g,"&quot;");h+='<li id="'+this.SHP_SUG_CONFIG.SUG_RES+n+'" class="elBrand" alt="'+f+'" data-type="brand" data-bid="'+j+'">'+p+"<span>（ブランド）"+o+"</span></li>";return h};d.prototype.buildDirect=function(m,l,p,j){var o=m[l];var g=o.suggest||"";var h=o.title||"";var f=o.url||"";var t=o.icon||"";var q=o.image||"";var s=o.type||"";var n=o.cid||"";var k="";if(!h||!f){return k}var r=this.boldQuery(h,j);if(s==="ranking"){k+='<li id="'+this.SHP_SUG_CONFIG.SUG_RES+p+'" class="elRanking" data-direct-type="'+s+'" data-link="'+f+'">';k+=r+" 最新売れ筋ランキング</li>"}else{if(s==="store"){k+='<li id="'+this.SHP_SUG_CONFIG.SUG_RES+p+'" class="elStore" data-direct-type="'+s+'" data-link="'+f+'">';k+='<dl><dt><img src="'+q+'" alt="" width="120" height="30"></dt>';k+="<dd><em>"+h+"</em></dd></dl>";k+="</li>"}}return k};d.prototype.buildImgRanking=function(m,k,o,h){var n=m;var g=n.suggest||"";var f=n.item||"";var p=n.more||"";var j="";if(!g||!f){return j}var q=this.boldQuery(g,h);j+='<li class="elItemRanking">';j+='<p class="elTitle">'+q+" 最新売れ筋ランキング</p><ol>";for(i=0,len2=f.length;i<len2;i++){var l=this.numberFormat(f[i].price);j+="<li id="+this.SHP_SUG_CONFIG.SUG_RES+(Number(o)+Number(i))+' class="elRank'+f[i].rank+'" data-direct-type="img_ranking" data-link='+f[i].url+" data-log_word="+g+" >";j+='<a href="javascript:void(0)"><dl>';j+='<dt class="elRank">'+f[i].rank+"</dt>";j+='<dt class="elPhoto"><img src="'+f[i].image+'" alt width="76" height="76"></dt>';j+='<dd class="elPrice">'+l+"円</dd>";j+="</dl></a></li>"}if(p&&p.display){j+="<li id="+this.SHP_SUG_CONFIG.SUG_RES+(Number(o)+Number(5))+' class="elMore" data-direct-type="img_ranking" data-link='+p.url+" data-log_word="+p.word+">";j+="<a href=javascript:void(0);><span>"+p.word+"</span></a></li>"}j+="</ol></li>";this.is_ranking_img=true;if(this.tt_pattern!="b"&&this.tt_pattern!="c"){j=""}return j};d.prototype.createSugHtmlSpro=function(u,n){var p=this,v="",y="",m="",o="",x="",w="",h=1;var s,r,q,t,l;var z=n[1];for(s=0,t=z.length;s<t;s++){for(q in z[s]){if(z[s].hasOwnProperty(q)){if(q==="keyword"){for(r=0,l=z[s][q].length;r<l;r++){y+=this.buildKeywordSpro(z[s][q],r,h,u);h+=1}}else{if(q==="category"){for(r=0,l=z[s][q].length;r<l;r++){var f=this.buildCategorySpro(z[s][q],r,h,u);if(f!==""){m+=f;h+=1}}}else{if(q==="brand"){for(r=0,l=z[s][q].length;r<l;r++){var g=this.buildBrandSpro(z[s][q],r,h,u);if(g!==""){o+=g;h+=1}}}}}}}}this.sug_pos=h;v=""+m+o+y+w;return v};d.prototype.buildKeywordSpro=function(k,h,m,l){var g=k[h];var f=this.boldQuery(g,l);var g=g.replace(/"/g,"&quot;");var j="";j+='<li id="'+this.SHP_SUG_CONFIG.SUG_RES+m+'" class="elSuggestItem" alt="'+g+'">'+f+"</li>";return j};d.prototype.buildCategorySpro=function(k,j,n,g){var l=k[j];var f=l.suggest||"";var m=l.cid||"";var o=l.cat||"";var h="";if(!f||!o){return h}var p=this.boldQuery(f,g);if(o==="すべてのカテゴリ"){o="すべて"}f=f.replace(/"/g,"&quot;");h+='<li id="'+this.SHP_SUG_CONFIG.SUG_RES+n+'" class="elSuggestItem" alt="'+f+'" data-type="category" data-cid="'+m+'">'+p+'<span class="elSuggestSub">（カテゴリ）<em>'+o+"</em></span></li>";return h};d.prototype.buildBrandSpro=function(l,k,n,g){var m=l[k];var f=m.suggest||"";var j=m.bid||"";var o=m.brand||"";var h="";if(!f||!j){return h}var p=this.boldQuery(f,g);f=f.replace(/"/g,"&quot;");h+='<li id="'+this.SHP_SUG_CONFIG.SUG_RES+n+'" class="elSuggestItem" alt="'+f+'" data-type="brand" data-bid="'+j+'">'+p+'<span class="elSuggestSub>（ブランド）<em>'+o+"</em></span></li>";return h};d.prototype.numberFormat=function(f){return f.toString().replace(/(\d)(?=(\d\d\d)+$)/g,"$1,")};d.prototype.boldQuery=function(j,k){var p=this,f=j.length,g=j,h=0,l=0,o="",n="",m="";o=g.toLowerCase();n=k.toLowerCase();h=o.indexOf(n,0);if(h!==-1){l=h+k.length;m+=g.slice(0,h);m+="<em>"+g.slice(h,l)+"</em>"}m+=g.slice(l);return m};var c=$("[data-searchbox-advancedSearch-textfield]").val();var e=c.trim().replace("　"," ").split(" ");d.prototype.submitQuery=function(){var w=this,v=this.$suggestIn.find(" > ul li."+this.SHP_SUG_CLASS.active),n="",g=this.$form,u=location.host,s,B,q,y,x,E,r,p;x=this.SHP_SUG_CONFIG.BOX_POS;w.selected=this.$suggestIn.find(" > ul li."+this.SHP_SUG_CLASS.active).index();if(w.selected!==-1){var t=this.$suggestIn.find(" > ul li."+this.SHP_SUG_CLASS.active).attr("id");if(t!==undefined){var m=new RegExp(this.SHP_SUG_CONFIG.SUG_RES,"g");w.selected=Number(t.replace(m,""))}}g.find("input[name=aq][type=hidden]").val(w.selected);g.find("input[name=oq][type=hidden]").val(w.last_req);if(w.selected!==-1){q=v.attr("data-link");if(typeof q!=="undefined"){y=v.attr("data-direct-type");if(y==="ranking"){E="shp_pc_"+this.SHP_SUG_CONFIG.BOX_POS+"_searchBox_suggest_ranking"}else{if(y==="img_ranking"){E="shp_pc_"+this.SHP_SUG_CONFIG.BOX_POS+"_searchBox_suggest_rankingimg"}else{if(y==="store"){E="shp_pc_"+this.SHP_SUG_CONFIG.BOX_POS+"_searchBox_suggest_storename"}else{var l=this.$textfield.val();var A=[{name:"ei",value:"utf-8"},{name:"tab_ex",value:"commerce"},{name:"p",value:l}];var o=$.param(A);var D=q+"?"+o;this.sendURL(D);return false}}}var z=q+(q.match(/(\?|%3f)/)?"&":"?")+"sc_i="+E;this.sendURL(z);return false}n=v.attr("data-type");var f=false;if(n==="category"){if(g.find("[name=sc_i]").length){g.find("[name=sc_i]").remove()}r="shp_pc_"+x+"_searchBox_suggest_category";$('<input type="hidden" name="sc_i" value="'+r+'">').appendTo(g);s=v.attr("data-cid");if(!s.length){if(g.find("[name=cid]").find('[value=""]').length){g.find("[name=cid]").find('[value=""]').prop("selected",true)}else{g.find("[name=cid]").append('<option value="" selected="selected">')}}else{if(g.find("[name=cid]").length){f=true;if(g.find("[name=cid]").find("[value="+s+"]").length){g.find("[name=cid]").find("[value="+s+"]").prop("selected",true)}else{g.find("[name=cid]").append('<option value="'+s+'" selected="selected">')}}else{$('<input type="hidden" name="cid" value="'+v.attr("data-cid")+'">').appendTo(g)}}if(!s.length){if(!g.find("[name=elc]").length){$('<input type="hidden" name="elc" value="1">').appendTo(g)}}}if(n==="brand"){B=v.attr("data-bid");if(g.find("[name=brandid]").length){g.find("[name=brandid]").attr("value",B)}else{$('<input type="hidden" name="brandid" value="'+v.attr("data-bid")+'">').appendTo(g)}}if(n!=="category"){if(g.find("[name=sc_i]").length){g.find("[name=sc_i]").remove()}p="shp_pc_"+x+"_searchBox_suggest";$('<input type="hidden" name="sc_i" value="'+p+'">').appendTo(g)}w.query(v.attr("alt"));this.sendURL();var h=this.$textfield.val();var k=h.trim().replace("　"," ").split(" ");var C=(!this.$form.find('select[name="cid"]').is(":disabled"))?this.$form.find('select[name="cid"]').val():"";if("js_param" in window){var j=js_param.entry_point}else{var j="top"}if(j==="search"&&e[0]!==k[0]){$('<input type="hidden" name="sretry" value=0 >').appendTo(this.$form);if(k[0]!==""&&!f&&this.cid_before===C){this.$form.find("select[name=cid]").prop("disabled",true)}}else{$('<input type="hidden" name="sretry" value=1 >').appendTo(this.$form)}g.submit()}};d.prototype.query=function(f){this.$textfield.val(f)};d.prototype.sendURL=function(f){var h=this.SHP_SUG_CONFIG.IS_SERP;if(typeof h!=="undefined"&&h==true||this.is_top){var g=this.SHP_SUG_API_PARAMS.bucket_id||"";var j=$.extend(this.createLogData(),{input:this.last_req,bucket:g});this.sendLog(j,f)}else{if(typeof f!=="undefined"){if(typeof f==="string"&&(f.indexOf("http://")===0||f.indexOf("https://")===0)){location.href=f}else{f.submit()}}}};d.prototype.createLogData=function(){return{active:{keyword:this.getActiveKeyword(),position:this.getActiveKeywordPosition(),count:this.countSuggest()},suggest:this.getSuggestedKeywords()}};d.prototype.getInputText=function(){return this.$textfield.val()};d.prototype.getActiveKeyword=function(){var f=this.$suggestIn.find(" > ul > li."+this.SHP_SUG_CLASS.active).text();if(!f){f=this.$suggestIn.find(" > ul > li.elItemRanking > ol > li."+this.SHP_SUG_CLASS.active).data("log_word")}return f.replace(/カテゴリ：/g," カテゴリ：")};d.prototype.getActiveKeywordPosition=function(){var g=1;var f=this.$suggestIn.find(" > ul li."+this.SHP_SUG_CLASS.active).attr("id");if(f!==undefined){var h=new RegExp(this.SHP_SUG_CONFIG.SUG_RES,"g");g=Number(f.replace(h,""))}return g};d.prototype.getSuggestedKeywords=function(){var j=[];var g=[];var k=[];var h=[];var f=[];this.$suggestIn.find(" > ul > li").each(function(m,o){var l=$(o);var n=l.text();if(l.hasClass("elCategory")){j.push(n.replace(/カテゴリ：/g," カテゴリ："))}else{if(l.hasClass("elUnit")){g.push(n)}else{if(l.hasClass("elRanking")){k.push(n)}else{if(l.hasClass("elStore")){h.push(n)}}}}});if(this.$suggestIn.find(" > ul > li.elItemRanking > ol > li")){this.$suggestIn.find(" > ul > li.elItemRanking > ol > li").each(function(m,o){var l=$(o);var n=l.data("log_word");f.push(n)})}return{category:j,keyword:g,ranking:k,storename:h,img_ranking:f}};d.prototype.countSuggest=function(){var j=0;var g=0;var k=0;var h=0;var f=0;this.$suggestIn.find(" > ul > li").each(function(m,n){var l=$(n);if(l.hasClass("elCategory")){j++}else{if(l.hasClass("elUnit")){g++}else{if(l.hasClass("elRanking")){k++}else{if(l.hasClass("elStore")){h++}}}}});if(this.$suggestIn.find(" > ul > li.elItemRanking > ol > li")){f=this.$suggestIn.find(" > ul > li.elItemRanking > ol > li").length}return{category:j,keyword:g,ranking:k,storename:h,img_ranking:f}};d.prototype.logFormat=function(m){var f={};var k=0;var l=JSON.stringify(m);for(var j=0;j<5;j++){var n=j*300;var g=(j+1)*300;var h=l.slice(n,g);if(h!==""){k++}f["data"+j]=h}f.data_num=k;f.pos=0;return f};d.prototype.sendLog=function(h,g){var f=[];f.push(this.logFormat(h));this.pushclickbeacon(f,g)};d.prototype.pushclickbeacon=function(g,f){var h=this.SHP_SUG_CONFIG.IS_SERP;var j=$.noop;if(typeof f!=="undefined"&&f!==false){if(typeof f==="string"&&(f.indexOf("http://")===0||f.indexOf("https://")===0)){j=(function(){location.href=f})}else{j=f.submit}}if(h){b.JP.srch.ss.rapidjp.setStaticClickBeacon("shpsug","suggest",1,g[0],"",j)}else{if(typeof b.JP.shp.ins!=="undedfined"){b.JP.shp.ins.beaconClick("shpsug","suggest",1,g[0],"",j)}}return true};d.prototype.pushViewBeacon=function(){var g=[];var j=[];var h="shpsug";var f="suggest";j.push({slk:f,pos:0,_p:1,});g.push({sec:h,_links:j});var k=this.SHP_SUG_CONFIG.IS_SERP;if(k){b.JP.srch.ss.rapidjp.setStaticViewBeacon(g)}else{if(typeof b.JP.shp.ins!=="undedfined"){b.JP.shp.ins.beaconLinkViews(g,false)}}};d.prototype.keyDown=function(m){var g=this,k=location.host;var f=true;if(!g.SHP_SUG_CONFIG.ENABLED){return}var h=this.$suggestIn.find(" > ul > li").length;if(m.which==0||m.keyCode==0){$(".elWords > ul > li").removeClass(this.SHP_SUG_CLASS.active)}if((m.which&&m.which==229)||(m.keyCode&&m.keyCode==229)){f=false}else{f=true}if((m.which&&m.which==40)||(m.keyCode&&m.keyCode==40)){if(f){this.candidateFocusDown(g)}}else{if((m.which&&m.which==38)||(m.keyCode&&m.keyCode==38)){if(f){this.candidateFocusUp(g)}}}if((m.which&&m.which==13)||(m.keyCode&&m.keyCode==13)){var j=this.$suggestIn.find(" > ul li."+this.SHP_SUG_CLASS.active).index();if(j!==-1){if(!this.is_ranking_target){var l=this.$suggestIn.find(" > ul > li:eq("+g.selected+")");m.preventDefault();l.trigger("click")}else{var l=this.$suggestIn.find(" > ul > li.elItemRanking > ol >li:eq("+g.selected+")");m.preventDefault();l.trigger("click")}}}};d.prototype.candidateFocusDown=function(j){this.is_pressing=true;if(this.is_ranking_target){if(this.$suggestIn.find(" > ul > li.elItemRanking > ol > li").length>0){var h=this.$suggestIn.find(" > ul > li.elItemRanking > ol > li."+this.SHP_SUG_CLASS.active).index();if(h<this.$suggestIn.find(" > ul > li.elItemRanking > ol > li").length-1){this.$suggestIn.find(" > ul > li.elItemRanking > ol > li").eq(h).removeClass(this.SHP_SUG_CLASS.active);this.$suggestIn.find(" > ul > li.elItemRanking > ol > li").eq(h+1).addClass(this.SHP_SUG_CLASS.active);var g="";if(g=this.$suggestIn.find(" > ul > li.elItemRanking > ol > li").eq(h+1).attr("alt")){this.$textfield.val(g)}else{this.$textfield.val(j.last_req)}}else{this.is_ranking_target=false;var f=this.$suggestIn.find(" > ul > li.elItemRanking").index();this.$suggestIn.find(" > ul > li.elItemRanking > ol > li").eq(h).removeClass(this.SHP_SUG_CLASS.active);this.$suggestIn.find(" > ul > li").eq(f+1).addClass(this.SHP_SUG_CLASS.active);if(g=this.$suggestIn.find(" > ul > li").eq(f+1).attr("alt")){this.$textfield.val(g)}else{this.$textfield.val(j.last_req)}}return false}}else{if(this.$suggestIn.find(" > ul > li").length>0){var h=this.$suggestIn.find(" > ul > li."+this.SHP_SUG_CLASS.active).index();if(h==-1){this.$suggestIn.find(" > ul > li").eq(0).addClass(this.SHP_SUG_CLASS.active);var g="";if(g=this.$suggestIn.find(" > ul > li").eq(h+1).attr("alt")){this.$textfield.val(g)}}else{if(h<this.$suggestIn.find(" > ul > li").length-1){this.$suggestIn.find(" > ul > li").eq(h).removeClass(this.SHP_SUG_CLASS.active);if(this.$suggestIn.find(" > ul > li").eq(h+1).hasClass("elItemRanking")){this.$suggestIn.find(" > ul > li.elItemRanking > ol > li").eq(0).addClass(this.SHP_SUG_CLASS.active);this.is_ranking_target=true;var g="";if(g=this.$suggestIn.find(" > ul > li.elItemRanking > ol > li").eq(0).attr("alt")){this.$textfield.val(g)}else{this.$textfield.val(j.last_req)}}else{this.$suggestIn.find(" > ul > li").eq(h+1).addClass(this.SHP_SUG_CLASS.active);var g="";if(g=this.$suggestIn.find(" > ul > li").eq(h+1).attr("alt")){this.$textfield.val(g)}else{this.$textfield.val(j.last_req)}}}else{this.$suggestIn.find(" > ul > li").eq(h).removeClass(this.SHP_SUG_CLASS.active);this.$textfield.val(j.last_req)}}return false}}};d.prototype.candidateFocusUp=function(l){this.is_pressing=true;if(this.is_ranking_target){if(this.$suggestIn.find(" > ul > li.elItemRanking > ol > li").length>0){var k=this.$suggestIn.find(" > ul > li.elItemRanking > ol > li").length;var j=this.$suggestIn.find(" > ul li."+this.SHP_SUG_CLASS.active).index();if(j==0){var f=this.$suggestIn.find(" > ul > li.elItemRanking").index();this.is_ranking_target=false;this.$suggestIn.find(" > ul > li.elItemRanking > ol > li").eq(0).removeClass(this.SHP_SUG_CLASS.active);this.$suggestIn.find(" > ul > li").eq(f-1).addClass(this.SHP_SUG_CLASS.active);if(h=this.$suggestIn.find(" > ul > li").eq(f-1).attr("alt")){this.$textfield.val(h)}else{this.$textfield.val(l.last_req)}}else{if(j>0){this.$suggestIn.find(" > ul > li.elItemRanking > ol > li").eq(j).removeClass(this.SHP_SUG_CLASS.active);this.$suggestIn.find(" > ul > li.elItemRanking > ol > li").eq(j-1).addClass(this.SHP_SUG_CLASS.active);var h="";if(h=this.$suggestIn.find(" > ul > li.elItemRanking > ol > li").eq(j-1).attr("alt")){this.$textfield.val(h)}else{this.$textfield.val(l.last_req)}}}}}else{if(this.$suggestIn.find(" > ul > li").length>0){var k=this.$suggestIn.find(" > ul > li").length;var j=this.$suggestIn.find(" > ul > li."+this.SHP_SUG_CLASS.active).index();if(j==-1){if(this.$suggestIn.find(" > ul > li").eq(this.$suggestIn.find(" > ul > li").length-1).hasClass("elItemRanking")){this.$suggestIn.find(" > ul > li.elItemRanking > ol > li").eq(this.$suggestIn.find(" > ul > li.elItemRanking > ol > li").length-1).addClass(this.SHP_SUG_CLASS.active);this.is_ranking_target=true;k=this.$suggestIn.find(" > ul > li.elItemRanking > ol > li");var h="";if(h=this.$suggestIn.find(" > ul > li.elItemRanking > ol > li").eq(k-1).attr("alt")){this.$textfield.val(h)}else{this.$textfield.val(l.last_req)}}else{this.$suggestIn.find(" > ul > li").eq(this.$suggestIn.find(" > ul > li").length-1).addClass(this.SHP_SUG_CLASS.active);var h="";if(h=this.$suggestIn.find(" > ul > li").eq(k-1).attr("alt")){this.$textfield.val(h)}else{this.$textfield.val(l.last_req)}}}else{if(j==0){this.$suggestIn.find(" > ul > li").eq(0).removeClass(this.SHP_SUG_CLASS.active);this.$textfield.val(l.last_req)}else{if(j>0){this.$suggestIn.find(" > ul > li").eq(j).removeClass(this.SHP_SUG_CLASS.active);if(this.$suggestIn.find(" > ul > li").eq(j-1).hasClass("elItemRanking")){var g=this.$suggestIn.find(" > ul > li.elItemRanking > ol > li").length;this.$suggestIn.find(" > ul > li.elItemRanking > ol > li").eq(g-1).addClass(this.SHP_SUG_CLASS.active);this.is_ranking_target=true}else{this.$suggestIn.find(" > ul > li").eq(j-1).addClass(this.SHP_SUG_CLASS.active);var h="";if(h=this.$suggestIn.find(" > ul > li").eq(j-1).attr("alt")){this.$textfield.val(h)}}}}}}}};d.prototype.keyUp=function(g){this.input_val=this.$textfield.val();if((g.which&&g.which==13)||(g.keyCode&&g.keyCode==13)){}else{if((g.which&&g.which==40)||(g.keyCode&&g.keyCode==40)){}else{if((g.which&&g.which==38)||(g.keyCode&&g.keyCode==38)){}else{if(this.$textfield.val().length==0){this.sugError();this.last_req="";this.is_pressing=false}if((!f(g.which))||(!f(g.keyCode))){this.is_pressing=false;this.$suggestIn.find(" > ul > li").removeClass(this.SHP_SUG_CLASS.active);this.$suggestIn.find(" > ul > li.elItemRanking > ol > li").removeClass(this.SHP_SUG_CLASS.active)}}}}function f(h){if((h==9)||(h==13)||(h>=16&&h<=20)||(h==27)||(h>=33&&h<=40)||(h>=44&&h<=45)||(h==229)){return true}return false}};d.prototype.mouseOver=function(f){this.$suggestIn.find(" > ul > li").removeClass(this.SHP_SUG_CLASS.active);this.$suggestIn.find(" > ul > li.elItemRanking > ol > li").removeClass(this.SHP_SUG_CLASS.active);if(!$(f.target).closest("li").hasClass("elItemRanking")){$(f.target).closest("li").addClass(this.SHP_SUG_CLASS.active);if($(f.target).closest("li").data("direct-type")==="img_ranking"){this.is_ranking_target=true}else{this.is_ranking_target=false}}};d.prototype.mouseOut=function(f){this.$suggestIn.find(" > ul > li").removeClass(this.SHP_SUG_CLASS.active);this.$suggestIn.find(" > ul > li.elItemRanking > ol > li").removeClass(this.SHP_SUG_CLASS.active);this.is_ranking_target=false};return d})();b.JP.shp.sug=a})(YAHOO);