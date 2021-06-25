/*
  Pages: ProductPage
  Selectors: postalCode, postalCodeSubmit, shippingTable
*/
interface FillAndCheckShippingSimulatorParams {
  force: boolean
  postalCode: string
}

export function fillAndCheckShippingSimulator(
  params: FillAndCheckShippingSimulatorParams
) {
  cy.get('[data-testid="postalCode"]').type(params?.postalCode)
  cy.get('[data-testid="postalCodeSubmit"]').click()

  cy.get('body').find('[data-testid="shippingTable"]')
}
