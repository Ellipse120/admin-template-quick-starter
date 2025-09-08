import path from 'path'
import { defineConfig } from 'vite'
import { createVuePlugin } from 'vite-plugin-vue2'
// import vueJsx from '@vitejs/plugin-vue2-jsx'
import UnoCSS from 'unocss/vite'

export default defineConfig({
  resolve: {
    alias: [
      {
        find: '@',
        replacement: path.resolve(__dirname, 'src')
      },
      {
        find: 'vue',
        replacement: 'vue/dist/vue.esm.js',
      }
    ]
  },
  plugins: [
    createVuePlugin({ jsx: true }),
    UnoCSS(),
    // vueJsx(),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
        charset: false,
        additionalData: `
          @use 'sass:color';
          @use 'sass:math';
          @use 'sass:meta';
          @use '@/styles/variables.scss' as *;
        `
      }
    }
  },
  build: {
    sourcemap: true,
    minify: false
  }
});
