import{s as B}from"../chunks/scheduler.aZRR5A_O.js";import{S as G,i as M,g as C,s as E,r as N,h as $,x as L,c as j,u as T,j as w,f as d,a as b,v as U,d as D,t as F,w as J,B as K,m as P,n as y,k as S,y as g,o as z}from"../chunks/index.ciNBPAxl.js";import{e as A}from"../chunks/each.-oqiv04n.js";import{I as Q}from"../chunks/Info.NO-uVT9H.js";const R=async({fetch:n})=>({guides:await(await n("/api/guides")).json()}),te=Object.freeze(Object.defineProperty({__proto__:null,load:R},Symbol.toStringTag,{value:"Module"}));function O(n,t,u){const l=n.slice();return l[1]=t[u],l}function q(n){let t,u,l,o=n[1].meta.title+"",v,p,k,i,m,_=n[1].meta.date+"",h,s,e=n[1].meta.author+"",r,a;return{c(){t=C("li"),u=C("h2"),l=C("a"),v=P(o),k=E(),i=C("p"),m=P("Publié le : "),h=P(_),s=P(" par "),r=P(e),a=E(),this.h()},l(c){t=$(c,"LI",{class:!0});var f=w(t);u=$(f,"H2",{});var H=w(u);l=$(H,"A",{href:!0});var I=w(l);v=y(I,o),I.forEach(d),H.forEach(d),k=j(f),i=$(f,"P",{class:!0});var x=w(i);m=y(x,"Publié le : "),h=y(x,_),s=y(x," par "),r=y(x,e),x.forEach(d),a=j(f),f.forEach(d),this.h()},h(){S(l,"href",p=n[1].path),S(i,"class","pt-2"),S(t,"class","px-4 pb-4 my-4 rounded-lg bg-base-300 dark:bg-base-300 hover:bg-base-200 hover:dark:bg-base-200 border-1 border-color-base-100")},m(c,f){b(c,t,f),g(t,u),g(u,l),g(l,v),g(t,k),g(t,i),g(i,m),g(i,h),g(i,s),g(i,r),g(t,a)},p(c,f){f&1&&o!==(o=c[1].meta.title+"")&&z(v,o),f&1&&p!==(p=c[1].path)&&S(l,"href",p),f&1&&_!==(_=c[1].meta.date+"")&&z(h,_),f&1&&e!==(e=c[1].meta.author+"")&&z(r,e)},d(c){c&&d(t)}}}function V(n){let t,u="Guides",l,o,v,p,k="Articles publiés",i,m,_;o=new Q({props:{info:"Cette page est un recensement de guides proposés par les membres de la communauté pour apprendre à <i>live coder</i> ou se perfectionner. L'idée est de proposer des articles plus ou moins courts consacrés à un outil ou à une approche particulière du <i>live coding</i> Pour proposer un guide, référez-vous à l'article <a href='/guides/proposer_guide'>Proposer un guide</a>. Nous acceptons toutes les collaborations.",markdown:"false"}});let h=A(n[0].guides),s=[];for(let e=0;e<h.length;e+=1)s[e]=q(O(n,h,e));return{c(){t=C("h1"),t.textContent=u,l=E(),N(o.$$.fragment),v=E(),p=C("h2"),p.textContent=k,i=E(),m=C("ul");for(let e=0;e<s.length;e+=1)s[e].c()},l(e){t=$(e,"H1",{"data-svelte-h":!0}),L(t)!=="svelte-ilihnd"&&(t.textContent=u),l=j(e),T(o.$$.fragment,e),v=j(e),p=$(e,"H2",{"data-svelte-h":!0}),L(p)!=="svelte-6efz5p"&&(p.textContent=k),i=j(e),m=$(e,"UL",{});var r=w(m);for(let a=0;a<s.length;a+=1)s[a].l(r);r.forEach(d)},m(e,r){b(e,t,r),b(e,l,r),U(o,e,r),b(e,v,r),b(e,p,r),b(e,i,r),b(e,m,r);for(let a=0;a<s.length;a+=1)s[a]&&s[a].m(m,null);_=!0},p(e,[r]){if(r&1){h=A(e[0].guides);let a;for(a=0;a<h.length;a+=1){const c=O(e,h,a);s[a]?s[a].p(c,r):(s[a]=q(c),s[a].c(),s[a].m(m,null))}for(;a<s.length;a+=1)s[a].d(1);s.length=h.length}},i(e){_||(D(o.$$.fragment,e),_=!0)},o(e){F(o.$$.fragment,e),_=!1},d(e){e&&(d(t),d(l),d(v),d(p),d(i),d(m)),J(o,e),K(s,e)}}}function W(n,t,u){let{data:l}=t;return n.$$set=o=>{"data"in o&&u(0,l=o.data)},[l]}class ae extends G{constructor(t){super(),M(this,t,W,V,B,{data:0})}}export{ae as component,te as universal};
