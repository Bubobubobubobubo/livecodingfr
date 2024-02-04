import{s as te,n as B,e as V}from"../chunks/scheduler.aZRR5A_O.js";import{S as ie,i as re,g as f,h,j as se,f as o,k,a,A as ne,s as m,c as d,y as J,r as N,B as oe,x as v,u as Q,v as Y,d as K,t as U,w as W}from"../chunks/index.kYoizZ4A.js";import{I as le}from"../chunks/Info.uQGne4yI.js";import{e as X}from"../chunks/each.-oqiv04n.js";function Z(p,s,n){const i=p.slice();return i[1]=s[n],i}function ee(p){let s,n,i,r,u;return{c(){s=f("div"),n=f("img"),u=m(),this.h()},l(t){s=h(t,"DIV",{});var c=se(s);n=h(c,"IMG",{class:!0,src:!0,alt:!0}),u=d(c),c.forEach(o),this.h()},h(){k(n,"class","h-auto max-w-full rounded-lg"),V(n.src,i=p[1].link)||k(n,"src",i),k(n,"alt",r=p[1].description)},m(t,c){a(t,s,c),J(s,n),J(s,u)},p(t,c){c&1&&!V(n.src,i=t[1].link)&&k(n,"src",i),c&1&&r!==(r=t[1].description)&&k(n,"alt",r)},d(t){t&&o(s)}}}function ae(p){let s,n=X(p[0]),i=[];for(let r=0;r<n.length;r+=1)i[r]=ee(Z(p,n,r));return{c(){s=f("div");for(let r=0;r<i.length;r+=1)i[r].c();this.h()},l(r){s=h(r,"DIV",{class:!0});var u=se(s);for(let t=0;t<i.length;t+=1)i[t].l(u);u.forEach(o),this.h()},h(){k(s,"class","grid grid-cols-2 md:grid-cols-3 gap-4")},m(r,u){a(r,s,u);for(let t=0;t<i.length;t+=1)i[t]&&i[t].m(s,null)},p(r,[u]){if(u&1){n=X(r[0]);let t;for(t=0;t<n.length;t+=1){const c=Z(r,n,t);i[t]?i[t].p(c,u):(i[t]=ee(c),i[t].c(),i[t].m(s,null))}for(;t<i.length;t+=1)i[t].d(1);i.length=n.length}},i:B,o:B,d(r){r&&o(s),ne(i,r)}}}function ue(p,s,n){let{pictures:i}=s;return p.$$set=r=>{"pictures"in r&&n(0,i=r.pictures)},[i]}class ce extends ie{constructor(s){super(),re(this,s,ue,ae,te,{pictures:0})}}function pe(p){let s,n,i="Bienvenue",r,u,t='<a href="https://livecoding.fr" rel="nofollow">Livecoding.fr</a> est un site d’information consacré à la pratique du <em>live coding</em>. Il est maintenu par l’effort communautaire d’un groupe d’artistes, de musiciens et de développeurs francophones. Son objectif est de centraliser les informations sur cette pratique et de servir de portail : guides, articles, évènements, information sur les artistes, etc. Tout ajout est le bienvenu. Consulter <a href="/guides/ajouter_information">ce guide</a> ou <a href="/guides/proposer_guide">ce guide</a> pour apprendre comment ajouter une information.',c,g,y,_,z="Qu’est-ce que le live-coding ?",P,b,H,q,D='Historiquement, le <em>live coding</em> est un type de création porté par le collectif <a href="https://toplap.org" rel="nofollow">TOPLAP</a>. Il existe de nombreux groupes en Europe et dans le monde qui sont issus de ce collectif : <a href="https://toplap.cat/en/home" rel="nofollow">TOPLAP Barcelona</a>, <a href="https://livecode.nyc/" rel="nofollow">Livecode NYC</a>, parmi d’autres. La pratique du <em>live coding</em> s’est popularisée au travers du <a href="">Manifeste TOPLAP</a> et des <a href="https://algorave.com" rel="nofollow">Algoraves</a> (<em>algorithmic rave parties</em>). Il s’agit pourtant de <em>l’arbre qui cache la forêt</em> : le <em>live coding</em> est une pratique qui existe depuis la fin des années 1980, et que l’on retrouve un peu partout dans les arts numériques.',T,x,E="À propos de ce site",M,C,G='Ce site est une collection de ressources. Il est conçu pour combler un vide. La communauté francophone du <em>live coding</em> ne possédait pas de site permettant aux artistes et musiciens français de se trouver et d’échanger facilement. Disposer d’un site dédié permet de rompre avec la nécessité de se tenir informé sans cesse sur les réseaux sociaux sous peine de manquer une information. Ce site est conçu et maintenu par <a href="https://raphaelforment.fr" rel="nofollow">Raphaël Forment</a> (BuboBubo).',j,w,F="L’information sur chacune des pages est randomisée pour favoriser la découverte.",I,L,O="Comment contribuer ?",R,$,S='Le site est hébergé sur <a href="https://github.com/Bubobubobubobubo/livecodingfr" rel="nofollow">GitHub</a>. Pour ajouter une information au site, veuillez créer une <a href="https://docs.github.com/fr/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request" rel="nofollow">Pull Request</a>. Vous pouvez aussi contacter l’un des membres qui se chargera de transmettre l’information.',A;return g=new ce({props:{pictures:p[0]}}),b=new le({props:{info:"Le <i>live coding</i> est une pratique qui fait de l'acte de programmation un geste expressif, performatif et artistique. Les <i>live coders</i> considèrent l'interface de programmation comme un instrument pour la création temps réel. Le <i>live coding</i> est un art au croisement entre synthèse sonore, improvisation musicale et musique algorithmique générative.<br><br> Le <i>live coding</i> est au croisement de plusieurs arts et encourage des approches transdisciplinaires de la création : musique, arts visuels, informatique, jeux vidéos, danse, etc. Plus largement, le <i>live coding</i> est une approche critique de la création qui encourage les artistes à ré-imaginer leur rapport à l'informatique. Le <i>live coding</i> est traversé par la culture <i>hacker</i>, par la philosophie du logiciel libre et <i>open source</i>. C'est une pratique qui cherche à développer une nouvelle forme d'expressivité au sein des arts. Le <i>live coding</i> considère l'ordinateur comme un outil pour la <i>programmation exploratoire</i> ou la <i>programmation conversationnelle</i>, comme un outil de discussion et de médiation.",markdown:"false"}}),{c(){s=m(),n=f("h1"),n.textContent=i,r=m(),u=f("p"),u.innerHTML=t,c=m(),N(g.$$.fragment),y=m(),_=f("h1"),_.textContent=z,P=m(),N(b.$$.fragment),H=m(),q=f("p"),q.innerHTML=D,T=m(),x=f("h1"),x.textContent=E,M=m(),C=f("p"),C.innerHTML=G,j=m(),w=f("p"),w.textContent=F,I=m(),L=f("h1"),L.textContent=O,R=m(),$=f("p"),$.innerHTML=S,this.h()},l(e){oe("svelte-si4wcq",document.head).forEach(o),s=d(e),n=h(e,"H1",{"data-svelte-h":!0}),v(n)!=="svelte-1bwy2rx"&&(n.textContent=i),r=d(e),u=h(e,"P",{"data-svelte-h":!0}),v(u)!=="svelte-1a50fgq"&&(u.innerHTML=t),c=d(e),Q(g.$$.fragment,e),y=d(e),_=h(e,"H1",{"data-svelte-h":!0}),v(_)!=="svelte-z12tl4"&&(_.textContent=z),P=d(e),Q(b.$$.fragment,e),H=d(e),q=h(e,"P",{"data-svelte-h":!0}),v(q)!=="svelte-qso192"&&(q.innerHTML=D),T=d(e),x=h(e,"H1",{"data-svelte-h":!0}),v(x)!=="svelte-9nyscp"&&(x.textContent=E),M=d(e),C=h(e,"P",{"data-svelte-h":!0}),v(C)!=="svelte-ffh2di"&&(C.innerHTML=G),j=d(e),w=h(e,"P",{"data-svelte-h":!0}),v(w)!=="svelte-1bpzmjt"&&(w.textContent=F),I=d(e),L=h(e,"H1",{"data-svelte-h":!0}),v(L)!=="svelte-15qmnqt"&&(L.textContent=O),R=d(e),$=h(e,"P",{"data-svelte-h":!0}),v($)!=="svelte-1ht7736"&&($.innerHTML=S),this.h()},h(){document.title="LC.FR"},m(e,l){a(e,s,l),a(e,n,l),a(e,r,l),a(e,u,l),a(e,c,l),Y(g,e,l),a(e,y,l),a(e,_,l),a(e,P,l),Y(b,e,l),a(e,H,l),a(e,q,l),a(e,T,l),a(e,x,l),a(e,M,l),a(e,C,l),a(e,j,l),a(e,w,l),a(e,I,l),a(e,L,l),a(e,R,l),a(e,$,l),A=!0},p:B,i(e){A||(K(g.$$.fragment,e),K(b.$$.fragment,e),A=!0)},o(e){U(g.$$.fragment,e),U(b.$$.fragment,e),A=!1},d(e){e&&(o(s),o(n),o(r),o(u),o(c),o(y),o(_),o(P),o(H),o(q),o(T),o(x),o(M),o(C),o(j),o(w),o(I),o(L),o(R),o($)),W(g,e),W(b,e)}}}function me(p){return[[{link:"https://ralt144mi.remigeorges.fr/Ralt144MI3.png",description:"Rémi Georges"},{link:"https://www.cookie.paris/static/bc65c5fd7f7c76dc70bcd9892dc17a4d/5cc0d/16.webp",description:"Azertype"},{link:"https://www.cookie.paris/static/9dbc442f1f54a41b9210b3ba1b835226/5cc0d/13.webp",description:"Jules Cipher"},{link:"../images/leondenise.jpeg",description:"Léon Denise"},{link:"https://renardo.org/images/screenshot1.png",description:"Renardo"},{link:"https://sardine.raphaelforment.fr/presentation/what_is_live_coding.jpeg#center",description:"Raphaël Forment"}]]}class ge extends ie{constructor(s){super(),re(this,s,me,pe,te,{})}}export{ge as component};
