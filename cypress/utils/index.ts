import { fillAndCheckShippingSimulator } from './fill'
import { openCart, closeCart, clearCart } from './cart'
import { checkIfElementExists } from './find'
import { checkText } from './assertion'
import {
  scrollToId,
  goToSearchPage,
  goToProductPageByShelf,
} from './navigation'

export function resolveIdentifier(dataTestId: string[] | string) {
  let identifier = ''

  if (Array.isArray(dataTestId)) {
    dataTestId = dataTestId.map((id) => {
      return `[data-testid="${id}"]`
    })

    identifier = dataTestId.join(' ')
  } else {
    identifier = `[data-testid="${dataTestId}"]`
  }

  return identifier
}

/*
  Pages: *
  Selectors: {{ param }}
*/
interface IdentifierOptions {
  index: number
}

export function identifierExists(
  dataTestId: string[] | string,
  options?: IdentifierOptions
) {
  let exists = false

  if (options?.index) {
    if (Cypress.$(resolveIdentifier(dataTestId)).eq(options?.index).length) {
      exists = true
    }

    return exists
  }

  if (Cypress.$(resolveIdentifier(dataTestId)).length) {
    exists = true
  }

  return exists
}

export {
  scrollToId,
  checkText,
  openCart,
  closeCart,
  clearCart,
  fillAndCheckShippingSimulator,
  checkIfElementExists,
  goToSearchPage,
  goToProductPageByShelf,
}
