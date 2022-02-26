export const paymentOptionsRadioButtonGroupTestId =
  'payment-options-radio-button-group'

export interface PaymentOption {
  fimValue: number
  eurValue: number
  fimCollectValue: number
}

export const countTotal = (paymentOptions: PaymentOption[]) =>
  paymentOptions.reduce(
    (acc, { eurValue, fimCollectValue, fimValue }) => ({
      fimValue: acc.fimValue + fimValue,
      eurValue: acc.eurValue + eurValue,
      fimCollectValue: acc.fimCollectValue + fimCollectValue,
    }),
    {
      fimValue: 0,
      eurValue: 0,
      fimCollectValue: 0,
    }
  )

export const extractSelectedPaymentOptionValues = () => {
  return cy
    .findAllByTestId(paymentOptionsRadioButtonGroupTestId)
    .get('label[data-checked]')
    .then(($radioButtons) => {
      const radioButtons = $radioButtons.toArray()

      return radioButtons
        .map(($radioButton) => $radioButton.textContent)
        .map((text) => {
          const paymentOptionRegex = /^(\d+)mk \+ (\d+)€$/
          const onlyCashRegex = /^(\d+)€ and collect (\d+)mk$/
          const paymentOptionMatch = text?.match(paymentOptionRegex)
          const onlyCashMatch = text?.match(onlyCashRegex)

          if (paymentOptionMatch) {
            return {
              fimValue: Number(paymentOptionMatch![1]),
              eurValue: Number(paymentOptionMatch![2]),
              fimCollectValue: 0,
            }
          } else if (onlyCashMatch) {
            return {
              fimValue: 0,
              eurValue: Number(onlyCashMatch![1]),
              fimCollectValue: Number(onlyCashMatch![2]),
            }
          } else {
            throw new Error('Cannot parse payment option selection')
          }
        })
    })
}
