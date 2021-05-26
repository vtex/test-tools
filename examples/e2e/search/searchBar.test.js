describe('Searchbar', () => {
  before(() => {
    cy.intercept(/operationName=ProductsSuggestionsQuery/, {
      fixture: 'product-suggestions-query.json',
    }).as('searchSuggestionsLoad')
  })

  it('finds a very specific product using the search bar', () => {
    cy.visit('/')

    cy.getById('searchBarInput').eq(0).type('Product')

    cy.getById('searchSuggestionsItem').contains('Product').trigger('click')
  })
})
