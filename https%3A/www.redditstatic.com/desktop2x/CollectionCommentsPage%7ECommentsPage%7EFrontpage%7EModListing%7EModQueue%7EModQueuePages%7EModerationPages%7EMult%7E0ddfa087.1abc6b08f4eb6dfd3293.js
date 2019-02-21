(window.webpackJsonp=window.webpackJsonp||[]).push([["CollectionCommentsPage~CommentsPage~Frontpage~ModListing~ModQueue~ModQueuePages~ModerationPages~Mult~0ddfa087"],{"./src/reddit/actions/modQueue/index.ts":function(e,t,o){"use strict";o.d(t,"f",function(){return A}),o.d(t,"e",function(){return E}),o.d(t,"b",function(){return U}),o.d(t,"g",function(){return F}),o.d(t,"a",function(){return J}),o.d(t,"c",function(){return z}),o.d(t,"d",function(){return G});var s=o("./src/app/strings/index.ts"),a=o("./src/lib/constants/index.ts"),r=o("./src/lib/makeActionCreator/index.ts"),n=o("./src/reddit/actions/removalReasons/index.ts"),d=o("./src/reddit/actions/toaster.ts"),c=o("./src/reddit/endpoints/modQueue/index.ts"),i=o("./src/reddit/helpers/isPost.ts"),u=o("./src/reddit/helpers/makeModQueueListingKey/index.ts"),m=o("./src/reddit/models/Flair/index.ts"),b=o("./src/reddit/models/ModQueue/index.ts"),l=o("./src/reddit/models/Toast/index.ts"),j=o("./src/reddit/selectors/modQueue.ts"),O=o("./src/reddit/selectors/subreddit.ts"),p=o("./src/reddit/selectors/telemetry.ts"),f=o("./src/reddit/selectors/user.ts"),g=o("./src/telemetry/index.ts"),x=o("./src/reddit/actions/modQueue/constants.ts");const y=Object(r.a)(x.m),k=Object(r.a)(x.l),v=Object(r.a)(x.k),P=Object(r.a)(x.j),R=Object(r.a)(x.i),h=Object(r.a)(x.h),Q=Object(r.a)(x.q),C=Object(r.a)(x.p),I=Object(r.a)(x.o),M=Object(r.a)(x.t),T=Object(r.a)(x.s),w=Object(r.a)(x.r),$=Object(r.a)(x.z),N=Object(r.a)(x.y),_=Object(r.a)(x.x),A=(e,t)=>async(o,r,{apiContext:n})=>{let i,m,j;switch(e){case a.nb.Edited:i=P,m=h,j=R;break;case a.nb.Modqueue:i=y,m=v,j=k;break;case a.nb.Reports:i=Q,m=I,j=C;break;case a.nb.Spam:i=M,m=w,j=T;break;case a.nb.Unmoderated:i=$,m=_,j=N;break;default:throw new Error("Invalid modqueue requested")}o(i());const O=await Object(c.b)(n(),e,t);if(O.ok){o(j({listingKey:Object(u.a)(t),page:`${t.page||b.b}`,response:O.body}))}else{const e=Object(f.N)(r());o(m(O.error)),o(Object(d.e)({kind:l.b.Error,text:Object(s.a)(e,"subredditModeration.modQueue.toastText.somethingWentWrong")}))}},S=Object(r.a)(x.n),K=Object(r.a)(x.b),E=e=>async(t,o,{apiContext:a})=>{const r=o(),n=r.modQueue.moderatedCommunitiesOrder.after,i=r.modQueue.moderatedCommunitiesOrder.pending,u=r.modQueue.moderatedCommunitiesOrder.loaded,m=r.platform.currentPage.urlParams.pageName;if(e&&i||u||!n)return;const b=await Object(c.b)(a(),m,{moderated_after:n});if(b.ok)t(S(b.body)),b.body.moderatedAfter?t(E()):t(K());else{const e=Object(f.N)(o());t(Object(d.e)({kind:l.b.Error,text:Object(s.a)(e,"subredditModeration.modQueue.toastText.somethingWentWrong")}))}},B=Object(r.a)(x.e),U=Object(r.a)(x.d),q=Object(r.a)(x.c),L=Object(r.a)(x.w),W=Object(r.a)(x.v),D=Object(r.a)(x.u),F=(e,t,o)=>async(a,r,{apiContext:u})=>{a(B());const x=r(),y=x.user.language,k=Object(j.f)(x),v=x.user.account&&x.user.account.displayText,P=Object(s.a)(y,`subredditModeration.modQueue.toastText.${e}`),R=Object(s.a)(y,"subredditModeration.modQueue.toastText.postsComments");for(let t=0;t<k.length;t++){const o=k[t];let s=e;[b.a.Approve,b.a.Remove,b.a.Spam].includes(e)&&(Object(i.a)(o)?s+="_link":s+="_comment"),Object(g.a)(Object.assign({source:"bulk_mod_action",action:"click",noun:s},p.defaults(x),{actionInfo:p.actionInfo(x,{count:k.length,paneName:x.platform.currentPage?x.platform.currentPage.urlParams.pageName:void 0}),comment:p.comment(x,o),post:p.post(x,o),profile:p.profileByPostOrCommentId(x,o),screen:p.screen(x),subreddit:p.subredditByPostOrCommentId(x,o)}))}const h={ids:k};t&&(h.text=Object(m.j)(t)||"",h.flairTemplateId=""),o&&(h.cssClass=o,h.flairTemplateId=o);const Q=await Object(c.a)(u(),e,h);if(Q.ok)if(a(U(Object.assign({},Q.body,{operation:e,ids:k,username:v,options:{flair:t}}))),e!==b.a.Approve&&e!==b.a.Flair){let t,o;const r=x.platform.currentPage&&x.platform.currentPage.queryParams&&x.platform.currentPage.queryParams.subreddit,i=r&&Object(O.A)(x,r);e===b.a.Remove&&i&&k.length>1&&(t=Object(s.a)(y,"subredditModeration.removalReasons.addARemovalReason"),o=Object(n.d)(i,k));const u=Object(d.d)(`${k.length} ${R} ${P}`,l.b.Undo,Object(s.a)(y,"subredditModeration.modQueue.toastText.undo"),(()=>async(e,t,{apiContext:o})=>{e(L());const a=t(),r=Object.keys(a.modQueue.bulkAction.undoLastAction)[0],n=a.modQueue.bulkAction.undoLastAction[r],i=a.user.account&&a.user.account.displayText;e(B());const u=await Object(c.a)(o(),r,{ids:n});if(u.ok)e(W(Object.assign({},u.body,{operation:r,ids:n,username:i})));else{const o=Object(f.N)(t());e(D(u.error)),e(Object(d.e)({kind:l.b.Error,text:Object(s.a)(o,"subredditModeration.modQueue.toastText.somethingWentWrong")}))}})(),t,o);a(Object(d.e)(u))}else{const e=Object(d.d)(`${k.length} ${R} ${P}`,l.b.SuccessMod);a(Object(d.e)(e))}else{a(q(Q.error));const e=Object(d.d)(Object(s.a)(y,"subredditModeration.modQueue.toastText.somethingWentWrong"),l.b.Error);a(Object(d.e)(e))}},J=Object(r.a)(x.a),z=Object(r.a)(x.f),G=Object(r.a)(x.g)},"./src/reddit/actions/removalReasons/index.ts":function(e,t,o){"use strict";var s=o("./src/lib/makeActionCreator/index.ts"),a=o("./src/app/models/Draft.ts"),r=o("./src/lib/constants/index.ts"),n=o("./src/lib/makeCommentsPageKey/index.ts"),d=o("./src/lib/makeDraftKey/index.ts"),c=o("./src/reddit/helpers/isPost.ts"),i=o("./src/reddit/helpers/routeKey/index.ts"),u=o("./src/app/strings/index.ts"),m=o("./src/reddit/actions/comment.ts"),b=o("./src/reddit/actions/modal.ts"),l=o("./src/reddit/actions/modQueue/index.ts"),j=o("./src/reddit/actions/post.ts"),O=o("./src/reddit/actions/toaster.ts"),p=o("./src/reddit/constants/modals.ts"),f=o("./src/lib/makeApiRequest/index.ts"),g=o("./src/lib/omitHeaders/index.ts"),x=o("./src/reddit/constants/headers.ts"),y=o("./src/reddit/models/RichTextJson/addRTJParam.ts");const k=(e,t)=>Object(f.c)(Object(g.a)(e,[x.a]),{endpoint:`${e.apiUrl}/api/v1/modactions/removal_reasons/`,method:r.jb.POST,type:"json",data:{item_ids:t.itemIds,reason_id:t.reasonId,mod_note:t.modNote}}),v=(e,t,o)=>Object(f.c)(Object(g.a)(e,[x.a]),{endpoint:Object(y.a)(`${e.apiUrl}/api/v1/modactions/removal_${o}_message/`),method:r.jb.POST,type:"json",data:t});var P=o("./src/reddit/helpers/r2/normalizeCommentFromR2/index.ts"),R=o("./src/reddit/models/ModQueue/index.ts"),h=o("./src/reddit/models/RemovalReason/index.ts"),Q=o("./src/reddit/models/Toast/index.ts"),C=o("./src/reddit/selectors/comments.ts"),I=o("./src/reddit/selectors/platform.ts"),M=o("./src/reddit/actions/removalReasons/constants.ts");o.d(t,"e",function(){return N}),o.d(t,"a",function(){return K}),o.d(t,"c",function(){return q}),o.d(t,"b",function(){return F}),o.d(t,"d",function(){return z}),o.d(t,"g",function(){return te}),o.d(t,"f",function(){return oe});const T=Object(s.a)(M.k),w=Object(s.a)(M.l),$=Object(s.a)(M.j),N=e=>async(t,o,{apiContext:s})=>{const a=o().subreddits.models[e].name;t(T());const n=await((e,t)=>Object(f.c)(Object(g.a)(e,[x.a]),{endpoint:`${e.apiUrl}/api/v1/${t}/removal_reasons.json`,method:r.jb.GET}))(s(),a);n.ok?t(w({subredditId:e,response:n.body})):t($(n.error))},_=Object(s.a)(M.b),A=Object(s.a)(M.c),S=Object(s.a)(M.a),K=(e,t)=>async(o,s,{apiContext:a})=>{const n=s(),d=n.subreddits.models[e].name,c=n.user.language;o(_());const i=await((e,t,o)=>Object(f.c)(Object(g.a)(e,[x.a]),{endpoint:`${e.apiUrl}/api/v1/${t}/removal_reasons`,method:r.jb.POST,data:o}))(a(),d,t);if(i.ok){const s=i.body.id,a=Object.assign({},t,{id:s});o(A({subredditId:e,reason:a})),o(Object(O.e)({kind:Q.b.SuccessMod,text:Object(u.a)(c,"subredditModeration.removalReasons.toastText.removalReasonAdded")}))}else o(S(i.error))},E=Object(s.a)(M.h),B=Object(s.a)(M.i),U=Object(s.a)(M.g),q=(e,t)=>async(o,s,{apiContext:a})=>{const n=s(),d=n.subreddits.models[e].name,c=n.user.language;o(E());const i=await((e,t,o)=>Object(f.c)(Object(g.a)(e,[x.a]),{endpoint:`${e.apiUrl}/api/v1/${t}/removal_reasons/${o.id}`,method:r.jb.PUT,data:{message:o.message,title:o.title}}))(a(),d,t);i.ok?(o(B({subredditId:e,reason:t})),o(Object(O.e)({kind:Q.b.SuccessMod,text:Object(u.a)(c,"subredditModeration.removalReasons.toastText.removalReasonSaved")}))):o(U(i.error))},L=Object(s.a)(M.e),W=Object(s.a)(M.f),D=Object(s.a)(M.d),F=(e,t)=>async(o,s,{apiContext:a})=>{const n=s(),d=n.subreddits.models[e].name,c=n.user.language;o(L());const i=await((e,t,o)=>Object(f.c)(Object(g.a)(e,[x.a]),{endpoint:`${e.apiUrl}/api/v1/${t}/removal_reasons/${o}`,method:r.jb.DELETE}))(a(),d,t);i.ok?(o(W({subredditId:e,reasonId:t})),o(Object(O.e)({kind:Q.b.SuccessMod,text:Object(u.a)(c,"subredditModeration.removalReasons.toastText.removalReasonDeleted")}))):o(D(i.error))},J=Object(s.a)(M.t),z=(e,t)=>async(o,s,{apiContext:a})=>{const r=s();r.removalReasons.reasonOrder[e]&&r.removalReasons.reasonOrder[e].length>0||o(N(e)),o(J({subredditId:e,itemIds:t})),o(Object(b.j)(p.a.ADD_REMOVAL_REASON))},G=Object(s.a)(M.r),H=Object(s.a)(M.s),V=Object(s.a)(M.q),X=Object(s.a)(M.n),Y=Object(s.a)(M.o),Z=Object(s.a)(M.p),ee=Object(s.a)(M.m),te=(e,t,o,s,u)=>async(b,l,{apiContext:O})=>{const p=l(),f=p.user.account&&p.user.account.displayText,g=e[0],x=Object(c.a)(g)?h.e.Post:h.e.Comment,y=x===h.e.Post?p.posts.models[g]:p.comments.models[g],R=x===h.e.Post?j.B:m.Q;if(!y||!f)return;b(G()),b(R({[g]:{modNote:u,modRemovalReason:t&&t.title,modReasonBy:f}}));const Q={itemIds:e,modNote:u,reasonId:t?t.id:null},M=await k(O(),Q);if(M.ok){if(b(H()),t){b(X());const c={itemId:e,message:o,title:t.title,type:s},u=await v(O(),Object(h.h)(c,x),x);if(u.ok)if(s===h.f.Public){if(b(Z()),u.body){const e=Object(P.a)(u.body,f),t={comment:e,parentId:g},o=Object(I.g)(p),s=p.platform.currentPage&&p.platform.currentPage.routeMatch;let c=o&&s&&Object(i.a)(s,p,p.posts.models[e.postId]);if(c||(c=Object(n.a)(e.postId,null,{sort:r.u,hasSortParam:!0})),x===h.e.Post){const o=Object(d.a)(a.a.replyToPost,g);b(Object(m.jb)(Object.assign({},t,{headCommentId:Object(C.w)(p,{commentsPageKey:c}),commentsPageKey:c,draftKey:o})));const s=p.postStickiedComments.data[g];b(Object(m.fb)({id:e.id,postId:e.postId,commentsPageKey:c})),s&&s!==e.id&&b(Object(m.Q)({[s]:{isStickied:!1}}))}else if(x===h.e.Comment){const e=Object(d.a)(a.a.replyToComment,y.id),o=Object(C.j)(p,{commentId:g,commentsPageKey:c});b(Object(m.hb)(Object.assign({},t,{parentCommentId:g,commentsPageKey:c,draftKey:e,depth:o+1})))}}}else b(Y());else b(ee(u.error))}}else b(V(M.error)),b(R({[g]:{modNote:y.modNote,modRemovalReason:y.modRemovalReason,modReasonBy:y.modReasonBy}}))},oe=(e,t,o,s,a)=>async(r,n,{apiContext:d})=>{const c=n(),i=c.user.language,m=c.user.account&&c.user.account.displayText;if(!m)return;r(G());const b=Object(O.e)({kind:Q.b.SuccessMod,text:Object(u.a)(i,"subredditModeration.removalReasons.toastText.addedRemovalReason",{number:e.length})}),j={itemIds:e,modNote:a,reasonId:t?t.id:null},p=await k(d(),j);if(p.ok){const n={ids:e,operation:R.a.RemovalReason,username:m,options:{modNote:a,removalReason:t&&t.title}};if(r(Object(l.b)(n)),t){const a={itemId:e,message:o,title:t.title,type:s},n=await v(d(),Object(h.h)(a,h.e.Bulk),h.e.Bulk);n.ok?(r(Y()),r(b)):r(ee(n.error))}else r(b)}else r(V(p.error))}},"./src/reddit/helpers/makeModQueueListingKey/index.ts":function(e,t,o){"use strict";t.a=(e=>{const t=e.profile,o=e.subreddit;return o&&`r/${o}`||t&&`u/${t}`||"all"})},"./src/reddit/models/RemovalReason/index.ts":function(e,t,o){"use strict";o.d(t,"c",function(){return a}),o.d(t,"d",function(){return r}),o.d(t,"a",function(){return n}),o.d(t,"b",function(){return d}),o.d(t,"f",function(){return c}),o.d(t,"e",function(){return i}),o.d(t,"g",function(){return u}),o.d(t,"h",function(){return m});var s=o("./src/reddit/helpers/isPost.ts");const a=20,r=50,n=1e4,d=100;var c,i;!function(e){e.Private="private",e.PrivateExposed="private_exposed",e.Public="public"}(c||(c={})),function(e){e.Bulk="bulk",e.Comment="comment",e.Post="link"}(i||(i={}));const u=e=>1===e.length?Object(s.a)(e[0])?i.Post:i.Comment:i.Bulk,m=(e,t)=>{return{[t===i.Bulk?"item_ids":"item_id"]:e.itemId,message:e.message,title:e.title,type:e.type}}},"./src/reddit/selectors/modQueue.ts":function(e,t,o){"use strict";o.d(t,"c",function(){return r}),o.d(t,"b",function(){return n}),o.d(t,"d",function(){return d}),o.d(t,"f",function(){return c}),o.d(t,"a",function(){return i}),o.d(t,"e",function(){return u});var s=o("./src/reddit/helpers/makeModQueueListingKey/index.ts"),a=o("./src/lib/objectSelector/index.ts");const r=Object(a.a)((e,{pageName:t,page:o,profileName:a,subredditName:r})=>{const n=Object(s.a)({profile:a,subreddit:r});if(!e.modQueue[t]||!e.modQueue[t].itemOrder[n]||!e.modQueue[t].itemOrder[n][o])return;const d=e.modQueue[t].itemOrder[n][o];return d?d.map(t=>e.posts.models[t]||e.comments.models[t]):[]}),n=(e,t)=>{const o=t.pageName;return!e.modQueue[o]||!e.modQueue[o].api||e.modQueue[o].api.pending},d=(e,{pageName:t,profileName:o,subredditName:a})=>{const r=Object(s.a)({profile:o,subreddit:a});return e.modQueue[t].loadMore[r]},c=e=>Object.keys(e.modQueue.bulkAction.selectedItems),i=e=>e.modQueue.bulkAction.api.pending,u=e=>e.modQueue.moderatedCommunitiesOrder.data}}]);
//# sourceMappingURL=CollectionCommentsPage~CommentsPage~Frontpage~ModListing~ModQueue~ModQueuePages~ModerationPages~Mult~0ddfa087.1abc6b08f4eb6dfd3293.js.map