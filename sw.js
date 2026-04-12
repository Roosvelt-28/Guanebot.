const CACHE = 'guanebot-v1';

const ARCHIVOS = [
  '/',
  '/index.html',
  '/libs/three.min.js',
  '/img/JxI7cze.jpeg',
  '/img/4mZLQ6j.jpeg',
  '/img/yzmvv7y.jpeg',
  '/img/XqwLyl2.jpeg',
  '/img/lASNZTl.jpeg',
  '/img/cakf0Uj.jpeg',
  '/img/Wuxw1sb.jpeg',
  '/img/PVIORGN.jpeg',
  '/img/ykFiDP0.jpeg',
  '/img/VuUL3ku.jpeg',
  '/img/8c64hZs.jpeg',
  '/img/u58BhK3.jpeg',
  '/img/d7P5dwZ.jpeg',
  '/img/f9LrIVQ.jpeg',
  '/img/X8deq1O.jpeg',
  '/img/NZA6b8y.jpeg',
  '/img/F9tvEGS.jpeg',
  '/img/VSjgnYO.jpeg',
  '/img/1cj9mzr.jpeg',
  '/img/qc0ZWRO.jpeg',
  '/img/hO3kfsn.jpeg',
  '/img/0spcVVu.jpeg',
  '/img/Q0nPfwB.jpeg',
  '/img/RG6Hl3P.jpeg',
];

// Instalar: guardar todo en caché
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(ARCHIVOS))
  );
  self.skipWaiting();
});

// Activar: borrar cachés viejas
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch: responder desde caché, si no hay internet
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => {
      return cached || fetch(e.request).catch(() => cached);
    })
  );
});
