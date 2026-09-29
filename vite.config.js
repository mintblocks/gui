import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { readFileSync } from 'fs';

const pkg = JSON.parse(readFileSync(new URL('./package.json', import.meta.url), 'utf-8'));

const appName = "mintblocks";

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'html-transform',
      transformIndexHtml(html) {
        return html.replace(/%APP_NAME%/g, appName);
      },
    },
  ],
  define: {
    'import.meta.env.APP_NAME': JSON.stringify(appName),
  },
  build: {
    rollupOptions: {
      output: {
        entryFileNames: `assets/${pkg.name}-[hash].js`,
        chunkFileNames: `assets/${pkg.name}-[chunkhash].js`,
        assetFileNames: `assets/${pkg.name}-[hash].[ext]`
      }
    }
  }
});
