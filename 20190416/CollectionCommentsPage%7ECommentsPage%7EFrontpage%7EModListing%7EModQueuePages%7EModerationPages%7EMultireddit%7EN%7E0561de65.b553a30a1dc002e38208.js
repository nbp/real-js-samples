(window.webpackJsonp=window.webpackJsonp||[]).push([["CollectionCommentsPage~CommentsPage~Frontpage~ModListing~ModQueuePages~ModerationPages~Multireddit~N~0561de65"],{"./src/reddit/components/AwardBadges/index.m.less":function(e,t,o){e.exports={awardBadges:"_2LeW9tc_6Fs1n7Ou8uD-70",gildCtaContainer:"_3sYCnvIxJkhkOfLVTWR67K",awardIcon:"_3u6g9UTYlEOr-yfM5hyq3p",awardItem:"_2y3bja4n4-unxyUrMEFH8C",newAwardItem:"_3cvmhvAbUM05VkxFte0UZ",showAllButton:"_10Q0ZYgDml-1g2q2eQ5ky_",badgeButton:"_3mcXKZUh7FvUMLSv0AHyXs",icon:"_2J9jlNokb9X4gvrrZR3BX2"}},"./src/reddit/components/AwardBadges/index.tsx":function(e,t,o){"use strict";var r,n=o("./node_modules/react/index.js"),s=o.n(n),i=o("./node_modules/react-redux/es/index.js"),a=o("./node_modules/reselect/es/index.js"),d=o("./bundled-modules/styled-components/styled-components.min.js"),l=o.n(d),c=o("./src/config.ts"),p=o("./src/lib/classNames/index.ts"),u=o("./src/app/actions/tooltip.ts"),m=o("./src/reddit/actions/gold/modals.ts"),b=o("./src/reddit/components/InfoTextTooltip/index.tsx"),f=o("./src/reddit/components/TrackingHelper/index.tsx"),g=o("./src/reddit/featureFlags/index.ts"),h=o("./src/reddit/helpers/isPost.ts"),v=o("./src/reddit/models/Gold/Award.ts"),y=o("./src/reddit/models/Theme/NewColorSystem/index.ts"),w=o("./src/reddit/selectors/communityAwards.ts"),x=o("./src/reddit/selectors/user.ts"),O=o("./src/app/strings/index.ts"),j=o("./src/reddit/components/AwardBadges/index.m.less"),C=o.n(j),S=(r="function"==typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103,function(e,t,o,n){var s=e&&e.defaultProps,i=arguments.length-3;if(t||0===i||(t={}),t&&s)for(var a in s)void 0===t[a]&&(t[a]=s[a]);else t||(t=s||{});if(1===i)t.children=n;else if(i>1){for(var d=Array(i),l=0;l<i;l++)d[l]=arguments[l+3];t.children=d}return{$$typeof:r,type:e,key:void 0===o?null:""+o,ref:null,props:t,_owner:null}});const I=Object(d.css)(["."," {color: ",";}"],C.a.awardItem,e=>Object(y.c)(e).metaText);class T extends s.a.PureComponent{constructor(){super(...arguments),this.onShowTooltip=(()=>{var e=this.props;return(0,e.onShowTooltip)(e.tooltipId)})}render(){var e=this.props;const t=e.className,o=e.count,r=e.language,n=e.onHideTooltip,i=e.postOrComment,a=e.tooltipMessageKey,d=e.tooltipId,l=this.props.icon;return S(s.a.Fragment,{},void 0,o>0&&S("span",{className:Object(p.a)(C.a.awardItem,t),onMouseEnter:this.onShowTooltip,onMouseLeave:n},void 0,S("i",{id:d},void 0,S(l,{className:C.a.awardIconSvg})),o>1&&o,S(b.c,{tooltipId:d,text:Object(O.c)(r,a,o,{count:o,postOrComment:Object(O.a)(r,`gold.postOrComment.${i}`)})})))}}var A=o("./node_modules/polished/dist/polished.es.js"),M=o("./src/reddit/icons/fonts/helpers.tsx"),k=function(){var e="function"==typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103;return function(t,o,r,n){var s=t&&t.defaultProps,i=arguments.length-3;if(o||0===i||(o={}),o&&s)for(var a in s)void 0===o[a]&&(o[a]=s[a]);else o||(o=s||{});if(1===i)o.children=n;else if(i>1){for(var d=Array(i),l=0;l<i;l++)d[l]=arguments[l+3];o.children=d}return{$$typeof:e,type:t,key:void 0===r?null:""+r,ref:null,props:o,_owner:null}}}();var N=e=>k("i",{className:Object(p.a)(Object(M.b)("addGild"),e.className)}),P=function(){var e="function"==typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103;return function(t,o,r,n){var s=t&&t.defaultProps,i=arguments.length-3;if(o||0===i||(o={}),o&&s)for(var a in s)void 0===o[a]&&(o[a]=s[a]);else o||(o=s||{});if(1===i)o.children=n;else if(i>1){for(var d=Array(i),l=0;l<i;l++)d[l]=arguments[l+3];o.children=d}return{$$typeof:e,type:t,key:void 0===r?null:""+r,ref:null,props:o,_owner:null}}}();var L=e=>P("i",{className:Object(p.a)(Object(M.b)("addGildDashed"),e.className)}),B=function(){var e="function"==typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103;return function(t,o,r,n){var s=t&&t.defaultProps,i=arguments.length-3;if(o||0===i||(o={}),o&&s)for(var a in s)void 0===o[a]&&(o[a]=s[a]);else o||(o=s||{});if(1===i)o.children=n;else if(i>1){for(var d=Array(i),l=0;l<i;l++)d[l]=arguments[l+3];o.children=d}return{$$typeof:e,type:t,key:void 0===r?null:""+r,ref:null,props:o,_owner:null}}}();const $=Object(d.css)(["."," {color: ",";&:focus,&:hover {outline: none;background-color: ",";}}"],C.a.badgeButton,e=>Object(y.c)(e).actionIcon,e=>Object(A.f)(Object(y.c)(e).navIcon,.1));var _=class extends s.a.PureComponent{constructor(){super(...arguments),this.state={isHovered:!1},this.handleMouseEnter=(()=>{this.setState({isHovered:!0})}),this.handleMouseLeave=(()=>{this.setState({isHovered:!1})})}render(){var e=this.props;const t=e.className,o=e.onClick,r=this.state.isHovered?N:L;return B("button",{className:Object(p.a)(C.a.badgeButton,t),onClick:o,onBlur:this.handleMouseLeave,onFocus:this.handleMouseEnter,onMouseEnter:this.handleMouseEnter,onMouseLeave:this.handleMouseLeave},void 0,B(r,{className:C.a.icon}))}};const E=(e,t)=>{let o=`${Object(h.a)(e)?"Post":"Comment"}AwardBadges--${e}`;return t&&(o=`${o}--${t}`),o};var F=o("./src/higherOrderComponents/makeAsync.tsx"),Z=o("./src/lib/loadWithRetries/index.ts");var H=Object(F.a)({getComponent:()=>Object(Z.a)(()=>o.e("AwardTooltip").then(o.bind(null,"./src/reddit/components/AwardTooltip/index.tsx"))).then(e=>e.default),ErrorComponent:()=>null,LoadingComponent:()=>null}),U=function(){var e="function"==typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103;return function(t,o,r,n){var s=t&&t.defaultProps,i=arguments.length-3;if(o||0===i||(o={}),o&&s)for(var a in s)void 0===o[a]&&(o[a]=s[a]);else o||(o=s||{});if(1===i)o.children=n;else if(i>1){for(var d=Array(i),l=0;l<i;l++)d[l]=arguments[l+3];o.children=d}return{$$typeof:e,type:t,key:void 0===r?null:""+r,ref:null,props:o,_owner:null}}}();const q=Object(d.css)(["."," {color: ",";}"],C.a.awardItem,e=>Object(y.c)(e).metaText);class z extends s.a.PureComponent{constructor(){super(...arguments),this.onShowTooltip=(()=>{var e=this.props;return(0,e.onShowTooltip)(e.tooltipId)})}render(){var e=this.props;const t=e.award,o=e.className,r=e.count,n=e.onHideTooltip,s=e.postOrComment,i=e.tooltipId;if(r<=0)return;const a=t.icon32?t.icon32.url:t.icon.url;return U("span",{className:Object(p.a)(C.a.awardItem,C.a.newAwardItem,o),onMouseEnter:this.onShowTooltip,onMouseLeave:n},void 0,U("span",{id:i},void 0,U("img",{className:C.a.awardIcon,src:a})),r>1&&r,U(H,{award:t,postOrComment:s,tooltipId:i}))}}o.d(t,"c",function(){return D}),o.d(t,"a",function(){return K}),o.d(t,"b",function(){return R});var G=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var o=arguments[t];for(var r in o)Object.prototype.hasOwnProperty.call(o,r)&&(e[r]=o[r])}return e},X=function(){var e="function"==typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103;return function(t,o,r,n){var s=t&&t.defaultProps,i=arguments.length-3;if(o||0===i||(o={}),o&&s)for(var a in s)void 0===o[a]&&(o[a]=s[a]);else o||(o=s||{});if(1===i)o.children=n;else if(i>1){for(var d=Array(i),l=0;l<i;l++)d[l]=arguments[l+3];o.children=d}return{$$typeof:e,type:t,key:void 0===r?null:""+r,ref:null,props:o,_owner:null}}}(),V=function(e,t){var o={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(o[r]=e[r]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var n=0;for(r=Object.getOwnPropertySymbols(e);n<r.length;n++)t.indexOf(r[n])<0&&(o[r[n]]=e[r[n]])}return o};const D=e=>X("img",{className:Object(p.a)(e.className,C.a.awardIcon),src:`${c.a.assetPath}/img/gold/badges/award-silver-cartoon.png`}),K=e=>X("img",{className:Object(p.a)(e.className,C.a.awardIcon),src:`${c.a.assetPath}/img/gold/badges/award-gold-cartoon.png`}),R=e=>X("img",{className:Object(p.a)(e.className,C.a.awardIcon),src:`${c.a.assetPath}/img/gold/badges/award-platinum-cartoon.png`}),W=Object(a.createStructuredSelector)({currentUser:x.j,language:x.P,sortedAwards:(e,{thing:t})=>g.d.communityAwards(e)&&t.awardCountsById?Object(v.g)(Object(w.b)(e,Object.keys(t.awardCountsById))||[]):[]}),J=Object(i.connect)(W,(e,{thing:t})=>({onAddAward:()=>e(Object(m.d)(t.id)),onHideTooltip:()=>e(Object(u.f)()),onShowTooltip:t=>e(Object(u.d)({tooltipId:t}))})),Q=5;t.d=l()(J(Object(f.b)(class extends s.a.Component{constructor(e){super(e),this.handleAddAward=(async()=>{var e=this.props;const t=e.onAddAward,r=e.sendEvent,n=e.thing;t(),r((0,(await o.e("gildTrackers").then(o.bind(null,"./src/reddit/helpers/trackers/gild.ts"))).clickAddAward)(n.id))}),this.handleShowAllAwards=(()=>{this.setState({showAllAwards:!0})}),this.state={showAllAwards:!1}}renderGildings(){const e=this.props,t=e.thing,o=e.tooltipType,r=V(e,["thing","tooltipType"]),n=t.gildings,i=Object(h.a)(t.id)?"post":"comment",a=E(t.id,o);return X(s.a.Fragment,{},void 0,s.a.createElement(T,G({},r,{count:n?n.gid1:0,icon:D,postOrComment:i,tooltipMessageKey:"gold.awardBadge.silverTooltipMessage",tooltipId:`${a}-gid1`})),s.a.createElement(T,G({},r,{count:n?n.gid2:0,icon:K,postOrComment:i,tooltipMessageKey:"gold.awardBadge.goldTooltipMessage",tooltipId:`${a}-gid2`})),s.a.createElement(T,G({},r,{count:n?n.gid3:0,icon:R,postOrComment:i,tooltipMessageKey:"gold.awardBadge.platinumTooltipMessage",tooltipId:`${a}-gid3`})))}renderAwardings(){const e=this.state.showAllAwards;var t=this.props;const o=t.sortedAwards,r=t.forceShowAllAwards,n=t.onHideTooltip,i=t.onShowTooltip,a=t.tooltipType,d=t.thing,l=E(d.id,a),c=`${l}-view-all`,p=r||e?o:o.length>Q?o.slice(0,Q-1):o,u=o.length>p.length?o.slice(Q-1).reduce((e,t)=>e+(d.awardCountsById&&d.awardCountsById[t.id]||0),0):0;return X(s.a.Fragment,{},void 0,p.map(e=>{const t=d.awardCountsById?d.awardCountsById[e.id]:0;return X(z,{award:e,count:t,onHideTooltip:n,onShowTooltip:i,postOrComment:d,tooltipId:`${l}-${e.id}`},e.id)}),u>0&&X(s.a.Fragment,{},void 0,X("button",{id:c,className:C.a.showAllButton,onClick:this.handleShowAllAwards,onMouseEnter:()=>i(c),onMouseLeave:n},void 0,"& ",u," More"),X(b.c,{tooltipId:c,text:"View all Awards"})))}render(){var e=this.props;const t=e.className,o=e.currentUser,r=e.hideCta,n=e.sortedAwards,s=e.thing,i=s.gildings,a=i&&(i.gid1||i.gid2||i.gid3),d=!!n.length,l=!r&&o&&o.id!==s.authorId&&(a||d);return X("div",{className:Object(p.a)(t,C.a.awardBadges,l?C.a.gildCtaContainer:"")},void 0,d?this.renderAwardings():this.renderGildings(),l&&X(_,{onClick:this.handleAddAward}))}}))).withConfig({componentId:"s1lxazz9-0"})(["."," {color: ",";}","","",""],C.a.showAllButton,e=>Object(y.c)(e).metaText,I,q,$)},"./src/reddit/components/ProfileIdCard/GildedLastMonth.tsx":function(e,t,o){"use strict";var r,n=o("./node_modules/react/index.js"),s=o.n(n),i=o("./node_modules/react-redux/es/index.js"),a=o("./src/config.ts"),d=o("./src/lib/prettyPrintNumber/index.ts"),l=o("./src/app/actions/tooltip.ts"),c=o("./src/app/strings/index.ts"),p=o("./src/reddit/components/AwardBadges/index.tsx"),u=o("./src/reddit/components/InfoTextTooltip/index.tsx"),m=o("./src/reddit/components/ProfileIdCard/index.m.less"),b=o.n(m),f=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var o=arguments[t];for(var r in o)Object.prototype.hasOwnProperty.call(o,r)&&(e[r]=o[r])}return e},g=(r="function"==typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103,function(e,t,o,n){var s=e&&e.defaultProps,i=arguments.length-3;if(t||0===i||(t={}),t&&s)for(var a in s)void 0===t[a]&&(t[a]=s[a]);else t||(t=s||{});if(1===i)t.children=n;else if(i>1){for(var d=Array(i),l=0;l<i;l++)d[l]=arguments[l+3];t.children=d}return{$$typeof:r,type:e,key:void 0===o?null:""+o,ref:null,props:t,_owner:null}});const h={gid1:"gold.gildModal.awardSelector.silver.title",gid2:"gold.gildModal.awardSelector.gold.title",gid3:"gold.gildModal.awardSelector.platinum.title"};t.a=Object(i.connect)(void 0,e=>({toggleTooltip:t=>e(Object(l.e)({tooltipId:t}))}))(class extends s.a.PureComponent{constructor(){super(...arguments),this.toggleTooltip=(()=>{var e=this.props;const t=e.toggleTooltip,o=e.tooltipId;o&&t(o)})}getTooltipText(){var e=this.props;const t=e.gildings,o=e.language,r=Object.keys(t).filter(e=>t[e]).sort();switch(r.length){case 1:return Object(c.a)(o,"gold.gildedTooltip1",{count1:t[r[0]],title1:Object(c.a)(o,h[r[0]])});case 2:return Object(c.a)(o,"gold.gildedTooltip2",{count1:t[r[1]],title1:Object(c.a)(o,h[r[1]]),count2:t[r[0]],title2:Object(c.a)(o,h[r[0]])});case 3:return Object(c.a)(o,"gold.gildedTooltip3",{count1:t[r[2]],title1:Object(c.a)(o,h[r[2]]),count2:t[r[1]],title2:Object(c.a)(o,h[r[1]]),count3:t[r[0]],title3:Object(c.a)(o,h[r[0]])});default:return""}}render(){var e=this.props;const t=e.gildings,o=e.language,r=e.tooltipId,n=e.userName,i=r?{id:r,onMouseEnter:this.toggleTooltip,onMouseLeave:this.toggleTooltip}:{},l=Object.keys(t).filter(e=>t[e]).sort();if(!l.length)return null;const m=l[l.length-1];let v=0,y=0;for(const s in t)t[s]&&(y+=t[s],t[s]>v&&(v=t[s]));const w="gid1"===m&&g(p.c,{className:b.a.awardIcon})||"gid2"===m&&g(p.a,{className:b.a.awardIcon})||"gid3"===m&&g(p.b,{className:b.a.awardIcon})||null,x=h[m],O=Object(c.a)(o,x);return g(s.a.Fragment,{},void 0,s.a.createElement("a",f({className:b.a.GildedLastMonth,href:`${a.a.oldRedditUrl}/user/${n}/gilded`},i),g("div",{className:b.a.iconColumn},void 0,w,y>1&&g("span",{className:b.a.count},void 0,`+${Object(d.b)(y-1)}`)),g("div",{className:b.a.textColumn},void 0,y>v?Object(c.a)(o,"gold.gildedLastMonthMore",{award:O}):Object(c.a)(o,"gold.gildedLastMonth",{award:O}))),r&&g(u.c,{caretOnTop:!1,tooltipId:r,text:this.getTooltipText()}))}})},"./src/reddit/components/ProfileIdCard/index.m.less":function(e,t,o){e.exports={SnooIconWrapper:"_308WM6C-yV5iwS0Iy8nOfI",snooIconWrapper:"_308WM6C-yV5iwS0Iy8nOfI",actionItem:"_1l7CTV4NjDjmzX8DiiSgTL",GildedLastMonth:"_2fBB4fy1NGOVbL2SkveXXk",gildedLastMonth:"_2fBB4fy1NGOVbL2SkveXXk",textColumn:"_wi1DtT7oN7k_x5oIV8zm",iconColumn:"_32tzMaZn7x3dfQC5MXndJn",count:"_6xPPP5HdELF-SZJL8layH",awardIcon:"_2Eq8z6UD7I0ul3wnZ-YT80"}},"./src/reddit/components/SubscribeButton/Base.tsx":function(e,t,o){"use strict";o.d(t,"a",function(){return j}),o.d(t,"b",function(){return T}),o.d(t,"c",function(){return k});var r,n=o("./node_modules/react/index.js"),s=o.n(n),i=o("./bundled-modules/styled-components/styled-components.min.js"),a=o.n(i),d=o("./src/app/strings/index.ts"),l=o("./src/reddit/controls/Button/index.tsx"),c=o("./src/reddit/helpers/styles/mixins/fonts.tsx"),p=o("./src/reddit/icons/svgs/Checkmark/index.tsx"),u=o("./src/reddit/icons/svgs/Plus/index.tsx"),m=o("./src/reddit/models/Theme/NewColorSystem/index.ts"),b=o("./src/reddit/components/SubscribeButton/helpers/actionTemplateSource.ts"),f=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var o=arguments[t];for(var r in o)Object.prototype.hasOwnProperty.call(o,r)&&(e[r]=o[r])}return e},g=(r="function"==typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103,function(e,t,o,n){var s=e&&e.defaultProps,i=arguments.length-3;if(t||0===i||(t={}),t&&s)for(var a in s)void 0===t[a]&&(t[a]=s[a]);else t||(t=s||{});if(1===i)t.children=n;else if(i>1){for(var d=Array(i),l=0;l<i;l++)d[l]=arguments[l+3];t.children=d}return{$$typeof:r,type:e,key:void 0===o?null:""+o,ref:null,props:t,_owner:null}}),h=function(e,t){var o={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(o[r]=e[r]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var n=0;for(r=Object.getOwnPropertySymbols(e);n<r.length;n++)t.indexOf(r[n])<0&&(o[r[n]]=e[r[n]])}return o};const v=`\n  ${c.smallButtonFont}\n  padding: 4px 9px 2px;\n  width: 100%;\n`,y=`\n  ${c.largeButtonFont}\n  padding: 0 16px;\n`,w=a.a.button.withConfig({componentId:"s160fkbq-0"})(["",";border: 1px solid ",";border-radius: 4px;box-sizing: border-box;&:active,&:hover,&:disabled,&[disabled],&[data-disabled] {border: 1px solid ",";}"],l.u,e=>Object(m.c)(e).body,e=>Object(m.c)(e).body),x=Object(i.css)(["display: block;fill: ",";",""],e=>Object(m.c)(e).body,e=>e.small?"\n  height: 14px;\n  width: 14px;\n":"\n  height: 22px;\n  width: 22px;\n"),O=a()(u.a).withConfig({componentId:"s160fkbq-1"})(["",";"],x),j=a()(p.a).withConfig({componentId:"s160fkbq-2"})(["",";"],x),C=a()(e=>{e.border;var t=e.small,o=h(e,["border","small"]);return s.a.createElement(w,o,g(O,{small:t}))}).withConfig({componentId:"s160fkbq-3"})(["",""],e=>e.small?"":"\n  height: 24px;\n  padding: 0;\n  width: 24px;\n"),S=a()(e=>{var t=e.border,o=(e.small,h(e,["border","small"]));return t?s.a.createElement(l.e,o):s.a.createElement(l.m,o)}).withConfig({componentId:"s160fkbq-4"})(["",""],e=>e.small?v:y),I=e=>{var t=e.icon,o=h(e,["icon"]);return t?s.a.createElement(C,o):s.a.createElement(S,o)},T=a()(e=>{e.border,e.language;var t=e.small,o=(e.type,h(e,["border","language","small","type"]));return s.a.createElement(w,o,g(j,{small:t}))}).withConfig({componentId:"s160fkbq-5"})(["",""],e=>e.small?"":"\n  height: 24px;\n  padding: 0;\n  width: 24px;\n"),A=a()(e=>{var t=e.border,o=(e.language,e.small,e.type,h(e,["border","language","small","type"]));return t?s.a.createElement(l.h,o):s.a.createElement(l.m,o)}).withConfig({componentId:"s160fkbq-6"})(["","&::after {content: '","';}&:hover {&::after {content: '","';}}"],e=>e.small?v:y,e=>Object(d.a)(e.language,`subscriptions.${Object(b.a)(e)}.subscribed`),e=>Object(d.a)(e.language,`subscriptions.${Object(b.a)(e)}.unsubscribe`)),M=e=>{var t=e.icon,o=h(e,["icon"]);return t?s.a.createElement(T,o):s.a.createElement(A,o)};class k extends s.a.Component{constructor(){super(...arguments),this.onClick=(e=>{if(this.props.userIsSubscriber?this.props.onUnsubscribe():this.props.onSubscribe(),this.props.onClick&&this.props.onClick(e),this.props.getEventFactory){const e=this.props.getEventFactory(this.props.userIsSubscriber);e&&this.props.sendEvent(e)}})}componentDidMount(){this.props.onSubscriptionsRequested()}render(){var e=this.props,t=e.border;const o=void 0===t||t,r=e.className;var n=e.icon;const i=void 0!==n&&n,a=e.id,l=e.language;var c=e.small;const p=void 0!==c&&c,u={border:o,className:r,icon:i,onClick:this.onClick,small:p};return this.props.userIsSubscriber?s.a.createElement(M,f({},u,{language:l,type:this.props.identifier.type})):s.a.createElement(I,f({},u,{id:a}),this.props.children,Object(d.a)(l,`subscriptions.${Object(b.a)({type:this.props.identifier.type})}.subscribe`))}}},"./src/reddit/components/SubscribeButton/helpers/actionTemplateSource.ts":function(e,t,o){"use strict";t.a=(({type:e})=>"subreddit"===e?"subredditActions":"profileActions")},"./src/reddit/components/SubscribeButton/index.tsx":function(e,t,o){"use strict";var r=o("./src/reddit/components/TrackingHelper/index.tsx"),n=o("./src/reddit/connectors/SubscribeButton/index.ts"),s=o("./src/reddit/components/SubscribeButton/Base.tsx");t.a=Object(n.a)(Object(r.b)(s.c))},"./src/reddit/connectors/SubscribeButton/index.ts":function(e,t,o){"use strict";var r=o("./node_modules/react-redux/es/index.js"),n=o("./node_modules/reselect/es/index.js"),s=o("./src/reddit/actions/subscription.ts"),i=o("./src/reddit/selectors/monthsToMinutes.ts"),a=o("./src/reddit/selectors/subreddit.ts"),d=o("./src/reddit/selectors/user.ts");t.a=Object(r.connect)(()=>Object(n.createStructuredSelector)({language:d.P,subscribeReminderTooltipId:i.A,subscribeTooltipId:i.B,userIsSubscriber:a.U}),(e,{identifier:t})=>({onSubscribe:()=>e(s.g(t,!0)),onSubscriptionsRequested:()=>e(s.h()),onUnsubscribe:()=>e(s.g(t,!1))}))},"./src/reddit/controls/LoadingIcon/index.tsx":function(e,t,o){"use strict";var r=o("./node_modules/polished/dist/polished.es.js"),n=o("./bundled-modules/styled-components/styled-components.min.js"),s=o.n(n),i=o("./src/reddit/helpers/styles/components/index.tsx"),a=o("./src/reddit/models/Theme/NewColorSystem/index.ts");const d=s()(Object(i.a)()).withConfig({componentId:"s1h5d9ni-0"})(["width: ","px;height: ","px;","font-size: 4px;position: relative;text-indent: -9999em;border-radius: 50%;border-top: .6em solid ",";border-right: .6em solid ",";border-bottom: .6em solid ",";border-left: .6em solid ",";transform: translateZ(0);animation: spin 1.1s infinite linear;&:after {border-radius: 50%;width: ","px;height: ","px;}@keyframes spin {0% {-webkit-transform: rotate(0deg);transform: rotate(0deg);}100% {-webkit-transform: rotate(360deg);transform: rotate(360deg);}}"],e=>e.sizePx,e=>e.sizePx,e=>e.center?"margin: 0 auto;":"",e=>Object(r.f)(Object(a.c)(e).bodyText,.2),e=>Object(r.f)(Object(a.c)(e).bodyText,.2),e=>Object(r.f)(Object(a.c)(e).bodyText,.2),e=>Object(a.c)(e).body,e=>e.sizePx,e=>e.sizePx);t.a=d},"./src/reddit/icons/svgs/Checkmark/index.tsx":function(e,t,o){"use strict";o("./node_modules/react/index.js");var r,n=(r="function"==typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103,function(e,t,o,n){var s=e&&e.defaultProps,i=arguments.length-3;if(t||0===i||(t={}),t&&s)for(var a in s)void 0===t[a]&&(t[a]=s[a]);else t||(t=s||{});if(1===i)t.children=n;else if(i>1){for(var d=Array(i),l=0;l<i;l++)d[l]=arguments[l+3];t.children=d}return{$$typeof:r,type:e,key:void 0===o?null:""+o,ref:null,props:t,_owner:null}});t.a=(e=>n("svg",{className:e.className,viewBox:"0 0 20 22",xmlns:"http://www.w3.org/2000/svg"},void 0,n("g",{},void 0,n("path",{d:"M8.9310375,15.1995 C8.70135,15.41825 8.38963125,15.541375 8.0647875,15.541375 C8.052975,15.541375 8.04181875,15.54075 8.03000625,15.54075 C7.69335,15.531375 7.37506875,15.39075 7.15063125,15.151375 L4.0879125,11.88075 C3.637725,11.400125 3.68169375,10.662625 4.18700625,10.23325 C4.6916625,9.805125 5.4660375,9.846375 5.91688125,10.327625 L8.115975,12.676375 L14.8550063,6.25825 C15.3327563,5.802625 16.1091,5.802625 16.5875063,6.25825 C17.0659125,6.71325 17.0659125,7.452625 16.5875063,7.907625 L8.9310375,15.1995 Z",fill:"inherit"}))))},"./src/reddit/icons/svgs/Karma/index.tsx":function(e,t,o){"use strict";o("./node_modules/react/index.js");var r,n=(r="function"==typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103,function(e,t,o,n){var s=e&&e.defaultProps,i=arguments.length-3;if(t||0===i||(t={}),t&&s)for(var a in s)void 0===t[a]&&(t[a]=s[a]);else t||(t=s||{});if(1===i)t.children=n;else if(i>1){for(var d=Array(i),l=0;l<i;l++)d[l]=arguments[l+3];t.children=d}return{$$typeof:r,type:e,key:void 0===o?null:""+o,ref:null,props:t,_owner:null}});t.a=(e=>n("svg",{className:e.className,viewBox:"0 0 20 20",version:"1.1",xmlns:"http://www.w3.org/2000/svg"},void 0,n("g",{},void 0,n("path",{d:"M6.42528593,9.54562407 C4.41043013,8.02026355 3.10790651,5.60355545 3.10790651,2.88165092 L3.10790651,2.79711586 L3.19244157,2.79711586 C5.9143461,2.79711586 8.33136499,4.09963948 9.85641472,6.11449528 C8.02399304,6.25279712 6.56358777,7.7128916 6.42528593,9.54562407 Z M6.42528593,10.2560915 C6.56358777,12.088824 8.02399304,13.5489184 9.85641472,13.6872203 C8.33136499,15.7020761 5.9143461,17.0045997 3.19244157,17.0045997 L3.10790651,17.0045997 L3.10790651,16.9200646 C3.10790651,14.1981601 4.41043013,11.781452 6.42528593,10.2560915 Z M13.6872203,10.2560915 C15.7020761,11.781452 17.0045997,14.1981601 17.0045997,16.9200646 L17.0045997,17.0045997 L16.9200646,17.0045997 C14.1981601,17.0045997 11.7811412,15.7020761 10.2560915,13.6872203 C12.0885132,13.5489184 13.5486077,12.088824 13.6872203,10.2560915 Z M16.9200646,2.79711586 L17.0045997,2.79711586 L17.0045997,2.88165092 C17.0045997,5.60324465 15.7020761,8.02026355 13.6872203,9.54562407 C13.5489184,7.7128916 12.0885132,6.25279712 10.2560915,6.11449528 C11.7811412,4.09963948 14.1981601,2.79711586 16.9200646,2.79711586 Z M19.9403282,9.84895574 L20,9.90862755 L19.9403282,9.96829935 C18.9346096,10.9740179 17.7346469,11.6624192 16.46227,12.0474888 C15.9659373,11.2534187 15.3446668,10.5308304 14.6071606,9.90862755 C15.3446668,9.28642466 15.9659373,8.5638364 16.46227,7.76976629 C17.7346469,8.1548359 18.9346096,8.8432372 19.9403282,9.84895574 Z M9.90862755,5.39283938 C9.28642466,4.65533317 8.5638364,4.03406266 7.76976629,3.53772999 C8.1548359,2.26535306 8.8432372,1.06539035 9.84895574,0.0596718051 L9.90862755,0 L9.96829935,0.0596718051 C10.9740179,1.06539035 11.6624192,2.26535306 12.0474888,3.53772999 C11.2534187,4.03406266 10.5308304,4.65533317 9.90862755,5.39283938 Z M5.39283938,9.90862755 C4.65533317,10.5308304 4.03406266,11.2534187 3.53772999,12.0474888 C2.26535306,11.6624192 1.06539035,10.9740179 0.0596718051,9.96829935 L0,9.90862755 L0.0596718051,9.84895574 C1.06539035,8.8432372 2.26535306,8.1548359 3.53772999,7.76976629 C4.03406266,8.5638364 4.65533317,9.28642466 5.39283938,9.90862755 Z M9.90862755,14.6071606 C10.5308304,15.3446668 11.2534187,15.9659373 12.0474888,16.46227 C11.6624192,17.7346469 10.9740179,18.9346096 9.96829935,19.9403282 L9.90862755,20 L9.84895574,19.9403282 C8.8432372,18.9346096 8.1548359,17.7346469 7.76976629,16.46227 C8.5638364,15.9659373 9.28642466,15.3446668 9.90862755,14.6071606 Z"}))))}}]);
//# sourceMappingURL=CollectionCommentsPage~CommentsPage~Frontpage~ModListing~ModQueuePages~ModerationPages~Multireddit~N~0561de65.b553a30a1dc002e38208.js.map