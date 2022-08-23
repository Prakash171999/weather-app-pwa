const CACHE_NAME = "weather-v1";
const urlsToCache = ["index.html", "offline.html"];

//Here this in the serviceworker.js file represents the serviceworker
const self = this;

//Install the Service Worker
//'install' is event type
//self means the Service Worker itself. No restricted globals
//
self.addEventListener("install", (event) => {
  //waiting untill something is done
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened cache");
      return cache.addAll(urlsToCache);
    })
  );
});

//Listen for requests
self.addEventListener("fetch", (event) => {
  event.respondWith(
    catches.match(event.request).then(() => {
      return fetch(event.request).catch(() => caches.match("offline.html"));
    })
  );
});

//Activating the Service worker listener
//Here, We will be removing all the previous caches and only keep the new ones
self.addEventListener('activate', (event)=>{
    const cacheWhiteList = [];
    cacheWhiteList.push(CACHE_NAME)

    event.waitUntil(
        caches.keys().then((cacheNames) => Promise.all(
            cacheNames.map((cacheName) => {
                if(!cacheWhitelist.includes(cacheName)) {
                    return caches.delete(cacheName);
                }
            })
        ))
    )
})

