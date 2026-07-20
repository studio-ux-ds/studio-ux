import { defineConfig } from 'tsup';

export default defineConfig({
  entry: { index: 'src/components/index.js' },
  format: ['esm', 'cjs'],
  target: 'es2019',
  outDir: 'dist',
  clean: true,
  external: ['react', 'react-dom'],
  esbuildOptions(options) {
    options.jsx = 'transform';
  },
});
