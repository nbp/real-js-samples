(window.webpackJsonp=window.webpackJsonp||[]).push([[156],{"+1F+":function(e,t,n){},GyBV:function(e,t,n){"use strict";n.r(t);var o=n("mrSG"),a=n("q1tI"),r=n("/7QA"),c=n("eJ65"),i=n("Ue10"),s=(n("+1F+"),function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.onClick=function(e){e.preventDefault(),e.stopPropagation(),t.props.openModal()},t.onToggle=function(e){!e&&t.props.onMenuOpen&&t.props.onMenuOpen()},t}return o.__extends(t,e),t.prototype.render=function(){return a.createElement(i.fb,{className:"feedback-card"},a.createElement(c.a,{preventDefault:!0,stopPropagation:!0,onToggle:this.onToggle},a.createElement(i.D,{icon:i.Db.More,size:i.E.Small}),a.createElement(i.Ea,{direction:i.y.TopRight,size:i.z.Small,items:[{title:Object(r.d)("I am not interested in this recommendation","RecFeedbackButton"),onClick:this.onClick,figure:{icon:i.Db.VisibilityHidden}}]})))},t}(a.Component)),d=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return o.__extends(t,e),t.prototype.render=function(){return a.createElement(i.C,{type:i.I.Text,onClick:this.props.openModal,size:i.G.Small},Object(r.d)("Not interested?","RecFeedbackButton"))},t}(a.Component),l=n("/MKj"),p=n("fvjX"),u=n("aCAx"),m=n("yR8l"),b=n("geRD"),k=n("DMoW"),f=n("L9xt"),h=n("9MO3"),g=n("yI6f"),y=n("kRI/"),v=n("M8Tb");var I=function(e){function t(t){var n=e.call(this,t)||this;return n.logger=r.q.logger.withCategory("recs-feedback"),n.renderSingleChoiceBody=function(){var e=n.props.feedbackReasons[0];return a.createElement(i.Ob,{borderBottom:!0,padding:{y:2,x:2}},a.createElement(i.Ca,{fontSize:i.Ia.Size4,italic:!0,"data-test-selector":"rec-feedback-modal-single-choice-label"},Object(h.e)(e,n.props.channelName,n.props.categoryName)),a.createElement(i.fb,{margin:{top:1}},a.createElement(i.Ca,{fontSize:i.Ia.Size5},function(e){switch(e){case g.b.Shelf:return Object(r.d)("Giving this feedback will remove this shelf from your recommendations","RecFeedbackModal");case g.b.Game:return Object(r.d)("Giving this feedback will remove this category from your recommendations","RecFeedbackModal");case g.b.Live:return Object(r.d)("Giving this feedback will remove this channel from your recommendations","RecFeedbackModal");case g.b.Vod:return Object(r.d)("Giving this feedback will remove this video from your recommendations","RecFeedbackModal");default:return Object(r.d)("Giving this feedback will remove this content from your recommendations","RecFeedbackModal")}}(e.contentType))))},n.renderMultipleChoiceBody=function(){return a.createElement(i.Ob,{borderBottom:!0,padding:{top:2,x:2}},a.createElement(i.Ca,{type:i.gc.Span,fontSize:i.Ia.Size4},n.props.feedbackReasons.map(function(e,t){var o=Object(h.e)(e,n.props.channelName,n.props.categoryName);return a.createElement(i.fb,{key:o,margin:{bottom:.5}},a.createElement(i.zb,{label:o,checked:n.state.selectedReasonIndex===t,onChange:n.onRadioChange,value:t.toString(),error:n.state.showError}))})),a.createElement(i.fb,{margin:{y:.5},visibility:n.state.showError?i.vc.Visible:i.vc.Hidden,"data-test-selector":"rec-feedback-modal-error"},a.createElement(i.Ca,{color:i.R.Error},Object(r.d)("Please select a reason","RecFeedbackModalSelection"))))},n.onRadioChange=function(e){n.state.showError&&n.setState({showError:!1});var t=e.currentTarget.getAttribute("value"),o=null===t?null:parseInt(t,10);n.setState({selectedReasonIndex:o})},n.submitFeedback=function(){var e=n.getCurrentChoiceData(),t=e.contentID,o=e.contentType,a=e.feedbackType,r=e.selectedReason;if(r)if(t&&o&&a){var c=Object(b.a)({category:a,itemID:t,itemType:function(e){switch(e){case g.b.Shelf:return k.Da.SHELF;case g.b.Game:return k.Da.CATEGORY;case g.b.Live:return k.Da.CHANNEL;case g.b.Vod:return k.Da.VOD;case g.b.Clip:return k.Da.UNSPECIFIED;default:return e}}(o),sourceItemPage:f.PageviewMedium.TwitchHome,sourceItemRequestID:n.props.sourceItemRequestID||"",sourceItemTrackingID:n.props.sourceItemTrackingID||""}),i=n.props.addFeedback(c);n.props.trackRecFeedbackClickStep({clickStep:y.a.Submit,feedbackAction:y.b.Add,feedbackReason:a,feedbackedItemID:t,feedbackType:o}),n.props.hideContent(i),n.props.closeModal()}else{var s="Missing content id for reason: "+r+", type: "+a+", content: "+o;n.logger.error(new Error(s),s)}else n.setState({showError:!0})},n.getCurrentChoiceData=function(){var e=n.state.selectedReasonIndex;if(null===e)return{};var t=n.props.feedbackReasons[e],o=t.feedbackType,a=t.contentType;return{contentID:n.contentTypeToIDMapping(a),contentType:a,feedbackType:o,selectedReason:t}},n.closeModal=function(){n.props.closeModal(),n.props.trackRecFeedbackClickStep({clickStep:y.a.Close,feedbackAction:null,feedbackReason:null,feedbackedItemID:null,feedbackType:null})},n.isMultipleChoice=function(){return 1!==n.props.feedbackReasons.length},n.state={selectedReasonIndex:n.isMultipleChoice()?null:0,showError:!1},n}return o.__extends(t,e),t.prototype.render=function(){var e=this.isMultipleChoice(),t=e?Object(r.d)("Not interested? Tell us more...","RecFeedbackModal"):Object(r.d)("Are you sure you want to give this feedback?","RecFeedbackModal");return a.createElement(i.ib,{headerProps:{title:t,closeButton:{onClick:this.closeModal,ariaLabel:Object(r.d)("Close","RecFeedbackModal")}},size:i.lb.Medium,footerProps:{primaryButtonProps:{children:Object(r.d)("Submit Feedback","RecFeedbackModal"),onClick:this.submitFeedback},secondaryButtonProps:{children:Object(r.d)("Cancel","RecFeedbackModal"),type:i.I.Hollow,onClick:this.closeModal}}},e?this.renderMultipleChoiceBody():this.renderSingleChoiceBody())},t.prototype.contentTypeToIDMapping=function(e){switch(e){case g.b.Shelf:return this.props.shelfID;case g.b.Game:return this.props.categoryID;case g.b.Live:return this.props.channelID;case g.b.Vod:return this.props.vodID;case g.b.Clip:return null;default:return e}},t}(a.Component),R=Object(m.a)(v,{name:"addFeedback"})(I);var C=Object(l.connect)(null,function(e){return Object(p.bindActionCreators)({closeModal:u.c},e)})(R),D=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.openModal=function(){t.props.showModal(C,{shelfID:t.props.shelfID,channelID:t.props.channelID,vodID:t.props.vodID,categoryID:t.props.categoryID,channelName:t.props.channelName,categoryName:t.props.categoryName,feedbackReasons:t.props.feedbackReasons,hideContent:t.props.hideContent,trackRecFeedbackClickStep:t.props.trackRecFeedbackClickStep,sourceItemRequestID:t.props.sourceItemRequestID,sourceItemTrackingID:t.props.sourceItemTrackingID}),t.props.onModalOpen()},t}return o.__extends(t,e),t.prototype.render=function(){return this.props.isShelf?a.createElement(d,{openModal:this.openModal}):a.createElement(s,{openModal:this.openModal,onMenuOpen:this.props.onMenuOpen})},t}(a.Component);var M=Object(l.connect)(null,function(e){return Object(p.bindActionCreators)({showModal:u.d},e)})(D);n.d(t,"RecFeedbackButtonComponent",function(){return D}),n.d(t,"RecFeedbackButton",function(){return M})},M8Tb:function(e,t){var n={kind:"Document",definitions:[{kind:"OperationDefinition",operation:"mutation",name:{kind:"Name",value:"AddRecommendationFeedback"},variableDefinitions:[{kind:"VariableDefinition",variable:{kind:"Variable",name:{kind:"Name",value:"input"}},type:{kind:"NonNullType",type:{kind:"NamedType",name:{kind:"Name",value:"AddRecommendationFeedbackInput"}}}}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"addRecommendationFeedback"},arguments:[{kind:"Argument",name:{kind:"Name",value:"input"},value:{kind:"Variable",name:{kind:"Name",value:"input"}}}],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"recommendationFeedback"},arguments:[],directives:[],selectionSet:{kind:"SelectionSet",selections:[{kind:"Field",name:{kind:"Name",value:"id"},arguments:[],directives:[]}]}}]}}]}}],loc:{start:0,end:154}};n.loc.source={body:"mutation AddRecommendationFeedback($input: AddRecommendationFeedbackInput!) {\naddRecommendationFeedback(input: $input) {\nrecommendationFeedback {\nid\n}\n}\n}",name:"GraphQL request",locationOffset:{line:1,column:1}};e.exports=n}}]);