#!/usr/bin/env node

const args = process.argv.slice(2)

const [script] = args

switch (script) {
  case 'test': {
    const executeScript = require(`../scripts/${script}`)

    try {
      executeScript(...args.slice(1))
    } catch (e) {
      console.info(`An error occurred while running the script "${script}".\n`)
      console.info(
        'If you think this is a bug in our tools, feel free to file a bug report at',
        'https://www.github.com/vtex/react-testing/issues\n'
      )
      process.exit(1)
    }

    break
  }

  default:
    console.error(`Unknown script "${script}".`)
    break
}
