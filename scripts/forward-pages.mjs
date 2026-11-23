import { readdir, writeFile } from 'node:fs/promises';
import { join, relative, sep } from 'node:path';

const dist = 'dist';
const destination = 'https://vartmor.github.io/aeris-vision/';
const entries = await readdir(dist, { recursive: true, withFileTypes: true });
for (const entry of entries.filter((file) => file.isFile() && file.name.endsWith('.html'))) {
  const path = join(entry.parentPath, entry.name);
  const route = entry.name === '404.html' ? '' : relative(dist, entry.parentPath).split(sep).join('/');
  const target = new URL(route ? route + '/' : '', destination).href;
  await writeFile(path, `<!doctype html>
<html lang="tr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="robots" content="noindex">
  <title>Aeris Vision · Günlük taşındı</title>
  <link rel="canonical" href="${target}">
  <script>
    const next = new URL(${JSON.stringify(target)});
    next.search = location.search;
    next.hash = location.hash;
    location.replace(next.href);
  </script>
  <noscript><meta http-equiv="refresh" content="0; url=${target}"></noscript>
</head>
<body><p><a href="${target}">Aeris Vision günlüğünü yeni adresinde aç</a></p></body>
</html>
`);
}
