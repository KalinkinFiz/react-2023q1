import express from 'express';
import { readFile } from 'fs/promises';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { createServer } from 'vite';

const PORT = 8000;

const app = express();

const __dirname = dirname(fileURLToPath(import.meta.url));
const htmlIndex = resolve(__dirname, 'index.html');

const vite = await createServer({
  server: { middlewareMode: true },
  appType: 'custom',
});

app.use(vite.middlewares);

app.use('*', async (req, res, next) => {
  const url = req.originalUrl;
  try {
    const template = await readFile(htmlIndex, 'utf-8');

    const htmlData = await vite.transformIndexHtml(url, template);

    const [htmlStart, htmlEnd] = htmlData.split(`<!--ssr-outlet-->`);

    const { render } = await vite.ssrLoadModule('./src/entry-server.tsx');

    const { pipe } = await render(url, {
      onShellReady() {
        res.write(htmlStart);
        pipe(res);
      },
      onAllReady() {
        res.write(htmlEnd);
        res.end();
      },
    });
  } catch (e) {
    vite.ssrFixStacktrace(e as Error);
    next(e);
  }
});

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
