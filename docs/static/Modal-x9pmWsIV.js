import{b as T,i as me,k as he,j as le,u as be,_ as ge,c as ee,h as Ee}from"./DefaultPropsProvider-CSjmKMGg.js";import{r as l,j as I}from"./jsx-runtime-_5WuVDLK.js";import{o as O,a as q,c as te,b as ne}from"./useSlotProps-BWWNHuKW.js";import{u as V,s as oe}from"./TransitionGroupContext-OigCRaz6.js";import{a as re,c as se,e as xe}from"./resolveComponentProps-LjkoubKo.js";import{B as ve}from"./Backdrop-Diuy1ohG.js";import{r as Re}from"./index-CTAOeIM6.js";function Pe(e){const t=e.documentElement.clientWidth;return Math.abs(window.innerWidth-t)}function ye(e){return typeof e=="function"?e():e}const ke=l.forwardRef(function(t,o){const{children:n,container:i,disablePortal:r=!1}=t,[s,c]=l.useState(null),u=V(l.isValidElement(n)?n.ref:null,o);if(re(()=>{r||c(ye(i)||document.body)},[i,r]),re(()=>{if(s&&!r)return oe(o,s),()=>{oe(o,null)}},[o,s,r]),r){if(l.isValidElement(n)){const m={ref:u};return l.cloneElement(n,m)}return I.jsx(l.Fragment,{children:n})}return I.jsx(l.Fragment,{children:s&&Re.createPortal(n,s)})});function Te(e){const t=O(e);return t.body===e?q(e).innerWidth>t.documentElement.clientWidth:e.scrollHeight>e.clientHeight}function U(e,t){t?e.setAttribute("aria-hidden","true"):e.removeAttribute("aria-hidden")}function ie(e){return parseInt(q(e).getComputedStyle(e).paddingRight,10)||0}function Se(e){const o=["TEMPLATE","SCRIPT","STYLE","LINK","MAP","META","NOSCRIPT","PICTURE","COL","COLGROUP","PARAM","SLOT","SOURCE","TRACK"].indexOf(e.tagName)!==-1,n=e.tagName==="INPUT"&&e.getAttribute("type")==="hidden";return o||n}function ae(e,t,o,n,i){const r=[t,o,...n];[].forEach.call(e.children,s=>{const c=r.indexOf(s)===-1,u=!Se(s);c&&u&&U(s,i)})}function Y(e,t){let o=-1;return e.some((n,i)=>t(n)?(o=i,!0):!1),o}function Ie(e,t){const o=[],n=e.container;if(!t.disableScrollLock){if(Te(n)){const s=Pe(O(n));o.push({value:n.style.paddingRight,property:"padding-right",el:n}),n.style.paddingRight=`${ie(n)+s}px`;const c=O(n).querySelectorAll(".mui-fixed");[].forEach.call(c,u=>{o.push({value:u.style.paddingRight,property:"padding-right",el:u}),u.style.paddingRight=`${ie(u)+s}px`})}let r;if(n.parentNode instanceof DocumentFragment)r=O(n).body;else{const s=n.parentElement,c=q(n);r=(s==null?void 0:s.nodeName)==="HTML"&&c.getComputedStyle(s).overflowY==="scroll"?s:n}o.push({value:r.style.overflow,property:"overflow",el:r},{value:r.style.overflowX,property:"overflow-x",el:r},{value:r.style.overflowY,property:"overflow-y",el:r}),r.style.overflow="hidden"}return()=>{o.forEach(({value:r,el:s,property:c})=>{r?s.style.setProperty(c,r):s.style.removeProperty(c)})}}function Ne(e){const t=[];return[].forEach.call(e.children,o=>{o.getAttribute("aria-hidden")==="true"&&t.push(o)}),t}class Ce{constructor(){this.containers=void 0,this.modals=void 0,this.modals=[],this.containers=[]}add(t,o){let n=this.modals.indexOf(t);if(n!==-1)return n;n=this.modals.length,this.modals.push(t),t.modalRef&&U(t.modalRef,!1);const i=Ne(o);ae(o,t.mount,t.modalRef,i,!0);const r=Y(this.containers,s=>s.container===o);return r!==-1?(this.containers[r].modals.push(t),n):(this.containers.push({modals:[t],container:o,restore:null,hiddenSiblings:i}),n)}mount(t,o){const n=Y(this.containers,r=>r.modals.indexOf(t)!==-1),i=this.containers[n];i.restore||(i.restore=Ie(i,o))}remove(t,o=!0){const n=this.modals.indexOf(t);if(n===-1)return n;const i=Y(this.containers,s=>s.modals.indexOf(t)!==-1),r=this.containers[i];if(r.modals.splice(r.modals.indexOf(t),1),this.modals.splice(n,1),r.modals.length===0)r.restore&&r.restore(),t.modalRef&&U(t.modalRef,o),ae(r.container,t.mount,t.modalRef,r.hiddenSiblings,!1),this.containers.splice(i,1);else{const s=r.modals[r.modals.length-1];s.modalRef&&U(s.modalRef,!1)}return n}isTopModal(t){return this.modals.length>0&&this.modals[this.modals.length-1]===t}}const Me=["input","select","textarea","a[href]","button","[tabindex]","audio[controls]","video[controls]",'[contenteditable]:not([contenteditable="false"])'].join(",");function Fe(e){const t=parseInt(e.getAttribute("tabindex")||"",10);return Number.isNaN(t)?e.contentEditable==="true"||(e.nodeName==="AUDIO"||e.nodeName==="VIDEO"||e.nodeName==="DETAILS")&&e.getAttribute("tabindex")===null?0:e.tabIndex:t}function we(e){if(e.tagName!=="INPUT"||e.type!=="radio"||!e.name)return!1;const t=n=>e.ownerDocument.querySelector(`input[type="radio"]${n}`);let o=t(`[name="${e.name}"]:checked`);return o||(o=t(`[name="${e.name}"]`)),o!==e}function Ae(e){return!(e.disabled||e.tagName==="INPUT"&&e.type==="hidden"||we(e))}function Oe(e){const t=[],o=[];return Array.from(e.querySelectorAll(Me)).forEach((n,i)=>{const r=Fe(n);r===-1||!Ae(n)||(r===0?t.push(n):o.push({documentOrder:i,tabIndex:r,node:n}))}),o.sort((n,i)=>n.tabIndex===i.tabIndex?n.documentOrder-i.documentOrder:n.tabIndex-i.tabIndex).map(n=>n.node).concat(t)}function Be(){return!0}function De(e){const{children:t,disableAutoFocus:o=!1,disableEnforceFocus:n=!1,disableRestoreFocus:i=!1,getTabbable:r=Oe,isEnabled:s=Be,open:c}=e,u=l.useRef(!1),m=l.useRef(null),h=l.useRef(null),b=l.useRef(null),R=l.useRef(null),E=l.useRef(!1),d=l.useRef(null),B=V(t.ref,d),C=l.useRef(null);l.useEffect(()=>{!c||!d.current||(E.current=!o)},[o,c]),l.useEffect(()=>{if(!c||!d.current)return;const a=O(d.current);return d.current.contains(a.activeElement)||(d.current.hasAttribute("tabIndex")||d.current.setAttribute("tabIndex","-1"),E.current&&d.current.focus()),()=>{i||(b.current&&b.current.focus&&(u.current=!0,b.current.focus()),b.current=null)}},[c]),l.useEffect(()=>{if(!c||!d.current)return;const a=O(d.current),P=g=>{C.current=g,!(n||!s()||g.key!=="Tab")&&a.activeElement===d.current&&g.shiftKey&&(u.current=!0,h.current&&h.current.focus())},y=()=>{const g=d.current;if(g===null)return;if(!a.hasFocus()||!s()||u.current){u.current=!1;return}if(g.contains(a.activeElement)||n&&a.activeElement!==m.current&&a.activeElement!==h.current)return;if(a.activeElement!==R.current)R.current=null;else if(R.current!==null)return;if(!E.current)return;let x=[];if((a.activeElement===m.current||a.activeElement===h.current)&&(x=r(d.current)),x.length>0){var w,v;const D=!!((w=C.current)!=null&&w.shiftKey&&((v=C.current)==null?void 0:v.key)==="Tab"),A=x[0],N=x[x.length-1];typeof A!="string"&&typeof N!="string"&&(D?N.focus():A.focus())}else g.focus()};a.addEventListener("focusin",y),a.addEventListener("keydown",P,!0);const F=setInterval(()=>{a.activeElement&&a.activeElement.tagName==="BODY"&&y()},50);return()=>{clearInterval(F),a.removeEventListener("focusin",y),a.removeEventListener("keydown",P,!0)}},[o,n,i,s,c,r]);const M=a=>{b.current===null&&(b.current=a.relatedTarget),E.current=!0,R.current=a.target;const P=t.props.onFocus;P&&P(a)},S=a=>{b.current===null&&(b.current=a.relatedTarget),E.current=!0};return I.jsxs(l.Fragment,{children:[I.jsx("div",{tabIndex:c?0:-1,onFocus:S,ref:m,"data-testid":"sentinelStart"}),l.cloneElement(t,{ref:B,onFocus:M}),I.jsx("div",{tabIndex:c?0:-1,onFocus:S,ref:h,"data-testid":"sentinelEnd"})]})}function Le(e){return typeof e=="function"?e():e}function je(e){return e?e.props.hasOwnProperty("in"):!1}const He=new Ce;function Ke(e){const{container:t,disableEscapeKeyDown:o=!1,disableScrollLock:n=!1,manager:i=He,closeAfterTransition:r=!1,onTransitionEnter:s,onTransitionExited:c,children:u,onClose:m,open:h,rootRef:b}=e,R=l.useRef({}),E=l.useRef(null),d=l.useRef(null),B=V(d,b),[C,M]=l.useState(!h),S=je(u);let a=!0;(e["aria-hidden"]==="false"||e["aria-hidden"]===!1)&&(a=!1);const P=()=>O(E.current),y=()=>(R.current.modalRef=d.current,R.current.mount=E.current,R.current),F=()=>{i.mount(y(),{disableScrollLock:n}),d.current&&(d.current.scrollTop=0)},g=se(()=>{const p=Le(t)||P().body;i.add(y(),p),d.current&&F()}),x=l.useCallback(()=>i.isTopModal(y()),[i]),w=se(p=>{E.current=p,p&&(h&&x()?F():d.current&&U(d.current,a))}),v=l.useCallback(()=>{i.remove(y(),a)},[a,i]);l.useEffect(()=>()=>{v()},[v]),l.useEffect(()=>{h?g():(!S||!r)&&v()},[h,v,S,r,g]);const D=p=>f=>{var k;(k=p.onKeyDown)==null||k.call(p,f),!(f.key!=="Escape"||f.which===229||!x())&&(o||(f.stopPropagation(),m&&m(f,"escapeKeyDown")))},A=p=>f=>{var k;(k=p.onClick)==null||k.call(p,f),f.target===f.currentTarget&&m&&m(f,"backdropClick")};return{getRootProps:(p={})=>{const f=xe(e);delete f.onTransitionEnter,delete f.onTransitionExited;const k=T({},f,p);return T({role:"presentation"},k,{onKeyDown:D(k),ref:B})},getBackdropProps:(p={})=>{const f=p;return T({"aria-hidden":!0},f,{onClick:A(f),open:h})},getTransitionProps:()=>{const p=()=>{M(!1),s&&s()},f=()=>{M(!0),c&&c(),r&&v()};return{onEnter:te(p,u==null?void 0:u.props.onEnter),onExited:te(f,u==null?void 0:u.props.onExited)}},rootRef:B,portalRef:w,isTopModal:x,exited:C,hasTransition:S}}function Ue(e){return me("MuiModal",e)}he("MuiModal",["root","hidden","backdrop"]);const _e=["BackdropComponent","BackdropProps","classes","className","closeAfterTransition","children","container","component","components","componentsProps","disableAutoFocus","disableEnforceFocus","disableEscapeKeyDown","disablePortal","disableRestoreFocus","disableScrollLock","hideBackdrop","keepMounted","onBackdropClick","onClose","onTransitionEnter","onTransitionExited","open","slotProps","slots","theme"],$e=e=>{const{open:t,exited:o,classes:n}=e;return Ee({root:["root",!t&&o&&"hidden"],backdrop:["backdrop"]},Ue,n)},We=le("div",{name:"MuiModal",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:o}=e;return[t.root,!o.open&&o.exited&&t.hidden]}})(({theme:e,ownerState:t})=>T({position:"fixed",zIndex:(e.vars||e).zIndex.modal,right:0,bottom:0,top:0,left:0},!t.open&&t.exited&&{visibility:"hidden"})),ze=le(ve,{name:"MuiModal",slot:"Backdrop",overridesResolver:(e,t)=>t.backdrop})({zIndex:-1}),Ze=l.forwardRef(function(t,o){var n,i,r,s,c,u;const m=be({name:"MuiModal",props:t}),{BackdropComponent:h=ze,BackdropProps:b,className:R,closeAfterTransition:E=!1,children:d,container:B,component:C,components:M={},componentsProps:S={},disableAutoFocus:a=!1,disableEnforceFocus:P=!1,disableEscapeKeyDown:y=!1,disablePortal:F=!1,disableRestoreFocus:g=!1,disableScrollLock:x=!1,hideBackdrop:w=!1,keepMounted:v=!1,onBackdropClick:D,open:A,slotProps:N,slots:H}=m,G=ge(m,_e),p=T({},m,{closeAfterTransition:E,disableAutoFocus:a,disableEnforceFocus:P,disableEscapeKeyDown:y,disablePortal:F,disableRestoreFocus:g,disableScrollLock:x,hideBackdrop:w,keepMounted:v}),{getRootProps:f,getBackdropProps:k,getTransitionProps:ce,portalRef:de,isTopModal:ue,exited:X,hasTransition:J}=Ke(T({},p,{rootRef:o})),K=T({},p,{exited:X}),L=$e(K),_={};if(d.props.tabIndex===void 0&&(_.tabIndex="-1"),J){const{onEnter:j,onExited:$}=ce();_.onEnter=j,_.onExited=$}const Q=(n=(i=H==null?void 0:H.root)!=null?i:M.Root)!=null?n:We,Z=(r=(s=H==null?void 0:H.backdrop)!=null?s:M.Backdrop)!=null?r:h,W=(c=N==null?void 0:N.root)!=null?c:S.root,z=(u=N==null?void 0:N.backdrop)!=null?u:S.backdrop,fe=ne({elementType:Q,externalSlotProps:W,externalForwardedProps:G,getSlotProps:f,additionalProps:{ref:o,as:C},ownerState:K,className:ee(R,W==null?void 0:W.className,L==null?void 0:L.root,!K.open&&K.exited&&(L==null?void 0:L.hidden))}),pe=ne({elementType:Z,externalSlotProps:z,additionalProps:b,getSlotProps:j=>k(T({},j,{onClick:$=>{D&&D($),j!=null&&j.onClick&&j.onClick($)}})),className:ee(z==null?void 0:z.className,b==null?void 0:b.className,L==null?void 0:L.backdrop),ownerState:K});return!v&&!A&&(!J||X)?null:I.jsx(ke,{ref:de,container:B,disablePortal:F,children:I.jsxs(Q,T({},fe,{children:[!w&&h?I.jsx(Z,T({},pe)):null,I.jsx(De,{disableEnforceFocus:P,disableAutoFocus:a,disableRestoreFocus:g,isEnabled:ue,open:A,children:l.cloneElement(d,_)})]}))})});export{De as F,Ze as M,ke as P,Pe as g};