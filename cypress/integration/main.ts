import {
  countTotal,
  extractSelectedPaymentOptionValues,
} from 'cypress/utils/payment-option'

describe('Basket', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('checks title is visible', () => {
    cy.findByRole('main', { name: /^Basket$/ })
  })

  describe('on clicking on "Remove" button on a basket item card', () => {
    const basketItemTitle = /^Hotelli Vantaa$/

    beforeEach(() => {
      cy.findByRole('article', { name: basketItemTitle })
        .findByText(/^Remove$/)
        .click()
    })

    const findConfirmationModal = () =>
      cy.findByRole('dialog', { name: /^Remove this item\?$/ })

    it('displays a confirmation modal with the basket item card', () => {
      findConfirmationModal().findByRole('article', { name: basketItemTitle })
    })

    describe('on clicking on "No" button', () => {
      beforeEach(() => {
        cy.findByRole('button', { name: /^No$/ }).click()
      })

      it('closes the confirmation modal', () => {
        findConfirmationModal().should('not.exist')
      })
    })

    describe('on clicking on "Yes" button', () => {
      beforeEach(() => {
        cy.findByRole('button', { name: /^Yes$/ }).click()
      })

      it('closes the confirmation modal', () => {
        findConfirmationModal().should('not.exist')
      })

      it('removes the basket item card from the basket', () => {
        cy.findByRole('article', { name: basketItemTitle }).should('not.exist')
      })
    })
  })

  describe('on clicking on "Continue to checkout" button', () => {
    beforeEach(() => {
      cy.findByRole('button', { name: /^Continue to checkout$/ }).click()
    })

    it('displays the checkout page', () => {
      cy.findByRole('main', { name: /^Checkout$/ })
    })

    it('displays the total due amount', () => {
      cy.findByText(/^Total due \d+mk and \d+€$/)
    })

    describe('on clicking on "Back to basket"', () => {
      beforeEach(() => {
        cy.findByRole('button', { name: /^Back to basket$/ }).click()
      })

      it('displays the "Basket" page', () => {
        cy.findByRole('main', { name: /^Basket$/ })
      })
    })
  })

  describe('Price breakdown', () => {
    const checkCorrectTotalDueAmount = () => {
      extractSelectedPaymentOptionValues().then((selectedPaymentOptions) => {
        const total = countTotal(selectedPaymentOptions)

        cy.findByRole('complementary', { name: /^Price breakdown$/ }).within(
          () => {
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
          }
        )
      })
    }

    it('displays correct total due amount for default selection', () => {
      checkCorrectTotalDueAmount()
    })

    describe('on clicking on a different payment option', () => {
      beforeEach(() => {
        cy.findAllByRole('radiogroup', { name: /^Payment options$/ })
          .first()
          .findAllByText(/^\d+mk \+ \d+€$/)
          .first()
          .click()
      })
      it.only('displays correct total due amount', () => {
        checkCorrectTotalDueAmount()
      })
    })

    describe('on clicking on only cash payment option', () => {
      beforeEach(() => {
        cy.findAllByRole('radiogroup', { name: /^Payment options$/ })
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
