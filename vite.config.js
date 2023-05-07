import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

export default defineConfig(() => {
  return {
    build: {
      outDir: 'build',
    },
    plugins: [react(), svgr({ svgrOptions: { icon: true } })],
    server: {
      host: '0.0.0.0',
      port: 3000
    }
  };
});