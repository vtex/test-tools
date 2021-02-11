import { goToSearchPage } from '@vtex/test-tools/cypress'

describe('Navigation between search pages', () => {
  before(() => {
    cy.visit('/')
    goToSearchPage({ random: 1 })
  })

  it('navigates to another search page', () => {
    cy.getById('breadcrumb')

    goToSearchPage({ random: 1 })
  })
})
