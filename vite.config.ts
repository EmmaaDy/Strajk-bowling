import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://h5jbtjv6if.execute-api.eu-north-1.amazonaws.com', // Target API URL
        changeOrigin: true, // Förändra ursprungsdomän (så backend ser den som en förfrågan från sig själv)
        rewrite: (path) => path.replace(/^\/api/, ''), // Omdirigera '/api' till API-basen
      },
    },
  },
});
