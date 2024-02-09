import{s as y,x as $,y as w,n as G}from"./scheduler.aZRR5A_O.js";import{S as O,i as P,r as R,u as S,v as k,d as I,t as V,w as A,g as _,s as h,h as g,x as v,c as x,k as B,a as i,f as r}from"./index.kYoizZ4A.js";import{G as D,g as E,a as T}from"./guides.fqK5Mftf.js";function F(f){let t,d="Ce site est conçu pour être rapidement mis à jour par la communauté des <em>live coders</em> francophones. Chaque section est construite automatiquement à partir des données mises à disposition par chacun : <strong>Évènements</strong>, <strong>Membres</strong>, <strong>Outils</strong>, <strong>Guides</strong>, <strong>Réseaux</strong>, <strong>Resources</strong>, <strong>Presse</strong>, etc. En séparant les données de la mise en page, cela permet au site d’évoluer rapidement et indépendamment des données amassées :)",l,a,s="Où se situent les données ?",n,u,z="Les données sont intégrées à la source du site :",C,p,L='<p>1) Rendez-vous sur le <a href="https://github" rel="nofollow">dépôt</a> dans le dossier <code>lib/data</code> : <a href="https://github.com/Bubobubobubobubo/livecodingfr/tree/main/src/lib/data" rel="nofollow">ici</a>.</p> <p>2) Vous y trouverez un fichier <strong>JSON</strong> pour chaque section du site.</p> <p>3) Éditez depuis l’éditeur intégré de GitHub ou modifiez en local.</p> <p>4) Soumettez vos changements, attendez la mise à jour du site !</p>',b,m,M="Où se situent les guides ?",H,c,q='Les guides répondent à un format différent. Il existe <a href="/guides/proposer_guide">un autre article</a> qui vous guidera pour en créer/modifier un guide.';return{c(){t=_("p"),t.innerHTML=d,l=h(),a=_("h2"),a.textContent=s,n=h(),u=_("p"),u.textContent=z,C=h(),p=_("div"),p.innerHTML=L,b=h(),m=_("h2"),m.textContent=M,H=h(),c=_("p"),c.innerHTML=q,this.h()},l(e){t=g(e,"P",{"data-svelte-h":!0}),v(t)!=="svelte-1r1wqsk"&&(t.innerHTML=d),l=x(e),a=g(e,"H2",{"data-svelte-h":!0}),v(a)!=="svelte-17idpzd"&&(a.textContent=s),n=x(e),u=g(e,"P",{"data-svelte-h":!0}),v(u)!=="svelte-1wkphp0"&&(u.textContent=z),C=x(e),p=g(e,"DIV",{class:!0,"data-svelte-h":!0}),v(p)!=="svelte-p5v4nz"&&(p.innerHTML=L),b=x(e),m=g(e,"H2",{"data-svelte-h":!0}),v(m)!=="svelte-aapbly"&&(m.textContent=M),H=x(e),c=g(e,"P",{"data-svelte-h":!0}),v(c)!=="svelte-q9p27"&&(c.innerHTML=q),this.h()},h(){B(p,"class","pl-8 mt-4")},m(e,o){i(e,t,o),i(e,l,o),i(e,a,o),i(e,n,o),i(e,u,o),i(e,C,o),i(e,p,o),i(e,b,o),i(e,m,o),i(e,H,o),i(e,c,o)},p:G,d(e){e&&(r(t),r(l),r(a),r(n),r(u),r(C),r(p),r(b),r(m),r(H),r(c))}}}function J(f){let t,d;const l=[f[0],j];let a={$$slots:{default:[F]},$$scope:{ctx:f}};for(let s=0;s<l.length;s+=1)a=$(a,l[s]);return t=new D({props:a}),{c(){R(t.$$.fragment)},l(s){S(t.$$.fragment,s)},m(s,n){k(t,s,n),d=!0},p(s,[n]){const u=n&1?E(l,[n&1&&T(s[0]),n&0&&T(j)]):{};n&2&&(u.$$scope={dirty:n,ctx:s}),t.$set(u)},i(s){d||(I(t.$$.fragment,s),d=!0)},o(s){V(t.$$.fragment,s),d=!1},d(s){A(t,s)}}}const j={title:"Comment ajouter des informations au site ?",date:"2023-12-23",author:"Raphaël Maurice Forment"};function N(f,t,d){return f.$$set=l=>{d(0,t=$($({},t),w(l)))},t=w(t),[t]}class W extends O{constructor(t){super(),P(this,t,N,J,y,{})}}export{W as default,j as metadata};
