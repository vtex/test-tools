import { resolveIdentifier } from './index'

/*
  Pages: *
  Selectors: {{ param }}
*/
interface CheckOptions {
  index: number
}

export function checkText(
  dataTestId: string[] | string,
  expectedText: string,
  options: CheckOptions
) {
  if (options?.index) {
    cy.get(resolveIdentifier(dataTestId))
      .eq(options.index)
      .should('have.text', expectedText)

    return
  }

  cy.get(resolveIdentifier(dataTestId)).should('have.text', expectedText)
}
