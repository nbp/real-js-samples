window.scriptsLoaded = window.scriptsLoaded || {}; window.scriptProcessStart = window.scriptProcessStart || {}; window.scriptProcessStart['owa.MessageOptions.mail.js'] = (new Date()).getTime();(window.$wj=window.$wj||[]).push([[182],{1790:function(e,t,n){"use strict";n.r(t);var i=n(7),r=new RegExp("(<img )([^>]*src=[\"']?data:image/[^<]+;base64,[a-zA-Z0-9+/=&#;]+[\"']?)([^>]*>)","gi"),a="EmojiInsert";var u,o=n(4),s=Object(o.action)("setSignatureInUserOptions")(function(e,t){var n,u=Object(i.a)().UserOptions;u.SignatureHtml=(n=e)?n.replace(r,'<img class="'+a+'" $2$3'):n,u.SignatureText=t}),c=n(4901),g=n.n(c),f=Object(o.action)("loadSignatureInUserOptions")(function(){return u||(u=g()().then(function(e){var t=e.Options;s(t.SignatureHtml,t.SignatureText)}))});n.d(t,"loadSignatureInUserOptions",function(){return f})},4901:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n(51);t.default=function(e){return i.makeServiceRequest("GetMailboxMessageConfiguration",{},e)}}}]);
//# sourceMappingURL=owa.MessageOptions.mail.js.map
window.scriptsLoaded['owa.MessageOptions.mail.js'] = 1; window.scriptProcessEnd = window.scriptProcessEnd || {}; window.scriptProcessEnd['owa.MessageOptions.mail.js'] = (new Date()).getTime();