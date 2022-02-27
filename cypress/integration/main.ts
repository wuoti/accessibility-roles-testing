import {
  countTotal,
  extractSelectedPaymentOptionValues,
  paymentOptionsRadioButtonGroupTestId,
} from 'cypress/utils/payment-option'

const basketItemCardTestId = 'basket-item-card'
const confirmationModalTestId = 'confirmation-modal'
const priceBreakdownTestId = 'price-breakdown'

describe('Basket', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('checks title is visible', () => {
    cy.findByText(/^Basket$/)
  })

  describe('on clicking on "Remove" button on a basket item card', () => {
    const basketItemTitle = 'Hotelli Vantaa'

    beforeEach(() => {
      cy.findAllByTestId(basketItemCardTestId)
        .findByText(basketItemTitle)
        .parentsUntil(`[data-testid=${basketItemCardTestId}]`)
        .parent()
        .within(() => {
          cy.findByText(/^Remove$/).click()
        })
    })

    it('displays a confirmation modal with the basket item card', () => {
      cy.findByTestId(confirmationModalTestId)
        .findByTestId(basketItemCardTestId)
        .findByText(basketItemTitle)
    })

    describe('on clicking on "No" button', () => {
      beforeEach(() => {
        cy.findByText(/^No$/).click()
      })

      it('closes the confirmation modal', () => {
        cy.findByTestId(confirmationModalTestId).should('not.exist')
      })
    })

    describe('on clicking on "Yes" button', () => {
      beforeEach(() => {
        cy.findByText(/^Yes$/).click()
      })

      it('closes the confirmation modal', () => {
        cy.findByTestId(confirmationModalTestId).should('not.exist')
      })

      it('removes the basket item card from the basket', () => {
        cy.findAllByTestId(basketItemCardTestId)
          .findByText(basketItemTitle)
          .should('not.exist')
      })
    })
  })

  describe('on clicking on "Continue to checkout" button', () => {
    beforeEach(() => {
      cy.findByText(/^Continue to checkout$/).click()
    })

    it('displays the checkout page', () => {
      cy.findByText(/^Checkout$/)
    })

    it('displays the total due amount', () => {
      cy.findByText(/^Total due \d+mk and \d+€$/)
    })

    describe('on clicking on "Back to basket"', () => {
      beforeEach(() => {
        cy.findByText(/^Back to basket$/).click()
      })

      it('displays the "Basket" page', () => {
        cy.findByText(/^Basket$/)
      })
    })
  })

  describe('Price breakdown', () => {
    const checkCorrectTotalDueAmount = () => {
      extractSelectedPaymentOptionValues().then((selectedPaymentOptions) => {
        const total = countTotal(selectedPaymentOptions)

        cy.findByTestId(priceBreakdownTestId).within(() => {
          cy.findByTestId('total-fim')
            .invoke('text')
            .should('eq', `${total.fimValue}mk`)

          cy.findByTestId('total-eur')
            .invoke('text')
            .should('eq', `${total.eurValue}€`)

          const fimCollectValue = cy.findByTestId('fim-collect-value')

          if (total.fimCollectValue !== 0) {
            fimCollectValue
              .invoke('text')
              .should(
                'eq',
                `Collect ${total.fimCollectValue}mk with this purchase`
              )
          } else {
            fimCollectValue.should('not.exist')
          }
        })
      })
    }

    it('displays correct total due amount for default selection', () => {
      checkCorrectTotalDueAmount()
    })

    describe('on clicking on a different payment option', () => {
      beforeEach(() => {
        cy.findAllByTestId(paymentOptionsRadioButtonGroupTestId)
          .first()
          .findAllByText(/^\d+mk \+ \d+€$/)
          .first()
          .click()
      })
      it('displays correct total due amount', () => {
        checkCorrectTotalDueAmount()
      })
    })

    describe('on clicking on only cash payment option', () => {
      beforeEach(() => {
        cy.findAllByTestId(paymentOptionsRadioButtonGroupTestId)
          .first()
          .findByText(/\d+€ and collect \d+mk/)
          .click()
      })
      it('displays correct total due amount and collect value', () => {
        checkCorrectTotalDueAmount()
      })
    })
  })
})
