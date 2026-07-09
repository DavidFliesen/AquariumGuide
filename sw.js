const CACHE = 'the-aquarium-guide-v15';
const ASSETS = [
  './',
  './index.html',
  './styles.css',
  './app.js',
  './manifest.webmanifest',
  './assets/logo-mark.png',
  './assets/logo-full.png',
  './assets/sca-map-june-2026.jpg',
  './assets/sca-map-june-2026-dark.jpg',
  './assets/mountain-forest-panel.jpg',
  './assets/mountain-forest-panel-light.jpg',
  './assets/piedmont-panel.jpg',
  './assets/piedmont-panel-light.jpg',
  './assets/touch-tank-panel.jpg',
  './assets/touch-tank-panel-light.jpg',
  './assets/saltmarsh-aviary-panel.jpg',
  './assets/saltmarsh-aviary-panel-light.jpg',
  './assets/great-ocean-tank-panel.jpg',
  './assets/great-ocean-tank-panel-light.jpg',
  './assets/jurassic-seas-panel.jpg',
  './assets/jurassic-seas-panel-light.jpg',
  './assets/sea-turtle-care-center-panel.jpg',
  './assets/sea-turtle-care-center-panel-light.jpg',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/apple-touch-icon.png'
];


self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(ASSETS)));
});

self.addEventListener('activate', event => {
  event.waitUntil((async()=>{
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  event.respondWith(caches.match(event.request).then(cached => cached || fetch(event.request).catch(() => caches.match('./index.html'))));
});
