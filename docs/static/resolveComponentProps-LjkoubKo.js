import{r as u}from"./jsx-runtime-_5WuVDLK.js";import{b as l,c as h}from"./DefaultPropsProvider-CSjmKMGg.js";const S=typeof window<"u"?u.useLayoutEffect:u.useEffect;function C(e,s){var t,n;return u.isValidElement(e)&&s.indexOf((t=e.type.muiName)!=null?t:(n=e.type)==null||(n=n._payload)==null||(n=n.value)==null?void 0:n.muiName)!==-1}function T(e){const s=u.useRef(e);return S(()=>{s.current=e}),u.useRef((...t)=>(0,s.current)(...t)).current}const E={};function x(e,s){const t=u.useRef(E);return t.current===E&&(t.current=e(s)),t}const w=[];function O(e){u.useEffect(e,w)}class c{constructor(){this.currentId=null,this.clear=()=>{this.currentId!==null&&(clearTimeout(this.currentId),this.currentId=null)},this.disposeEffect=()=>this.clear}static create(){return new c}start(s,t){this.clear(),this.currentId=setTimeout(()=>{this.currentId=null,t()},s)}}function A(){const e=x(c.create).current;return O(e.disposeEffect),e}function H(e){return typeof e=="string"}function L(e,s,t){return e===void 0||H(e)?s:l({},s,{ownerState:l({},s.ownerState,t)})}function P(e,s=[]){if(e===void 0)return{};const t={};return Object.keys(e).filter(n=>n.match(/^on[A-Z]/)&&typeof e[n]=="function"&&!s.includes(n)).forEach(n=>{t[n]=e[n]}),t}function p(e){if(e===void 0)return{};const s={};return Object.keys(e).filter(t=>!(t.match(/^on[A-Z]/)&&typeof e[t]=="function")).forEach(t=>{s[t]=e[t]}),s}function M(e){const{getSlotProps:s,additionalProps:t,externalSlotProps:n,externalForwardedProps:r,className:f}=e;if(!s){const y=h(t==null?void 0:t.className,f,r==null?void 0:r.className,n==null?void 0:n.className),v=l({},t==null?void 0:t.style,r==null?void 0:r.style,n==null?void 0:n.style),a=l({},t,r,n);return y.length>0&&(a.className=y),Object.keys(v).length>0&&(a.style=v),{props:a,internalRef:void 0}}const N=P(l({},r,n)),I=p(n),g=p(r),i=s(N),d=h(i==null?void 0:i.className,t==null?void 0:t.className,f,r==null?void 0:r.className,n==null?void 0:n.className),m=l({},i==null?void 0:i.style,t==null?void 0:t.style,r==null?void 0:r.style,n==null?void 0:n.style),o=l({},i,t,g,I);return d.length>0&&(o.className=d),Object.keys(m).length>0&&(o.style=m),{props:o,internalRef:i.ref}}function Z(e,s,t){return typeof e=="function"?e(s,t):e}export{c as T,S as a,L as b,T as c,H as d,P as e,C as i,M as m,Z as r,A as u};