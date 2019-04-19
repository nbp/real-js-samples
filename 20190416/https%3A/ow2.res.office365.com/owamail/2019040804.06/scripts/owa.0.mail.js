window.scriptsLoaded = window.scriptsLoaded || {}; window.scriptProcessStart = window.scriptProcessStart || {}; window.scriptProcessStart['owa.0.mail.js'] = (new Date()).getTime();(window.$wj=window.$wj||[]).push([[0],{3040:function(e,t,n){"use strict";var i;n.d(t,"a",function(){return i}),function(e){e[e.smallFluid=0]="smallFluid",e[e.smallFixedFar=1]="smallFixedFar",e[e.smallFixedNear=2]="smallFixedNear",e[e.medium=3]="medium",e[e.large=4]="large",e[e.largeFixed=5]="largeFixed",e[e.extraLarge=6]="extraLarge",e[e.custom=7]="custom",e[e.customNear=8]="customNear"}(i||(i={}))},3714:function(e,t,n){"use strict";var i,s,o,a,r,l,d=n(859),c=n(0),m=n(3),p=n(728),u=n(1682),h=n(1735),g=n(1725),f=n(18),v=n(237),x=n(712),_=n(245),N=n(344),F=n(126),w=n(335),C=n(128),b=n(1731),O=n(3040),P=Object(v.a)(),y=function(e){function t(t){var n=e.call(this,t)||this;return n._panel=m.createRef(),n.dismiss=function(e){n.state.isOpen&&(n.props.onDismiss&&n.props.onDismiss(e),(!e||e&&!e.defaultPrevented)&&n.setState({isOpen:!1,isAnimating:!0},function(){n._async.setTimeout(n._onTransitionComplete,200)}))},n._allowScrollOnPanel=function(e){e?Object(x.b)(e,n._events):n._events.off(n._scrollableContent),n._scrollableContent=e},n._onRenderNavigation=function(e){if(!n.props.onRenderNavigationContent&&!n.props.onRenderNavigation&&!n.props.hasCloseButton)return null;var t=n.props.onRenderNavigationContent,i=void 0===t?n._onRenderNavigationContent:t;return m.createElement("div",{className:n._classNames.navigation},i(e,n._onRenderNavigationContent))},n._onRenderNavigationContent=function(e){var t=e.closeButtonAriaLabel,i=e.hasCloseButton,s=Object(f.getTheme)();return i?m.createElement(p.IconButton,{styles:{root:{height:"auto",width:"44px",color:s.palette.neutralSecondary,fontSize:f.IconFontSizes.large},rootHovered:{color:s.palette.neutralPrimary}},className:n._classNames.closeButton,onClick:n._onPanelClick,ariaLabel:t,"data-is-visible":!0,iconProps:{iconName:"Cancel"}}):null},n._onRenderHeader=function(e,t,i){var s=e.headerText;return s?m.createElement("div",{className:n._classNames.header},m.createElement("p",{className:n._classNames.headerText,id:i,role:"heading","aria-level":2},s)):null},n._onRenderBody=function(e){return m.createElement("div",{className:n._classNames.content},e.children)},n._onRenderFooter=function(e){var t=n.props.onRenderFooterContent,i=void 0===t?null:t;return i?m.createElement("div",{className:n._classNames.footer},m.createElement("div",{className:n._classNames.footerInner},i())):null},n._onPanelClick=function(e){n.dismiss(e)},n._onTransitionComplete=function(){n._updateFooterPosition(),n.setState({isAnimating:!1}),!n.state.isOpen&&n.props.onDismissed&&n.props.onDismissed()},n._warnDeprecations({ignoreExternalFocusing:"focusTrapZoneProps",forceFocusInsideTrap:"focusTrapZoneProps",firstFocusableSelector:"focusTrapZoneProps"}),n.state={isFooterSticky:!1,isOpen:!1,isAnimating:!1,id:Object(_.getId)("Panel")},n}return c.__extends(t,e),t.prototype.componentDidMount=function(){this._events.on(window,"resize",this._updateFooterPosition),this._shouldListenForOuterClick(this.props)&&this._events.on(document.body,"mousedown",this._dismissOnOuterClick,!0),this.props.isOpen&&this.open()},t.prototype.componentDidUpdate=function(e){var t=this._shouldListenForOuterClick(this.props),n=this._shouldListenForOuterClick(e);t&&!n?this._events.on(document.body,"mousedown",this._dismissOnOuterClick,!0):!t&&n&&this._events.off(document.body,"mousedown",this._dismissOnOuterClick,!0)},t.prototype.componentWillReceiveProps=function(e){e.isOpen!==this.state.isOpen&&(e.isOpen?this.open():this.dismiss())},t.prototype.render=function(){var e=this.props,t=e.className,n=void 0===t?"":t,i=e.elementToFocusOnDismiss,s=e.firstFocusableSelector,o=e.focusTrapZoneProps,a=e.forceFocusInsideTrap,r=e.hasCloseButton,l=e.headerText,d=e.headerClassName,p=void 0===d?"":d,f=e.ignoreExternalFocusing,v=e.isBlocking,x=e.isFooterAtBottom,_=e.isLightDismiss,w=e.isHiddenOnDismiss,C=e.layerProps,y=e.type,k=e.styles,R=e.theme,S=e.customWidth,T=e.onLightDismissClick,B=void 0===T?this._onPanelClick:T,L=e.onRenderNavigation,D=void 0===L?this._onRenderNavigation:L,E=e.onRenderHeader,A=void 0===E?this._onRenderHeader:E,I=e.onRenderBody,H=void 0===I?this._onRenderBody:I,W=e.onRenderFooter,M=void 0===W?this._onRenderFooter:W,j=this.state,X=j.isFooterSticky,Z=j.isOpen,G=j.isAnimating,z=j.id,V=y===O.a.smallFixedNear||y===O.a.customNear,Y=Object(N.a)()?V:!V,U=l&&z+"-headerText",$=y===O.a.custom||y===O.a.customNear?{width:S}:{},q=Object(F.f)(this.props,F.e);if(!Z&&!G&&!w)return null;this._classNames=P(k,{theme:R,className:n,focusTrapZoneClassName:o?o.className:void 0,hasCloseButton:r,headerClassName:p,isAnimating:G,isFooterAtBottom:x,isFooterSticky:X,isOnRightSide:Y,isOpen:Z,isHiddenOnDismiss:w,type:y});var J,K=this._classNames;v&&Z&&(J=m.createElement(h.a,{className:K.overlay,isDarkThemed:!1,onClick:_?B:void 0}));var Q=A(this.props,this._onRenderHeader,U);return m.createElement(u.a,c.__assign({},C),m.createElement(g.a,{role:"dialog","aria-modal":"true",ariaLabelledBy:Q?U:void 0,onDismiss:this.dismiss,className:K.hiddenPanel},m.createElement("div",c.__assign({"aria-hidden":!Z&&G},q,{ref:this._panel,className:K.root}),J,m.createElement(b.a,c.__assign({ignoreExternalFocusing:f,forceFocusInsideTrap:!(w&&!Z)&&a,firstFocusableSelector:s,isClickableOutsideFocusTrap:!0},o,{className:K.main,style:$,elementToFocusOnDismiss:i}),m.createElement("div",{className:K.commands,"data-is-visible":!0},D(this.props,this._onRenderNavigation)),m.createElement("div",{className:K.contentInner},Q,m.createElement("div",{ref:this._allowScrollOnPanel,className:K.scrollableContent,"data-is-scrollable":!0},H(this.props,this._onRenderBody)),M(this.props,this._onRenderFooter))))))},t.prototype.open=function(){var e=this;this.state.isOpen||this.setState({isOpen:!0,isAnimating:!0},function(){e._async.setTimeout(e._onTransitionComplete,200)})},t.prototype._shouldListenForOuterClick=function(e){return!!e.isBlocking&&!!e.isOpen},t.prototype._updateFooterPosition=function(){var e=this._scrollableContent;if(e){var t=e.clientHeight,n=e.scrollHeight;this.setState({isFooterSticky:t<n})}},t.prototype._dismissOnOuterClick=function(e){var t=this._panel.current;this.state.isOpen&&t&&(Object(w.a)(t,e.target)||(this.props.onOuterClick?(this.props.onOuterClick(),e.preventDefault()):this.dismiss()))},t.defaultProps={isHiddenOnDismiss:!1,isOpen:!1,isBlocking:!0,hasCloseButton:!0,type:O.a.smallFixedFar},t}(C.a),k={root:"ms-Panel",main:"ms-Panel-main",commands:"ms-Panel-commands",contentInner:"ms-Panel-contentInner",scrollableContent:"ms-Panel-scrollableContent",navigation:"ms-Panel-navigation",closeButton:"ms-Panel-closeButton ms-PanelAction-close",header:"ms-Panel-header",headerText:"ms-Panel-headerText",content:"ms-Panel-content",footer:"ms-Panel-footer",footerInner:"ms-Panel-footerInner",isOpen:"is-open",hasCloseButton:"ms-Panel--hasCloseButton",smallFluid:"ms-Panel--smFluid",smallFixedNear:"ms-Panel--smLeft",smallFixedFar:"ms-Panel--sm",medium:"ms-Panel--md",large:"ms-Panel--lg",largeFixed:"ms-Panel--fixed",extraLarge:"ms-Panel--xl",custom:"ms-Panel--custom",customNear:"ms-Panel--customLeft"},R="100%",S="auto",T=272,B=340,L=592,D=644,E=940,A="auto",I=0,H=48,W=428,M=176,j=((i={})["@media (min-width: "+f.ScreenWidthMinMedium+"px)"]={width:B},i),X=((s={})["@media (min-width: "+f.ScreenWidthMinLarge+"px)"]={width:L},s["@media (min-width: "+f.ScreenWidthMinXLarge+"px)"]={width:D},s),Z=((o={})["@media (min-width: "+f.ScreenWidthMinUhfMobile+"px)"]={left:H,width:S},o["@media (min-width: "+f.ScreenWidthMinXXLarge+"px)"]={left:W},o),G=((a={})["@media (min-width: "+f.ScreenWidthMinXXLarge+"px)"]={left:A,width:E},a),z=((r={})["@media (min-width: "+f.ScreenWidthMinXXLarge+"px)"]={left:M},r),V=function(e){var t;switch(e){case O.a.smallFixedFar:t=c.__assign({},j);break;case O.a.medium:t=c.__assign({},j,X);break;case O.a.large:t=c.__assign({},j,X,Z);break;case O.a.largeFixed:t=c.__assign({},j,X,Z,G);break;case O.a.extraLarge:t=c.__assign({},j,X,Z,z)}return t},Y={paddingLeft:"16px",paddingRight:"16px",selectors:(l={},l["@media screen and (min-width: "+f.ScreenWidthMinLarge+"px)"]={paddingLeft:"32px",paddingRight:"32px"},l["@media screen and (min-width: "+f.ScreenWidthMinXXLarge+"px)"]={paddingLeft:"40px",paddingRight:"40px"},l)};n.d(t,"a",function(){return U});var U=Object(d.a)(y,function(e){var t,n,i,s,o,a,r=e.className,l=e.focusTrapZoneClassName,d=e.hasCloseButton,m=e.headerClassName,p=e.isAnimating,u=e.isFooterAtBottom,h=e.isFooterSticky,g=e.isOnRightSide,v=e.isOpen,x=e.isHiddenOnDismiss,_=e.theme,N=e.type,F=void 0===N?O.a.smallFixedFar:N,w=_.palette,C=Object(f.getGlobalClassNames)(k,_),b=F===O.a.custom||F===O.a.customNear,P="undefined"!=typeof window?window.innerHeight:"100%";return{root:[C.root,_.fonts.medium,v&&C.isOpen,d&&C.hasCloseButton,{pointerEvents:"none",position:"absolute",top:0,left:0,right:0,bottom:0},b&&g&&C.custom,b&&!g&&C.customNear,r],overlay:[{pointerEvents:"auto",cursor:"pointer"},v&&p&&f.AnimationClassNames.fadeIn100,!v&&p&&f.AnimationClassNames.fadeOut100],hiddenPanel:[!v&&!p&&x&&{visibility:"hidden"}],main:[C.main,{backgroundColor:w.white,boxShadow:"0px 0px 30px 0px rgba(0,0,0,0.2)",pointerEvents:"auto",position:"absolute",display:"flex",flexDirection:"column",overflowX:"hidden",overflowY:"auto",WebkitOverflowScrolling:"touch",maxHeight:"100%",bottom:0,top:0,left:A,right:I,width:R,selectors:c.__assign((t={},t["@supports (-webkit-overflow-scrolling: touch)"]={maxHeight:P},t),V(F))},F===O.a.smallFluid&&{left:I},F===O.a.smallFixedNear&&{left:I,right:A,width:T},F===O.a.customNear&&{right:"auto",left:0},b&&{maxWidth:"100vw"},u&&{height:"100%",selectors:(n={},n["@supports (-webkit-overflow-scrolling: touch)"]={height:P},n)},v&&p&&!g&&f.AnimationClassNames.slideRightIn40,v&&p&&g&&f.AnimationClassNames.slideLeftIn40,!v&&p&&!g&&f.AnimationClassNames.slideLeftOut40,!v&&p&&g&&f.AnimationClassNames.slideRightOut40,l],commands:[C.commands],navigation:[C.navigation,{padding:"0 5px",height:"44px",display:"flex",justifyContent:"flex-end"}],closeButton:[C.closeButton],contentInner:[C.contentInner,{display:"flex",flexDirection:"column",flexGrow:1,maxHeight:"100%",overflowY:"hidden",selectors:(i={},i["@supports (-webkit-overflow-scrolling: touch)"]={maxHeight:P},i)},u&&{height:"100%",selectors:(s={},s["@supports (-webkit-overflow-scrolling: touch)"]={height:P},s)}],header:[C.header,Y,{margin:"14px 0",flexGrow:0,selectors:(o={},o["@media (min-width: "+f.ScreenWidthMinXLarge+"px)"]={marginTop:"30px"},o)}],headerText:[C.headerText,f.DefaultFontStyles.xLarge,{color:w.neutralPrimary,lineHeight:"32px",margin:0},m],scrollableContent:[C.scrollableContent,{overflowY:"auto",height:"100%",selectors:(a={},a["@supports (-webkit-overflow-scrolling: touch)"]={height:P},a)}],content:[C.content,Y,{marginBottom:0,paddingBottom:20}],footer:[C.footer,{flexGrow:0,borderTop:"1px solid transparent",transition:"opacity "+f.AnimationVariables.durationValue3+" "+f.AnimationVariables.easeFunction2},h&&{background:w.white,borderTopColor:w.neutralLight}],footerInner:[C.footerInner,Y,{paddingBottom:"20px",paddingTop:"20px"}]}},void 0,{scope:"Panel"})}}]);
//# sourceMappingURL=owa.0.mail.js.map
window.scriptsLoaded['owa.0.mail.js'] = 1; window.scriptProcessEnd = window.scriptProcessEnd || {}; window.scriptProcessEnd['owa.0.mail.js'] = (new Date()).getTime();