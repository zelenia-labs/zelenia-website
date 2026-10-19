/// <reference types="vitest" />

import { defineConfig, Plugin } from 'vite';
import analog from '@analogjs/platform';
import frontMatter from 'front-matter';
import { marked } from 'marked';

function contentMarkdownPlugin(): Plugin {
  return {
    name: 'vite-plugin-zelenia-content',
    transform(code, id) {
      const cleanId = id.split('?')[0];
      if (cleanId.endsWith('.content.md') || cleanId.endsWith('.md')) {
        const fm = typeof frontMatter === 'function' ? frontMatter : (frontMatter as any).default;
        const parsed = fm(code);
        const data = {
          ...parsed.attributes,
          body: parsed.body ? parsed.body.trim() : '',
          html: parsed.body ? marked.parse(parsed.body, { async: false }).trim() : ''
        };
        return {
          code: `export default ${JSON.stringify(data)};`,
          map: null
        };
      }
      return null;
    }
  };
}

// https://vitejs.dev/config/
export default defineConfig(() => ({
  build: {
    target: ['es2020']
  },
  resolve: {
    mainFields: ['module']
  },
  plugins: [
    contentMarkdownPlugin(),
    analog({
      prerender: {
        routes: async () => [
          {
            route: '/',
            sitemap: {
              priority: '1.0'
            }
          },

          {
            route: '/about',
            sitemap: {
              priority: '0.9'
            }
          },
          {
            route: '/contact',
            sitemap: {
              priority: '0.9'
            }
          }
        ],
        sitemap: {
          host: 'https://zelenia.com'
        }
      },
      static: true
    })
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['src/test-setup.ts'],
    include: ['**/*.spec.ts'],
    reporters: ['default']
  }
}));
