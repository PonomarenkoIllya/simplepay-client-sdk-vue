import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'node:path'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

import tailwindcss from 'tailwindcss'

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/main.ts'), // Ensure this points to your main.ts file
      name: 'SimpleModal',
      fileName: (format) => 'modal.js',
    },
    rollupOptions: {
      output: {
        exports: 'named',
      },
    },
    minify: 'terser',
    terserOptions: {
      keep_classnames: true, // Do not mangle class names
      keep_fnames: true,     // Do not mangle function names
    },
  },
  plugins: [vue({}), nodePolyfills()],
  css: {
    postcss: {
      plugins: [tailwindcss()]
    }
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  }
})
