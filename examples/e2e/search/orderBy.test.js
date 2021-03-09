import { goToSearchPage, checkIfElementExists } from '@vtex/test-tools/cypress'

describe('OrderBy filter', () => {
  /*
    Constants
  */
  const PRICE_REGEX = /\d{1,3}(?:[.,]\d{3})*(?:[.,]\d{2})/g

  const formatPrice = (price) => {
    if (!price) return

    return parseFloat(price.replace(',', '.'))
  }

  before(() => {
    goToSearchPage({ random: true })
  })

  it('tests OrderByPriceDESC option', () => {
    cy.getById('refineSearch').select('OrderByPriceDESC')

    cy.url().should('include', 'orderBy=OrderByPriceDESC')

    cy.getById('offerPrice').then((productPriceList) => {
      const prices = []

      productPriceList.each((_, productPrice) => {
        const price = PRICE_REGEX.exec(productPrice.textContent) || []

        prices.push(formatPrice(price[0]))
      })

      const sortedPrices = prices.sort((a, b) => a - b)

      expect(prices).to.equal(sortedPrices)
    })
  })

  it('tests OrderByPriceASC option', () => {
    goToSearchPage()
    cy.getById('refineSearch').select('OrderByPriceASC')

    cy.url().should('include', 'orderBy=OrderByPriceASC')

    cy.getById('offerPrice').then((productPriceList) => {
      const prices = []

      productPriceList.each((_, productPrice) => {
        const price = PRICE_REGEX.exec(productPrice.textContent) || []

        prices.push(formatPrice(price[0]))
      })

      const sortedPrices = prices.sort((a, b) => b - a)

      expect(prices).to.equal(sortedPrices)
    })
  })

  it('tests OrderByNameDESC option', () => {
    cy.getById('refineSearch').select('OrderByNameDESC')

    cy.url().should('include', 'orderBy=OrderByNameDESC')

    cy.getById('productSummaryTitle').then((productPriceList) => {
      const prices = []

      productPriceList.each((_, productPrice) => {
        const price = PRICE_REGEX.exec(productPrice.textContent) || []

        prices.push(formatPrice(price[0]))
      })

      const sortedPrices = prices.sort((a, b) => b - a)

      expect(prices).to.equal(sortedPrices)
    })
  })

  it('tests OrderByNameDESC option', () => {
    cy.getById('refineSearch').select('OrderByNameDESC')

    cy.url().should('include', 'orderBy=OrderByNameDESC')

    cy.getById('productSummaryTitle', {
      timeout: 10000,
    }).then((productSummaryNames) => {
      const names = []

      productSummaryNames.each((_, productName) => {
        names.push(productName.textContent)
      })

      const sortedNames = names.sort((a, b) => (a < b ? 1 : -1))

      expect(names).to.equal(sortedNames)
    })
  })

  it('tests OrderByNameASC option', () => {
    cy.getById('refineSearch').select('OrderByNameASC')

    cy.url().should('include', 'orderBy=OrderByNameASC')

    cy.getById('productSummaryTitle').then((productSummaryNames) => {
      const names = []

      productSummaryNames.each((_, productName) => {
        names.push(productName.textContent)
      })

      const sortedNames = names.sort((a, b) => (a < b ? -1 : 1))

      expect(names).to.equal(sortedNames)
    })
  })

  it('tests OrderByReviewRateDESC option', () => {
    cy.getById('refineSearch').select('OrderByReviewRateDESC')
    cy.url().should('include', 'orderBy=OrderByReviewRateDESC')
  })

  it('tests OrderByTopSaleDESC option', () => {
    cy.getById('refineSearch').select('OrderByTopSaleDESC')
    cy.url().should('include', 'orderBy=OrderByTopSaleDESC')
  })

  it('tests OrderByBestDiscountDESC option', () => {
    cy.getById('refineSearch').select('OrderByBestDiscountDESC')
    cy.url().should('include', 'orderBy=OrderByBestDiscountDESC')
  })

  it('tests OrderByReleaseDateDESC option', () => {
    cy.getById('refineSearch').select('OrderByReleaseDateDESC')
    cy.url().should('include', 'orderBy=OrderByReleaseDateDESC')
  })
})
