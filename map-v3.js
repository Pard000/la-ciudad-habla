// Georreferenciación provisional de los croquis del autor (NO es seguimiento GPS).
// Referencias: plaza 24 de Septiembre, Centro Comercial 7 Calles y Plaza Ñuflo de Chávez.
// Ajustar estas transformaciones tras validar cruces y puntos exactos sobre mapa.
(function(){
  const el=document.getElementById('geo-route-map');
  if(!el)return;
  if(typeof L==='undefined'){el.textContent='El mapa no pudo cargarse. Consulta el índice de ubicaciones a la derecha.';return;}
  const map=L.map(el,{scrollWheelZoom:false,zoomControl:true,preferCanvas:true});
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{
    maxZoom:19,attribution:'&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> contributors'
  }).addTo(map);
  // Recorrido 02: punto inicial corregido en la intersección señalada en azul en el croquis actualizado.
  // La imagen del trazado no se ha recalibrado por GPS: sus coordenadas siguen siendo provisionales.
  // Actualización 2026-11-14: inicio 01 sobre la esquina superior derecha indicada por el autor.
  // Los 25 marcadores de las fotografías corresponden a coordenadas aportadas en 2026-11-15.
  const configs=[
    {id:1,file:'routes/trazo-real-1.svg',width:1870,height:1201,
     anchor:{x:862,y:265,lat:-17.78329,lon:-63.18212},latPixel:0.00001105,lonPixel:0.0000108,
     extent:{left:262,top:475,right:854,bottom:788},start:[774,511],end:[298,783],
     color:'#bf803b',label:'Recorrido 01'},
    {id:2,file:'routes/trazo-real-2.svg',width:2048,height:953,
     anchor:{x:676,y:712,lat:-17.78329,lon:-63.18212},latPixel:0.00000708,lonPixel:0.00000756,
     extent:{left:265,top:375,right:1888,bottom:680},start:[732,630],end:[350,388],
     color:'#d52b38',label:'Recorrido 02'}
  ];
  function point(c,x,y){return L.latLng(c.anchor.lat-(y-c.anchor.y)*c.latPixel,c.anchor.lon+(x-c.anchor.x)*c.lonPixel);}
  const layers={};const allBounds=L.latLngBounds([]);
  configs.forEach(c=>{
    const bounds=L.latLngBounds(point(c,0,c.height),point(c,c.width,0));
    const img=L.imageOverlay(c.file,bounds,{opacity:1,interactive:false,className:'route-overlay'});
    const group=L.layerGroup([img]);
    const endMarkers=[['INICIO',c.start],['FINAL',c.end]];
    endMarkers.forEach(([name,p])=>{
      L.circleMarker(point(c,p[0],p[1]),{radius:8,weight:3,color:'#fffdf7',fillColor:'#171918',fillOpacity:1})
       .bindTooltip(c.label+' · '+name+' (referencia aproximada)',{direction:'top',permanent:true,offset:[0,-8],className:'route-end-label'})
       .addTo(group);
    });
    layers[c.id]=group;
    const e=c.extent;const b=L.latLngBounds(point(c,e.left,e.bottom),point(c,e.right,e.top));
    c.bounds=b;
    allBounds.extend(b);
    group.addTo(map);
  });

  // 25 fotografías con coordenadas aportadas por el autor; 24 ubicaciones únicas.
  // Los marcadores NO se ajustan artificialmente al recorrido dibujado.
  // Dos fotografías que comparten coordenadas se abren desde un marcador conjunto.
  const stops=new Map();
  pieces.forEach(p=>{
    if(!Number.isFinite(p.lat)||!Number.isFinite(p.lng))return;
    const key=p.route+'|'+p.lat.toFixed(7)+'|'+p.lng.toFixed(7);
    if(!stops.has(key))stops.set(key,[]);
    stops.get(key).push(p);
  });
  function link(label,url){
    const a=document.createElement('a');
    a.textContent=label;
    a.href=url;
    a.target='_blank';
    a.rel='noopener noreferrer';
    return a;
  }
  function popupFor(stopsAtPoint){
    const popup=document.createElement('div');
    popup.className='photo-map-popup';
    const top=document.createElement('div');
    top.className='photo-map-popup-head';
    top.textContent=stopsAtPoint.length>1?'DOS REGISTROS EN ESTE PUNTO':'REGISTRO FOTOGRÁFICO';
    popup.append(top);
    stopsAtPoint.forEach(p=>{
      const entry=document.createElement('article');
      entry.className='photo-map-entry';
      const preview=document.createElement('img');
      preview.className='photo-map-thumb';
      preview.src=p.image;
      preview.alt='Fotografía '+String(p.id).padStart(2,'0')+': '+p.title;
      preview.loading='lazy';
      entry.append(preview);
      const meta=document.createElement('div');
      meta.className='photo-map-meta';
      const title=document.createElement('strong');
      title.textContent=String(p.id).padStart(2,'0')+' / '+p.title;
      meta.append(title);
      const route=document.createElement('span');
      route.className='photo-map-route';
      route.textContent='RECORRIDO '+String(p.route).padStart(2,'0');
      meta.append(route);
      const view=document.createElement('button');
      view.type='button';
      view.className='photo-map-open';
      view.textContent='Abrir ficha fotográfica ↗';
      view.addEventListener('click',()=>openPiece(p.id));
      meta.append(view);
      entry.append(meta);
      const actions=document.createElement('div');
      actions.className='photo-map-actions';
      if(p.locationUrl)actions.append(link('Ubicación actual ↗',p.locationUrl));
      if(p.historicalUrl)actions.append(link('Street View histórico ↗',p.historicalUrl));
      entry.append(actions);
      popup.append(entry);
    });
    return popup;
  }
  stops.forEach(group=>{
    const p=group[0];
    const label=group.map(x=>String(x.id).padStart(2,'0')).join('+');
    const multi=group.length>1;
    const size=multi?63:36;
    const icon=L.divIcon({
      className:'photo-map-pin photo-map-pin-r'+p.route+(multi?' photo-map-pin-multi':''),
      html:'<span>'+label+'</span>',
      iconSize:[size,36],
      iconAnchor:[size/2,18],
      popupAnchor:[0,-22]
    });
    const marker=L.marker([p.lat,p.lng],{
      icon,
      keyboard:true,
      alt:'Abrir fotografía '+label+' de recorrido '+p.route,
      title:group.map(x=>x.title).join(' / '),
      riseOnHover:true
    });
    marker.bindPopup(popupFor(group),{minWidth:250,maxWidth:320,autoPanPadding:[20,20],keepInView:true});
    marker.addTo(layers[p.route]);
    configs[p.route-1].bounds.extend([p.lat,p.lng]);
    allBounds.extend([p.lat,p.lng]);
  });

  function show(mode){
    configs.forEach(c=>{
      if(mode==='all'||Number(mode)===c.id){if(!map.hasLayer(layers[c.id]))layers[c.id].addTo(map)}
      else if(map.hasLayer(layers[c.id]))map.removeLayer(layers[c.id]);
    });
    map.fitBounds(mode==='all'?allBounds:configs[Number(mode)-1].bounds,{padding:[30,30],maxZoom:17});
    document.querySelectorAll('.map-toggle').forEach(b=>{const active=b.dataset.mapRoute===mode;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active));});
  }
  document.querySelectorAll('.map-toggle').forEach(b=>b.addEventListener('click',()=>show(b.dataset.mapRoute)));
  show('all');
  setTimeout(()=>map.invalidateSize(),0);
})();