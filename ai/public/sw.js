const CACHE_NAME = 'zogakzogak-v3';
const urlsToCache = [
  '/zogakzogak/',
  '/zogakzogak/index.html',
  '/zogakzogak/assets/',
  '/zogakzogak/manifest.json',
  '/zogakzogak/sounds/'
];

// Install event
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event
self.addEventListener('fetch', (event) => {
  // 네트워크 요청만 처리 (정적 파일 제외)
  if (event.request.method !== 'GET') {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        // 네트워크 요청 시 오류 처리
        return fetch(event.request).catch(() => {
          // 네트워크 오류 시 기본 응답 반환
          if (event.request.destination === 'document') {
            return caches.match('/index.html');
          }
        });
      })
  );
});

// Activate event
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
