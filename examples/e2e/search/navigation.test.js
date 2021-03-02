import { goToSearchPage } from '@vtex/test-tools/cypress'

describe('Navigation between search pages', () => {
  before(() => {
    goToSearchPage({ random: true })
  })

  it('navigates to another search page', () => {
    cy.getById('breadcrumb')

    goToSearchPage({ random: true })
  })
})
