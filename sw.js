const C='bw-84714814';
self.addEventListener('install',e=>{ e.waitUntil(caches.open(C).then(c=>c.addAll(['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png','icon-180.png']))); self.skipWaiting(); });
self.addEventListener('activate',e=>{ e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k))))); self.clients.claim(); });
self.addEventListener('fetch',e=>{ const r=e.request; if(r.method!=='GET') return;
  e.respondWith(caches.match(r).then(hit=>{ const net=fetch(r).then(res=>{ if(res&&res.status===200&&(r.url.startsWith(self.location.origin)||r.url.includes('fonts.g'))){ const cp=res.clone(); caches.open(C).then(c=>c.put(r,cp)); } return res; }).catch(()=>hit); return hit||net; })); });
