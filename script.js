const toggle=document.querySelector('.menu-toggle');
const nav=document.querySelector('#site-nav');
if(toggle&&nav){
  toggle.addEventListener('click',()=>{
    const open=nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded',String(open));
  });
  nav.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded','false');
  }));
  document.addEventListener('keydown',event=>{
    if(event.key==='Escape'&&nav.classList.contains('open')){
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded','false');
      toggle.focus();
    }
  });
}
const observer=('IntersectionObserver' in window)&&!window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ?new IntersectionObserver(entries=>entries.forEach(entry=>{
    if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}
  }),{threshold:0.08}) : null;
if(observer)document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
else document.querySelectorAll('.reveal').forEach(el=>el.classList.add('visible'));
