window.scriptsLoaded = window.scriptsLoaded || {}; window.scriptProcessStart = window.scriptProcessStart || {}; window.scriptProcessStart['owa.GetStarted.mail.js'] = (new Date()).getTime();(window.$wj=window.$wj||[]).push([[115],{2203:function(e,t,r){"use strict";r.d(t,"a",function(){return c});var n=r(0),i=r(3),o=r(237),s=Object(o.a)(),a=.01,c=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t._onRenderProgress=function(e){var r=t.props,n=r.ariaValueText,o=r.barHeight,c=r.className,l=r.styles,d=r.theme,m="number"==typeof t.props.percentComplete?Math.min(100,Math.max(0,100*t.props.percentComplete)):void 0,p=s(l,{theme:d,className:c,barHeight:o,indeterminate:void 0===m}),u={width:void 0!==m?m+"%":void 0,transition:void 0!==m&&m<a?"none":void 0},h=void 0!==m?0:void 0,g=void 0!==m?100:void 0,f=void 0!==m?Math.floor(m):void 0;return i.createElement("div",{className:p.itemProgress},i.createElement("div",{className:p.progressTrack}),i.createElement("div",{className:p.progressBar,style:u,role:"progressbar","aria-valuemin":h,"aria-valuemax":g,"aria-valuenow":f,"aria-valuetext":n}))},t}return n.__extends(t,e),t.prototype.render=function(){var e=this.props,t=e.barHeight,r=e.className,o=e.label,a=void 0===o?this.props.title:o,c=e.description,l=e.styles,d=e.theme,m=e.progressHidden,p=e.onRenderProgress,u=void 0===p?this._onRenderProgress:p,h="number"==typeof this.props.percentComplete?Math.min(100,Math.max(0,100*this.props.percentComplete)):void 0,g=s(l,{theme:d,className:r,barHeight:t,indeterminate:void 0===h});return i.createElement("div",{className:g.root},a?i.createElement("div",{className:g.itemName},a):null,m?null:u(n.__assign({},this.props,{percentComplete:h}),this._onRenderProgress),c?i.createElement("div",{className:g.itemDescription},c):null)},t.defaultProps={label:"",description:"",width:180},t}(i.Component)},2471:function(e,t,r){"use strict";var n=r(859),i=r(2203),o=r(18),s=r(344),a={root:"ms-ProgressIndicator",itemName:"ms-ProgressIndicator-itemName",itemDescription:"ms-ProgressIndicator-itemDescription",itemProgress:"ms-ProgressIndicator-itemProgress",progressTrack:"ms-ProgressIndicator-progressTrack",progressBar:"ms-ProgressIndicator-progressBar"},c=Object(o.keyframes)({"0%":{left:"-30%"},"100%":{left:"100%"}}),l=Object(o.keyframes)({"100%":{right:"-30%"},"0%":{right:"100%"}});r.d(t,"a",function(){return d});var d=Object(n.a)(i.a,function(e){var t,r,n=Object(s.a)(),i=e.className,d=e.indeterminate,m=e.theme,p=e.barHeight,u=void 0===p?2:p,h=m.palette,g=m.semanticColors,f=Object(o.getGlobalClassNames)(a,m),_=h.neutralLight;return{root:[f.root,m.fonts.medium,{fontWeight:o.FontWeights.regular},i],itemName:[f.itemName,o.noWrap,{color:g.bodyText,fontSize:o.FontSizes.medium,paddingTop:4,lineHeight:20}],itemDescription:[f.itemDescription,{color:g.bodySubtext,fontSize:o.FontSizes.xSmall,lineHeight:18}],itemProgress:[f.itemProgress,{position:"relative",overflow:"hidden",height:u,padding:"8px 0"}],progressTrack:[f.progressTrack,{position:"absolute",width:"100%",height:u,backgroundColor:_,selectors:(t={},t[o.HighContrastSelector]={borderBottom:"1px solid WindowText"},t)}],progressBar:[{backgroundColor:h.themePrimary,height:u,position:"absolute",transition:"width .3s ease",width:0,selectors:(r={},r[o.HighContrastSelector]={backgroundColor:"WindowText"},r)},d?{position:"absolute",minWidth:"33%",background:"linear-gradient(to right, "+_+" 0%, "+h.themePrimary+" 50%, "+_+" 100%)",animation:(n?l:c)+" 3s infinite"}:{transition:"width .15s linear"},f.progressBar]}},void 0,{scope:"ProgressIndicator"})},5304:function(e,t,r){var n=r(5305),i=r(55);"string"==typeof n&&(n=[[e.i,n]]);for(var o=0;o<n.length;o++)i.loadStyles(n[o][1],!1);n.locals&&(e.exports=n.locals)},5305:function(e,t,r){(t=e.exports=r(54)(!1)).push([e.i,'._2VYzjSvdIv3mLFkjU4sAPX{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;font-family:Segoe UI,Tahoma,Geneva,Verdana,sans-serif;font-size:14px}html[dir] ._2VYzjSvdIv3mLFkjU4sAPX{padding-top:14px;padding-bottom:15px}._2An-8Nr78OnA0Suj9g0Gt1{cursor:pointer}._2An-8Nr78OnA0Suj9g0Gt1:hover ._1UMvVELHNqKAy_fLKONwPZ{color:"[theme:black, default:#000000]"}._2An-8Nr78OnA0Suj9g0Gt1:hover ._3ewGwKcWeQxLE62NNvoSbu{display:none}._2An-8Nr78OnA0Suj9g0Gt1:hover ._3k7wRrkPktl_atDJ_O_2cd{display:block}._2589J0Kr5zrt3_ltbffF2s{cursor:pointer}._2Mkc_W55PASU02pLIUuHgM{font-size:20px;color:"[theme:neutralTertiary, default:#a6a6a6]"}.iPkPPfmmqfGoGqVII-7sg{color:"[theme:themePrimary, default:#0078D4]"}._1UMvVELHNqKAy_fLKONwPZ{display:-webkit-box;display:-ms-flexbox;display:flex;color:"[theme:neutralPrimary, default:#333333]"}.F2wJKUxRIM83yBCciuPFK{font-size:20px}html[dir=ltr] ._1h1vhAotNOig-bAWrFnguE{padding-left:25px}html[dir=rtl] ._1h1vhAotNOig-bAWrFnguE{padding-right:25px}._3ewGwKcWeQxLE62NNvoSbu{display:block}._3k7wRrkPktl_atDJ_O_2cd{display:none}',""]),t.locals={getStartedTask:"_2VYzjSvdIv3mLFkjU4sAPX",pendingTask:"_2An-8Nr78OnA0Suj9g0Gt1",taskItem:"_1UMvVELHNqKAy_fLKONwPZ",pendingIcon:"_3ewGwKcWeQxLE62NNvoSbu",pendingIconHovered:"_3k7wRrkPktl_atDJ_O_2cd",completedTask:"_2589J0Kr5zrt3_ltbffF2s",statusIcon:"_2Mkc_W55PASU02pLIUuHgM",completedIcon:"iPkPPfmmqfGoGqVII-7sg",prefixIcon:"F2wJKUxRIM83yBCciuPFK",description:"_1h1vhAotNOig-bAWrFnguE"}},5306:function(e,t,r){var n=r(5307),i=r(55);"string"==typeof n&&(n=[[e.i,n]]);for(var o=0;o<n.length;o++)i.loadStyles(n[o][1],!1);n.locals&&(e.exports=n.locals)},5307:function(e,t,r){(t=e.exports=r(54)(!1)).push([e.i,'html[dir] ._1U0xzN1sTDU1RDyMh5XErs{padding-top:12px}._1U0xzN1sTDU1RDyMh5XErs .ms-ProgressIndicator-itemProgress{height:7px;width:80%}html[dir=ltr] ._1U0xzN1sTDU1RDyMh5XErs .ms-ProgressIndicator-itemProgress{float:left}html[dir=rtl] ._1U0xzN1sTDU1RDyMh5XErs .ms-ProgressIndicator-itemProgress{float:right}._1U0xzN1sTDU1RDyMh5XErs .ms-ProgressIndicator-progressTrack{height:7px}html[dir] ._1U0xzN1sTDU1RDyMh5XErs .ms-ProgressIndicator-progressTrack{border-radius:9px}._1U0xzN1sTDU1RDyMh5XErs .ms-ProgressIndicator-progressBar{height:7px}html[dir] ._1U0xzN1sTDU1RDyMh5XErs .ms-ProgressIndicator-progressBar{border-radius:9px}._1U0xzN1sTDU1RDyMh5XErs .ms-ProgressIndicator-itemDescription{color:"[theme:themePrimary, default:#0078D4]";font-size:14px;width:20%}html[dir=ltr] ._1U0xzN1sTDU1RDyMh5XErs .ms-ProgressIndicator-itemDescription{float:left;text-align:right}html[dir=rtl] ._1U0xzN1sTDU1RDyMh5XErs .ms-ProgressIndicator-itemDescription{float:right;text-align:left}',""]),t.locals={progress:"_1U0xzN1sTDU1RDyMh5XErs"}},6982:function(e,t,r){"use strict";r.r(t);var n=r(0),i=r(17),o=r(2471),s=r(715),a=r.n(s),c=r(3),l=r(1293),d=r(1704);var m=r(354),p=r(12),u=r(4),h=Object(u.action)("clickGetStartedTask")(function(e){return n.__awaiter(this,void 0,void 0,function(){var t,r;return n.__generator(this,function(n){return t=Object(l.a)(),r=t.tasks[e],Object(p.k)("GetStartedTaskClicked",[r.identity],{isCore:!0}),r.clicked=!0,[2]})})}),g=r(1688),f=r(5304),_=r(275),v=function(e){function t(t){var r=e.call(this,t)||this;r.onClick=function(e){r.props.onClick&&(h(r.index),r.props.onClick())};var n=Object(l.a)();return r.index=n.tasks.map(function(e){return e.identity}).indexOf(t.identity),r}return n.__extends(t,e),t.prototype.componentDidMount=function(){this.index>-1&&Object(p.k)("GetStartedTaskShown",[this.props.identity,this.isCompleted],{isCore:!0})},Object.defineProperty(t.prototype,"isCompleted",{get:function(){return Object(l.a)().tasks[this.index].status===g.a.Completed},enumerable:!0,configurable:!0}),t.prototype.render=function(){var e=this;return this.index>-1&&c.createElement("div",{className:_(f.getStartedTask,this.isCompleted?f.completedTask:f.pendingTask),onClick:function(t){return e.onClick(t)}},c.createElement("div",{className:f.taskItem},c.createElement(m.a,{className:f.prefixIcon,iconName:this.props.iconName}),c.createElement("div",{className:f.description},this.props.description)),this.isCompleted?c.createElement(m.a,{className:_(f.statusIcon,f.completedIcon),iconName:"CompletedSolid"}):c.createElement("div",null,c.createElement(m.a,{className:_(f.statusIcon,f.pendingIcon),iconName:"CircleRing"}),c.createElement(m.a,{className:_(f.statusIcon,f.pendingIconHovered),iconName:"Completed"})))},t=n.__decorate([i.observer],t)}(c.Component),b=r(1),k=r(56),y="ows/api/v1.0/getstarted/tasks";function x(e){return Object(k.e)(y+"/"+e,{id:e})}var N,P=Object(u.action)("completeGetStartedTask")(function(e){return n.__awaiter(this,void 0,void 0,function(){var t,r,i,o,s,a,c;return n.__generator(this,function(d){switch(d.label){case 0:if(!((i=Object(l.a)()).tasks&&i.tasks.length>1))return[3,8];d.label=1;case 1:d.trys.push([1,6,7,8]),o=n.__values(i.tasks),s=o.next(),d.label=2;case 2:return s.done?[3,5]:(a=s.value).identity!==e||a.status!==g.a.Incomplete?[3,4]:(Object(p.k)("GetStartedTaskCompleted",[e,a.clicked],{isCore:!0}),[4,x(e)]);case 3:d.sent(),a.status=g.a.Completed,d.label=4;case 4:return s=o.next(),[3,2];case 5:return[3,8];case 6:return c=d.sent(),t={error:c},[3,8];case 7:try{s&&!s.done&&(r=o.return)&&r.call(o)}finally{if(t)throw t.error}return[7];case 8:return[2]}})})});!function(e){e.SetupAccount="SetupAccount",e.ConnectStorageAccount="ConnectStorageAccount",e.SetSignature="SetSignature",e.SendAnEmail="SendAnEmail",e.ChooseYourTheme="ChooseYourTheme",e.DownloadMobile="DownloadMobile",e.PremiumUpsell="PremiumUpsell",e.AddInterestingCalendar="AddInterestingCalendar",e.UpdateProfileImage="UpdateProfileImage",e.ImportContact="ImportContact",e.GetAddin="GetAddin",e.ExploreHelp="GetHelp"}(N||(N={}));var w=Object(b.action)("PREMIUM_UPSELL");Object(b.orchestrator)(w,function(){window.open("https://go.microsoft.com/fwlink/?linkid=867712&WT.mc_id=PROD_OL-Web_InApp_GetStarted_Upgrade&ep"),P(N.PremiumUpsell)});var S={identity:N.PremiumUpsell,iconName:"Diamond",description:a.a.task_Upgrade_Premium,onClick:w},O=r(66),I=r(221),C=r(7),j=r(20),E=Object(b.action)("SEND_AN_EMAIL");Object(b.orchestrator)(E,function(){var e=Object(C.a)().SessionSettings.UserEmailAddress;I.c.importAndExecute("GetStarted",void 0,void 0,Object(j.format)(a.a.task_Send_Email_Subject,e),Object(j.format)(a.a.task_Send_Email_Body,e))}),Object(b.orchestrator)(O.B,function(e){P(N.SendAnEmail)});var U={identity:N.SendAnEmail,iconName:"Send",description:a.a.task_Send_Email,onClick:E},D={identity:N.SetupAccount,iconName:"Mail",description:a.a.task_Setup_Account},T=Object(b.action)("DOWNLOAD_MOBILE");Object(b.orchestrator)(T,function(){window.open("https://go.microsoft.com/fwlink/?linkid=875115"),P(N.DownloadMobile)});var A={identity:N.DownloadMobile,iconName:"CellPhone",description:a.a.task_Get_Mobile,onClick:T},M=r(1008),G=Object(b.action)("IMPORT_CONTACT");Object(b.orchestrator)(G,function(){window.open(Object(M.a)()+"import"),P(N.ImportContact)});var z={identity:N.ImportContact,iconName:"People",description:a.a.task_Import_Contacts,onClick:G},R=r(5306),L=[D,z,U,A,S],H=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return n.__extends(t,e),t.prototype.render=function(){var e,t,r=(e=Object(l.a)(),t=Object(d.a)(),(e.tasks.length-t)/e.tasks.length),i=L.map(function(e){return c.createElement(v,n.__assign({key:e.identity},e))});return c.createElement("div",null,i,c.createElement("div",{className:R.progress},c.createElement(o.a,{label:a.a.getStarted_ProgressBar_Text,description:Math.round(100*r)+"%",percentComplete:r})))},t=n.__decorate([i.observer],t)}(c.Component),W=r(5),F=r(190),K="ows/api/v1.0/getstarted/tasks/pending";function X(){return n.__awaiter(this,void 0,void 0,function(){var e;return n.__generator(this,function(t){switch(t.label){case 0:return[4,Object(k.b)(K,void 0,!0)];case 1:return e=t.sent(),Object(F.a)(e.status)?[2,e.json()]:[2,void 0]}})})}function B(e){return n.__awaiter(this,void 0,void 0,function(){var t,r,i,o,s,a,c;return n.__generator(this,function(l){switch(l.label){case 0:if(i=L[e].policy,o=!0,!i)return[3,2];if(i.features&&i.features.length>0)try{for(s=n.__values(i.features),a=s.next();!a.done;a=s.next())c=a.value,o=o&&Object(W.d)(c)}catch(e){t={error:e}}finally{try{a&&!a.done&&(r=s.return)&&r.call(s)}finally{if(t)throw t.error}}return o&&i.isOn?[4,i.isOn()]:[3,2];case 1:o=l.sent(),l.label=2;case 2:return[2,o]}})})}var V=Object(u.action)("initializeGetStartedTasks")(function(){return n.__awaiter(this,void 0,void 0,function(){var e,t,r,i,o,s,a,c,d,m,p,u,h;return n.__generator(this,function(f){switch(f.label){case 0:return[4,X()];case 1:if(!(r=f.sent()))return[3,12];if((i=Object(l.a)()).tasks=[],o=[],!(r.length>0))return[3,12];o.push({identity:N.SetupAccount,status:g.a.Completed,clicked:!1}),s=r.map(function(e){return{identity:e.identity,status:e.status,clicked:!1}}),a=L.map(function(e){return e.identity}),f.label=2;case 2:f.trys.push([2,9,10,11]),c=n.__values(s),d=c.next(),f.label=3;case 3:return d.done?[3,8]:(m=d.value,p=a.indexOf(m.identity),(u=p>=0)?[4,B(p)]:[3,5]);case 4:u=f.sent(),f.label=5;case 5:return u?(o.push(m),m.status!==g.a.Completed&&L[p].onInit?[4,L[p].onInit(m)]:[3,7]):[3,7];case 6:f.sent(),f.label=7;case 7:return d=c.next(),[3,3];case 8:return[3,11];case 9:return h=f.sent(),e={error:h},[3,11];case 10:try{d&&!d.done&&(t=c.return)&&t.call(c)}finally{if(e)throw e.error}return[7];case 11:i.tasks=o,f.label=12;case 12:return[2]}})})});r.d(t,"GetStartedTaskContainer",function(){return H}),r.d(t,"initializeGetStartedTasks",function(){return V})}},0,[0,1,3,4,162,279,51,280,57,283,80,72,171,182,236]]);
//# sourceMappingURL=owa.GetStarted.mail.js.map
window.scriptsLoaded['owa.GetStarted.mail.js'] = 1; window.scriptProcessEnd = window.scriptProcessEnd || {}; window.scriptProcessEnd['owa.GetStarted.mail.js'] = (new Date()).getTime();