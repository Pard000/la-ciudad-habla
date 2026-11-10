# La ciudad habla — Exposición digital

Prototipo público de la investigación fotográfica documental de Alexander Pardo sobre los mensajes inscritos en fachadas y soportes del Casco Viejo de Santa Cruz de la Sierra.

## Estado
**Prototipo estructural.** Tiene 25 fichas (8 del primer recorrido, 17 del segundo), filtros, navegación, introducción curatorial, sección de investigación y espacios para mapas y archivo temporal. Las fotografías originales y los recorridos reales aún deben incorporarse.

## Archivos
- `index.html`: estructura completa de la exposición.
- `styles.css`: diseño editorial y adaptación a celulares.
- `data.js`: catálogo de las 25 fichas. Aquí se editan los datos y rutas de imágenes.
- `app.js`: interactividad de galería, filtros y fichas.
- `images/`: carpeta prevista para las 25 fotografías propias.

## Añadir fotografías
Las 25 fichas están conectadas a `images/la-ciudad-habla-imagenes-web/01.webp` hasta `images/la-ciudad-habla-imagenes-web/25.webp`, porque las imágenes se subieron dentro de esa subcarpeta. No es necesario volver a subirlas ni editar código. Los originales se conservan aparte. Los archivos optimizados pesan aproximadamente 8,4 MB en conjunto y preservan la composición.

## Enlaces históricos
Investigar Street View para las 25 ubicaciones; se han documentado seis referencias de 2014–2015. Los campos `historicalUrl` permanecerán vacíos hasta verificar enlaces y derechos. Los vínculos de búsqueda por dirección NO garantizan abrir el año histórico seleccionado. Evitar reutilizar capturas de Street View fuera de los métodos autorizados por Google.

## Mapas
La gráfica actual es un marcador editorial, no una representación geográfica. Solo publicar rutas reales una vez reconstruidos los dos caminos. El mapa interactivo se integrará mediante un enlace o inserción oficial de My Maps.

## Publicar
GitHub → Settings → Pages → Build and deployment → Deploy from a branch → `main` → `/(root)` → Save. Al finalizar: https://pard000.github.io/la-ciudad-habla/

## Uso
Fotografías originales © Alexander Pardo. La investigación y los textos se someten a revisión curatorial antes de la publicación definitiva.
