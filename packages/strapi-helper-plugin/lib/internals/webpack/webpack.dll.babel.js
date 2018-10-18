/**
 * WEBPACK DLL GENERATOR
 *
 * This profile is used to cache webpack's module contexts for external library and framework type dependencies which
 * will usually not change often enough to warrant building them from scratch every time we use the webpack process.
 */

const path = require('path');
const webpack = require('webpack');
const { paths } = require('./configs/paths');

module.exports = {
  context: paths.appPath,
  entry: {
    vendor: ['react', 'react-dom', 'react-intl', 'reactstrap', 'react-transition-group', 'immutable', 'lodash', 'babel-polyfill'], // Shared dependencies accross the admin and plugins.
  },
  devtool: 'cheap-module-source-map',
  output: {
    filename: '[name].dll.js',
    path: path.resolve(paths.rootAdminpath, 'node_modules', 'strapi-helper-plugin', 'lib', 'internals', 'webpack', 'dist'),

    // The name of the global variable which the library's
    // require() function will be assigned to
    library: '[name]_lib',
  },
  plugins: [
    new webpack.DllPlugin({
      name: '[name]_lib',
      path: path.resolve(paths.rootAdminpath, 'admin', 'src', 'config', 'manifest.json'),
    }),
  ],
  resolve: {
    modules: [
      'admin/src',
      'node_modules/strapi-helper-plugin/lib/src',
      'node_modules/strapi-helper-plugin/node_modules',
      'node_modules',
    ],
    symlinks: false,
    extensions: [
      '.js',
      '.jsx',
      '.react.js',
    ],
    mainFields: [
      'browser',
      'jsnext:main',
      'main',
    ],
  },
};
