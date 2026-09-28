import { readFile, writeFile, mkdir, rm } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');
const ssrDir = path.join(rootDir, 'dist-ssr');
const ssrEntry = path.join(ssrDir, 'entry-server.js');

function pathToFileUrl(p) {
  return new URL(`file://${p.replace(/\\/g, '/')}`).href;
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function replaceOnce(html, regex, label, replacement) {
  if (!regex.test(html)) {
    throw new Error(`[prerender] could not find "${label}" tag in dist/index.html template`);
  }
  return html.replace(regex, replacement);
}

function replaceOrInsert(html, regex, replacement) {
  if (regex.test(html)) {
    return html.replace(regex, replacement);
  }
  return html.replace('</head>', `    ${replacement}\n  </head>`);
}

function injectSeo(html, seo) {
  let out = html;
  out = replaceOrInsert(out, /<title>.*?<\/title>/s, `<title>${escapeHtml(seo.title)}</title>`);
  out = replaceOrInsert(
    out,
    /(<meta name="title" content=")[^"]*(")/,
    `$1${escapeHtml(seo.title)}$2`,
  );
  out = replaceOrInsert(
    out,
    /(<meta name="description" content=")[^"]*(")/,
    `$1${escapeHtml(seo.description)}$2`,
  );
  out = replaceOrInsert(
    out,
    /(<link rel="canonical" href=")[^"]*(")/,
    `$1${escapeHtml(seo.canonical)}$2`,
  );
  out = replaceOrInsert(
    out,
    /(<meta property="og:url" content=")[^"]*(")/,
    `$1${escapeHtml(seo.canonical)}$2`,
  );
  out = replaceOrInsert(
    out,
    /(<meta property="og:title" content=")[^"]*(")/,
    `$1${escapeHtml(seo.title)}$2`,
  );
  out = replaceOrInsert(
    out,
    /(<meta property="og:description" content=")[^"]*(")/,
    `$1${escapeHtml(seo.description)}$2`,
  );
  out = replaceOrInsert(
    out,
    /(<meta name="twitter:url" content=")[^"]*(")/,
    `$1${escapeHtml(seo.canonical)}$2`,
  );
  out = replaceOrInsert(
    out,
    /(<meta name="twitter:title" content=")[^"]*(")/,
    `$1${escapeHtml(seo.title)}$2`,
  );
  out = replaceOrInsert(
    out,
    /(<meta name="twitter:description" content=")[^"]*(")/,
    `$1${escapeHtml(seo.description)}$2`,
  );
  return out;
}

function injectRoot(html, appHtml) {
  return replaceOnce(
    html,
    /<div id="root">[\s\S]*?<\/div>/,
    'div#root',
    `<div id="root" data-prerendered="true">${appHtml}</div>`,
  );
}

function getOutputPath(route) {
  if (route === '/') {
    return path.join(distDir, 'index.html');
  }
  const cleanRoute = route.replace(/^\//, '').replace(/\/$/, '');
  return path.join(distDir, cleanRoute, 'index.html');
}

async function main() {
  const { renderHtml, routeSeo, PRERENDER_ROUTES } = await import(pathToFileUrl(ssrEntry));
  const template = await readFile(path.join(distDir, 'index.html'), 'utf-8');

  for (const route of PRERENDER_ROUTES) {
    const seo = routeSeo[route];
    if (!seo) throw new Error(`[prerender] no SEO data for route "${route}"`);

    const appHtml = renderHtml(route);
    let html = template;
    html = injectRoot(html, appHtml);
    html = injectSeo(html, seo);

    const outFile = getOutputPath(route);
    await mkdir(path.dirname(outFile), { recursive: true });
    await writeFile(outFile, html, 'utf-8');

    const h1Count = (appHtml.match(/<h1[\s>]/g) ?? []).length;
    console.log(
      `[prerender] ${route} -> ${path.relative(rootDir, outFile)} ` +
        `(#root: ${Buffer.byteLength(appHtml, 'utf-8')} bytes, h1 count: ${h1Count})`,
    );
  }

  await rm(ssrDir, { recursive: true, force: true });
  console.log('[prerender] successfully prerendered all routes and removed dist-ssr');
}

main().catch((err) => {
  console.error('[prerender] failed:', err);
  process.exitCode = 1;
});
