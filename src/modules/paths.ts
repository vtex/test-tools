import fs from 'fs'
import path from 'path'

const appDirectory = fs.realpathSync(process.cwd())

export const resolveAppPath = (relative: string) =>
  path.resolve(appDirectory, relative)

export const pathExists = (relative: string) => {
  try {
    fs.accessSync(resolveAppPath(relative), fs.constants.F_OK)

    return true
  } catch (e) {
    return false
  }
}

export const moduleName = path.basename(process.cwd())
