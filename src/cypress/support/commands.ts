// ***********************************************
import { resolveIdentifier } from '../utils/index'
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

// export function clickAt(dataTestId: string, options: ClickOptions) {
//   if (options?.index !== undefined) {
//     cy.get(resolveIdentifier(dataTestId)).eq(0).click({ force: options?.force })

//     return
//   }

//   cy.get(resolveIdentifier(dataTestId)).click({ force: options?.force })
// }

const vtexCommands = () => {
  Cypress.Commands.add('getById', (dataTestId: string[] | string) => {
    cy.get(resolveIdentifier(dataTestId))
  })

  Cypress.Commands.add(
    'typeById',
    (dataTestId: string[] | string, text: string) => {
      cy.get(resolveIdentifier(dataTestId)).type(text)
    }
  )

  /*
    Pages: *
    Selectors: {{ param }}
  */
  interface ClickOptions {
    force: boolean
    index: number
  }

  Cypress.Commands.add(
    'clickById',
    (dataTestId: string[] | string, options?: ClickOptions) => {
      if (options?.index !== undefined) {
        cy.get(resolveIdentifier(dataTestId))
          .eq(options.index)
          .click({ force: options?.force })

        return
      }

      cy.get(resolveIdentifier(dataTestId)).click({ force: options?.force })
    }
  )
}

export default vtexCommands
