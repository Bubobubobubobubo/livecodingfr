import{s as B}from"../chunks/scheduler.aZRR5A_O.js";import{S as M,i as T,g as C,s as E,r as U,h as $,x as H,c as j,u as D,j as w,f as m,a as g,v as F,d as G,t as J,w as K,B as N,m as y,n as P,k as z,y as v,o as S}from"../chunks/index.AIcdAWo0.js";import{e as I}from"../chunks/each.-oqiv04n.js";import{I as Q}from"../chunks/Info.bs_Ss2Q-.js";const R=async({fetch:o})=>({articles:await(await o("/api/articles")).json()}),te=Object.freeze(Object.defineProperty({__proto__:null,load:R},Symbol.toStringTag,{value:"Module"}));function L(o,t,c){const s=o.slice();return s[1]=t[c],s}function O(o){let t,c,s,r=o[1].meta.title+"",b,f,k,i,h,d=o[1].meta.date+"",p,l,e=o[1].meta.author+"",n,a;return{c(){t=C("li"),c=C("h2"),s=C("a"),b=y(r),k=E(),i=C("p"),h=y("Publié le : "),p=y(d),l=y(" par "),n=y(e),a=E(),this.h()},l(u){t=$(u,"LI",{class:!0});var _=w(t);c=$(_,"H2",{});var q=w(c);s=$(q,"A",{href:!0});var A=w(s);b=P(A,r),A.forEach(m),q.forEach(m),k=j(_),i=$(_,"P",{class:!0});var x=w(i);h=P(x,"Publié le : "),p=P(x,d),l=P(x," par "),n=P(x,e),x.forEach(m),a=j(_),_.forEach(m),this.h()},h(){z(s,"href",f=o[1].path),z(i,"class","pt-2"),z(t,"class","px-4 pb-4 my-4 rounded-lg bg-base-300 dark:bg-base-300 hover:bg-base-200 hover:dark:bg-base-200 border-1 border-color-base-100")},m(u,_){g(u,t,_),v(t,c),v(c,s),v(s,b),v(t,k),v(t,i),v(i,h),v(i,p),v(i,l),v(i,n),v(t,a)},p(u,_){_&1&&r!==(r=u[1].meta.title+"")&&S(b,r),_&1&&f!==(f=u[1].path)&&z(s,"href",f),_&1&&d!==(d=u[1].meta.date+"")&&S(p,d),_&1&&e!==(e=u[1].meta.author+"")&&S(n,e)},d(u){u&&m(t)}}}function V(o){let t,c="Articles",s,r,b,f,k="Articles publiés",i,h,d;r=new Q({props:{info:`Cette section sert pour tout les articles généralistes qui ne peuvent
  pas réellement être considérés comme des guides. Publiez ce que vous voulez !`,markdown:"false"}});let p=I(o[0].articles),l=[];for(let e=0;e<p.length;e+=1)l[e]=O(L(o,p,e));return{c(){t=C("h1"),t.textContent=c,s=E(),U(r.$$.fragment),b=E(),f=C("h2"),f.textContent=k,i=E(),h=C("ul");for(let e=0;e<l.length;e+=1)l[e].c()},l(e){t=$(e,"H1",{"data-svelte-h":!0}),H(t)!=="svelte-a2vclf"&&(t.textContent=c),s=j(e),D(r.$$.fragment,e),b=j(e),f=$(e,"H2",{"data-svelte-h":!0}),H(f)!=="svelte-6efz5p"&&(f.textContent=k),i=j(e),h=$(e,"UL",{});var n=w(h);for(let a=0;a<l.length;a+=1)l[a].l(n);n.forEach(m)},m(e,n){g(e,t,n),g(e,s,n),F(r,e,n),g(e,b,n),g(e,f,n),g(e,i,n),g(e,h,n);for(let a=0;a<l.length;a+=1)l[a]&&l[a].m(h,null);d=!0},p(e,[n]){if(n&1){p=I(e[0].articles);let a;for(a=0;a<p.length;a+=1){const u=L(e,p,a);l[a]?l[a].p(u,n):(l[a]=O(u),l[a].c(),l[a].m(h,null))}for(;a<l.length;a+=1)l[a].d(1);l.length=p.length}},i(e){d||(G(r.$$.fragment,e),d=!0)},o(e){J(r.$$.fragment,e),d=!1},d(e){e&&(m(t),m(s),m(b),m(f),m(i),m(h)),K(r,e),N(l,e)}}}function W(o,t,c){let{data:s}=t;return o.$$set=r=>{"data"in r&&c(0,s=r.data)},[s]}class ae extends M{constructor(t){super(),T(this,t,W,V,B,{data:0})}}export{ae as component,te as universal};
