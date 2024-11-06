import{s as X,n as I,e as G}from"../chunks/scheduler.aZRR5A_O.js";import{S as Z,i as ee,g as f,h,j as te,f as o,k as $,a,A as ie,s as m,c as d,y as O,r as V,B as se,x as v,u as N,v as S,d as J,t as Q,w as Y}from"../chunks/index.kYoizZ4A.js";import{I as re}from"../chunks/Info.ITY44f4q.js";import{e as K}from"../chunks/each.-oqiv04n.js";function U(p,r,n){const i=p.slice();return i[1]=r[n],i}function W(p){let r,n,i,s,u;return{c(){r=f("div"),n=f("img"),u=m(),this.h()},l(t){r=h(t,"DIV",{});var c=te(r);n=h(c,"IMG",{class:!0,src:!0,alt:!0}),u=d(c),c.forEach(o),this.h()},h(){$(n,"class","h-auto max-w-full rounded-lg"),G(n.src,i=p[1].link)||$(n,"src",i),$(n,"alt",s=p[1].description)},m(t,c){a(t,r,c),O(r,n),O(r,u)},p(t,c){c&1&&!G(n.src,i=t[1].link)&&$(n,"src",i),c&1&&s!==(s=t[1].description)&&$(n,"alt",s)},d(t){t&&o(r)}}}function ne(p){let r,n=K(p[0]),i=[];for(let s=0;s<n.length;s+=1)i[s]=W(U(p,n,s));return{c(){r=f("div");for(let s=0;s<i.length;s+=1)i[s].c();this.h()},l(s){r=h(s,"DIV",{class:!0});var u=te(r);for(let t=0;t<i.length;t+=1)i[t].l(u);u.forEach(o),this.h()},h(){$(r,"class","grid grid-cols-2 md:grid-cols-3 gap-4")},m(s,u){a(s,r,u);for(let t=0;t<i.length;t+=1)i[t]&&i[t].m(r,null)},p(s,[u]){if(u&1){n=K(s[0]);let t;for(t=0;t<n.length;t+=1){const c=U(s,n,t);i[t]?i[t].p(c,u):(i[t]=W(c),i[t].c(),i[t].m(r,null))}for(;t<i.length;t+=1)i[t].d(1);i.length=n.length}},i:I,o:I,d(s){s&&o(r),ie(i,s)}}}function oe(p,r,n){let{pictures:i}=r;return p.$$set=s=>{"pictures"in s&&n(0,i=s.pictures)},[i]}class le extends Z{constructor(r){super(),ee(this,r,oe,ne,X,{pictures:0})}}function ae(p){let r,n,i="Bienvenue",s,u,t='<a href="https://livecoding.fr" rel="nofollow">Livecoding.fr</a> est un site consacré à la pratique du <em>live coding</em> en France. Il est périodiquement maintenu par un groupe d’artistes, de musiciens et de <em>live coders</em> francophones. Ce site est destiné à servir de base de ressources et de portail pour découvrir les différents aspects de cette pratique : guides, articles, évènements, information sur les artistes, etc. Toute modification est bienvenue, le site étant conçu comme un support libre et <em>open source</em>. Nous vous renvoyez vers <a href="/guides/ajouter_information">ce guide</a> ou <a href="/guides/proposer_guide">ce guide</a> pour apprendre comment modifier le site.',c,g,k,_,R="Qu’est-ce que le live-coding ?",y,b,H,q,A='Historiquement, le <em>live coding</em> a été promu et popularisé par le collectif <a href="https://toplap.org" rel="nofollow">TOPLAP</a>, aujourd’hui composé de <a href="https://livecodingbook.toplap.org/" rel="nofollow">chercheurs</a>, de musiciens et de développeurs de tous horizons. De nombreux groupes en Europe et dans le monde sont issus de la sphère d’influence de ce collectif : <a href="https://toplap.cat/en/home" rel="nofollow">TOPLAP Barcelona</a>, <a href="https://livecode.nyc/" rel="nofollow">Livecode NYC</a>, parmi d’autres. La pratique du <em>live coding</em> s’est popularisée au travers du <a href="">Manifeste TOPLAP</a> et des <a href="https://algorave.com" rel="nofollow">Algoraves</a> (<em>algorithmic rave parties</em>). Toutefois, limiter le <i>live coding</i> à ce seul phénomène culturel revient à ne prêter à attention qu’à l’arbre qui cache la forêt. Le <em>live coding</em> est une pratique ancienne, qui existe <i>a minima</i> depuis la fin des années 1980. Cette dernière s’est disséminée dans l’ensemble des arts numériques, aussi bien en <a href="https://supercollider.github.io/" rel="nofollow">musique</a> que dans les <a href="https://teddavis.org/p5live/" rel="nofollow">arts visuels</a>, le <a href="https://chuck.cs.princeton.edu/chunity/" rel="nofollow">jeu vidéo</a>, etc.',P,x,B="À propos de ce site",T,w,D='Ce site est conçu pour combler le vide qui existe aujourd’hui en France autour de ces pratiques. La communauté francophone du <em>live coding</em> ne possédait pas jusqu’à présent de site permettant aux artistes et musiciens français de se rencontrer et d’échanger facilement. Disposer d’un site dédié permet de rompre avec la nécessité de se tenir informé sans cesse sur les réseaux sociaux sous peine de manquer une information. Ce site est conçu et maintenu par <a href="https://raphaelforment.fr" rel="nofollow">Raphaël Forment</a> (BuboBubo). L’information de chacune des pages est structurée par aléatoire afin de favoriser la découverte.',j,C,F="Comment contribuer ?",M,L,E='Le site est hébergé sur <a href="https://github.com/Bubobubobubobubo/livecodingfr" rel="nofollow">GitHub</a>. Pour ajouter une information au site, veuillez créer une <a href="https://docs.github.com/fr/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request" rel="nofollow">Pull Request</a>. Vous pouvez aussi contacter l’un des artistes cités sur cette page, sur pourra se charger de relayer l’information.',z;return g=new le({props:{pictures:p[0]}}),b=new re({props:{info:"Le <i>live coding</i> est une pratique d'improvisation musicale ou visuelle centrée autour de l'utilisation des langages de programmation comme instruments, au fil de la performance. Le <em>live coder</em> partage généralement son code à l'intention du public, en le projettant sur une surface. L'objectif est de faire de la programmation un geste expressif, artistique et ouvert. Le <em>live coding</em> est une pratique souvent située au croisement entre informatique musicale, synthèse sonore, improvisation et musique algorithmique ou générative.<br><br> Cette pratique encourage une approche pluri-disciplinaire de la création artistique. Musique, visuels, jeux vidéos et danse sont souvent mêlés au cours des performances. Le <em>live coding</em>, du fait de son histoire, est aussi un domaine de réflexion critique autour de notre rapport à l'informatique, à la technologie et à la culture numérique. De nombreux <i>live coders</i> sont traversés par l'influence de la culture <i>hacker</i>, par les philosophies du logiciel libre et <i>open source</i>. Cette pratique, mécaniquement, encourage à percevoir les logiciels comme des supports <i>exploratoires</i> ou <i>conversationnels</i>, et non seulement comme de simples outils pour la création.",markdown:"false"}}),{c(){r=m(),n=f("h1"),n.textContent=i,s=m(),u=f("p"),u.innerHTML=t,c=m(),V(g.$$.fragment),k=m(),_=f("h1"),_.textContent=R,y=m(),V(b.$$.fragment),H=m(),q=f("p"),q.innerHTML=A,P=m(),x=f("h1"),x.textContent=B,T=m(),w=f("p"),w.innerHTML=D,j=m(),C=f("h1"),C.textContent=F,M=m(),L=f("p"),L.innerHTML=E,this.h()},l(e){se("svelte-si4wcq",document.head).forEach(o),r=d(e),n=h(e,"H1",{"data-svelte-h":!0}),v(n)!=="svelte-1bwy2rx"&&(n.textContent=i),s=d(e),u=h(e,"P",{"data-svelte-h":!0}),v(u)!=="svelte-2xxqt7"&&(u.innerHTML=t),c=d(e),N(g.$$.fragment,e),k=d(e),_=h(e,"H1",{"data-svelte-h":!0}),v(_)!=="svelte-z12tl4"&&(_.textContent=R),y=d(e),N(b.$$.fragment,e),H=d(e),q=h(e,"P",{"data-svelte-h":!0}),v(q)!=="svelte-6x92z0"&&(q.innerHTML=A),P=d(e),x=h(e,"H1",{"data-svelte-h":!0}),v(x)!=="svelte-9nyscp"&&(x.textContent=B),T=d(e),w=h(e,"P",{"data-svelte-h":!0}),v(w)!=="svelte-t9b3os"&&(w.innerHTML=D),j=d(e),C=h(e,"H1",{"data-svelte-h":!0}),v(C)!=="svelte-15qmnqt"&&(C.textContent=F),M=d(e),L=h(e,"P",{"data-svelte-h":!0}),v(L)!=="svelte-121svv4"&&(L.innerHTML=E),this.h()},h(){document.title="LC.FR"},m(e,l){a(e,r,l),a(e,n,l),a(e,s,l),a(e,u,l),a(e,c,l),S(g,e,l),a(e,k,l),a(e,_,l),a(e,y,l),S(b,e,l),a(e,H,l),a(e,q,l),a(e,P,l),a(e,x,l),a(e,T,l),a(e,w,l),a(e,j,l),a(e,C,l),a(e,M,l),a(e,L,l),z=!0},p:I,i(e){z||(J(g.$$.fragment,e),J(b.$$.fragment,e),z=!0)},o(e){Q(g.$$.fragment,e),Q(b.$$.fragment,e),z=!1},d(e){e&&(o(r),o(n),o(s),o(u),o(c),o(k),o(_),o(y),o(H),o(q),o(P),o(x),o(T),o(w),o(j),o(C),o(M),o(L)),Y(g,e),Y(b,e)}}}function ue(p){return[[{link:"https://ralt144mi.remigeorges.fr/Ralt144MI3.png",description:"Rémi Georges"},{link:"https://www.cookie.paris/static/bc65c5fd7f7c76dc70bcd9892dc17a4d/7c735/16.webp",description:"Azertype"},{link:"https://www.cookie.paris/static/9dbc442f1f54a41b9210b3ba1b835226/7c735/13.webp",description:"Jules Cipher"},{link:"../images/leondenise.jpeg",description:"Léon Denise"},{link:"https://renardo.org/images/screenshot1.png",description:"Renardo"},{link:"https://sardine.raphaelforment.fr/presentation/what_is_live_coding.jpeg#center",description:"Raphaël Forment"}]]}class fe extends Z{constructor(r){super(),ee(this,r,ue,ae,X,{})}}export{fe as component};