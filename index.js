// Production entry point for hosts that start a Node app from a root file
// (Hostinger's "Entry file" setting defaults to index.js). It boots the Astro
// standalone server that `astro build` writes to dist/server/entry.mjs.
//
// HOST must be 0.0.0.0 so the platform's reverse proxy can reach the server —
// without it the adapter binds to localhost only and the site times out.
// PORT is injected by the host and picked up by the adapter automatically.
process.env.HOST = process.env.HOST || '0.0.0.0';
await import('./dist/server/entry.mjs');
