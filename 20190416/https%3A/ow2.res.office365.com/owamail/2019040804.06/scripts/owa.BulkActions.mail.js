window.scriptsLoaded = window.scriptsLoaded || {}; window.scriptProcessStart = window.scriptProcessStart || {}; window.scriptProcessStart['owa.BulkActions.mail.js'] = (new Date()).getTime();(window.$wj=window.$wj||[]).push([[70],{2203:function(e,t,o){"use strict";o.d(t,"a",function(){return l});var r=o(0),n=o(3),i=o(237),a=Object(i.a)(),s=.01,l=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t._onRenderProgress=function(e){var o=t.props,r=o.ariaValueText,i=o.barHeight,l=o.className,c=o.styles,u=o.theme,d="number"==typeof t.props.percentComplete?Math.min(100,Math.max(0,100*t.props.percentComplete)):void 0,m=a(c,{theme:u,className:l,barHeight:i,indeterminate:void 0===d}),p={width:void 0!==d?d+"%":void 0,transition:void 0!==d&&d<s?"none":void 0},f=void 0!==d?0:void 0,g=void 0!==d?100:void 0,b=void 0!==d?Math.floor(d):void 0;return n.createElement("div",{className:m.itemProgress},n.createElement("div",{className:m.progressTrack}),n.createElement("div",{className:m.progressBar,style:p,role:"progressbar","aria-valuemin":f,"aria-valuemax":g,"aria-valuenow":b,"aria-valuetext":r}))},t}return r.__extends(t,e),t.prototype.render=function(){var e=this.props,t=e.barHeight,o=e.className,i=e.label,s=void 0===i?this.props.title:i,l=e.description,c=e.styles,u=e.theme,d=e.progressHidden,m=e.onRenderProgress,p=void 0===m?this._onRenderProgress:m,f="number"==typeof this.props.percentComplete?Math.min(100,Math.max(0,100*this.props.percentComplete)):void 0,g=a(c,{theme:u,className:o,barHeight:t,indeterminate:void 0===f});return n.createElement("div",{className:g.root},s?n.createElement("div",{className:g.itemName},s):null,d?null:p(r.__assign({},this.props,{percentComplete:f}),this._onRenderProgress),l?n.createElement("div",{className:g.itemDescription},l):null)},t.defaultProps={label:"",description:"",width:180},t}(n.Component)},2471:function(e,t,o){"use strict";var r=o(859),n=o(2203),i=o(18),a=o(344),s={root:"ms-ProgressIndicator",itemName:"ms-ProgressIndicator-itemName",itemDescription:"ms-ProgressIndicator-itemDescription",itemProgress:"ms-ProgressIndicator-itemProgress",progressTrack:"ms-ProgressIndicator-progressTrack",progressBar:"ms-ProgressIndicator-progressBar"},l=Object(i.keyframes)({"0%":{left:"-30%"},"100%":{left:"100%"}}),c=Object(i.keyframes)({"100%":{right:"-30%"},"0%":{right:"100%"}});o.d(t,"a",function(){return u});var u=Object(r.a)(n.a,function(e){var t,o,r=Object(a.a)(),n=e.className,u=e.indeterminate,d=e.theme,m=e.barHeight,p=void 0===m?2:m,f=d.palette,g=d.semanticColors,b=Object(i.getGlobalClassNames)(s,d),h=f.neutralLight;return{root:[b.root,d.fonts.medium,{fontWeight:i.FontWeights.regular},n],itemName:[b.itemName,i.noWrap,{color:g.bodyText,fontSize:i.FontSizes.medium,paddingTop:4,lineHeight:20}],itemDescription:[b.itemDescription,{color:g.bodySubtext,fontSize:i.FontSizes.xSmall,lineHeight:18}],itemProgress:[b.itemProgress,{position:"relative",overflow:"hidden",height:p,padding:"8px 0"}],progressTrack:[b.progressTrack,{position:"absolute",width:"100%",height:p,backgroundColor:h,selectors:(t={},t[i.HighContrastSelector]={borderBottom:"1px solid WindowText"},t)}],progressBar:[{backgroundColor:f.themePrimary,height:p,position:"absolute",transition:"width .3s ease",width:0,selectors:(o={},o[i.HighContrastSelector]={backgroundColor:"WindowText"},o)},u?{position:"absolute",minWidth:"33%",background:"linear-gradient(to right, "+h+" 0%, "+f.themePrimary+" 50%, "+h+" 100%)",animation:(r?c:l)+" 3s infinite"}:{transition:"width .15s linear"},b.progressBar]}},void 0,{scope:"ProgressIndicator"})},3801:function(e,t,o){"use strict";var r=o(4);t.a=Object(r.action)("clearTableViewLastEmptiedTime")(function(e){e.lastEmptiedTime=null})},5172:function(e,t,o){var r=o(5173),n=o(55);"string"==typeof r&&(r=[[e.i,r]]);for(var i=0;i<r.length;i++)n.loadStyles(r[i][1],!1);r.locals&&(e.exports=r.locals)},5173:function(e,t,o){(t=e.exports=o(54)(!1)).push([e.i,'.YujEmAUnBzMREsgue0gIr{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-flex:0;-ms-flex:0 0 auto;flex:0 0 auto;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-flow:column nowrap;flex-flow:column nowrap}html[dir] .YujEmAUnBzMREsgue0gIr{background-color:"[theme:white, default:#ffffff]";padding-top:6px}._2fd3uiw2ToYEU1wr2gnJz-{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center}._3Qbmi8h4Ok-9O4agoRfpZ5{justify-self:flex-end;width:100%}._1wk8OuAOOWks42qFW9QHeA{font-size:14px;font-weight:400;color:"[theme:neutralPrimary, default:#333333]";-webkit-box-flex:1;-ms-flex:1 1 auto;flex:1 1 auto}html[dir] ._1wk8OuAOOWks42qFW9QHeA{padding-bottom:2px}html[dir=ltr] ._1wk8OuAOOWks42qFW9QHeA{margin-right:16px}html[dir=rtl] ._1wk8OuAOOWks42qFW9QHeA{margin-left:16px}._1cQFcBFcxcQXzTY5BgQOP2{font-weight:600;color:"[theme:themePrimary, default:#0078D4]";cursor:pointer;-webkit-box-flex:0;-ms-flex:0 0 auto;flex:0 0 auto}html[dir] ._1cQFcBFcxcQXzTY5BgQOP2{padding-bottom:2px}html[dir=ltr] ._1cQFcBFcxcQXzTY5BgQOP2{margin-right:-5px}html[dir=rtl] ._1cQFcBFcxcQXzTY5BgQOP2{margin-left:-5px}html[dir=ltr] ._16ZxyvPhPH0Z6GVxJ710a9{margin-right:4px}html[dir=rtl] ._16ZxyvPhPH0Z6GVxJ710a9{margin-left:4px}._1LKZFqrltQT-vpKB8hE6KZ,._3it8iEH-df_CG_oGLrkn0e,.Dnko8aa_u2J-Cu4GO5qbz{width:16px;-webkit-box-flex:0;-ms-flex:0 0 auto;flex:0 0 auto}html[dir=ltr] ._1LKZFqrltQT-vpKB8hE6KZ,html[dir=ltr] ._3it8iEH-df_CG_oGLrkn0e,html[dir=ltr] .Dnko8aa_u2J-Cu4GO5qbz{margin-right:17px}html[dir=rtl] ._1LKZFqrltQT-vpKB8hE6KZ,html[dir=rtl] ._3it8iEH-df_CG_oGLrkn0e,html[dir=rtl] .Dnko8aa_u2J-Cu4GO5qbz{margin-left:17px}.Dnko8aa_u2J-Cu4GO5qbz{color:#107c10}._3it8iEH-df_CG_oGLrkn0e{color:#e81123}html[dir=ltr] ._37HeRfkrM_rLGVh4r9E4Q-{margin-left:7px}html[dir=rtl] ._37HeRfkrM_rLGVh4r9E4Q-{margin-right:7px}html[dir=ltr] ._2PH5_ZJ3psfvq5b6VOdE1S{margin-left:27px}html[dir=rtl] ._2PH5_ZJ3psfvq5b6VOdE1S{margin-right:27px}',""]),t.locals={bulkActionNotificationBarContainer:"YujEmAUnBzMREsgue0gIr",progressDetailsContainer:"_2fd3uiw2ToYEU1wr2gnJz-",progressIndicator:"_3Qbmi8h4Ok-9O4agoRfpZ5",contentText:"_1wk8OuAOOWks42qFW9QHeA",cancelButton:"_1cQFcBFcxcQXzTY5BgQOP2",menuButton:"_16ZxyvPhPH0Z6GVxJ710a9",statusIcon:"_1LKZFqrltQT-vpKB8hE6KZ",success:"Dnko8aa_u2J-Cu4GO5qbz",failure:"_3it8iEH-df_CG_oGLrkn0e",iconReadingPane:"_37HeRfkrM_rLGVh4r9E4Q-",iconNoReadingPane:"_2PH5_ZJ3psfvq5b6VOdE1S"}},7033:function(e,t,o){"use strict";o.r(t);var r=o(143),n=o(897),i=o.n(n),a=o(896),s=o.n(a),l=o(65),c=o.n(l),u=o(187),d=o.n(u),m=o(33),p=o.n(m),f=o(426),g=o.n(f),b=o(31);function h(e,t,o,r){var n=function(e,t){return s()({ParentFolderIds:[c()({Id:e})],ItemShape:d()({BaseShape:"IdOnly"}),ShapeName:"BulkActionItem",Traversal:"Shallow",Paging:t,FocusedViewFilter:-1,ViewFilter:"All",SortOrder:[g()({Order:"Descending",Path:p()({FieldURI:"ItemLastModifiedTime"})})]})}(r,o),a=Object(b.getJsonRequestHeader)();return a.RequestServerVersion="V2018_01_18",i()({Header:a,Body:n})}var k=o(7),v=o(355),x=o.n(v),A=o(0),_=o(42),w=o(636),B=o(134),C=o(1),O=Object(C.mutatorAction)("setBulkActionInformation",function(e,t){B.a.bulkActionInformationMap.set(e,t)}),T=o(229);var I=o(11);function y(e,t){void 0===e&&(e=0),void 0===t&&(t=10);var o=Object(k.a)().SessionSettings,r=o.DefaultFolderNames.indexOf("bulkactions"),n=o.DefaultFolderIds[r];n&&h(0,0,x()({BasePoint:"Beginning",Offset:0,MaxEntriesReturned:t}),n.Id).then(function(e){var t=e.Body.ResponseMessages.Items[0];t&&"Success"==t.ResponseClass&&t.RootFolder.Items&&function(e){var t,o;try{for(var r=A.__values(e),n=r.next();!n.done;n=r.next()){var i=n.value;if(i.BulkActionState==T.a.Running){var a=i.BulkActionTargetFolderId.Id,s=i.BulkActionProcessedCount/Math.max(1,i.BulkActionTotalCount),l={id:i.ItemId.Id,targetFolderName:Object(_.a)(a),sendTime:i.BulkActionSendTime,startTime:i.BulkActionStartTime,customData:i.BulkActionCustomData,class:i.BulkActionClass,state:i.BulkActionState,progress:{processedCount:i.BulkActionProcessedCount,percentComplete:s,totalCount:i.BulkActionTotalCount}};Object(w.a)(l,a)||O(a,l)}}}catch(e){t={error:e}}finally{try{n&&!n.done&&(o=r.return)&&o.call(r)}finally{if(t)throw t.error}}}(t.RootFolder.Items)}).catch(function(e){I.c.warn("Unable to update BulkActionStore via findBulkActionItemAction.")})}var F,P=o(650);var S=((F={})[0]=T.a.Uninitialized,F[5]=T.a.Timeout,F[1]=T.a.Running,F[2]=T.a.Cancelled,F[3]=T.a.Complete,F[4]=T.a.Failed,F);function N(e){var t=e.BulkActionTargetFolderId,o=function(e){var t=Object(B.b)().bulkActionInformationMap.get(e);return t?t.progress:null}(t),r=o?o.processedCount:0,n=r<e.BulkActionProcessedCount?e.BulkActionProcessedCount:r,i={class:e.BulkActionClass,customData:e.BulkActionCustomData,id:e.BulkActionId,targetFolderName:Object(_.a)(t),sendTime:e.BulkActionSendTime,startTime:e.BulkActionStartTime,state:S[e.BulkActionState],progress:{percentComplete:n/e.BulkActionTotalCount,processedCount:n,totalCount:e.BulkActionTotalCount}};Object(w.a)(i,t)||(O(t,i),Object(P.a)("TnS_BulkActionDatapoint",i))}var R=o(690),E=o(356);function j(e){switch(e.EventType){case"RowAdded":case"RowModified":N(e);break;case"RowDeleted":Object(R.a)(e.BulkActionTargetFolderId,r.b.Complete);break;case"Reload":y();break;default:I.c.error("BulkActionNotification should only be fired on (RowAdded, RowModified, RowDeleted, Reload)")}}function H(){E.f.importAndExecute({subscriptionId:"BulkActionNotification",requiresExplicitSubscribe:!0,subscriptionParameters:{NotificationType:"BulkActionNotification"}},j)}function D(e,t,o,n){var i={id:"",targetFolderName:Object(_.a)(e),startTime:"",sendTime:"",class:t,customData:o?JSON.stringify(o):"",state:r.b.Uninitialized,progress:{percentComplete:0,processedCount:0,totalCount:n}};O(e,i)}o.d(t,"subscribeToBulkActionNotification",function(){return H}),o.d(t,"onBulkActionSubmitted",function(){return D}),o.d(t,"findBulkActionItemAction",function(){return y})},7139:function(e,t,o){"use strict";o.r(t);var r=o(0),n=o(3),i=o(3801),a=o(229),s=o(20),l=o(8),c=o.n(l),u=o(10),d=o(11);var m=o(7),p=o(46),f=o(505),g=o(725),b=o(354),h=o(728),k=o(6),v=o(17),x=o(2471),A=o(5172),_=o(275),w=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.onClickDismiss=function(){Object(a.h)(t.folderId)},t.onClickStop=function(e){var o=k.H.tableViews.get(k.H.selectedTableViewId);Object(i.a)(o),Object(a.g)(t.folderId).then(function(t){t&&"EmptyFolder"==e&&Object(f.a)(o)})},t}return r.__extends(t,e),t.prototype.componentWillUnmount=function(){var e=a.j.bulkActionInformationMap.get(this.folderId);!e||e.state!==a.a.Complete&&e.state!==a.a.Cancelled||Object(a.h)(this.folderId)},t.prototype.render=function(){var e=this,t=k.H.tableViews.get(k.H.selectedTableViewId);this.folderId=t.tableQuery.folderId;var o=a.j.bulkActionInformationMap.get(this.folderId),r=this.getCustomData(o),i=r?r.Scenario:o.class,l=function(e,t,o){switch(e.state){case a.a.Complete:switch(t){case"EmptyFolder":return c.a.bulkAction_emptyFolderSuccess;case"Sweep":if(!o)return d.c.error("getBulkActionStatusText: customData is null"),"";var r=o,n=u.n.folderTable.get(r.destinationFolderId);return Object(s.format)(c.a.bulkAction_moveFromToSuccess,r.senderSMTPs.join(", "),n.DisplayName);case"RunRuleNow":var i=o;return Object(s.format)(c.a.bulkAction_runRuleSuccess,i.ruleName)}break;case a.a.Failed:case a.a.Timeout:var l=e.progress.totalCount-e.progress.processedCount;switch(t){case"EmptyFolder":return Object(s.format)(c.a.emptyFolderFailStatus,l);case"Sweep":return Object(s.format)(c.a.bulkAction_moveFromToFail,l);case"RunRuleNow":return Object(s.format)(c.a.bulkAction_runRuleNowFail,l)}break;case a.a.Cancelled:return c.a.bulkAction_canceled;case a.a.Cancelling:return c.a.bulkAction_canceling;case a.a.Uninitialized:case a.a.Running:var m=Object(s.format)(c.a.bulkAction_NofM,e.progress.processedCount,e.progress.totalCount);switch(t){case"EmptyFolder":return c.a.bulkAction_emptyingFolder+" "+m;case"Sweep":return o?(r=o,n=u.n.folderTable.get(r.destinationFolderId),Object(s.format)(c.a.bulkAction_movingFromTo,r.senderSMTPs.join(", "),n.DisplayName)):(d.c.error("getBulkActionStatusText: customData is null"),"");case"RunRuleNow":return i=o,Object(s.format)(c.a.bulkAction_runningRule,i.ruleName);default:throw new Error("Invalid bulk action scenario type")}}return c.a.bulkAction_genericStatus}(o,i,r),m=o.state===a.a.Running,p="RunRuleNow"==i||"Sweep"==i;return n.createElement("div",{className:A.bulkActionNotificationBarContainer},n.createElement("div",{className:A.progressDetailsContainer},this.getBulkActionStatusIcon(o,i),n.createElement("span",{className:A.contentText,title:l},l),m?n.createElement(g.ActionButton,{className:A.cancelButton,text:c.a.bulkAction_cancel,onClick:function(t){return e.onClickStop(i)}}):n.createElement(h.IconButton,{className:A.menuButton,onClick:function(t){return e.onClickDismiss()},iconProps:{iconName:"Cancel"}})),m&&!p&&n.createElement(x.a,{className:A.progressIndicator,percentComplete:o.progress.percentComplete}))},t.prototype.getCustomData=function(e){var t;try{t=e.customData&&JSON.parse(e.customData)}catch(e){d.c.warn("Invalid BulkAction custom data"+e),t=null}finally{return t}},t.prototype.getBulkActionStatusIcon=function(e,t){var o=Object(m.a)().UserOptions.GlobalReadingPanePositionReact==p.a.Right?A.iconReadingPane:A.iconNoReadingPane,r=null,i=A.statusIcon;switch(e.state){case a.a.Complete:r="CheckMark",i=A.success;break;case a.a.Failed:r="Error",i=A.failure;break;case a.a.Cancelled:r="Error";break;case a.a.Cancelling:default:r=this.getBulkActionSpecificIcon(t)}return n.createElement(b.a,{className:_(i,o),iconName:r})},t.prototype.getBulkActionSpecificIcon=function(e){switch(e){case"EmptyFolder":return"Delete";case"Sweep":return"Broom";case"RunRuleNow":return"Play";default:return"Help"}},t=r.__decorate([v.observer],t)}(n.Component);o.d(t,"BulkActionProgressBar",function(){return w})}},0,[2,3,8,9,66,7,23,62,279,51,280,57,283,80,300,186,100]]);
//# sourceMappingURL=owa.BulkActions.mail.js.map
window.scriptsLoaded['owa.BulkActions.mail.js'] = 1; window.scriptProcessEnd = window.scriptProcessEnd || {}; window.scriptProcessEnd['owa.BulkActions.mail.js'] = (new Date()).getTime();