const currentCacheVersion = "cache-v9";
// const expectedCaches = ['cache-v4'];
var cacheAssets = [
    "/",
    "/form.html",
];

self.addEventListener('install', event => {
    console.log('V9 installing…');
    event.waitUntil(
        caches.open(currentCacheVersion).then((cache) => {
            cache.addAll(cacheAssets);
            console.log("Cache installation success");
        })
    );
});

self.addEventListener('activate', event => {
    console.log("service worker: Activate");
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(cacheNames.filter(function (cache) {
                if (cache != currentCacheVersion)
                    return true;
            }).map(function (currentCacheVersion) {
                return caches.delete(currentCacheVersion);
            }));
        })
    );
});
self.addEventListener('fetch', event => {
    console.log('Fetch event for ', event.request.url);
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    console.log('Found ', event.request.url, ' in cache');
                    return response;
                }
                console.log('Network request for ', event.request.url);
                return fetch(event.request)

                // TODO 4 - Add fetched files to the cache

            }).catch(error => {

                // TODO 6 - Respond with custom offline page

            })
    );
});