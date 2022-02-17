import react from '@vitejs/plugin-react';
import svg from 'vite-plugin-react-svg';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({

    // 🌸:alias @ for ./src
    resolve: {
        alias: [
            { find: '@components', replacement: '/src/components' },
            { find: '@service', replacement: '/src/service' },
            { find: '@data', replacement: '/src/data' },
            { find: '@utils', replacement: '/src/utils' },
        ],
    },

    // ❄️:css mixins & global vars
    css: {
        preprocessorOptions: {
            less: {
                globalVars: {
                    hack: `true; 
                    @import "./node_modules/csslab/base.less";
                    @import "./node_modules/@jx3box/jx3box-common/css/var.less";
                    `
                },
            },
        },
    },

    // 🌈:cross-origin
    server: {
        proxy: {
            '/api/vip': {
                target: 'https://pay.jx3box.com',
                changeOrigin: true,
                // 前端请求路径不变，用于后端灰度测试替换为测试路径
                // rewrite: (path) => path.replace(/^\/api/, ""),
                // configure: (proxy, options) => {
                // proxy 是 'http-proxy' 的实例
                // }
            },
            '/api/messages': {
                target: 'https://helper.jx3box.com',
                changeOrigin: true,
            },
            '/api/cms': {
                target: 'https://cms.jx3box.com',
                changeOrigin: true,
            },
            '/api': {
                target: 'https://next2.jx3box.com',
                changeOrigin: true,
            },
        },
    },

    // 🍬:loaders
    plugins: [
        react(),

        /**
         * Add rollup inline react svg plugin
         * @plugin rollup-plugin-react-svg
         */
        // svg({
        //     defaultExport: 'component',
        //     svgo: true,
        //     memo: true,
        //     svgoConfig: {
        //         removeViewBox: false,
        //     },
        // }),
    ],
});
