window.scriptsLoaded = window.scriptsLoaded || {}; window.scriptProcessStart = window.scriptProcessStart || {}; window.scriptProcessStart['owa.vendors~Addins~SubjectPicker.mail.js'] = (new Date()).getTime();(window.$wj=window.$wj||[]).push([[35],{1247:function(e,t,r){"use strict";var n=r(200),a=r(844),o=r(538),u="Expected a function";function i(e,t){if("function"!=typeof e||null!=t&&"function"!=typeof t)throw new TypeError(u);var r=function(){var n=arguments,a=t?t.apply(this,n):n[0],o=r.cache;if(o.has(a))return o.get(a);var u=e.apply(this,n);return r.cache=o.set(a,u)||o,u};return r.cache=new(i.Cache||o.a),r}i.Cache=o.a;var c=i,s=500;var l=/^\./,f=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,d=/\\(\\)?/g,v=function(e){var t=c(e,function(e){return r.size===s&&r.clear(),e}),r=t.cache;return t}(function(e){var t=[];return l.test(e)&&t.push(""),e.replace(f,function(e,r,n,a){t.push(n?a.replace(d,"$1"):r||e)}),t}),p=r(835);t.a=function(e,t){return Object(n.a)(e)?e:Object(a.a)(e,t)?[e]:v(Object(p.a)(e))}},1250:function(e,t,r){"use strict";t.a=function(e,t){return e.has(t)}},1251:function(e,t,r){"use strict";var n=r(538),a="__lodash_hash_undefined__";var o=function(e){return this.__data__.set(e,a),this};var u=function(e){return this.__data__.has(e)};function i(e){var t=-1,r=null==e?0:e.length;for(this.__data__=new n.a;++t<r;)this.add(e[t])}i.prototype.add=i.prototype.push=o,i.prototype.has=u;t.a=i},1256:function(e,t,r){"use strict";var n=r(1247),a=r(701);t.a=function(e,t){for(var r=0,o=(t=Object(n.a)(t,e)).length;null!=e&&r<o;)e=e[Object(a.a)(t[r++])];return r&&r==o?e:void 0}},1257:function(e,t,r){"use strict";var n=r(497),a=r(1251);var o=function(e,t){for(var r=-1,n=null==e?0:e.length;++r<n;)if(t(e[r],r,e))return!0;return!1},u=r(1250),i=1,c=2;var s=function(e,t,r,n,s,l){var f=r&i,d=e.length,v=t.length;if(d!=v&&!(f&&v>d))return!1;var p=l.get(e);if(p&&l.get(t))return p==t;var b=-1,_=!0,y=r&c?new a.a:void 0;for(l.set(e,t),l.set(t,e);++b<d;){var O=e[b],h=t[b];if(n)var g=f?n(h,O,b,t,e,l):n(O,h,b,e,t,l);if(void 0!==g){if(g)continue;_=!1;break}if(y){if(!o(t,function(e,t){if(!Object(u.a)(y,t)&&(O===e||s(O,e,r,n,l)))return y.push(t)})){_=!1;break}}else if(O!==h&&!s(O,h,r,n,l)){_=!1;break}}return l.delete(e),l.delete(t),_},l=r(287),f=r(541),d=r(293);var v=function(e){var t=-1,r=Array(e.size);return e.forEach(function(e,n){r[++t]=[n,e]}),r},p=r(838),b=1,_=2,y="[object Boolean]",O="[object Date]",h="[object Error]",g="[object Map]",j="[object Number]",m="[object RegExp]",E="[object Set]",w="[object String]",P="[object Symbol]",T="[object ArrayBuffer]",x="[object DataView]",R=l.a?l.a.prototype:void 0,M=R?R.valueOf:void 0;var A=function(e,t,r,n,a,o,u){switch(r){case x:if(e.byteLength!=t.byteLength||e.byteOffset!=t.byteOffset)return!1;e=e.buffer,t=t.buffer;case T:return!(e.byteLength!=t.byteLength||!o(new f.a(e),new f.a(t)));case y:case O:case j:return Object(d.a)(+e,+t);case h:return e.name==t.name&&e.message==t.message;case m:case w:return e==t+"";case g:var i=v;case E:var c=n&b;if(i||(i=p.a),e.size!=t.size&&!c)return!1;var l=u.get(e);if(l)return l==t;n|=_,u.set(e,t);var R=s(i(e),i(t),n,a,o,u);return u.delete(e),R;case P:if(M)return M.call(e)==M.call(t)}return!1},S=r(1590),C=r(200);var I=function(e,t,r){var n=t(e);return Object(C.a)(e)?n:Object(S.a)(n,r(e))};var D=function(e,t){for(var r=-1,n=null==e?0:e.length,a=0,o=[];++r<n;){var u=e[r];t(u,r,e)&&(o[a++]=u)}return o};var k=function(){return[]},L=Object.prototype.propertyIsEnumerable,N=Object.getOwnPropertySymbols,G=N?function(e){return null==e?[]:(e=Object(e),D(N(e),function(t){return L.call(e,t)}))}:k,q=r(837);var U=function(e){return I(e,q.a,G)},B=1,F=Object.prototype.hasOwnProperty;var V=function(e,t,r,n,a,o){var u=r&B,i=U(e),c=i.length;if(c!=U(t).length&&!u)return!1;for(var s=c;s--;){var l=i[s];if(!(u?l in t:F.call(t,l)))return!1}var f=o.get(e);if(f&&o.get(t))return f==t;var d=!0;o.set(e,t),o.set(t,e);for(var v=u;++s<c;){var p=e[l=i[s]],b=t[l];if(n)var _=u?n(b,p,l,t,e,o):n(p,b,l,e,t,o);if(!(void 0===_?p===b||a(p,b,r,n,o):_)){d=!1;break}v||(v="constructor"==l)}if(d&&!v){var y=e.constructor,O=t.constructor;y!=O&&"constructor"in e&&"constructor"in t&&!("function"==typeof y&&y instanceof y&&"function"==typeof O&&O instanceof O)&&(d=!1)}return o.delete(e),o.delete(t),d},H=r(249),z=r(148),W=Object(H.a)(z.a,"DataView"),J=r(420),Y=Object(H.a)(z.a,"Promise"),$=r(711),K=Object(H.a)(z.a,"WeakMap"),X=r(242),Q=r(482),Z=Object(Q.a)(W),ee=Object(Q.a)(J.a),te=Object(Q.a)(Y),re=Object(Q.a)($.a),ne=Object(Q.a)(K),ae=X.a;(W&&"[object DataView]"!=ae(new W(new ArrayBuffer(1)))||J.a&&"[object Map]"!=ae(new J.a)||Y&&"[object Promise]"!=ae(Y.resolve())||$.a&&"[object Set]"!=ae(new $.a)||K&&"[object WeakMap]"!=ae(new K))&&(ae=function(e){var t=Object(X.a)(e),r="[object Object]"==t?e.constructor:void 0,n=r?Object(Q.a)(r):"";if(n)switch(n){case Z:return"[object DataView]";case ee:return"[object Map]";case te:return"[object Promise]";case re:return"[object Set]";case ne:return"[object WeakMap]"}return t});var oe=ae,ue=r(480),ie=r(509),ce=1,se="[object Arguments]",le="[object Array]",fe="[object Object]",de=Object.prototype.hasOwnProperty;var ve=function(e,t,r,a,o,u){var i=Object(C.a)(e),c=Object(C.a)(t),l=i?le:oe(e),f=c?le:oe(t),d=(l=l==se?fe:l)==fe,v=(f=f==se?fe:f)==fe,p=l==f;if(p&&Object(ue.a)(e)){if(!Object(ue.a)(t))return!1;i=!0,d=!1}if(p&&!d)return u||(u=new n.a),i||Object(ie.a)(e)?s(e,t,r,a,o,u):A(e,t,l,r,a,o,u);if(!(r&ce)){var b=d&&de.call(e,"__wrapped__"),_=v&&de.call(t,"__wrapped__");if(b||_){var y=b?e.value():e,O=_?t.value():t;return u||(u=new n.a),o(y,O,r,a,u)}}return!!p&&(u||(u=new n.a),V(e,t,r,a,o,u))},pe=r(201);t.a=function e(t,r,n,a,o){return t===r||(null==t||null==r||!Object(pe.a)(t)&&!Object(pe.a)(r)?t!=t&&r!=r:ve(t,r,n,a,e,o))}},1286:function(e,t,r){"use strict";var n=r(534);t.a=function(e,t,r){for(var a=-1,o=e.length;++a<o;){var u=e[a],i=t(u);if(null!=i&&(void 0===c?i==i&&!Object(n.a)(i):r(i,c)))var c=i,s=u}return s}},1288:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(0);t.default=function(e){return n.__assign({__type:"ReplyAllToItem:#Exchange"},e)}},1289:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(0);t.default=function(e){return n.__assign({__type:"ReplyToItem:#Exchange"},e)}},1537:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(51);t.default=function(e){return n.makeServiceRequest("GetAttachmentDownloadToken",{},e)}},1543:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(51),a=r(1736);t.default=function(e,t){return void 0===e||e.__type||(e=a.default(e)),n.makeServiceRequest("AddEntityFeedback",e,t)}},1544:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(0);t.default=function(e){return n.__assign({__type:"AddEntityFeedbackRequest:#Exchange"},e)}},1546:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(1740);t.HtmlSanitizer=n.default;var a=r(1558);t.htmlToDom=a.default,t.splitWithFragment=a.splitWithFragment;var o=r(1557);t.getInheritableStyles=o.default},1556:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=Object.assign?function(e,t){return Object.assign(t||{},e)}:function(e,t){var r=t||{};if(e)for(var n=0,a=Object.keys(e);n<a.length;n++){var o=a[n];r[o]=e[o]}return r};t.default=n},1557:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n="border-spacing,caption-side,color,cursor,direction,empty-cells,font-family,font-size,font-style,font-variant,font-weight,font,letter-spacing,line-height,list-style-image,list-style-position,list-style-type,list-style,orphans,quotes,text-align,text-indent,text-transform,visibility,white-space,widows,word-spacing".split(",");t.default=function(e){var t=e&&e.ownerDocument&&e.ownerDocument.defaultView,r=t&&t.getComputedStyle(e),a={};return n.forEach(function(e){return a[e]=r&&r.getPropertyValue(e)||""}),a}},1558:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n="\x3c!--StartFragment--\x3e",a="\x3c!--EndFragment--\x3e";function o(e){var t=e.indexOf(n),r=e.lastIndexOf(a);if(t>=0&&r>=0&&r>=t+n.length){var o=e.substr(0,t),u=e.substr(r+a.length);return[e=e.substring(t+n.length,r),o,u]}return[e,null,null]}t.default=function(e,t,r){var n=(new DOMParser).parseFromString(e||"","text/html");return n&&n.body&&n.body.firstChild?(t&&(r||function(e,t){var r=o(t)[0];e.body.innerHTML=r})(n,e),n):null},t.splitWithFragment=o},1582:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(51),a=r(1742);t.default=function(e,t){return void 0===e||e.__type||(e=a.default(e)),n.makeServiceRequest("CreateItem",e,t)}},1590:function(e,t,r){"use strict";t.a=function(e,t){for(var r=-1,n=t.length,a=e.length;++r<n;)e[a+r]=t[r];return e}},1593:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(0);t.default=function(e){return n.__assign({__type:"CreateItemRequest:#Exchange"},e)}},1611:function(e,t,r){"use strict";var n=function(e,t){return null!=e&&t in Object(e)},a=r(1247),o=r(417),u=r(200),i=r(504),c=r(506),s=r(701);var l=function(e,t,r){for(var n=-1,l=(t=Object(a.a)(t,e)).length,f=!1;++n<l;){var d=Object(s.a)(t[n]);if(!(f=null!=e&&r(e,d)))break;e=e[d]}return f||++n!=l?f:!!(l=null==e?0:e.length)&&Object(c.a)(l)&&Object(i.a)(d,l)&&(Object(u.a)(e)||Object(o.a)(e))};t.a=function(e,t){return null!=e&&l(e,t,n)}},1615:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(51),a=r(1751);t.default=function(e,t){return void 0===e||e.__type||(e=a.default(e)),n.makeServiceRequest("GetMailTips",e,t)}},1616:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(0);t.default=function(e){return n.__assign({__type:"GetMailTipsRequest:#Exchange"},e)}},1650:function(e,t,r){"use strict";var n=r(759),a=r(765),o=r(837),u=Object(a.a)(function(e,t,r,a){Object(n.a)(t,Object(o.a)(t),e,a)});t.a=u},1651:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(51),a=r(1754);t.default=function(e,t){return void 0===e||e.__type||(e=a.default(e)),n.makeServiceRequest("GetDlpPolicyTips",e,t)}},1652:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(0);t.default=function(e){return n.__assign({__type:"CreateResponseFromModernGroupRequest:#Exchange"},e)}},1653:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(51),a=r(1755);t.default=function(e,t){return void 0===e||e.__type||(e=a.default(e)),n.makeServiceRequest("CreateResponseFromModernGroup",e,t)}},1654:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(51),a=r(1756);t.default=function(e,t){return void 0===e||e.__type||(e=a.default(e)),n.makeServiceRequest("PostGroupItem",e,t)}},1655:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(0);t.default=function(e){return n.__assign({__type:"PostGroupItemRequest:#Exchange"},e)}},1656:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(51),a=r(1757);t.default=function(e,t){return void 0===e||e.__type||(e=a.default(e)),n.makeServiceRequest("PostUnifiedGroupItem",e,t)}},1657:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(0);t.default=function(e){return n.__assign({__type:"PostUnifiedGroupItemRequest:#Exchange"},e)}},1658:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(0);t.default=function(e){return n.__assign({__type:"ApproveRequestItem:#Exchange"},e)}},1659:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(0);t.default=function(e){return n.__assign({__type:"PostItem:#Exchange"},e)}},1660:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(0);t.default=function(e){return n.__assign({__type:"RejectRequestItem:#Exchange"},e)}},1671:function(e,t,r){"use strict";var n=r(1286);var a=function(e,t){return e>t},o=r(851);t.a=function(e,t){return e&&e.length?Object(n.a)(e,Object(o.a)(t,2),a):void 0}},1672:function(e,t,r){"use strict";var n=r(1286),a=r(851);var o=function(e,t){return e<t};t.a=function(e,t){return e&&e.length?Object(n.a)(e,Object(a.a)(t,2),o):void 0}},1736:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(0);t.default=function(e){return n.__assign({__type:"AddEntityFeedbackJsonRequest:#Exchange"},e)}},1740:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(1556),a=r(1557),o=r(1558),u=r(1741),i=function(){function e(e){e=e||{},this.elementCallbacks=n.default(e.elementCallbacks),this.styleCallbacks=u.getStyleCallbacks(e.styleCallbacks),this.attributeCallbacks=n.default(e.attributeCallbacks),this.allowedTags=u.getAllowedTags(e.additionalAllowedTags),this.allowedAttributes=u.getAllowedAttributes(e.additionalAllowAttributes),this.defaultStyleValues=u.getDefaultStyleValues(e.additionalDefaultStyleValues),this.additionalGlobalStyleNodes=e.additionalGlobalStyleNodes||[],this.allowPreserveWhiteSpace=e.allowPreserveWhiteSpace}return e.convertInlineCss=function(t,r){return new e({additionalGlobalStyleNodes:r}).exec(t,!0)},e.sanitizeHtml=function(t,r){var n=new e(r=r||{}),o=r.currentElementOrStyle instanceof HTMLElement?a.default(r.currentElementOrStyle):r.currentElementOrStyle;return n.exec(t,r.convertCssOnly,r.preserveFragmentOnly,o)},e.prototype.exec=function(e,t,r,n){var a=o.default(e,r);return a&&(this.convertGlobalCssToInlineCss(a),t||this.sanitize(a.body,n)),a&&a.body&&a.body.innerHTML||""},e.prototype.sanitize=function(e,t){if(!e)return"";t=n.default(t,a.default(null)),this.processNode(e,t,{})},e.prototype.convertGlobalCssToInlineCss=function(e){for(var t=c(e.querySelectorAll("style")),r=0,n=this.additionalGlobalStyleNodes.reverse().map(function(e){return e.sheet}).concat(t.map(function(e){return e.sheet}).reverse()).filter(function(e){return e});r<n.length;r++)for(var a=n[r],o=function(t){var r=a.cssRules[t],n=r&&r.style?r.style.cssText:null;if(r.type!=CSSRule.STYLE_RULE||!n||!r.selectorText)return"continue";for(var o=0,u=r.selectorText.split(",");o<u.length;o++){var i=u[o];if(i&&i.trim()&&!(i.indexOf(":")>=0))c(e.querySelectorAll(i)).forEach(function(e){return e.setAttribute("style",n+(e.getAttribute("style")||""))})}},u=a.cssRules.length-1;u>=0;u--)o(u);t.forEach(function(e){e.parentNode&&e.parentNode.removeChild(e)})},e.prototype.processNode=function(e,t,r){var a=e.nodeType,o=a==Node.ELEMENT_NODE,u=a==Node.TEXT_NODE,i=e,c=o?i.tagName.toUpperCase():"";if(o&&!this.allowElement(i,c,r)||u&&/^[\r\n]*$/g.test(e.nodeValue)&&!t.insidePRE||!o&&!u)e.parentNode.removeChild(e);else if(u&&!this.allowPreserveWhiteSpace&&"pre"==t["white-space"])e.nodeValue=e.nodeValue.replace(/^ /gm," ").replace(/ {2}/g,"  ");else if(o){var s=n.default(t);this.processAttributes(i,r),this.processCss(i,c,s,r),"PRE"==c&&(s.insidePRE="true");for(var l=i.firstChild,f=void 0;l;l=f)f=l.nextSibling,this.processNode(l,s,r)}},e.prototype.processCss=function(e,t,r,n){var a=this,o=e.getAttributeNode("style");if(o){var u=o.value.split(";"),i=u.filter(function(t){var o;if(!t||""==t.trim()||2!=(o=t.split(":")).length)return!1;var u=o[0].trim().toLowerCase(),i=o[1].trim().toLowerCase(),c=a.styleCallbacks[u],s=null!=r[u],l=(!c||c(i,e,n))&&"inherit"!=i&&i.indexOf("expression")<0&&"-"!=u.substr(0,1)&&a.defaultStyleValues[u]!=i&&(s&&i!=r[u]||!s&&"initial"!=i&&"normal"!=i);return l&&s&&(r[u]=i),l&&(a.allowPreserveWhiteSpace||"white-space"!=u)});u.length!=i.length&&(i.length>0?e.setAttribute("style",i.map(function(e){return e.trim()}).join("; ")):e.removeAttribute("style"))}},e.prototype.processAttributes=function(e,t){for(var r=e.attributes.length-1;r>=0;r--){var n=e.attributes[r],a=n.name.toLowerCase().trim(),o=n.value,u=this.attributeCallbacks[a];u?o=u(o,e,t):this.allowedAttributes.indexOf(a)<0&&(o=null),null==o||o.toLowerCase().indexOf("script:")>=0?e.removeAttribute(a):n.value=o}},e.prototype.allowElement=function(e,t,r){var n=this.elementCallbacks[t];return n?n(e,r):this.allowedTags.indexOf(t)>=0||t.indexOf(":")>0},e}();function c(e){return[].slice.call(e)}t.default=i},1741:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(1556),a="BODY,H1,H2,H3,H4,H5,H6,FORM,P,BR,NOBR,HR,ACRONYM,ABBR,ADDRESS,B,BDI,BDO,BIG,BLOCKQUOTE,CENTER,CITE,CODE,DEL,DFN,EM,FONT,I,INS,KBD,MARK,METER,PRE,PROGRESS,Q,RP,RT,RUBY,S,SAMP,SMALL,STRIKE,STRONG,SUB,SUP,TEMPLATE,TIME,TT,U,VAR,WBR,XMP,INPUT,TEXTAREA,BUTTON,SELECT,OPTGROUP,OPTION,LABEL,FIELDSET,LEGEND,DATALIST,OUTPUT,IMG,MAP,AREA,CANVAS,FIGCAPTION,FIGURE,PICTURE,A,NAV,UL,OL,LI,DIR,UL,DL,DT,DD,MENU,MENUITEM,TABLE,CAPTION,TH,TR,TD,THEAD,TBODY,TFOOT,COL,COLGROUP,DIV,SPAN,HEADER,FOOTER,MAIN,SECTION,ARTICLE,ASIDE,DETAILS,DIALOG,SUMMARY,DATA".split(","),o="accept,align,alt,checked,cite,color,cols,colspan,contextmenu,coords,datetime,default,dir,dirname,disabled,download,face,headers,height,hidden,high,href,hreflang,ismap,kind,label,lang,list,low,max,maxlength,media,min,multiple,open,optimum,pattern,placeholder,readonly,rel,required,reversed,rows,rowspan,scope,selected,shape,size,sizes,span,spellcheck,src,srclang,srcset,start,step,style,tabindex,target,title,translate,type,usemap,value,width,wrap".split(","),u={"background-color":"transparent","border-bottom-color":"rgb(0, 0, 0)","border-bottom-style":"none","border-bottom-width":"0px","border-image-outset":"0","border-image-repeat":"stretch","border-image-slice":"100%","border-image-source":"none","border-image-width":"1","border-left-color":"rgb(0, 0, 0)","border-left-style":"none","border-left-width":"0px","border-right-color":"rgb(0, 0, 0)","border-right-style":"none","border-right-width":"0px","border-top-color":"rgb(0, 0, 0)","border-top-style":"none","border-top-width":"0px","outline-color":"transparent","outline-style":"none","outline-width":"0px",overflow:"visible","text-decoration":"none","-webkit-text-stroke-width":"0px","word-wrap":"break-word","margin-left":"0px","margin-right":"0px",padding:"0px","padding-top":"0px","padding-left":"0px","padding-right":"0px","padding-bottom":"0px",border:"0px","border-top":"0px","border-left":"0px","border-right":"0px","border-bottom":"0px","vertical-align":"baseline",float:"none"};function i(){return null}function c(e,t){var r=t.tagName;return!("LI"==r||"DIV"==r)}function s(e){return e.filter(function(e,t,r){return r.indexOf(e)==t})}t.getAllowedTags=function(e){return s(a.concat(e||[])).map(function(e){return e.toUpperCase()})},t.getAllowedAttributes=function(e){return s(o.concat(e||[])).map(function(e){return e.toLocaleLowerCase()})},t.getDefaultStyleValues=function(e){var t=n.default(u);return e&&Object.keys(e).forEach(function(r){var n=e[r];null!=n?t[r]=n:delete t[r]}),t},t.getStyleCallbacks=function(e){var t=n.default(e);return t.position=t.position||i,t.width=t.width||c,t}},1742:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(0);t.default=function(e){return n.__assign({__type:"CreateItemJsonRequest:#Exchange"},e)}},1751:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(0);t.default=function(e){return n.__assign({__type:"GetMailTipsJsonRequest:#Exchange"},e)}},1754:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(0);t.default=function(e){return n.__assign({__type:"GetDlpPolicyTipsRequest:#Exchange"},e)}},1755:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(0);t.default=function(e){return n.__assign({__type:"CreateResponseFromModernGroupJsonRequest:#Exchange"},e)}},1756:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(0);t.default=function(e){return n.__assign({__type:"PostGroupItemJsonRequest:#Exchange"},e)}},1757:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(0);t.default=function(e){return n.__assign({__type:"PostUnifiedGroupItemJsonRequest:#Exchange"},e)}},534:function(e,t,r){"use strict";var n=r(242),a=r(201),o="[object Symbol]";t.a=function(e){return"symbol"==typeof e||Object(a.a)(e)&&Object(n.a)(e)==o}},701:function(e,t,r){"use strict";var n=r(534),a=1/0;t.a=function(e){if("string"==typeof e||Object(n.a)(e))return e;var t=e+"";return"0"==t&&1/e==-a?"-0":t}},711:function(e,t,r){"use strict";var n=r(249),a=r(148),o=Object(n.a)(a.a,"Set");t.a=o},834:function(e,t,r){"use strict";var n=r(287);var a=function(e,t){for(var r=-1,n=null==e?0:e.length,a=Array(n);++r<n;)a[r]=t(e[r],r,e);return a},o=r(200),u=r(534),i=1/0,c=n.a?n.a.prototype:void 0,s=c?c.toString:void 0;t.a=function e(t){if("string"==typeof t)return t;if(Object(o.a)(t))return a(t,e)+"";if(Object(u.a)(t))return s?s.call(t):"";var r=t+"";return"0"==r&&1/t==-i?"-0":r}},835:function(e,t,r){"use strict";var n=r(834);t.a=function(e){return null==e?"":Object(n.a)(e)}},837:function(e,t,r){"use strict";var n=r(758),a=r(492),o=r(753),u=Object(o.a)(Object.keys,Object),i=Object.prototype.hasOwnProperty;var c=function(e){if(!Object(a.a)(e))return u(e);var t=[];for(var r in Object(e))i.call(e,r)&&"constructor"!=r&&t.push(r);return t},s=r(364);t.a=function(e){return Object(s.a)(e)?Object(n.a)(e):c(e)}},838:function(e,t,r){"use strict";t.a=function(e){var t=-1,r=Array(e.size);return e.forEach(function(e){r[++t]=e}),r}},844:function(e,t,r){"use strict";var n=r(200),a=r(534),o=/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,u=/^\w*$/;t.a=function(e,t){if(Object(n.a)(e))return!1;var r=typeof e;return!("number"!=r&&"symbol"!=r&&"boolean"!=r&&null!=e&&!Object(a.a)(e))||u.test(e)||!o.test(e)||null!=t&&e in Object(t)}},851:function(e,t,r){"use strict";var n=r(497),a=r(1257),o=1,u=2;var i=function(e,t,r,i){var c=r.length,s=c,l=!i;if(null==e)return!s;for(e=Object(e);c--;){var f=r[c];if(l&&f[2]?f[1]!==e[f[0]]:!(f[0]in e))return!1}for(;++c<s;){var d=(f=r[c])[0],v=e[d],p=f[1];if(l&&f[2]){if(void 0===v&&!(d in e))return!1}else{var b=new n.a;if(i)var _=i(v,p,d,e,t,b);if(!(void 0===_?Object(a.a)(p,v,o|u,i,b):_))return!1}}return!0},c=r(145);var s=function(e){return e==e&&!Object(c.a)(e)},l=r(837);var f=function(e){for(var t=Object(l.a)(e),r=t.length;r--;){var n=t[r],a=e[n];t[r]=[n,a,s(a)]}return t};var d=function(e,t){return function(r){return null!=r&&r[e]===t&&(void 0!==t||e in Object(r))}};var v=function(e){var t=f(e);return 1==t.length&&t[0][2]?d(t[0][0],t[0][1]):function(r){return r===e||i(r,e,t)}},p=r(1256);var b=function(e,t,r){var n=null==e?void 0:Object(p.a)(e,t);return void 0===n?r:n},_=r(1611),y=r(844),O=r(701),h=1,g=2;var j=function(e,t){return Object(y.a)(e)&&s(t)?d(Object(O.a)(e),t):function(r){var n=b(r,e);return void 0===n&&n===t?Object(_.a)(r,e):Object(a.a)(t,n,h|g)}},m=r(512),E=r(200);var w=function(e){return function(t){return null==t?void 0:t[e]}};var P=function(e){return function(t){return Object(p.a)(t,e)}};var T=function(e){return Object(y.a)(e)?w(Object(O.a)(e)):P(e)};t.a=function(e){return"function"==typeof e?e:null==e?m.a:"object"==typeof e?Object(E.a)(e)?j(e[0],e[1]):v(e):T(e)}},878:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(0);t.default=function(e){return n.__assign({__type:"BodyContentType:#Exchange"},e)}},910:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(0);t.default=function(e){return n.__assign({__type:"SingleRecipientType:#Exchange"},e)}}}]);
//# sourceMappingURL=owa.vendors~Addins~SubjectPicker.mail.js.map
window.scriptsLoaded['owa.vendors~Addins~SubjectPicker.mail.js'] = 1; window.scriptProcessEnd = window.scriptProcessEnd || {}; window.scriptProcessEnd['owa.vendors~Addins~SubjectPicker.mail.js'] = (new Date()).getTime();