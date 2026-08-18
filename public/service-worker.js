const imageCacheName = 'portfolio-images-v1'
const staticImages = [
  'https://github.com/kattasahan.png',
]

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(imageCacheName)
      .then(async (cache) => {
        await Promise.all(staticImages.map(async (url) => {
          try {
            const response = await fetch(url, { mode: 'no-cors' })
            if (response.ok || response.type === 'opaque') {
              await cache.put(url, response)
            }
          } catch {
            // Keep the site available if an optional remote image cannot be cached.
          }
        }))
      })
      .then(() => self.skipWaiting()),
  )
})

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim())
})

self.addEventListener('message', (event) => {
  if (event.data?.type !== 'CLEAR_IMAGE_CACHE') return

  event.waitUntil(caches.delete(imageCacheName))
})

self.addEventListener('fetch', (event) => {
  if (event.request.destination !== 'image') return

  event.respondWith(
    caches.open(imageCacheName).then(async (cache) => {
      const cachedResponse = await cache.match(event.request)
      if (cachedResponse) return cachedResponse

      const response = await fetch(event.request)
      if (response.ok || response.type === 'opaque') {
        await cache.put(event.request, response.clone())
      }
      return response
    }),
  )
})
