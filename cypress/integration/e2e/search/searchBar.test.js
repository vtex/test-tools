describe('Searchbar', () => {
  before(() => {
    cy.intercept(/operationName=ProductsSuggestionsQuery/, {
      fixture: 'product-suggestions-query.json',
    }).as('searchSuggestionsLoad')
  })

  it('finds a very specific product using the search bar', () => {
    cy.visit('/')

    cy.get('[data-testid="searchBarInput"]').eq(0).type('Product')

    cy.get('[data-testid="searchSuggestionsItem"]').contains('Product').click()
  })
})
