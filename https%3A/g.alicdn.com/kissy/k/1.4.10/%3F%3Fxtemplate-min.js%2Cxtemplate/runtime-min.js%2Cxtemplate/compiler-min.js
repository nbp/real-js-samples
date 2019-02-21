/*
Copyright 2014, KISSY v1.49.10
MIT Licensed
build time: Dec 10 15:07
*/
KISSY.add("xtemplate",["xtemplate/runtime","xtemplate/compiler"],function(g,h){function b(a,c){c=g.merge(k,c);if("string"===typeof a){var e=a,f=c,d;if(!f.cache||!(d=i[e]))d=j.compileToFn(e,f),f.cache&&(i[e]=d);a=d}b.superclass.constructor.call(this,a,c)}var a=h("xtemplate/runtime"),j=h("xtemplate/compiler"),i=b.cache={},k={cache:!0};g.extend(b,a,{},{compiler:j,Scope:a.Scope,RunTime:a,addCommand:a.addCommand,removeCommand:a.removeCommand});return b});
/*
Copyright 2014, KISSY v1.49.10
MIT Licensed
build time: Dec 10 15:07
*/
KISSY.add("xtemplate/runtime/scope",[],function(g){function l(e,f){this.data=e||{};this.affix=f;this.root=this}l.prototype={isScope:1,setParent:function(e){this.parent=e;this.root=e.root},getParent:function(){return this.parent},getRoot:function(){return this.root},set:function(e,f){this.affix||(this.affix={});this.affix[e]=f},setData:function(e){this.data=e},getData:function(){return this.data},mix:function(e){this.affix||(this.affix={});g.mix(this.affix,e)},has:function(e){var f=this.data,i=this.affix;
return i&&e in i?!0:"object"===typeof f&&e in f},get:function(e){var f=this.data,i=this.affix;if(i&&e in i)return i[e];if("object"===typeof f&&e in f)return f[e]},resolve:function(e,f){"."===e&&(e="this");var i=e.split("."),d=this,b,c,a,g,k;if("root"===i[0])i.shift(),d=d.root;else if(f)for(;d&&f--;)d=d.parent;var h=0;for(b=i.length;d;){k=1;a=d;for(c=0;c<b;c++)if(g=i[c],"this"===g)h=1;else if(a===d)if(d.has(g))a=d.get(g),h=1;else{k=0;break}else{if(null==a||"object"!==typeof a||!(g in a)){k=0;break}a=
a[g]}if(k)return a&&a.isScope&&(a=a.data),"function"===typeof a&&(a=a.call(this.data)),[a];if(h)break;d=d.parent}return!1}};return l});
KISSY.add("xtemplate/runtime/commands",["path","./scope"],function(g,l){var e,f=l("path"),i=l("./scope");return e={"debugger":g.noop,each:function(d,b){var c=b.params,a=c[0],e=c[2]||"xindex",c=c[1],f="",h,j,m;if(a)if(j=new i,g.isArray(a)){h=a.length;for(var n=0;n<h;n++)j.data=a[n],m=j.affix={xcount:h},m[e]=n,c&&(m[c]=a[n]),j.setParent(d),f+=b.fn(j)}else for(h in a)j.data=a[h],m=j.affix={},m[e]=h,c&&(m[c]=a[h]),j.setParent(d),f+=b.fn(j);else b.inverse&&(f=b.inverse(d));return f},"with":function(d,
b){var c=b.params[0],a="";c?(c=new i(c),c.setParent(d),a=b.fn(c)):b.inverse&&(a=b.inverse(d));return a},"if":function(d,b){var c="";b.params[0]?b.fn&&(c=b.fn(d)):b.inverse&&(c=b.inverse(d));return c},set:function(d,b){d.mix(b.hash);return""},include:function(d,b){var c=b.params;if(!c||1!==c.length)return"";if(b.hash){var a=new i(b.hash);a.setParent(d);d=a}a=this.config.name;c=c[0];if("."===c.charAt(0)){if("unspecified"===a)return"";c=f.resolve(a,"../",c)}a=this.config.loader.call(this,c);b=g.merge(this.config);
b.name=c;b.commands=this.config.commands;b.macros=this.config.macros;return this.invokeEngine(a,d,b)},macro:function(d,b){var c=b.params,a=c[0],e=c.slice(1),c=this.config.macros;if(b.fn)c[a]||(c[a]={paramNames:e,fn:b.fn});else{var f={},a=c[a];g.each(a.paramNames,function(c,j){f[c]=e[j]});c=new i(f);return a.fn.call(this,c)}return""},parse:function(d,b){return e.include.call(this,new i,b)}}});
KISSY.add("xtemplate/runtime",["./runtime/commands","./runtime/scope"],function(g,l){function e(){}function f(j,c){for(var a=c.split("."),b=j,e=a.length,d=0;d<e&&!(b=b[a[d]],!b);d++);return b}function i(j,c,a,b){var d;if(b=f(j.config.commands,b)){try{d=b.call(j,c,a)}catch(e){}return{find:!0,value:d}}return{find:!1}}function d(j,c,a,b,d){var f,j=j.config.silent?e:g.error,c=c.resolve(a,b);!1===c?j('can not find property: "'+a+'" at line '+d,"warn"):f=c[0];return f}function b(j,a){this.tpl=j;a=g.merge(h,
a);a.commands=g.merge(a.commands,c);a.utils=k;a.macros=a.macros||{};this.config=a}var c=l("./runtime/commands"),a=l("./runtime/scope"),p=g.escapeHtml,k={runBlockCommand:function(a,c,b,d,i){var h=a.config,l=h.silent?e:g.error,h=h.commands,o=f(h,d);if(!o)if(!b.params&&!b.hash){var k=c.resolve(d);!1===k?(l('can not find property: "'+d+'" at line '+i),k=""):k=k[0];o=h["if"];g.isArray(k)?o=h.each:"object"===typeof k&&(o=h["with"]);b.params=[k]}else return"";var q;try{q=o.call(a,c,b)}catch(p){}return q},
renderOutput:function(a,c){void 0===a&&(a="");return c&&a?p(a):a},getProperty:function(a,c,b,e,f){return d(a,c,b,e,f)},runInlineCommand:function(a,c,b,d,e){var f="",a=i(a,c,b,d,e);a.find&&(f=a.value);return f},getPropertyOrRunCommand:function(a,c,b,e,f,g){var h,k=b.hash||b.params,b=i(a,c,b,e,g,k);b.find?h=b.value:k||(h=d(a,c,e,f,g));return h}},h={silent:!0,name:"unspecified",loader:function(a){return g.require(a)}};g.mix(b,{commands:c,utils:k,addCommand:function(a,b){c[a]=b},removeCommand:function(a){delete c[a]}});
b.prototype={constructor:b,invokeEngine:function(a,b,c){return(new this.constructor(a,c)).render(b,!0)},removeCommand:function(a){delete this.config.commands[a]},addCommand:function(a,b){this.config.commands[a]=b},render:function(b){var c=b;if(!c||!c.isScope)c=new a(b);return this.tpl(c,g)}};b.Scope=a;return b});
/*
Copyright 2014, KISSY v1.49.10
MIT Licensed
build time: Dec 10 15:07
*/
KISSY.add("xtemplate/compiler/parser",[],function(){var k={},a=KISSY,f=function(c){this.rules=[];a.mix(this,c);this.resetInput(this.input)};f.prototype={constructor:function(c){this.rules=[];a.mix(this,c);this.resetInput(this.input)},resetInput:function(c){a.mix(this,{input:c,matched:"",stateStack:[f.STATIC.INITIAL],match:"",text:"",firstLine:1,lineNumber:1,lastLine:1,firstColumn:1,lastColumn:1})},genShortId:function(c){c+="__gen";c in this||(this[c]=-1);var c=this[c]+=1,d="";do d=String.fromCharCode(97+
c%26)+d,c=Math.floor(c/26)-1;while(0<=c);return d},getCurrentRules:function(){var c=this.stateStack[this.stateStack.length-1],d=[],c=this.mapState(c);a.each(this.rules,function(e){var b=e.state||e[3];b?a.inArray(c,b)&&d.push(e):c===f.STATIC.INITIAL&&d.push(e)});return d},pushState:function(c){this.stateStack.push(c)},popState:function(){return this.stateStack.pop()},getStateStack:function(){return this.stateStack},showDebugInfo:function(){var c=f.STATIC.DEBUG_CONTEXT_LIMIT,d=this.matched,e=this.match,
a=this.input,d=d.slice(0,d.length-e.length),d=(d.length>c?"...":"")+d.slice(-c).replace(/\n/," "),e=e+a,e=e.slice(0,c)+(e.length>c?"...":"");return d+e+"\n"+Array(d.length+1).join("-")+"^"},mapSymbol:function(c){var d=this.symbolMap;return!d?c:d[c]||(d[c]=this.genShortId("symbol"))},mapReverseSymbol:function(c){var d=this.symbolMap,e,a=this.reverseSymbolMap;if(!a&&d)for(e in a=this.reverseSymbolMap={},d)a[d[e]]=e;return a?a[c]:c},mapState:function(c){var d=this.stateMap;return!d?c:d[c]||(d[c]=this.genShortId("state"))},
lex:function(){var c=this.input,d,e,b,k=this.getCurrentRules();this.match=this.text="";if(!c)return this.mapSymbol(f.STATIC.END_TAG);for(d=0;d<k.length;d++){e=k[d];var p=e.token||e[0];b=e.action||e[2]||void 0;if(e=c.match(e.regexp||e[1])){if(d=e[0].match(/\n.*/g))this.lineNumber+=d.length;a.mix(this,{firstLine:this.lastLine,lastLine:this.lineNumber+1,firstColumn:this.lastColumn,lastColumn:d?d[d.length-1].length-1:this.lastColumn+e[0].length});d=this.match=e[0];this.matches=e;this.text=d;this.matched+=
d;b=b&&b.call(this);b=void 0===b?p:this.mapSymbol(b);this.input=c=c.slice(d.length);return b?b:this.lex()}}}};f.STATIC={INITIAL:"I",DEBUG_CONTEXT_LIMIT:20,END_TAG:"$EOF"};var b=new f({rules:[[0,/^[\s\S]*?(?={{)/,function(){var c=this.text,d,a=0;if(d=c.match(/\\+$/))a=d[0].length;a%2?(this.pushState("et"),c=c.slice(0,-1)):this.pushState("t");a&&(c=c.replace(/\\+$/g,function(c){return Array(c.length/2+1).join("\\")}));this.text=c;return"CONTENT"}],["b",/^[\s\S]+/,0],["b",/^[\s\S]{2,}?(?:(?={{)|$)/,
function(){this.popState()},["et"]],["c",/^{{(?:#|@|\^)/,0,["t"]],["d",/^{{\//,0,["t"]],["e",/^{{\s*else\s*}}/,function(){this.popState()},["t"]],[0,/^{{![\s\S]*?}}/,function(){this.popState()},["t"]],["b",/^{{%([\s\S]*?)%}}/,function(){this.text=this.matches[1]||"";this.popState()},["t"]],["f",/^{{{?/,0,["t"]],["g",/^\s+/,0,["t"]],["h",/^}}}?/,function(){this.popState()},["t"]],["i",/^\(/,0,["t"]],["j",/^\)/,0,["t"]],["k",/^\|\|/,0,["t"]],["l",/^&&/,0,["t"]],["m",/^===/,0,["t"]],["n",/^!==/,0,["t"]],
["o",/^>=/,0,["t"]],["p",/^<=/,0,["t"]],["q",/^>/,0,["t"]],["r",/^</,0,["t"]],["s",/^\+/,0,["t"]],["t",/^-/,0,["t"]],["u",/^\*/,0,["t"]],["v",/^\//,0,["t"]],["w",/^%/,0,["t"]],["x",/^!/,0,["t"]],["y",/^"(\\[\s\S]|[^\\"])*"/,function(){this.text=this.text.slice(1,-1).replace(/\\"/g,'"')},["t"]],["y",/^'(\\[\s\S]|[^\\'])*'/,function(){this.text=this.text.slice(1,-1).replace(/\\'/g,"'")},["t"]],["z",/^true/,0,["t"]],["z",/^false/,0,["t"]],["aa",/^\d+(?:\.\d+)?(?:e-?\d+)?/i,0,["t"]],["ab",/^=/,0,["t"]],
["ac",/^\.(?=})/,0,["t"]],["ac",/^\.\./,function(){this.pushState("ws")},["t"]],["ad",/^\//,function(){this.popState()},["ws"]],["ad",/^\./,0,["t"]],["ae",/^\[/,0,["t"]],["af",/^\]/,0,["t"]],["ac",/^[a-zA-Z0-9_$]+/,0,["t"]],["ag",/^./,0,["t"]]]});k.lexer=b;b.symbolMap={$EOF:"a",CONTENT:"b",OPEN_BLOCK:"c",OPEN_CLOSE_BLOCK:"d",INVERSE:"e",OPEN_TPL:"f",SPACE:"g",CLOSE:"h",LPAREN:"i",RPAREN:"j",OR:"k",AND:"l",LOGIC_EQUALS:"m",LOGIC_NOT_EQUALS:"n",GE:"o",LE:"p",GT:"q",LT:"r",PLUS:"s",MINUS:"t",MULTIPLY:"u",
DIVIDE:"v",MODULUS:"w",NOT:"x",STRING:"y",BOOLEAN:"z",NUMBER:"aa",EQUALS:"ab",ID:"ac",SEP:"ad",REF_START:"ae",REF_END:"af",INVALID:"ag",$START:"ah",program:"ai",statements:"aj",statement:"ak",openBlock:"al",closeBlock:"am",tpl:"an",inBlockTpl:"ao",path:"ap",inTpl:"aq",Expression:"ar",params:"as",hash:"at",param:"au",ConditionalOrExpression:"av",ConditionalAndExpression:"aw",EqualityExpression:"ax",RelationalExpression:"ay",AdditiveExpression:"az",MultiplicativeExpression:"ba",UnaryExpression:"bb",
PrimaryExpression:"bc",hashSegments:"bd",hashSegment:"be",pathSegments:"bf"};k.productions=[["ah",["ai"]],["ai",["aj","e","aj"],function(){return new this.yy.ProgramNode(this.lexer.lineNumber,this.$1,this.$3)}],["ai",["aj"],function(){return new this.yy.ProgramNode(this.lexer.lineNumber,this.$1)}],["aj",["ak"],function(){return[this.$1]}],["aj",["aj","ak"],function(){this.$1.push(this.$2)}],["ak",["al","ai","am"],function(){return new this.yy.BlockNode(this.lexer.lineNumber,this.$1,this.$2,this.$3)}],
["ak",["an"]],["ak",["b"],function(){return new this.yy.ContentNode(this.lexer.lineNumber,this.$1)}],["ao",["ap"],function(){return new this.yy.TplNode(this.lexer.lineNumber,this.$1)}],["ao",["aq"]],["al",["c","ao","h"],function(){"^"===this.$1.charAt(this.$1.length-1)&&(this.$2.isInverted=1);return this.$2}],["am",["d","ap","h"],function(){return this.$2}],["an",["f","aq","h"],function(){3===this.$1.length&&(this.$2.escaped=!1);return this.$2}],["an",["f","ar","h"],function(){var c=new this.yy.TplExpressionNode(this.lexer.lineNumber,
this.$2);3===this.$1.length&&(c.escaped=!1);return c}],["aq",["ap","g","as","g","at"],function(){return new this.yy.TplNode(this.lexer.lineNumber,this.$1,this.$3,this.$5)}],["aq",["ap","g","as"],function(){return new this.yy.TplNode(this.lexer.lineNumber,this.$1,this.$3)}],["aq",["ap","g","at"],function(){return new this.yy.TplNode(this.lexer.lineNumber,this.$1,null,this.$3)}],["as",["as","g","au"],function(){this.$1.push(this.$3)}],["as",["au"],function(){return[this.$1]}],["au",["ar"]],["ar",["av"]],
["av",["aw"]],["av",["av","k","aw"],function(){return new this.yy.ConditionalOrExpression(this.$1,this.$3)}],["aw",["ax"]],["aw",["aw","l","ax"],function(){return new this.yy.ConditionalAndExpression(this.$1,this.$3)}],["ax",["ay"]],["ax",["ax","m","ay"],function(){return new this.yy.EqualityExpression(this.$1,"===",this.$3)}],["ax",["ax","n","ay"],function(){return new this.yy.EqualityExpression(this.$1,"!==",this.$3)}],["ay",["az"]],["ay",["ay","r","az"],function(){return new this.yy.RelationalExpression(this.$1,
"<",this.$3)}],["ay",["ay","q","az"],function(){return new this.yy.RelationalExpression(this.$1,">",this.$3)}],["ay",["ay","p","az"],function(){return new this.yy.RelationalExpression(this.$1,"<=",this.$3)}],["ay",["ay","o","az"],function(){return new this.yy.RelationalExpression(this.$1,">=",this.$3)}],["az",["ba"]],["az",["az","s","ba"],function(){return new this.yy.AdditiveExpression(this.$1,"+",this.$3)}],["az",["az","t","ba"],function(){return new this.yy.AdditiveExpression(this.$1,"-",this.$3)}],
["ba",["bb"]],["ba",["ba","u","bb"],function(){return new this.yy.MultiplicativeExpression(this.$1,"*",this.$3)}],["ba",["ba","v","bb"],function(){return new this.yy.MultiplicativeExpression(this.$1,"/",this.$3)}],["ba",["ba","w","bb"],function(){return new this.yy.MultiplicativeExpression(this.$1,"%",this.$3)}],["bb",["x","bb"],function(){return new this.yy.UnaryExpression(this.$1,this.$2)}],["bb",["t","bb"],function(){return new this.yy.UnaryExpression(this.$1,this.$2)}],["bb",["bc"]],["bc",["y"],
function(){return new this.yy.StringNode(this.lexer.lineNumber,this.$1)}],["bc",["aa"],function(){return new this.yy.NumberNode(this.lexer.lineNumber,this.$1)}],["bc",["z"],function(){return new this.yy.BooleanNode(this.lexer.lineNumber,this.$1)}],["bc",["ap"]],["bc",["i","ar","j"],function(){return this.$2}],["at",["bd"],function(){return new this.yy.HashNode(this.lexer.lineNumber,this.$1)}],["bd",["bd","g","be"],function(){this.$1.push(this.$3)}],["bd",["be"],function(){return[this.$1]}],["be",
["ac","ab","ar"],function(){return[this.$1,this.$3]}],["ap",["bf"],function(){return new this.yy.IdNode(this.lexer.lineNumber,this.$1)}],["bf",["bf","ad","ac"],function(){this.$1.push(this.$3)}],["bf",["bf","ae","ar","af"],function(){this.$1.push(this.$3)}],["bf",["bf","ad","aa"],function(){this.$1.push(this.$3)}],["bf",["ac"],function(){return[this.$1]}]];k.table={gotos:{"0":{ai:4,aj:5,ak:6,al:7,an:8},2:{ao:10,aq:11,ap:12,bf:13},3:{aq:20,ar:21,av:22,aw:23,ax:24,ay:25,az:26,ba:27,bb:28,bc:29,ap:30,
bf:13},5:{ak:32,al:7,an:8},7:{ai:33,aj:5,ak:6,al:7,an:8},14:{ar:38,av:22,aw:23,ax:24,ay:25,az:26,ba:27,bb:28,bc:29,ap:39,bf:13},15:{bb:40,bc:29,ap:39,bf:13},16:{bb:41,bc:29,ap:39,bf:13},31:{aj:57,ak:6,al:7,an:8},33:{am:59},35:{as:61,au:62,ar:63,av:22,aw:23,ax:24,ay:25,az:26,ba:27,bb:28,bc:29,at:64,bd:65,be:66,ap:39,bf:13},37:{ar:69,av:22,aw:23,ax:24,ay:25,az:26,ba:27,bb:28,bc:29,ap:39,bf:13},44:{aw:71,ax:24,ay:25,az:26,ba:27,bb:28,bc:29,ap:39,bf:13},45:{ax:72,ay:25,az:26,ba:27,bb:28,bc:29,ap:39,bf:13},
46:{ay:73,az:26,ba:27,bb:28,bc:29,ap:39,bf:13},47:{ay:74,az:26,ba:27,bb:28,bc:29,ap:39,bf:13},48:{az:75,ba:27,bb:28,bc:29,ap:39,bf:13},49:{az:76,ba:27,bb:28,bc:29,ap:39,bf:13},50:{az:77,ba:27,bb:28,bc:29,ap:39,bf:13},51:{az:78,ba:27,bb:28,bc:29,ap:39,bf:13},52:{ba:79,bb:28,bc:29,ap:39,bf:13},53:{ba:80,bb:28,bc:29,ap:39,bf:13},54:{bb:81,bc:29,ap:39,bf:13},55:{bb:82,bc:29,ap:39,bf:13},56:{bb:83,bc:29,ap:39,bf:13},57:{ak:32,al:7,an:8},58:{ap:84,bf:13},85:{ar:90,av:22,aw:23,ax:24,ay:25,az:26,ba:27,bb:28,
bc:29,ap:39,bf:13},86:{au:91,ar:63,av:22,aw:23,ax:24,ay:25,az:26,ba:27,bb:28,bc:29,at:92,bd:65,be:66,ap:39,bf:13},87:{be:94}},action:{"0":{b:[1,void 0,1],c:[1,void 0,2],f:[1,void 0,3]},1:{a:[2,7],e:[2,7],c:[2,7],f:[2,7],b:[2,7],d:[2,7]},2:{ac:[1,void 0,9]},3:{i:[1,void 0,14],t:[1,void 0,15],x:[1,void 0,16],y:[1,void 0,17],z:[1,void 0,18],aa:[1,void 0,19],ac:[1,void 0,9]},4:{a:[0]},5:{a:[2,2],d:[2,2],b:[1,void 0,1],c:[1,void 0,2],e:[1,void 0,31],f:[1,void 0,3]},6:{a:[2,3],e:[2,3],c:[2,3],f:[2,3],b:[2,
3],d:[2,3]},7:{b:[1,void 0,1],c:[1,void 0,2],f:[1,void 0,3]},8:{a:[2,6],e:[2,6],c:[2,6],f:[2,6],b:[2,6],d:[2,6]},9:{h:[2,56],g:[2,56],ad:[2,56],ae:[2,56],k:[2,56],l:[2,56],m:[2,56],n:[2,56],o:[2,56],p:[2,56],q:[2,56],r:[2,56],s:[2,56],t:[2,56],u:[2,56],v:[2,56],w:[2,56],j:[2,56],af:[2,56]},10:{h:[1,void 0,34]},11:{h:[2,9]},12:{h:[2,8],g:[1,void 0,35]},13:{h:[2,52],g:[2,52],k:[2,52],l:[2,52],m:[2,52],n:[2,52],o:[2,52],p:[2,52],q:[2,52],r:[2,52],s:[2,52],t:[2,52],u:[2,52],v:[2,52],w:[2,52],j:[2,52],
af:[2,52],ad:[1,void 0,36],ae:[1,void 0,37]},14:{i:[1,void 0,14],t:[1,void 0,15],x:[1,void 0,16],y:[1,void 0,17],z:[1,void 0,18],aa:[1,void 0,19],ac:[1,void 0,9]},15:{i:[1,void 0,14],t:[1,void 0,15],x:[1,void 0,16],y:[1,void 0,17],z:[1,void 0,18],aa:[1,void 0,19],ac:[1,void 0,9]},16:{i:[1,void 0,14],t:[1,void 0,15],x:[1,void 0,16],y:[1,void 0,17],z:[1,void 0,18],aa:[1,void 0,19],ac:[1,void 0,9]},17:{h:[2,43],k:[2,43],l:[2,43],m:[2,43],n:[2,43],o:[2,43],p:[2,43],q:[2,43],r:[2,43],s:[2,43],t:[2,43],
u:[2,43],v:[2,43],w:[2,43],j:[2,43],g:[2,43],af:[2,43]},18:{h:[2,45],k:[2,45],l:[2,45],m:[2,45],n:[2,45],o:[2,45],p:[2,45],q:[2,45],r:[2,45],s:[2,45],t:[2,45],u:[2,45],v:[2,45],w:[2,45],j:[2,45],g:[2,45],af:[2,45]},19:{h:[2,44],k:[2,44],l:[2,44],m:[2,44],n:[2,44],o:[2,44],p:[2,44],q:[2,44],r:[2,44],s:[2,44],t:[2,44],u:[2,44],v:[2,44],w:[2,44],j:[2,44],g:[2,44],af:[2,44]},20:{h:[1,void 0,42]},21:{h:[1,void 0,43]},22:{h:[2,20],j:[2,20],g:[2,20],af:[2,20],k:[1,void 0,44]},23:{h:[2,21],k:[2,21],j:[2,
21],g:[2,21],af:[2,21],l:[1,void 0,45]},24:{h:[2,23],k:[2,23],l:[2,23],j:[2,23],g:[2,23],af:[2,23],m:[1,void 0,46],n:[1,void 0,47]},25:{h:[2,25],k:[2,25],l:[2,25],m:[2,25],n:[2,25],j:[2,25],g:[2,25],af:[2,25],o:[1,void 0,48],p:[1,void 0,49],q:[1,void 0,50],r:[1,void 0,51]},26:{h:[2,28],k:[2,28],l:[2,28],m:[2,28],n:[2,28],o:[2,28],p:[2,28],q:[2,28],r:[2,28],j:[2,28],g:[2,28],af:[2,28],s:[1,void 0,52],t:[1,void 0,53]},27:{h:[2,33],k:[2,33],l:[2,33],m:[2,33],n:[2,33],o:[2,33],p:[2,33],q:[2,33],r:[2,
33],s:[2,33],t:[2,33],j:[2,33],g:[2,33],af:[2,33],u:[1,void 0,54],v:[1,void 0,55],w:[1,void 0,56]},28:{h:[2,36],k:[2,36],l:[2,36],m:[2,36],n:[2,36],o:[2,36],p:[2,36],q:[2,36],r:[2,36],s:[2,36],t:[2,36],u:[2,36],v:[2,36],w:[2,36],j:[2,36],g:[2,36],af:[2,36]},29:{h:[2,42],k:[2,42],l:[2,42],m:[2,42],n:[2,42],o:[2,42],p:[2,42],q:[2,42],r:[2,42],s:[2,42],t:[2,42],u:[2,42],v:[2,42],w:[2,42],j:[2,42],g:[2,42],af:[2,42]},30:{h:[2,46],k:[2,46],l:[2,46],m:[2,46],n:[2,46],o:[2,46],p:[2,46],q:[2,46],r:[2,46],
s:[2,46],t:[2,46],u:[2,46],v:[2,46],w:[2,46],g:[1,void 0,35]},31:{b:[1,void 0,1],c:[1,void 0,2],f:[1,void 0,3]},32:{a:[2,4],e:[2,4],c:[2,4],f:[2,4],b:[2,4],d:[2,4]},33:{d:[1,void 0,58]},34:{c:[2,10],f:[2,10],b:[2,10]},35:{i:[1,void 0,14],t:[1,void 0,15],x:[1,void 0,16],y:[1,void 0,17],z:[1,void 0,18],aa:[1,void 0,19],ac:[1,void 0,60]},36:{aa:[1,void 0,67],ac:[1,void 0,68]},37:{i:[1,void 0,14],t:[1,void 0,15],x:[1,void 0,16],y:[1,void 0,17],z:[1,void 0,18],aa:[1,void 0,19],ac:[1,void 0,9]},38:{j:[1,
void 0,70]},39:{j:[2,46],k:[2,46],l:[2,46],m:[2,46],n:[2,46],o:[2,46],p:[2,46],q:[2,46],r:[2,46],s:[2,46],t:[2,46],u:[2,46],v:[2,46],w:[2,46],h:[2,46],g:[2,46],af:[2,46]},40:{h:[2,41],k:[2,41],l:[2,41],m:[2,41],n:[2,41],o:[2,41],p:[2,41],q:[2,41],r:[2,41],s:[2,41],t:[2,41],u:[2,41],v:[2,41],w:[2,41],j:[2,41],g:[2,41],af:[2,41]},41:{h:[2,40],k:[2,40],l:[2,40],m:[2,40],n:[2,40],o:[2,40],p:[2,40],q:[2,40],r:[2,40],s:[2,40],t:[2,40],u:[2,40],v:[2,40],w:[2,40],j:[2,40],g:[2,40],af:[2,40]},42:{a:[2,12],
e:[2,12],c:[2,12],f:[2,12],b:[2,12],d:[2,12]},43:{a:[2,13],e:[2,13],c:[2,13],f:[2,13],b:[2,13],d:[2,13]},44:{i:[1,void 0,14],t:[1,void 0,15],x:[1,void 0,16],y:[1,void 0,17],z:[1,void 0,18],aa:[1,void 0,19],ac:[1,void 0,9]},45:{i:[1,void 0,14],t:[1,void 0,15],x:[1,void 0,16],y:[1,void 0,17],z:[1,void 0,18],aa:[1,void 0,19],ac:[1,void 0,9]},46:{i:[1,void 0,14],t:[1,void 0,15],x:[1,void 0,16],y:[1,void 0,17],z:[1,void 0,18],aa:[1,void 0,19],ac:[1,void 0,9]},47:{i:[1,void 0,14],t:[1,void 0,15],x:[1,void 0,
16],y:[1,void 0,17],z:[1,void 0,18],aa:[1,void 0,19],ac:[1,void 0,9]},48:{i:[1,void 0,14],t:[1,void 0,15],x:[1,void 0,16],y:[1,void 0,17],z:[1,void 0,18],aa:[1,void 0,19],ac:[1,void 0,9]},49:{i:[1,void 0,14],t:[1,void 0,15],x:[1,void 0,16],y:[1,void 0,17],z:[1,void 0,18],aa:[1,void 0,19],ac:[1,void 0,9]},50:{i:[1,void 0,14],t:[1,void 0,15],x:[1,void 0,16],y:[1,void 0,17],z:[1,void 0,18],aa:[1,void 0,19],ac:[1,void 0,9]},51:{i:[1,void 0,14],t:[1,void 0,15],x:[1,void 0,16],y:[1,void 0,17],z:[1,void 0,
18],aa:[1,void 0,19],ac:[1,void 0,9]},52:{i:[1,void 0,14],t:[1,void 0,15],x:[1,void 0,16],y:[1,void 0,17],z:[1,void 0,18],aa:[1,void 0,19],ac:[1,void 0,9]},53:{i:[1,void 0,14],t:[1,void 0,15],x:[1,void 0,16],y:[1,void 0,17],z:[1,void 0,18],aa:[1,void 0,19],ac:[1,void 0,9]},54:{i:[1,void 0,14],t:[1,void 0,15],x:[1,void 0,16],y:[1,void 0,17],z:[1,void 0,18],aa:[1,void 0,19],ac:[1,void 0,9]},55:{i:[1,void 0,14],t:[1,void 0,15],x:[1,void 0,16],y:[1,void 0,17],z:[1,void 0,18],aa:[1,void 0,19],ac:[1,void 0,
9]},56:{i:[1,void 0,14],t:[1,void 0,15],x:[1,void 0,16],y:[1,void 0,17],z:[1,void 0,18],aa:[1,void 0,19],ac:[1,void 0,9]},57:{a:[2,1],d:[2,1],b:[1,void 0,1],c:[1,void 0,2],f:[1,void 0,3]},58:{ac:[1,void 0,9]},59:{a:[2,5],e:[2,5],c:[2,5],f:[2,5],b:[2,5],d:[2,5]},60:{h:[2,56],g:[2,56],k:[2,56],l:[2,56],m:[2,56],n:[2,56],o:[2,56],p:[2,56],q:[2,56],r:[2,56],s:[2,56],t:[2,56],u:[2,56],v:[2,56],w:[2,56],ad:[2,56],ae:[2,56],ab:[1,void 0,85]},61:{h:[2,15],g:[1,void 0,86]},62:{h:[2,18],g:[2,18]},63:{h:[2,
19],g:[2,19]},64:{h:[2,16]},65:{h:[2,48],g:[1,void 0,87]},66:{h:[2,50],g:[2,50]},67:{h:[2,55],g:[2,55],ad:[2,55],ae:[2,55],k:[2,55],l:[2,55],m:[2,55],n:[2,55],o:[2,55],p:[2,55],q:[2,55],r:[2,55],s:[2,55],t:[2,55],u:[2,55],v:[2,55],w:[2,55],j:[2,55],af:[2,55]},68:{h:[2,53],g:[2,53],ad:[2,53],ae:[2,53],k:[2,53],l:[2,53],m:[2,53],n:[2,53],o:[2,53],p:[2,53],q:[2,53],r:[2,53],s:[2,53],t:[2,53],u:[2,53],v:[2,53],w:[2,53],j:[2,53],af:[2,53]},69:{af:[1,void 0,88]},70:{h:[2,47],k:[2,47],l:[2,47],m:[2,47],
n:[2,47],o:[2,47],p:[2,47],q:[2,47],r:[2,47],s:[2,47],t:[2,47],u:[2,47],v:[2,47],w:[2,47],j:[2,47],g:[2,47],af:[2,47]},71:{h:[2,22],k:[2,22],j:[2,22],g:[2,22],af:[2,22],l:[1,void 0,45]},72:{h:[2,24],k:[2,24],l:[2,24],j:[2,24],g:[2,24],af:[2,24],m:[1,void 0,46],n:[1,void 0,47]},73:{h:[2,26],k:[2,26],l:[2,26],m:[2,26],n:[2,26],j:[2,26],g:[2,26],af:[2,26],o:[1,void 0,48],p:[1,void 0,49],q:[1,void 0,50],r:[1,void 0,51]},74:{h:[2,27],k:[2,27],l:[2,27],m:[2,27],n:[2,27],j:[2,27],g:[2,27],af:[2,27],o:[1,
void 0,48],p:[1,void 0,49],q:[1,void 0,50],r:[1,void 0,51]},75:{h:[2,32],k:[2,32],l:[2,32],m:[2,32],n:[2,32],o:[2,32],p:[2,32],q:[2,32],r:[2,32],j:[2,32],g:[2,32],af:[2,32],s:[1,void 0,52],t:[1,void 0,53]},76:{h:[2,31],k:[2,31],l:[2,31],m:[2,31],n:[2,31],o:[2,31],p:[2,31],q:[2,31],r:[2,31],j:[2,31],g:[2,31],af:[2,31],s:[1,void 0,52],t:[1,void 0,53]},77:{h:[2,30],k:[2,30],l:[2,30],m:[2,30],n:[2,30],o:[2,30],p:[2,30],q:[2,30],r:[2,30],j:[2,30],g:[2,30],af:[2,30],s:[1,void 0,52],t:[1,void 0,53]},78:{h:[2,
29],k:[2,29],l:[2,29],m:[2,29],n:[2,29],o:[2,29],p:[2,29],q:[2,29],r:[2,29],j:[2,29],g:[2,29],af:[2,29],s:[1,void 0,52],t:[1,void 0,53]},79:{h:[2,34],k:[2,34],l:[2,34],m:[2,34],n:[2,34],o:[2,34],p:[2,34],q:[2,34],r:[2,34],s:[2,34],t:[2,34],j:[2,34],g:[2,34],af:[2,34],u:[1,void 0,54],v:[1,void 0,55],w:[1,void 0,56]},80:{h:[2,35],k:[2,35],l:[2,35],m:[2,35],n:[2,35],o:[2,35],p:[2,35],q:[2,35],r:[2,35],s:[2,35],t:[2,35],j:[2,35],g:[2,35],af:[2,35],u:[1,void 0,54],v:[1,void 0,55],w:[1,void 0,56]},81:{h:[2,
37],k:[2,37],l:[2,37],m:[2,37],n:[2,37],o:[2,37],p:[2,37],q:[2,37],r:[2,37],s:[2,37],t:[2,37],u:[2,37],v:[2,37],w:[2,37],j:[2,37],g:[2,37],af:[2,37]},82:{h:[2,38],k:[2,38],l:[2,38],m:[2,38],n:[2,38],o:[2,38],p:[2,38],q:[2,38],r:[2,38],s:[2,38],t:[2,38],u:[2,38],v:[2,38],w:[2,38],j:[2,38],g:[2,38],af:[2,38]},83:{h:[2,39],k:[2,39],l:[2,39],m:[2,39],n:[2,39],o:[2,39],p:[2,39],q:[2,39],r:[2,39],s:[2,39],t:[2,39],u:[2,39],v:[2,39],w:[2,39],j:[2,39],g:[2,39],af:[2,39]},84:{h:[1,void 0,89]},85:{i:[1,void 0,
14],t:[1,void 0,15],x:[1,void 0,16],y:[1,void 0,17],z:[1,void 0,18],aa:[1,void 0,19],ac:[1,void 0,9]},86:{i:[1,void 0,14],t:[1,void 0,15],x:[1,void 0,16],y:[1,void 0,17],z:[1,void 0,18],aa:[1,void 0,19],ac:[1,void 0,60]},87:{ac:[1,void 0,93]},88:{h:[2,54],g:[2,54],ad:[2,54],ae:[2,54],k:[2,54],l:[2,54],m:[2,54],n:[2,54],o:[2,54],p:[2,54],q:[2,54],r:[2,54],s:[2,54],t:[2,54],u:[2,54],v:[2,54],w:[2,54],j:[2,54],af:[2,54]},89:{a:[2,11],e:[2,11],c:[2,11],f:[2,11],b:[2,11],d:[2,11]},90:{h:[2,51],g:[2,51]},
91:{h:[2,17],g:[2,17]},92:{h:[2,14]},93:{ab:[1,void 0,85]},94:{h:[2,49],g:[2,49]}}};k.parse=function(c){var d=this.lexer,a,b,f=this.table,k=f.gotos,f=f.action,n=this.productions,l=[null],i=[0];for(d.resetInput(c);;){c=i[i.length-1];a||(a=d.lex());if(!a)return!1;b=f[c]&&f[c][a];if(!b){a=[];if(f[c])for(var q in f[c])a.push(this.lexer.mapReverseSymbol(q));d.showDebugInfo();a.join(", ");return!1}switch(b[0]){case 1:i.push(a);l.push(d.text);i.push(b[2]);a=null;break;case 2:var m=n[b[1]],c=m.symbol||m[0];
b=m.action||m[2];var h=(m.rhs||m[1]).length,o=0,g,m=l[l.length-h];g=void 0;for(this.$$=m;o<h;o++)this["$"+(h-o)]=l[l.length-1-o];b&&(g=b.call(this));m=void 0!==g?g:this.$$;h&&(i=i.slice(0,-2*h),l=l.slice(0,-1*h));i.push(c);l.push(m);i.push(k[i[i.length-2]][i[i.length-1]]);break;case 0:return m}}};return k});
KISSY.add("xtemplate/compiler/ast",[],function(k){var a={ProgramNode:function(a,b,c){this.lineNumber=a;this.statements=b;this.inverse=c}};a.ProgramNode.prototype.type="program";a.BlockNode=function(a,b,c,d){k.equals(b.path.parts,d.parts);this.lineNumber=a;this.tpl=b;this.program=c};a.BlockNode.prototype.type="block";a.TplNode=function(a,b,c,d){this.lineNumber=a;this.path=b;this.params=c;this.hash=d;this.escaped=!0;this.isInverted=!1};a.TplNode.prototype.type="tpl";a.TplExpressionNode=function(a,b){this.lineNumber=
a;this.expression=b;this.escaped=!0};a.TplExpressionNode.prototype.type="tplExpression";a.ContentNode=function(a,b){this.lineNumber=a;this.value=b};a.ContentNode.prototype.type="content";a.UnaryExpression=function(a,b){this.value=b;this.unaryType=a};a.UnaryExpression.prototype.type="unaryExpression";a.MultiplicativeExpression=function(a,b,c){this.op1=a;this.opType=b;this.op2=c};a.MultiplicativeExpression.prototype.type="multiplicativeExpression";a.AdditiveExpression=function(a,b,c){this.op1=a;this.opType=
b;this.op2=c};a.AdditiveExpression.prototype.type="additiveExpression";a.RelationalExpression=function(a,b,c){this.op1=a;this.opType=b;this.op2=c};a.RelationalExpression.prototype.type="relationalExpression";a.EqualityExpression=function(a,b,c){this.op1=a;this.opType=b;this.op2=c};a.EqualityExpression.prototype.type="equalityExpression";a.ConditionalAndExpression=function(a,b){this.op1=a;this.op2=b};a.ConditionalAndExpression.prototype.type="conditionalAndExpression";a.ConditionalOrExpression=function(a,
b){this.op1=a;this.op2=b};a.ConditionalOrExpression.prototype.type="conditionalOrExpression";a.StringNode=function(a,b){this.lineNumber=a;this.value=b};a.StringNode.prototype.type="string";a.NumberNode=function(a,b){this.lineNumber=a;this.value=b};a.NumberNode.prototype.type="number";a.BooleanNode=function(a,b){this.lineNumber=a;this.value=b};a.BooleanNode.prototype.type="boolean";a.HashNode=function(a,b){var c={};this.lineNumber=a;k.each(b,function(a){c[a[0]]=a[1]});this.value=c};a.HashNode.prototype.type=
"hash";a.IdNode=function(a,b){var c=[],d=0;this.lineNumber=a;k.each(b,function(a){".."===a?d++:c.push(a)});this.parts=c;this.string=c.join(".");this.depth=d};a.IdNode.prototype.type="id";return a});
KISSY.add("xtemplate/compiler",["xtemplate/runtime","./compiler/parser","./compiler/ast"],function(k,a){function f(h,a){h=a?b(h,!1):h.replace(/\\/g,"\\\\").replace(/'/g,"\\'");return h=h.replace(/\r/g,"\\r").replace(/\n/g,"\\n").replace(/\t/g,"\\t")}function b(h,a){return h.replace(a?s:p,function(h){h.length%2&&(h="\\"+h);return h})}function c(h,a){n.apply(h,a)}function d(h){return h[h.length-1]}var e=a("xtemplate/runtime"),r=a("./compiler/parser");r.yy=a("./compiler/ast");var s=/\\*"/g,p=/\\*'/g,
n=[].push,l=0,i=0,q={genFunction:function(h,a){var g=[];a||g.push("function(scope) {");g.push('var buffer = ""'+(a?",":";"));if(a){g.push("config = this.config,engine = this,moduleWrap, utils = config.utils;");g.push('if (typeof module !== "undefined" && module.kissy) {moduleWrap = module;}');var d="",b,t=e.utils;for(b in t)d+=b+"Util = utils."+b+",";d&&g.push("var "+d.slice(0,d.length-1)+";")}if(h){d=0;for(b=h.length;d<b;d++)c(g,this[h[d].type](h[d]))}g.push("return buffer;");return!a?(g.push("}"),
g):{params:["scope","S","undefined"],source:g}},genIdOrInlineCommand:function(h,a){var g=[],d=h.depth,b,e=h.parts,j="id"+l++;if(0===d){var f=a&&this.genConfig(a);f&&(b=f[0],c(g,f[1]))}e=this.getIdStringFromIdParts(g,e);d||k.startsWith(e,"this.")?g.push("var "+j+' = getPropertyUtil(engine,scope,"'+e+'",'+d+","+h.lineNumber+");"):b?("include"===e&&g.push('if(moduleWrap) {require("'+a.params[0].value+'");'+b+".params[0] = moduleWrap.resolveByName("+b+".params[0]);}"),g.push("var "+j+" = runInlineCommandUtil(engine,scope,"+
b+',"'+e+'",'+h.lineNumber+");")):g.push("var "+j+" = getPropertyOrRunCommandUtil(engine,scope,"+(b||"{}")+',"'+e+'",'+d+","+h.lineNumber+");");return[j,g]},genOpExpression:function(h,a){var g=[],b,e,f=this[h.op1.type](h.op1),j=this[h.op2.type](h.op2);b=f[0];e=j[0];if(b&&e)return c(g,f[1]),c(g,j[1]),g.push(b+a+e),["",g];if(!b&&!e)return c(g,f[1].slice(0,-1)),c(g,j[1].slice(0,-1)),g.push("("+d(f[1])+")"+a+"("+d(j[1])+")"),["",g];if(b&&!e)return c(g,f[1]),c(g,j[1].slice(0,-1)),g.push(b+a+"("+d(j[1])+
")"),["",g];if(!b&&e)return c(g,f[1].slice(0,-1)),c(g,j[1]),g.push("("+d(f[1])+")"+a+e),["",g]},genConfig:function(a){var b=[],g,e,f=this;if(a){e=a.params;a=a.hash;if(e||a)g="config"+l++,b.push("var "+g+" = {};");if(e){var i="params"+l++;b.push("var "+i+" = [];");k.each(e,function(a){a=f[a.type](a);a[0]?(c(b,a[1]),b.push(i+".push("+a[0]+");")):(c(b,a[1].slice(0,-1)),b.push(i+".push("+d(a[1])+");"))});b.push(g+".params="+i+";")}if(a){var j="hash"+l++;b.push("var "+j+" = {};");k.each(a.value,function(a,
h){var g=f[a.type](a);g[0]?(c(b,g[1]),b.push(j+'["'+h+'"] = '+g[0]+";")):(c(b,g[1].slice(0,-1)),b.push(j+'["'+h+'"] = '+d(g[1])+";"))});b.push(g+".hash="+j+";")}}return[g,b]},conditionalOrExpression:function(a){return this.genOpExpression(a,"||")},conditionalAndExpression:function(a){return this.genOpExpression(a,"&&")},relationalExpression:function(a){return this.genOpExpression(a,a.opType)},equalityExpression:function(a){return this.genOpExpression(a,a.opType)},additiveExpression:function(a){return this.genOpExpression(a,
a.opType)},multiplicativeExpression:function(a){return this.genOpExpression(a,a.opType)},unaryExpression:function(a){var c=[],b,e=a.unaryType,a=this[a.value.type](a.value);n.apply(c,a[1]);(b=a[0])?c.push(b+"="+e+b+";"):c[c.length-1]=""+e+d(c);return[b,c]},string:function(a){return["",["'"+f(a.value,!0)+"'"]]},number:function(a){return["",[a.value]]},"boolean":function(a){return["",[a.value]]},id:function(a){var c=[],b=a.depth,d=a.parts,e="id"+l++,d=this.getIdStringFromIdParts(c,d);c.push("var "+e+
' = getPropertyUtil(engine,scope,"'+d+'",'+b+","+a.lineNumber+");");return[e,c]},block:function(a){var b=a.program,d=[],e=a.tpl,f=this.genConfig(e),a=f[0],i=e.path,j=i.string;c(d,f[1]);a||(a=k.guid("config"),d.push("var "+a+" = {};"));d.push(a+".fn="+this.genFunction(b.statements).join("\n")+";");b.inverse&&(b=this.genFunction(b.inverse).join("\n"),d.push(a+".inverse="+b+";"));e.isInverted&&(b="inverse"+l++,d.push("var "+b+"="+a+".fn;"),d.push(a+".fn = "+a+".inverse;"),d.push(a+".inverse = "+b+";"));
if(!e.hash&&!e.params){e=i.parts;for(b=0;b<e.length;b++)if("string"!==typeof e[b]){j=this.getIdStringFromIdParts(d,e);break}}d.push("buffer += runBlockCommandUtil(engine, scope, "+a+', "'+j+'", '+i.lineNumber+");");return d},content:function(a){return["buffer += '"+f(a.value,!1)+"';"]},tpl:function(a){var b=[],d=this.genIdOrInlineCommand(a.path,a);c(b,d[1]);b.push("buffer += renderOutputUtil("+d[0]+","+a.escaped+");");return b},tplExpression:function(a){var b=[],e=a.escaped,f;f=a.expression;a=a.expression.type;
f="id"===a?this.genIdOrInlineCommand(f):this[a](f);f[0]?(c(b,f[1]),f=f[0]):(c(b,f[1].slice(0,-1)),f=d(f[1]));b.push("buffer += renderOutputUtil("+f+","+e+");");return b},getIdStringFromIdParts:function(a,b){var d="",e,f,i,j=!0;for(e=0;e<b.length;e++)f=b[e],i=f.type,j||(d+="."),i?(f=this[i](f),f[0]&&(c(a,f[1]),d+='"+'+f[0]+'+"',j=!0)):(d+=f,j=!1);return d}},m;return m={parse:function(a){return r.parse(a)},compileToStr:function(a){a=this.compile(a);return"function("+a.params.join(",")+"){\n"+a.source.join("\n")+
"}"},compile:function(a){a=this.parse(a);l=0;return q.genFunction(a.statements,!0)},compileToFn:function(a,b){var c=m.compile(a),b=b||{},d="sourceURL="+(b.name?b.name:"xtemplate"+i++)+".js";return Function.apply(null,[].concat(c.params).concat(c.source.join("\n")+"\n//@ "+d+"\n//# "+d))}}});
