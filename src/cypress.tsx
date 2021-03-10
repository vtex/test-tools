import * as utils from './cypress/utils'
import vtexCommands from './cypress/support/commands.js'

export default {
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
