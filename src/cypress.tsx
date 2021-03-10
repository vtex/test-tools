/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-require-imports */
import * as utils from './cypress/utils'

const vtexCommands = require('./cypress/support/commands.js')

module.exports = {
  goToSearchPage: utils.goToSearchPage,
  goToProductPageByShelf: utils.goToProductPageByShelf,
  checkText: utils.checkText,
  openCart: utils.openCart,
  closeCart: utils.closeCart,
  clearCart: utils.clearCart,
  fillAndCheckShippingSimulator: utils.fillAndCheckShippingSimulator,
  resolveIdentifier: utils.resolveIdentifier,
  identifierExists: utils.identifierExists,
  checkIfElementExists: utils.checkIfElementExists,
  scrollToId: utils.scrollToId,
  vtexCommands,
}
