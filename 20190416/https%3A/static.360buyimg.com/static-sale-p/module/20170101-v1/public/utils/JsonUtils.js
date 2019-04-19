define("public/utils/JsonUtils",["mustache"],function(require,exports,module){require("mustache");var Tool={};Tool.trim=function(e){return e.replace(/(^\s+)|(\s+$)/g,"")},Tool.render=function(e,r){var t=null,o="var breads=[];",n=0,s="",a=/{{(.*?)}}/g,i="";if(!e||!r)return"";for(r=r.replace(/\n|\r/g,"");t=a.exec(r);)i=r.slice(n,t.index).replace(/"/g,'\\"'),i&&(o+='breads.push("'+i+'");'),s=this.trim(t[1]),/^(var|if|for|switch|else|case|while|do|break|continue|\{|\}|\[|\])/.test(s)?o+=s:o+="breads.push("+s+");",n=t.index+t[0].length;return i=r.slice(n).replace(/"/g,'\\"'),i&&(o+='breads.push("'+i+'");'),o+='return breads.join("");',new Function("data",o)(e)},Tool.parseHash=function(e){for(var r=/[^{]+(?=\})/g,t=(location.hash||"#").slice(1),o={},n=e.match(r),s=t.split("/"),a=0;n[a];a++)o[n[a]]=s[a]||void 0;return o},Tool.parseNumber=function(e){return e<10?"0"+e:e},Tool.dateFormat=function(e,r){var t={},o=/\{([^}]{1,2})\}/;for(t.Y=e.getFullYear(),t.M=e.getMonth()+1,t.MM=this.parseNumber(t.M),t.D=e.getDate(),t.DD=this.parseNumber(t.D),t.h=e.getHours(),t.hh=this.parseNumber(t.h),t.i=e.getMinutes(),t.ii=this.parseNumber(t.i),t.s=e.getSeconds(),t.ss=this.parseNumber(t.s);o.test(r);)r=r.replace(o,t[RegExp.$1]);return r},Tool.rgbToHex=function(e){var r,t,o,n,s=/rgba?\((\d{1,3}),(\d{1,3}),(\d{1,3})(,([.\d]+))?\)/,a=e.replace(/\s+/g,"").match(s);return a?(r=(+a[1]).toString(16),r=1==r.length?"0"+r:r,t=(+a[2]).toString(16),t=1==t.length?"0"+t:t,o=(+a[3]).toString(16),o=1==o.length?"0"+o:o,n=100*+(a[5]?a[5]:1),{hex:"#"+r+t+o,alpha:Math.ceil(n)}):{hex:e,alpha:100}},Tool.guid=function(e){return e+"_"+(new Date).getTime().toString(32)},Tool.stringToJSONByEval=function(str){return eval("("+str+")")},Tool.loadMustache=function(e,r,t){Mustache.parse(e);var o=Mustache.render(e,r);t.html(o)},module.exports=Tool});