(window.webpackJsonp=window.webpackJsonp||[]).push([[31],{"124a":function(e,t,n){var r=n("1029"),o=n("d869"),i=n("4cfc"),s=n("a4c0"),a=function(e,t){a.superclass.constructor.call(this,e,t)};e.exports=Ext.extend(a,r.Component,{name:"MyContentSelectComponent",view:void 0,controller:void 0,init:function(e,t){a.superclass.init.call(this,e,t),r.addEvents(o.MyContentSelectComponent.GLOBALEVENT_REFRESH_LISTPAGE,o.MyContentSelectComponent.EVENT_SUCCESS_REFRESH_LISTPAGE),this._setMyContentSelectController()},_setMyContentSelectView:function(){return this.view instanceof i||(this.view=new i({element:this.element})),this.view},_setMyContentSelectController:function(){this.controller instanceof s||(this.controller=new s({init:function(){},items:{view:{component:this._setMyContentSelectView(),listeners:{"dropdown-menu-item-click":"onDropDownMenuItemClick","dropdown-menu-visibility-change":"onDropDownMenuVisibilityChange","dropdown-menu-background-show":"onDropdownMenuBackgroundShow","dropdown-menu-background-hide":"onDropdownMenuBackgroundHide"}}}}))}})},"1a7b":function(e,t,n){"use strict";n.r(t);var r=n("1029"),a=n.n(r),o=n("d869"),i=n.n(o),s=n("45c2");function c(e){return(c="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function l(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function u(e,t){return!t||"object"!==c(t)&&"function"!=typeof t?function(e){if(void 0!==e)return e;throw new ReferenceError("this hasn't been initialised - super() hasn't been called")}(e):t}function d(e,t,n){return(d="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var r=function(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=h(e)););return e}(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(n):o.value}})(e,t,n||e)}function h(e){return(h=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function f(e,t){return(f=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var p=function(e){function t(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),u(this,h(t).apply(this,arguments))}var n,r,o;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&f(e,t)}(t,a.a.View),n=t,(r=[{key:"init",value:function(){d(h(t.prototype),"init",this).call(this),this._historyBlockEl=Ext.select(this.selector).item(0)}},{key:"loadAndRenderAvatars",value:function(e,t){var n=this;this._setPerformerAvatarURLs(e,t).then(function(e){n.renderUrls(e)})}},{key:"renderAll",value:function(e,t){var n=this,r=e.map(function(e){return n._getHistoryItemTemplate(t[e])}).join("");this._historyBlockEl.html(r),this.loadAndRenderAvatars(e,t)}},{key:"renderUrls",value:function(e){var r=this;e.map(function(e){var t=e.id,n=e.url;r._historyBlockEl.select('[data-performer-id="'.concat(t,'"] i')).setStyle("background-image","url(".concat(n,")"))})}},{key:"renderNewItem",value:function(e,t){var n=t[e],r=this._getHistoryItemTemplate(n);this._historyBlockEl.insertFirst(this._historyBlockEl.createChild(r)),this.loadAndRenderAvatars([e],t)}},{key:"removeItem",value:function(e){this._historyBlockEl.select("[data-performer-id]").item(e).remove()}},{key:"moveItemToTheFirstPosition",value:function(e){var t=this._historyBlockEl.select("[data-performer-id]").item(e);this._historyBlockEl.insertFirst(t)}},{key:"changeItemStatus",value:function(e,t){this._historyBlockEl.select("[data-performer-id=".concat(e,"]")).set({"data-status":t})}},{key:"updateView",value:function(e){return this._historyBlockEl&&this[e]?this[e].bind(this):a.a.noop}},{key:"_getHistoryItemTemplate",value:function(e){var t=e.status,n=e.nick,r=e.url,o=void 0===r?a.a.Config.get("newPerformerImageSmall"):r,i=e.id,s=a.a.getUrl("Chat/Performer",{performerId:n});return'<div data-status="'.concat(t,'" data-performer-id="').concat(i,'">\n\t\t\t\t<a href="').concat(s,'" title="').concat(n,'">\n\t\t\t\t\t<span class="pic">\n\t\t\t\t\t\t<i style="background-image: url(').concat(o,')"></i>\n\t\t\t\t\t</span>\n\t\t\t\t\t<span class="name">').concat(n,'</span>\n\t\t\t\t\t<span class="status">•</span>\n\t\t\t\t</a>\n\t\t\t</div>')}},{key:"_setPerformerAvatarURLs",value:function(e,o){var t=e.map(function(e){var t=o[e],n=t.nick,r=t.id;return new Promise(function(t){s.default.getPerformerProfilePicture(n,i.a.ImageHelper.SMALL_PROFILE_PICTURE).then(function(e){t({id:r,url:e})}).catch(t)})});return Promise.all(t)}},{key:"name",get:function(){return"PerformerHistoryView"}},{key:"autorender",get:function(){return!1}}])&&l(n.prototype,r),o&&l(n,o),t}(),m=n("a5f8");function g(e){return(g="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function y(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function C(e,t){return!t||"object"!==g(t)&&"function"!=typeof t?function(e){if(void 0!==e)return e;throw new ReferenceError("this hasn't been initialised - super() hasn't been called")}(e):t}function _(e,t,n){return(_="undefined"!=typeof Reflect&&Reflect.get?Reflect.get:function(e,t,n){var r=function(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=E(e)););return e}(e,t);if(r){var o=Object.getOwnPropertyDescriptor(r,t);return o.get?o.get.call(n):o.value}})(e,t,n||e)}function E(e){return(E=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function v(e,t){return(v=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var b=null,w=function(e){function n(){return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,n),C(this,E(n).apply(this,arguments))}var t,r,o;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&v(e,t)}(n,a.a.Component),t=n,o=[{key:"getInstance",value:function(){return b||(b=new n(Ext.getBody(),{})),b}}],(r=[{key:"init",value:function(e,t){this.performerHelper=m.default.instance,_(E(n.prototype),"init",this).call(this,e,t),this._createView()}},{key:"_createView",value:function(){this._historyView=new p({selector:this.historyBlockSel}),this._renderDataToView()}},{key:"_renderDataToView",value:function(){this._historyView.updateView("renderAll")(this.performerHelper.getPerformerOrder(),this.performerHelper.getPerformersData())}},{key:"getCount",value:function(){return this.performerHelper.getPerformerOrder().length}},{key:"onStatusChange",value:function(e){this.performerHelper.onStatusChange(e)}},{key:"synchronizeDataWithStorage",value:function(){var e=this.performerHelper.getDataFromStorage().performerOrder,t=this.performerHelper.getPerformerOrder();!a.a.isEqual(e,t)&&(this.performerHelper.synchronizeDataWithStorage(),this._renderDataToView())}},{key:"render",value:function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{};switch(e.type){case m.ACTION.CHANGE_ITEM_STATUS:this._historyView.updateView("changeItemStatus")(e.id,e.status);break;case m.ACTION.MOVE_ITEM_TO_FIRST_POSITION:this._historyView.updateView("moveItemToTheFirstPosition")(e.performerPosition);break;case m.ACTION.RENDER_NEW_ITEM:this._historyView.updateView("renderNewItem")(e.id,e.performersData);break;case m.ACTION.REMOVE_ITEM:this._historyView.updateView("removeItem")(e.position)}}},{key:"bind",value:function(){_(E(n.prototype),"bind",this).call(this),this.performerHelper.subscribe(this.render.bind(this)),a.a.on([{element:a.a.Broadcaster,event:i.a.BasicController.GLOBALEVENT_GLOBAL_STATUS_CHANGE,handler:this.onStatusChange},{element:Ext.fly(window),event:"focus",handler:this.synchronizeDataWithStorage}],this)}},{key:"unbind",value:function(){this.performerHelper.subscribe(this.render.bind(this))}},{key:"name",get:function(){return"PerformerHistoryComponent"}},{key:"historyBlockSel",get:function(){return".sidebar_history"}}])&&y(t.prototype,r),o&&y(t,o),n}();t.default=w},4388:function(e,t){var n="can_use_webp";!function(){if(window.localStorage&&"object"==typeof localStorage&&(!localStorage.getItem(n)||"available"!==localStorage.getItem(n)&&"disable"!==localStorage.getItem(n))){var e=document.createElement("img");e.onload=function(){try{localStorage.setItem(n,"available")}catch(e){}},e.onerror=function(){try{localStorage.setItem(n,"disable")}catch(e){}},e.src="data:image/webp;base64,UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAsAAAABBxAREYiI/gcAAABWUDggGAAAADABAJ0BKgEAAQABABwlpAADcAD+/gbQAA=="}}(),e.exports=function(){return!!window.localStorage&&"available"===window.localStorage.getItem(n)}},"4cfc":function(e,t,n){var r=n("1096"),o=function(e){o.superclass.constructor.call(this,e)};e.exports=Ext.extend(o,r,{name:"MyContentSelectView"})},5675:function(e,t,n){var r=n("1029"),o=n("1096"),i=function(e){i.superclass.constructor.call(this,e)};e.exports=Ext.extend(i,o,{name:"RefreshByOrderView",isSetMenuTitleToCurrent:!0,getAction:function(e){return e.item.getAttribute(this.actionAttribute)},setToSelectedFilterItem:function(e){var t=document.getElementById(e),n=this.getMenuItemEl(t);n&&(this.setMenuItemsVisibility(n),this.setMenuTitleToCurrent(n))},bind:function(){i.superclass.bind.call(this),r.on([{element:r.Broadcaster,event:"set-selected-order-item",handler:this.setToSelectedFilterItem}],this)}})},"740c":function(e,t,n){var r=n("9b4c"),o=n("1825"),i=/[&<>"']/g,s=RegExp(i.source);e.exports=function(e){return(e=o(e))&&s.test(e)?e.replace(i,r):e}},"7e76":function(e,t,n){var r=n("1029"),o=n("d869"),i=n("7ab0"),s=n("1e4a").default,a=n("d7c3"),c=n("124a"),l=n("990a"),u=n("1a7b").default,d=n("0592").default,h=function(e,t){h.superclass.constructor.call(this,e,t)};e.exports=Ext.extend(h,s,{name:"ListPageIndex",listPageComponentName:l,hideCls:"selected",orderDropDownId:"order_dropdown",myContentDropDownId:"category_dropdown",languageDropDownId:"language_dropdown",isRandomPlayerEnabled:!0,isPerformerSwapEnabled:!0,_refreshContentByOrderCmp:void 0,_myContentSelectCmp:void 0,_languageSelectCmp:void 0,sidebarCategorySel:".category_item",listpageContainerId:"listpage_container",toggleSidebarButton:".toggle_sidebar_button",init:function(e,t){i.isHokkaido()&&(u.getInstance(),this.hideCls="hide"),this._sidebarCategories=Ext.getBody().select(".sidebar_categories").item(0),this._activeCategoryTab=this._sidebarCategories&&this._sidebarCategories.data("activetab"),this._setOrderComponent(),this._setSelectComponent(),this._setLanguageComponent(),h.superclass.init.call(this,e,t),this.showMoreJson=r.Config.get("listPageRoutes").showMoreJson||"Index/ShowMoreJson"},_setOrderComponent:function(){return this._refreshContentByOrderCmp instanceof a||!Ext.get(this.orderDropDownId)||(this._refreshContentByOrderCmp=new a(this.orderDropDownId,{hideCls:this.hideCls})),this._refreshContentByOrderCmp},_setSelectComponent:function(){return this._myContentSelectCmp instanceof c||!Ext.get(this.myContentDropDownId)||(this._myContentSelectCmp=new c(this.myContentDropDownId,{})),this._myContentSelectCmp},_setLanguageComponent:function(){return this._languageSelectCmp instanceof c||!Ext.get(this.languageDropDownId)||(this._languageSelectCmp=new c(this.languageDropDownId,{})),this._languageSelectCmp},_destroyOrderComponent:function(){this._refreshContentByOrderCmp&&(this._refreshContentByOrderCmp.controller.destroy(),delete this._refreshContentByOrderCmp.controller,this._refreshContentByOrderCmp.destroy(),delete this._refreshContentByOrderCmp)},onToggleSidebarButtonClick:function(e,t){Ext.getBody().toggleClass("sidebar-closed"),Ext.get(t).toggleClass("open"),r.fireEvent(o.IndexIndex.GLOBALEVENT_TOGGLE_SIDEBAR_BUTTON_CLICK,this)},onSidebarCategoryClick:function(e){var t=e.getTarget(".category_item",4,!0);(t.data("tabid")===this._activeCategoryTab||t.hasClass("history"))&&e.preventDefault(),t.hasClass("history")?0===u.getInstance().getCount()?r.fireEvent(o.TooltipView.EVENT_SHOW_TOOLTIP,{element:t.dom,attributes:{title:r.translate("Your history is empty."),size:"tiny",autoHide:4e3,position:"bottom",trigger:"sticky"}}):Ext.getBody().toggleClass("history-open"):Ext.getBody().removeClass("history-open")},onLogIn:function(){this._destroyOrderComponent(),this._setOrderComponent()},onSidebarHistoryItemClick:function(e){e.preventDefault();var t=e.getTarget("a",5,!0);d.navigateToChatPage("chat/"+t.attr("title"),{trigger:!0,preventNavigateBack:!0})},bind:function(){h.superclass.bind.call(this),r.on([{element:r.Broadcaster,event:o.LoginComponent.GLOBALEVENT_LOG_IN,handler:this.onLogIn,scope:this},{element:this.element,event:"click",handler:this.onToggleSidebarButtonClick,options:{delegate:this.toggleSidebarButton}},{element:this.element,event:"click",handler:this.onSidebarCategoryClick,options:{delegate:this.sidebarCategorySel}}],this);var e=Ext.getBody().select(".sidebar_history").item(0);i.isHokkaido()&&e&&r.on([{element:e,event:"click",handler:this.onSidebarHistoryItemClick,options:{delegate:"a"}}],this)}})},"990a":function(e,t,n){var r=n("00a1"),o=n("e91e"),i=n("fec8"),s=n("f244"),a=function(e,t){a.superclass.constructor.call(this,e,t)};e.exports=Ext.extend(a,r,{name:"IndexListPageComponent",controllerClassName:o,viewClassName:i,modelClassName:s,listPageControllerListeners:{IndexBroadcaster:{"header-logo-click":"onHeaderLogoClick","live-cams-link-click":"onHeaderLogoClick"}},_setController:function(){a.superclass._setController.call(this),this.enablePerformerSwap()}})},"9a8b":function(e,t){e.exports=function(t){return function(e){return null==t?void 0:t[e]}}},"9b4c":function(e,t,n){var r=n("9a8b")({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"});e.exports=r},"9e82":function(e,t,n){var r=n("1029"),o=n("d869"),i=n("7ab0"),s=n("b2b8"),a=function(e,t){a.superclass.constructor.call(this,e,t)};e.exports=Ext.extend(a,s,{name:"RefreshByOrderController",init:function(e,t){a.superclass.init.call(this,e,t),this.addEvents(o.RefreshByOrderController.EVENT_GET_CONTENT_READY,o.RefreshByOrderController.GLOBALEVENT_GET_CONTENT_READY)},onDropDownMenuItemClick:function(e){var t=this.view.getAction(e);r.Config.set("listPageOrderType",t),i.isCurrentPage(o.PageId.INDEX_INDEX)||i.isCurrentPage(o.PageId.JASMIN_LIVECAMS_LISTPAGE_LIVECAMS)?r.fireEvent(o.RefreshByOrderComponent.GLOBALEVENT_REFRESH_LISTPAGE_BY_SELECTED_ORDER_AND_FILTERS):r.fireEvent(o.RefreshByOrderComponent.GLOBALEVENT_REFRESH_LISTPAGE_BY_ORDER,{orderType:t})}})},a4c0:function(e,t,n){var r=n("b2b8"),o=function(e,t){o.superclass.constructor.call(this,e,t)};e.exports=Ext.extend(o,r,{name:"MyContentSelectController"})},d7c3:function(e,t,n){var r=n("1029"),o=n("d869"),i=n("5675"),s=n("9e82"),a=function(e,t){a.superclass.constructor.call(this,e,t)};e.exports=Ext.extend(a,r.Component,{name:"RefreshByOrderComponent",hideCls:"hide",view:void 0,controller:void 0,init:function(e,t){a.superclass.init.call(this,e,t),r.addEvents(o.RefreshByOrderComponent.GLOBALEVENT_REFRESH_LISTPAGE_BY_ORDER,o.RefreshByOrderComponent.GLOBALEVENT_REFRESH_LISTPAGE_BY_SELECTED_ORDER_AND_FILTERS,o.RefreshByOrderComponent.EVENT_SUCCESS_REFRESH_LISTPAGE),this._setRefreshByOrderController()},_setRefreshByOrderView:function(){return this.view instanceof i||(this.view=new i({element:this.element,hideCls:this.hideCls})),this.view},_setRefreshByOrderController:function(){this.controller instanceof s||(this.controller=new s({init:function(){},items:{view:{component:this._setRefreshByOrderView(),listeners:{"dropdown-menu-item-click":"onDropDownMenuItemClick","dropdown-menu-visibility-change":"onDropDownMenuVisibilityChange","dropdown-menu-background-show":"onDropdownMenuBackgroundShow","dropdown-menu-background-hide":"onDropdownMenuBackgroundHide"}}}}))}})},e91e:function(e,t,n){var r=n("1029"),o=n("768e"),i=n("7ab0"),s=function(e,t){s.superclass.constructor.call(this,e,t)};e.exports=Ext.extend(s,o,{name:"IndexListPageController",init:function(e,t){s.superclass.init.call(this,e,t)},onHeaderLogoClick:function(e){if(!i.isHokkaido()&&!this.ListPageModel.needPageReload()&&"0"===r.getMeta("isSearchPage")){e.preventDefault();var t={orderType:r.Config.get("listPageOrderType")};this.onRefreshListPage(t)}},onLoggedIn:function(){s.superclass.onLoggedIn.call(this),this.ListPageModel.refreshCommercial()},onSignUpSuccess:function(){s.superclass.onSignUpSuccess.call(this),this.ListPageModel.refreshCommercial()},onFirstBillComplete:function(){s.superclass.onFirstBillComplete.call(this),this.ListPageModel.refreshCommercial()},onQuickBuySuccess:function(){s.superclass.onQuickBuySuccess.call(this);var e=document.getElementById("container_customPromoCampaign"),t=document.getElementById("container_freeUserCustomPromoCampaign");(e||t)&&this.ListPageModel.refreshCommercial()}})},f244:function(e,t,n){var r=n("1029"),o=n("d869"),i=n("b07d"),s=function(e,t){s.superclass.constructor.call(this,e,t)};e.exports=Ext.extend(s,i,{name:"IndexListPageModel",refreshCommercial:function(){this.fetch({url:r.getUrl(this.commercialRefreshRouting,{listPageId:r.getMeta(this.listPageId),isSearchPage:r.getMeta(this.isSearchPage)},{},""),method:"POST",success:r.bind(this._onRefreshCommercialSuccess,this)})},_onRefreshCommercialSuccess:function(e){r.hasPath(e,"json.data")&&this.fireEvent(o.ListPageModelAbstract.EVENT_SWAPPED_COMMERCIAL,e.json.data)}})},fec8:function(e,t,n){var r=n("a7b6"),o=function(e,t){o.superclass.constructor.call(this,e,t)};e.exports=Ext.extend(o,r,{name:"IndexListPageView"})}}]);