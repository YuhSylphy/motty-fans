(this["webpackJsonpmotty-derby"]=this["webpackJsonpmotty-derby"]||[]).push([[0],{271:function(e,t,n){},458:function(e,t,n){},468:function(e,t,n){},470:function(e,t,n){"use strict";n.r(t);var a=n(2),r=n(248),c=n(509),o=n(0),s=n.n(o),i=n(15),l=n.n(i),u=(n(271),n(138)),b=n(10),f=n(136),j=n(511),d=n(255),m=n(256),h=n(76),O=n(166),p=(n(458),n(20)),x=function(){var e=Object(o.useRef)(null),t=Object(p.c)((function(e){return e.horseDefs.list})),n=Object(o.useMemo)((function(){return function(e){var t=new Map,n=[];return e.forEach((function(e){t.set(e.name,{label:e.name,class:"owned ".concat(e.sex)}),e.motherName&&(t.has(e.motherName)||t.set(e.motherName,{label:e.motherName,class:"anothers female"}),n.push([{v:e.motherName,w:e.name},{class:"mother"}])),e.fatherName&&(t.has(e.fatherName)||t.set(e.fatherName,{label:e.fatherName,class:"anothers male"}),n.push([{v:e.fatherName,w:e.name},{class:"father"}]))})),{nodes:Array.from(t.entries()),edges:n}}(t)}),[t]);return Object(o.useEffect)((function(){var t=h.select(e.current);if(t.selectAll("g").remove(),0!==n.nodes.length||0!==n.edges.length){var a=(new O.graphlib.Graph).setGraph({rankdir:"LR"}).setDefaultEdgeLabel((function(){return{}}));n.nodes.forEach((function(e){a.setNode(e[0],e[1])})),a.nodes().forEach((function(e){var t=a.node(e);t.rx=t.ry=5})),n.edges.forEach((function(e){a.setEdge(e[0],e[1])}));var r=new O.render,c=t.append("g"),o=h.zoom().on("zoom",(function(){c.attr("transform",h.event.transform)}));t.call(o),r(h.select("svg g"),a);var s=(Number(t.attr("width"))-(a.graph().width||0))/2;c.attr("transform","translate(".concat(Number.isNaN(s)?0:s,", 20)"))}}),[e,n]),Object(a.jsx)(o.Fragment,{children:Object(a.jsx)("svg",{className:"d3-component mottv-derby-family",width:"100%",height:"70vh",ref:e})})},g=function(){return Object(a.jsxs)(j.a,{children:[Object(a.jsx)(d.a,{variant:"h4",children:"\u7cfb\u56f3"}),Object(a.jsx)(m.a,{children:Object(a.jsx)(x,{})})]})},w=function(){return Object(a.jsx)("h2",{children:"404 NOT FOUND"})},v=n(516),y=n(505),N=n(506),k=n(512),M=n(517),C=n(53),E=n(508),S=n(507),T=n(55),F=Object(T.b)({name:"horseDefs",initialState:{list:[]},reducers:{init:function(){},set:function(e,t){e.list=t.payload.list}}}),D=F.actions,I=F.reducer,z=n(168),A=n.n(z),U=n(242),H=n(514),L=n(251),R=n(250),G=n(88),P=n(31),B=Object(T.b)({name:"indicator",initialState:{awaits:{}},reducers:{set:function(e,t){e.awaits=t.payload},open:function(e,t){var n=t.payload;e.awaits=Object(P.a)(Object(P.a)({},e.awaits),{},Object(G.a)({},n,1+(n in e.awaits?e.awaits[n]:0)))},close:function(e,t){var n=t.payload;if(n in e.awaits){var a=e.awaits,r=a[n],c=Object(L.a)(a,[n].map(R.a));e.awaits=Object(P.a)(Object(P.a)({},c),r>1?Object(G.a)({},n,r-1):{})}else console.warn("there isnt key [".concat(n,"] in "))}}}),J=B.actions,V=B.reducer,W=n(519),_=n(130),K=n(494),Y=n(252),$=J.open,q=J.close,Q=n(495),X=n(472),Z=n(496),ee=Object(Q.a)((function(e){return{backdrop:{zIndex:e.zIndex.drawer+1,color:"#fff"}}})),te=function(){var e=ee(),t=Object(p.c)((function(e){return e.indicator})).awaits,n=Object(o.useMemo)((function(){return Object.values(t).some((function(e){return e>0}))}),[t]);return Object(a.jsx)(X.a,{className:e.backdrop,open:n,children:Object(a.jsx)(Z.a,{color:"inherit"})})},ne=n(129),ae=n(513),re={Uk:{label:"\u4e0d\u660e(\u6307\u5b9a\u306a\u3057)"},Ec:{label:"\u30a8\u30af\u30ea\u30d7\u30b9"},Ph:{label:"\u30d5\u30a1\u30e9\u30ea\u30b9"},Ns:{label:"\u30ca\u30b9\u30eb\u30fc\u30e9"},Ro:{label:"\u30ed\u30a4\u30e4\u30eb\u30c1\u30e3\u30fc\u30b8\u30e3\u30fc"},Ne:{label:"\u30cb\u30a2\u30fc\u30af\u30c6\u30a3\u30c3\u30af"},Na:{label:"\u30cd\u30a4\u30c6\u30a3\u30f4\u30c0\u30f3\u30b5\u30fc"},Fa:{label:"\u30d5\u30a7\u30a2\u30a6\u30a7\u30a4"},To:{label:"\u30c8\u30e0\u30d5\u30fc\u30eb"},Te:{label:"\u30c6\u30c7\u30a3"},Sw:{label:"\u30b9\u30a4\u30f3\u30d5\u30a9\u30fc\u30c9"},Ha:{label:"\u30cf\u30f3\u30d7\u30c8\u30f3"},Hi:{label:"\u30d2\u30e0\u30e4\u30fc"},St:{label:"\u30bb\u30f3\u30c8\u30b5\u30a4\u30e2\u30f3"},Ma:{label:"\u30de\u30c3\u30c1\u30a7\u30e0"},He:{label:"\u30d8\u30ed\u30c9"}},ce=function(){return fetch("".concat("/motty-derby","/assets/horse-defs.json")).then((function(e){return e.json()})).then((function(e){return e.filter((function(e){return!e.removed})).map((function(e){var t;return Object(P.a)(Object(P.a)({},e),{},{listed:!!e.listed,owned:!0,show:!0,memo:null!==(t=e.memo)&&void 0!==t?t:[]})}))}))},oe=function(){return fetch("".concat("/motty-derby","/assets/stallion-defs.json")).then((function(e){return e.json()})).then((function(e){return e.map((function(e){var t;return Object(P.a)(Object(P.a)({},e),{},{sex:"male",owned:!1,memo:null!==(t=e.memo)&&void 0!==t?t:[]})}))}))},se=function(){return fetch("".concat("/motty-derby","/assets/broodmare-defs.json")).then((function(e){return e.json()})).then((function(e){return e.map((function(e){var t;return Object(P.a)(Object(P.a)({},e),{},{sex:"female",owned:!1,memo:null!==(t=e.memo)&&void 0!==t?t:[]})}))}))},ie=Object(H.a)((function(e){return e.ofType(D.init.type).pipe((t="horse-defs/fetch",n=Object(U.a)(A.a.mark((function e(){return A.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.t0=D,e.next=3,Object(_.a)(ce,oe,se).pipe(Object(Y.a)((function(e){return e()})),Object(ne.a)(),Object(ae.a)()).toPromise();case 3:return e.t1=e.sent,e.t2={list:e.t1},e.abrupt("return",e.t0.set.call(e.t0,e.t2));case 6:case"end":return e.stop()}}),e)}))),function(e){return e.pipe(Object(Y.a)((function(e){return Object(W.a)(Object(_.a)($(t)),Object(K.a)((function(){return n(e)})),Object(_.a)(q(t)))})))}));var t,n})),le=n(249),ue=n(515),be=n(520),fe=n(504),je=n(245),de=n.n(je),me=n(246),he=n.n(me),Oe=n(247),pe=n.n(Oe),xe=n(244),ge=n.n(xe),we=n(169),ve=n(170),ye=Object(T.b)({name:"pedigree",initialState:{displays:[]},reducers:{set:function(e,t){e.displays=t.payload},push:function(e,t){var n=t.payload;e.displays.push(n)},pop:function(e,t){e.displays.length<=0?console.warn("pedigree list is empty"):e.displays.pop()},clear:function(e,t){e.displays=[]}}}),Ne=ye.actions,ke=ye.reducer,Me=n(502),Ce=n(503),Ee=n(497),Se=n(498),Te=n(499),Fe=n(500),De=n(501),Ie=Object(Q.a)((function(e){return Object(ue.a)({table:{"& .cell":{backgroundColor:"gray","&.empty":{backgroundColor:"lightgray"},"&.Ec":{backgroundColor:"#ffffff"},"&.Ph":{backgroundColor:"#cfe8ff"},"&.Ns":{backgroundColor:"#00bb00"},"&.Ro":{backgroundColor:"#ffb4c8"},"&.Ne":{backgroundColor:"#fdf488"},"&.Na":{backgroundColor:"##52d8fd"},"&.Fa":{backgroundColor:"#ffc943"},"&.To":{backgroundColor:"#ff9d4b"},"&.Te":{color:e.palette.primary.contrastText,backgroundColor:"#9e57ff"},"&.Sw":{backgroundColor:"#ffe0e1"},"&.Ha":{backgroundColor:"#90ee71"},"&.Hi":{color:e.palette.primary.contrastText,backgroundColor:"#2c6aff"},"&.St":{backgroundColor:"#9e93ff"},"&.Ma":{backgroundColor:"#c5b2fe"},"&.He":{backgroundColor:"#b9f8ff"},"&.mother":{color:e.palette.primary.contrastText,backgroundColor:"#dd7165"}}}})})),ze=function(e){return Object(a.jsx)(o.Fragment,{children:e.map((function(e,t){return Object(a.jsxs)(Se.a,{children:[e.filter((function(e,t){return t>0})).map((function(e,n){return function(e,t,n){var r=Math.pow(2,5-t-2),c=["cell",n.show?n.line:"empty",0===t&&e===Math.pow(2,3)?["mother"]:[]].flatMap((function(e){return e})).join(" ");return Object(a.jsx)(o.Fragment,{children:e%r===0?Object(a.jsx)(Ee.a,{rowSpan:r,className:c,children:n.show?Object(a.jsx)(d.a,{children:n.name}):null}):null},"col-".concat(t))}(t,n,e)})),t%2===0?(n=e[e.length-1].line,"Uk"!==n?Object(a.jsx)(Ee.a,{className:["cell",n].join(" "),rowSpan:2,children:Object(a.jsxs)(d.a,{children:[re[n].label,"\u7cfb"]})},"col-line"):Object(a.jsx)(Ee.a,{className:["cell","empty"].join(" "),rowSpan:2},"col-line")):null]},"row-".concat(t));var n}))})},Ae=function(e){var t=e.def,n=Ie(),r=Object(p.c)((function(e){return e.horseDefs.list})),c=function(e){return function(t){for(var n=new Array,a=0;a<Math.pow(2,4);++a){for(var r=new Array,c=0;c<5;++c)r.push({name:"empty",generation:c,show:!1,line:"Uk"});n.push(r)}return function t(a,r,c){n[a][r]={name:c.name,generation:r,show:!!c.show,line:c.line},r+1<5&&(c.fatherName&&(e.has(c.fatherName)?t(a,r+1,e.get(c.fatherName)):t(a,r+1,{name:c.fatherName,sex:"male",line:"Uk",listed:!1,show:!0,owned:!1,memo:["\u672a\u5b9a\u7fa9"]})),c.motherName&&(e.has(c.motherName)?t(a+Math.pow(2,5-r-2),r+1,e.get(c.motherName)):t(a+Math.pow(2,5-r-2),r+1,{name:c.motherName,sex:"female",line:"Uk",listed:!1,show:!0,owned:!1,memo:["\u672a\u5b9a\u7fa9"]})))}(0,0,t),n}}(Object(o.useMemo)((function(){return r.reduce((function(e,t){return e.set(t.name,t)}),new Map)}),[r]))(t);return Object(a.jsx)(Te.a,{component:m.a,children:Object(a.jsx)(Fe.a,{className:n.table,size:"small",children:Object(a.jsx)(De.a,{children:ze(c)})})})},Ue=function(){var e=Object(p.b)(),t=Object(p.c)((function(e){return e.pedigree})).displays,n=Object(o.useMemo)((function(){return t.length>0}),[t]),r=Object(p.c)((function(e){return e.horseDefs.list})),c=Object(o.useMemo)((function(){return t.length>0?r.find((function(e){return e.name===t[t.length-1]})):void 0}),[r,t]),s=Object(o.useMemo)((function(){return function(){e(Ne.clear())}}),[e]);return c?Object(a.jsxs)(Me.a,{open:n,onClose:s,children:[Object(a.jsxs)(Ce.a,{children:[Object(a.jsxs)(d.a,{variant:"h5",children:["\u8840\u7d71\u8868: ",c.name]}),"Uk"!==c.line?Object(a.jsxs)(d.a,{variant:"h6",style:{paddingLeft:"1em"},children:[re[c.line].label,"\u7cfb"]}):null]}),Object(a.jsx)(Ae,{def:c})]}):null},He=Object(Q.a)((function(e){return Object(ue.a)({root:{"& .name":{marginLeft:e.spacing(.5)},"& .father":{marginLeft:e.spacing(1)},"& .male":{color:"#2196f3"},"& .female":{color:"#f44336"}}})})),Le=function(e){var t=e.name,n=Object(p.b)(),r=Object(o.useMemo)((function(){return function(){n(Ne.push(t))}}),[n,t]);return Object(a.jsx)(k.a,{"aria-label":"horse info",size:"small",onClick:r,children:Object(a.jsx)(ge.a,{fontSize:"inherit"})})},Re=function(e){var t=new Map,n=function(e){return t.has(e)?t.get(e):function(){var n={id:e,label:Object(a.jsx)(o.Fragment,{}),children:[],owned:!1};return t.set(e,n),n}()};return e.forEach((function(e){var t=n(e.name);(function(e,t){var n,r;e.owned=e.owned||t.owned,e.className=[t.sex].join(" "),e.label=Object(a.jsxs)(o.Fragment,{children:[function(){switch(t.sex){case"male":return Object(a.jsx)(we.a,{icon:ve.a});case"female":return Object(a.jsx)(we.a,{icon:ve.b});case"unknown":return null;default:t.sex}}(),Object(a.jsxs)("span",{className:"name",children:[t.name,Object(a.jsx)(Le,{name:t.name})]}),t.fatherName?Object(a.jsxs)("span",{className:"father male",children:["(",t.fatherName,")"]}):null]}),e.fatherName=null!==(n=t.fatherName)&&void 0!==n?n:e.fatherName,e.motherName=null!==(r=t.motherName)&&void 0!==r?r:e.fatherName}(t,e),e.motherName)&&n(e.motherName).children.push(t)})),{nodes:Array.from(t.values()).filter((function(e){var n;return e.owned&&(!e.motherName||!t.has(e.motherName)||t.has(e.motherName)&&!(null===(n=t.get(e.motherName))||void 0===n?void 0:n.owned))})),ids:Array.from(t.keys())}},Ge=function e(t){return function(n){return Object(a.jsx)(be.a,{className:n.className,nodeId:n.id,label:n.label,onIconClick:t(n),children:n.children.map(e(t))},n.id)}},Pe=function(){var e=He(),t=Object(p.b)(),n=Object(o.useState)([]),r=Object(u.a)(n,2),c=r[0],s=r[1],i=Object(p.c)((function(e){return e.horseDefs.list})),l=Object(o.useMemo)((function(){return i.length>0?function(e){return function(t){return function(n){try{return e($(t)),n()}finally{e(q(t))}}}}(t)("mare-line/init")((function(){return Re(i)})):{nodes:[],ids:[]}}),[t,i]),b=l.nodes,f=l.ids;Object(o.useEffect)((function(){s(f)}),[s,f]);var j=Object(o.useMemo)((function(){return function(e){return function(t){s(c.includes(e.id)?c.filter((function(t){return t!==e.id})):[].concat(Object(le.a)(c),[e.id]))}}}),[c,s]);return Object(a.jsx)(o.Fragment,{children:Object(a.jsx)(fe.a,{className:e.root,expanded:c,defaultCollapseIcon:Object(a.jsx)(de.a,{}),defaultExpandIcon:Object(a.jsx)(he.a,{}),defaultEndIcon:Object(a.jsx)(pe.a,{}),children:b.map(Ge(j))})})},Be=function(){return Object(a.jsxs)(o.Fragment,{children:[Object(a.jsx)(d.a,{variant:"h4",children:"\u725d\u7cfb\u56f3"}),Object(a.jsx)(m.a,{children:Object(a.jsx)(Pe,{})})]})},Je=(n(468),function(e){return Object(a.jsx)(d.a,{children:Object(a.jsx)(f.b,{to:e.path,children:e.label})})}),Ve=function(e){var t=e.toggleMenu;return Object(a.jsx)(v.a,{onClick:t,onKeyDown:t,children:[{label:"\u725d\u7cfb\u56f3",path:"/mare-line"},{label:"\u5bb6\u7cfb\u56f3(\u65e7)",path:"/family"}].map(Je)})},We=function(){var e=Object(o.useState)(!1),t=Object(u.a)(e,2),n=t[0],r=t[1],c=Object(o.useMemo)((function(){return function(){r(!n)}}),[n,r]);return Object(a.jsxs)(s.a.Fragment,{children:[Object(a.jsx)(y.a,{position:"static",children:Object(a.jsxs)(N.a,{children:[Object(a.jsx)(k.a,{edge:"start",color:"inherit","aria-label":"menu",onClick:c,children:Object(a.jsx)(S.a,{})}),Object(a.jsx)(d.a,{variant:"h6",children:"MOTTV Derby"})]})}),Object(a.jsx)(M.a,{open:n,onClose:c,children:Object(a.jsx)(Ve,{toggleMenu:c})})]})},_e=function(){var e=Object(C.a)();return Object(a.jsx)(j.a,{display:"flex",justifyContent:"flex-end",margin:e.spacing(.2),children:Object(a.jsx)(E.a,{href:"https://www.youtube.com/user/MOTTYGAMES/",target:"__blank",children:"MOTTV"})})},Ke=function(){var e=Object(C.a)(),t=Object(p.b)();return Object(o.useEffect)((function(){t(D.init())}),[t]),Object(a.jsx)(f.a,{basename:"/motty-derby",children:Object(a.jsxs)(s.a.Fragment,{children:[Object(a.jsx)(We,{}),Object(a.jsx)(j.a,{margin:e.spacing(.5),children:Object(a.jsxs)(b.d,{children:[Object(a.jsx)(b.b,{path:"/family",children:Object(a.jsx)(g,{})}),Object(a.jsx)(b.b,{path:"/mare-line",children:Object(a.jsx)(Be,{})}),Object(a.jsx)(b.b,{exact:!0,path:"/",children:Object(a.jsx)(b.a,{to:"/mare-line"})}),Object(a.jsx)(b.b,{children:Object(a.jsx)(w,{})})]})}),Object(a.jsx)(_e,{}),Object(a.jsx)(Ue,{}),Object(a.jsx)(te,{})]})})},Ye=n(510),$e=Object(Ye.a)({dependencies:{}}),qe=Object(T.a)({reducer:{horseDefs:I,indicator:V,pedigree:ke},middleware:function(e){return e({thunk:!1}).concat([$e])}});$e.run(Object(H.a)(ie));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var Qe=Object(r.a)({});l.a.render(Object(a.jsx)(s.a.StrictMode,{children:Object(a.jsx)(c.a,{theme:Qe,children:Object(a.jsx)(p.a,{store:qe,children:Object(a.jsx)(Ke,{})})})}),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[470,1,2]]]);
//# sourceMappingURL=main.8bb92069.chunk.js.map