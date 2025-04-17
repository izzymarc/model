const CACHE_NAME = 'portfolio-cache-v1';
const STATIC_CACHE = 'static-cache-v1';
const IMAGE_CACHE = 'image-cache-v1';
const API_CACHE = 'api-cache-v1';

const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.ico',
  '/images/fallback/default.jpg',
  '/images/fallback/instagram.jpg',
  '/images/fallback/portfolio.jpg',
  '/images/fallback/fashion.jpg'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    Promise.all([
      caches.open(STATIC_CACHE).then((cache) => cache.addAll(STATIC_ASSETS)),
      caches.open(IMAGE_CACHE),
      caches.open(API_CACHE)
    ])
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((cacheName) => {
            return cacheName.startsWith('portfolio-') && 
                   cacheName !== STATIC_CACHE && 
                   cacheName !== IMAGE_CACHE && 
                   cacheName !== API_CACHE;
          })
          .map((cacheName) => caches.delete(cacheName))
      );
    })
  );
});

// Helper function to check if a request is for an image
const isImageRequest = (request) => {
  return request.destination === 'image' || 
         /\.(jpg|jpeg|png|webp|gif|svg)$/i.test(request.url);
};

// Helper function to check if a request is for an API
const isApiRequest = (request) => {
  return request.url.includes('/api/') || 
         request.url.includes('graphql') ||
         request.url.includes('rest');
};

// Helper function to handle image requests with WebP support
const handleImageRequest = async (request) => {
  const imageCache = await caches.open(IMAGE_CACHE);
  
  // Try to get from cache first
  const cachedResponse = await imageCache.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }

  // If not in cache, fetch and cache
  try {
    const response = await fetch(request);
    if (response.ok) {
      // Clone the response before caching
      const responseToCache = response.clone();
      await imageCache.put(request, responseToCache);
      return response;
    }
  } catch (error) {
    console.error('Error fetching image:', error);
  }

  // If fetch fails, try to return a fallback image
  const fallbackResponse = await imageCache.match('/images/fallback/default.jpg');
  if (fallbackResponse) {
    return fallbackResponse;
  }

  throw new Error('Image fetch failed and no fallback available');
};

// Fetch event - handle requests
self.addEventListener('fetch', (event) => {
  const request = event.request;

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Handle image requests
  if (isImageRequest(request)) {
    event.respondWith(handleImageRequest(request));
    return;
  }

  // Handle API requests
  if (isApiRequest(request)) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Clone the response before caching
          const responseToCache = response.clone();
          caches.open(API_CACHE).then((cache) => {
            cache.put(request, responseToCache);
          });
          return response;
        })
        .catch(() => {
          // If offline, try to get from cache
          return caches.match(request);
        })
    );
    return;
  }

  // Handle static assets
  event.respondWith(
    caches.match(request)
      .then((response) => {
        if (response) {
          return response;
        }
        return fetch(request)
          .then((response) => {
            // Clone the response before caching
            const responseToCache = response.clone();
            caches.open(STATIC_CACHE).then((cache) => {
              cache.put(request, responseToCache);
            });
            return response;
          });
      })
  );
}); 