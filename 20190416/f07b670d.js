(function(n){function o(){r();u()}function r(){if(n.fi>0&&n.fC<n.mfr){var t=Math.max(n.fi-n.mipf,0);e(f(t,n.fi-t),!0);n.fi=t}}function u(){if(n.li<n.mti-1&&n.fC<n.mfr){var t=Math.min(n.mti-1-n.li,n.mipf);e(f(n.li+1,t),!1);n.li+=t}}function f(t,i){n.fC++;var u=n.tdcar?"2defirst":"efirst",f=n.tdcar?"2decount":"ecount",r=n.u+"&"+u+"="+(t+1)+"&"+f+"="+i+"&IID="+n.iid+"_"+n.fC;return n.adcar&&(r+=AdCarouselHelper.getAdCountQueryParam()),r}function e(n,i){if(n){function r(n,r){if(n&&r&&r.request.responseText){var f=i?"b_lccontainer":"b_rccontainer",u=_ge(f);u?(r.appendTo(u),t(!0,u,i)):t(!1,null,i)}else t(!1,null,i)}sj_ajax(n,{callback:r})}}function t(t,f,e){var h,s,c,g,k,a,nt,o,d,v,y,p,w,b,l;if(t){if(h=sj_ce("div"),n.onFetch)n.onFetch(h,f,e);else if(s=i("wpc_cei",f,"li"),s!=null&&s.length>0)for(c=0,g=s.length;c<g;c++){for(k=i("rms_iac",s[c],"div"),a=0,nt=k.length;a<nt;a++)if(o=k[a],d=o.getAttribute("data-src"),d){for(o.removeAttribute("data-src"),v=sj_ce("img"),y=0;y<o.attributes.length;y++)p=o.attributes[y],p.name.lastIndexOf("data-",0)==0&&v.setAttribute(p.name.substr(5),p.value);v.src=d;w=o.parentNode;w&&(w.removeChild(o),w.appendChild(v))}h.appendChild(s[c])}else b=i("det",f,"div"),b!=null&&b.length>0&&(l=sj_ce("div"),l.className="partial-det",l.setAttribute("isExpanded","true"),l.appendChild(b[0]),h.appendChild(l));sj_evt.fire("onCarouselFetch",e,h);sb_st(e?r:u,100)}}function i(n,t,i){var r,s,u,f;if(typeof n=="string"){var t=t||_d,i=i||"*",e=t.getElementsByTagName(i),o=[];for(r=0,s=e.length;r<s;r++)u=e[r],f=u.className,f&&f.indexOf(n)!==-1&&o.push(u);return o}}n.fC=0;sj_evt.bind("onP1",o,1,1)})(sa_EFConfig)