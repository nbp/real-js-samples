pcodeJsonp7747([16],{801:function(t,e,o){"use strict";t.exports=o(915).BlockMailruVertical},841:function(t,e,o){"use strict";var i,r=(i=function(t,e){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var o in e)e.hasOwnProperty(o)&&(t[o]=e[o])})(t,e)},function(t,e){function o(){this.constructor=t}i(t,e),t.prototype=null===e?Object.create(e):(o.prototype=e.prototype,new o)});e.__esModule=!0;var n=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return r(e,t),e.prototype.render=function(){var t=this.props,e=t.adv,i=t.className,r=t.language;return e.vcardUrl?o(0).create(o(22),{href:e.vcardUrl,target:"_blank",class:i},o(0).create(o(29).Text,{text:o(9).i18n("ADDRESS_AND_PHONE",r)})):null},e}(o(7));e.Address=n},915:function(t,e,o){"use strict";var i,r=(i=function(t,e){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var o in e)e.hasOwnProperty(o)&&(t[o]=e[o])})(t,e)},function(t,e){function o(){this.constructor=t}i(t,e),t.prototype=null===e?Object.create(e):(o.prototype=e.prototype,new o)});e.__esModule=!0;var n=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return r(e,t),e.prototype.onInit=function(){this.name="yap-mailru-vertical",t.prototype.onInit.call(this)},e.prototype.pushCss=function(){t.prototype.pushCss.call(this),this.pushStyles(o(916),this.getCssVariables())},e.prototype.onMount=function(){var t=this.getResourceById("adv-list-container"),e=t&&t.getElement();if(e){var i=e.clientHeight>400,r=this.findEmbeddedResources("adv-component");o(17).forEach(r,function(t){i&&t.makeLongAd(),t.imageEl&&t.imageEl.fitImage()})}},e.prototype.getCssVariables=function(){var t=this.props.settings,e=o(6).createColor(t.titleColor||"#0077CC"),i=o(6).createColor(t.hoverColor||"#1481D0"),r=o(6).createColor(t.titleHoverColor||"#1481D0"),n=o(6).createColor(t.bgColor||t.siteBgColor||"#fff").setAlpha(t.siteBgColor?0:1),a=Math.floor(11*t.fontSizeAbs)||11,p=o(6).createColor(t.urlColor||"#0077CC"),l=t.textColor||n.readable(),s=t.textColor||n.readable();return{titleColor:e,titleFontSize:Math.floor(14*t.titleFontSizeAbs)||14,contactsFontColor:s,hoverUrlColor:i,hoverTitleColor:r,fontSize:a,bgColor:n,domainColor:p,textColor:l}},e.prototype.renderLogo=function(){return null},e.prototype.getBody=function(t,e,i){var r=this.advList;return o(0).create("yatag",{class:t("__adv-list"),resourceId:"adv-list-container"},o(13).map(r,function(t){return o(0).create(o(917).AdvMailruVertical,{adv:t,resourceId:"adv-component"})}),o(0).create(i.Logo,{class:this.b_("__logo"),title:this.dataSource.getTitle()}))},e}(o(114));e.BlockMailruVertical=n},916:function(t,e){t.exports=function(t){var e=[];return e.push(".",t.id," .l40a3df6a{background:",t.bgColor," !important}.",t.id," .we1fd6828:not(:first-child){margin-top:15px !important}.",t.id," .we1fd6828{position:relative !important;width:100% !important;display:block !important;overflow:hidden !important;box-sizing:border-box !important;min-width:210px !important}.",t.id," .we1fd6828.e728ba3d .w33be7158{max-height:41px !important;-webkit-line-clamp:4 !important}.",t.id," .we1fd6828.e728ba3d:not(:first-child){margin-top:10px !important}.",t.id," .wc87dae99{padding-right:13px !important;height:100% !important}.",t.id," .c6b617722{overflow:auto !important}.",t.id," .s8f6a8781{padding-right:15px !important;padding-left:6px !important;display:-webkit-flex !important;display:-ms-flexbox !important;display:flex !important}.",t.id," .w72d66364{overflow:hidden !important;-webkit-flex:0 0 87px !important;-ms-flex:0 0 87px !important;flex:0 0 87px !important;width:87px !important;margin-left:auto !important}.",t.id," .e1dfb751b{width:87px !important;height:54px !important}.",t.id," .m2a47468b{position:absolute !important;width:21px !important;background-color:rgba(0,0,0,.2) !important;color:#fff !important;z-index:2 !important;text-align:center !important}.",t.id," .d6c95885f{display:-webkit-flex !important;display:-ms-flexbox !important;display:flex !important;-webkit-flex-direction:column !important;-ms-flex-direction:column !important;flex-direction:column !important;-webkit-justify-content:space-between !important;-ms-flex-pack:justify !important;justify-content:space-between !important;overflow:hidden !important;color:",t.textColor," !important}.",t.id," .me16e90ee{width:87px !important;height:54px !important;-webkit-flex:0 0 76px !important;-ms-flex:0 0 76px !important;flex:0 0 76px !important}.",t.id," .q1ca8e592{font-family:Roboto-Regular,Helvetica,Arial,sans-serif !important;font-size:",t.fontSize,"px !important;color:#000 !important;line-height:14px !important;padding-top:5px !important;overflow:auto !important}.",t.id," .q1ca8e592,.",t.id," .ob3c6b05b{display:-webkit-flex !important;display:-ms-flexbox !important;display:flex !important;letter-spacing:0 !important}.",t.id," .ob3c6b05b{box-sizing:padding-box !important;padding-top:8px !important;-webkit-justify-content:flex-start !important;-ms-flex-pack:start !important;justify-content:flex-start !important;font-family:Roboto-Light,Helvetica,Arial,sans-serif !important;font-size:",t.fontSizeAbs,"px !important;color:",t.contactsFontColor," !important;-webkit-flex-direction:row !important;-ms-flex-direction:row !important;flex-direction:row !important}.",t.id," .w33be7158{overflow:hidden !important;-webkit-box-orient:vertical !important;display:-webkit-box !important;-webkit-line-clamp:4 !important;max-height:54px !important}.",t.id," .l89012b32{float:left !important;white-space:nowrap !important}.",t.id," .pfe0db322{font-size:8px !important;color:#000 !important;z-index:2 !important;width:87px !important}.",t.id," .we1fd6828 .x522fa03b:hover{background:",t.hoverUrlColor," !important}.",t.id," .we1fd6828 .x522fa03b{white-space:nowrap !important;overflow:hidden !important;text-overflow:ellipsis !important;box-sizing:border-box !important;height:18px !important;color:#fff !important;width:87px !important;padding:0 8px !important;background:",t.domainColor," !important;text-align:center !important;line-height:0 !important}.",t.id," .we1fd6828 .hb763879b{line-height:16px !important;font-family:Roboto-Regular,Helvetica,Arial,sans-serif !important;color:#fff !important;letter-spacing:0 !important;font-size:10px !important}.",t.id," .we1fd6828 .ac663dfcd{padding-right:10px !important;line-height:14px !important}.",t.id," .we1fd6828 .tec18aa6d{font-family:Roboto-Regular,Helvetica,Arial,sans-serif !important;color:#000 !important;letter-spacing:0 !important}.",t.id," .we1fd6828 .ffd0ef6e3{line-height:14px !important;white-space:nowrap !important;overflow:hidden !important;text-overflow:ellipsis !important;-webkit-flex:1 !important;-ms-flex:1 !important;flex:1 !important}.",t.id," .we1fd6828 .o73e59cdb{margin-top:-2px !important}.",t.id," .we1fd6828 .m918c867b{font-family:Roboto-Medium,Helvetica,Arial,sans-serif !important;font-size:",t.titleFontSize,"px !important;letter-spacing:0 !important}.",t.id," .we1fd6828 .m918c867b:hover{color:",t.hoverTitleColor," !important}.",t.id," .we1fd6828 .r9820f891{overflow:auto !important;width:87px !important}.",t.id," .we1fd6828 .q9e25e665{border:none !important;height:100% !important}.",t.id," .pe59ed474{visibility:hidden !important}.",t.id," .we1fd6828:hover .pe59ed474{visibility:visible !important}.",t.id," .b45f402b0{display:-webkit-flex !important;display:-ms-flexbox !important;display:flex !important;-webkit-justify-content:flex-end !important;-ms-flex-pack:end !important;justify-content:flex-end !important;padding-right:15px !important}"),e.join("")}},917:function(t,e,o){"use strict";var i,r=(i=function(t,e){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var o in e)e.hasOwnProperty(o)&&(t[o]=e[o])})(t,e)},function(t,e){function o(){this.constructor=t}i(t,e),t.prototype=null===e?Object.create(e):(o.prototype=e.prototype,new o)});e.__esModule=!0;var n=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return r(e,t),e.prototype.getImageSize=function(){return{width:76,height:57}},e.prototype.onMount=function(){this.textEl=this.getResourceById("text"),this.imageEl=this.getResourceById("image"),this.rootEl=this.getResourceById("root");var t=this.getResourceById("gradient");if(t){var e=Math.floor(360*Math.random());t.setStyle({background:"linear-gradient("+e+"deg, rgba(254,255,255,1) 0%,rgba(221,241,249,1) 55%,rgba(160,216,239,1) 100%)"})}},e.prototype.makeLongAd=function(){this.rootEl.addClass(this.b_("_long"))},e.prototype.renderWarning=function(t){if(o(146).hasImportantFlag(t.bannerFlags))return null;var e={"min-height":0};return this.warning?o(0).create("yatag",{resourceId:"warning",class:this.b_("__warning","__warning_normal"),style:e,onClick:this.warning.important?void 0:function(t){return t.preventDefault()}},o(0).create(o(196).Scroll,null,o(0).create("yatag",{class:this.b_("__warning-text")},o(0).create(o(29).Text,{text:this.warning.text})))):null},e.prototype.renderImportantWarning=function(t){return o(146).hasImportantFlag(t.bannerFlags)?o(0).create(o(189),{adv:t,classNames:{"::text":this.b_("__warning")}}):null},e.prototype.renderPicture=function(t){return this.getPicture()?o(0).create(o(190).Image,{resourceId:"image",images:t.images,size:"cover",width:"100%",height:"100%",className:this.b_("__picture"),useBackgroundMethod:!0,disableFitOnMount:!0}):o(0).create("yatag",{class:this.b_("__picture_no-picture"),resourceId:"gradient"})},e.prototype._render=function(t,e,i){var r=e.adv,n=r.settings,a=n.width,p=n.bgColor,l=this.getDataSource().getLanguage();if(r.warning){var s=o(146).hasImportantFlag(r.bannerFlags);this.warning={text:r.warning,important:s}}return o(0).create("yatag",{class:t(),resourceId:"root","data-id":r.adId,style:a},o(0).create(o(22),{class:t("__link yap-link"),href:r.url,tag:"a"},o(0).create("yatag",{class:t("__content"),resourceId:"content",style:"background:"+(p||"transparent")},o(0).create("yatag",{class:t("__left-container")},o(0).create(o(147),{adv:r,className:t("__age")}),o(0).create("yatag",{class:t("__picture-container")},this.renderPicture(r)),o(0).create(o(191),{class:t("__domain"),adv:r,nofavicon:!0}),this.renderWarning(r),this.renderImportantWarning(r)),o(0).create("yatag",{class:t("__right-container")},o(0).create(o(311),{class:t("__title"),adv:r}),o(0).create("yatag",{class:t("__body-container")},o(0).create("yatag",{class:t("__text-container")},o(0).create(o(409),{class:t("__body"),adv:r,resourceId:"text"}),o(0).create("yatag",{class:t("__contacts")},o(0).create(o(841).Address,{className:t("yap-address"),adv:r,language:l}),o(0).create(i.Region,{class:t("__contacts-item"),mod:"_inline",adv:r,language:l}))))),this.renderFeedback({}),this.renderAdtune({}))))},e}(o(47));e.AdvMailruVertical=n}});