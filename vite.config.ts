import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

import { createApp } from 'vinxi';
import { config } from 'vinxi/plugins/config';
import tsconfigPaths from 'vite-tsconfig-paths';

export default createApp({
  routers: [
    {
      name: 'public',
      type: 'static',
      dir: './public',
    },
    {
      name: 'client',
      type: 'spa',
      handler: './index.html',
      base: '/',
      plugins: () => [
        config('custom', {}),
        // additional vite plugins
        react(),
        svgr({ svgrOptions: { icon: true } }),
        tsconfigPaths(),
      ],
    },
    {
      name: 'api',
      type: 'http',
      handler: './api/api.ts',
      base: '/api',
    },
  ],
});
