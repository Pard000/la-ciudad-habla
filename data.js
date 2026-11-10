// Archivo documental editable. Las imágenes históricas se consultan en Google Street View.
const pieces = [
['Casa en venta',1],['Importadora Renata',1],['Foto en 1 minuto',1],['Casa Martínez',1],['Aviso judicial',1],['Parqueo público',1],['Señales de parqueo',1],['Pan casero',1],
['Parqueo Richard',2,'15 Arenales','Enero de 2015','La rotulación amarilla actual no aparece en el registro histórico.'],
['Parqueo público',2],['Librería La Solución',2],
['Servicio técnico de computadoras',2,'368 calle Arenales','Enero de 2015','Se observan cambios en la comunicación comercial de este sector; la correspondencia entre locales requiere verificación.'],
['Creando Sonrisas',2,'421 calle Arenales','Enero de 2015','La inscripción roja actual no aparece en el registro histórico.'],
['Inscripciones antiguas y desgastadas',2],['Baño y ducha',2],['Aboflor',2],
['Estudio jurídico / Abogado',2,'401 Bolívar','Diciembre de 2014','La función comunicativa jurídica es reconocible en ambos registros.'],
['Vegetariano Su Salud',2,'125 calle Quijarro','Diciembre de 2014','La inscripción comercial permanece; cambian algunos elementos de la fachada.'],
['Snack Virgen de Cotoca',2],['Venta de ocasión / Parqueo',2],['Café y Chisme',2],['Parqueo / Contratos',2],['Ferretería Bazar Hércules',2],
['Cotillón Frutillita',2,'214 Buenos Aires','Diciembre de 2014','El nombre y los elementos decorativos aparecen en ambos registros.'],
['Hamburguesa',2]
].map(([title,route,address='',historicalDate='',observation=''],i)=>({
 id:i+1,title,route,address,historicalDate,observation,
 image:`images/la-ciudad-habla-imagenes-web/${String(i+1).padStart(2,'0')}.webp`,historicalUrl:'',date:'2026',transcription:'',notes:''
}));
