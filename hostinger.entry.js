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
import('./server/entry.mjs').catch(function (err) {
  console.error('[entry] failed to start dist/server/entry.mjs:', err);
  process.exit(1);
});
