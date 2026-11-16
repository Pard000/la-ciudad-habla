const gallery=document.getElementById('gallery');
const dialog=document.getElementById('detail');let current=1;
const pad=n=>String(n).padStart(2,'0');
function placeholder(p){const d=document.createElement('div');d.className='placeholder';d.innerHTML='<span class="placeholder-label">REGISTRO / '+pad(p.id)+' / 2026</span><span class="placeholder-number">'+pad(p.id)+'</span><span class="placeholder-label">FOTOGRAFÍA PENDIENTE</span>';return d}
function photo(p,cls='piece-img'){if(!p.image)return placeholder(p);const img=document.createElement('img');img.className=cls;img.src=p.image;img.alt='Fotografía documental '+pad(p.id)+': '+p.title;img.loading='lazy';img.onerror=()=>img.replaceWith(placeholder(p));return img}
function renderGallery(filter='all'){gallery.replaceChildren();pieces.filter(p=>filter==='all'||p.route===Number(filter)).forEach(p=>{const card=document.createElement('button');card.type='button';card.className='piece';card.setAttribute('aria-label','Abrir fotografía '+pad(p.id)+': '+p.title);card.append(photo(p));const meta=document.createElement('div');meta.className='piece-meta';const num=document.createElement('div');num.className='piece-num';num.textContent=pad(p.id);const wrap=document.createElement('div');const heading=document.createElement('h3');heading.className='piece-title';heading.textContent=p.title;const route=document.createElement('div');route.className='piece-route';route.textContent='RECORRIDO '+pad(p.route)+' · '+(p.historicalDate.includes('2015')?'2015':'2014')+' / 2026';wrap.append(heading,route);meta.append(num,wrap);card.append(meta);card.addEventListener('click',()=>openPiece(p.id));gallery.append(card)})}
function setText(id,v){document.getElementById(id).textContent=v}

function openPiece(id){
  const p=pieces[id-1];if(!p)return;current=id;
  setText('detail-index','FICHA '+pad(id)+' / 25');
  setText('detail-route','RECORRIDO '+pad(p.route)+' · SANTA CRUZ DE LA SIERRA');
  setText('detail-title',p.title);
  setText('detail-address',p.address||'Casco Viejo · Santa Cruz de la Sierra');
  document.getElementById('detail-photo').replaceChildren(photo(p));
  setText('detail-era-old',p.historicalDate);
  setText('detail-focus',p.historicalFocus);
  setText('detail-observation',p.historicalComparison);
  setText('detail-source-status',p.historicalLinkStatus==='verified-by-author'
    ?'STREET VIEW · ENLACE HISTÓRICO COMPROBADO'
    :'STREET VIEW · FECHA DOCUMENTADA POR EL AUTOR');
  const links=document.getElementById('detail-links');links.replaceChildren();
  function addLink(label,url,cls){
    if(!url)return;const a=document.createElement('a');a.href=url;a.target='_blank';
    a.rel='noopener noreferrer';a.className=cls;a.textContent=label;links.append(a);
  }
  addLink('Explorar Street View · '+p.historicalDate+' ↗',p.historicalUrl,'history-link-primary');
  addLink('Ver ubicación actual en Google Maps ↗',p.locationUrl,'history-link-secondary');
  if(!dialog.open)dialog.showModal();
}
document.querySelectorAll('.filter').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('.filter').forEach(x=>{x.classList.remove('active');x.setAttribute('aria-pressed','false')});b.classList.add('active');b.setAttribute('aria-pressed','true');renderGallery(b.dataset.filter)}));
document.querySelectorAll('[data-goto-route]').forEach(b=>b.addEventListener('click',()=>{document.querySelector('.filter[data-filter="'+b.dataset.gotoRoute+'"]').click();document.getElementById('archivo').scrollIntoView({behavior:'smooth'})}));
document.getElementById('close-detail').onclick=()=>dialog.close();
document.getElementById('prev-detail').onclick=()=>openPiece(current===1?25:current-1);
document.getElementById('next-detail').onclick=()=>openPiece(current===25?1:current+1);
dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close()});
function renderRouteIndex(){document.querySelectorAll('[data-route-index]').forEach(container=>{const route=Number(container.dataset.routeIndex);container.replaceChildren();pieces.filter(p=>p.route===route).forEach(p=>{const li=document.createElement('li');li.className='route-stop';const span=document.createElement('span');span.className='route-stop-name';span.textContent=pad(p.id)+' · '+p.title;const a=document.createElement('a');a.href=p.historicalUrl;a.target='_blank';a.rel='noopener noreferrer';a.textContent='Street View ↗';const currentLink=document.createElement('a');currentLink.href=p.locationUrl;currentLink.target='_blank';currentLink.rel='noopener noreferrer';currentLink.textContent='Mapa actual ↗';const actions=document.createElement('span');actions.className='route-stop-actions';actions.append(currentLink,a);li.append(span,actions);container.append(li)})})}

document.querySelectorAll('[data-open-piece]').forEach(b=>{
  b.addEventListener('click',()=>openPiece(Number(b.dataset.openPiece)));
});
dialog.addEventListener('keydown',e=>{
  if(e.key==='ArrowLeft'){e.preventDefault();openPiece(current===1?25:current-1);}
  if(e.key==='ArrowRight'){e.preventDefault();openPiece(current===25?1:current+1);}
});
renderRouteIndex();
renderGallery();
