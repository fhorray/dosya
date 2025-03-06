import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    index: "tsup/index.ts",
    types: "tsup/types.ts",
    ui: "tsup/ui.ts",
  },
  format: ["esm", "cjs"], // Gera ESM (.mjs) e CommonJS (.cjs)
  dts: true, // Gera arquivos de tipos
  target: "esnext",
  outDir: "dist",
  clean: true,
  sourcemap: true,
  // splitting: false,
  external: ["react", "react-dom"],
  esbuildOptions(options) {
    options.outExtension = { ".js": ".mjs" }; // Força saída ESM para .mjs
  },
});
