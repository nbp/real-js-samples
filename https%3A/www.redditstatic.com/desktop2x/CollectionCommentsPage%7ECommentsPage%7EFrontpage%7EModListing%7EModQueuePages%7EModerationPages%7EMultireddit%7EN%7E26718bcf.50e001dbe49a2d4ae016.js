(window.webpackJsonp=window.webpackJsonp||[]).push([["CollectionCommentsPage~CommentsPage~Frontpage~ModListing~ModQueuePages~ModerationPages~Multireddit~N~26718bcf"],{"./src/reddit/components/AwardBadges/index.m.less":function(e,t,o){e.exports={awardBadges:"_2LeW9tc_6Fs1n7Ou8uD-70",gildCtaContainer:"_3sYCnvIxJkhkOfLVTWR67K",awardIconSvg:"_3sugPI9JaaOuFaBOcYLukU",awardIcon:"_3u6g9UTYlEOr-yfM5hyq3p",awardItem:"_2y3bja4n4-unxyUrMEFH8C",badgeButton:"_3mcXKZUh7FvUMLSv0AHyXs",icon:"_2J9jlNokb9X4gvrrZR3BX2"}},"./src/reddit/components/AwardBadges/index.tsx":function(e,t,o){"use strict";var n,r=o("./node_modules/react/index.js"),s=o.n(r),i=o("./node_modules/react-redux/es/index.js"),a=o("./node_modules/reselect/lib/index.js"),d=o("./bundled-modules/styled-components/styled-components.min.js"),c=o.n(d),l=o("./src/config.ts"),u=o("./src/lib/classNames/index.ts"),p=o("./src/app/actions/tooltip.ts"),m=o("./src/reddit/actions/gold/modals.ts"),b=o("./src/reddit/components/TrackingHelper/index.tsx"),f=o("./src/reddit/helpers/isPost.ts"),g=o("./src/reddit/selectors/user.ts"),h=o("./src/app/strings/index.ts"),v=o("./src/reddit/components/InfoTextTooltip/index.tsx"),y=o("./src/reddit/models/Theme/NewColorSystem/index.ts"),x=o("./src/reddit/components/AwardBadges/index.m.less"),w=o.n(x),O=(n="function"==typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103,function(e,t,o,r){var s=e&&e.defaultProps,i=arguments.length-3;if(t||0===i||(t={}),t&&s)for(var a in s)void 0===t[a]&&(t[a]=s[a]);else t||(t=s||{});if(1===i)t.children=r;else if(i>1){for(var d=Array(i),c=0;c<i;c++)d[c]=arguments[c+3];t.children=d}return{$$typeof:n,type:e,key:void 0===o?null:""+o,ref:null,props:t,_owner:null}});const j=Object(d.css)(["."," {color: ",";}"],w.a.awardItem,e=>Object(y.c)(e).metaText);class C extends s.a.PureComponent{constructor(){super(...arguments),this.onShowTooltip=(()=>{var e=this.props;return(0,e.onShowTooltip)(e.tooltipId)})}render(){var e=this.props;const t=e.className,o=e.count,n=e.language,r=e.onHideTooltip,i=e.postOrComment,a=e.tooltipMessageKey,d=e.tooltipId,c=this.props.icon;return O(s.a.Fragment,{},void 0,o>0&&O("span",{className:Object(u.a)(w.a.awardItem,t),onMouseEnter:this.onShowTooltip,onMouseLeave:r},void 0,O("i",{id:d},void 0,O(c,{className:w.a.awardIconSvg})),o>1&&o,O(v.b,{tooltipId:d,text:Object(h.d)(n,a,o,{count:o,postOrComment:Object(h.a)(n,`gold.postOrComment.${i}`)})})))}}var S=o("./node_modules/polished/dist/polished.es.js"),I=o("./src/reddit/icons/fonts/helpers.tsx"),M=function(){var e="function"==typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103;return function(t,o,n,r){var s=t&&t.defaultProps,i=arguments.length-3;if(o||0===i||(o={}),o&&s)for(var a in s)void 0===o[a]&&(o[a]=s[a]);else o||(o=s||{});if(1===i)o.children=r;else if(i>1){for(var d=Array(i),c=0;c<i;c++)d[c]=arguments[c+3];o.children=d}return{$$typeof:e,type:t,key:void 0===n?null:""+n,ref:null,props:o,_owner:null}}}();var k=e=>M("i",{className:Object(u.a)(Object(I.b)("addGild"),e.className)}),T=function(){var e="function"==typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103;return function(t,o,n,r){var s=t&&t.defaultProps,i=arguments.length-3;if(o||0===i||(o={}),o&&s)for(var a in s)void 0===o[a]&&(o[a]=s[a]);else o||(o=s||{});if(1===i)o.children=r;else if(i>1){for(var d=Array(i),c=0;c<i;c++)d[c]=arguments[c+3];o.children=d}return{$$typeof:e,type:t,key:void 0===n?null:""+n,ref:null,props:o,_owner:null}}}();var N=e=>T("i",{className:Object(u.a)(Object(I.b)("addGildDashed"),e.className)}),L=function(){var e="function"==typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103;return function(t,o,n,r){var s=t&&t.defaultProps,i=arguments.length-3;if(o||0===i||(o={}),o&&s)for(var a in s)void 0===o[a]&&(o[a]=s[a]);else o||(o=s||{});if(1===i)o.children=r;else if(i>1){for(var d=Array(i),c=0;c<i;c++)d[c]=arguments[c+3];o.children=d}return{$$typeof:e,type:t,key:void 0===n?null:""+n,ref:null,props:o,_owner:null}}}();const _=Object(d.css)(["."," {color: ",";&:focus,&:hover {outline: none;background-color: ",";}}"],w.a.badgeButton,e=>Object(y.c)(e).actionIcon,e=>Object(S.e)(Object(y.c)(e).navIcon,.1));var P=class extends s.a.PureComponent{constructor(){super(...arguments),this.state={isHovered:!1},this.handleMouseEnter=(()=>{this.setState({isHovered:!0})}),this.handleMouseLeave=(()=>{this.setState({isHovered:!1})})}render(){var e=this.props;const t=e.className,o=e.onClick,n=this.state.isHovered?k:N;return L("button",{className:Object(u.a)(w.a.badgeButton,t),onClick:o,onBlur:this.handleMouseLeave,onFocus:this.handleMouseEnter,onMouseEnter:this.handleMouseEnter,onMouseLeave:this.handleMouseLeave},void 0,L(n,{className:w.a.icon}))}};const B=(e,t)=>{let o=`${Object(f.a)(e)?"Post":"Comment"}AwardBadges--${e}`;return t&&(o=`${o}--${t}`),o};o.d(t,"c",function(){return F}),o.d(t,"a",function(){return H}),o.d(t,"b",function(){return Z});var $=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var o=arguments[t];for(var n in o)Object.prototype.hasOwnProperty.call(o,n)&&(e[n]=o[n])}return e},A=function(){var e="function"==typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103;return function(t,o,n,r){var s=t&&t.defaultProps,i=arguments.length-3;if(o||0===i||(o={}),o&&s)for(var a in s)void 0===o[a]&&(o[a]=s[a]);else o||(o=s||{});if(1===i)o.children=r;else if(i>1){for(var d=Array(i),c=0;c<i;c++)d[c]=arguments[c+3];o.children=d}return{$$typeof:e,type:t,key:void 0===n?null:""+n,ref:null,props:o,_owner:null}}}(),E=function(e,t){var o={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.indexOf(n)<0&&(o[n]=e[n]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var r=0;for(n=Object.getOwnPropertySymbols(e);r<n.length;r++)t.indexOf(n[r])<0&&(o[n[r]]=e[n[r]])}return o};const F=e=>A("img",{className:Object(u.a)(e.className,w.a.awardIcon),src:`${l.a.assetPath}/img/gold/badges/award-silver-cartoon.png`}),H=e=>A("img",{className:Object(u.a)(e.className,w.a.awardIcon),src:`${l.a.assetPath}/img/gold/badges/award-gold-cartoon.png`}),Z=e=>A("img",{className:Object(u.a)(e.className,w.a.awardIcon),src:`${l.a.assetPath}/img/gold/badges/award-platinum-cartoon.png`}),U=Object(i.connect)(()=>Object(a.createStructuredSelector)({currentUser:g.j,language:g.N}),(e,{thing:t})=>({onAddAward:()=>e(Object(m.d)(t.id)),onHideTooltip:()=>e(Object(p.f)()),onShowTooltip:t=>e(Object(p.d)({tooltipId:t}))}));t.d=c()(U(Object(b.b)(class extends s.a.Component{constructor(){super(...arguments),this.handleAddAward=(async()=>{var e=this.props;const t=e.onAddAward,n=e.sendEvent,r=e.thing;t(),n((0,(await o.e("gildTrackers").then(o.bind(null,"./src/reddit/helpers/trackers/gild.ts"))).clickAddAward)(r.id))})}render(){const e=this.props,t=e.className,o=e.currentUser,n=e.hideCta,r=(e.onAddAward,e.sendEvent,e.thing),i=e.tooltipType,a=E(e,["className","currentUser","hideCta","onAddAward","sendEvent","thing","tooltipType"]),d=Object(f.a)(r.id)?"post":"comment",c=B(r.id,i),l=r.gildings,p=!n&&o&&o.id!==r.authorId&&l&&(l.gid1>0||l.gid2>0||l.gid3>0);return A("div",{className:Object(u.a)(t,w.a.awardBadges,p?w.a.gildCtaContainer:"")},void 0,s.a.createElement(C,$({},a,{count:l?l.gid1:0,icon:F,postOrComment:d,tooltipMessageKey:"gold.awardBadge.silverTooltipMessage",tooltipId:`${c}-gid1`})),s.a.createElement(C,$({},a,{count:l?l.gid2:0,icon:H,postOrComment:d,tooltipMessageKey:"gold.awardBadge.goldTooltipMessage",tooltipId:`${c}-gid2`})),s.a.createElement(C,$({},a,{count:l?l.gid3:0,icon:Z,postOrComment:d,tooltipMessageKey:"gold.awardBadge.platinumTooltipMessage",tooltipId:`${c}-gid3`})),p&&A(P,{onClick:this.handleAddAward}))}}))).withConfig({componentId:"s1pkn5qd-0"})(["","",""],j,_)},"./src/reddit/components/ProfileIdCard/GildedLastMonth.tsx":function(e,t,o){"use strict";var n,r=o("./node_modules/react/index.js"),s=o.n(r),i=o("./node_modules/react-redux/es/index.js"),a=o("./src/lib/prettyPrintNumber/index.ts"),d=o("./src/app/actions/tooltip.ts"),c=o("./src/app/strings/index.ts"),l=o("./src/reddit/components/AwardBadges/index.tsx"),u=o("./src/reddit/components/InfoTextTooltip/index.tsx"),p=o("./src/reddit/components/ProfileIdCard/index.m.less"),m=o.n(p),b=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var o=arguments[t];for(var n in o)Object.prototype.hasOwnProperty.call(o,n)&&(e[n]=o[n])}return e},f=(n="function"==typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103,function(e,t,o,r){var s=e&&e.defaultProps,i=arguments.length-3;if(t||0===i||(t={}),t&&s)for(var a in s)void 0===t[a]&&(t[a]=s[a]);else t||(t=s||{});if(1===i)t.children=r;else if(i>1){for(var d=Array(i),c=0;c<i;c++)d[c]=arguments[c+3];t.children=d}return{$$typeof:n,type:e,key:void 0===o?null:""+o,ref:null,props:t,_owner:null}});const g={gid1:"gold.gildModal.awardSelector.silver.title",gid2:"gold.gildModal.awardSelector.gold.title",gid3:"gold.gildModal.awardSelector.platinum.title"};t.a=Object(i.connect)(void 0,e=>({toggleTooltip:t=>e(Object(d.e)({tooltipId:t}))}))(class extends s.a.PureComponent{constructor(){super(...arguments),this.toggleTooltip=(()=>{var e=this.props;const t=e.toggleTooltip,o=e.tooltipId;o&&t(o)})}getTooltipText(){var e=this.props;const t=e.gildings,o=e.language,n=Object.keys(t).filter(e=>t[e]).sort();switch(n.length){case 1:return Object(c.a)(o,"gold.gildedTooltip1",{count1:t[n[0]],title1:Object(c.a)(o,g[n[0]])});case 2:return Object(c.a)(o,"gold.gildedTooltip2",{count1:t[n[1]],title1:Object(c.a)(o,g[n[1]]),count2:t[n[0]],title2:Object(c.a)(o,g[n[0]])});case 3:return Object(c.a)(o,"gold.gildedTooltip3",{count1:t[n[2]],title1:Object(c.a)(o,g[n[2]]),count2:t[n[1]],title2:Object(c.a)(o,g[n[1]]),count3:t[n[0]],title3:Object(c.a)(o,g[n[0]])});default:return""}}render(){var e=this.props;const t=e.gildings,o=e.language,n=e.tooltipId,r=e.userName,i=n?{id:n,onMouseEnter:this.toggleTooltip,onMouseLeave:this.toggleTooltip}:{},d=Object.keys(t).filter(e=>t[e]).sort();if(!d.length)return null;const p=d[d.length-1];let h=0,v=0;for(const s in t)t[s]&&(v+=t[s],t[s]>h&&(h=t[s]));const y="gid1"===p&&f(l.c,{className:m.a.awardIcon})||"gid2"===p&&f(l.a,{className:m.a.awardIcon})||"gid3"===p&&f(l.b,{className:m.a.awardIcon})||null,x=g[p],w=Object(c.a)(o,x);return f(s.a.Fragment,{},void 0,s.a.createElement("a",b({className:m.a.GildedLastMonth,href:`/user/${r}/gilded`},i),f("div",{className:m.a.iconColumn},void 0,y,v>1&&f("span",{className:m.a.count},void 0,`+${Object(a.b)(v-1)}`)),f("div",{className:m.a.textColumn},void 0,v>h?Object(c.a)(o,"gold.gildedLastMonthMore",{award:w}):Object(c.a)(o,"gold.gildedLastMonth",{award:w}))),n&&f(u.b,{caretOnTop:!1,container:null,tooltipId:n,text:this.getTooltipText()}))}})},"./src/reddit/components/ProfileIdCard/index.m.less":function(e,t,o){e.exports={SnooIconWrapper:"_308WM6C-yV5iwS0Iy8nOfI",snooIconWrapper:"_308WM6C-yV5iwS0Iy8nOfI",actionItem:"_1l7CTV4NjDjmzX8DiiSgTL",GildedLastMonth:"_2fBB4fy1NGOVbL2SkveXXk",gildedLastMonth:"_2fBB4fy1NGOVbL2SkveXXk",textColumn:"_wi1DtT7oN7k_x5oIV8zm",iconColumn:"_32tzMaZn7x3dfQC5MXndJn",count:"_6xPPP5HdELF-SZJL8layH",awardIcon:"_2Eq8z6UD7I0ul3wnZ-YT80"}},"./src/reddit/components/SubscribeButton/Base.tsx":function(e,t,o){"use strict";o.d(t,"a",function(){return j}),o.d(t,"b",function(){return M}),o.d(t,"c",function(){return N});var n,r=o("./node_modules/react/index.js"),s=o.n(r),i=o("./bundled-modules/styled-components/styled-components.min.js"),a=o.n(i),d=o("./src/app/strings/index.ts"),c=o("./src/reddit/controls/Button/index.tsx"),l=o("./src/reddit/helpers/styles/mixins/fonts.tsx"),u=o("./src/reddit/icons/svgs/Checkmark/index.tsx"),p=o("./src/reddit/icons/svgs/Plus/index.tsx"),m=o("./src/reddit/models/Theme/NewColorSystem/index.ts"),b=o("./src/reddit/components/SubscribeButton/helpers/actionTemplateSource.ts"),f=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var o=arguments[t];for(var n in o)Object.prototype.hasOwnProperty.call(o,n)&&(e[n]=o[n])}return e},g=(n="function"==typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103,function(e,t,o,r){var s=e&&e.defaultProps,i=arguments.length-3;if(t||0===i||(t={}),t&&s)for(var a in s)void 0===t[a]&&(t[a]=s[a]);else t||(t=s||{});if(1===i)t.children=r;else if(i>1){for(var d=Array(i),c=0;c<i;c++)d[c]=arguments[c+3];t.children=d}return{$$typeof:n,type:e,key:void 0===o?null:""+o,ref:null,props:t,_owner:null}}),h=function(e,t){var o={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.indexOf(n)<0&&(o[n]=e[n]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var r=0;for(n=Object.getOwnPropertySymbols(e);r<n.length;r++)t.indexOf(n[r])<0&&(o[n[r]]=e[n[r]])}return o};const v=`\n  ${l.smallButtonFont}\n  padding: 4px 9px 2px;\n  width: 100%;\n`,y=`\n  ${l.largeButtonFont}\n  padding: 0 16px;\n`,x=a.a.button.withConfig({componentId:"vuhvmd-0"})(["",";border: 1px solid ",";border-radius: 4px;box-sizing: border-box;&:active,&:hover,&:disabled,&[disabled],&[data-disabled] {border: 1px solid ",";}"],c.s,e=>Object(m.c)(e).body,e=>Object(m.c)(e).body),w=Object(i.css)(["display: block;fill: ",";",""],e=>Object(m.c)(e).body,e=>e.small?"\n  height: 14px;\n  width: 14px;\n":"\n  height: 22px;\n  width: 22px;\n"),O=a()(p.a).withConfig({componentId:"vuhvmd-1"})(["",";"],w),j=a()(u.a).withConfig({componentId:"vuhvmd-2"})(["",";"],w),C=a()(e=>{e.border;var t=e.small,o=h(e,["border","small"]);return s.a.createElement(x,o,g(O,{small:t}))}).withConfig({componentId:"vuhvmd-3"})(["",""],e=>e.small?"":"\n  height: 24px;\n  padding: 0;\n  width: 24px;\n"),S=a()(e=>{var t=e.border,o=(e.small,h(e,["border","small"]));return t?s.a.createElement(c.d,o):s.a.createElement(c.l,o)}).withConfig({componentId:"vuhvmd-4"})(["",""],e=>e.small?v:y),I=e=>{var t=e.icon,o=h(e,["icon"]);return t?s.a.createElement(C,o):s.a.createElement(S,o)},M=a()(e=>{e.border,e.language;var t=e.small,o=(e.type,h(e,["border","language","small","type"]));return s.a.createElement(x,o,g(j,{small:t}))}).withConfig({componentId:"vuhvmd-5"})(["",""],e=>e.small?"":"\n  height: 24px;\n  padding: 0;\n  width: 24px;\n"),k=a()(e=>{var t=e.border,o=(e.language,e.small,e.type,h(e,["border","language","small","type"]));return t?s.a.createElement(c.g,o):s.a.createElement(c.l,o)}).withConfig({componentId:"vuhvmd-6"})(["","&::after {content: '","';}&:hover {&::after {content: '","';}}"],e=>e.small?v:y,e=>Object(d.a)(e.language,`subscriptions.${Object(b.a)(e)}.subscribed`),e=>Object(d.a)(e.language,`subscriptions.${Object(b.a)(e)}.unsubscribe`)),T=e=>{var t=e.icon,o=h(e,["icon"]);return t?s.a.createElement(M,o):s.a.createElement(k,o)};class N extends s.a.Component{constructor(){super(...arguments),this.onClick=(e=>{if(this.props.userIsSubscriber?this.props.onUnsubscribe():this.props.onSubscribe(),this.props.onClick&&this.props.onClick(e),this.props.getEventFactory){const e=this.props.getEventFactory(this.props.userIsSubscriber);e&&this.props.sendEvent(e)}})}componentDidMount(){this.props.onSubscriptionsRequested()}render(){var e=this.props,t=e.border;const o=void 0===t||t,n=e.className;var r=e.icon;const i=void 0!==r&&r,a=e.id,c=e.language;var l=e.small;const u=void 0!==l&&l,p=e.textVariant,m={border:o,className:n,icon:i,onClick:this.onClick,small:u};return this.props.userIsSubscriber?s.a.createElement(T,f({},m,{language:c,textVariant:p,type:this.props.identifier.type})):s.a.createElement(I,f({},m,{id:a}),this.props.children,Object(d.a)(c,`subscriptions.${Object(b.a)({textVariant:p,type:this.props.identifier.type})}.subscribe`))}}},"./src/reddit/components/SubscribeButton/helpers/actionTemplateSource.ts":function(e,t,o){"use strict";var n=o("./src/reddit/constants/experiments.ts");t.a=(({textVariant:e,type:t})=>e&&e!==n.i.Subscribe?"subreddit"===t?`subredditActions.${e}`:"profileActions":"subreddit"===t?"subredditActions":"profileActions")},"./src/reddit/components/SubscribeButton/index.tsx":function(e,t,o){"use strict";var n=o("./src/reddit/components/TrackingHelper/index.tsx"),r=o("./src/reddit/connectors/SubscribeButton/index.ts"),s=o("./src/reddit/components/SubscribeButton/Base.tsx");t.a=Object(r.a)(Object(n.b)(s.c))},"./src/reddit/connectors/SubscribeButton/index.ts":function(e,t,o){"use strict";var n=o("./node_modules/react-redux/es/index.js"),r=o("./node_modules/reselect/lib/index.js"),s=o("./src/reddit/actions/subscription.ts"),i=o("./src/reddit/selectors/experiments/subscribeText.ts"),a=o("./src/reddit/selectors/monthsToMinutes.ts"),d=o("./src/reddit/selectors/subreddit.ts"),c=o("./src/reddit/selectors/user.ts");t.a=Object(n.connect)(()=>Object(r.createStructuredSelector)({language:c.N,subscribeReminderTooltipId:a.q,subscribeTooltipId:a.r,textVariant:i.b,userIsSubscriber:d.N}),(e,{identifier:t})=>({onSubscribe:()=>e(s.g(t,!0)),onSubscriptionsRequested:()=>e(s.h()),onUnsubscribe:()=>e(s.g(t,!1))}))},"./src/reddit/controls/Dropdown/Row.tsx":function(e,t,o){"use strict";o.d(t,"a",function(){return f}),o.d(t,"d",function(){return g}),o.d(t,"b",function(){return v});var n,r=o("./node_modules/react/index.js"),s=o.n(r),i=o("./bundled-modules/styled-components/styled-components.min.js"),a=o.n(i),d=o("./src/reddit/controls/UnstyledInternalLink/index.tsx"),c=o("./src/reddit/helpers/styles/mixins/fonts.tsx"),l=o("./src/reddit/layout/row/InlineButton/index.tsx"),u=o("./src/reddit/models/Theme/NewColorSystem/index.ts"),p=o("./node_modules/lodash/throttle.js"),m=o.n(p),b=(n="function"==typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103,function(e,t,o,r){var s=e&&e.defaultProps,i=arguments.length-3;if(t||0===i||(t={}),t&&s)for(var a in s)void 0===t[a]&&(t[a]=s[a]);else t||(t=s||{});if(1===i)t.children=r;else if(i>1){for(var d=Array(i),c=0;c<i;c++)d[c]=arguments[c+3];t.children=d}return{$$typeof:n,type:e,key:void 0===o?null:""+o,ref:null,props:t,_owner:null}});const f=a.a.div.withConfig({componentId:"s1n9jir3-0"})(["display: inline-block;vertical-align: middle;margin-right: 2px;width: 20px;"]),g="\n  fill: currentColor;\n  display: block;\n  margin: 0 auto;\n  height: 16px;\n  width: 16px;\n",h=a.a.span.withConfig({componentId:"s1n9jir3-1"})(["display: inline-block;"]);class v extends s.a.Component{constructor(){super(...arguments),this.handleMouseMove=m()(()=>{const e=this.props;e.handleActivateRow&&e.handleActivateRow(e.index)},500)}render(){const e=this.props;return e.href?b(d.a,{id:e.id,className:e.className,onBlur:e.onBlur,onClick:e.onClick,onMouseMove:this.handleMouseMove,onKeyDown:e.onKeydown,role:"menuitem",to:e.href},void 0,e.children&&b(f,{},void 0,e.children),b(h,{},void 0,e.displayText)):b(l.a,{id:e.id,className:e.className,onBlur:e.onBlur,onClick:e.onClick,onKeyDown:e.onKeydown,onMouseMove:m()(this.handleMouseMove,500),role:"menuitem"},void 0,e.children&&(e.noIcon?b("div",{},void 0,e.children):b(f,{},void 0,e.children)),e.displayText&&b(h,{},void 0,e.displayText))}}t.c=a()(v).withConfig({componentId:"s1n9jir3-2"})(["","color: ",";fill: ",";background-color: ",";border: "," solid 1px;display: block;padding: 8px;text-transform: capitalize;white-space: nowrap;","","&:focus {background-color: ",";border-color: ",";color: ",";fill: ",";outline: none;}"],c.titleFontH5,e=>e.isSelected?Object(u.c)(e).button:Object(u.c)(e).actionIcon,e=>e.isSelected?Object(u.c)(e).button:Object(u.c)(e).actionIcon,e=>Object(u.c)(e).body,e=>Object(u.c)(e).line,"",e=>e.noHover?"":"\n    &:active,\n    &:hover,\n  ",e=>Object(u.c)(e).highlight,e=>Object(u.c)(e).highlight,e=>e.isSelected?Object(u.c)(e).button:Object(u.c)(e).bodyText,e=>e.isSelected?Object(u.c)(e).button:Object(u.c)(e).bodyText)},"./src/reddit/controls/UnstyledInternalLink/index.tsx":function(e,t,o){"use strict";var n=o("./bundled-modules/styled-components/styled-components.min.js"),r=o.n(n),s=o("./src/reddit/controls/InternalLink/index.tsx");t.a=r()(s.a).withConfig({componentId:"s1fauk9w-0"})(["text-decoration: none;fill: currentColor;color: inherit;"])},"./src/reddit/icons/svgs/Checkmark/index.tsx":function(e,t,o){"use strict";o("./node_modules/react/index.js");var n,r=(n="function"==typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103,function(e,t,o,r){var s=e&&e.defaultProps,i=arguments.length-3;if(t||0===i||(t={}),t&&s)for(var a in s)void 0===t[a]&&(t[a]=s[a]);else t||(t=s||{});if(1===i)t.children=r;else if(i>1){for(var d=Array(i),c=0;c<i;c++)d[c]=arguments[c+3];t.children=d}return{$$typeof:n,type:e,key:void 0===o?null:""+o,ref:null,props:t,_owner:null}});t.a=(e=>r("svg",{className:e.className,viewBox:"0 0 20 22",xmlns:"http://www.w3.org/2000/svg"},void 0,r("g",{},void 0,r("path",{d:"M8.9310375,15.1995 C8.70135,15.41825 8.38963125,15.541375 8.0647875,15.541375 C8.052975,15.541375 8.04181875,15.54075 8.03000625,15.54075 C7.69335,15.531375 7.37506875,15.39075 7.15063125,15.151375 L4.0879125,11.88075 C3.637725,11.400125 3.68169375,10.662625 4.18700625,10.23325 C4.6916625,9.805125 5.4660375,9.846375 5.91688125,10.327625 L8.115975,12.676375 L14.8550063,6.25825 C15.3327563,5.802625 16.1091,5.802625 16.5875063,6.25825 C17.0659125,6.71325 17.0659125,7.452625 16.5875063,7.907625 L8.9310375,15.1995 Z",fill:"inherit"}))))},"./src/reddit/icons/svgs/Karma/index.tsx":function(e,t,o){"use strict";o("./node_modules/react/index.js");var n,r=(n="function"==typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103,function(e,t,o,r){var s=e&&e.defaultProps,i=arguments.length-3;if(t||0===i||(t={}),t&&s)for(var a in s)void 0===t[a]&&(t[a]=s[a]);else t||(t=s||{});if(1===i)t.children=r;else if(i>1){for(var d=Array(i),c=0;c<i;c++)d[c]=arguments[c+3];t.children=d}return{$$typeof:n,type:e,key:void 0===o?null:""+o,ref:null,props:t,_owner:null}});t.a=(e=>r("svg",{className:e.className,viewBox:"0 0 20 20",version:"1.1",xmlns:"http://www.w3.org/2000/svg"},void 0,r("g",{},void 0,r("path",{d:"M6.42528593,9.54562407 C4.41043013,8.02026355 3.10790651,5.60355545 3.10790651,2.88165092 L3.10790651,2.79711586 L3.19244157,2.79711586 C5.9143461,2.79711586 8.33136499,4.09963948 9.85641472,6.11449528 C8.02399304,6.25279712 6.56358777,7.7128916 6.42528593,9.54562407 Z M6.42528593,10.2560915 C6.56358777,12.088824 8.02399304,13.5489184 9.85641472,13.6872203 C8.33136499,15.7020761 5.9143461,17.0045997 3.19244157,17.0045997 L3.10790651,17.0045997 L3.10790651,16.9200646 C3.10790651,14.1981601 4.41043013,11.781452 6.42528593,10.2560915 Z M13.6872203,10.2560915 C15.7020761,11.781452 17.0045997,14.1981601 17.0045997,16.9200646 L17.0045997,17.0045997 L16.9200646,17.0045997 C14.1981601,17.0045997 11.7811412,15.7020761 10.2560915,13.6872203 C12.0885132,13.5489184 13.5486077,12.088824 13.6872203,10.2560915 Z M16.9200646,2.79711586 L17.0045997,2.79711586 L17.0045997,2.88165092 C17.0045997,5.60324465 15.7020761,8.02026355 13.6872203,9.54562407 C13.5489184,7.7128916 12.0885132,6.25279712 10.2560915,6.11449528 C11.7811412,4.09963948 14.1981601,2.79711586 16.9200646,2.79711586 Z M19.9403282,9.84895574 L20,9.90862755 L19.9403282,9.96829935 C18.9346096,10.9740179 17.7346469,11.6624192 16.46227,12.0474888 C15.9659373,11.2534187 15.3446668,10.5308304 14.6071606,9.90862755 C15.3446668,9.28642466 15.9659373,8.5638364 16.46227,7.76976629 C17.7346469,8.1548359 18.9346096,8.8432372 19.9403282,9.84895574 Z M9.90862755,5.39283938 C9.28642466,4.65533317 8.5638364,4.03406266 7.76976629,3.53772999 C8.1548359,2.26535306 8.8432372,1.06539035 9.84895574,0.0596718051 L9.90862755,0 L9.96829935,0.0596718051 C10.9740179,1.06539035 11.6624192,2.26535306 12.0474888,3.53772999 C11.2534187,4.03406266 10.5308304,4.65533317 9.90862755,5.39283938 Z M5.39283938,9.90862755 C4.65533317,10.5308304 4.03406266,11.2534187 3.53772999,12.0474888 C2.26535306,11.6624192 1.06539035,10.9740179 0.0596718051,9.96829935 L0,9.90862755 L0.0596718051,9.84895574 C1.06539035,8.8432372 2.26535306,8.1548359 3.53772999,7.76976629 C4.03406266,8.5638364 4.65533317,9.28642466 5.39283938,9.90862755 Z M9.90862755,14.6071606 C10.5308304,15.3446668 11.2534187,15.9659373 12.0474888,16.46227 C11.6624192,17.7346469 10.9740179,18.9346096 9.96829935,19.9403282 L9.90862755,20 L9.84895574,19.9403282 C8.8432372,18.9346096 8.1548359,17.7346469 7.76976629,16.46227 C8.5638364,15.9659373 9.28642466,15.3446668 9.90862755,14.6071606 Z"}))))},"./src/reddit/selectors/experiments/subscribeText.ts":function(e,t,o){"use strict";o.d(t,"b",function(){return i}),o.d(t,"a",function(){return a});var n=o("./src/reddit/constants/experiments.ts"),r=o("./src/reddit/helpers/chooseVariant/index.ts"),s=o("./src/reddit/selectors/monthsToMinutes.ts");const i=e=>{const t=Object(r.b)(e,{experimentEligibilitySelector:r.a,experimentName:n.e});return Object(n.L)(t)?void 0:t},a=e=>{const t=Object(s.m)(e),o=(e=>{const t=Object(r.b)(e,{experimentEligibilitySelector:r.a,experimentName:n.e});return t===n.i.AddToHome||t===n.i.Follow||t===n.i.Join||t===n.i.Subscribe})(e);return t||o}}}]);
//# sourceMappingURL=CollectionCommentsPage~CommentsPage~Frontpage~ModListing~ModQueuePages~ModerationPages~Multireddit~N~26718bcf.50e001dbe49a2d4ae016.js.map