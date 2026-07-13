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
