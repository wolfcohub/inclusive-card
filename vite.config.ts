// vite.config.js
import { resolve } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [dts({ include: ['lib'] })],
  build: {
    lib: {
      entry: resolve(__dirname, 'lib/index.ts'),
      formats: ['es'],
      name: 'inclusive-card',
      fileName: 'index',
    },
    rollupOptions: {
      output: {
        dir: 'dist',
      },
    },
  },
});
