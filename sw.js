const CACHE_NAME = 'people-manager-v1';
const urlsToCache = [
  '.',
  'index.html',
  'manifest.json',
  'https://cdn.jsdelivr.net/npm/fuse.js@7.0.0'
];

// ইন্সটল ইভেন্ট – ক্যাশে ফাইল যোগ
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// ফেচ ইভেন্ট – অফলাইনে ক্যাশ থেকে দেখাবে
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) return response;
        return fetch(event.request);
      })
  );
});

// পুরনো ক্যাশ মুছে নতুন ভার্সন নেওয়া
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
