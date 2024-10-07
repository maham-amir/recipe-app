
/// <reference lib="webworker" />

const CACHE_NAME = 'recipes-cache';

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Opened cache');
      return cache.addAll(['/', 'https://dummyjson.com/recipes?select=name']);
    })
  );
});

self.addEventListener('fetch', (event) => {
  const url = event.request.url;

  // Log the request URL for debugging
  console.log('Fetching:', url);

  if (url.includes('dummyjson.com/recipes')) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) {
          console.log('Returning cached response for:', url);
          return cachedResponse; // Return cached response if available
        }

        console.log('Fetching from network:', url);
        return fetch(event.request).then((response) => {
          // Check if the response is valid
          if (!response || response.status !== 200) {
            console.log('Response not valid, returning:', response);
            return response; // Return original response if not valid
          }

          const responseToCache = response.clone(); // Clone response for caching

          caches.open(CACHE_NAME).then((cache) => {
            console.log('Caching response:', url);
            cache.put(event.request, responseToCache); // Cache the response
          });

          return response; // Return the original response
        });
      })
    );
  }
});

self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  clients.claim();
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
