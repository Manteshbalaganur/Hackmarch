import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    minify: 'esbuild', // Faster minification
    sourcemap: false, // Disable in prod for smaller builds
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'], // Split vendor code
        },
      },
    },
  },
  server: {
    open: true, // Auto-open browser in dev
  },
});