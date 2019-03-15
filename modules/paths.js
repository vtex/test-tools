'use strict'

const fs = require('fs')
const path = require('path')

const appDirectory = fs.realpathSync(process.cwd())
const resolveAppPath = relative => path.resolve(appDirectory, relative)

const pathExists = relative => {
  try {
    fs.accessSync(resolveAppPath(relative), fs.constants.F_OK)

    return true
  } catch (e) {
    return false
  }
}

module.exports.resolveAppPath = resolveAppPath
module.exports.moduleName = path.basename(process.cwd())
module.exports.pathExists = pathExists