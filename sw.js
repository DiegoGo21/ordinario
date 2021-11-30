

const STATIC_CACHE = 'static-v1';
const DYNAMIC_CACHE = 'dynamic-v1';
const INMUTABLE_CACHE = 'inmutable-v1';

const APP_SHELL = [
    '/',
    'index.html',
    'img/semaforo.png',
    'js/oculta.js',
    'js/app.js'
];

const APP_SHELL_INMUTABLE = [
    'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css',
    'https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js'
];


self.addEventListener('install', event => {

    const cacheStatic = caches.open(STATIC_CACHE).then(cache=>
        cache.addAll(APP_SHELL)
    )

    const cacheInmutable = caches.open(INMUTABLE_CACHE).then(cache=>
        cache.addAll(APP_SHELL_INMUTABLE)
    );
    event.waitUntil(Promise.all([cacheStatic, cacheInmutable]));

});


self.addEventListener('activate', event =>{

    const respuesta = caches.keys().then(keys =>{
        keys.forEach(key =>{
            if(key !== STATIC_CACHE && key.includes('static')){
                return caches.delete(key);
            }
        });
    });

    event.waitUntil(respuesta);

});


self.addEventListener('fetch', event =>{
    const respuesta = caches.match(event.request).then(res=>{
       
      if (res) {
          return res;
        } 
         
        console.log("el archivo solicitado no esta en cache", event.request.url);
                return fetch(event.request).then((newResp) => {
                
                    caches.open(DYNAMIC_CACHE).then(cache => {
                        cache.put(event.request, newResp);
                    });
                    return newResp.clone();
                }).catch( err => {
                    if ( event.request.headers.get('accept').includes('text/html') ) {
                        return caches.match('pages/offline.html');
                    }
                });

    });
    event.respondWith(respuesta);

});