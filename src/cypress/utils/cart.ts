/*
  Pages: *
  Selectors: openCart
*/
export function openCart() {
  cy.get('[data-testid="openCart"').trigger('click')
}

/*
  Pages: *
  Selectors: closeCart
*/
export function closeCart() {
  cy.get('[data-testid="closeCart"').trigger('click')
}

/*
  Pages: *
  Selectors: minicartDelete
*/
export function clearCart() {
  openCart()

  cy.get('body').then(($body) => {
    if ($body.find('[data-testid="minicartDelete"]').length) {
      cy.get('[data-testid="minicartDelete"]').each(($deleteIcon, _) => {
        cy.wrap($deleteIcon).trigger('click')
      })
    }
  })

  closeCart()
}
