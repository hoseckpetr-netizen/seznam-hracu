// Service worker: makes Chrome treat the site as a real installable app (opens in its own
// window, no address bar). Nothing is cached — page loads always go to the network, so a new
// version on GitHub Pages is picked up immediately; without a connection a short message is
// shown instead of the browser's error page. Other requests (Google APIs, images) aren't touched.
self.addEventListener('install', function() { self.skipWaiting(); });
self.addEventListener('activate', function(e) { e.waitUntil(self.clients.claim()); });
self.addEventListener('fetch', function(e) {
  if (e.request.mode !== 'navigate') return;
  e.respondWith(fetch(e.request).catch(function() {
    return new Response(
      '<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">' +
      '<title>Seznam hráčů</title><body style="margin:0;min-height:100vh;display:flex;align-items:center;justify-content:center;' +
      'background:#0b0d10;color:#eef1f3;font-family:sans-serif;text-align:center;padding:20px">' +
      '<div><h2 style="margin:0 0 8px">Jste offline</h2><p style="color:#9aa2ab;margin:0 0 16px">Seznam hráčů potřebuje připojení k internetu.</p>' +
      '<button onclick="location.reload()" style="background:#1a1e23;color:#eef1f3;border:1px solid #262b31;border-radius:10px;padding:10px 18px;font-size:14px">Zkusit znovu</button></div>',
      { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
  }));
});
