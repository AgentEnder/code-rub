"use strict";(self.webpackChunkcode_rub=self.webpackChunkcode_rub||[]).push([[905],{3905:(e,t,r)=>{r.d(t,{Zo:()=>d,kt:()=>f});var n=r(7294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function o(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},i=Object.keys(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var s=n.createContext({}),c=function(e){var t=n.useContext(s),r=t;return e&&(r="function"==typeof e?e(t):o(o({},t),e)),r},d=function(e){var t=c(e.components);return n.createElement(s.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},u=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,i=e.originalType,s=e.parentName,d=l(e,["components","mdxType","originalType","parentName"]),u=c(r),f=a,m=u["".concat(s,".").concat(f)]||u[f]||p[f]||i;return r?n.createElement(m,o(o({ref:t},d),{},{components:r})):n.createElement(m,o({ref:t},d))}));function f(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=r.length,o=new Array(i);o[0]=u;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:a,o[1]=l;for(var c=2;c<i;c++)o[c]=r[c];return n.createElement.apply(null,o)}return n.createElement.apply(null,r)}u.displayName="MDXCreateElement"},8891:(e,t,r)=>{r.r(t),r.d(t,{frontMatter:()=>l,contentTitle:()=>s,metadata:()=>c,toc:()=>d,default:()=>u});var n=r(7462),a=r(3366),i=(r(7294),r(3905)),o=["components"],l={id:"StatusUpdate",title:"Interface: StatusUpdate",sidebar_label:"StatusUpdate",sidebar_position:0,custom_edit_url:null},s=void 0,c={unversionedId:"API/@code-rub/core/interfaces/StatusUpdate",id:"API/@code-rub/core/interfaces/StatusUpdate",title:"Interface: StatusUpdate",description:"Properties",source:"@site/docs/API/@code-rub/core/interfaces/StatusUpdate.md",sourceDirName:"API/@code-rub/core/interfaces",slug:"/API/@code-rub/core/interfaces/StatusUpdate",permalink:"/code-rub/API/@code-rub/core/interfaces/StatusUpdate",editUrl:null,tags:[],version:"current",sidebarPosition:0,frontMatter:{id:"StatusUpdate",title:"Interface: StatusUpdate",sidebar_label:"StatusUpdate",sidebar_position:0,custom_edit_url:null},sidebar:"someSidebar",previous:{title:"ResolvedConfig",permalink:"/code-rub/API/@code-rub/core/interfaces/ResolvedConfig"},next:{title:"Readme",permalink:"/code-rub/API/@code-rub/filter-files/"}},d=[{value:"Properties",id:"properties",children:[{value:"complete",id:"complete",children:[{value:"Defined in",id:"defined-in",children:[],level:4}],level:3},{value:"message",id:"message",children:[{value:"Defined in",id:"defined-in-1",children:[],level:4}],level:3},{value:"messageOnly",id:"messageonly",children:[{value:"Defined in",id:"defined-in-2",children:[],level:4}],level:3}],level:2}],p={toc:d};function u(e){var t=e.components,r=(0,a.Z)(e,o);return(0,i.kt)("wrapper",(0,n.Z)({},p,r,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h2",{id:"properties"},"Properties"),(0,i.kt)("h3",{id:"complete"},"complete"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("strong",{parentName:"p"},"complete"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"boolean")),(0,i.kt)("h4",{id:"defined-in"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/AgentEnder/code-rub/blob/main/packages/core/src/models/status-update.interface.ts#L3"},"models/status-update.interface.ts:3")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"message"},"message"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("strong",{parentName:"p"},"message"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"string")),(0,i.kt)("h4",{id:"defined-in-1"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/AgentEnder/code-rub/blob/main/packages/core/src/models/status-update.interface.ts#L2"},"models/status-update.interface.ts:2")),(0,i.kt)("hr",null),(0,i.kt)("h3",{id:"messageonly"},"messageOnly"),(0,i.kt)("p",null,"\u2022 ",(0,i.kt)("inlineCode",{parentName:"p"},"Optional")," ",(0,i.kt)("strong",{parentName:"p"},"messageOnly"),": ",(0,i.kt)("inlineCode",{parentName:"p"},"boolean")),(0,i.kt)("h4",{id:"defined-in-2"},"Defined in"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/AgentEnder/code-rub/blob/main/packages/core/src/models/status-update.interface.ts#L4"},"models/status-update.interface.ts:4")))}u.isMDXComponent=!0}}]);