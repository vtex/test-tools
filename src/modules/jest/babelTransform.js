'use strict'

const babelJest = require('babel-jest')

module.exports = babelJest.createTransformer({
  presets: [
    require.resolve('@babel/preset-env'),
    require.resolve('@babel/preset-react'),
    require.resolve('@babel/preset-typescript'),
  ],
  plugins: [
    require.resolve('@babel/plugin-proposal-class-properties'),
    require.resolve('@babel/plugin-transform-runtime'),
    // Add support for const enums in tests
    [
      require.resolve('babel-plugin-const-enum'),
      {
        transform: 'constObject',
      },
    ],
  ],
  babelrc: false,
  configFile: false,
})
