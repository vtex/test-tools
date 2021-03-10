import { resolveIdentifier } from '.'

export function checkIfElementExists(dataTestId: string[] | string) {
  cy.get('body').then(($body) => {
    if ($body.find(resolveIdentifier(dataTestId))) {
      return true
    }

    return false
  })
}
