import{r as p,n as x,f as N,h as B,i as b,j as D,k as v,l as P,m as j,p as E,q as I,v as R,w as q}from"./scheduler.aZRR5A_O.js";let $=!1;function G(){$=!0}function O(){$=!1}function z(e,t,n,i){for(;e<t;){const s=e+(t-e>>1);n(s)<=i?e=s+1:t=s}return e}function U(e){if(e.hydrate_init)return;e.hydrate_init=!0;let t=e.childNodes;if(e.nodeName==="HEAD"){const r=[];for(let a=0;a<t.length;a++){const u=t[a];u.claim_order!==void 0&&r.push(u)}t=r}const n=new Int32Array(t.length+1),i=new Int32Array(t.length);n[0]=-1;let s=0;for(let r=0;r<t.length;r++){const a=t[r].claim_order,u=(s>0&&t[n[s]].claim_order<=a?s+1:z(1,s,_=>t[n[_]].claim_order,a))-1;i[r]=n[u]+1;const o=u+1;n[o]=r,s=Math.max(o,s)}const c=[],l=[];let f=t.length-1;for(let r=n[s]+1;r!=0;r=i[r-1]){for(c.push(t[r-1]);f>=r;f--)l.push(t[f]);f--}for(;f>=0;f--)l.push(t[f]);c.reverse(),l.sort((r,a)=>r.claim_order-a.claim_order);for(let r=0,a=0;r<l.length;r++){for(;a<c.length&&l[r].claim_order>=c[a].claim_order;)a++;const u=a<c.length?c[a]:null;e.insertBefore(l[r],u)}}function V(e,t){if($){for(U(e),(e.actual_end_child===void 0||e.actual_end_child!==null&&e.actual_end_child.parentNode!==e)&&(e.actual_end_child=e.firstChild);e.actual_end_child!==null&&e.actual_end_child.claim_order===void 0;)e.actual_end_child=e.actual_end_child.nextSibling;t!==e.actual_end_child?(t.claim_order!==void 0||t.parentNode!==e)&&e.insertBefore(t,e.actual_end_child):e.actual_end_child=t.nextSibling}else(t.parentNode!==e||t.nextSibling!==null)&&e.appendChild(t)}function W(e,t,n){e.insertBefore(t,n||null)}function F(e,t,n){$&&!n?V(e,t):(t.parentNode!==e||t.nextSibling!=n)&&e.insertBefore(t,n||null)}function m(e){e.parentNode&&e.parentNode.removeChild(e)}function ne(e,t){for(let n=0;n<e.length;n+=1)e[n]&&e[n].d(t)}function S(e){return document.createElement(e)}function H(e){return document.createElementNS("http://www.w3.org/2000/svg",e)}function g(e){return document.createTextNode(e)}function ie(){return g(" ")}function se(){return g("")}function re(e,t,n,i){return e.addEventListener(t,n,i),()=>e.removeEventListener(t,n,i)}function le(e,t,n){n==null?e.removeAttribute(t):e.getAttribute(t)!==n&&e.setAttribute(t,n)}function ae(e){return e.dataset.svelteH}function J(e){return Array.from(e.childNodes)}function L(e){e.claim_info===void 0&&(e.claim_info={last_index:0,total_claimed:0})}function C(e,t,n,i,s=!1){L(e);const c=(()=>{for(let l=e.claim_info.last_index;l<e.length;l++){const f=e[l];if(t(f)){const r=n(f);return r===void 0?e.splice(l,1):e[l]=r,s||(e.claim_info.last_index=l),f}}for(let l=e.claim_info.last_index-1;l>=0;l--){const f=e[l];if(t(f)){const r=n(f);return r===void 0?e.splice(l,1):e[l]=r,s?r===void 0&&e.claim_info.last_index--:e.claim_info.last_index=l,f}}return i()})();return c.claim_order=e.claim_info.total_claimed,e.claim_info.total_claimed+=1,c}function M(e,t,n,i){return C(e,s=>s.nodeName===t,s=>{const c=[];for(let l=0;l<s.attributes.length;l++){const f=s.attributes[l];n[f.name]||c.push(f.name)}c.forEach(l=>s.removeAttribute(l))},()=>i(t))}function ce(e,t,n){return M(e,t,n,S)}function fe(e,t,n){return M(e,t,n,H)}function K(e,t){return C(e,n=>n.nodeType===3,n=>{const i=""+t;if(n.data.startsWith(i)){if(n.data.length!==i.length)return n.splitText(i.length)}else n.data=i},()=>g(t),!0)}function oe(e){return K(e," ")}function A(e,t,n){for(let i=n;i<e.length;i+=1){const s=e[i];if(s.nodeType===8&&s.textContent.trim()===t)return i}return-1}function ue(e,t){const n=A(e,"HTML_TAG_START",0),i=A(e,"HTML_TAG_END",n+1);if(n===-1||i===-1)return new y(t);L(e);const s=e.splice(n,i-n+1);m(s[0]),m(s[s.length-1]);const c=s.slice(1,s.length-1);if(c.length===0)return new y(t);for(const l of c)l.claim_order=e.claim_info.total_claimed,e.claim_info.total_claimed+=1;return new y(t,c)}function de(e,t){t=""+t,e.data!==t&&(e.data=t)}function _e(e,t,n,i){n==null?e.style.removeProperty(t):e.style.setProperty(t,n,i?"important":"")}function he(e,t){const n=[];let i=0;for(const s of t.childNodes)if(s.nodeType===8){const c=s.textContent.trim();c===`HEAD_${e}_END`?(i-=1,n.push(s)):c===`HEAD_${e}_START`&&(i+=1,n.push(s))}else i>0&&n.push(s);return n}class Q{is_svg=!1;e=void 0;n=void 0;t=void 0;a=void 0;constructor(t=!1){this.is_svg=t,this.e=this.n=null}c(t){this.h(t)}m(t,n,i=null){this.e||(this.is_svg?this.e=H(n.nodeName):this.e=S(n.nodeType===11?"TEMPLATE":n.nodeName),this.t=n.tagName!=="TEMPLATE"?n:n.content,this.c(t)),this.i(i)}h(t){this.e.innerHTML=t,this.n=Array.from(this.e.nodeName==="TEMPLATE"?this.e.content.childNodes:this.e.childNodes)}i(t){for(let n=0;n<this.n.length;n+=1)W(this.t,this.n[n],t)}p(t){this.d(),this.h(t),this.i(this.a)}d(){this.n.forEach(m)}}class y extends Q{l=void 0;constructor(t=!1,n){super(t),this.e=this.n=null,this.l=n}c(t){this.l?this.n=this.l:super.c(t)}i(t){for(let n=0;n<this.n.length;n+=1)F(this.t,this.n[n],t)}}function me(e,t){return new e(t)}const h=new Set;let d;function pe(){d={r:0,c:[],p:d}}function $e(){d.r||p(d.c),d=d.p}function X(e,t){e&&e.i&&(h.delete(e),e.i(t))}function ye(e,t,n,i){if(e&&e.o){if(h.has(e))return;h.add(e),d.c.push(()=>{h.delete(e),i&&(n&&e.d(1),i())}),e.o(t)}else i&&i()}function xe(e){e&&e.c()}function ge(e,t){e&&e.l(t)}function Y(e,t,n){const{fragment:i,after_update:s}=e.$$;i&&i.m(t,n),v(()=>{const c=e.$$.on_mount.map(I).filter(b);e.$$.on_destroy?e.$$.on_destroy.push(...c):p(c),e.$$.on_mount=[]}),s.forEach(v)}function Z(e,t){const n=e.$$;n.fragment!==null&&(P(n.after_update),p(n.on_destroy),n.fragment&&n.fragment.d(t),n.on_destroy=n.fragment=null,n.ctx=[])}function k(e,t){e.$$.dirty[0]===-1&&(R.push(e),q(),e.$$.dirty.fill(0)),e.$$.dirty[t/31|0]|=1<<t%31}function Te(e,t,n,i,s,c,l=null,f=[-1]){const r=j;E(e);const a=e.$$={fragment:null,ctx:[],props:c,update:x,not_equal:s,bound:N(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(t.context||(r?r.$$.context:[])),callbacks:N(),dirty:f,skip_bound:!1,root:t.target||r.$$.root};l&&l(a.root);let u=!1;if(a.ctx=n?n(e,t.props||{},(o,_,...T)=>{const w=T.length?T[0]:_;return a.ctx&&s(a.ctx[o],a.ctx[o]=w)&&(!a.skip_bound&&a.bound[o]&&a.bound[o](w),u&&k(e,o)),_}):[],a.update(),u=!0,p(a.before_update),a.fragment=i?i(a.ctx):!1,t.target){if(t.hydrate){G();const o=J(t.target);a.fragment&&a.fragment.l(o),o.forEach(m)}else a.fragment&&a.fragment.c();t.intro&&X(e.$$.fragment),Y(e,t.target,t.anchor),O(),B()}E(r)}class we{$$=void 0;$$set=void 0;$destroy(){Z(this,1),this.$destroy=x}$on(t,n){if(!b(n))return x;const i=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return i.push(n),()=>{const s=i.indexOf(n);s!==-1&&i.splice(s,1)}}$set(t){this.$$set&&!D(t)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}const ee="4";typeof window<"u"&&(window.__svelte||(window.__svelte={v:new Set})).v.add(ee);export{he as A,ne as B,ue as C,H as D,fe as E,y as H,we as S,F as a,$e as b,oe as c,X as d,se as e,m as f,S as g,ce as h,Te as i,J as j,le as k,_e as l,g as m,K as n,de as o,pe as p,me as q,xe as r,ie as s,ye as t,ge as u,Y as v,Z as w,ae as x,V as y,re as z};