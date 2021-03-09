describe('Pagination state', () => {
  before(() => {
    let interceptCount = 0

    cy.intercept(/operationName=SearchQuery/, (req) => {
      req.reply((res) => {
        if (interceptCount === 0) {
          interceptCount += 1
          res.send({ fixture: 'search-query.json' })
        } else {
          res.send({ fixture: 'search-query-24.json' })
        }
      })
    }).as('load')

    cy.visit('/cubas-e-tanques')
  })

  it('tests if the pagination state is kept after page changes', () => {
    cy.getById('productSummaryContainer').should('have.length', 12)

    cy.get('[aria-label="Mostrar Mais"]').should('be.visible')

    cy.intercept(/operationName=SearchPageQuery/, {
      fixture: 'search-page-query.json',
    }).as('loadPage')

    cy.intercept(/page-data/, {
      fixture: 'page-data.json',
    }).as('loadPageData')

    cy.getById('offerPrice')

    cy.scrollTo(0, '100%')

    cy.get('[aria-label="Mostrar Mais"]').click({
      force: true,
      position: 'center',
    })

    cy.getById('productSummaryContainer').should('have.length', 24)

    cy.getById('productSummaryContainer').eq(0).invoke('show').click()

    cy.url().should('include', '/p')

    cy.go('back')

    cy.getById('productSummaryContainer').should('have.length', 24)
  })
})
