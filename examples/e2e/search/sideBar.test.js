import {
  goToSearchPage,
  resolveIdentifier,
  checkIfElementExists,
} from '@vtex/test-tools/cypress'

describe('Sidebar filter', () => {
  /*
    Pages: *
    Selectors: {{ param }}
  */
  const getText = (dataId, { index } = {}) => {
    if (index !== undefined) {
      return Cypress.$(resolveIdentifier(dataId)).eq(index).text()
    }

    return Cypress.$(resolveIdentifier(dataId)).text()
  }

  const filterCategory = () => {
    if (checkIfElementExists(['collapsible-Categoria', 'filterItemCheckbox'])) {
      cy.get(
        '[data-testid="collapsible-Categoria"] [data-testid="searchFilterAccordionCollaipsibleIcon"]'
      )
        .eq(0)
        .click({
          force: true,
        })
    }

    cy.getById(['collapsible-Categoria', 'filterItemCheckbox'])
      .eq(0)
      .click({ force: true })

    cy.location().url().should('include', 'map=')

    cy.get('[data-testid="breadcrumb"] div:nth-child(3)').should(
      ($breadcrumbTitle) => {
        expect($breadcrumbTitle).to.have.text(
          getText(['collapsible-Categoria', 'filterItemValue'], {
            index: 0,
          })
        )
      }
    )
  }

  before(() => {
    goToSearchPage({ random: 1 })
  })

  it('checks if there is duplicated filters', () => {
    if (checkIfElementExists('collapsibleHeader')) {
      cy.getById('collapsibleHeader').then((headers) => {
        headers = headers.map((_, header = '') => {
          return (
            header && header.textContent && header.textContent.toLowerCase()
          )
        })

        const uniqueHeaders = [...new Set(headers)]

        expect(uniqueHeaders.length).to.equal(headers.length)
      })
    }
  })

  it('tests the use of the category filter', () => {
    if (checkIfElementExists('collapsibleHeader')) {
      cy.getById('collapsibleHeader').each((header) => {
        if (header.text() === 'Categoria') filterCategory()
      })
    }
  })
})
