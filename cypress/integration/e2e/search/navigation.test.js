import { goToSearchPage } from '../../../utils'

describe('Navigation between search pages', () => {
  before(() => {
    cy.visit('/')
    goToSearchPage({ random: true })
  })

  it('navigates to another search page', () => {
    cy.getById('breadcrumb')

    goToSearchPage({ random: true })
  })
})
