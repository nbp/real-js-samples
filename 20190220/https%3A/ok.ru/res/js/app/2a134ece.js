define(["OK/utils/dom"],function(e){var b="__full",c="invisible",d=115;function a(){}a.prototype={activate:function(h){var g=e.firstByClass(h,"media-text_cnt_tx");if(!g){return;}var f=h.nextSibling;if(!f||!f.classList.contains("media_more")){return;}this.el=h;this.moreInfo=f;this.expandable=h.getAttribute("data-expandable")==="1";if(this.expandable){this.onClick=this.onClick.bind(this);f.addEventListener("click",this.onClick);}if(g.clientHeight>d){this.collapse();}else{this.expand();}},deactivate:function(){if(this.expandable){this.moreInfo.removeEventListener("click",this.onClick);this.onClick=null;}this.el=null;this.moreInfo=null;},isFull:function(){return this.el.classList.contains(b);},expand:function(){this.el.classList.add(b);this.moreInfo.classList.add(c);},collapse:function(){this.el.classList.remove(b);this.moreInfo.classList.remove(c);},onClick:function(f){if(!this.isFull()){this.expand();f.preventDefault();}}};return a;});