if (self.CavalryLogger) { CavalryLogger.start_js(["oiWOL"]); }

__d("AdsAdBuilderDeleteDraftReducerPlugins",[],(function(a,b,c,d,e,f){"use strict";a={reduce:function(a,b){b=b.deletingState;return babelHelpers["extends"]({},a,{deletingState:b})}};b={reduce:function(a,b){return babelHelpers["extends"]({},a,{deletingState:"deleted"})}};c={reduce:function(a,b){return!b.showDialog?babelHelpers["extends"]({},a,{deletingState:"waiting"}):a}};e.exports={onAdsAdBuilderDeleteDraft:a,onAdsDraftDraftFragmentBatchDeleted:b,onDeleteConfirmDialogOpen:c}}),null);