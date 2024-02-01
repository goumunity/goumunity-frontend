import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  // 절대 경로 추가
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, 'src') },
      // { find: '@pages', replacement: path.resolve(__dirname, 'src/pages') },
    ],
  },

  server: {
    proxy: {
      '/api': {
        // target: 'https://ssafyhelper.shop/test/api',
        target: 'http://localhost:8080/api',
        // target: 'https://i10a408.p.ssafy.io',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        secure: false,
        ws: true,
      },
      '/fake': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/fake/, ''),
        secure: false,
        ws: true,
      },
    },
  },
});
