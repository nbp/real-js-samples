var AccordionControl;(function(n){function p(n,t){for(var r,i=0;i<n.length;i++)r=n[i],r&&(r.innerHTML=t)}function e(){return _w.pageYOffset||Math.max(sb_de.scrollTop,sj_b.scrollTop)}function w(n,t){t?t.scrollTop=n:_w.scroll(0,n)}function r(n,t,i,r){i===void 0&&(i=null);r===void 0&&(r=null);var u=new sj_anim(function(r,u){w(t+n*(u/100),i)});u.init(null,0,100,20,function(){r&&sb_st(function(){r.classList.remove("b_noanim")},50)})}function b(n,t){sj_evt.fire("Accordion.OnActivate",n.id);t&&(n.className+=" "+t);n.setAttribute("aria-expanded","true");v(n,!0)}function l(n,t){if(sj_evt.fire("Accordion.OnDeactivate",n.id),t){var i;i=t==="l_bgcolor"?/\bl_bgcolor\b/g:/\bl_bgcolor_ml\b/g;n.className=n.className.replace(i,"").trim()}n.setAttribute("aria-expanded","false");v(n,!1)}function t(n){var t=i(n,"content");if(t)return _ge(t)}function o(n){return i(n,"appns")}function s(n){return i(n,"k")}function i(n,t,i){if(i===void 0&&(i=null),!n)return null;var r="data-"+t;return i===null?n.getAttribute(r):(n.setAttribute(r,i),i)}function a(n,t){t!=null&&(sa_cl(t.parentElement,"acc-inactive",!0),t.parentElement.style.height="0",Log.Log("Hide","Accordion","Hide",!1,"AppNS",o(t),"K",s(t)));n!=null&&(sa_cl(n.parentElement,"acc-inactive",!1),n.parentElement.style.height=n.offsetHeight+"px",Log.Log("Show","Accordion","Show",!1,"AppNS",o(n),"K",s(n)))}function v(n,t){var i,r,u,e,o,s;t?(i="downImg",r="upImg"):(i="upImg",r="downImg");u=f(n,i);e=f(n,r);u&&sa_cl(u,"b_hide",!0);e&&sa_cl(e,"b_hide",!1);o=f(n,"acc-exph");o&&(s=f(n,"acc-h"),sa_cl(o,"b_hide",!t),sa_cl(s,"b_hide",t))}function f(n,t){var i=h(n,t);return i&&i.length>0?i[0]:null}function h(n,t){return n?n.getElementsByClassName?n.getElementsByClassName(t):n.querySelectorAll("."+t):null}function k(n,t,i,r,f,e){u.push(new c(n,t,i,r,f,e))}var y=function(){sj_evt.fire("accordion_init",n)},u=n.accordion=[],c;typeof String.prototype.trim!="function"&&(String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g,"")});c=function(){function n(n,t,r,u,f,e){var k=this,o,l,c,a,w,v,d,y,s,g,b;if(this.id=n,this.activeIndex=t,this.bgColorCss=r,this.dataUrl=u,this.errorMessage=f,this.expId=e,this.isResponsePreprocessingRequired=!1,o=this,l=_ge(n),o.data=h(l,"acc-head"),o.expandedHead=h(l,"acc-exph"),c=o.data,c){for(t>=0&&t<c.length&&(o.active=c[t],o.setHeightOfActiveContent()),a=0;a<c.length;a++)w=c[a],i(w,"index",a+""),o.bind(w);if(sj_evt.bind("acc_adj_height",function(n){n&&n.length===2&&n[1]===o.id&&o.active!=null&&(o.setHeightOfActiveContent(),o.adjustWindowPosition(o.active,null))}),sj_evt.bind("accItem.exp",function(n){if(n.length>1){var t=n[1];o.clickEvent(t)}},!0),d=function(n,t){var u=l,r,i;if(v=u.getElementsByClassName("acc-dcont"),v){if(!n||!t){p(v,o.errorMessage);return}(r=sj_ce("div",null,"b_hide"),t.appendTo(r),i=r.children,i)&&(k.isResponsePreprocessingRequired?(sj_evt.bind("accordionProcessed",y),sj_evt.fire("accordionAjaxResponse",i)):y(["accordionProcessed",i]))}},y=function(n){var f,r,t,u;if(k.isResponsePreprocessingRequired&&sj_evt.unbind("accordionProcessed",y),n&&!(n.length<2))for(f=n[1],r=0;r<f.length;){if(t=f[r],t)if(t.tagName==="DIV"){if(u=v[r],u){for(u.innerHTML="";t.firstChild!=null;)u.appendChild(t.firstChild);o.active&&i(o.active,"content")===u.id&&o.setHeightOfActiveContent()}}else(t.tagName=="SCRIPT"||t.tagName=="STYLE")&&(sj_b.appendChild(t),r--);r++}},u&&sj_ajax(u,{callback:d}),_w.getComputedStyle){for(s=l.parentElement;s!=null&&s!==_d.body;){if(g=_w.getComputedStyle(s),b=g.getPropertyValue("overflow-y"),b==="auto"||b==="scroll")break;s=s.parentElement}s&&s!==_d.body&&(s.style.position="relative");o.scrollContainer=s}}}return n.prototype.closeActiveItem=function(){var n=this;n.active&&n.clickEvent(n.active)},n.prototype.setHeightOfActiveContent=function(){var t=this,n=t.active.nextSibling,i;n||(n=t.active.parentElement.nextSibling);!t.active.attributes.skipinitheight&&n&&n.firstElementChild&&(i=n.firstElementChild.offsetHeight,i>0&&(n.style.height=i+"px"))},n.prototype.bind=function(n){var i=this;sj_be(n,"click",function(){i.clickEvent(n)});sj_be(n,"keydown",function(t){t.keyCode===13&&i.clickEvent(n)});sj_evt.bind("exptoggle",function(r){var e,o,u,f;!r||r.length<3||(e=r[1],o=r[2],e!==i.expId||o)||n&&i.active===n&&(u=t(n),f=u?u.offsetHeight:0,f>0&&(t(n).parentElement.style.height=f+"px"))})},n.prototype.clickEvent=function(n){var r=this,i;r.click(n);i=t(n);Log.Log("Select","Accordion","Click",!1,"AppNS",o(i),"K",s(i))},n.prototype.click=function(n){var i=this,r,u;n&&(sj_evt.fire("accordion_item_click",n,i.active),i.active!==n?(r=n,u=i.active,a(t(r),t(u)),i.active!=null&&l(i.active,i.bgColorCss),b(n,i.bgColorCss),i.adjustWindowPosition(r,u),i.active=n,WireUp.setValue(_ge(i.id),"s",!0)):i.active!=null&&(a(null,t(i.active)),l(i.active,i.bgColorCss),i.active=null,WireUp.setValue(_ge(i.id),"s",!1)))},n.prototype.adjustWindowPosition=function(n,u){var h=this,f,o,c,s;if(h.scrollContainer){if(h.scrollContainer!==_d.body){h.adjustContainerPosition(n,u);return}if(f=n.getBoundingClientRect().top,u&&parseInt(i(u,"index"))<parseInt(i(n,"index"))&&(f-=t(u).offsetHeight),o=_ge("b_header"),o&&o.getBoundingClientRect().top==0&&f<o.clientHeight&&(f-=o.clientHeight),f<0){o&&o.classList.add("b_noanim");r(f,e(),null,o);return}c=_w.innerHeight||sb_de.clientHeight;s=n.offsetHeight+t(n).offsetHeight-c;s>0?r(f,e()):(s+=f,s>0&&r(s,e()))}},n.prototype.adjustContainerPosition=function(n,u){var f=this,e=f.offsetTop(n);if(u&&parseInt(i(u,"index"))<parseInt(i(n,"index"))&&(e-=t(u).offsetHeight+n.offsetHeight-u.offsetHeight),e<f.scrollContainer.scrollTop){r(e-f.scrollContainer.scrollTop,f.scrollContainer.scrollTop,f.scrollContainer);return}var s=n.offsetHeight+t(n).offsetHeight,h=e+s,c=e-f.scrollContainer.scrollTop,o=h-(f.scrollContainer.scrollTop+f.scrollContainer.offsetHeight);o>0&&r(Math.min(c,o),f.scrollContainer.scrollTop,f.scrollContainer)},n.prototype.offsetTop=function(n){for(var r=this,i=0,t=n;t!==r.scrollContainer;)i+=t.offsetTop,t=t.offsetParent;return i},n}();n.init=k;y();WireUp.init("avc",function(n){var t;WireUp.onUpdate(n,"a",function(i,r,f,e){if(!e){if(!t){for(var o=0;o<u.length;++o)if(u[o].id===n.id){t=u[o];break}if(!t)return}t.closeActiveItem()}})})})(AccordionControl||(AccordionControl={}))