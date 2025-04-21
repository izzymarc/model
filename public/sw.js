// Service Worker for Mirabel Udeagha Portfolio
const CACHE_NAME = 'mirabel-portfolio-v1';

// Assets to cache on install
const STATIC_CACHE_URLS = [
  '/',
  '/index.html',
  '/favicon.ico',
  '/favicon-32x32.png',
  '/favicon-16x16.png',
  '/apple-touch-icon.png',
  '/android-chrome-192x192.png',
  '/android-chrome-512x512.png',
  '/site.webmanifest',
  // Add main CSS and JS files - these paths will be updated by the build process
  '/assets/index-*.css',
  '/assets/index-*.js',
  // Core images
  '/images/about.jpeg',
  '/images/og-image.jpg',
  // Instagram images
  '/images/instagram/perfume-campaign.jpg',
  '/images/instagram/editorial-gold.jpg',
  '/images/instagram/blue-concept.jpg',
  '/images/instagram/business-campaign.jpg',
  '/images/instagram/white-collection.jpg',
  '/images/instagram/red-carpet.jpg',
  // Portfolio images
  '/images/portfolio/fashion1.jpg',
  '/images/portfolio/fashion2.jpg',
  '/images/portfolio/fashion4.jpg',
  '/images/portfolio/fashion5.jpg',
  '/images/portfolio/whitedress.jpg',
  '/images/portfolio/reddress.jpg',
  // Fallback images
  '/images/fallback/default.jpg',
  '/images/fallback/portrait.jpg',
  '/images/fallback/fashion.jpg',
  '/images/fallback/instagram.jpg'
];

// Install event - Cache static assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(STATIC_CACHE_URLS);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate event - Clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.filter(cacheName => {
            return cacheName !== CACHE_NAME;
          }).map(cacheName => {
            return caches.delete(cacheName);
          })
        );
      })
      .then(() => self.clients.claim())
  );
});

// Fetch event - Serve from cache first, then network
self.addEventListener('fetch', event => {
  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin) || 
      event.request.method !== 'GET') {
    return;
  }

  // Handle Instagram API requests separately
  if (event.request.url.includes('instagram.com') || 
      event.request.url.includes('fbcdn.net')) {
    return event.respondWith(
      fetch(event.request)
        .catch(() => {
          // If Instagram resources fail, let the app handle fallbacks
          return new Response('Instagram resource unavailable', { status: 503 });
        })
    );
  }

  // Handle API requests - network first, no cache
  if (event.request.url.includes('/api/')) {
    return event.respondWith(
      fetch(event.request)
        .catch(() => {
          return caches.match('/offline.html');
        })
    );
  }

  // Standard assets - cache first, network as fallback
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return from cache if found
        if (response) {
          return response;
        }

        // Otherwise fetch from network
        return fetch(event.request)
          .then(networkResponse => {
            // Cache new resources
            const clonedResponse = networkResponse.clone();
            if (networkResponse.ok && networkResponse.status === 200) {
              caches.open(CACHE_NAME)
                .then(cache => {
                  cache.put(event.request, clonedResponse);
                });
            }
            return networkResponse;
          })
          .catch(() => {
            // If HTML request, serve offline page
            if (event.request.headers.get('Accept').includes('text/html')) {
              return caches.match('/offline.html');
            }
            
            // For images, serve a placeholder
            if (event.request.url.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
              return caches.match('/images/fallback/default.jpg');
            }
            
            // Otherwise return error
            return new Response('Network error occurred', { status: 503 });
          });
      })
  );
});

// Handle push notifications (if needed)
self.addEventListener('push', event => {
  if (event.data) {
    const data = event.data.json();
    
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: '/android-chrome-192x192.png',
      badge: '/badge-icon.png',
      data: {
        url: data.url || '/'
      }
    });
  }
});

// Handle notification clicks
self.addEventListener('notificationclick', event => {
  event.notification.close();
  
  if (event.notification.data && event.notification.data.url) {
    event.waitUntil(
      clients.openWindow(event.notification.data.url)
    );
  }
}); 