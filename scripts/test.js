#!/usr/bin/env node
'use strict'

process.env.BABEL_ENV = 'test'
process.env.NODE_ENV = 'test'

process.on('unhandledRejection', err => {
  throw err
})

const jest = require('jest')
const path = require('path')
const paths = require('../modules/paths')
const createJestConfig = require('../modules/createJestConfig')

function startTest(...processArgs) {
  const args = processArgs ? processArgs.slice(0) : []

  const config = createJestConfig(
    relativePath => path.resolve(__dirname, '..', relativePath),
    paths.resolveAppPath
  )

  args.push('--config', JSON.stringify(config))

  jest.run(args)
}

module.exports = startTest
