(() => {
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const progress=document.createElement('div');progress.className='route-progress';document.body.append(progress);
 let observer,navigating=false;
 function setup(){
  const button=document.querySelector('.menu-toggle'),nav=document.querySelector('#primary-navigation');
  button?.addEventListener('click',()=>{const open=button.getAttribute('aria-expanded')!=='true';button.setAttribute('aria-expanded',String(open));nav.classList.toggle('is-open',open);});
  document.querySelectorAll('.copy-email').forEach(button=>button.addEventListener('click',async()=>{const status=document.querySelector('.email-toast');try{await navigator.clipboard.writeText(button.dataset.email);status.textContent='Email address copied';status.classList.add('visible');setTimeout(()=>status.classList.remove('visible'),3000);}catch{status.textContent=button.dataset.email;status.classList.add('visible');}}));
  document.querySelectorAll('[data-project-category]').forEach(button=>button.addEventListener('click',()=>{document.querySelectorAll('[data-project-category]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));document.querySelectorAll('[data-project-group]').forEach(g=>{g.hidden=g.dataset.projectGroup!==button.dataset.projectCategory;if(!g.hidden)g.querySelectorAll('.reveal-ready').forEach(el=>el.classList.add('is-visible'));});}));
  observer?.disconnect();
  if(!reduced.matches&&'IntersectionObserver' in window){observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-visible');observer.unobserve(e.target);}}),{threshold:.08});document.querySelectorAll('.project-card,.category-row,.feature-grid article,.experience-row').forEach(el=>{if(el.getBoundingClientRect().top>innerHeight*.9){el.classList.add('reveal-ready');observer.observe(el);}});}
 }
 async function navigate(url,pop=false){
  if(navigating)return;navigating=true;progress.classList.add('loading');
  try{const response=await fetch(url.href);if(!response.ok)throw Error('Navigation failed');const next=new DOMParser().parseFromString(await response.text(),'text/html');if(!next.querySelector('main'))throw Error('Missing page');
   const update=()=>{['.site-header','main','.site-footer'].forEach(selector=>document.querySelector(selector).replaceWith(next.querySelector(selector)));document.title=next.title;document.querySelector('meta[name="description"]').content=next.querySelector('meta[name="description"]').content;if(!pop)history.pushState({},'',url);const main=document.querySelector('main');main.setAttribute('tabindex','-1');main.focus({preventScroll:true});scrollTo({top:0,behavior:'instant'});if(url.hash)document.getElementById(decodeURIComponent(url.hash.slice(1)))?.scrollIntoView({behavior:'instant'});setup();};
   if(document.startViewTransition&&!reduced.matches)await document.startViewTransition(update).finished;else update();
  }catch{location.assign(url.href);}finally{navigating=false;progress.classList.remove('loading');}
 }
 document.addEventListener('click',event=>{const link=event.target.closest('a[href]');if(!link||event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey||link.hasAttribute('download')||link.target==='_blank')return;const url=new URL(link.href,location.href);if(url.origin!==location.origin||!['http:','https:'].includes(url.protocol)||/\.[a-z0-9]+$/i.test(url.pathname))return;if(url.pathname===location.pathname){if(!url.hash){event.preventDefault();scrollTo({top:0,behavior:reduced.matches?'instant':'smooth'});}return;}event.preventDefault();navigate(url);});
 addEventListener('popstate',()=>navigate(new URL(location.href),true));
 document.addEventListener('keydown',e=>{if(e.key==='Escape'){const b=document.querySelector('.menu-toggle');if(b?.getAttribute('aria-expanded')==='true'){b.setAttribute('aria-expanded','false');document.querySelector('#primary-navigation')?.classList.remove('is-open');b.focus();}}});
 setup();
})();
