const path = require('path');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const external = require('rollup-plugin-peer-deps-external');
const cleaner = require('rollup-plugin-cleaner');
const typescript = require('rollup-plugin-typescript2');
const commonjs = require('@rollup/plugin-commonjs');
const postcss = require('rollup-plugin-postcss');
const alias = require('@rollup/plugin-alias');
const { eslint } = require('rollup-plugin-eslint');

const customResolver = nodeResolve({
  extensions: ['.mjs', '.js', '.jsx', '.ts', '.d.ts', '.tsx', '.json', '.less', '.scss'],
});

const getPath = pathName => path.resolve(__dirname, pathName);

module.exports = {
  /**
   * entry file
   * @param input
   */
  input: getPath('../src/index.ts'),

  /**
   * output file
   * @param output
   */
  output: [
    {
      file: 'build/index.js',
      format: 'cjs',
      name: 'jx3-ui-react',
    },
  ],

  /**
   * plugins list
   * @param plugins
   */
  plugins: [
    /**
     * @plugin rollup-plugin-cleaner
     * clear the last rollup build folder
     */
    cleaner({
      targets: ['build'],
    }),

    /**
     * A plugin fix peer deps packages
     * @plugin rollup-plugin-peer-deps-external
     */
    external(),

    /**
     * A plugin resolve node_modules
     * @plugin @rollup/plugin-node-resolve
     * https://www.npmjs.com/package/@rollup/plugin-node-resolve
     */
    nodeResolve(),

    /**
     * A plugin convert commonjs to es6
     * @plugin @rollup/plugin-commonjs
     */
    commonjs(),

    /**
     * rollup translate typescript pluin
     *
     * @param rollupTypescriptPlugin
     */
    typescript({
      tsconfig: getPath('../tsconfig.json'),
    }),

    /**
     * Add less support
     * @plugin rollup-plugin-postcss
     */
    postcss(),

    alias({
      entries: [
        { find: '@components', replacement: '../src/components' },
        { find: '@service', replacement: '../src/service' },
        { find: '@assets', replacement: '../src/assets' },
        { find: '@data', replacement: '../src/data' },
        { find: '@utils', replacement: '../src/utils' },
      ],
      customResolver,
    }),

    eslint(),
  ],
};
