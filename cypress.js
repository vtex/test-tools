import * as utils from './dist/cypress/utils'
import vtexCommands from './dist/cypress/support/commands.js'

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
  scrollToId: utils.scrollToId,
  vtexCommands,
}
