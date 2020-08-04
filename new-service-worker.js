const currentCacheVersion = "cache-v4";
const expectedCaches = ['cache-v3'];
var cacheAssets = [
    "/",
    "/form.html",
];

self.addEventListener('install', event => {
    console.log('V4 installing…');
    event.waitUntil(
        caches.open(currentCacheVersion).then((cache) => {
            cache.addAll(cacheAssets);
            console.log("Cache installation success");
        })
    );
});

self.addEventListener('activate', event => {
    // delete any caches that aren't in expectedCaches
    // which will get rid of static-v1
    event.waitUntil(
        caches.keys().then(keys => Promise.all(
            keys.map(key => {
                if (!expectedCaches.includes(key)) {
                    return caches.delete(key);
                }
            })
        )).then(() => {
            console.log(currentCacheVersion + ' now ready to handle fetches!');
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