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
  const configs=[
    {id:1,file:'routes/trazo-real-1.svg',width:1870,height:1201,
     anchor:{x:862,y:265,lat:-17.78329,lon:-63.18212},latPixel:0.00001105,lonPixel:0.0000108,
     extent:{left:262,top:475,right:854,bottom:788},start:[842,615],end:[298,783],
     color:'#bf803b',label:'Recorrido 01'},
    {id:2,file:'routes/trazo-real-2.svg',width:2048,height:953,
     anchor:{x:676,y:712,lat:-17.78329,lon:-63.18212},latPixel:0.00000708,lonPixel:0.00000756,
     extent:{left:265,top:375,right:1888,bottom:680},start:[1881,525],end:[350,388],
     color:'#307f7a',label:'Recorrido 02'}
  ];
  function point(c,x,y){return L.latLng(c.anchor.lat-(y-c.anchor.y)*c.latPixel,c.anchor.lon+(x-c.anchor.x)*c.lonPixel);}
  const layers={};const allBounds=L.latLngBounds([]);
  configs.forEach(c=>{
    const bounds=L.latLngBounds(point(c,0,c.height),point(c,c.width,0));
    const img=L.imageOverlay(c.file,bounds,{opacity:0.95,interactive:false});
    const group=L.layerGroup([img]);
    const endMarkers=[['INICIO',c.start],['FINAL',c.end]];
    endMarkers.forEach(([name,p])=>{
      L.circleMarker(point(c,p[0],p[1]),{radius:6,weight:2,color:'#171918',fillColor:c.color,fillOpacity:1})
       .bindTooltip(c.label+' · '+name+' (referencia aproximada)',{direction:'top'})
       .addTo(group);
    });
    layers[c.id]=group;
    const e=c.extent;const b=L.latLngBounds(point(c,e.left,e.bottom),point(c,e.right,e.top));
    c.bounds=b;
    allBounds.extend(b);
    group.addTo(map);
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