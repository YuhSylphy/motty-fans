const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["static/lazy-De--Qebx.js","static/store-D5SVm-Xt.js","static/redux-toolkit.modern-J4jBE5Lh.js","static/hooks-DVGqdmTD.js","static/jsx-runtime-_5WuVDLK.js","static/ducks-BgW1bLXP.js","static/DefaultPropsProvider-CSjmKMGg.js","static/createBox-gRr0yNN2.js","static/useTheme-BXk4qgwv.js","static/resolveComponentProps-LjkoubKo.js","static/TransitionGroupContext-OigCRaz6.js","static/IconButton--QJhXQVt.js","static/Link-BMnGLxO3.js","static/ListItem-CO4yw9-0.js","static/List-Bzz6kMxx.js","static/Paper-CR0QuJQc.js","static/Container-C-BfI4Bx.js","static/useThemeProps-DPnKjH86.js","static/util-HTIWu6Dw.js","static/of-P7tEz52u.js","static/lazy-Z_2cHhyX.js","static/datetime-BT3pVNmC.js","static/base-Dytjuklp.js","static/useFormControl-CkXjXPAx.js","static/TextField-B_grzDbP.js","static/utils-Ds4Qqy87.js","static/index-CTAOeIM6.js","static/useSlotProps-BWWNHuKW.js","static/Modal-x9pmWsIV.js","static/Backdrop-Diuy1ohG.js","static/GlobalStyles-CG4ksUWf.js","static/TableRow-CK9a4Eab.js","static/Box-DH0NNVFk.js","static/lazy-ybAcx4Gq.js","static/index-jm3myFUT.js","static/useThemeProps-BtTayzLQ.js","static/router-CHF4NMPy.js","static/createSvgIcon-gwGZt7nW.js","static/dialogTitleClasses-BLxeuIxb.js","static/hash-CNa9Aaa-.js","static/tap-OOdOZglU.js","static/lazy-CMudVJL3.js","static/epic-D-kCLs8l.js","static/horse-TiGlIaa3.js","static/Collapse-C-DQ92tY.js","static/lazy-BvWpicMa.js","static/lazy-D7ztcrYq.css","static/lazy-DCbOMr5P.js","static/lazy-D3Ms65M1.css","static/lazy-B44D2bix.js"])))=>i.map(i=>d[i]);
import{b as On,r as dt,j as A,R as L}from"./jsx-runtime-_5WuVDLK.js";import{i as Sn,k as wn,j as Pn,g as pt,u as En,_ as _n,b as It,c as In,h as Tn}from"./DefaultPropsProvider-CSjmKMGg.js";var Re={exports:{}},Cn="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED",Nn=Cn,Mn=Nn;function je(){}function De(){}De.resetWarningCache=je;var Ln=function(){function t(a,r,o,i,s,l){if(l!==Mn){var c=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw c.name="Invariant Violation",c}}t.isRequired=t;function e(){return t}var n={array:t,bigint:t,bool:t,func:t,number:t,object:t,string:t,symbol:t,any:t,arrayOf:e,element:t,elementType:t,instanceOf:e,node:t,objectOf:e,oneOf:e,oneOfType:e,shape:e,exact:e,checkPropTypes:De,resetWarningCache:je};return n.PropTypes=n,n};Re.exports=Ln();var zn=Re.exports;const p=On(zn);function Fn(t){return Sn("MuiSvgIcon",t)}wn("MuiSvgIcon",["root","colorPrimary","colorSecondary","colorAction","colorError","colorDisabled","fontSizeInherit","fontSizeSmall","fontSizeMedium","fontSizeLarge"]);const Rn=["children","className","color","component","fontSize","htmlColor","inheritViewBox","titleAccess","viewBox"],jn=t=>{const{color:e,fontSize:n,classes:a}=t,r={root:["root",e!=="inherit"&&`color${pt(e)}`,`fontSize${pt(n)}`]};return Tn(r,Fn,a)},Dn=Pn("svg",{name:"MuiSvgIcon",slot:"Root",overridesResolver:(t,e)=>{const{ownerState:n}=t;return[e.root,n.color!=="inherit"&&e[`color${pt(n.color)}`],e[`fontSize${pt(n.fontSize)}`]]}})(({theme:t,ownerState:e})=>{var n,a,r,o,i,s,l,c,f,d,m,h,v;return{userSelect:"none",width:"1em",height:"1em",display:"inline-block",fill:e.hasSvgAsChild?void 0:"currentColor",flexShrink:0,transition:(n=t.transitions)==null||(a=n.create)==null?void 0:a.call(n,"fill",{duration:(r=t.transitions)==null||(r=r.duration)==null?void 0:r.shorter}),fontSize:{inherit:"inherit",small:((o=t.typography)==null||(i=o.pxToRem)==null?void 0:i.call(o,20))||"1.25rem",medium:((s=t.typography)==null||(l=s.pxToRem)==null?void 0:l.call(s,24))||"1.5rem",large:((c=t.typography)==null||(f=c.pxToRem)==null?void 0:f.call(c,35))||"2.1875rem"}[e.fontSize],color:(d=(m=(t.vars||t).palette)==null||(m=m[e.color])==null?void 0:m.main)!=null?d:{action:(h=(t.vars||t).palette)==null||(h=h.action)==null?void 0:h.active,disabled:(v=(t.vars||t).palette)==null||(v=v.action)==null?void 0:v.disabled,inherit:void 0}[e.color]}}),Tt=dt.forwardRef(function(e,n){const a=En({props:e,name:"MuiSvgIcon"}),{children:r,className:o,color:i="inherit",component:s="svg",fontSize:l="medium",htmlColor:c,inheritViewBox:f=!1,titleAccess:d,viewBox:m="0 0 24 24"}=a,h=_n(a,Rn),v=dt.isValidElement(r)&&r.type==="svg",S=It({},a,{color:i,component:s,fontSize:l,instanceFontSize:e.fontSize,inheritViewBox:f,viewBox:m,hasSvgAsChild:v}),y={};f||(y.viewBox=m);const x=jn(S);return A.jsxs(Dn,It({as:s,className:In(x.root,o),focusable:"false",color:c,"aria-hidden":d?void 0:!0,role:d?"img":void 0,ref:n},y,h,v&&r.props,{ownerState:S,children:[v?r.props.children:r,d?A.jsx("title",{children:d}):null]}))});Tt.muiName="SvgIcon";function q(t,e){function n(a,r){return A.jsx(Tt,It({"data-testid":`${e}Icon`,ref:r},a,{children:t}))}return n.muiName=Tt.muiName,dt.memo(dt.forwardRef(n))}const Yn="modulepreload",Un=function(t){return"/motty-fans/"+t},ie={},W=function(e,n,a){let r=Promise.resolve();if(n&&n.length>0){document.getElementsByTagName("link");const o=document.querySelector("meta[property=csp-nonce]"),i=(o==null?void 0:o.nonce)||(o==null?void 0:o.getAttribute("nonce"));r=Promise.all(n.map(s=>{if(s=Un(s),s in ie)return;ie[s]=!0;const l=s.endsWith(".css"),c=l?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${s}"]${c}`))return;const f=document.createElement("link");if(f.rel=l?"stylesheet":Yn,l||(f.as="script",f.crossOrigin=""),f.href=s,i&&f.setAttribute("nonce",i),document.head.appendChild(f),l)return new Promise((d,m)=>{f.addEventListener("load",d),f.addEventListener("error",()=>m(new Error(`Unable to preload CSS for ${s}`)))})}))}return r.then(()=>e()).catch(o=>{const i=new Event("vite:preloadError",{cancelable:!0});if(i.payload=o,window.dispatchEvent(i),!i.defaultPrevented)throw o})},$n=q([A.jsx("path",{d:"M9 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9m2.79 13.21L8 12.41V7h2v4.59l3.21 3.21z"},"0"),A.jsx("path",{d:"M17.99 3.52v2.16C20.36 6.8 22 9.21 22 12c0 2.79-1.64 5.2-4.01 6.32v2.16C21.48 19.24 24 15.91 24 12s-2.52-7.24-6.01-8.48"},"1")],"BrowseGallery"),Wn=q(A.jsx("path",{d:"M12 7.77 18.39 18H5.61zM12 4 2 20h20z"}),"ChangeHistory"),Hn=q(A.jsx("path",{d:"M7 5h10v2h2V3c0-1.1-.9-1.99-2-1.99L7 1c-1.1 0-2 .9-2 2v4h2zm8.41 11.59L20 12l-4.59-4.59L14 8.83 17.17 12 14 15.17zM10 15.17 6.83 12 10 8.83 8.59 7.41 4 12l4.59 4.59zM17 19H7v-2H5v4c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2v-4h-2z"}),"DeveloperMode"),Vn=q(A.jsx("path",{d:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m1 15h-2v-6h2zm0-8h-2V7h2z"}),"Info"),Gn=q(A.jsx("path",{d:"M3 13h2v-2H3zm0 4h2v-2H3zm0-8h2V7H3zm4 4h14v-2H7zm0 4h14v-2H7zM7 7v2h14V7z"}),"List"),Bn=q(A.jsx("path",{d:"M23 8c0 1.1-.9 2-2 2-.18 0-.35-.02-.51-.07l-3.56 3.55c.05.16.07.34.07.52 0 1.1-.9 2-2 2s-2-.9-2-2c0-.18.02-.36.07-.52l-2.55-2.55c-.16.05-.34.07-.52.07s-.36-.02-.52-.07l-4.55 4.56c.05.16.07.33.07.51 0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2c.18 0 .35.02.51.07l4.56-4.55C8.02 9.36 8 9.18 8 9c0-1.1.9-2 2-2s2 .9 2 2c0 .18-.02.36-.07.52l2.55 2.55c.16-.05.34-.07.52-.07s.36.02.52.07l3.55-3.56C19.02 8.35 19 8.18 19 8c0-1.1.9-2 2-2s2 .9 2 2"}),"Timeline"),Xn=q(A.jsx("path",{d:"M10 15l5.19-3L10 9v6m11.56-7.83c.13.47.22 1.1.28 1.9.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83-.25.9-.83 1.48-1.73 1.73-.47.13-1.33.22-2.65.28-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44-.9-.25-1.48-.83-1.73-1.73-.13-.47-.22-1.1-.28-1.9-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83.25-.9.83-1.48 1.73-1.73.47-.13 1.33-.22 2.65-.28 1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44.9.25 1.48.83 1.73 1.73z"}),"YouTube"),se=()=>{};let Xt={},Ye={},Ue=null,$e={mark:se,measure:se};try{typeof window<"u"&&(Xt=window),typeof document<"u"&&(Ye=document),typeof MutationObserver<"u"&&(Ue=MutationObserver),typeof performance<"u"&&($e=performance)}catch{}const{userAgent:le=""}=Xt.navigator||{},Y=Xt,g=Ye,ce=Ue,ft=$e;Y.document;const R=!!g.documentElement&&!!g.head&&typeof g.addEventListener=="function"&&typeof g.createElement=="function",We=~le.indexOf("MSIE")||~le.indexOf("Trident/");var b="classic",He="duotone",w="sharp",P="sharp-duotone",qn=[b,He,w,P],Kn={classic:{900:"fas",400:"far",normal:"far",300:"fal",100:"fat"},sharp:{900:"fass",400:"fasr",300:"fasl",100:"fast"},"sharp-duotone":{900:"fasds"}},fe={kit:{fak:"kit","fa-kit":"kit"},"kit-duotone":{fakd:"kit-duotone","fa-kit-duotone":"kit-duotone"}},Qn=["kit"],Jn=/fa(s|r|l|t|d|b|k|kd|ss|sr|sl|st|sds)?[\-\ ]/,Zn=/Font ?Awesome ?([56 ]*)(Solid|Regular|Light|Thin|Duotone|Brands|Free|Pro|Sharp Duotone|Sharp|Kit)?.*/i,ta={"Font Awesome 5 Free":{900:"fas",400:"far"},"Font Awesome 5 Pro":{900:"fas",400:"far",normal:"far",300:"fal"},"Font Awesome 5 Brands":{400:"fab",normal:"fab"},"Font Awesome 5 Duotone":{900:"fad"}},ea={"Font Awesome 6 Free":{900:"fas",400:"far"},"Font Awesome 6 Pro":{900:"fas",400:"far",normal:"far",300:"fal",100:"fat"},"Font Awesome 6 Brands":{400:"fab",normal:"fab"},"Font Awesome 6 Duotone":{900:"fad"},"Font Awesome 6 Sharp":{900:"fass",400:"fasr",normal:"fasr",300:"fasl",100:"fast"},"Font Awesome 6 Sharp Duotone":{900:"fasds"}},na={classic:{"fa-brands":"fab","fa-duotone":"fad","fa-light":"fal","fa-regular":"far","fa-solid":"fas","fa-thin":"fat"},sharp:{"fa-solid":"fass","fa-regular":"fasr","fa-light":"fasl","fa-thin":"fast"},"sharp-duotone":{"fa-solid":"fasds"}},aa={classic:["fas","far","fal","fat"],sharp:["fass","fasr","fasl","fast"],"sharp-duotone":["fasds"]},ra={classic:{fab:"fa-brands",fad:"fa-duotone",fal:"fa-light",far:"fa-regular",fas:"fa-solid",fat:"fa-thin"},sharp:{fass:"fa-solid",fasr:"fa-regular",fasl:"fa-light",fast:"fa-thin"},"sharp-duotone":{fasds:"fa-solid"}},oa={classic:{solid:"fas",regular:"far",light:"fal",thin:"fat",duotone:"fad",brands:"fab"},sharp:{solid:"fass",regular:"fasr",light:"fasl",thin:"fast"},"sharp-duotone":{solid:"fasds"}},Ve={classic:{fa:"solid",fas:"solid","fa-solid":"solid",far:"regular","fa-regular":"regular",fal:"light","fa-light":"light",fat:"thin","fa-thin":"thin",fad:"duotone","fa-duotone":"duotone",fab:"brands","fa-brands":"brands"},sharp:{fa:"solid",fass:"solid","fa-solid":"solid",fasr:"regular","fa-regular":"regular",fasl:"light","fa-light":"light",fast:"thin","fa-thin":"thin"},"sharp-duotone":{fa:"solid",fasds:"solid","fa-solid":"solid"}},ia=["solid","regular","light","thin","duotone","brands"],Ge=[1,2,3,4,5,6,7,8,9,10],sa=Ge.concat([11,12,13,14,15,16,17,18,19,20]),nt={GROUP:"duotone-group",SWAP_OPACITY:"swap-opacity",PRIMARY:"primary",SECONDARY:"secondary"},la=[...Object.keys(aa),...ia,"2xs","xs","sm","lg","xl","2xl","beat","border","fade","beat-fade","bounce","flip-both","flip-horizontal","flip-vertical","flip","fw","inverse","layers-counter","layers-text","layers","li","pull-left","pull-right","pulse","rotate-180","rotate-270","rotate-90","rotate-by","shake","spin-pulse","spin-reverse","spin","stack-1x","stack-2x","stack","ul",nt.GROUP,nt.SWAP_OPACITY,nt.PRIMARY,nt.SECONDARY].concat(Ge.map(t=>"".concat(t,"x"))).concat(sa.map(t=>"w-".concat(t))),ca={"Font Awesome Kit":{400:"fak",normal:"fak"},"Font Awesome Kit Duotone":{400:"fakd",normal:"fakd"}},fa={kit:{"fa-kit":"fak"},"kit-duotone":{"fa-kit-duotone":"fakd"}},ua={kit:{fak:"fa-kit"},"kit-duotone":{fakd:"fa-kit-duotone"}},ue={kit:{kit:"fak"},"kit-duotone":{"kit-duotone":"fakd"}};const z="___FONT_AWESOME___",Ct=16,Be="fa",Xe="svg-inline--fa",B="data-fa-i2svg",Nt="data-fa-pseudo-element",ma="data-fa-pseudo-element-pending",qt="data-prefix",Kt="data-icon",me="fontawesome-i2svg",da="async",pa=["HTML","HEAD","STYLE","SCRIPT"],qe=(()=>{try{return!0}catch{return!1}})(),Ke=[b,w,P];function lt(t){return new Proxy(t,{get(e,n){return n in e?e[n]:e[b]}})}const Qe={...Ve};Qe[b]={...Ve[b],...fe.kit,...fe["kit-duotone"]};const V=lt(Qe),Mt={...oa};Mt[b]={...Mt[b],...ue.kit,...ue["kit-duotone"]};const it=lt(Mt),Lt={...ra};Lt[b]={...Lt[b],...ua.kit};const G=lt(Lt),zt={...na};zt[b]={...zt[b],...fa.kit};const ha=lt(zt),ga=Jn,Je="fa-layers-text",ba=Zn,ya={...Kn};lt(ya);const va=["class","data-prefix","data-icon","data-fa-transform","data-fa-mask"],Ot=nt,Z=new Set;Object.keys(it[b]).map(Z.add.bind(Z));Object.keys(it[w]).map(Z.add.bind(Z));Object.keys(it[P]).map(Z.add.bind(Z));const xa=[...Qn,...la],rt=Y.FontAwesomeConfig||{};function Aa(t){var e=g.querySelector("script["+t+"]");if(e)return e.getAttribute(t)}function ka(t){return t===""?!0:t==="false"?!1:t==="true"?!0:t}g&&typeof g.querySelector=="function"&&[["data-family-prefix","familyPrefix"],["data-css-prefix","cssPrefix"],["data-family-default","familyDefault"],["data-style-default","styleDefault"],["data-replacement-class","replacementClass"],["data-auto-replace-svg","autoReplaceSvg"],["data-auto-add-css","autoAddCss"],["data-auto-a11y","autoA11y"],["data-search-pseudo-elements","searchPseudoElements"],["data-observe-mutations","observeMutations"],["data-mutate-approach","mutateApproach"],["data-keep-original-source","keepOriginalSource"],["data-measure-performance","measurePerformance"],["data-show-missing-icons","showMissingIcons"]].forEach(e=>{let[n,a]=e;const r=ka(Aa(n));r!=null&&(rt[a]=r)});const Ze={styleDefault:"solid",familyDefault:"classic",cssPrefix:Be,replacementClass:Xe,autoReplaceSvg:!0,autoAddCss:!0,autoA11y:!0,searchPseudoElements:!1,observeMutations:!0,mutateApproach:"async",keepOriginalSource:!0,measurePerformance:!1,showMissingIcons:!0};rt.familyPrefix&&(rt.cssPrefix=rt.familyPrefix);const tt={...Ze,...rt};tt.autoReplaceSvg||(tt.observeMutations=!1);const u={};Object.keys(Ze).forEach(t=>{Object.defineProperty(u,t,{enumerable:!0,set:function(e){tt[t]=e,ot.forEach(n=>n(u))},get:function(){return tt[t]}})});Object.defineProperty(u,"familyPrefix",{enumerable:!0,set:function(t){tt.cssPrefix=t,ot.forEach(e=>e(u))},get:function(){return tt.cssPrefix}});Y.FontAwesomeConfig=u;const ot=[];function Oa(t){return ot.push(t),()=>{ot.splice(ot.indexOf(t),1)}}const j=Ct,T={size:16,x:0,y:0,rotate:0,flipX:!1,flipY:!1};function Sa(t){if(!t||!R)return;const e=g.createElement("style");e.setAttribute("type","text/css"),e.innerHTML=t;const n=g.head.childNodes;let a=null;for(let r=n.length-1;r>-1;r--){const o=n[r],i=(o.tagName||"").toUpperCase();["STYLE","LINK"].indexOf(i)>-1&&(a=o)}return g.head.insertBefore(e,a),t}const wa="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";function st(){let t=12,e="";for(;t-- >0;)e+=wa[Math.random()*62|0];return e}function et(t){const e=[];for(let n=(t||[]).length>>>0;n--;)e[n]=t[n];return e}function Qt(t){return t.classList?et(t.classList):(t.getAttribute("class")||"").split(" ").filter(e=>e)}function tn(t){return"".concat(t).replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/'/g,"&#39;").replace(/</g,"&lt;").replace(/>/g,"&gt;")}function Pa(t){return Object.keys(t||{}).reduce((e,n)=>e+"".concat(n,'="').concat(tn(t[n]),'" '),"").trim()}function yt(t){return Object.keys(t||{}).reduce((e,n)=>e+"".concat(n,": ").concat(t[n].trim(),";"),"")}function Jt(t){return t.size!==T.size||t.x!==T.x||t.y!==T.y||t.rotate!==T.rotate||t.flipX||t.flipY}function Ea(t){let{transform:e,containerWidth:n,iconWidth:a}=t;const r={transform:"translate(".concat(n/2," 256)")},o="translate(".concat(e.x*32,", ").concat(e.y*32,") "),i="scale(".concat(e.size/16*(e.flipX?-1:1),", ").concat(e.size/16*(e.flipY?-1:1),") "),s="rotate(".concat(e.rotate," 0 0)"),l={transform:"".concat(o," ").concat(i," ").concat(s)},c={transform:"translate(".concat(a/2*-1," -256)")};return{outer:r,inner:l,path:c}}function _a(t){let{transform:e,width:n=Ct,height:a=Ct,startCentered:r=!1}=t,o="";return r&&We?o+="translate(".concat(e.x/j-n/2,"em, ").concat(e.y/j-a/2,"em) "):r?o+="translate(calc(-50% + ".concat(e.x/j,"em), calc(-50% + ").concat(e.y/j,"em)) "):o+="translate(".concat(e.x/j,"em, ").concat(e.y/j,"em) "),o+="scale(".concat(e.size/j*(e.flipX?-1:1),", ").concat(e.size/j*(e.flipY?-1:1),") "),o+="rotate(".concat(e.rotate,"deg) "),o}var Ia=`:root, :host {
  --fa-font-solid: normal 900 1em/1 "Font Awesome 6 Free";
  --fa-font-regular: normal 400 1em/1 "Font Awesome 6 Free";
  --fa-font-light: normal 300 1em/1 "Font Awesome 6 Pro";
  --fa-font-thin: normal 100 1em/1 "Font Awesome 6 Pro";
  --fa-font-duotone: normal 900 1em/1 "Font Awesome 6 Duotone";
  --fa-font-brands: normal 400 1em/1 "Font Awesome 6 Brands";
  --fa-font-sharp-solid: normal 900 1em/1 "Font Awesome 6 Sharp";
  --fa-font-sharp-regular: normal 400 1em/1 "Font Awesome 6 Sharp";
  --fa-font-sharp-light: normal 300 1em/1 "Font Awesome 6 Sharp";
  --fa-font-sharp-thin: normal 100 1em/1 "Font Awesome 6 Sharp";
  --fa-font-sharp-duotone-solid: normal 900 1em/1 "Font Awesome 6 Sharp Duotone";
}

svg:not(:root).svg-inline--fa, svg:not(:host).svg-inline--fa {
  overflow: visible;
  box-sizing: content-box;
}

.svg-inline--fa {
  display: var(--fa-display, inline-block);
  height: 1em;
  overflow: visible;
  vertical-align: -0.125em;
}
.svg-inline--fa.fa-2xs {
  vertical-align: 0.1em;
}
.svg-inline--fa.fa-xs {
  vertical-align: 0em;
}
.svg-inline--fa.fa-sm {
  vertical-align: -0.0714285705em;
}
.svg-inline--fa.fa-lg {
  vertical-align: -0.2em;
}
.svg-inline--fa.fa-xl {
  vertical-align: -0.25em;
}
.svg-inline--fa.fa-2xl {
  vertical-align: -0.3125em;
}
.svg-inline--fa.fa-pull-left {
  margin-right: var(--fa-pull-margin, 0.3em);
  width: auto;
}
.svg-inline--fa.fa-pull-right {
  margin-left: var(--fa-pull-margin, 0.3em);
  width: auto;
}
.svg-inline--fa.fa-li {
  width: var(--fa-li-width, 2em);
  top: 0.25em;
}
.svg-inline--fa.fa-fw {
  width: var(--fa-fw-width, 1.25em);
}

.fa-layers svg.svg-inline--fa {
  bottom: 0;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: 0;
}

.fa-layers-counter, .fa-layers-text {
  display: inline-block;
  position: absolute;
  text-align: center;
}

.fa-layers {
  display: inline-block;
  height: 1em;
  position: relative;
  text-align: center;
  vertical-align: -0.125em;
  width: 1em;
}
.fa-layers svg.svg-inline--fa {
  transform-origin: center center;
}

.fa-layers-text {
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  transform-origin: center center;
}

.fa-layers-counter {
  background-color: var(--fa-counter-background-color, #ff253a);
  border-radius: var(--fa-counter-border-radius, 1em);
  box-sizing: border-box;
  color: var(--fa-inverse, #fff);
  line-height: var(--fa-counter-line-height, 1);
  max-width: var(--fa-counter-max-width, 5em);
  min-width: var(--fa-counter-min-width, 1.5em);
  overflow: hidden;
  padding: var(--fa-counter-padding, 0.25em 0.5em);
  right: var(--fa-right, 0);
  text-overflow: ellipsis;
  top: var(--fa-top, 0);
  transform: scale(var(--fa-counter-scale, 0.25));
  transform-origin: top right;
}

.fa-layers-bottom-right {
  bottom: var(--fa-bottom, 0);
  right: var(--fa-right, 0);
  top: auto;
  transform: scale(var(--fa-layers-scale, 0.25));
  transform-origin: bottom right;
}

.fa-layers-bottom-left {
  bottom: var(--fa-bottom, 0);
  left: var(--fa-left, 0);
  right: auto;
  top: auto;
  transform: scale(var(--fa-layers-scale, 0.25));
  transform-origin: bottom left;
}

.fa-layers-top-right {
  top: var(--fa-top, 0);
  right: var(--fa-right, 0);
  transform: scale(var(--fa-layers-scale, 0.25));
  transform-origin: top right;
}

.fa-layers-top-left {
  left: var(--fa-left, 0);
  right: auto;
  top: var(--fa-top, 0);
  transform: scale(var(--fa-layers-scale, 0.25));
  transform-origin: top left;
}

.fa-1x {
  font-size: 1em;
}

.fa-2x {
  font-size: 2em;
}

.fa-3x {
  font-size: 3em;
}

.fa-4x {
  font-size: 4em;
}

.fa-5x {
  font-size: 5em;
}

.fa-6x {
  font-size: 6em;
}

.fa-7x {
  font-size: 7em;
}

.fa-8x {
  font-size: 8em;
}

.fa-9x {
  font-size: 9em;
}

.fa-10x {
  font-size: 10em;
}

.fa-2xs {
  font-size: 0.625em;
  line-height: 0.1em;
  vertical-align: 0.225em;
}

.fa-xs {
  font-size: 0.75em;
  line-height: 0.0833333337em;
  vertical-align: 0.125em;
}

.fa-sm {
  font-size: 0.875em;
  line-height: 0.0714285718em;
  vertical-align: 0.0535714295em;
}

.fa-lg {
  font-size: 1.25em;
  line-height: 0.05em;
  vertical-align: -0.075em;
}

.fa-xl {
  font-size: 1.5em;
  line-height: 0.0416666682em;
  vertical-align: -0.125em;
}

.fa-2xl {
  font-size: 2em;
  line-height: 0.03125em;
  vertical-align: -0.1875em;
}

.fa-fw {
  text-align: center;
  width: 1.25em;
}

.fa-ul {
  list-style-type: none;
  margin-left: var(--fa-li-margin, 2.5em);
  padding-left: 0;
}
.fa-ul > li {
  position: relative;
}

.fa-li {
  left: calc(-1 * var(--fa-li-width, 2em));
  position: absolute;
  text-align: center;
  width: var(--fa-li-width, 2em);
  line-height: inherit;
}

.fa-border {
  border-color: var(--fa-border-color, #eee);
  border-radius: var(--fa-border-radius, 0.1em);
  border-style: var(--fa-border-style, solid);
  border-width: var(--fa-border-width, 0.08em);
  padding: var(--fa-border-padding, 0.2em 0.25em 0.15em);
}

.fa-pull-left {
  float: left;
  margin-right: var(--fa-pull-margin, 0.3em);
}

.fa-pull-right {
  float: right;
  margin-left: var(--fa-pull-margin, 0.3em);
}

.fa-beat {
  animation-name: fa-beat;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, ease-in-out);
}

.fa-bounce {
  animation-name: fa-bounce;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.28, 0.84, 0.42, 1));
}

.fa-fade {
  animation-name: fa-fade;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
}

.fa-beat-fade {
  animation-name: fa-beat-fade;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, cubic-bezier(0.4, 0, 0.6, 1));
}

.fa-flip {
  animation-name: fa-flip;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, ease-in-out);
}

.fa-shake {
  animation-name: fa-shake;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, linear);
}

.fa-spin {
  animation-name: fa-spin;
  animation-delay: var(--fa-animation-delay, 0s);
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 2s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, linear);
}

.fa-spin-reverse {
  --fa-animation-direction: reverse;
}

.fa-pulse,
.fa-spin-pulse {
  animation-name: fa-spin;
  animation-direction: var(--fa-animation-direction, normal);
  animation-duration: var(--fa-animation-duration, 1s);
  animation-iteration-count: var(--fa-animation-iteration-count, infinite);
  animation-timing-function: var(--fa-animation-timing, steps(8));
}

@media (prefers-reduced-motion: reduce) {
  .fa-beat,
.fa-bounce,
.fa-fade,
.fa-beat-fade,
.fa-flip,
.fa-pulse,
.fa-shake,
.fa-spin,
.fa-spin-pulse {
    animation-delay: -1ms;
    animation-duration: 1ms;
    animation-iteration-count: 1;
    transition-delay: 0s;
    transition-duration: 0s;
  }
}
@keyframes fa-beat {
  0%, 90% {
    transform: scale(1);
  }
  45% {
    transform: scale(var(--fa-beat-scale, 1.25));
  }
}
@keyframes fa-bounce {
  0% {
    transform: scale(1, 1) translateY(0);
  }
  10% {
    transform: scale(var(--fa-bounce-start-scale-x, 1.1), var(--fa-bounce-start-scale-y, 0.9)) translateY(0);
  }
  30% {
    transform: scale(var(--fa-bounce-jump-scale-x, 0.9), var(--fa-bounce-jump-scale-y, 1.1)) translateY(var(--fa-bounce-height, -0.5em));
  }
  50% {
    transform: scale(var(--fa-bounce-land-scale-x, 1.05), var(--fa-bounce-land-scale-y, 0.95)) translateY(0);
  }
  57% {
    transform: scale(1, 1) translateY(var(--fa-bounce-rebound, -0.125em));
  }
  64% {
    transform: scale(1, 1) translateY(0);
  }
  100% {
    transform: scale(1, 1) translateY(0);
  }
}
@keyframes fa-fade {
  50% {
    opacity: var(--fa-fade-opacity, 0.4);
  }
}
@keyframes fa-beat-fade {
  0%, 100% {
    opacity: var(--fa-beat-fade-opacity, 0.4);
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(var(--fa-beat-fade-scale, 1.125));
  }
}
@keyframes fa-flip {
  50% {
    transform: rotate3d(var(--fa-flip-x, 0), var(--fa-flip-y, 1), var(--fa-flip-z, 0), var(--fa-flip-angle, -180deg));
  }
}
@keyframes fa-shake {
  0% {
    transform: rotate(-15deg);
  }
  4% {
    transform: rotate(15deg);
  }
  8%, 24% {
    transform: rotate(-18deg);
  }
  12%, 28% {
    transform: rotate(18deg);
  }
  16% {
    transform: rotate(-22deg);
  }
  20% {
    transform: rotate(22deg);
  }
  32% {
    transform: rotate(-12deg);
  }
  36% {
    transform: rotate(12deg);
  }
  40%, 100% {
    transform: rotate(0deg);
  }
}
@keyframes fa-spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.fa-rotate-90 {
  transform: rotate(90deg);
}

.fa-rotate-180 {
  transform: rotate(180deg);
}

.fa-rotate-270 {
  transform: rotate(270deg);
}

.fa-flip-horizontal {
  transform: scale(-1, 1);
}

.fa-flip-vertical {
  transform: scale(1, -1);
}

.fa-flip-both,
.fa-flip-horizontal.fa-flip-vertical {
  transform: scale(-1, -1);
}

.fa-rotate-by {
  transform: rotate(var(--fa-rotate-angle, 0));
}

.fa-stack {
  display: inline-block;
  vertical-align: middle;
  height: 2em;
  position: relative;
  width: 2.5em;
}

.fa-stack-1x,
.fa-stack-2x {
  bottom: 0;
  left: 0;
  margin: auto;
  position: absolute;
  right: 0;
  top: 0;
  z-index: var(--fa-stack-z-index, auto);
}

.svg-inline--fa.fa-stack-1x {
  height: 1em;
  width: 1.25em;
}
.svg-inline--fa.fa-stack-2x {
  height: 2em;
  width: 2.5em;
}

.fa-inverse {
  color: var(--fa-inverse, #fff);
}

.sr-only,
.fa-sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.sr-only-focusable:not(:focus),
.fa-sr-only-focusable:not(:focus) {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.svg-inline--fa .fa-primary {
  fill: var(--fa-primary-color, currentColor);
  opacity: var(--fa-primary-opacity, 1);
}

.svg-inline--fa .fa-secondary {
  fill: var(--fa-secondary-color, currentColor);
  opacity: var(--fa-secondary-opacity, 0.4);
}

.svg-inline--fa.fa-swap-opacity .fa-primary {
  opacity: var(--fa-secondary-opacity, 0.4);
}

.svg-inline--fa.fa-swap-opacity .fa-secondary {
  opacity: var(--fa-primary-opacity, 1);
}

.svg-inline--fa mask .fa-primary,
.svg-inline--fa mask .fa-secondary {
  fill: black;
}

.fad.fa-inverse,
.fa-duotone.fa-inverse {
  color: var(--fa-inverse, #fff);
}`;function en(){const t=Be,e=Xe,n=u.cssPrefix,a=u.replacementClass;let r=Ia;if(n!==t||a!==e){const o=new RegExp("\\.".concat(t,"\\-"),"g"),i=new RegExp("\\--".concat(t,"\\-"),"g"),s=new RegExp("\\.".concat(e),"g");r=r.replace(o,".".concat(n,"-")).replace(i,"--".concat(n,"-")).replace(s,".".concat(a))}return r}let de=!1;function St(){u.autoAddCss&&!de&&(Sa(en()),de=!0)}var Ta={mixout(){return{dom:{css:en,insertCss:St}}},hooks(){return{beforeDOMElementCreation(){St()},beforeI2svg(){St()}}}};const F=Y||{};F[z]||(F[z]={});F[z].styles||(F[z].styles={});F[z].hooks||(F[z].hooks={});F[z].shims||(F[z].shims=[]);var C=F[z];const nn=[],an=function(){g.removeEventListener("DOMContentLoaded",an),ht=1,nn.map(t=>t())};let ht=!1;R&&(ht=(g.documentElement.doScroll?/^loaded|^c/:/^loaded|^i|^c/).test(g.readyState),ht||g.addEventListener("DOMContentLoaded",an));function Ca(t){R&&(ht?setTimeout(t,0):nn.push(t))}function ct(t){const{tag:e,attributes:n={},children:a=[]}=t;return typeof t=="string"?tn(t):"<".concat(e," ").concat(Pa(n),">").concat(a.map(ct).join(""),"</").concat(e,">")}function pe(t,e,n){if(t&&t[e]&&t[e][n])return{prefix:e,iconName:n,icon:t[e][n]}}var wt=function(e,n,a,r){var o=Object.keys(e),i=o.length,s=n,l,c,f;for(a===void 0?(l=1,f=e[o[0]]):(l=0,f=a);l<i;l++)c=o[l],f=s(f,e[c],c,e);return f};function Na(t){const e=[];let n=0;const a=t.length;for(;n<a;){const r=t.charCodeAt(n++);if(r>=55296&&r<=56319&&n<a){const o=t.charCodeAt(n++);(o&64512)==56320?e.push(((r&1023)<<10)+(o&1023)+65536):(e.push(r),n--)}else e.push(r)}return e}function Ft(t){const e=Na(t);return e.length===1?e[0].toString(16):null}function Ma(t,e){const n=t.length;let a=t.charCodeAt(e),r;return a>=55296&&a<=56319&&n>e+1&&(r=t.charCodeAt(e+1),r>=56320&&r<=57343)?(a-55296)*1024+r-56320+65536:a}function he(t){return Object.keys(t).reduce((e,n)=>{const a=t[n];return!!a.icon?e[a.iconName]=a.icon:e[n]=a,e},{})}function Rt(t,e){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};const{skipHooks:a=!1}=n,r=he(e);typeof C.hooks.addPack=="function"&&!a?C.hooks.addPack(t,he(e)):C.styles[t]={...C.styles[t]||{},...r},t==="fas"&&Rt("fa",e)}const{styles:H,shims:La}=C,za={[b]:Object.values(G[b]),[w]:Object.values(G[w]),[P]:Object.values(G[P])};let Zt=null,rn={},on={},sn={},ln={},cn={};const Fa={[b]:Object.keys(V[b]),[w]:Object.keys(V[w]),[P]:Object.keys(V[P])};function Ra(t){return~xa.indexOf(t)}function ja(t,e){const n=e.split("-"),a=n[0],r=n.slice(1).join("-");return a===t&&r!==""&&!Ra(r)?r:null}const fn=()=>{const t=a=>wt(H,(r,o,i)=>(r[i]=wt(o,a,{}),r),{});rn=t((a,r,o)=>(r[3]&&(a[r[3]]=o),r[2]&&r[2].filter(s=>typeof s=="number").forEach(s=>{a[s.toString(16)]=o}),a)),on=t((a,r,o)=>(a[o]=o,r[2]&&r[2].filter(s=>typeof s=="string").forEach(s=>{a[s]=o}),a)),cn=t((a,r,o)=>{const i=r[2];return a[o]=o,i.forEach(s=>{a[s]=o}),a});const e="far"in H||u.autoFetchSvg,n=wt(La,(a,r)=>{const o=r[0];let i=r[1];const s=r[2];return i==="far"&&!e&&(i="fas"),typeof o=="string"&&(a.names[o]={prefix:i,iconName:s}),typeof o=="number"&&(a.unicodes[o.toString(16)]={prefix:i,iconName:s}),a},{names:{},unicodes:{}});sn=n.names,ln=n.unicodes,Zt=vt(u.styleDefault,{family:u.familyDefault})};Oa(t=>{Zt=vt(t.styleDefault,{family:u.familyDefault})});fn();function te(t,e){return(rn[t]||{})[e]}function Da(t,e){return(on[t]||{})[e]}function D(t,e){return(cn[t]||{})[e]}function un(t){return sn[t]||{prefix:null,iconName:null}}function Ya(t){const e=ln[t],n=te("fas",t);return e||(n?{prefix:"fas",iconName:n}:null)||{prefix:null,iconName:null}}function U(){return Zt}const ee=()=>({prefix:null,iconName:null,rest:[]});function vt(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const{family:n=b}=e,a=V[n][t],r=it[n][t]||it[n][a],o=t in C.styles?t:null;return r||o||null}const Ua={[b]:Object.keys(G[b]),[w]:Object.keys(G[w]),[P]:Object.keys(G[P])};function xt(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const{skipLookups:n=!1}=e,a={[b]:"".concat(u.cssPrefix,"-").concat(b),[w]:"".concat(u.cssPrefix,"-").concat(w),[P]:"".concat(u.cssPrefix,"-").concat(P)};let r=null,o=b;const i=qn.filter(l=>l!==He);i.forEach(l=>{(t.includes(a[l])||t.some(c=>Ua[l].includes(c)))&&(o=l)});const s=t.reduce((l,c)=>{const f=ja(u.cssPrefix,c);if(H[c]?(c=za[o].includes(c)?ha[o][c]:c,r=c,l.prefix=c):Fa[o].indexOf(c)>-1?(r=c,l.prefix=vt(c,{family:o})):f?l.iconName=f:c!==u.replacementClass&&!i.some(d=>c===a[d])&&l.rest.push(c),!n&&l.prefix&&l.iconName){const d=r==="fa"?un(l.iconName):{},m=D(l.prefix,l.iconName);d.prefix&&(r=null),l.iconName=d.iconName||m||l.iconName,l.prefix=d.prefix||l.prefix,l.prefix==="far"&&!H.far&&H.fas&&!u.autoFetchSvg&&(l.prefix="fas")}return l},ee());return(t.includes("fa-brands")||t.includes("fab"))&&(s.prefix="fab"),(t.includes("fa-duotone")||t.includes("fad"))&&(s.prefix="fad"),!s.prefix&&o===w&&(H.fass||u.autoFetchSvg)&&(s.prefix="fass",s.iconName=D(s.prefix,s.iconName)||s.iconName),!s.prefix&&o===P&&(H.fasds||u.autoFetchSvg)&&(s.prefix="fasds",s.iconName=D(s.prefix,s.iconName)||s.iconName),(s.prefix==="fa"||r==="fa")&&(s.prefix=U()||"fas"),s}class $a{constructor(){this.definitions={}}add(){for(var e=arguments.length,n=new Array(e),a=0;a<e;a++)n[a]=arguments[a];const r=n.reduce(this._pullDefinitions,{});Object.keys(r).forEach(o=>{this.definitions[o]={...this.definitions[o]||{},...r[o]},Rt(o,r[o]);const i=G[b][o];i&&Rt(i,r[o]),fn()})}reset(){this.definitions={}}_pullDefinitions(e,n){const a=n.prefix&&n.iconName&&n.icon?{0:n}:n;return Object.keys(a).map(r=>{const{prefix:o,iconName:i,icon:s}=a[r],l=s[2];e[o]||(e[o]={}),l.length>0&&l.forEach(c=>{typeof c=="string"&&(e[o][c]=s)}),e[o][i]=s}),e}}let ge=[],K={};const J={},Wa=Object.keys(J);function Ha(t,e){let{mixoutsTo:n}=e;return ge=t,K={},Object.keys(J).forEach(a=>{Wa.indexOf(a)===-1&&delete J[a]}),ge.forEach(a=>{const r=a.mixout?a.mixout():{};if(Object.keys(r).forEach(o=>{typeof r[o]=="function"&&(n[o]=r[o]),typeof r[o]=="object"&&Object.keys(r[o]).forEach(i=>{n[o]||(n[o]={}),n[o][i]=r[o][i]})}),a.hooks){const o=a.hooks();Object.keys(o).forEach(i=>{K[i]||(K[i]=[]),K[i].push(o[i])})}a.provides&&a.provides(J)}),n}function jt(t,e){for(var n=arguments.length,a=new Array(n>2?n-2:0),r=2;r<n;r++)a[r-2]=arguments[r];return(K[t]||[]).forEach(i=>{e=i.apply(null,[e,...a])}),e}function X(t){for(var e=arguments.length,n=new Array(e>1?e-1:0),a=1;a<e;a++)n[a-1]=arguments[a];(K[t]||[]).forEach(o=>{o.apply(null,n)})}function $(){const t=arguments[0],e=Array.prototype.slice.call(arguments,1);return J[t]?J[t].apply(null,e):void 0}function Dt(t){t.prefix==="fa"&&(t.prefix="fas");let{iconName:e}=t;const n=t.prefix||U();if(e)return e=D(n,e)||e,pe(mn.definitions,n,e)||pe(C.styles,n,e)}const mn=new $a,Va=()=>{u.autoReplaceSvg=!1,u.observeMutations=!1,X("noAuto")},Ga={i2svg:function(){let t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};return R?(X("beforeI2svg",t),$("pseudoElements2svg",t),$("i2svg",t)):Promise.reject(new Error("Operation requires a DOM of some kind."))},watch:function(){let t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};const{autoReplaceSvgRoot:e}=t;u.autoReplaceSvg===!1&&(u.autoReplaceSvg=!0),u.observeMutations=!0,Ca(()=>{Xa({autoReplaceSvgRoot:e}),X("watch",t)})}},Ba={icon:t=>{if(t===null)return null;if(typeof t=="object"&&t.prefix&&t.iconName)return{prefix:t.prefix,iconName:D(t.prefix,t.iconName)||t.iconName};if(Array.isArray(t)&&t.length===2){const e=t[1].indexOf("fa-")===0?t[1].slice(3):t[1],n=vt(t[0]);return{prefix:n,iconName:D(n,e)||e}}if(typeof t=="string"&&(t.indexOf("".concat(u.cssPrefix,"-"))>-1||t.match(ga))){const e=xt(t.split(" "),{skipLookups:!0});return{prefix:e.prefix||U(),iconName:D(e.prefix,e.iconName)||e.iconName}}if(typeof t=="string"){const e=U();return{prefix:e,iconName:D(e,t)||t}}}},E={noAuto:Va,config:u,dom:Ga,parse:Ba,library:mn,findIconDefinition:Dt,toHtml:ct},Xa=function(){let t=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};const{autoReplaceSvgRoot:e=g}=t;(Object.keys(C.styles).length>0||u.autoFetchSvg)&&R&&u.autoReplaceSvg&&E.dom.i2svg({node:e})};function At(t,e){return Object.defineProperty(t,"abstract",{get:e}),Object.defineProperty(t,"html",{get:function(){return t.abstract.map(n=>ct(n))}}),Object.defineProperty(t,"node",{get:function(){if(!R)return;const n=g.createElement("div");return n.innerHTML=t.html,n.children}}),t}function qa(t){let{children:e,main:n,mask:a,attributes:r,styles:o,transform:i}=t;if(Jt(i)&&n.found&&!a.found){const{width:s,height:l}=n,c={x:s/l/2,y:.5};r.style=yt({...o,"transform-origin":"".concat(c.x+i.x/16,"em ").concat(c.y+i.y/16,"em")})}return[{tag:"svg",attributes:r,children:e}]}function Ka(t){let{prefix:e,iconName:n,children:a,attributes:r,symbol:o}=t;const i=o===!0?"".concat(e,"-").concat(u.cssPrefix,"-").concat(n):o;return[{tag:"svg",attributes:{style:"display: none;"},children:[{tag:"symbol",attributes:{...r,id:i},children:a}]}]}function ne(t){const{icons:{main:e,mask:n},prefix:a,iconName:r,transform:o,symbol:i,title:s,maskId:l,titleId:c,extra:f,watchable:d=!1}=t,{width:m,height:h}=n.found?n:e,v=a==="fak",S=[u.replacementClass,r?"".concat(u.cssPrefix,"-").concat(r):""].filter(_=>f.classes.indexOf(_)===-1).filter(_=>_!==""||!!_).concat(f.classes).join(" ");let y={children:[],attributes:{...f.attributes,"data-prefix":a,"data-icon":r,class:S,role:f.attributes.role||"img",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 ".concat(m," ").concat(h)}};const x=v&&!~f.classes.indexOf("fa-fw")?{width:"".concat(m/h*16*.0625,"em")}:{};d&&(y.attributes[B]=""),s&&(y.children.push({tag:"title",attributes:{id:y.attributes["aria-labelledby"]||"title-".concat(c||st())},children:[s]}),delete y.attributes.title);const k={...y,prefix:a,iconName:r,main:e,mask:n,maskId:l,transform:o,symbol:i,styles:{...x,...f.styles}},{children:O,attributes:M}=n.found&&e.found?$("generateAbstractMask",k)||{children:[],attributes:{}}:$("generateAbstractIcon",k)||{children:[],attributes:{}};return k.children=O,k.attributes=M,i?Ka(k):qa(k)}function be(t){const{content:e,width:n,height:a,transform:r,title:o,extra:i,watchable:s=!1}=t,l={...i.attributes,...o?{title:o}:{},class:i.classes.join(" ")};s&&(l[B]="");const c={...i.styles};Jt(r)&&(c.transform=_a({transform:r,startCentered:!0,width:n,height:a}),c["-webkit-transform"]=c.transform);const f=yt(c);f.length>0&&(l.style=f);const d=[];return d.push({tag:"span",attributes:l,children:[e]}),o&&d.push({tag:"span",attributes:{class:"sr-only"},children:[o]}),d}function Qa(t){const{content:e,title:n,extra:a}=t,r={...a.attributes,...n?{title:n}:{},class:a.classes.join(" ")},o=yt(a.styles);o.length>0&&(r.style=o);const i=[];return i.push({tag:"span",attributes:r,children:[e]}),n&&i.push({tag:"span",attributes:{class:"sr-only"},children:[n]}),i}const{styles:Pt}=C;function Yt(t){const e=t[0],n=t[1],[a]=t.slice(4);let r=null;return Array.isArray(a)?r={tag:"g",attributes:{class:"".concat(u.cssPrefix,"-").concat(Ot.GROUP)},children:[{tag:"path",attributes:{class:"".concat(u.cssPrefix,"-").concat(Ot.SECONDARY),fill:"currentColor",d:a[0]}},{tag:"path",attributes:{class:"".concat(u.cssPrefix,"-").concat(Ot.PRIMARY),fill:"currentColor",d:a[1]}}]}:r={tag:"path",attributes:{fill:"currentColor",d:a}},{found:!0,width:e,height:n,icon:r}}const Ja={found:!1,width:512,height:512};function Za(t,e){!qe&&!u.showMissingIcons&&t&&console.error('Icon with name "'.concat(t,'" and prefix "').concat(e,'" is missing.'))}function Ut(t,e){let n=e;return e==="fa"&&u.styleDefault!==null&&(e=U()),new Promise((a,r)=>{if(n==="fa"){const o=un(t)||{};t=o.iconName||t,e=o.prefix||e}if(t&&e&&Pt[e]&&Pt[e][t]){const o=Pt[e][t];return a(Yt(o))}Za(t,e),a({...Ja,icon:u.showMissingIcons&&t?$("missingIconAbstract")||{}:{}})})}const ye=()=>{},$t=u.measurePerformance&&ft&&ft.mark&&ft.measure?ft:{mark:ye,measure:ye},at='FA "6.6.0"',tr=t=>($t.mark("".concat(at," ").concat(t," begins")),()=>dn(t)),dn=t=>{$t.mark("".concat(at," ").concat(t," ends")),$t.measure("".concat(at," ").concat(t),"".concat(at," ").concat(t," begins"),"".concat(at," ").concat(t," ends"))};var ae={begin:tr,end:dn};const ut=()=>{};function ve(t){return typeof(t.getAttribute?t.getAttribute(B):null)=="string"}function er(t){const e=t.getAttribute?t.getAttribute(qt):null,n=t.getAttribute?t.getAttribute(Kt):null;return e&&n}function nr(t){return t&&t.classList&&t.classList.contains&&t.classList.contains(u.replacementClass)}function ar(){return u.autoReplaceSvg===!0?mt.replace:mt[u.autoReplaceSvg]||mt.replace}function rr(t){return g.createElementNS("http://www.w3.org/2000/svg",t)}function or(t){return g.createElement(t)}function pn(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const{ceFn:n=t.tag==="svg"?rr:or}=e;if(typeof t=="string")return g.createTextNode(t);const a=n(t.tag);return Object.keys(t.attributes||[]).forEach(function(o){a.setAttribute(o,t.attributes[o])}),(t.children||[]).forEach(function(o){a.appendChild(pn(o,{ceFn:n}))}),a}function ir(t){let e=" ".concat(t.outerHTML," ");return e="".concat(e,"Font Awesome fontawesome.com "),e}const mt={replace:function(t){const e=t[0];if(e.parentNode)if(t[1].forEach(n=>{e.parentNode.insertBefore(pn(n),e)}),e.getAttribute(B)===null&&u.keepOriginalSource){let n=g.createComment(ir(e));e.parentNode.replaceChild(n,e)}else e.remove()},nest:function(t){const e=t[0],n=t[1];if(~Qt(e).indexOf(u.replacementClass))return mt.replace(t);const a=new RegExp("".concat(u.cssPrefix,"-.*"));if(delete n[0].attributes.id,n[0].attributes.class){const o=n[0].attributes.class.split(" ").reduce((i,s)=>(s===u.replacementClass||s.match(a)?i.toSvg.push(s):i.toNode.push(s),i),{toNode:[],toSvg:[]});n[0].attributes.class=o.toSvg.join(" "),o.toNode.length===0?e.removeAttribute("class"):e.setAttribute("class",o.toNode.join(" "))}const r=n.map(o=>ct(o)).join(`
`);e.setAttribute(B,""),e.innerHTML=r}};function xe(t){t()}function hn(t,e){const n=typeof e=="function"?e:ut;if(t.length===0)n();else{let a=xe;u.mutateApproach===da&&(a=Y.requestAnimationFrame||xe),a(()=>{const r=ar(),o=ae.begin("mutate");t.map(r),o(),n()})}}let re=!1;function gn(){re=!0}function Wt(){re=!1}let gt=null;function Ae(t){if(!ce||!u.observeMutations)return;const{treeCallback:e=ut,nodeCallback:n=ut,pseudoElementsCallback:a=ut,observeMutationsRoot:r=g}=t;gt=new ce(o=>{if(re)return;const i=U();et(o).forEach(s=>{if(s.type==="childList"&&s.addedNodes.length>0&&!ve(s.addedNodes[0])&&(u.searchPseudoElements&&a(s.target),e(s.target)),s.type==="attributes"&&s.target.parentNode&&u.searchPseudoElements&&a(s.target.parentNode),s.type==="attributes"&&ve(s.target)&&~va.indexOf(s.attributeName))if(s.attributeName==="class"&&er(s.target)){const{prefix:l,iconName:c}=xt(Qt(s.target));s.target.setAttribute(qt,l||i),c&&s.target.setAttribute(Kt,c)}else nr(s.target)&&n(s.target)})}),R&&gt.observe(r,{childList:!0,attributes:!0,characterData:!0,subtree:!0})}function sr(){gt&&gt.disconnect()}function lr(t){const e=t.getAttribute("style");let n=[];return e&&(n=e.split(";").reduce((a,r)=>{const o=r.split(":"),i=o[0],s=o.slice(1);return i&&s.length>0&&(a[i]=s.join(":").trim()),a},{})),n}function cr(t){const e=t.getAttribute("data-prefix"),n=t.getAttribute("data-icon"),a=t.innerText!==void 0?t.innerText.trim():"";let r=xt(Qt(t));return r.prefix||(r.prefix=U()),e&&n&&(r.prefix=e,r.iconName=n),r.iconName&&r.prefix||(r.prefix&&a.length>0&&(r.iconName=Da(r.prefix,t.innerText)||te(r.prefix,Ft(t.innerText))),!r.iconName&&u.autoFetchSvg&&t.firstChild&&t.firstChild.nodeType===Node.TEXT_NODE&&(r.iconName=t.firstChild.data)),r}function fr(t){const e=et(t.attributes).reduce((r,o)=>(r.name!=="class"&&r.name!=="style"&&(r[o.name]=o.value),r),{}),n=t.getAttribute("title"),a=t.getAttribute("data-fa-title-id");return u.autoA11y&&(n?e["aria-labelledby"]="".concat(u.replacementClass,"-title-").concat(a||st()):(e["aria-hidden"]="true",e.focusable="false")),e}function ur(){return{iconName:null,title:null,titleId:null,prefix:null,transform:T,symbol:!1,mask:{iconName:null,prefix:null,rest:[]},maskId:null,extra:{classes:[],styles:{},attributes:{}}}}function ke(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{styleParser:!0};const{iconName:n,prefix:a,rest:r}=cr(t),o=fr(t),i=jt("parseNodeAttributes",{},t);let s=e.styleParser?lr(t):[];return{iconName:n,title:t.getAttribute("title"),titleId:t.getAttribute("data-fa-title-id"),prefix:a,transform:T,mask:{iconName:null,prefix:null,rest:[]},maskId:null,symbol:!1,extra:{classes:r,styles:s,attributes:o},...i}}const{styles:mr}=C;function bn(t){const e=u.autoReplaceSvg==="nest"?ke(t,{styleParser:!1}):ke(t);return~e.extra.classes.indexOf(Je)?$("generateLayersText",t,e):$("generateSvgReplacementMutation",t,e)}let N=new Set;Ke.map(t=>{N.add("fa-".concat(t))});Object.keys(V[b]).map(N.add.bind(N));Object.keys(V[w]).map(N.add.bind(N));Object.keys(V[P]).map(N.add.bind(N));N=[...N];function Oe(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:null;if(!R)return Promise.resolve();const n=g.documentElement.classList,a=f=>n.add("".concat(me,"-").concat(f)),r=f=>n.remove("".concat(me,"-").concat(f)),o=u.autoFetchSvg?N:Ke.map(f=>"fa-".concat(f)).concat(Object.keys(mr));o.includes("fa")||o.push("fa");const i=[".".concat(Je,":not([").concat(B,"])")].concat(o.map(f=>".".concat(f,":not([").concat(B,"])"))).join(", ");if(i.length===0)return Promise.resolve();let s=[];try{s=et(t.querySelectorAll(i))}catch{}if(s.length>0)a("pending"),r("complete");else return Promise.resolve();const l=ae.begin("onTree"),c=s.reduce((f,d)=>{try{const m=bn(d);m&&f.push(m)}catch(m){qe||m.name==="MissingIcon"&&console.error(m)}return f},[]);return new Promise((f,d)=>{Promise.all(c).then(m=>{hn(m,()=>{a("active"),a("complete"),r("pending"),typeof e=="function"&&e(),l(),f()})}).catch(m=>{l(),d(m)})})}function dr(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:null;bn(t).then(n=>{n&&hn([n],e)})}function pr(t){return function(e){let n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const a=(e||{}).icon?e:Dt(e||{});let{mask:r}=n;return r&&(r=(r||{}).icon?r:Dt(r||{})),t(a,{...n,mask:r})}}const hr=function(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const{transform:n=T,symbol:a=!1,mask:r=null,maskId:o=null,title:i=null,titleId:s=null,classes:l=[],attributes:c={},styles:f={}}=e;if(!t)return;const{prefix:d,iconName:m,icon:h}=t;return At({type:"icon",...t},()=>(X("beforeDOMElementCreation",{iconDefinition:t,params:e}),u.autoA11y&&(i?c["aria-labelledby"]="".concat(u.replacementClass,"-title-").concat(s||st()):(c["aria-hidden"]="true",c.focusable="false")),ne({icons:{main:Yt(h),mask:r?Yt(r.icon):{found:!1,width:null,height:null,icon:{}}},prefix:d,iconName:m,transform:{...T,...n},symbol:a,title:i,maskId:o,titleId:s,extra:{attributes:c,styles:f,classes:l}})))};var gr={mixout(){return{icon:pr(hr)}},hooks(){return{mutationObserverCallbacks(t){return t.treeCallback=Oe,t.nodeCallback=dr,t}}},provides(t){t.i2svg=function(e){const{node:n=g,callback:a=()=>{}}=e;return Oe(n,a)},t.generateSvgReplacementMutation=function(e,n){const{iconName:a,title:r,titleId:o,prefix:i,transform:s,symbol:l,mask:c,maskId:f,extra:d}=n;return new Promise((m,h)=>{Promise.all([Ut(a,i),c.iconName?Ut(c.iconName,c.prefix):Promise.resolve({found:!1,width:512,height:512,icon:{}})]).then(v=>{let[S,y]=v;m([e,ne({icons:{main:S,mask:y},prefix:i,iconName:a,transform:s,symbol:l,maskId:f,title:r,titleId:o,extra:d,watchable:!0})])}).catch(h)})},t.generateAbstractIcon=function(e){let{children:n,attributes:a,main:r,transform:o,styles:i}=e;const s=yt(i);s.length>0&&(a.style=s);let l;return Jt(o)&&(l=$("generateAbstractTransformGrouping",{main:r,transform:o,containerWidth:r.width,iconWidth:r.width})),n.push(l||r.icon),{children:n,attributes:a}}}},br={mixout(){return{layer(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const{classes:n=[]}=e;return At({type:"layer"},()=>{X("beforeDOMElementCreation",{assembler:t,params:e});let a=[];return t(r=>{Array.isArray(r)?r.map(o=>{a=a.concat(o.abstract)}):a=a.concat(r.abstract)}),[{tag:"span",attributes:{class:["".concat(u.cssPrefix,"-layers"),...n].join(" ")},children:a}]})}}}},yr={mixout(){return{counter(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const{title:n=null,classes:a=[],attributes:r={},styles:o={}}=e;return At({type:"counter",content:t},()=>(X("beforeDOMElementCreation",{content:t,params:e}),Qa({content:t.toString(),title:n,extra:{attributes:r,styles:o,classes:["".concat(u.cssPrefix,"-layers-counter"),...a]}})))}}}},vr={mixout(){return{text(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};const{transform:n=T,title:a=null,classes:r=[],attributes:o={},styles:i={}}=e;return At({type:"text",content:t},()=>(X("beforeDOMElementCreation",{content:t,params:e}),be({content:t,transform:{...T,...n},title:a,extra:{attributes:o,styles:i,classes:["".concat(u.cssPrefix,"-layers-text"),...r]}})))}}},provides(t){t.generateLayersText=function(e,n){const{title:a,transform:r,extra:o}=n;let i=null,s=null;if(We){const l=parseInt(getComputedStyle(e).fontSize,10),c=e.getBoundingClientRect();i=c.width/l,s=c.height/l}return u.autoA11y&&!a&&(o.attributes["aria-hidden"]="true"),Promise.resolve([e,be({content:e.innerHTML,width:i,height:s,transform:r,title:a,extra:o,watchable:!0})])}}};const xr=new RegExp('"',"ug"),Se=[1105920,1112319],we={FontAwesome:{normal:"fas",400:"fas"},...ea,...ta,...ca},Ht=Object.keys(we).reduce((t,e)=>(t[e.toLowerCase()]=we[e],t),{}),Ar=Object.keys(Ht).reduce((t,e)=>{const n=Ht[e];return t[e]=n[900]||[...Object.entries(n)][0][1],t},{});function kr(t){const e=t.replace(xr,""),n=Ma(e,0),a=n>=Se[0]&&n<=Se[1],r=e.length===2?e[0]===e[1]:!1;return{value:Ft(r?e[0]:e),isSecondary:a||r}}function Or(t,e){const n=t.replace(/^['"]|['"]$/g,"").toLowerCase(),a=parseInt(e),r=isNaN(a)?"normal":a;return(Ht[n]||{})[r]||Ar[n]}function Pe(t,e){const n="".concat(ma).concat(e.replace(":","-"));return new Promise((a,r)=>{if(t.getAttribute(n)!==null)return a();const i=et(t.children).filter(m=>m.getAttribute(Nt)===e)[0],s=Y.getComputedStyle(t,e),l=s.getPropertyValue("font-family"),c=l.match(ba),f=s.getPropertyValue("font-weight"),d=s.getPropertyValue("content");if(i&&!c)return t.removeChild(i),a();if(c&&d!=="none"&&d!==""){const m=s.getPropertyValue("content");let h=Or(l,f);const{value:v,isSecondary:S}=kr(m),y=c[0].startsWith("FontAwesome");let x=te(h,v),k=x;if(y){const O=Ya(v);O.iconName&&O.prefix&&(x=O.iconName,h=O.prefix)}if(x&&!S&&(!i||i.getAttribute(qt)!==h||i.getAttribute(Kt)!==k)){t.setAttribute(n,k),i&&t.removeChild(i);const O=ur(),{extra:M}=O;M.attributes[Nt]=e,Ut(x,h).then(_=>{const An=ne({...O,icons:{main:_,mask:ee()},prefix:h,iconName:k,extra:M,watchable:!0}),kt=g.createElementNS("http://www.w3.org/2000/svg","svg");e==="::before"?t.insertBefore(kt,t.firstChild):t.appendChild(kt),kt.outerHTML=An.map(kn=>ct(kn)).join(`
`),t.removeAttribute(n),a()}).catch(r)}else a()}else a()})}function Sr(t){return Promise.all([Pe(t,"::before"),Pe(t,"::after")])}function wr(t){return t.parentNode!==document.head&&!~pa.indexOf(t.tagName.toUpperCase())&&!t.getAttribute(Nt)&&(!t.parentNode||t.parentNode.tagName!=="svg")}function Ee(t){if(R)return new Promise((e,n)=>{const a=et(t.querySelectorAll("*")).filter(wr).map(Sr),r=ae.begin("searchPseudoElements");gn(),Promise.all(a).then(()=>{r(),Wt(),e()}).catch(()=>{r(),Wt(),n()})})}var Pr={hooks(){return{mutationObserverCallbacks(t){return t.pseudoElementsCallback=Ee,t}}},provides(t){t.pseudoElements2svg=function(e){const{node:n=g}=e;u.searchPseudoElements&&Ee(n)}}};let _e=!1;var Er={mixout(){return{dom:{unwatch(){gn(),_e=!0}}}},hooks(){return{bootstrap(){Ae(jt("mutationObserverCallbacks",{}))},noAuto(){sr()},watch(t){const{observeMutationsRoot:e}=t;_e?Wt():Ae(jt("mutationObserverCallbacks",{observeMutationsRoot:e}))}}}};const Ie=t=>{let e={size:16,x:0,y:0,flipX:!1,flipY:!1,rotate:0};return t.toLowerCase().split(" ").reduce((n,a)=>{const r=a.toLowerCase().split("-"),o=r[0];let i=r.slice(1).join("-");if(o&&i==="h")return n.flipX=!0,n;if(o&&i==="v")return n.flipY=!0,n;if(i=parseFloat(i),isNaN(i))return n;switch(o){case"grow":n.size=n.size+i;break;case"shrink":n.size=n.size-i;break;case"left":n.x=n.x-i;break;case"right":n.x=n.x+i;break;case"up":n.y=n.y-i;break;case"down":n.y=n.y+i;break;case"rotate":n.rotate=n.rotate+i;break}return n},e)};var _r={mixout(){return{parse:{transform:t=>Ie(t)}}},hooks(){return{parseNodeAttributes(t,e){const n=e.getAttribute("data-fa-transform");return n&&(t.transform=Ie(n)),t}}},provides(t){t.generateAbstractTransformGrouping=function(e){let{main:n,transform:a,containerWidth:r,iconWidth:o}=e;const i={transform:"translate(".concat(r/2," 256)")},s="translate(".concat(a.x*32,", ").concat(a.y*32,") "),l="scale(".concat(a.size/16*(a.flipX?-1:1),", ").concat(a.size/16*(a.flipY?-1:1),") "),c="rotate(".concat(a.rotate," 0 0)"),f={transform:"".concat(s," ").concat(l," ").concat(c)},d={transform:"translate(".concat(o/2*-1," -256)")},m={outer:i,inner:f,path:d};return{tag:"g",attributes:{...m.outer},children:[{tag:"g",attributes:{...m.inner},children:[{tag:n.icon.tag,children:n.icon.children,attributes:{...n.icon.attributes,...m.path}}]}]}}}};const Et={x:0,y:0,width:"100%",height:"100%"};function Te(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!0;return t.attributes&&(t.attributes.fill||e)&&(t.attributes.fill="black"),t}function Ir(t){return t.tag==="g"?t.children:[t]}var Tr={hooks(){return{parseNodeAttributes(t,e){const n=e.getAttribute("data-fa-mask"),a=n?xt(n.split(" ").map(r=>r.trim())):ee();return a.prefix||(a.prefix=U()),t.mask=a,t.maskId=e.getAttribute("data-fa-mask-id"),t}}},provides(t){t.generateAbstractMask=function(e){let{children:n,attributes:a,main:r,mask:o,maskId:i,transform:s}=e;const{width:l,icon:c}=r,{width:f,icon:d}=o,m=Ea({transform:s,containerWidth:f,iconWidth:l}),h={tag:"rect",attributes:{...Et,fill:"white"}},v=c.children?{children:c.children.map(Te)}:{},S={tag:"g",attributes:{...m.inner},children:[Te({tag:c.tag,attributes:{...c.attributes,...m.path},...v})]},y={tag:"g",attributes:{...m.outer},children:[S]},x="mask-".concat(i||st()),k="clip-".concat(i||st()),O={tag:"mask",attributes:{...Et,id:x,maskUnits:"userSpaceOnUse",maskContentUnits:"userSpaceOnUse"},children:[h,y]},M={tag:"defs",children:[{tag:"clipPath",attributes:{id:k},children:Ir(d)},O]};return n.push(M,{tag:"rect",attributes:{fill:"currentColor","clip-path":"url(#".concat(k,")"),mask:"url(#".concat(x,")"),...Et}}),{children:n,attributes:a}}}},Cr={provides(t){let e=!1;Y.matchMedia&&(e=Y.matchMedia("(prefers-reduced-motion: reduce)").matches),t.missingIconAbstract=function(){const n=[],a={fill:"currentColor"},r={attributeType:"XML",repeatCount:"indefinite",dur:"2s"};n.push({tag:"path",attributes:{...a,d:"M156.5,447.7l-12.6,29.5c-18.7-9.5-35.9-21.2-51.5-34.9l22.7-22.7C127.6,430.5,141.5,440,156.5,447.7z M40.6,272H8.5 c1.4,21.2,5.4,41.7,11.7,61.1L50,321.2C45.1,305.5,41.8,289,40.6,272z M40.6,240c1.4-18.8,5.2-37,11.1-54.1l-29.5-12.6 C14.7,194.3,10,216.7,8.5,240H40.6z M64.3,156.5c7.8-14.9,17.2-28.8,28.1-41.5L69.7,92.3c-13.7,15.6-25.5,32.8-34.9,51.5 L64.3,156.5z M397,419.6c-13.9,12-29.4,22.3-46.1,30.4l11.9,29.8c20.7-9.9,39.8-22.6,56.9-37.6L397,419.6z M115,92.4 c13.9-12,29.4-22.3,46.1-30.4l-11.9-29.8c-20.7,9.9-39.8,22.6-56.8,37.6L115,92.4z M447.7,355.5c-7.8,14.9-17.2,28.8-28.1,41.5 l22.7,22.7c13.7-15.6,25.5-32.9,34.9-51.5L447.7,355.5z M471.4,272c-1.4,18.8-5.2,37-11.1,54.1l29.5,12.6 c7.5-21.1,12.2-43.5,13.6-66.8H471.4z M321.2,462c-15.7,5-32.2,8.2-49.2,9.4v32.1c21.2-1.4,41.7-5.4,61.1-11.7L321.2,462z M240,471.4c-18.8-1.4-37-5.2-54.1-11.1l-12.6,29.5c21.1,7.5,43.5,12.2,66.8,13.6V471.4z M462,190.8c5,15.7,8.2,32.2,9.4,49.2h32.1 c-1.4-21.2-5.4-41.7-11.7-61.1L462,190.8z M92.4,397c-12-13.9-22.3-29.4-30.4-46.1l-29.8,11.9c9.9,20.7,22.6,39.8,37.6,56.9 L92.4,397z M272,40.6c18.8,1.4,36.9,5.2,54.1,11.1l12.6-29.5C317.7,14.7,295.3,10,272,8.5V40.6z M190.8,50 c15.7-5,32.2-8.2,49.2-9.4V8.5c-21.2,1.4-41.7,5.4-61.1,11.7L190.8,50z M442.3,92.3L419.6,115c12,13.9,22.3,29.4,30.5,46.1 l29.8-11.9C470,128.5,457.3,109.4,442.3,92.3z M397,92.4l22.7-22.7c-15.6-13.7-32.8-25.5-51.5-34.9l-12.6,29.5 C370.4,72.1,384.4,81.5,397,92.4z"}});const o={...r,attributeName:"opacity"},i={tag:"circle",attributes:{...a,cx:"256",cy:"364",r:"28"},children:[]};return e||i.children.push({tag:"animate",attributes:{...r,attributeName:"r",values:"28;14;28;28;14;28;"}},{tag:"animate",attributes:{...o,values:"1;0;1;1;0;1;"}}),n.push(i),n.push({tag:"path",attributes:{...a,opacity:"1",d:"M263.7,312h-16c-6.6,0-12-5.4-12-12c0-71,77.4-63.9,77.4-107.8c0-20-17.8-40.2-57.4-40.2c-29.1,0-44.3,9.6-59.2,28.7 c-3.9,5-11.1,6-16.2,2.4l-13.1-9.2c-5.6-3.9-6.9-11.8-2.6-17.2c21.2-27.2,46.4-44.7,91.2-44.7c52.3,0,97.4,29.8,97.4,80.2 c0,67.6-77.4,63.5-77.4,107.8C275.7,306.6,270.3,312,263.7,312z"},children:e?[]:[{tag:"animate",attributes:{...o,values:"1;0;0;0;0;1;"}}]}),e||n.push({tag:"path",attributes:{...a,opacity:"0",d:"M232.5,134.5l7,168c0.3,6.4,5.6,11.5,12,11.5h9c6.4,0,11.7-5.1,12-11.5l7-168c0.3-6.8-5.2-12.5-12-12.5h-23 C237.7,122,232.2,127.7,232.5,134.5z"},children:[{tag:"animate",attributes:{...o,values:"0;0;1;1;0;0;"}}]}),{tag:"g",attributes:{class:"missing"},children:n}}}},Nr={hooks(){return{parseNodeAttributes(t,e){const n=e.getAttribute("data-fa-symbol"),a=n===null?!1:n===""?!0:n;return t.symbol=a,t}}}},Mr=[Ta,gr,br,yr,vr,Pr,Er,_r,Tr,Cr,Nr];Ha(Mr,{mixoutsTo:E});E.noAuto;E.config;E.library;E.dom;const Vt=E.parse;E.findIconDefinition;E.toHtml;const Lr=E.icon;E.layer;E.text;E.counter;function Ce(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter(function(r){return Object.getOwnPropertyDescriptor(t,r).enumerable})),n.push.apply(n,a)}return n}function I(t){for(var e=1;e<arguments.length;e++){var n=arguments[e]!=null?arguments[e]:{};e%2?Ce(Object(n),!0).forEach(function(a){Q(t,a,n[a])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):Ce(Object(n)).forEach(function(a){Object.defineProperty(t,a,Object.getOwnPropertyDescriptor(n,a))})}return t}function bt(t){"@babel/helpers - typeof";return bt=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},bt(t)}function Q(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function zr(t,e){if(t==null)return{};var n={},a=Object.keys(t),r,o;for(o=0;o<a.length;o++)r=a[o],!(e.indexOf(r)>=0)&&(n[r]=t[r]);return n}function Fr(t,e){if(t==null)return{};var n=zr(t,e),a,r;if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);for(r=0;r<o.length;r++)a=o[r],!(e.indexOf(a)>=0)&&Object.prototype.propertyIsEnumerable.call(t,a)&&(n[a]=t[a])}return n}function Gt(t){return Rr(t)||jr(t)||Dr(t)||Yr()}function Rr(t){if(Array.isArray(t))return Bt(t)}function jr(t){if(typeof Symbol<"u"&&t[Symbol.iterator]!=null||t["@@iterator"]!=null)return Array.from(t)}function Dr(t,e){if(t){if(typeof t=="string")return Bt(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);if(n==="Object"&&t.constructor&&(n=t.constructor.name),n==="Map"||n==="Set")return Array.from(t);if(n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return Bt(t,e)}}function Bt(t,e){(e==null||e>t.length)&&(e=t.length);for(var n=0,a=new Array(e);n<e;n++)a[n]=t[n];return a}function Yr(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function Ur(t){var e,n=t.beat,a=t.fade,r=t.beatFade,o=t.bounce,i=t.shake,s=t.flash,l=t.spin,c=t.spinPulse,f=t.spinReverse,d=t.pulse,m=t.fixedWidth,h=t.inverse,v=t.border,S=t.listItem,y=t.flip,x=t.size,k=t.rotation,O=t.pull,M=(e={"fa-beat":n,"fa-fade":a,"fa-beat-fade":r,"fa-bounce":o,"fa-shake":i,"fa-flash":s,"fa-spin":l,"fa-spin-reverse":f,"fa-spin-pulse":c,"fa-pulse":d,"fa-fw":m,"fa-inverse":h,"fa-border":v,"fa-li":S,"fa-flip":y===!0,"fa-flip-horizontal":y==="horizontal"||y==="both","fa-flip-vertical":y==="vertical"||y==="both"},Q(e,"fa-".concat(x),typeof x<"u"&&x!==null),Q(e,"fa-rotate-".concat(k),typeof k<"u"&&k!==null&&k!==0),Q(e,"fa-pull-".concat(O),typeof O<"u"&&O!==null),Q(e,"fa-swap-opacity",t.swapOpacity),e);return Object.keys(M).map(function(_){return M[_]?_:null}).filter(function(_){return _})}function $r(t){return t=t-0,t===t}function yn(t){return $r(t)?t:(t=t.replace(/[\-_\s]+(.)?/g,function(e,n){return n?n.toUpperCase():""}),t.substr(0,1).toLowerCase()+t.substr(1))}var Wr=["style"];function Hr(t){return t.charAt(0).toUpperCase()+t.slice(1)}function Vr(t){return t.split(";").map(function(e){return e.trim()}).filter(function(e){return e}).reduce(function(e,n){var a=n.indexOf(":"),r=yn(n.slice(0,a)),o=n.slice(a+1).trim();return r.startsWith("webkit")?e[Hr(r)]=o:e[r]=o,e},{})}function vn(t,e){var n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:{};if(typeof e=="string")return e;var a=(e.children||[]).map(function(l){return vn(t,l)}),r=Object.keys(e.attributes||{}).reduce(function(l,c){var f=e.attributes[c];switch(c){case"class":l.attrs.className=f,delete e.attributes.class;break;case"style":l.attrs.style=Vr(f);break;default:c.indexOf("aria-")===0||c.indexOf("data-")===0?l.attrs[c.toLowerCase()]=f:l.attrs[yn(c)]=f}return l},{attrs:{}}),o=n.style,i=o===void 0?{}:o,s=Fr(n,Wr);return r.attrs.style=I(I({},r.attrs.style),i),t.apply(void 0,[e.tag,I(I({},r.attrs),s)].concat(Gt(a)))}var xn=!1;try{xn=!0}catch{}function Gr(){if(!xn&&console&&typeof console.error=="function"){var t;(t=console).error.apply(t,arguments)}}function Ne(t){if(t&&bt(t)==="object"&&t.prefix&&t.iconName&&t.icon)return t;if(Vt.icon)return Vt.icon(t);if(t===null)return null;if(t&&bt(t)==="object"&&t.prefix&&t.iconName)return t;if(Array.isArray(t)&&t.length===2)return{prefix:t[0],iconName:t[1]};if(typeof t=="string")return{prefix:"fas",iconName:t}}function _t(t,e){return Array.isArray(e)&&e.length>0||!Array.isArray(e)&&e?Q({},t,e):{}}var Me={border:!1,className:"",mask:null,maskId:null,fixedWidth:!1,inverse:!1,flip:!1,icon:null,listItem:!1,pull:null,pulse:!1,rotation:null,size:null,spin:!1,spinPulse:!1,spinReverse:!1,beat:!1,fade:!1,beatFade:!1,bounce:!1,shake:!1,symbol:!1,title:"",titleId:null,transform:null,swapOpacity:!1},oe=L.forwardRef(function(t,e){var n=I(I({},Me),t),a=n.icon,r=n.mask,o=n.symbol,i=n.className,s=n.title,l=n.titleId,c=n.maskId,f=Ne(a),d=_t("classes",[].concat(Gt(Ur(n)),Gt((i||"").split(" ")))),m=_t("transform",typeof n.transform=="string"?Vt.transform(n.transform):n.transform),h=_t("mask",Ne(r)),v=Lr(f,I(I(I(I({},d),m),h),{},{symbol:o,title:s,titleId:l,maskId:c}));if(!v)return Gr("Could not find icon",f),null;var S=v.abstract,y={ref:e};return Object.keys(n).forEach(function(x){Me.hasOwnProperty(x)||(y[x]=n[x])}),Br(S[0],y)});oe.displayName="FontAwesomeIcon";oe.propTypes={beat:p.bool,border:p.bool,beatFade:p.bool,bounce:p.bool,className:p.string,fade:p.bool,flash:p.bool,mask:p.oneOfType([p.object,p.array,p.string]),maskId:p.string,fixedWidth:p.bool,inverse:p.bool,flip:p.oneOf([!0,!1,"horizontal","vertical","both"]),icon:p.oneOfType([p.object,p.array,p.string]),listItem:p.bool,pull:p.oneOf(["right","left"]),pulse:p.bool,rotation:p.oneOf([0,90,180,270]),shake:p.bool,size:p.oneOf(["2xs","xs","sm","lg","xl","2xl","1x","2x","3x","4x","5x","6x","7x","8x","9x","10x"]),spin:p.bool,spinPulse:p.bool,spinReverse:p.bool,symbol:p.oneOfType([p.bool,p.string]),title:p.string,titleId:p.string,transform:p.oneOfType([p.string,p.object]),swapOpacity:p.bool};var Br=vn.bind(null,L.createElement);const Xr={prefix:"fas",iconName:"horse",icon:[576,512,[128014],"f6f0","M448 238.1l0-78.1 16 0 9.8 19.6c12.5 25.1 42.2 36.4 68.3 26c20.5-8.2 33.9-28 33.9-50.1L576 80c0-19.1-8.4-36.3-21.7-48l5.7 0c8.8 0 16-7.2 16-16s-7.2-16-16-16L480 0 448 0C377.3 0 320 57.3 320 128l-96 0-20.8 0-54.4 0c-30.7 0-57.6 16.3-72.5 40.8C33.2 174.5 0 211.4 0 256l0 56c0 13.3 10.7 24 24 24s24-10.7 24-24l0-56c0-13.4 6.6-25.2 16.7-32.5c1.6 13 6.3 25.4 13.6 36.4l28.2 42.4c8.3 12.4 6.4 28.7-1.2 41.6c-16.5 28-20.6 62.2-10 93.9l17.5 52.4c4.4 13.1 16.6 21.9 30.4 21.9l33.7 0c21.8 0 37.3-21.4 30.4-42.1l-20.8-62.5c-2.1-6.4-.5-13.4 4.3-18.2l12.7-12.7c13.2-13.2 20.6-31.1 20.6-49.7c0-2.3-.1-4.6-.3-6.9l84 24c4.1 1.2 8.2 2.1 12.3 2.8L320 480c0 17.7 14.3 32 32 32l32 0c17.7 0 32-14.3 32-32l0-164.3c19.2-19.2 31.5-45.7 32-75.7c0 0 0 0 0 0l0-1.9zM496 64a16 16 0 1 1 0 32 16 16 0 1 1 0-32z"]},Qr={prefix:"fas",iconName:"venus",icon:[384,512,[9792],"f221","M80 176a112 112 0 1 1 224 0A112 112 0 1 1 80 176zM224 349.1c81.9-15 144-86.8 144-173.1C368 78.8 289.2 0 192 0S16 78.8 16 176c0 86.3 62.1 158.1 144 173.1l0 34.9-32 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l32 0 0 32c0 17.7 14.3 32 32 32s32-14.3 32-32l0-32 32 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-32 0 0-34.9z"]},Jr={prefix:"fas",iconName:"question",icon:[320,512,[10067,10068,61736],"3f","M80 160c0-35.3 28.7-64 64-64l32 0c35.3 0 64 28.7 64 64l0 3.6c0 21.8-11.1 42.1-29.4 53.8l-42.2 27.1c-25.2 16.2-40.4 44.1-40.4 74l0 1.4c0 17.7 14.3 32 32 32s32-14.3 32-32l0-1.4c0-8.2 4.2-15.8 11-20.2l42.2-27.1c36.6-23.6 58.8-64.1 58.8-107.7l0-3.6c0-70.7-57.3-128-128-128l-32 0C73.3 32 16 89.3 16 160c0 17.7 14.3 32 32 32s32-14.3 32-32zm80 320a40 40 0 1 0 0-80 40 40 0 1 0 0 80z"]},Zr={prefix:"fas",iconName:"arrow-up-right-from-square",icon:[512,512,["external-link"],"f08e","M320 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l82.7 0L201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L448 109.3l0 82.7c0 17.7 14.3 32 32 32s32-14.3 32-32l0-160c0-17.7-14.3-32-32-32L320 0zM80 32C35.8 32 0 67.8 0 112L0 432c0 44.2 35.8 80 80 80l320 0c44.2 0 80-35.8 80-80l0-112c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 112c0 8.8-7.2 16-16 16L80 448c-8.8 0-16-7.2-16-16l0-320c0-8.8 7.2-16 16-16l112 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L80 32z"]},to={prefix:"fas",iconName:"envelope",icon:[512,512,[128386,9993,61443],"f0e0","M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48L48 64zM0 176L0 384c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-208L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"]},eo={prefix:"fas",iconName:"mars",icon:[448,512,[9794],"f222","M289.8 46.8c3.7-9 12.5-14.8 22.2-14.8l112 0c13.3 0 24 10.7 24 24l0 112c0 9.7-5.8 18.5-14.8 22.2s-19.3 1.7-26.2-5.2l-33.4-33.4L321 204.2c19.5 28.4 31 62.7 31 99.8c0 97.2-78.8 176-176 176S0 401.2 0 304s78.8-176 176-176c37 0 71.4 11.4 99.8 31l52.6-52.6L295 73c-6.9-6.9-8.9-17.2-5.2-26.2zM400 80s0 0 0 0s0 0 0 0s0 0 0 0zM176 416a112 112 0 1 0 0-224 112 112 0 1 0 0 224z"]},Le=!0,ze={type:"divider"};function no(t){return Fe.flatMap(e=>"children"in e?e.children:e).filter(e=>e.type==="page").find(({path:e})=>e===t)??(()=>{throw Error(`targetPath has NOT been found: ${Fe.filter(e=>e.type==="page").map(({path:e})=>e)}`)})()}const ao="/videos",Fe=[{type:"page",icon:A.jsx(Vn,{}),label:"プロフィール",path:"/profile",Page:L.lazy(()=>W(()=>import("./lazy-De--Qebx.js"),__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19]))),title:"MOTTY fans - プロフィール",hideInMenu:!1},{type:"page",icon:A.jsx($n,{}),label:"実況シリーズ一覧",path:"/live-series",Page:L.lazy(()=>W(()=>import("./lazy-Z_2cHhyX.js"),__vite__mapDeps([20,1,2,3,4,5,21,22,6,23,13,11,9,10,14,8,17,15,16,24,25,26,27,28,29,30,31,32,7,12,18,19]))),title:"MOTTY fans - 実況シリーズ一覧",hideInMenu:Le},...["","/:hash"].map(t=>({type:"page",icon:A.jsx(Xn,{}),label:"YouTube 動画一覧",path:`/videos${t}`,Page:L.lazy(()=>W(()=>import("./lazy-ybAcx4Gq.js"),__vite__mapDeps([33,1,2,3,4,5,34,35,6,17,8,36,37,27,9,10,23,11,21,26,22,13,14,32,7,15,16,24,25,28,29,30,38,39,18,19,40]))),title:"MOTTY fans - YouTube 動画一覧",hideInMenu:!!t})),ze,{type:"nest",icon:A.jsx(oe,{icon:Xr}),label:"ダビスタ(Switch版)記録",children:[{type:"page",icon:A.jsx(Gn,{}),label:"牝系図",path:"/mare-line",Page:L.lazy(()=>W(()=>import("./lazy-CMudVJL3.js"),__vite__mapDeps([41,1,2,3,4,5,42,43,19,40,18,6,37,27,9,10,23,11,35,17,8,44,25,26,15]))),title:"MOTTY fans - ダビスタ - 牝系図"},{type:"page",icon:A.jsx(Bn,{}),label:"家系図(旧)",path:"/family",Page:L.lazy(()=>W(()=>import("./lazy-BvWpicMa.js"),__vite__mapDeps([45,1,2,3,4,5,42,43,19,40,18,32,6,7,8,15,46]))),title:"MOTTY fans - ダビスタ - 家系図(旧)"}]},ze,{type:"page",icon:A.jsx(Wn,{}),label:"変更履歴",path:"/change-log",Page:L.lazy(()=>W(()=>import("./lazy-DCbOMr5P.js"),__vite__mapDeps([47,1,2,3,4,5,6,15,18,19,48]))),title:"MOTTY fans - 変更履歴"},{type:"page",icon:A.jsx(Hn,{}),label:"ハッシュテスト",path:"/hash-testing",Page:L.lazy(()=>W(()=>import("./lazy-B44D2bix.js"),__vite__mapDeps([49,4,39,5,2,21,6,24,25,8,10,26,23,9,27,28,29,15,14,30,32,7]))),title:"(ハッシュテスト用)",hideInMenu:Le}];export{oe as F,p as P,to as a,Zr as b,q as c,ao as d,Jr as e,no as f,Qr as g,eo as h,Fe as m,zn as p};
