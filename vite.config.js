import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// `vite build --mode lib` → pacchetto npm in dist/
// `vite` / `vite build`   → pagina demo (GitHub Pages) in dist-demo/
// `vitest`                → test (happy-dom)
export default defineConfig(({ mode }) =>
  mode === 'lib'
    ? {
        plugins: [vue()],
        build: {
          lib: {
            entry: 'src/index.js',
            formats: ['es'],
            fileName: 'vue-italy-map',
            cssFileName: 'style',
          },
          rollupOptions: { external: ['vue'] },
        },
      }
    : mode === 'test'
    ? { plugins: [vue()], test: { environment: 'happy-dom' } }
    : {
        plugins: [vue()],
        root: 'demo',
        base: './',
        build: { outDir: '../dist-demo', emptyOutDir: true },
      },
)
