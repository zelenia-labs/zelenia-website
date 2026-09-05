/// <reference types="vitest" />

import { defineConfig } from 'vite';
import analog from '@analogjs/platform';

// https://vitejs.dev/config/
export default defineConfig(() => ({
  build: {
    target: ['es2020']
  },
  resolve: {
    mainFields: ['module']
  },
  plugins: [
    analog({
      prerender: {
        routes: async () => [
          {
            route: '/',
            sitemap: {
              priority: '1.0'
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
