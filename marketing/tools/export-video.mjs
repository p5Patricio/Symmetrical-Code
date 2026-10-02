#!/usr/bin/env node
/*
 * Renders a marketing video (marketing/videos/<name>/index.html) to MP4, frame by frame.
 *
 *   node marketing/tools/export-video.mjs software-empresarial
 *   node marketing/tools/export-video.mjs software-empresarial --formats 9x16,4x5 --langs es --fps 30
 *   node marketing/tools/export-video.mjs software-empresarial --stills 2,6,13,22,28   # PNG previews only
 *
 * Needs: ffmpeg on PATH, and Chrome/Chromium for Puppeteer (repo devDependency).
 * Set CHROME_PATH to use an existing browser instead of Puppeteer's download.
 *
 * Every frame is drawn by the page's own render(t) via window.__renderAt, so
 * nothing is dropped no matter how slow the machine is. The soundtrack is
 * rendered with OfflineAudioContext (window.__renderAudio) and muxed in.
 */
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const name = args.find(a => !a.startsWith('--')) || 'software-empresarial';
const opt = (k, d) => { const i = args.indexOf(`--${k}`); return i >= 0 ? args[i + 1] : d; };
const formats = opt('formats', '9x16,4x5,1x1,16x9').split(',');
const langs = opt('langs', 'es,en').split(',');
const fps = Number(opt('fps', '30'));
const outDir = path.resolve(opt('out', path.join(ROOT, 'out', name)));
const stills = opt('stills', null)?.split(',').map(Number);
fs.mkdirSync(outDir, { recursive: true });

// Tiny static server: fonts load over http, not file://.
const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.woff2': 'font/woff2', '.svg': 'image/svg+xml', '.png': 'image/png', '.css': 'text/css' };
const server = http.createServer((req, res) => {
  const p = path.join(ROOT, decodeURIComponent(new URL(req.url, 'http://x').pathname));
  if (!p.startsWith(ROOT) || !fs.existsSync(p) || fs.statSync(p).isDirectory()) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { 'Content-Type': MIME[path.extname(p)] || 'application/octet-stream' });
  fs.createReadStream(p).pipe(res);
});
await new Promise(r => server.listen(0, '127.0.0.1', r));
const base = `http://127.0.0.1:${server.address().port}/videos/${name}/index.html`;

const browser = await puppeteer.launch({
  headless: true,
  executablePath: process.env.CHROME_PATH || undefined,
  args: ['--no-sandbox', '--autoplay-policy=no-user-gesture-required', '--force-color-profile=srgb']
});

function ffmpeg(argv) {
  const p = spawn('ffmpeg', argv, { stdio: ['pipe', 'ignore', 'inherit'] });
  const done = new Promise((res, rej) => p.on('close', c => c === 0 ? res() : rej(new Error(`ffmpeg exited ${c}`))));
  return { stdin: p.stdin, done };
}

try {
  for (const lang of langs) for (const format of formats) {
    const page = await browser.newPage();
    await page.goto(`${base}?format=${format}&lang=${lang}&export`, { waitUntil: 'load' });
    await page.evaluate(() => window.__ready);
    const meta = await page.evaluate(() => window.__meta);
    await page.setViewport({ width: meta.width, height: meta.height, deviceScaleFactor: 1 });
    const tag = `${name}_${lang}_${format}`;

    if (stills) {
      for (const t of stills) {
        const url = await page.evaluate(t => window.__frame(t), t);
        fs.writeFileSync(path.join(outDir, `${tag}_${String(t).replace('.', '-')}s.png`), Buffer.from(url.split(',')[1], 'base64'));
      }
      console.log(`stills  ${tag}`);
      await page.close();
      continue;
    }

    const wav = path.join(outDir, `${tag}.wav`);
    fs.writeFileSync(wav, Buffer.from(await page.evaluate(() => window.__renderAudio()), 'base64'));
    const mp4 = path.join(outDir, `${tag}.mp4`);
    const ff = ffmpeg([
      '-y', '-loglevel', 'error',
      '-f', 'image2pipe', '-framerate', String(fps), '-c:v', 'png', '-i', '-',
      '-i', wav,
      '-c:v', 'libx264', '-preset', 'slow', '-crf', '17', '-pix_fmt', 'yuv420p', '-profile:v', 'high',
      // -14 LUFS: what Instagram, Facebook and LinkedIn normalize to anyway
      '-af', 'loudnorm=I=-14:TP=-1.5:LRA=11', '-ar', '48000',
      '-c:a', 'aac', '-b:a', '192k', '-shortest', '-movflags', '+faststart', mp4
    ]);
    const total = Math.round(meta.duration * fps);
    const t0 = Date.now();
    for (let i = 0; i < total; i++) {
      const url = await page.evaluate(t => window.__frame(t), i / fps);
      const buf = Buffer.from(url.slice(url.indexOf(',') + 1), 'base64');
      if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r));
      if (i % fps === 0) process.stdout.write(`\r${tag}  ${Math.round(i / total * 100)}%`);
    }
    ff.stdin.end();
    await ff.done;
    fs.rmSync(wav);
    console.log(`\r${tag}  done in ${Math.round((Date.now() - t0) / 1000)}s → ${path.relative(process.cwd(), mp4)}`);
    await page.close();
  }
} finally {
  await browser.close();
  server.close();
}
