!function(e,t){if("object"==typeof exports&&"object"==typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var n=t();for(var o in n)("object"==typeof exports?exports:e)[o]=n[o]}}(window,function(){return function(n){var o={};function r(e){if(o[e])return o[e].exports;var t=o[e]={i:e,l:!1,exports:{}};return n[e].call(t.exports,t,t.exports,r),t.l=!0,t.exports}return r.m=n,r.c=o,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(t,e){if(1&e&&(t=r(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)r.d(n,o,function(e){return t[e]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="/js/cmpld/",r(r.s=488)}({488:function(e,t,n){"use strict";n.r(t);n(489),n(490)},489:function(e,t){window.__PH=window.__PH||{cookie:function(e,t,n){var o;return void 0!==t?(n=n||{},null===t&&(t="",n.expires=-1),t+="",document.cookie=e+"="+t+(n.expires&&((o="number"==typeof n.expires&&(o=new Date)).setTime(o.getTime()+24*n.expires*60*60*1e3),o||"toUTCString"in n.expires&&n.expires)&&"; expires="+o.toUTCString()||"")+(n.path?"; path="+n.path:"")+(n.domain?"; domain="+n.domain:"")+(n.secure?"; secure":""),t):""!==(document.cookie||"")?void 0===(t=(document.cookie.match(new RegExp("(?:^| )"+e+"\\=(\\S*)(?:; |$)"))||[])[1])?void 0:t:void 0}},window.__PH.cookie.s={getGlobal:function(){},getLocal:function(){},removeGlobal:function(){},removeLocal:function(){},setGlobal:function(){},setLocal:function(){},setProject:function(){}}},490:function(e,t){!function(n,o,e){o=o||{};var t,r,i,a,u={logo:"6143763",menu:"6143443",menuDropdown:"6144303",subMenu:"6377572",search:"4808054",newHeader:"6492030"},l={logo:{attrs:{name:"clb"+u.logo},image:"/img/logo/sport/sport_web.svg",image_x2:"/img/logo/sport/sport_web.svg",width:119,title:o.projectName,href:o.domain},toolbar:{items:[{type:"group",collapsible:!0,items:(r=o.toolbarButtons,i=o.toolbarItems,a=u.menu,r.concat(c(i,a)))},{type:"spacer",flex:1},{type:"group",name:"toolbarBanners",items:(t=o.menuBanners,t.map(function(e){return{type:"banner",name:"spring_"+e}}))},{name:"searchGroup",type:"group",collapsible:!1,items:[{type:"search",formName:"searchNews",placeholder:"Поиск материалов",name:"portalSearch",inputName:"q",expandable:!0,autocomplete:"off",searchUrl:"/search/",method:"get",suggests:!1,width:305,flexible:!0,flex:1,attrs:{"accept-charset":"utf-8"}}]}]}};function c(e,t){return e.map(function(e){return"other"==e.name?function(e,t){return{name:e.name,text:e.title,attrs:{name:"clb"+t},alwaysVisible:1,dropdown:e.columns&&{type:"cols",items:[{maxWidth:"800",html:n.getElementById("portal-menu__"+e.name).value}]}}}(e,t):function(e,t){return{name:e.name,text:e.title,href:e.url,attrs:t?{name:"clb"+t}:null,current:e.current,alwaysVisible:0,dropdown:e.dropdown&&{items:c(e.dropdown,u.menuDropdown)}}}(e,t)})}function s(e,t){e&&(t=t||"d",(new Image).src="//rs.mail.ru/"+t+e+".gif?r="+Math.random())}o.submenuItems.length&&(l.submenu={items:[{type:"group",collapsible:!0,items:c(o.submenuItems,u.submenu)}]}),e.draw(l,function(e){var t=(((((e||{}).toolbar||{}).itemsByName||{}).searchGroup||{}).itemsByName||{}).portalSearch;t&&(s(u.search),t.on("submit",function(){var e=((this.input||{}).el||{}).value,t=o.searchMaxLength;e&&(e.length>t&&(this.input.el.value=e.slice(0,t)),s(u.search,"sb"))}))}),s(u.logo),s(u.newHeader)}(window.document,window.portalMenu,window.__PM,window.ru.mail.cpf)}})});
//# sourceMappingURL=portal-menu.js.map