import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    index: 'index.ts',
    'types/index': 'types/index.ts',
    'ui/index': 'components/index.ts',
  },
  format: ['esm', 'cjs'],
  dts: true,
  target: 'esnext',
  outDir: 'dist',
  clean: true,
  sourcemap: true,
  splitting: true,
  external: ['react', 'react-dom'],
  shims: false,
  minify: true,
  injectStyle: true,
  watch: ['components/**/*.{ts,tsx}'],
  esbuildOptions(options) {
    // options.outExtension = { '.js': '.mjs' }; // Força saída ESM para .mjs
    // options.loader = {
    //   '.ts': 'ts',
    //   '.tsx': 'tsx',
    //   '.jsx': 'jsx', // Garante que arquivos TSX sejam corretamente processados
    // };
    // options.plugins = options.plugins || [];
  },
});
