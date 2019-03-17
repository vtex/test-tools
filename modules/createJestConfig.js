'use strict'

const fs = require('fs')
const path = require('path')
const paths = require('./paths')

module.exports = (resolve, resolveAppPath) => {
  const pkg = require(resolveAppPath('package.json'))

  let setupFilesAfterEnv = [resolve('modules/jest/setup.js')]
  if (pkg.jest && pkg.jest.setupFilesAfterEnv) {
    setupFilesAfterEnv = setupFilesAfterEnv.concat(pkg.jest.setupFilesAfterEnv)
  }

  let config = {
    rootDir: resolveAppPath('.'),
    setupFilesAfterEnv: setupFilesAfterEnv,
    moduleNameMapper: {
      "^.+\\.css$": require.resolve('identity-obj-proxy'),
      "^react$": require.resolve('react'),
    },
    transform: {
      "\\.(gql|graphql)$": require.resolve('jest-transform-graphql'),
      "^.+\\.(js|jsx|mjs|ts|tsx)$": resolve('modules/jest/babelTransform.js'),
      '^(?!.*\\.(js|jsx|mjs|css|ts|tsx|json|graphql|gql)$)': resolve(
        'modules/jest/fileTransform.js'
      ),
    }
  }

  return config
}
