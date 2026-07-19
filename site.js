// Menu mobile
function vxToggleMenu(){ document.querySelector('.nav-links').classList.toggle('open'); }
// Dropdown "Acessos"
function vxToggleAcessos(e){ e.stopPropagation(); document.querySelector('.acessos').classList.toggle('open'); }
document.addEventListener('click', function(){
  var a = document.querySelector('.acessos'); if(a) a.classList.remove('open');
});
// FAQ acordeão
function vxToggleFaq(el){ el.closest('.faq-item').classList.toggle('open'); }
// Máscara de telefone (XX) XXXXX-XXXX
function vxPhoneMask(el){
  var v = el.value.replace(/\D/g,'').slice(0,11);
  var out = '';
  if(v.length>0) out = '(' + v.slice(0,2);
  if(v.length>=3) out += ') ' + v.slice(2, v.length>10?7:6);
  if(v.length>=7 && v.length<=10) out += '-' + v.slice(6,10);
  else if(v.length>10) out += '-' + v.slice(7,11);
  el.value = out;
}

// Carrossel de fotos "peek" (autoplay + setas + dots) — trilho com scroll-snap
// nativo (swipe/touch e o "encaixe" no slide vêm de graça do navegador).
// Navegação via scrollBy (delta relativo) em vez de scrollTo/scrollIntoView.
// O slide ativo é recalculado a partir do scrollLeft real após cada scroll,
// então nunca perde sincronia mesmo se o snap ajustar a posição.
var vxCarousels = {};
function vxCarouselStep(track){
  var cs = getComputedStyle(track);
  var gap = parseFloat(cs.columnGap) || 0;
  return track.children[0].getBoundingClientRect().width + gap;
}
function vxCarouselCurIdx(track){
  var idx = Math.round(track.scrollLeft / vxCarouselStep(track));
  return Math.max(0, Math.min(track.children.length - 1, idx));
}
function vxCarouselGo(id, idx){
  var track = document.getElementById(id + 'Track');
  if(!track) return;
  var n = track.children.length;
  idx = ((idx % n) + n) % n;
  var delta = (idx - vxCarouselCurIdx(track)) * vxCarouselStep(track);
  track.scrollBy({left: delta, behavior:'smooth'});
  vxCarouselRestart(id);
}
function vxCarouselMove(id, dir){
  var track = document.getElementById(id + 'Track');
  if(!track) return;
  vxCarouselGo(id, vxCarouselCurIdx(track) + dir);
}
function vxCarouselRestart(id){
  clearInterval(vxCarousels[id].timer);
  vxCarousels[id].timer = setInterval(function(){ vxCarouselMove(id, 1); }, 5000);
}
function vxCarouselInit(id){
  var root = document.getElementById(id);
  var track = document.getElementById(id + 'Track');
  if(!root || !track) return;
  vxCarousels[id] = { timer: null };
  var slides = [].slice.call(track.children);
  var dots = document.querySelectorAll('#' + id + 'Dots .dot');
  var syncTimer = null;
  function sync(){
    var idx = vxCarouselCurIdx(track);
    slides.forEach(function(s, i){ s.classList.toggle('active', i === idx); });
    dots.forEach(function(d, i){ d.classList.toggle('active', i === idx); });
  }
  track.addEventListener('scroll', function(){
    clearTimeout(syncTimer);
    syncTimer = setTimeout(sync, 100);
  }, {passive:true});
  sync();
  vxCarouselRestart(id);
  root.addEventListener('mouseenter', function(){ clearInterval(vxCarousels[id].timer); });
  root.addEventListener('mouseleave', function(){ vxCarouselRestart(id); });
}
document.addEventListener('DOMContentLoaded', function(){
  if(document.getElementById('svcCarousel')) vxCarouselInit('svcCarousel');
});
