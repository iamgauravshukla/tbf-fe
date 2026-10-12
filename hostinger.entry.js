// Copied to dist/index.js by `npm run build`. Hostinger's Git deployment
// resolves the "Entry file" setting inside the output directory (dist), so
// this is the file its default `index.js` entry actually starts.
//
// Written to parse as either CommonJS or an ES module (no require, no
// top-level await), because the deployed copy may or may not sit under a
// package.json with "type": "module".
//
// HOST must be 0.0.0.0 or the Astro standalone server binds to localhost
// only and the platform's reverse proxy cannot reach it.
process.env.HOST = process.env.HOST || '0.0.0.0';

// We start the listener ourselves (instead of the adapter's autostart) so a
// few permanent redirects run BEFORE Astro's static-file handler. Astro
// middleware never sees prerendered pages in standalone mode, so this is the
// only place a host-level redirect can live.
process.env.ASTRO_NODE_AUTOSTART = 'disabled';

// One host for every URL. The apex host otherwise serves the whole site as a
// 200 duplicate. Kill switch: set CANONICAL_REDIRECT=off in the host's
// environment variables (e.g. if a proxy ever rewrites the Host header).
var CANONICAL_ORIGIN = 'https://www.thebetterface.com';
var APEX_HOST = 'thebetterface.com';

// Old Shopify-era URLs with a genuine equivalent on this site. Product,
// collection, shipping and refund pages have no equivalent and stay 404.
var LEGACY = {
  '/pages/about': '/about/',
  '/pages/contact': '/contact/',
  '/pages/privacy-policy': '/privacy/',
  '/pages/terms-of-service': '/terms/',
  '/blogs/news': '/journal/',
  // The conventional sitemap address; the real index is sitemap-index.xml.
  '/sitemap.xml': '/sitemap-index.xml',
};

function redirectFor(req) {
  var rawHost = String(req.headers['x-forwarded-host'] || req.headers.host || '');
  var host = rawHost.split(',')[0].trim().toLowerCase().replace(/:\d+$/, '');
  var url = req.url || '/';
  var q = url.indexOf('?');
  var path = q === -1 ? url : url.slice(0, q);
  var search = q === -1 ? '' : url.slice(q);

  var key = path.length > 1 ? path.replace(/\/+$/, '') : path;
  var target = LEGACY[key] ||
    // /index.html and /treatments/hifu/index.html → the directory URL.
    (/\/index\.html$/.test(path) ? path.slice(0, -'index.html'.length) : null);
  var wrongHost = process.env.CANONICAL_REDIRECT !== 'off' && host === APEX_HOST;

  if (!target && !wrongHost) return null;
  return (wrongHost ? CANONICAL_ORIGIN : '') + (target || path) + search;
}

Promise.all([import('node:http'), import('./server/entry.mjs')]).then(function (m) {
  var http = m[0].default || m[0];
  var astro = m[1];
  var port = Number(process.env.PORT) || (astro.options && astro.options.port) || 8080;
  var host = process.env.HOST;
  http.createServer(function (req, res) {
    var location = redirectFor(req);
    if (location) {
      res.writeHead(301, { Location: location, 'Cache-Control': 'public, max-age=86400' });
      res.end();
      return;
    }
    astro.handler(req, res);
  }).listen(port, host, function () {
    console.log('[entry] listening on http://' + host + ':' + port);
  });
}).catch(function (err) {
  console.error('[entry] failed to start dist/server/entry.mjs:', err);
  process.exit(1);
});
