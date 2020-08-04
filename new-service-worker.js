const currentCacheVersion = "cache-1";
const expectedCaches = ['cache-v1'];

self.addEventListener('install', event => {
    console.log('V2 installing…');
    event.waitUntil(
        caches.open(currentCacheVersion).then((cache) => {
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
    const url = new URL(event.request.url);

    // serve the cat SVG from the cache if the request is
    // same-origin and the path is '/dog.svg'
    // if (url.origin == location.origin && url.pathname == '/dog.svg') {
    //     event.respondWith(caches.match('/cat.svg'));
    // }
    event.respondWith(url);
});