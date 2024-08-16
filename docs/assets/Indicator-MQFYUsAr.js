import{r as $,j as o}from"./jsx-runtime-_5WuVDLK.js";import{b as N}from"./hooks-OTimIAZF.js";import{i as B,k as F,o as D,j as d,g as l,b as i,p as I,u as U,_ as E,c as K,h as W}from"./DefaultPropsProvider-Cd7czArd.js";import{B as A}from"./Backdrop-CBRxG1rH.js";function G(r){return B("MuiCircularProgress",r)}F("MuiCircularProgress",["root","determinate","indeterminate","colorPrimary","colorSecondary","svg","circle","circleDeterminate","circleIndeterminate","circleDisableShrink"]);const H=["className","color","disableShrink","size","style","thickness","value","variant"];let u=r=>r,P,b,S,j;const t=44,L=D(P||(P=u`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`)),O=D(b||(b=u`
  0% {
    stroke-dasharray: 1px, 200px;
    stroke-dashoffset: 0;
  }

  50% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -15px;
  }

  100% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -125px;
  }
`)),V=r=>{const{classes:e,variant:s,color:a,disableShrink:m}=r,p={root:["root",s,`color${l(a)}`],svg:["svg"],circle:["circle",`circle${l(s)}`,m&&"circleDisableShrink"]};return W(p,G,e)},Z=d("span",{name:"MuiCircularProgress",slot:"Root",overridesResolver:(r,e)=>{const{ownerState:s}=r;return[e.root,e[s.variant],e[`color${l(s.color)}`]]}})(({ownerState:r,theme:e})=>i({display:"inline-block"},r.variant==="determinate"&&{transition:e.transitions.create("transform")},r.color!=="inherit"&&{color:(e.vars||e).palette[r.color].main}),({ownerState:r})=>r.variant==="indeterminate"&&I(S||(S=u`
      animation: ${0} 1.4s linear infinite;
    `),L)),q=d("svg",{name:"MuiCircularProgress",slot:"Svg",overridesResolver:(r,e)=>e.svg})({display:"block"}),J=d("circle",{name:"MuiCircularProgress",slot:"Circle",overridesResolver:(r,e)=>{const{ownerState:s}=r;return[e.circle,e[`circle${l(s.variant)}`],s.disableShrink&&e.circleDisableShrink]}})(({ownerState:r,theme:e})=>i({stroke:"currentColor"},r.variant==="determinate"&&{transition:e.transitions.create("stroke-dashoffset")},r.variant==="indeterminate"&&{strokeDasharray:"80px, 200px",strokeDashoffset:0}),({ownerState:r})=>r.variant==="indeterminate"&&!r.disableShrink&&I(j||(j=u`
      animation: ${0} 1.4s ease-in-out infinite;
    `),O)),M=$.forwardRef(function(e,s){const a=U({props:e,name:"MuiCircularProgress"}),{className:m,color:p="primary",disableShrink:w=!1,size:f=40,style:R,thickness:n=3.6,value:h=0,variant:k="indeterminate"}=a,z=E(a,H),c=i({},a,{color:p,disableShrink:w,size:f,thickness:n,value:h,variant:k}),x=V(c),g={},v={},y={};if(k==="determinate"){const C=2*Math.PI*((t-n)/2);g.strokeDasharray=C.toFixed(3),y["aria-valuenow"]=Math.round(h),g.strokeDashoffset=`${((100-h)/100*C).toFixed(3)}px`,v.transform="rotate(-90deg)"}return o.jsx(Z,i({className:K(x.root,m),style:i({width:f,height:f},v,R),ownerState:c,ref:s,role:"progressbar"},y,z,{children:o.jsx(q,{className:x.svg,ownerState:c,viewBox:`${t/2} ${t/2} ${t} ${t}`,children:o.jsx(J,{className:x.circle,style:g,ownerState:c,cx:t,cy:t,r:(t-n)/2,fill:"none",strokeWidth:n})})}))}),_=d(A)(({theme:r})=>({zIndex:r.zIndex.drawer+1,color:"#fff"})),Q=()=>{const{awaits:r}=N(s=>s.indicator);return{waiting:$.useMemo(()=>Object.values(r).some(s=>s>0),[r])}};function er(){const{waiting:r}=Q();return o.jsx(_,{open:r,children:o.jsx(M,{color:"inherit"})})}function sr(){return o.jsx(_,{open:!0,children:o.jsx(M,{color:"inherit"})})}export{sr as F,er as I};
