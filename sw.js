self.addEventListener('install', function(e) {
 e.waitUntil(
   caches.open('SSuiteOfficeDesktop3').then(function(cache) {
     return cache.addAll([
       '/',
       'index.htm',
       'L9.jpg',
       'D5.jpg',
       'roboto-v20-latin_latin-ext-300.woff2',
       'roboto-v20-latin_latin-ext-regular.woff2',
       'roboto-v20-latin_latin-ext-700.woff2'
     ]);
   })
 );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(resp) {
      return resp || fetch(event.request).then(function(response) {
        let responseClone = response.clone();
        caches.open('SSuiteOfficeDesktop3').then(function(cache) {
          cache.put(event.request, responseClone);
        });

        return response;
      });
    }).catch(function() {
      return caches.match('index.htm');
    })
  );
});