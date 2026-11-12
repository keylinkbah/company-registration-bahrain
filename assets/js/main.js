(function(){
'use strict';
// Benefits accordion: one open at a time
var accBtns=document.querySelectorAll('button[aria-controls][data-state]');
function setAcc(b,open){var r=document.getElementById(b.getAttribute('aria-controls'));
  var st=open?'open':'closed';b.setAttribute('data-state',st);b.setAttribute('aria-expanded',String(open));
  var item=b.closest('[data-orientation][data-state]:not(button):not(h3)');if(item&&item!==r)item.setAttribute('data-state',st);
  if(r){r.setAttribute('data-state',st);r.hidden=!open;}}
accBtns.forEach(function(btn){btn.addEventListener('click',function(){
  var open=btn.getAttribute('data-state')==='open';accBtns.forEach(function(b){setAcc(b,false);});if(!open)setAcc(btn,true);});});

// FAQ: one open at a time (fallback for browsers without <details name>)
var faqs=document.querySelectorAll('details[name="faq"]');
faqs.forEach(function(d){d.addEventListener('toggle',function(){if(d.open)faqs.forEach(function(o){if(o!==d)o.open=false;});});});

// Mobile hamburger menu
var btn=document.querySelector('button[aria-controls="mobile-navigation"]');
var nav=document.getElementById('mobile-navigation');
if(btn&&nav){
  var MENU='<path d="M4 5h16"></path><path d="M4 12h16"></path><path d="M4 19h16"></path>';
  var CLOSE='<path d="M18 6 6 18"></path><path d="m6 6 12 12"></path>';
  var icon=btn.querySelector('svg');
  function isOpen(){return btn.getAttribute('aria-expanded')==='true';}
  function setMenu(open,focusBtn){
    btn.setAttribute('aria-expanded',String(open));
    btn.setAttribute('aria-label',open?'Close navigation':'Open navigation');
    nav.hidden=!open;nav.classList.toggle('is-open',open);
    document.documentElement.classList.toggle('menu-open',open);
    if(icon)icon.innerHTML=open?CLOSE:MENU;
    if(open){var f=nav.querySelector('a');if(f)f.focus();}
    else if(focusBtn)btn.focus();
  }
  btn.addEventListener('click',function(e){e.stopPropagation();setMenu(!isOpen());});
  nav.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){setMenu(false);});});
  document.addEventListener('keydown',function(e){
    if(!isOpen())return;
    if(e.key==='Escape'){setMenu(false,true);return;}
    if(e.key==='Tab'){var l=nav.querySelectorAll('a');var first=btn,last=l[l.length-1];
      if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}
      else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}}
  });
  document.addEventListener('click',function(e){if(isOpen()&&!nav.contains(e.target)&&!btn.contains(e.target))setMenu(false);});
  var mq=window.matchMedia('(min-width: 1280px)');
  (mq.addEventListener?mq.addEventListener.bind(mq,'change'):mq.addListener.bind(mq))(function(m){if(m.matches)setMenu(false);});
}

// Smooth in-page scrolling with header offset (respects reduced motion)
var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
document.querySelectorAll('a[href^="#"]').forEach(function(a){a.addEventListener('click',function(e){
  var id=a.getAttribute('href').slice(1);if(!id)return;var t=document.getElementById(id);if(!t)return;
  e.preventDefault();var h=document.querySelector('header');var off=h?h.offsetHeight:0;
  window.scrollTo({top:t.getBoundingClientRect().top+window.pageYOffset-off-8,behavior:reduce?'auto':'smooth'});
  history.replaceState(null,'','#'+id);
  if(!t.hasAttribute('tabindex'))t.setAttribute('tabindex','-1');t.focus({preventScroll:true});
});});
})();
