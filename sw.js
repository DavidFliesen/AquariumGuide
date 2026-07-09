const CACHE = 'the-aquarium-guide-v10';
const ASSETS = [
  './',
  './index.html',
  './styles.css',
  './app.js',
  './manifest.webmanifest',
  './assets/logo-mark.jpg',
  './assets/logo-full.jpg',
  './assets/logo-mark-dark.jpg',
  './assets/logo-full-dark.jpg',
  './assets/sca-map-june-2026.jpg',
  './assets/sca-map-june-2026-dark.jpg',
  './assets/mountain-forest.png',
  './assets/mountain-forest-dark.jpg',
  './assets/piedmont.png',
  './assets/piedmont-dark.jpg',
  './assets/touch-tank.png',
  './assets/touch-tank-dark.jpg',
  './assets/saltmarsh-aviary.png',
  './assets/saltmarsh-aviary-dark.jpg',
  './assets/great-ocean-tank.png',
  './assets/great-ocean-tank-dark.jpg',
  './assets/jurassic-seas.png',
  './assets/jurassic-seas-dark.jpg',
  './assets/sea-turtle-care-center.png',
  './assets/sea-turtle-care-center-dark.jpg',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/apple-touch-icon.png',
  './icons/icon-192-light.png',
  './icons/icon-512-light.png',
  './icons/apple-touch-icon-light.png'
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
