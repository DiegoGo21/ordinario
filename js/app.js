if('serviceWorker'in navigator){
    // console.log('Service Worker Presente')
    navigator.serviceWorker.register('/sw.js');
    
}