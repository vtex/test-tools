import fs from 'fs'

export const readJSON = (path: string) => {
  return JSON.parse(fs.readFileSync(path).toString())
}
