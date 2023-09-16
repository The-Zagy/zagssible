import path from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
export default defineConfig({
    plugins: [dts()],
    build: {
    minify: false,
    sourcemap: true,
    target: 'esnext',
    lib: {
        entry: path.resolve(__dirname, "src/index.ts"),
        name: 'index',
        fileName: 'index',
        formats: ['es', "iife","cjs",],
    },    
    outDir: 'dist',
    rollupOptions: {
        input: {
        index: path.resolve(__dirname, "src/index.ts"),
        },
    }
    },
    optimizeDeps: {
        exclude : ["@zaggsible/core"],
    },
},);