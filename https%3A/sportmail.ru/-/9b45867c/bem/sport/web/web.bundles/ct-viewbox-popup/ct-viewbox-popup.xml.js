!function(e){e.fest||(e.fest={}),e.fest["ct-viewbox-popup.xml"]=e.fest["bem/sport/web/web.bundles/ct-viewbox-popup"]=function(e){"use strict";var t,f,_,p,a,u,d,b,s,r=this,c="",m=[],n=[],i="",v={},o="",h="",l="",x=[],P={area:!0,base:!0,br:!0,col:!0,command:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,wbr:!0},g=/[&<>"]/g,y=/[&<>"]/,C={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"},w=function(e){return"string"==typeof e&&y.test(e)?e.replace(g,N):null==e?"":e},N=function(e){return C[e]},k=function(e,t){for(var a in t)t.hasOwnProperty(a)&&(e[a]=t[a])},j=function(e){return e.param=!0,e};r&&"function"==typeof r.i18n&&r.i18n;function M(e){s(e+'\nin block "'+l+'" at line: '+h+"\nfile: "+o)}function T(e,t,a){if(a)for(var s in t)"function"==typeof t[s]&&t[s].param&&(t[s]=t[s]());return e.call(r,t)}s="undefined"==typeof __fest_error?"undefined"!=typeof console&&console.error?function(){return Function.prototype.apply.call(console.error,console,arguments)}:function(){}:__fest_error;if(v.ajax=function(e){var t="";try{_=e.html}catch(e){_=!1,M(e.message)}if(_)try{t+=e.html}catch(e){M(e.message+"5")}return t},v.viewbox=function(h){var e="";try{var l=h.controls||{}}catch(e){M(e.message)}f="element",d={};try{k(d,h)}catch(e){M(e.message)}try{k(d,{baseClass:"viewbox"})}catch(e){M(e.message)}return d.html=j(function(){var e,t,a,s,r="";try{t=h.close}catch(e){t=!1,M(e.message)}if(t){try{n[0]=w(fest._helpers.classNamesFor("viewbox__close",h.close))}catch(e){n[0]="",M(e.message)}r+='<a href="#" class="'+n[0]+'">';try{t=h.close.icon}catch(e){t=!1,M(e.message)}if(t){e="icon",s={};try{s=h.close.icon}catch(e){M(e.message)}(a=v[e])&&(r+=T(a,s,!1))}r+="</a>"}e="element",s={};try{k(s,h.containerParams)}catch(e){M(e.message)}try{k(s,{baseClass:"viewbox__container"})}catch(e){M(e.message)}s.html=j(function(){var e,t,a,s,r,c,m,n,i="";try{m=(n=["previous","next"]).length}catch(e){n=[],m=0,M(e.message)}for(r=0;r<m;r++){c=n[r];var o=l[c];try{t=o}catch(e){t=!1,M(e.message)}if(t){try{o.mods=[c]}catch(e){M(e.message)}e="viewbox__control",s={};try{s=o}catch(e){M(e.message)}(a=v[e])&&(i+=T(a,s,!1))}}e="element",s={};try{k(s,h.innerParams)}catch(e){M(e.message)}try{k(s,{baseClass:"viewbox__inner"})}catch(e){M(e.message)}return s.html=j(function(){var e,t,a="";t={};try{k(t,h.slidesParams)}catch(e){M(e.message)}try{k(t,{baseClass:"viewbox__slides"})}catch(e){M(e.message)}return(e=v.element)&&(a+=T(e,t,!1)),a}),(a=v[e])&&(i+=T(a,s,!0)),i}),(a=v[e])&&(r+=T(a,s,!0));try{t=h.slider}catch(e){t=!1,M(e.message)}if(t){e="viewbox__list",s={};try{s=h}catch(e){M(e.message)}(a=v[e])&&(r+=T(a,s,!1))}try{t=h.html}catch(e){t=!1,M(e.message)}if(t)try{r+=h.html}catch(e){M(e.message+"79")}return r}),(u=v[f])&&(e+=T(u,d,!0)),e},v.viewbox__more=function(n){var e,t,a,s="";s+='<div class="viewbox__more">';try{t=(a=["previous","next"]).length}catch(e){a=[],t=0,M(e.message)}for(r=0;r<t;r++){e=a[r];try{_=n.fakecontrols&&n.fakecontrols[e]}catch(e){_=!1,M(e.message)}if(_){f="element",d={};try{d={baseClass:"viewbox__fakecontrol",baseParams:fest._helpers.mergeTopParams(n.fakecontrols[e],{mods:[e]})}}catch(e){M(e.message)}(u=v[f])&&(s+=T(u,d,!1))}}try{_=n.hdr}catch(e){_=!1,M(e.message)}if(_){s+='<div class="viewbox__hdr">',f="hdr",d={};try{d=n.hdr}catch(e){M(e.message)}(u=v[f])&&(s+=T(u,d,!1)),s+="</div>"}try{_=n.buttons}catch(e){_=!1,M(e.message)}if(_){var r,c,m,i;s+='<div class="viewbox__buttons">';try{m=(i=n.buttons||[]).length}catch(e){i=[],m=0,M(e.message)}for(r=0;r<m;r++){c=i[r],f="button",d={};try{k(d,c)}catch(e){M(e.message)}try{k(d,fest._helpers.mergeTopParams(c,{mix:r?["margin_left_10"]:[],mods:["opaque"]}))}catch(e){M(e.message)}(u=v[f])&&(s+=T(u,d,!1))}s+="</div>"}try{_=n.grid}catch(e){_=!1,M(e.message)}if(_){s+='<div class="viewbox__grid">',f="grid",d={};try{d=n.grid}catch(e){M(e.message)}(u=v[f])&&(s+=T(u,d,!1)),s+="</div>"}try{_=n.topics}catch(e){_=!1,M(e.message)}if(_){s+='<div class="viewbox__forum">',f="cols",d={};try{k(d,{mods:["percent","margin"],mix:["padding_left_20"]})}catch(e){M(e.message)}d.html=j(function(){var e,t,a,s,r,c,m="";try{r=(c=n.topics||[]).length}catch(e){c=[],r=0,M(e.message)}for(a=0;a<r;a++){s=c[a],t={};try{k(t,{mods:["small_percent-50","medium_percent-50","large_percent-50"],mix:1<a?["margin_top_10"]:[]})}catch(e){M(e.message)}t.html=j(function(){var e,t,a="";t={};try{t=s}catch(e){M(e.message)}return(e=v["forum-topic"])&&(a+=T(e,t,!1)),a}),(e=v.cols__column)&&(m+=T(e,t,!0))}return m}),(u=v[f])&&(s+=T(u,d,!0)),s+="</div>"}try{_=n.slot}catch(e){_=!1,M(e.message)}if(_){s+='<div class="viewbox__slot">',f="rb-slot",d={};try{d=n.slot}catch(e){M(e.message)}(u=v[f])&&(s+=T(u,d,!1)),s+="</div>"}return s+="</div>"},v.viewbox__list=function(e){var t="";f="element",d={};try{d={baseParams:e.listParams,baseClass:"viewbox__list",elem:{baseParams:e.listContentParams,baseClass:"viewbox__list-content",elem:{baseParams:e.previewsParams,baseClass:"viewbox__previews"}}}}catch(e){M(e.message)}return(u=v[f])&&(t+=T(u,d,!1)),t},v.viewbox__error=function(c){var e="";f="element",d={};try{k(d,c)}catch(e){M(e.message)}try{k(d,{baseClass:"viewbox__error"})}catch(e){M(e.message)}return d.html=j(function(){var e,t,a,s,r="";try{t=c.icon}catch(e){t=!1,M(e.message)}if(t){e="icon",s={};try{s=fest._helpers.mergeParams(c.icon,{mix:["margin_bottom_70","viewbox__error-icon"]})}catch(e){M(e.message)}(a=v[e])&&(r+=T(a,s,!1))}r+='<span class="viewbox__error-text">';try{r+=c.text||"Ошибка загрузки изображения"}catch(e){M(e.message+"22")}r+="</span>",e="element",s={};try{k(s,c.button)}catch(e){M(e.message)}try{k(s,{baseClass:"viewbox__button",mods:["error"],html:c.button&&c.button.text||"Перезагрузить"})}catch(e){M(e.message)}return(a=v[e])&&(r+=T(a,s,!1)),r}),(u=v[f])&&(e+=T(u,d,!0)),e},v.viewbox__control=function(r){var e="";f="element",d={};try{k(d,r)}catch(e){M(e.message)}try{k(d,{baseClass:"viewbox__control"})}catch(e){M(e.message)}return d.html=j(function(){var t,e,a,s="";s+='<div class="viewbox__arrow">';try{t=r.icon}catch(e){t=!1,M(e.message)}if(t){a={};try{a=r.icon}catch(e){M(e.message)}(e=v.icon)&&(s+=T(e,a,!1))}return s+="</div>"}),(u=v[f])&&(e+=T(u,d,!0)),e},v.element=function(e){var t,a,s,r,c="";try{var m=e.baseParams||e.forParams||e,n=m.attrs||{},i=e.baseClass||e.forClass||"",o=e.elem,h=e.htmlDeep;o&&h&&!o.htmlDeep?o.htmlDeep=h:!o&&h&&(e.html=h),e.href&&(n.href=e.href)}catch(e){M(e.message)}try{"string"!=typeof(b=(n.href?"a":e.tagName)||"div")&&(M("Element name must be a string"),b="div")}catch(e){b="div",M(e.message)}x.push(b),c+="<"+b,c+=' class="';try{f=fest._helpers.classNamesFor(i,m)}catch(e){f="",M(e.message)}c+=f,c+='"';try{t=n||{}}catch(e){p={},M(e.message)}for(a in t){s=t[a];try{f=a}catch(e){f="",M(e.message)}if(""!==f){c+=" "+f+'="';try{c+=w(s)}catch(e){M(e.message+"25")}c+='"'}}try{r=e.attrsNoEscape||{}}catch(e){p={},M(e.message)}for(a in r){s=r[a];try{f=a}catch(e){f="",M(e.message)}if(""!==f){c+=" "+f+'="';try{c+=s}catch(e){M(e.message+"30")}c+='"'}}c+=(b=x[x.length-1])in P?"/>":">";try{_=e.htmlPrepend}catch(e){_=!1,M(e.message)}if(_)try{c+=e.htmlPrepend}catch(e){M(e.message+"36")}try{_=e.html}catch(e){_=!1,M(e.message)}if(_)try{c+=e.html}catch(e){M(e.message+"39")}try{_=e.elem}catch(e){_=!1,M(e.message)}if(_){f="element",d={};try{d=e.elem}catch(e){M(e.message)}(u=v[f])&&(c+=T(u,d,!1))}try{_=e.elems}catch(e){_=!1,M(e.message)}if(_){var l,g,y;try{g=(y=e.elems||[]).length}catch(e){y=[],g=0,M(e.message)}for(l=0;l<g;l++){o=y[l];try{_=o}catch(e){_=!1,M(e.message)}if(_){f="element",d={};try{d=o}catch(e){M(e.message)}(u=v[f])&&(c+=T(u,d,!1))}}}try{_=e.htmlAppend}catch(e){_=!1,M(e.message)}if(_)try{c+=e.htmlAppend}catch(e){M(e.message+"52")}return(b=x[x.length-1])in P||(c+="</"+b+">"),x.pop(),c},v.share=function(c){var e="";try{_=c.name}catch(e){_=!1,M(e.message)}if(_){try{c.innerParams||c.innerMix,c.countParams||c.countMix}catch(e){M(e.message)}f="element",d={};try{k(d,c)}catch(e){M(e.message)}try{k(d,{baseClass:"share"})}catch(e){M(e.message)}try{k(d,fest._helpers.mergeTopParams(c,{mods:[c.name],attrs:{"data-share":c.name}}))}catch(e){M(e.message)}d.html=j(function(){var e,t,a="";t={};try{k(t,c.buttonParams)}catch(e){M(e.message)}try{k(t,{baseClass:"share__button"})}catch(e){M(e.message)}return t.html=j(function(){var e,t,a,s,r="";e="icon",s={};try{k(s,{name:c.name})}catch(e){M(e.message)}try{k(s,c.iconParams)}catch(e){M(e.message)}try{k(s,fest._helpers.mergeTopParams({mods:["social","social_"+c.name]},c.iconParams))}catch(e){M(e.message)}(a=v[e])&&(r+=T(a,s,!1));try{t=c.text}catch(e){t=!1,M(e.message)}if(t){e="element",s={};try{k(s,c.textParams)}catch(e){M(e.message)}try{k(s,{tagName:"span",baseClass:"share__text",html:c.text})}catch(e){M(e.message)}(a=v[e])&&(r+=T(a,s,!1))}return r}),(e=v.element)&&(a+=T(e,t,!0)),a}),(u=v[f])&&(e+=T(u,d,!0))}return e},v.icon=function(c){var e="";try{var m=c.svg}catch(e){M(e.message)}f="element",d={};try{k(d,c)}catch(e){M(e.message)}try{k(d,fest._helpers.mergeTopParams(c,{mods:m?["svg"]:[],attrs:c.title&&{title:c.title}}))}catch(e){M(e.message)}try{k(d,{tagName:c.tagName||c.tag||"span",baseClass:"icon"})}catch(e){M(e.message)}return d.html=j(function(){var e,t,a,s,r="";try{t=m&&m.name}catch(e){t=!1,M(e.message)}if(t){e="icon__svg_defs",s={};try{s=m}catch(e){M(e.message)}(a=v[e])&&(r+=T(a,s,!1))}try{t=c.icon}catch(e){t=!1,M(e.message)}if(t){e="icon",s={};try{s=c.icon}catch(e){M(e.message)}(a=v[e])&&(r+=T(a,s,!1))}try{t=c.html}catch(e){t=!1,M(e.message)}if(t)try{r+=c.html}catch(e){M(e.message+"35")}return r}),(u=v[f])&&(e+=T(u,d,!0)),e},v.icon__svg_defs=function(a){var e="";f="element",d={};try{k(d,a)}catch(e){M(e.message)}try{k(d,fest._helpers.mergeTopParams(a,{mods:[a.name],attrs:a.viewbox&&{viewbox:a.viewbox}}))}catch(e){M(e.message)}try{k(d,{tagName:"svg",baseClass:"icon__svg"})}catch(e){M(e.message)}return d.html=j(function(){var t,e="";e+='<use xlink:href="';try{t="#icon__svg_"+a.name}catch(e){t="",M(e.message)}return e+=t,e+='"></use>'}),(u=v[f])&&(e+=T(u,d,!0)),e},v.loader=function(e){var t="";try{n[0]=w(fest._helpers.classNamesFor("loader",e))}catch(e){n[0]="",M(e.message)}return t+='<svg class="'+n[0]+'" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="-10 -10 220 220"><defs><linearGradient id="transparent" gradientUnits="objectBoundingBox" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="rgba(119, 119, 119, 0)" stop-opacity="0"></stop><stop offset="100%" stop-color="rgba(119, 119, 119, 0)" stop-opacity="0"></stop></linearGradient><linearGradient id="one" gradientUnits="objectBoundingBox" x1="1" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="rgba(119, 119, 119, 0)" stop-opacity="0"></stop><stop offset="100%" stop-color="rgba(119, 119, 119, .33)"></stop></linearGradient><linearGradient id="two" gradientUnits="objectBoundingBox" x1="1" y1="1" x2="0" y2="0"><stop offset="0%" stop-color="rgba(119, 119, 119, .33)"></stop><stop offset="100%" stop-color="rgba(119, 119, 119, .66)"></stop></linearGradient><linearGradient id="three" gradientUnits="objectBoundingBox" x1="0" y1="1" x2="0" y2="0"><stop offset="0%" stop-color="rgba(119, 119, 119, .66)"></stop><stop offset="100%" stop-color="rgba(119, 119, 119, 1)"></stop></linearGradient><linearGradient id="four" gradientUnits="objectBoundingBox" x1="0" y1="1" x2="1" y2="0"><stop offset="0%" stop-color="rgba(119, 119, 119, 1)"></stop><stop offset="100%" stop-color="rgba(119, 119, 119, 1)"></stop></linearGradient><linearGradient id="five" gradientUnits="objectBoundingBox" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="rgba(119, 119, 119, 1)"></stop><stop offset="100%" stop-color="rgba(119, 119, 119, 1)"></stop></linearGradient></defs><g fill="none" stroke-width="40" transform="translate(100,100)"><path d="M 81.6,-40 A 90,90 0 0,1 81.6,40" stroke="url(#transparent)"></path><path d="M 81.6,40 A 90,90 0 0,1 0,90" stroke="url(#one)"></path><path d="M 0,90 A 90,90 0 0,1 -81.6,40" stroke="url(#two)"></path><path d="M -81.6,40 A 90,90 0 0,1 -81.6,-40" stroke="url(#three)"></path><path d="M -81.6,-40 A 90,90 0 0,1 0,-90" stroke="url(#four)"></path><path d="M 0,-90 A 90,90 0 0,1 81.6,-40" stroke="url(#five)" stroke-linecap="round"></path></g></svg>'},v.button=function(c){var e="";try{var m,n=c.icon;n&&(m=n.position||"left",n=fest._helpers.mergeParams(n,{mix:["button__icon"].concat(c.text||c.ending?["button__icon_"+m]:[])}))}catch(e){M(e.message)}f="element",d={};try{k(d,c)}catch(e){M(e.message)}try{k(d,{baseClass:"button",tagName:c.tagName||"button"})}catch(e){M(e.message)}return d.html=j(function(){var e,t,a,s,r="";try{t=c.loader}catch(e){t=!1,M(e.message)}if(t){e="loader",s={};try{s={mods:["button"],mix:["button__loader"]}}catch(e){M(e.message)}(a=v[e])&&(r+=T(a,s,!1))}r+='<span class="button__inner">';try{t="left"===m}catch(e){t=!1,M(e.message)}if(t){e="icon",s={};try{s=n}catch(e){M(e.message)}(a=v[e])&&(r+=T(a,s,!1))}try{t=c.text}catch(e){t=!1,M(e.message)}if(t){e="element",s={};try{k(s,c.textParams)}catch(e){M(e.message)}try{k(s,{baseClass:"button__text",html:c.text})}catch(e){M(e.message)}(a=v[e])&&(r+=T(a,s,!1))}try{t=c.hiddenText}catch(e){t=!1,M(e.message)}if(t){e="element",s={};try{k(s,fest._helpers.mergeTopParams(c.textParams,{mods:["hidden"]}))}catch(e){M(e.message)}try{k(s,{baseClass:"button__text",tagName:"span",html:c.hiddenText})}catch(e){M(e.message)}(a=v[e])&&(r+=T(a,s,!1))}try{t=c.ending}catch(e){t=!1,M(e.message)}if(t){e="element",s={};try{k(s,c.endingParams)}catch(e){M(e.message)}try{k(s,{baseClass:"button__ending",html:c.ending})}catch(e){M(e.message)}(a=v[e])&&(r+=T(a,s,!1))}try{t="right"==m}catch(e){t=!1,M(e.message)}if(t){e="icon",s={};try{s=n}catch(e){M(e.message)}(a=v[e])&&(r+=T(a,s,!1))}try{t=c.html}catch(e){t=!1,M(e.message)}if(t)try{r+=c.html}catch(e){M(e.message+"91")}return r+="</span>"}),(u=v[f])&&(e+=T(u,d,!0)),e},v.link=function(c){var e="";try{var m,n=c.textParams||{mods:c.textMods||[],mix:c.textMix||[]},i=c.endingParams||{mods:c.endingMods||[],mix:c.endingMix||[]},o=c.icon;o&&(m=o.position||"left",o.mix=o.mix||[],o.mix.push("link__icon"),o.mix.push("margin_"+("left"==m?"right":"left")+"_"+(o.marginSize||5)),c.mods=c.mods||[],c.mods.push("icon")),c.ending&&(n.mix=["margin_right_5"].concat(n.mix||[]))}catch(e){M(e.message)}f="element",d={};try{k(d,c)}catch(e){M(e.message)}try{k(d,{baseClass:"link",tagName:"span"})}catch(e){M(e.message)}return d.html=j(function(){var e,t,a,s,r="";try{t="left"==m}catch(e){t=!1,M(e.message)}if(t){e="icon",s={};try{s=o}catch(e){M(e.message)}(a=v[e])&&(r+=T(a,s,!1))}try{t=c.beginning||c.beginningParams}catch(e){t=!1,M(e.message)}if(t){e="element",s={};try{k(s,{baseClass:"link__beginning",tagName:"span",html:c.beginning})}catch(e){M(e.message)}try{k(s,c.beginningParams)}catch(e){M(e.message)}(a=v[e])&&(r+=T(a,s,!1))}try{t="text"in c}catch(e){t=!1,M(e.message)}if(t){e="element",s={};try{k(s,n)}catch(e){M(e.message)}try{k(s,{baseClass:"link__text",tagName:"span",html:c.text})}catch(e){M(e.message)}(a=v[e])&&(r+=T(a,s,!1))}try{t=c.ending}catch(e){t=!1,M(e.message)}if(t){e="element",s={};try{k(s,i)}catch(e){M(e.message)}try{k(s,{baseClass:"link__ending",tagName:"span",html:c.ending})}catch(e){M(e.message)}(a=v[e])&&(r+=T(a,s,!1))}try{t="right"==m}catch(e){t=!1,M(e.message)}if(t){e="icon",s={};try{s=o}catch(e){M(e.message)}(a=v[e])&&(r+=T(a,s,!1))}return r}),(u=v[f])&&(e+=T(u,d,!0)),e},v.sharelist=function(o){var e="";try{var h=o.itemParams||{},l=o.extraItemParams||{},g=o.order||fest._constants.shares.order,y=fest._constants.shares.types}catch(e){M(e.message)}f="element",d={};try{k(d,o)}catch(e){M(e.message)}try{k(d,{baseClass:"sharelist"})}catch(e){M(e.message)}return d.html=j(function(){var e,t,a,s,r,c,m,n,i="";try{t=o.text||o.icon}catch(e){t=!1,M(e.message)}if(t){e="element",s={};try{k(s,o.textParams)}catch(e){M(e.message)}try{k(s,{baseClass:"sharelist__text",html:o.text})}catch(e){M(e.message)}s.htmlPrepend=j(function(){var t,e,a,s="";try{t=o.icon}catch(e){t=!1,M(e.message)}if(t){a={};try{a=fest._helpers.mergeTopParams(o.icon,{mix:["margin_right_10"]})}catch(e){M(e.message)}(e=v.icon)&&(s+=T(e,a,!1))}return s}),(a=v[e])&&(i+=T(a,s,!0))}i+='<div class="sharelist__items">';try{t=o.countParams}catch(e){t=!1,M(e.message)}if(t){e="element",s={};try{s={baseClass:"sharelist__count",baseParams:o.countParams}}catch(e){M(e.message)}(a=v[e])&&(i+=T(a,s,!1))}try{m=(n=g||[]).length}catch(e){n=[],m=0,M(e.message)}for(r=0;r<m;r++){c=n[r];try{t=y.hasOwnProperty(c)}catch(e){t=!1,M(e.message)}if(t){e="share",s={};try{k(s,{buttonParams:o.buttonParams,textParams:o.buttonTextParams,text:o.showLabels&&y[c].text,name:c,href:"#"})}catch(e){M(e.message)}try{k(s,l[c])}catch(e){M(e.message)}try{k(s,fest._helpers.mergeTopParams({mix:["sharelist__item"]},h,l[c]))}catch(e){M(e.message)}(a=v[e])&&(i+=T(a,s,!1))}}return i+="</div>"}),(u=v[f])&&(e+=T(u,d,!0)),e},v["rb-slot"]=function(a){var e="";try{var t,s,r=ru.mail.cpf.Basic.Extend,c=r({},a.queryParams||{},function(e){var t={};if(e)for(var a=(e=decodeURIComponent(e)).split("&"),s=0;s<a.length;s++){var r=a[s].split("=",2);t[r[0]]=r[1]}return t}(a.customQueryString||"")),m=[];if(a.id){s=t="/rb/"+a.id,["sitezone","siteid","string","region"].reduce(function(e,t){return a[t]&&e.push("_"+t.toUpperCase()+"="+a[t]),e},m);var n=Object.keys(c);n.length&&n.reduce(function(e,t){return e.push(t+"="+c[t]),e},m),m&&m.length&&(s=t+="?"+m.join("&")),a.name&&(s+=" ("+a.name+")")}}catch(e){M(e.message)}try{_=s}catch(e){_=!1,M(e.message)}if(_){e+="\x3c!-- ";try{e+=s}catch(e){M(e.message+"65")}e+=" --\x3e"}try{_=a.beforeInclude}catch(e){_=!1,M(e.message)}if(_)try{e+=a.beforeInclude}catch(e){M(e.message+"69")}try{_=a.async}catch(e){_=!1,M(e.message)}if(_){f="element",d={};try{k(d,a.asyncParams)}catch(e){M(e.message)}try{k(d,{baseClass:"rb-slot"})}catch(e){M(e.message)}(u=v[f])&&(e+=T(u,d,!1))}else{try{_=t}catch(e){_=!1,M(e.message)}if(_){e+='\x3c!--#include virtual="';try{e+=t}catch(e){M(e.message+"83")}e+='" wait="yes"--\x3e'}}try{_=a.afterInclude}catch(e){_=!1,M(e.message)}if(_)try{e+=a.afterInclude}catch(e){M(e.message+"87")}try{_=s}catch(e){_=!1,M(e.message)}if(_){e+="\x3c!-- /";try{e+=s}catch(e){M(e.message+"91")}e+=" --\x3e"}return e},v.element_ssi=function(e){var t,a,s,r="";try{var c=e.attrs||{};e.href&&(c.href=e.href)}catch(e){M(e.message)}try{"string"!=typeof(b=(c.href?"a":e.tagName)||"span")&&(M("Element name must be a string"),b="div")}catch(e){b="div",M(e.message)}x.push(b),r+="<"+b,r+=' class="';try{f=fest._helpers.classNamesFor(e.baseClass,e)}catch(e){f="",M(e.message)}r+=f,r+='"';try{s=c||{}}catch(e){p={},M(e.message)}for(t in s){a=s[t];try{f=t}catch(e){f="",M(e.message)}if(""!==f){r+=" "+f+'="';try{_=a&&a.indexOf&&-1<a.indexOf("--# echo")}catch(e){_=!1,M(e.message)}if(_)try{r+=a}catch(e){M(e.message+"17")}else try{r+=w(a)}catch(e){M(e.message+"20")}r+='"'}}r+=(b=x[x.length-1])in P?"/>":">";try{_=e.html}catch(e){_=!1,M(e.message)}if(_)try{r+=e.html}catch(e){M(e.message+"27")}return(b=x[x.length-1])in P||(r+="</"+b+">"),x.pop(),r},v.badge=function(a){var e="";f="element",d={};try{k(d,a)}catch(e){M(e.message)}try{k(d,{tagName:a.tagName||"span",baseClass:"badge"})}catch(e){M(e.message)}return d.html=j(function(){var t,e="";try{t=a.src}catch(e){t=!1,M(e.message)}if(t){try{n[0]=w(a.src)}catch(e){n[0]="",M(e.message)}e+='<img src="'+n[0]+'" class="badge__icon"/>'}try{t=a.text}catch(e){t=!1,M(e.message)}if(t){e+='<span class="badge__text">';try{e+=a.text}catch(e){M(e.message+"19")}e+="</span>"}return e}),(u=v[f])&&(e+=T(u,d,!0)),e},v.photo=function(c){var e="";try{var m=c.actionParams||{mix:c.actionMix},n=c.picParams||{mix:c.picMix},i=c.mods&&~c.mods.indexOf("full"),o=c.lazy||{},h=fest._helpers.getByPath("labels.items",c)||[]}catch(e){M(e.message)}f="element_ssi",d={};try{k(d,c)}catch(e){M(e.message)}try{k(d,{baseClass:"photo"})}catch(e){M(e.message)}return d.html=j(function(){var e,t,a,s,r="";e="element",s={};try{k(s,c.innerParams)}catch(e){M(e.message)}try{k(s,{baseClass:"photo__inner"})}catch(e){M(e.message)}s.html=j(function(){var e,t,a,s,r="";try{t=c.action}catch(e){t=!1,M(e.message)}if(t){e="element",s={};try{k(s,m)}catch(e){M(e.message)}try{k(s,{tagName:"span",baseClass:"photo__action"})}catch(e){M(e.message)}s.html=j(function(){var e,t,a="";a+='<span class="photo__action-inner">',t={};try{t=c.action}catch(e){M(e.message)}return(e=v.icon)&&(a+=T(e,t,!1)),a+="</span>"}),(a=v[e])&&(r+=T(a,s,!0))}try{t=c.labels}catch(e){t=!1,M(e.message)}if(t){e="element",s={};try{k(s,c.labels)}catch(e){M(e.message)}try{k(s,{tagName:"span",baseClass:"photo__labels"})}catch(e){M(e.message)}s.html=j(function(){var e,t,a,s,r,c,m="";try{r=(c=h||[]).length}catch(e){c=[],r=0,M(e.message)}for(a=0;a<r;a++){s=c[a],t={};try{k(t,s)}catch(e){M(e.message)}try{k(t,fest._helpers.mergeTopParams(s,{mix:["photo__label"]}))}catch(e){M(e.message)}(e=v.badge)&&(m+=T(e,t,!1))}return m}),(a=v[e])&&(r+=T(a,s,!0))}try{t=c.src||c.lazy}catch(e){t=!1,M(e.message)}if(t){e="element",s={};try{k(s,n)}catch(e){M(e.message)}try{k(s,fest._helpers.mergeParams(c.lazy?{mix:["m-lazy-item"].concat(o.type?["m-lazy-item_"+o.type]:["m-lazy-item_photo"]).concat(o.size?["m-lazy-item_size_"+o.size]:[]),attrs:i?{}:{src:fest._helpers.svgPlaceholder(c.height,c.width)}}:{attrs:i?{style:"background-image:url("+c.src+")"}:{src:c.src}},n))}catch(e){M(e.message)}try{k(s,{baseClass:"photo__pic",tagName:i?"span":"img"})}catch(e){M(e.message)}(a=v[e])&&(r+=T(a,s,!1))}return r}),(a=v[e])&&(r+=T(a,s,!0));try{t=c.title||c.titleNoescape||c.subtitle||c.count||c.icon||c.captionHtml}catch(e){t=!1,M(e.message)}if(t){e="element",s={};try{k(s,{tagName:"span",baseClass:"photo__captions",mods:[].concat(c.count||c.icon?["icon"]:[])})}catch(e){M(e.message)}s.html=j(function(){var e,t,a,s,r="";try{t=c.count}catch(e){t=!1,M(e.message)}if(t){r+='<span class="photo__count">';try{r+=w(c.count)}catch(e){M(e.message+"122")}r+="</span>"}try{t=c.icon}catch(e){t=!1,M(e.message)}if(t){r+='<span class="photo__icon">',e="icon",s={};try{s=c.icon}catch(e){M(e.message)}(a=v[e])&&(r+=T(a,s,!1)),r+="</span>"}try{t=c.param}catch(e){t=!1,M(e.message)}if(t){e="element",s={};try{k(s,{tagName:"span",baseClass:"photo__param"})}catch(e){M(e.message)}try{k(s,c.paramParams)}catch(e){M(e.message)}s.html=j(function(){var e="";try{e+=w(c.param)}catch(e){M(e.message+"146")}return e}),(a=v[e])&&(r+=T(a,s,!0))}try{t=c.title||c.titleNoescape}catch(e){t=!1,M(e.message)}if(t){e="element",s={};try{k(s,{tagName:"span",baseClass:"photo__title"})}catch(e){M(e.message)}try{k(s,c.titleParams)}catch(e){M(e.message)}s.html=j(function(){var t,e="";try{t=c.titleNoescape}catch(e){t=!1,M(e.message)}if(t)try{e+=c.titleNoescape}catch(e){M(e.message+"163")}else try{e+=w(c.title)}catch(e){M(e.message+"166")}return e}),(a=v[e])&&(r+=T(a,s,!0))}try{t=c.subtitle||c.subtitleNoescape}catch(e){t=!1,M(e.message)}if(t){r+='<span class="photo__subtitle">';try{t=c.subtitleNoescape}catch(e){t=!1,M(e.message)}if(t)try{r+=c.subtitleNoescape}catch(e){M(e.message+"179")}else try{r+=w(c.subtitle)}catch(e){M(e.message+"184")}r+="</span>"}try{t=c.captionHtml}catch(e){t=!1,M(e.message)}if(t)try{r+=c.captionHtml}catch(e){M(e.message+"193")}return r}),(a=v[e])&&(r+=T(a,s,!0))}try{t=c.html}catch(e){t=!1,M(e.message)}if(t)try{r+=c.html}catch(e){M(e.message+"202")}return r}),(u=v[f])&&(e+=T(u,d,!0)),e},v.spring=function(r){var e="";try{var c=r.slot,m=~["number","string"].indexOf(typeof c)?{id:r.slot,region:r.region,sitezone:r.sitezone}:c}catch(e){M(e.message)}f="element",d={};try{k(d,r)}catch(e){M(e.message)}try{k(d,fest._helpers.mergeParams({attrs:r.src?{style:"background-image: url("+r.src+")"}:{}},r))}catch(e){M(e.message)}try{k(d,{baseClass:"spring"})}catch(e){M(e.message)}return d.html=j(function(){var t,e,a,s="";try{t=c}catch(e){t=!1,M(e.message)}if(t){a={};try{a=m}catch(e){M(e.message)}(e=v["rb-slot"])&&(s+=T(e,a,!1))}try{t=r.html}catch(e){t=!1,M(e.message)}if(t)try{s+=r.html}catch(e){M(e.message+"37")}return s}),(u=v[f])&&(e+=T(u,d,!0)),e},v.grid__item=function(c){var e="";try{var m=fest._helpers.mergeTopParams,n=c.photo}catch(e){M(e.message)}f="element",d={};try{k(d,c)}catch(e){M(e.message)}try{k(d,{baseClass:"grid__item"})}catch(e){M(e.message)}return d.html=j(function(){var e,t,a,s,r="";r+='<div class="grid__fixer">';try{t=c.slot}catch(e){t=!1,M(e.message)}if(t){e="rb-slot",s={};try{s=c.slot}catch(e){M(e.message)}(a=v[e])&&(r+=T(a,s,!1)),r+='\x3c!--# if expr="$SLOT_';try{r+=w(c.slot.id)}catch(e){M(e.message+"25")}r+='_SHOWN"--\x3e\x3c!--# else--\x3e';try{t=n}catch(e){t=!1,M(e.message)}if(t){e="photo",s={};try{k(s,n)}catch(e){M(e.message)}try{k(s,m(n,{mix:["grid__photo"]}))}catch(e){M(e.message)}(a=v[e])&&(r+=T(a,s,!1))}r+="\x3c!--# endif--\x3e"}else{try{t=n}catch(e){t=!1,M(e.message)}if(t){e="photo",s={};try{k(s,n)}catch(e){M(e.message)}try{k(s,m(n,{mix:["grid__photo"]}))}catch(e){M(e.message)}(a=v[e])&&(r+=T(a,s,!1))}else{try{t=c.banner}catch(e){t=!1,M(e.message)}if(t){e="spring",s={};try{s=c.banner}catch(e){M(e.message)}(a=v[e])&&(r+=T(a,s,!1))}else{try{t=c.text}catch(e){t=!1,M(e.message)}if(t){r+='<span class="grid__text">';try{r+=c.text}catch(e){M(e.message+"63")}r+="</span>"}}}}try{t=c.html}catch(e){t=!1,M(e.message)}if(t)try{r+=c.html}catch(e){M(e.message+"72")}return r+="</div>"}),(u=v[f])&&(e+=T(u,d,!0)),e},v.grid__row=function(o){var e="";f="element",d={};try{k(d,o)}catch(e){M(e.message)}try{k(d,{baseClass:"grid__row"})}catch(e){M(e.message)}return d.html=j(function(){var e,t,a,s,r,c,m,n,i="";try{m=(n=o.items||[]).length}catch(e){n=[],m=0,M(e.message)}for(r=0;r<m;r++){c=n[r],e="grid__item",s={};try{s=c}catch(e){M(e.message)}(a=v[e])&&(i+=T(a,s,!1))}try{t=o.banner}catch(e){t=!1,M(e.message)}if(t){e="spring",s={};try{s={mix:["grid__spring"],slot:o.banner}}catch(e){M(e.message)}(a=v[e])&&(i+=T(a,s,!1))}try{t=o.html}catch(e){t=!1,M(e.message)}if(t)try{i+=o.html}catch(e){M(e.message+"29")}return i}),(u=v[f])&&(e+=T(u,d,!0)),e},v.grid=function(i){var e="";f="element",d={};try{k(d,i)}catch(e){M(e.message)}try{k(d,{baseClass:"grid"})}catch(e){M(e.message)}return d.html=j(function(){var t,e,a,s,r,c,m,n="";try{c=(m=i.rows||[]).length}catch(e){m=[],c=0,M(e.message)}for(s=0;s<c;s++){r=m[s],a={};try{a=r}catch(e){M(e.message)}(e=v.grid__row)&&(n+=T(e,a,!1))}try{t=i.html}catch(e){t=!1,M(e.message)}if(t)try{n+=i.html}catch(e){M(e.message+"19")}return n}),(u=v[f])&&(e+=T(u,d,!0)),e},v.label=function(e){var t="";f="element",d={};try{k(d,e)}catch(e){M(e.message)}try{k(d,{tagName:"span",baseClass:"label",html:e.text})}catch(e){M(e.message)}return(u=v[f])&&(t+=T(u,d,!1)),t},v.hdr__side=function(e){var t="";try{n[0]=w((e.mods?" hdr__side_"+e.mods.join(" hdr__side_"):"")+(e.mix?" "+e.mix.join(" "):""))}catch(e){n[0]="",M(e.message)}t+='<div class="hdr__side'+n[0]+'">';try{_=e.html}catch(e){_=!1,M(e.message)}if(_)try{t+=e.html}catch(e){M(e.message+"6")}return t+="</div>"},v.hdr__ending=function(e){var t,a,s,r="";try{"string"!=typeof(b=e.href?"a":"span")&&(M("Element name must be a string"),b="div")}catch(e){b="div",M(e.message)}x.push(b),r+="<"+b;try{_=e.href}catch(e){_=!1,M(e.message)}if(_){r+=' href="';try{r+=e.href}catch(e){M(e.message+"8")}r+='"'}r+=' class="';try{r+=fest._helpers.classNamesFor("hdr__ending",e)}catch(e){M(e.message+"14")}r+='"';try{s=e.attrs||{}}catch(e){p={},M(e.message)}for(t in s){a=s[t];try{f=t}catch(e){f="",M(e.message)}if(""!==f){r+=" "+f+'="';try{f=a}catch(e){f="",M(e.message)}r+=f,r+='"'}}r+=(b=x[x.length-1])in P?"/>":">";try{_=e.text}catch(e){_=!1,M(e.message)}if(_)try{r+=e.text}catch(e){M(e.message+"24")}return(b=x[x.length-1])in P||(r+="</"+b+">"),x.pop(),r},v.hdr=function(o){var e="";try{if(!o.item&&o.text){var t,a,s,r={text:o.text,tag:o.tag},c=["Mods","Mix","Href","Tag","Ending"];for(t in c)(s=o["text"+(a=c[t])])&&(r[a.toLowerCase()]=s);o.item=r}o.item&&(o.items=o.items||[],o.items.splice(0,0,o.item))}catch(e){M(e.message)}f="element",d={};try{k(d,o)}catch(e){M(e.message)}try{k(d,{baseClass:"hdr",href:null})}catch(e){M(e.message)}return d.html=j(function(){var e,t,a,s,r="";try{t=o.left}catch(e){t=!1,M(e.message)}if(t){e="hdr__side",s={};try{k(s,{mods:["left"],html:o.left})}catch(e){M(e.message)}(a=v[e])&&(r+=T(a,s,!1))}try{t=o.right}catch(e){t=!1,M(e.message)}if(t){e="hdr__side",s={};try{k(s,{mods:["right"],html:o.right})}catch(e){M(e.message)}(a=v[e])&&(r+=T(a,s,!1))}try{t=o.items}catch(e){t=!1,M(e.message)}if(t){var c,m,n,i;r+='<div class="hdr__wrapper">';try{n=(i=o.items||[]).length}catch(e){i=[],n=0,M(e.message)}for(c=0;c<n;c++){m=i[c];try{m.mods=m.mods||[],1<o.items.length&&1!=m.active&&m.mods.push("inactive")}catch(e){M(e.message)}try{t=m.icon}catch(e){t=!1,M(e.message)}if(t){e="icon",s={};try{s=m.icon}catch(e){M(e.message)}(a=v[e])&&(r+=T(a,s,!1))}e="element",s={};try{k(s,m)}catch(e){M(e.message)}try{k(s,{baseClass:"hdr__text",tagName:"span"})}catch(e){M(e.message)}s.html=j(function(){var e,t,a,s,r="";try{t=m.text}catch(e){t=!1,M(e.message)}if(t){e="element",s={};try{k(s,m.innerParams)}catch(e){M(e.message)}try{k(s,{baseClass:"hdr__inner",tagName:m.tag?m.tag:"span"})}catch(e){M(e.message)}try{k(s,"string"==typeof m.text&&{html:m.text}||m.text)}catch(e){M(e.message)}(a=v[e])&&(r+=T(a,s,!1))}try{t=m.ending}catch(e){t=!1,M(e.message)}if(t){e="hdr__ending",s={};try{s=m.ending}catch(e){M(e.message)}(a=v[e])&&(r+=T(a,s,!1))}try{t=o.textHtml}catch(e){t=!1,M(e.message)}if(t)try{r+=o.textHtml}catch(e){M(e.message+"113")}return r}),(a=v[e])&&(r+=T(a,s,!0))}r+="</div>"}try{t=o.label}catch(e){t=!1,M(e.message)}if(t){e="label",s={};try{s=o.label}catch(e){M(e.message)}(a=v[e])&&(r+=T(a,s,!1))}try{t=o.html}catch(e){t=!1,M(e.message)}if(t)try{r+=o.html}catch(e){M(e.message+"132")}return r}),(u=v[f])&&(e+=T(u,d,!0)),e},v.cols=function(c){var e="";try{var m=fest._helpers.mergeTopParams,n=c.contentParams||{mods:c.contentMods,mix:c.contentMix},i=c.sidebarParams||{mods:c.sidebarMods,mix:c.sidebarMix}}catch(e){M(e.message)}f="element",d={};try{k(d,c)}catch(e){M(e.message)}try{k(d,{baseClass:"cols"})}catch(e){M(e.message)}return d.html=j(function(){var e,t,a,s,r="";r+='<div class="cols__wrapper">';try{t=c.sidebar}catch(e){t=!1,M(e.message)}if(t){e="cols__column",s={};try{k(s,i)}catch(e){M(e.message)}try{k(s,m(i,{mods:["small_14","medium_14","large_14","sidebar"]}))}catch(e){M(e.message)}try{k(s,{html:c.sidebar})}catch(e){M(e.message)}(a=v[e])&&(r+=T(a,s,!1))}try{t=c.content}catch(e){t=!1,M(e.message)}if(t){e="cols__column",s={};try{k(s,n)}catch(e){M(e.message)}try{k(s,m(n,{mods:["small_32","medium_43","large_47"]}))}catch(e){M(e.message)}try{k(s,{html:c.content})}catch(e){M(e.message)}(a=v[e])&&(r+=T(a,s,!1))}try{t=c.html}catch(e){t=!1,M(e.message)}if(t)try{r+=c.html}catch(e){M(e.message+"57")}return r+="</div>"}),(u=v[f])&&(e+=T(u,d,!0)),e},v.cols__column=function(a){var e="";f="element",d={};try{k(d,a)}catch(e){M(e.message)}try{k(d,{baseClass:"cols__column"})}catch(e){M(e.message)}return d.html=j(function(){var t,e="";try{t=a.html}catch(e){t=!1,M(e.message)}if(t){e+='<div class="cols__inner">';try{e+=a.html}catch(e){M(e.message+"14")}e+="</div>"}return e}),(u=v[f])&&(e+=T(u,d,!0)),e},v.avatar=function(e){var t="";try{var a={32:90,45:90},s=e.user,r=e.avatarSize,c=e.src;!c&&s&&(r||(r=90),c=fest._helpers.avatar({email:s.email,name:s.name,domain:s.domain,filin_domain:s.filin_domain,filin_d:s.filin_d,width:r in a?a[r]:180}))}catch(e){M(e.message)}f="element",d={};try{k(d,e)}catch(e){M(e.message)}try{k(d,fest._helpers.mergeTopParams(e,r&&{mods:["size_"+r]},c&&{attrs:{style:"background-image: url('"+c+"');"}}))}catch(e){M(e.message)}try{k(d,{baseClass:"avatar",tagName:"span"})}catch(e){M(e.message)}return(u=v[f])&&(t+=T(u,d,!1)),t},v["forum-topic__info"]=function(c){var e="";try{var m=c.href,n=c.subject,i=c.author,o=c.date}catch(e){M(e.message)}f="element",d={};try{k(d,c.infoParams)}catch(e){M(e.message)}try{k(d,{baseClass:"forum-topic__info",href:null})}catch(e){M(e.message)}return d.html=j(function(){var e,t,a,s,r="";try{t=m&&n}catch(e){t=!1,M(e.message)}if(t){e="element",s={};try{k(s,c.linkParams)}catch(e){M(e.message)}try{k(s,fest._helpers.mergeTopParams(c.linkParams,{mix:["link-holder"]}))}catch(e){M(e.message)}try{k(s,{baseClass:"forum-topic__link",href:m,html:n})}catch(e){M(e.message)}(a=v[e])&&(r+=T(a,s,!1))}try{t=i&&i.nick}catch(e){t=!1,M(e.message)}if(t){e="element",s={};try{k(s,c.authorParams)}catch(e){M(e.message)}try{k(s,{baseClass:"forum-topic__author",href:i.href||null,html:i.nick})}catch(e){M(e.message)}(a=v[e])&&(r+=T(a,s,!1))}try{t=o}catch(e){t=!1,M(e.message)}if(t){r+='<span class="forum-topic__date">';try{r+=o}catch(e){M(e.message+"50")}r+="</span>"}return r}),(u=v[f])&&(e+=T(u,d,!0)),e},v["forum-topic__bottom"]=function(c){var e="";try{var m=c.last_reply,n=c.replies_cnt,i=c.new_replies_cnt,o=c.rubric,h=fest._helpers.mergeTopParams,l=c.icon||{mods:["comment"]}}catch(e){M(e.message)}e+="\x3c!--noindex--\x3e",f="element",d={};try{k(d,c.topicBottom)}catch(e){M(e.message)}try{k(d,{baseClass:"forum-topic__bottom",href:null})}catch(e){M(e.message)}return d.html=j(function(){var e,t,a,s,r="";try{t=o}catch(e){t=!1,M(e.message)}if(t){e="element",s={};try{k(s,o)}catch(e){M(e.message)}try{k(s,{baseClass:"forum-topic__bottom-rubric",tagName:"span",href:o.href,html:o.text})}catch(e){M(e.message)}(a=v[e])&&(r+=T(a,s,!1))}e="icon",s={};try{s=h({mix:["forum-topic__bottom-icon"]},l)}catch(e){M(e.message)}(a=v[e])&&(r+=T(a,s,!1));try{t=m||n}catch(e){t=!1,M(e.message)}if(t){try{t=n}catch(e){t=!1,M(e.message)}if(t){e="element",s={};try{k(s,c.repliesCntParams)}catch(e){M(e.message)}try{k(s,{baseClass:"forum-topic__bottom-cnt",tagName:"span",href:null,html:n})}catch(e){M(e.message)}(a=v[e])&&(r+=T(a,s,!1))}try{t=i}catch(e){t=!1,M(e.message)}if(t){e="element",s={};try{k(s,c.newRepliesCntParams)}catch(e){M(e.message)}try{k(s,{baseClass:"forum-topic__bottom-newcnt",tagName:"span",href:c.new_replies_href,html:"+"+i})}catch(e){M(e.message)}(a=v[e])&&(r+=T(a,s,!1))}try{t=m}catch(e){t=!1,M(e.message)}if(t){e="element",s={};try{k(s,c.lastReplyParams)}catch(e){M(e.message)}try{k(s,{baseClass:"forum-topic__bottom-info",tagName:"span",href:m.href})}catch(e){M(e.message)}s.html=j(function(){var e,t,a,s,r="";r+="Последний ответ:";try{t=m.author}catch(e){t=!1,M(e.message)}if(t){r+=" ",e="element",s={};try{k(s,c.bottomAuthorParams)}catch(e){M(e.message)}try{k(s,{baseClass:"forum-topic__bottom-autor",tagName:"span",html:m.author.nick})}catch(e){M(e.message)}(a=v[e])&&(r+=T(a,s,!1))}try{t=m.created_at}catch(e){t=!1,M(e.message)}if(t){r+=" ",e="element",s={};try{k(s,c.bottomTimeParams)}catch(e){M(e.message)}try{k(s,{baseClass:"forum-topic__bottom-time",tagName:"span",html:m.created_at})}catch(e){M(e.message)}(a=v[e])&&(r+=T(a,s,!1))}return r}),(a=v[e])&&(r+=T(a,s,!0))}}else{r+='<span class="forum-topic__bottom-info">Вы будете первым, кто ',e="element",s={};try{s={baseClass:"forum-topic__bottom-link",tagName:"span",href:c.formLink||c.href,html:"прокомментировал"}}catch(e){M(e.message)}(a=v[e])&&(r+=T(a,s,!1)),r+="</span>"}return r}),(u=v[f])&&(e+=T(u,d,!0)),e+="\x3c!--/noindex--\x3e"},v["forum-topic"]=function(c){var e="";try{var m=c.author||{}}catch(e){M(e.message)}f="element",d={};try{k(d,c)}catch(e){M(e.message)}try{k(d,{baseClass:"forum-topic",href:null})}catch(e){M(e.message)}return d.html=j(function(){var e,t,a,s,r="";r+='\x3c!--noindex--\x3e<div class="forum-topic__left">',e="avatar",s={};try{s={src:m.src,user:{name:m.nick,email:m.email,domain:m.domain,filin_domain:m.filin_domain,filin_d:m.filin_d},avatarSize:c.avatarSize||90,mix:c.avatarMix||["comment__avatar"],href:m.href}}catch(e){M(e.message)}(a=v[e])&&(r+=T(a,s,!1)),r+='</div>\x3c!--/noindex--\x3e<div class="forum-topic__body"><div class="forum-topic__top">',e="forum-topic__info",s={};try{s=c}catch(e){M(e.message)}(a=v[e])&&(r+=T(a,s,!1));try{t=c.lead}catch(e){t=!1,M(e.message)}if(t){r+='<div class="forum-topic__text">';try{r+=c.lead}catch(e){M(e.message+"39")}r+="</div>"}r+="</div>",e="forum-topic__bottom",s={};try{s=c}catch(e){M(e.message)}return(a=v[e])&&(r+=T(a,s,!1)),r+="</div>"}),(u=v[f])&&(e+=T(u,d,!0)),e},f="ajax",(d={}).html=j(function(){var e,t,a="";t={};try{t={close:{mix:["js-popup_close"],icon:{mods:["close"]}},slider:!0,listParams:{mix:["js-photo_slider"]},listContentParams:{mix:["js-photo_slider_wrap"]},previewsParams:{mix:["js-photo_slider_cont"]},innerParams:{mix:["js-popup_close"]},slidesParams:{mix:["js-slider__content","js-photo_shares"]},containerParams:{mix:["js-slider__container"]},controls:{previous:{icon:{mods:["control_previous"]},mix:["js-photo_ctrl"],attrs:{"data-direction":"prev"}},next:{icon:{mods:["control_next"]},mix:["js-photo_ctrl"],attrs:{"data-direction":"next"}}}}}catch(e){M(e.message)}return(e=v.viewbox)&&(a+=T(e,t,!1)),a}),m.push(c,{name:f,params:d,cp:!0}),c="",a=m.length){for(p=0;p<a;p++)"string"==typeof(t=m[p])?i+=t:(u=v[t.name])&&(i+=T(u,t.params,t.cp));return i+c}return c}}(Function("return this")());