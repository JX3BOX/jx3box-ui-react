const path = require('path');
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svg from 'vite-plugin-react-svg';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [
      { find: '@components', replacement: '/src/components' },
      { find: '@service', replacement: '/src/service' },
      { find: '@data', replacement: '/src/data' },
      { find: '@utils', replacement: '/src/utils' },
    ],
  },

  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          hack: `true; 
          @import (reference) "${path.resolve('./node_modules/csslab/base.less')}"; 
          @import (reference) "${path.resolve(
            './node_modules/@jx3box/jx3box-common/css/var.less'
          )}";
          `,
        },
        javascriptEnabled: true,
      },
    },
  },

  server: {
    proxy: {
      '/api/vip': {
        target: 'https://pay.jx3box.com',
        changeOrigin: true,
      },
      '/api/inspire': {
        target: 'https://pay.jx3box.com',
        changeOrigin: true,
      },
      '/api/team': {
        target: 'http://gray.team.api.jx3box.com',
        changeOrigin: true,
        // "target": "https://team.api.jx3box.com",
      },
      '/api/cms': {
        target: 'http://cms.jx3box.com',
        changeOrigin: true,
      },
      '/api/messages': {
        target: 'https://helper.jx3box.com',
        changeOrigin: true,
      },
      '/api/post/favorite': {
        target: 'https://helper.jx3box.com',
        changeOrigin: true,
      },
      '/api/wiki': {
        target: 'https://helper.jx3box.com',
        changeOrigin: true,
      },
      '/api': {
        target: 'https://next.jx3box.com',
        changeOrigin: true,
      },
    },
  },

  plugins: [
    react(),

    /**
     * Add rollup inline react svg plugin
     * @plugin rollup-plugin-react-svg
     */
    svg({
      defaultExport: 'component',
      svgo: true,
      memo: true,
      svgoConfig: {
        removeViewBox: false,
      },
    }),
  ],
});
