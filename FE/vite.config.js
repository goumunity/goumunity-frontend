import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
        // "/api": {
        //     target: 배포된거주소,
        //     changeOrigin: true,
        //     rewrite: (path) => path.replace(/^\/api/, ""),
        //     secure: false,
        //     ws: true,
        // },
        "/fake": {
          target: 'http://localhost:3001',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/fake/, ""),
          secure: false,
          ws: true,
      },
    },
},
})
