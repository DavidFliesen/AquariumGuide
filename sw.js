const CACHE = 'the-aquarium-guide-v11';
const ASSETS = [
  './',
  './index.html',
  './styles.css',
  './app.js',
  './manifest.webmanifest',
  './assets/logo-mark-transparent.png',
  './assets/logo-full-transparent.png',
  './assets/sca-map-june-2026.jpg',
  './assets/sca-map-june-2026-dark.jpg',
  './assets/mountain-forest-transparent.png',
  './assets/piedmont-transparent.png',
  './assets/touch-tank-transparent.png',
  './assets/saltmarsh-aviary-transparent.png',
  './assets/great-ocean-tank-transparent.png',
  './assets/jurassic-seas-transparent.png',
  './assets/sea-turtle-care-center-transparent.png',
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
