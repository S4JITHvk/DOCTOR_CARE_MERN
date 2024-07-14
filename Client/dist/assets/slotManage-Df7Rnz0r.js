import{q as ht,r as t,e as ce,c as wt,j as W}from"./index-DDg8tmzP.js";import{D as bt}from"./react-datepicker-CpKRV2Wu.js";import{b as _t,e as gt,g as lt,h as St,j as Et,k as xt}from"./floating-ui.react-SXetMiss.js";import{s as At,b as kt}from"./doctorService-BeaFpf1z.js";import"./format-D5IGutSq.js";var pt={exports:{}};/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/(function(o){(function(){var r={}.hasOwnProperty;function f(){for(var s="",m=0;m<arguments.length;m++){var d=arguments[m];d&&(s=p(s,u(d)))}return s}function u(s){if(typeof s=="string"||typeof s=="number")return s;if(typeof s!="object")return"";if(Array.isArray(s))return f.apply(null,s);if(s.toString!==Object.prototype.toString&&!s.toString.toString().includes("[native code]"))return s.toString();var m="";for(var d in s)r.call(s,d)&&s[d]&&(m=p(m,d));return m}function p(s,m){return m?s?s+" "+m:s+m:s}o.exports?(f.default=f,o.exports=f):window.classNames=f})()})(pt);var Tt=pt.exports;const Ye=ht(Tt);var nt={};const Ot="react-tooltip-core-styles",Rt="react-tooltip-base-styles",st={core:!1,base:!1};function at({css:o,id:r=Rt,type:f="base",ref:u}){var p,s;if(!o||typeof document>"u"||st[f]||f==="core"&&typeof process<"u"&&(!((p=process==null?void 0:nt)===null||p===void 0)&&p.REACT_TOOLTIP_DISABLE_CORE_STYLES)||f!=="base"&&typeof process<"u"&&(!((s=process==null?void 0:nt)===null||s===void 0)&&s.REACT_TOOLTIP_DISABLE_BASE_STYLES))return;f==="core"&&(r=Ot),u||(u={});const{insertAt:m}=u;if(document.getElementById(r))return void console.warn(`[react-tooltip] Element with id '${r}' already exists. Call \`removeStyle()\` first`);const d=document.head||document.getElementsByTagName("head")[0],y=document.createElement("style");y.id=r,y.type="text/css",m==="top"&&d.firstChild?d.insertBefore(y,d.firstChild):d.appendChild(y),y.styleSheet?y.styleSheet.cssText=o:y.appendChild(document.createTextNode(o)),st[f]=!0}const ct=async({elementReference:o=null,tooltipReference:r=null,tooltipArrowReference:f=null,place:u="top",offset:p=10,strategy:s="absolute",middlewares:m=[St(Number(p)),Et({fallbackAxisSideDirection:"start"}),xt({padding:5})],border:d})=>{if(!o)return{tooltipStyles:{},tooltipArrowStyles:{},place:u};if(r===null)return{tooltipStyles:{},tooltipArrowStyles:{},place:u};const y=m;return f?(y.push(gt({element:f,padding:5})),lt(o,r,{placement:u,strategy:s,middleware:y}).then(({x:R,y:$,placement:C,middlewareData:Z})=>{var H,L;const c={left:`${R}px`,top:`${$}px`,border:d},{x:g,y:x}=(H=Z.arrow)!==null&&H!==void 0?H:{x:0,y:0},q=(L={top:"bottom",right:"left",bottom:"top",left:"right"}[C.split("-")[0]])!==null&&L!==void 0?L:"bottom",N=d&&{borderBottom:d,borderRight:d};let G=0;if(d){const Y=`${d}`.match(/(\d+)px/);G=Y!=null&&Y[1]?Number(Y[1]):1}return{tooltipStyles:c,tooltipArrowStyles:{left:g!=null?`${g}px`:"",top:x!=null?`${x}px`:"",right:"",bottom:"",...N,[q]:`-${4+G}px`},place:C}})):lt(o,r,{placement:"bottom",strategy:s,middleware:y}).then(({x:R,y:$,placement:C})=>({tooltipStyles:{left:`${R}px`,top:`${$}px`},tooltipArrowStyles:{},place:C}))},it=(o,r)=>!("CSS"in window&&"supports"in window.CSS)||window.CSS.supports(o,r),ut=(o,r,f)=>{let u=null;const p=function(...s){const m=()=>{u=null};!u&&(o.apply(this,s),u=setTimeout(m,r))};return p.cancel=()=>{u&&(clearTimeout(u),u=null)},p},dt=o=>o!==null&&!Array.isArray(o)&&typeof o=="object",Je=(o,r)=>{if(o===r)return!0;if(Array.isArray(o)&&Array.isArray(r))return o.length===r.length&&o.every((p,s)=>Je(p,r[s]));if(Array.isArray(o)!==Array.isArray(r))return!1;if(!dt(o)||!dt(r))return o===r;const f=Object.keys(o),u=Object.keys(r);return f.length===u.length&&f.every(p=>Je(o[p],r[p]))},Ct=o=>{if(!(o instanceof HTMLElement||o instanceof SVGElement))return!1;const r=getComputedStyle(o);return["overflow","overflow-x","overflow-y"].some(f=>{const u=r.getPropertyValue(f);return u==="auto"||u==="scroll"})},ft=o=>{if(!o)return null;let r=o.parentElement;for(;r;){if(Ct(r))return r;r=r.parentElement}return document.scrollingElement||document.documentElement},Lt=typeof window<"u"?t.useLayoutEffect:t.useEffect,Nt="DEFAULT_TOOLTIP_ID",jt={anchorRefs:new Set,activeAnchor:{current:null},attach:()=>{},detach:()=>{},setActiveAnchor:()=>{}},Dt=t.createContext({getTooltipData:()=>jt});function mt(o=Nt){return t.useContext(Dt).getTooltipData(o)}var be={tooltip:"core-styles-module_tooltip__3vRRp",fixed:"core-styles-module_fixed__pcSol",arrow:"core-styles-module_arrow__cvMwQ",noArrow:"core-styles-module_noArrow__xock6",clickable:"core-styles-module_clickable__ZuTTB",show:"core-styles-module_show__Nt9eE",closing:"core-styles-module_closing__sGnxF"},Qe={tooltip:"styles-module_tooltip__mnnfp",arrow:"styles-module_arrow__K0L3T",dark:"styles-module_dark__xNqje",light:"styles-module_light__Z6W-X",success:"styles-module_success__A2AKt",warning:"styles-module_warning__SCK0X",error:"styles-module_error__JvumD",info:"styles-module_info__BWdHW"};const $t=({forwardRef:o,id:r,className:f,classNameArrow:u,variant:p="dark",anchorId:s,anchorSelect:m,place:d="top",offset:y=10,events:R=["hover"],openOnClick:$=!1,positionStrategy:C="absolute",middlewares:Z,wrapper:H,delayShow:L=0,delayHide:c=0,float:g=!1,hidden:x=!1,noArrow:q=!1,clickable:N=!1,closeOnEsc:G=!1,closeOnScroll:Y=!1,closeOnResize:Fe=!1,openEvents:I,closeEvents:ie,globalCloseEvents:_e,imperativeModeOnly:Pe,style:$e,position:Ie,afterShow:Be,afterHide:U,content:ge,contentWrapperRef:J,isOpen:ee,defaultIsOpen:te=!1,setIsOpen:oe,activeAnchor:b,setActiveAnchor:ue,border:ze,opacity:Me,arrowColor:We,role:Ge="tooltip"})=>{var Se;const T=t.useRef(null),de=t.useRef(null),A=t.useRef(null),B=t.useRef(null),re=t.useRef(null),[X,Ve]=t.useState({tooltipStyles:{},tooltipArrowStyles:{},place:d}),[j,He]=t.useState(!1),[le,ne]=t.useState(!1),[w,Ee]=t.useState(null),xe=t.useRef(!1),Ae=t.useRef(null),{anchorRefs:ke,setActiveAnchor:Ke}=mt(r),fe=t.useRef(!1),[Q,Te]=t.useState([]),se=t.useRef(!1),pe=$||R.includes("click"),Oe=pe||(I==null?void 0:I.click)||(I==null?void 0:I.dblclick)||(I==null?void 0:I.mousedown),me=I?{...I}:{mouseenter:!0,focus:!0,click:!1,dblclick:!1,mousedown:!1};!I&&pe&&Object.assign(me,{mouseenter:!1,focus:!1,click:!0});const Re=ie?{...ie}:{mouseleave:!0,blur:!0,click:!1,dblclick:!1,mouseup:!1};!ie&&pe&&Object.assign(Re,{mouseleave:!1,blur:!1});const K=_e?{..._e}:{escape:G||!1,scroll:Y||!1,resize:Fe||!1,clickOutsideAnchor:Oe||!1};Pe&&(Object.assign(me,{mouseenter:!1,focus:!1,click:!1,dblclick:!1,mousedown:!1}),Object.assign(Re,{mouseleave:!1,blur:!1,click:!1,dblclick:!1,mouseup:!1}),Object.assign(K,{escape:!1,scroll:!1,resize:!1,clickOutsideAnchor:!1})),Lt(()=>(se.current=!0,()=>{se.current=!1}),[]);const _=e=>{se.current&&(e&&ne(!0),setTimeout(()=>{se.current&&(oe==null||oe(e),ee===void 0&&He(e))},10))};t.useEffect(()=>{if(ee===void 0)return()=>null;ee&&ne(!0);const e=setTimeout(()=>{He(ee)},10);return()=>{clearTimeout(e)}},[ee]),t.useEffect(()=>{if(j!==xe.current)if(re.current&&clearTimeout(re.current),xe.current=j,j)Be==null||Be();else{const e=(n=>{const a=n.match(/^([\d.]+)(ms|s)$/);if(!a)return 0;const[,E,k]=a;return Number(E)*(k==="ms"?1:1e3)})(getComputedStyle(document.body).getPropertyValue("--rt-transition-show-delay"));re.current=setTimeout(()=>{ne(!1),Ee(null),U==null||U()},e+25)}},[j]);const qe=e=>{Ve(n=>Je(n,e)?n:e)},Ce=(e=L)=>{A.current&&clearTimeout(A.current),le?_(!0):A.current=setTimeout(()=>{_(!0)},e)},ve=(e=c)=>{B.current&&clearTimeout(B.current),B.current=setTimeout(()=>{fe.current||_(!1)},e)},Le=e=>{var n;if(!e)return;const a=(n=e.currentTarget)!==null&&n!==void 0?n:e.target;if(!(a!=null&&a.isConnected))return ue(null),void Ke({current:null});L?Ce():_(!0),ue(a),Ke({current:a}),B.current&&clearTimeout(B.current)},ye=()=>{N?ve(c||100):c?ve():_(!1),A.current&&clearTimeout(A.current)},he=({x:e,y:n})=>{var a;const E={getBoundingClientRect:()=>({x:e,y:n,width:0,height:0,top:n,left:e,right:e,bottom:n})};ct({place:(a=w==null?void 0:w.place)!==null&&a!==void 0?a:d,offset:y,elementReference:E,tooltipReference:T.current,tooltipArrowReference:de.current,strategy:C,middlewares:Z,border:ze}).then(k=>{qe(k)})},we=e=>{if(!e)return;const n=e,a={x:n.clientX,y:n.clientY};he(a),Ae.current=a},Ne=e=>{var n;if(!j)return;const a=e.target;a.isConnected&&(!((n=T.current)===null||n===void 0)&&n.contains(a)||[document.querySelector(`[id='${s}']`),...Q].some(E=>E==null?void 0:E.contains(a))||(_(!1),A.current&&clearTimeout(A.current)))},Ue=ut(Le,50),S=ut(ye,50),z=e=>{S.cancel(),Ue(e)},l=()=>{Ue.cancel(),S()},i=t.useCallback(()=>{var e,n;const a=(e=w==null?void 0:w.position)!==null&&e!==void 0?e:Ie;a?he(a):g?Ae.current&&he(Ae.current):b!=null&&b.isConnected&&ct({place:(n=w==null?void 0:w.place)!==null&&n!==void 0?n:d,offset:y,elementReference:b,tooltipReference:T.current,tooltipArrowReference:de.current,strategy:C,middlewares:Z,border:ze}).then(E=>{se.current&&qe(E)})},[j,b,ge,$e,d,w==null?void 0:w.place,y,C,Ie,w==null?void 0:w.position,g]);t.useEffect(()=>{var e,n;const a=new Set(ke);Q.forEach(v=>{a.add({current:v})});const E=document.querySelector(`[id='${s}']`);E&&a.add({current:E});const k=()=>{_(!1)},F=ft(b),P=ft(T.current);K.scroll&&(window.addEventListener("scroll",k),F==null||F.addEventListener("scroll",k),P==null||P.addEventListener("scroll",k));let O=null;K.resize?window.addEventListener("resize",k):b&&T.current&&(O=_t(b,T.current,i,{ancestorResize:!0,elementResize:!0,layoutShift:!0}));const M=v=>{v.key==="Escape"&&_(!1)};K.escape&&window.addEventListener("keydown",M),K.clickOutsideAnchor&&window.addEventListener("click",Ne);const h=[],je=v=>{j&&(v==null?void 0:v.target)===b||Le(v)},vt=v=>{j&&(v==null?void 0:v.target)===b&&ye()},et=["mouseenter","mouseleave","focus","blur"],tt=["click","dblclick","mousedown","mouseup"];Object.entries(me).forEach(([v,V])=>{V&&(et.includes(v)?h.push({event:v,listener:z}):tt.includes(v)&&h.push({event:v,listener:je}))}),Object.entries(Re).forEach(([v,V])=>{V&&(et.includes(v)?h.push({event:v,listener:l}):tt.includes(v)&&h.push({event:v,listener:vt}))}),g&&h.push({event:"pointermove",listener:we});const ot=()=>{fe.current=!0},rt=()=>{fe.current=!1,ye()};return N&&!Oe&&((e=T.current)===null||e===void 0||e.addEventListener("mouseenter",ot),(n=T.current)===null||n===void 0||n.addEventListener("mouseleave",rt)),h.forEach(({event:v,listener:V})=>{a.forEach(Ze=>{var De;(De=Ze.current)===null||De===void 0||De.addEventListener(v,V)})}),()=>{var v,V;K.scroll&&(window.removeEventListener("scroll",k),F==null||F.removeEventListener("scroll",k),P==null||P.removeEventListener("scroll",k)),K.resize?window.removeEventListener("resize",k):O==null||O(),K.clickOutsideAnchor&&window.removeEventListener("click",Ne),K.escape&&window.removeEventListener("keydown",M),N&&!Oe&&((v=T.current)===null||v===void 0||v.removeEventListener("mouseenter",ot),(V=T.current)===null||V===void 0||V.removeEventListener("mouseleave",rt)),h.forEach(({event:Ze,listener:De})=>{a.forEach(yt=>{var Xe;(Xe=yt.current)===null||Xe===void 0||Xe.removeEventListener(Ze,De)})})}},[b,i,le,ke,Q,I,ie,_e,pe,L,c]),t.useEffect(()=>{var e,n;let a=(n=(e=w==null?void 0:w.anchorSelect)!==null&&e!==void 0?e:m)!==null&&n!==void 0?n:"";!a&&r&&(a=`[data-tooltip-id='${r.replace(/'/g,"\\'")}']`);const E=new MutationObserver(k=>{const F=[],P=[];k.forEach(O=>{if(O.type==="attributes"&&O.attributeName==="data-tooltip-id"&&(O.target.getAttribute("data-tooltip-id")===r?F.push(O.target):O.oldValue===r&&P.push(O.target)),O.type==="childList"){if(b){const M=[...O.removedNodes].filter(h=>h.nodeType===1);if(a)try{P.push(...M.filter(h=>h.matches(a))),P.push(...M.flatMap(h=>[...h.querySelectorAll(a)]))}catch{}M.some(h=>{var je;return!!(!((je=h==null?void 0:h.contains)===null||je===void 0)&&je.call(h,b))&&(ne(!1),_(!1),ue(null),A.current&&clearTimeout(A.current),B.current&&clearTimeout(B.current),!0)})}if(a)try{const M=[...O.addedNodes].filter(h=>h.nodeType===1);F.push(...M.filter(h=>h.matches(a))),F.push(...M.flatMap(h=>[...h.querySelectorAll(a)]))}catch{}}}),(F.length||P.length)&&Te(O=>[...O.filter(M=>!P.includes(M)),...F])});return E.observe(document.body,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["data-tooltip-id"],attributeOldValue:!0}),()=>{E.disconnect()}},[r,m,w==null?void 0:w.anchorSelect,b]),t.useEffect(()=>{i()},[i]),t.useEffect(()=>{if(!(J!=null&&J.current))return()=>null;const e=new ResizeObserver(()=>{setTimeout(()=>i())});return e.observe(J.current),()=>{e.disconnect()}},[ge,J==null?void 0:J.current]),t.useEffect(()=>{var e;const n=document.querySelector(`[id='${s}']`),a=[...Q,n];b&&a.includes(b)||ue((e=Q[0])!==null&&e!==void 0?e:n)},[s,Q,b]),t.useEffect(()=>(te&&_(!0),()=>{A.current&&clearTimeout(A.current),B.current&&clearTimeout(B.current)}),[]),t.useEffect(()=>{var e;let n=(e=w==null?void 0:w.anchorSelect)!==null&&e!==void 0?e:m;if(!n&&r&&(n=`[data-tooltip-id='${r.replace(/'/g,"\\'")}']`),n)try{const a=Array.from(document.querySelectorAll(n));Te(a)}catch{Te([])}},[r,m,w==null?void 0:w.anchorSelect]),t.useEffect(()=>{A.current&&(clearTimeout(A.current),Ce(L))},[L]);const D=(Se=w==null?void 0:w.content)!==null&&Se!==void 0?Se:ge,ae=j&&Object.keys(X.tooltipStyles).length>0;return t.useImperativeHandle(o,()=>({open:e=>{if(e!=null&&e.anchorSelect)try{document.querySelector(e.anchorSelect)}catch{return void console.warn(`[react-tooltip] "${e.anchorSelect}" is not a valid CSS selector`)}Ee(e??null),e!=null&&e.delay?Ce(e.delay):_(!0)},close:e=>{e!=null&&e.delay?ve(e.delay):_(!1)},activeAnchor:b,place:X.place,isOpen:!!(le&&!x&&D&&ae)})),le&&!x&&D?ce.createElement(H,{id:r,role:Ge,className:Ye("react-tooltip",be.tooltip,Qe.tooltip,Qe[p],f,`react-tooltip__place-${X.place}`,be[ae?"show":"closing"],ae?"react-tooltip__show":"react-tooltip__closing",C==="fixed"&&be.fixed,N&&be.clickable),onTransitionEnd:e=>{re.current&&clearTimeout(re.current),j||e.propertyName!=="opacity"||(ne(!1),Ee(null),U==null||U())},style:{...$e,...X.tooltipStyles,opacity:Me!==void 0&&ae?Me:void 0},ref:T},D,ce.createElement(H,{className:Ye("react-tooltip-arrow",be.arrow,Qe.arrow,u,q&&be.noArrow),style:{...X.tooltipArrowStyles,background:We?`linear-gradient(to right bottom, transparent 50%, ${We} 50%)`:void 0},ref:de})):null},It=({content:o})=>ce.createElement("span",{dangerouslySetInnerHTML:{__html:o}}),Bt=ce.forwardRef(({id:o,anchorId:r,anchorSelect:f,content:u,html:p,render:s,className:m,classNameArrow:d,variant:y="dark",place:R="top",offset:$=10,wrapper:C="div",children:Z=null,events:H=["hover"],openOnClick:L=!1,positionStrategy:c="absolute",middlewares:g,delayShow:x=0,delayHide:q=0,float:N=!1,hidden:G=!1,noArrow:Y=!1,clickable:Fe=!1,closeOnEsc:I=!1,closeOnScroll:ie=!1,closeOnResize:_e=!1,openEvents:Pe,closeEvents:$e,globalCloseEvents:Ie,imperativeModeOnly:Be=!1,style:U,position:ge,isOpen:J,defaultIsOpen:ee=!1,disableStyleInjection:te=!1,border:oe,opacity:b,arrowColor:ue,setIsOpen:ze,afterShow:Me,afterHide:We,role:Ge="tooltip"},Se)=>{const[T,de]=t.useState(u),[A,B]=t.useState(p),[re,X]=t.useState(R),[Ve,j]=t.useState(y),[He,le]=t.useState($),[ne,w]=t.useState(x),[Ee,xe]=t.useState(q),[Ae,ke]=t.useState(N),[Ke,fe]=t.useState(G),[Q,Te]=t.useState(C),[se,pe]=t.useState(H),[Oe,me]=t.useState(c),[Re,K]=t.useState(null),[_,qe]=t.useState(null),Ce=t.useRef(te),{anchorRefs:ve,activeAnchor:Le}=mt(o),ye=S=>S==null?void 0:S.getAttributeNames().reduce((z,l)=>{var i;return l.startsWith("data-tooltip-")&&(z[l.replace(/^data-tooltip-/,"")]=(i=S==null?void 0:S.getAttribute(l))!==null&&i!==void 0?i:null),z},{}),he=S=>{const z={place:l=>{var i;X((i=l)!==null&&i!==void 0?i:R)},content:l=>{de(l??u)},html:l=>{B(l??p)},variant:l=>{var i;j((i=l)!==null&&i!==void 0?i:y)},offset:l=>{le(l===null?$:Number(l))},wrapper:l=>{var i;Te((i=l)!==null&&i!==void 0?i:C)},events:l=>{const i=l==null?void 0:l.split(" ");pe(i??H)},"position-strategy":l=>{var i;me((i=l)!==null&&i!==void 0?i:c)},"delay-show":l=>{w(l===null?x:Number(l))},"delay-hide":l=>{xe(l===null?q:Number(l))},float:l=>{ke(l===null?N:l==="true")},hidden:l=>{fe(l===null?G:l==="true")},"class-name":l=>{K(l)}};Object.values(z).forEach(l=>l(null)),Object.entries(S).forEach(([l,i])=>{var D;(D=z[l])===null||D===void 0||D.call(z,i)})};t.useEffect(()=>{de(u)},[u]),t.useEffect(()=>{B(p)},[p]),t.useEffect(()=>{X(R)},[R]),t.useEffect(()=>{j(y)},[y]),t.useEffect(()=>{le($)},[$]),t.useEffect(()=>{w(x)},[x]),t.useEffect(()=>{xe(q)},[q]),t.useEffect(()=>{ke(N)},[N]),t.useEffect(()=>{fe(G)},[G]),t.useEffect(()=>{me(c)},[c]),t.useEffect(()=>{Ce.current!==te&&console.warn("[react-tooltip] Do not change `disableStyleInjection` dynamically.")},[te]),t.useEffect(()=>{typeof window<"u"&&window.dispatchEvent(new CustomEvent("react-tooltip-inject-styles",{detail:{disableCore:te==="core",disableBase:te}}))},[]),t.useEffect(()=>{var S;const z=new Set(ve);let l=f;if(!l&&o&&(l=`[data-tooltip-id='${o.replace(/'/g,"\\'")}']`),l)try{document.querySelectorAll(l).forEach(n=>{z.add({current:n})})}catch{console.warn(`[react-tooltip] "${l}" is not a valid CSS selector`)}const i=document.querySelector(`[id='${r}']`);if(i&&z.add({current:i}),!z.size)return()=>null;const D=(S=_??i)!==null&&S!==void 0?S:Le.current,ae=new MutationObserver(n=>{n.forEach(a=>{var E;if(!D||a.type!=="attributes"||!(!((E=a.attributeName)===null||E===void 0)&&E.startsWith("data-tooltip-")))return;const k=ye(D);he(k)})}),e={attributes:!0,childList:!1,subtree:!1};if(D){const n=ye(D);he(n),ae.observe(D,e)}return()=>{ae.disconnect()}},[ve,Le,_,r,f]),t.useEffect(()=>{U!=null&&U.border&&console.warn("[react-tooltip] Do not set `style.border`. Use `border` prop instead."),oe&&!it("border",`${oe}`)&&console.warn(`[react-tooltip] "${oe}" is not a valid \`border\`.`),U!=null&&U.opacity&&console.warn("[react-tooltip] Do not set `style.opacity`. Use `opacity` prop instead."),b&&!it("opacity",`${b}`)&&console.warn(`[react-tooltip] "${b}" is not a valid \`opacity\`.`)},[]);let we=Z;const Ne=t.useRef(null);if(s){const S=s({content:(_==null?void 0:_.getAttribute("data-tooltip-content"))||T||null,activeAnchor:_});we=S?ce.createElement("div",{ref:Ne,className:"react-tooltip-content-wrapper"},S):null}else T&&(we=T);A&&(we=ce.createElement(It,{content:A}));const Ue={forwardRef:Se,id:o,anchorId:r,anchorSelect:f,className:Ye(m,Re),classNameArrow:d,content:we,contentWrapperRef:Ne,place:re,variant:Ve,offset:He,wrapper:Q,events:se,openOnClick:L,positionStrategy:Oe,middlewares:g,delayShow:ne,delayHide:Ee,float:Ae,hidden:Ke,noArrow:Y,clickable:Fe,closeOnEsc:I,closeOnScroll:ie,closeOnResize:_e,openEvents:Pe,closeEvents:$e,globalCloseEvents:Ie,imperativeModeOnly:Be,style:U,position:ge,isOpen:J,defaultIsOpen:ee,border:oe,opacity:b,arrowColor:ue,setIsOpen:ze,afterShow:Me,afterHide:We,activeAnchor:_,setActiveAnchor:S=>qe(S),role:Ge};return ce.createElement($t,{...Ue})});typeof window<"u"&&window.addEventListener("react-tooltip-inject-styles",o=>{o.detail.disableCore||at({css:":root{--rt-color-white:#fff;--rt-color-dark:#222;--rt-color-success:#8dc572;--rt-color-error:#be6464;--rt-color-warning:#f0ad4e;--rt-color-info:#337ab7;--rt-opacity:0.9;--rt-transition-show-delay:0.15s;--rt-transition-closing-delay:0.15s}.core-styles-module_tooltip__3vRRp{position:absolute;top:0;left:0;pointer-events:none;opacity:0;will-change:opacity}.core-styles-module_fixed__pcSol{position:fixed}.core-styles-module_arrow__cvMwQ{position:absolute;background:inherit}.core-styles-module_noArrow__xock6{display:none}.core-styles-module_clickable__ZuTTB{pointer-events:auto}.core-styles-module_show__Nt9eE{opacity:var(--rt-opacity);transition:opacity var(--rt-transition-show-delay)ease-out}.core-styles-module_closing__sGnxF{opacity:0;transition:opacity var(--rt-transition-closing-delay)ease-in}",type:"core"}),o.detail.disableBase||at({css:`
.styles-module_tooltip__mnnfp{padding:8px 16px;border-radius:3px;font-size:90%;width:max-content}.styles-module_arrow__K0L3T{width:8px;height:8px}[class*='react-tooltip__place-top']>.styles-module_arrow__K0L3T{transform:rotate(45deg)}[class*='react-tooltip__place-right']>.styles-module_arrow__K0L3T{transform:rotate(135deg)}[class*='react-tooltip__place-bottom']>.styles-module_arrow__K0L3T{transform:rotate(225deg)}[class*='react-tooltip__place-left']>.styles-module_arrow__K0L3T{transform:rotate(315deg)}.styles-module_dark__xNqje{background:var(--rt-color-dark);color:var(--rt-color-white)}.styles-module_light__Z6W-X{background-color:var(--rt-color-white);color:var(--rt-color-dark)}.styles-module_success__A2AKt{background-color:var(--rt-color-success);color:var(--rt-color-white)}.styles-module_warning__SCK0X{background-color:var(--rt-color-warning);color:var(--rt-color-white)}.styles-module_error__JvumD{background-color:var(--rt-color-error);color:var(--rt-color-white)}.styles-module_info__BWdHW{background-color:var(--rt-color-info);color:var(--rt-color-white)}`,type:"base"})});function qt(){const o=new Date;o.setDate(o.getDate()+1);const[r,f]=t.useState(o.toISOString().split("T")[0]),[u,p]=t.useState([]),[s,m]=t.useState([]),[d,y]=t.useState([]),R=wt(c=>c.doctor),$=["9am-10am","11am-12pm","2pm-3pm","5pm-6pm","8pm-9pm"],C=c=>{const g=c.toISOString().split("T")[0];f(g),p([]),m([]),y([])},Z=c=>{p(g=>g.includes(c)?g.filter(x=>x!==c):[...g,c])},H=async()=>{const c={date:r,slots:u,doctorId:R.doctor._id};(await At(c)).status===200?(alert("Slots locked successfully"),y(x=>[...x,...u]),p([])):alert("Failed to book slots")},L=async()=>{var x;const c=R.doctor._id,g=await kt(r,c);if(g.status===200){m(g.data.appointments.map(N=>N.shift));const q=((x=g.data.Slots[0])==null?void 0:x.shifts)||[];y(q)}else console.error("Failed to fetch appointments")};return t.useEffect(()=>{L()},[r,R.doctor._id]),W.jsxs("div",{className:"container mx-auto p-4",children:[W.jsx("h1",{className:"text-2xl font-bold mb-4",children:"Manage Slots"}),W.jsxs("div",{className:"mb-4",children:[W.jsx("h1",{className:"font-bold mt-5",children:"SELECT DATE"}),W.jsx(bt,{selected:r,onChange:C,minDate:new Date(Date.now()+24*60*60*1e3),maxDate:new Date(Date.now()+6*24*60*60*1e3),className:"w-full p-2 border border-gray-300 rounded focus:ring focus:ring-blue-300"})]}),W.jsxs("div",{className:"mb-4",children:[W.jsx("h2",{className:"text-xl font-semibold mb-2",children:"Available Slots"}),W.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",children:$.map(c=>W.jsxs("div",{"data-tooltip-id":c,"data-tooltip-content":d.includes(c)?"This slot is locked":"This slot is already booked by the patient",children:[W.jsx("button",{onClick:()=>Z(c),disabled:s.includes(c)||d.includes(c),className:`p-4 w-48 rounded-lg border-2 transition duration-200 ease-in-out transform hover:scale-105 ${s.includes(c)||d.includes(c)?"bg-gray-300 text-gray-700 cursor-not-allowed border-gray-400":u.includes(c)?"bg-blue-500 text-white border-blue-700":"bg-white text-black border-gray-200 hover:bg-blue-100"} ${d.includes(c)?"border-blue-500":""}`,children:c}),(s.includes(c)||d.includes(c))&&W.jsx(Bt,{id:c})]},c))})]}),u.length>0&&W.jsx("button",{onClick:H,className:"px-6 py-3 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition duration-200 ease-in-out transform hover:scale-105",children:"Submit"})]})}export{qt as default};
