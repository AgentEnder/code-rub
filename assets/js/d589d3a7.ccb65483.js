"use strict";(self.webpackChunkcode_rub=self.webpackChunkcode_rub||[]).push([[162],{3905:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>m});var r=n(7294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var s=r.createContext({}),p=function(e){var t=r.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},u=function(e){var t=p(e.components);return r.createElement(s.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,i=e.mdxType,a=e.originalType,s=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),d=p(n),m=i,h=d["".concat(s,".").concat(m)]||d[m]||c[m]||a;return n?r.createElement(h,o(o({ref:t},u),{},{components:n})):r.createElement(h,o({ref:t},u))}));function m(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var a=n.length,o=new Array(a);o[0]=d;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:i,o[1]=l;for(var p=2;p<a;p++)o[p]=n[p];return r.createElement.apply(null,o)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},2282:(e,t,n)=>{n.r(t),n.d(t,{frontMatter:()=>l,contentTitle:()=>s,metadata:()=>p,toc:()=>u,default:()=>d});var r=n(7462),i=n(3366),a=(n(7294),n(3905)),o=["components"],l={id:"getting-started",title:"Getting Started",sidebar_label:"Getting Started",slug:"/"},s="code-rub",p={unversionedId:"getting-started",id:"getting-started",title:"Getting Started",description:"This repository implements a base layer, CLI, and a few plugins to automate the process described here//hassanhabib.com/2020/02/09/code-rub/.",source:"@site/docs/getting-started.md",sourceDirName:".",slug:"/",permalink:"/code-rub/",tags:[],version:"current",frontMatter:{id:"getting-started",title:"Getting Started",sidebar_label:"Getting Started",slug:"/"},sidebar:"someSidebar",next:{title:"azure-devops",permalink:"/code-rub/plugins/azure-devops"}},u=[{value:"Quick Start",id:"quick-start",children:[],level:2},{value:"Plugins",id:"plugins",children:[],level:2}],c={toc:u};function d(e){var t=e.components,n=(0,i.Z)(e,o);return(0,a.kt)("wrapper",(0,r.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"code-rub"},"code-rub"),(0,a.kt)("p",null,"This repository implements a base layer, CLI, and a few plugins to automate the process described here: ",(0,a.kt)("a",{parentName:"p",href:"https://hassanhabib.com/2020/02/09/code-rub/"},"https://hassanhabib.com/2020/02/09/code-rub/"),"."),(0,a.kt)("p",null,"The core of code-rub is agnostic to ticketing system, project philosophy, and technology. On its own, it will do nothing except keep track of which files have been assigned for a rub, but it doesn't know how to actually create tickets and assign them. It doesn't even log them to the console by default."),(0,a.kt)("h2",{id:"quick-start"},"Quick Start"),(0,a.kt)("p",null,"Currently, a jira plugin and an azure-devops plugin are provided. If this suits your use case, run ",(0,a.kt)("inlineCode",{parentName:"p"},"npx code-rub init --preset {jira|azure-devops}"),", and then fill in the placeholder values created in ",(0,a.kt)("inlineCode",{parentName:"p"},"code-rub.config.js"),"."),(0,a.kt)("p",null,"If this doesn't suit your use case, run ",(0,a.kt)("inlineCode",{parentName:"p"},"npx code-rub init")," to generate a blank configuration. There are examples of local plugins in this repo's tool folder, and the ",(0,a.kt)("inlineCode",{parentName:"p"},"code-rub.config.js")," file here demonstrates how to point to them. They can be either typescript or javascript. There are future plans to add azure-devops and github issues based support, but they are not yet implemented. PRs adding them are welcome \ud83d\ude00"),(0,a.kt)("h2",{id:"plugins"},"Plugins"),(0,a.kt)("p",null,"This is where the plugins come in. A code-rub plugin can change almost everything about the flow of ",(0,a.kt)("inlineCode",{parentName:"p"},"npx code-rub"),". They can provide:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"A setup function: ",(0,a.kt)("inlineCode",{parentName:"li"},"setup")),(0,a.kt)("li",{parentName:"ul"},"An initial configuration, used in ",(0,a.kt)("inlineCode",{parentName:"li"},"npx code-rub init --preset"),": ",(0,a.kt)("inlineCode",{parentName:"li"},"initialConfiguration")),(0,a.kt)("li",{parentName:"ul"},"A method to process assignments, after they are generated: ",(0,a.kt)("inlineCode",{parentName:"li"},"processAssignments")),(0,a.kt)("li",{parentName:"ul"},"A method to process the file queue, useful for filtering out file extensions or paths: ",(0,a.kt)("inlineCode",{parentName:"li"},"processFileQueue")),(0,a.kt)("li",{parentName:"ul"},"A method to process the ",(0,a.kt)("inlineCode",{parentName:"li"},"Ignore")," object used when generating the repository file map: ",(0,a.kt)("inlineCode",{parentName:"li"},"processIgnore"),(0,a.kt)("ul",{parentName:"li"},(0,a.kt)("li",{parentName:"ul"},"This is ran before ",(0,a.kt)("inlineCode",{parentName:"li"},"code-rub")," saves the file map, so it affects all configuration files. This should only be specified in the repositories base configuration (or sole configuration)."))),(0,a.kt)("li",{parentName:"ul"},"A method to read and write the file map: ",(0,a.kt)("inlineCode",{parentName:"li"},"readFileMap")," and ",(0,a.kt)("inlineCode",{parentName:"li"},"saveFileMap")," respectively.",(0,a.kt)("ul",{parentName:"li"},(0,a.kt)("li",{parentName:"ul"},"Only one plugin may specify these methods.")))),(0,a.kt)("p",null,"Plugins are specified by two pieces of configuration, the ",(0,a.kt)("inlineCode",{parentName:"p"},"plugins")," array and the ",(0,a.kt)("inlineCode",{parentName:"p"},"pluginConfiguration")," object. Plugin's are loaded based on the ",(0,a.kt)("inlineCode",{parentName:"p"},"plugins")," array, and the capabilities they provide are configured through their entry in ",(0,a.kt)("inlineCode",{parentName:"p"},"pluginConfiguration"),"."),(0,a.kt)("p",null,"Plugins are loaded, and executed based on their order in the ",(0,a.kt)("inlineCode",{parentName:"p"},"plugins")," array. This is especially important for functions like ",(0,a.kt)("inlineCode",{parentName:"p"},"processFileQueue")," which chains the results during execution."),(0,a.kt)("blockquote",null,(0,a.kt)("p",{parentName:"blockquote"},"As an example, imagine you have plugin1 which removes typescript files but plugin2 expects them to be present. If you use ",(0,a.kt)("inlineCode",{parentName:"p"},"plugins: [plugin1, plugin2]"),", plugin2 would not see any of the typescript files. If you use ",(0,a.kt)("inlineCode",{parentName:"p"},"plugins: [plugin2, plugin1]"),", plugin2 would see them since they are not removed yet.")),(0,a.kt)("p",null,"For an example plugin implementation, check the ",(0,a.kt)("inlineCode",{parentName:"p"},"jira")," package in this repository."))}d.isMDXComponent=!0}}]);