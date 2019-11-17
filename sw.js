try {
	importScripts('node_modules/cushiondb-client/dist/cushionWorker.js');
} catch {
	importScripts('assets/cushionWorker.js');
}

self.addEventListener('sync', evt => {
  evt.waitUntil(cushionWorker.syncEventTriggered(evt));
});

self.addEventListener('message', evt => {
  evt.waitUntil(cushionWorker.messageEventTriggered(evt));
});

self.addEventListener('push', evt => {
	console.log('pusheventTriggered');
  evt.waitUntil(cushionWorker.pushEventTriggered(evt));
});

self.addEventListener('install', evt => {
	evt.waitUntil(
		caches.open('v1').then(cache => {
			return cache.addAll(
				[
					'/index.html',
					'/bundle.js',
					'node_modules/cushiondb-client/dist/cushionWorker.js'
				]
			)
		})
	)
});

self.addEventListener('fetch', evt => {
  evt.respondWith(
    fetch(evt.request).catch(() => {
      return caches.match(evt.request);
    })
  );
});