const path = require('path');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const external = require('rollup-plugin-peer-deps-external');
const cleaner = require('rollup-plugin-cleaner');
const typescript = require('rollup-plugin-typescript2');
const commonjs = require('@rollup/plugin-commonjs');
const alias = require('@rollup/plugin-alias');
const styles = require('rollup-plugin-styles');
const svg = require('rollup-plugin-react-svg');
const json = require('@rollup/plugin-json');
const { terser } = require('rollup-plugin-terser');
// const { eslint } = require('rollup-plugin-eslint');

const customResolver = nodeResolve({
  extensions: ['.mjs', '.js', '.jsx', '.ts', '.d.ts', '.tsx', '.json', '.less', '.scss'],
});

const getPath = pathName => path.resolve(__dirname, pathName);

module.exports = {
  external: ['react', 'react-dom'],
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
    },
    {
      file: 'build/index.min.js',
      format: 'cjs',
      plugins: [terser()],
    },
    { file: 'build/index.esm.js', format: 'esm' },
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
     * rollup translate typescript pluin
     *
     * @param rollupTypescriptPlugin
     */
    typescript({
      tsconfig: getPath('../tsconfig.json'),
    }),

    /**
     * A plugin convert commonjs to es6
     * @plugin @rollup/plugin-commonjs
     */
    commonjs({ esmExternals: true }),

    /**
     * A plugin resolve node_modules
     * @plugin @rollup/plugin-node-resolve
     * https://www.npmjs.com/package/@rollup/plugin-node-resolve
     */
    nodeResolve({ browser: true }),

    /**
     * Add json import support
     * @plugin @rollup/plugin-json
     */
    json(),

    /**
     * We choice rollup-plugin-styles because we need preload node_modules less
     * @plugin rollup-plugin-styles
     */
    styles(),

    /**
     * Add image assets support
     * @plugin @rollup/plugin-image
     */
    // images(),

    /**
     * Add rollup inline react svg plugin
     * @plugin rollup-plugin-react-svg
     */
    svg({
      svgo: {
        plugins: [{ convertPathData: { noSpaceAfterFlags: false } }, { removeViewBox: false }],
      },
    }),

    alias({
      entries: [
        { find: '@components', replacement: '../src/components' },
        { find: '@service', replacement: '../src/service' },
        { find: '@data', replacement: '../src/data' },
        { find: '@utils', replacement: '../src/utils' },
      ],
      customResolver,
    }),

    // eslint(),
  ],
};
