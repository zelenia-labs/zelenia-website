import pug from '@vituum/vite-plugin-pug';
import { minify } from 'html-minifier-terser';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import vituum from 'vituum';

function htmlOptimizerPlugin() {
  return {
    name: 'html-optimizer-plugin',
    enforce: 'post',
    async generateBundle(options, bundle) {
      const htmlFiles = Object.values(bundle).filter((f) => f.fileName.endsWith('.html'));
      const cssFile = Object.values(bundle).find((f) => f.fileName.endsWith('.css'));
      const cssContent =
        cssFile &&
        (typeof cssFile.source === 'string' ? cssFile.source : cssFile.source.toString('utf8'));

      for (const htmlFile of htmlFiles) {
        let html =
          typeof htmlFile.source === 'string' ? htmlFile.source : htmlFile.source.toString('utf8');

        if (cssFile && cssContent) {
          const escapedFileName = cssFile.fileName.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
          const cssRegex = new RegExp(`<link[^>]*href=["'][^"']*${escapedFileName}["'][^>]*>`, 'g');
          html = html.replace(cssRegex, () => `<style>${cssContent}</style>`);
        }

        htmlFile.source = await minify(html, {
          removeComments: true,
          minifyCSS: true,
          minifyJS: true,
          processScripts: ['application/ld+json'],
          collapseWhitespace: true,
          conservativeCollapse: true
        });
      }

      if (cssFile) {
        delete bundle[cssFile.fileName];
      }
    }
  };
}

export default defineConfig({
  root: resolve(import.meta.dirname, 'sources/html'),
  plugins: [
    vituum({
      pages: {
        dir: './',
        root: './'
      }
    }),
    pug(),
    htmlOptimizerPlugin()
  ],
  publicDir: resolve(import.meta.dirname, 'public'),
  server: {
    port: 5173,
    strictPort: true
  },
  preview: {
    port: 4173,
    strictPort: true
  },
  build: {
    modulePreload: { polyfill: false },
    minify: 'terser',
    terserOptions: {
      compress: {
        passes: 3,
        unsafe_arrows: true
      },
      format: {
        comments: false
      }
    },
    outDir: resolve(import.meta.dirname, 'dist'),
    assetsDir: '',
    emptyOutDir: true,
    rollupOptions: {
      input: [
        resolve(import.meta.dirname, 'sources/html/index.pug'),
        resolve(import.meta.dirname, 'sources/html/capabilities.pug')
      ]
    }
  },
  resolve: {
    alias: {
      '/sources': resolve(import.meta.dirname, 'sources'),
      '/assets': resolve(import.meta.dirname, 'public/assets')
    }
  }
});
