import{_ as x}from"../chunks/preload-helper.0HuHagjb.js";import{s as K}from"../chunks/scheduler.aZRR5A_O.js";import{S as N,i as Q,q as z,g as v,m as y,s as V,r as U,h,j as g,n as w,f as d,c as L,u as W,k as A,a as X,y as r,v as B,o as M,t as F,b as Y,d as G,w as J,p as Z}from"../chunks/index.ciNBPAxl.js";const tt=(s,t)=>{const n=s[t];return n?typeof n=="function"?n():Promise.resolve(n):new Promise((i,l)=>{(typeof queueMicrotask=="function"?queueMicrotask:setTimeout)(l.bind(null,new Error("Unknown variable dynamic import: "+t)))})};async function et({params:s}){const t=await tt(Object.assign({"../ajouter_information.md":()=>x(()=>import("../chunks/ajouter_information.bzb5OpaG.js"),__vite__mapDeps([0,1,2,3]),import.meta.url),"../proposer_guide.md":()=>x(()=>import("../chunks/proposer_guide.Qy9zdsCA.js"),__vite__mapDeps([4,1,2,3]),import.meta.url)}),`../${s.slug}.md`),{title:n,date:i,author:l}=t.metadata,$=t.default;return{title:n,date:i,author:l,content:$}}const it=Object.freeze(Object.defineProperty({__proto__:null,load:et},Symbol.toStringTag,{value:"Module"}));function at(s){let t,n,i=s[0].title+"",l,$,c,u,D,b=s[0].date+"",j,O,_,T,E=s[0].author+"",I,q,f,e,m;var p=s[0].content;function C(a,o){return{}}return p&&(e=z(p,C())),{c(){t=v("article"),n=v("h1"),l=y(i),$=V(),c=v("div"),u=v("p"),D=y("Publié le : "),j=y(b),O=V(),_=v("p"),T=y("Auteur : "),I=y(E),q=V(),f=v("div"),e&&U(e.$$.fragment),this.h()},l(a){t=h(a,"ARTICLE",{});var o=g(t);n=h(o,"H1",{});var P=g(n);l=w(P,i),P.forEach(d),$=L(o),c=h(o,"DIV",{class:!0});var k=g(c);u=h(k,"P",{class:!0});var R=g(u);D=w(R,"Publié le : "),j=w(R,b),R.forEach(d),O=L(k),_=h(k,"P",{class:!0});var S=g(_);T=w(S,"Auteur : "),I=w(S,E),S.forEach(d),k.forEach(d),q=L(o),f=h(o,"DIV",{class:!0});var H=g(f);e&&W(e.$$.fragment,H),H.forEach(d),o.forEach(d),this.h()},h(){A(u,"class","inline font-bold"),A(_,"class","inline font-bold"),A(c,"class","pt-4 flex justify-between mb-12"),A(f,"class","px-12 content-center")},m(a,o){X(a,t,o),r(t,n),r(n,l),r(t,$),r(t,c),r(c,u),r(u,D),r(u,j),r(c,O),r(c,_),r(_,T),r(_,I),r(t,q),r(t,f),e&&B(e,f,null),m=!0},p(a,[o]){if((!m||o&1)&&i!==(i=a[0].title+"")&&M(l,i),(!m||o&1)&&b!==(b=a[0].date+"")&&M(j,b),(!m||o&1)&&E!==(E=a[0].author+"")&&M(I,E),o&1&&p!==(p=a[0].content)){if(e){Z();const P=e;F(P.$$.fragment,1,0,()=>{J(P,1)}),Y()}p?(e=z(p,C()),U(e.$$.fragment),G(e.$$.fragment,1),B(e,f,null)):e=null}},i(a){m||(e&&G(e.$$.fragment,a),m=!0)},o(a){e&&F(e.$$.fragment,a),m=!1},d(a){a&&d(t),e&&J(e)}}}function nt(s,t,n){let{data:i}=t;return s.$$set=l=>{"data"in l&&n(0,i=l.data)},[i]}class lt extends N{constructor(t){super(),Q(this,t,nt,at,K,{data:0})}}export{lt as component,it as universal};
function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["../chunks/ajouter_information.bzb5OpaG.js","../chunks/scheduler.aZRR5A_O.js","../chunks/index.ciNBPAxl.js","../chunks/guides.TVZlwiAh.js","../chunks/proposer_guide.Qy9zdsCA.js"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}