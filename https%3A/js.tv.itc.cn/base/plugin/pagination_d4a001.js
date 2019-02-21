/* sohutv 2018-04-24 16:36:10 */
!function(t){"function"!=typeof t.g&&(t.g=function(t){return document.getElementById(t)});var e=t.getType=function(t){return Object.prototype.toString.call(t).slice(8,-1)};t.array=t.array||{};var i=t.array.each=function(t,i,n){if(t){if("Array"===e(t))if("function"===Array.prototype.forEach)t.forEach(i,n);else for(var s=0,r=t.length;s<r;s++)i.call(n,t[s],s,t);else for(var s in t)t.hasOwnProperty(s)&&i.call(n,t[s],s,t)}};t.filter=function(t,e){return t};var n=t.has=function(t,e){return t.hasOwnProperty(e)};t.string=t.string||{},t.string.format=function(t,i){return void 0===i?source:t.replace(/\{\/(.+?)\/\}/g,function(t,n){var s=i[n];return"Function"===e(s)&&(s=s(n)),void 0===s?"":s})};var s=t.extend=function(t){for(var r,a=Array.prototype.slice.call(arguments,1),o=a.length-1;o>=0;o--)r=a[o],i(r,function(i,a){n(r,a)&&("Object"===e(i)?(t[a]=t[a]||{},s(t[a],i)):t[a]=i)});return t};t.include=function(t){var e=Array.prototype.slice.call(arguments,1);i(e,function(e){s(t.prototype,e)})},t.guid=function(){var t=1;return function(e){return(void 0!==e?e:"sohuHD")+"_"+(t++).toString(36)}}(),t.Event={getTarget:function(t){return t.target||t.srcElement},getEvent:function(t){return t||window.event},preventdefault:function(t){return t.preventDefault?t.preventDefault():t.returnValue=!1,t},bind:function(){return window.addEventListener?function(t,e,i){t.addEventListener(e,i,!1)}:window.attachEvent?function(t,e,i){var n=function(){i.call(t,window.event)};t.attachEvent("on"+e,n)}:void 0}(),proxy:function(t){var e=this;return function(){t.apply(e,arguments)}},simple:function(){return{subscribe:function(){},publish:function(){}}}()},t.DOM=function(){function t(t,e){return t.className.match(s(e))}function e(e,i){!t(e,i)&&(e.className+=" "+i)}function i(e,i){t(e,i)&&(e.className=e.className.replace(s(i)," "))}function n(t){return document.getElementById(t)}var s=function(t){return new RegExp("(\\s|^)"+t+"(\\s|$)")};return{addClass:e,removeClass:i,hasClass:t,g:n,show:function(t,e){this.removeClass(t,e||"d-n")},hide:function(t,e){this.addClass(t,e||"d-n")}}}();var r=t.util=t.util||{};t.util.parseQuery=function(t,e){var i=new RegExp("(^|&|\\?|#)"+e+"=([^&]*)(&|$)","i"),n=t.match(i);return n?n[2]:""},t.url=t.url||{},t.url.getQuery=function(t){return r.parseQuery(location.search,t)},t.__log=function(){},window.console&&console.info&&(t.__log=function(t){console.info.apply(console,arguments)})}(sohuHD),function(t){function e(e){this.result="",this.ui=null,this.elem=null,this.tag=null,this.inited=!1,this.config(e),this.guid=t.guid("pagination"),t._instances[this.guid]=this,this.autoinit&&this.init()}function i(t){return String(t).replace(/[<>&"]/g,function(t){return"&#"+t.charCodeAt()+";"})}function n(t,e,i){for(var n=Math.ceil(e/2),s=i-e,r=t>n?Math.max(Math.min(t-n,s),0):0,a=t>n?Math.min(t+n,i):Math.min(e,i),o=[],l=r;l<a;l++)o.push(l+1);return o.length>e&&o.pop(),o}t._instances=t._instances||{},t.UIClass=t.UIClass||{getInstance:function(e){return t._instances[e]},destroy:function(e){delete t._instances[e]}},t.UIBase=t.Base||{getUI:function(){return this.ui},getElem:function(){return this.elem},getInstance:function(){return this._parent.getInstance(this.guid)},init:function(){},render:function(){},config:function(){},destroy:function(){this._parent.destroy(this.guid),this.elem.innerHTML=""},set:function(t,e){this[t]=e}};var s=function(e){var i=[].slice.call(arguments,0);i.unshift("Pagination: "),t.__log.apply(t,i)};e._default={autoinit:!1,type:"horizontal",classname:{active:"on",disable:"btn-disable",prevdisable:"btn-pre-disable",nextdisable:"btn-next-disable",prev:"btn-pre",next:"btn-next",horizontal:"pagesA",vertical:"pages-1",ellipsis:"",triggershow:"jtrigger",triggerpage:"jpage"},tmpl:'<a href="#" class="{/class/} {/isdisable/}" data-page="{/page/}">{/pageText/}</a>',tmplVer:{item:'<li><a href="#" class="{/class/} {/isdisable/}" data-page="{/page/}">{/pageText/}</a></li>',body:"ul",trigger:'<a href="#" class="{/class/} {/isdisable/}" data-page="{/page/}">{/pageText/}</a>'},event:"click",current:1,shownFirstLast:!1,shownPrevNext:!0,prevText:"",nextText:"",ellipsisText:"",len:7,handle:function(t,e){s(t)},before:function(){return!0},after:function(){}},t.extend(e,t.UIClass),t.include(e,t.UIBase,t.Event,t.DOM,{__log:s});var r=e.prototype;r.config=function(i){var n=parseInt(t.url.getQuery("current"),10);!isNaN(n)&&(i.current=n),n=null,t.extend(this,i,e._default)},r.init=function(){if(this.elem=t.g(this.id),!this.elem)throw new Error("Pagination: `this.elem` \u672a\u627e\u5230");return this.elem.innerHTML='<div id="'+this.guid+'" class="'+this.classname[this.type]+'"></div>',this.ui=t.g(this.guid),this._parent=this.constructor,this.render(),this.bindEvent(),this.inited=!0,this},r.refresh=function(t){t=t||{},this.total=t.total||this.total,this.current=t.current||1,this.total<this.current&&(this.current=this.total);var e=!1;"undefined"!=typeof t.pageonly&&(e=t.pageonly),e?this.render():this.go(this.current)},r.change=function(t){t=t||"horizontal",this.type!==t&&(this.addClass(this.ui,this.classname[t]),this.removeClass(this.ui,this.classname[this.type]),this.type=t,this.render())},r.render=function(){this.result=this.makeHtml(),this.ui.innerHTML=this.result},r.format=function(){},r.makeHtml=function(){var e=[];if(this.total>1){var s,r=parseInt(this.current,10),a=this.total,o=this.tmpl,l=n(r-1,this.len,this.total),u=l.length,c=this.classname;if("horizontal"==this.type){if(t.array.each(l,function(n){n>0&&n<=a&&(s=t.string.format(o,{page:n,pageText:i(n),isdisable:"","class":function(){return n==r?c.active:c.triggerpage}}),e.push(s))}),this.shownFirstLast){var h=this.ellipsisText;l[u-1]<a&&function(){s=t.string.format(o,{page:a,pageText:i(a),isdisable:"","class":c.triggerpage}),l[u-1]+1<a&&e.push('<em class="'+c.ellipsis+'">'+h+"</em>"),e.push(s)}(),l[0]>1&&function(){s=t.string.format(o,{page:1,pageText:1,isdisable:"","class":c.triggerpage}),l[0]-1>1&&e.unshift('<em class="'+c.ellipsis+'">'+h+"</em>"),e.unshift(s)}()}this.shownPrevNext&&(s=t.string.format(o,{page:r-1,pageText:i(this.prevText)||"",isdisable:function(){return 1==r?c.prevdisable:""},"class":c.prev+" "+c.triggerpage}),e.unshift(s),s=t.string.format(o,{page:r+1,pageText:i(this.nextText)||"",isdisable:function(){return r==a?c.nextdisable:""},"class":c.next+" "+c.triggerpage}),e.push(s))}else if("vertical"===this.type){var g=this.tmplVer.item,f=this.tmplVer.trigger;e.push("<"+this.tmplVer.body+' class="'+this.classname[this.type]+'-list hide" id="'+this.guid+'_list">'),t.array.each(l,function(n){n>0&&n<=a&&(s=t.string.format(g,{page:n,total:a,pageText:i(n),isdisable:"","class":c.triggerpage}),e.push(s))}),e.push("</"+this.tmplVer.body+">"),e.push('<div id="'+this.guid+'_inner" class="'+this.classname[this.type]+'-inner">'),s=t.string.format(f,{page:r-1,pageText:i(this.prevText)||"",total:a,isdisable:function(){return 1==r?c.prevdisable:""},"class":c.prev+" "+c.triggerpage}),e.push(s),s=t.string.format(f,{page:r,pageText:i(r)||"",total:a,isdisable:"","class":c.active+" "+c.triggershow}),e.push(s),s=t.string.format(f,{page:r+1,pageText:i(this.nextText)||"",total:a,isdisable:function(){return r==a?c.nextdisable:""},"class":c.next+" "+c.triggerpage}),e.push(s),e.push("</div>")}s=null}return e.join("\n")};var a=function(t,e){return!(this.hasClass(e,this.classname.active)||this.hasClass(e,this.classname.prevdisable)||this.hasClass(e,this.classname.nextdisable))},o=function(t,e){this.current=t,this.render()};r.go=function(t,e){this.handle(t,e),"function"==typeof this.after&&this.after(),o.call(this,t,e)},r.gotofirst=function(){this.go(1)},r.gotolast=function(){this.go(this.total)},r.bindEvent=function(){var t=function(t){var e=this.getTarget(t),i=this.classname;if(this.hasClass(e,i.triggershow))this.show(this.g(this.guid+"_list"),"hide");else if(this.hasClass(e,i.triggerpage)){var n=e.getAttribute("data-page");a.call(this,n,e)&&"function"==typeof this.before&&this.before(n,e)&&this.go(n,e)}else s("error! \u5f53\u524d\u5143\u7d20class: "+e.className);this.preventdefault(t)};this.bind(this.elem,this.event,this.proxy(t))},t.Pagination=e}(sohuHD);