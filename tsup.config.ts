import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    index: './tsup/index.ts',
    types: './tsup/types.ts',
    ui: './tsup/ui.ts',
  },
  format: ['esm', 'cjs'], // Gera ESM (.mjs) e CommonJS (.cjs)
  dts: true, // Gera arquivos de tipos
  target: 'esnext',
  outDir: 'dist',
  clean: true,
  sourcemap: false,
  splitting: false,
  external: ['react', 'react-dom'],
  shims: false,
  esbuildOptions(options) {
    // options.outExtension = { '.js': '.mjs' }; // Força saída ESM para .mjs
    // options.loader = {
    //   '.ts': 'ts',
    //   '.tsx': 'tsx',
    //   '.jsx': 'jsx', // Garante que arquivos TSX sejam corretamente processados
    // };
    options.plugins = options.plugins || [];
  },
});
