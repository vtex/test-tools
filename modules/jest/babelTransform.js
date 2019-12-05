'use strict';

const babelJest = require('babel-jest');

module.exports = babelJest.createTransformer({
  presets: [
    require.resolve('@babel/preset-env'),
    require.resolve('@babel/preset-react'),
    require.resolve('@babel/preset-typescript')
  ],
  plugins: [
    require.resolve('@babel/plugin-proposal-class-properties'),
    require.resolve('@babel/plugin-transform-runtime'),
    require.resolve('babel-plugin-dynamic-import-node'),
    require.resolve('@babel/plugin-proposal-optional-chaining'),
    require.resolve('@babel/plugin-proposal-nullish-coalescing-operator'),
  ],
  babelrc: false,
  configFile: false
});
