// Production entry point for hosts that start a Node app from a root file
// (Hostinger's "Entry file" setting defaults to index.js). It boots the same
// server dist/index.js does — the Astro standalone handler behind the
// canonical-host and legacy redirects (see hostinger.entry.js, which the build
// copies to dist/index.js).
//
// PORT is injected by the host; HOST defaults to 0.0.0.0 in that file so the
// platform's reverse proxy can reach the server.
await import('./dist/index.js');
