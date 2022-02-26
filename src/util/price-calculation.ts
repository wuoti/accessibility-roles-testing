import { Basket, BasketItemType } from '../model/Model'

export interface TotalPrice {
  eurValue: number
  fimValue: number
  fimCollectValue: number
}

export type TotalPricesByCategory = { [key in BasketItemType]?: TotalPrice }

export const calculateTotalPrices = (basket: Basket): TotalPricesByCategory =>
  Object.entries(basket)
    .map(([type, items]) => [
      type as BasketItemType,
      items.length === 0
        ? undefined
        : items.reduce(
            (acc, { paymentOptions: { options, onlyEurPaymentOption } }) => {
              const paymentOption = options.find(({ isSelected }) => isSelected)
              if (paymentOption) {
                return {
                  eurValue: acc.eurValue + paymentOption.eurValue,
                  fimValue: acc.fimValue + paymentOption.fimValue,
                  fimCollectValue: acc.fimCollectValue,
                }
              } else if (onlyEurPaymentOption.isSelected) {
                return {
                  eurValue: onlyEurPaymentOption.eurValue,
                  fimValue: acc.fimValue,
                  fimCollectValue:
                    acc.fimCollectValue + onlyEurPaymentOption.fimCollectValue,
                }
              } else {
                throw new Error('No payment option selected')
              }
            },
            { eurValue: 0, fimValue: 0, fimCollectValue: 0 }
          ),
    ])
    .reduce(
      (acc, [type, total]) => ({
        ...acc,
        ...(total != null ? { [type as BasketItemType]: total } : {}),
      }),
      {}
    )

export const calculateTotalOfTotals = (totalPrices: TotalPricesByCategory) =>
  Object.values(totalPrices).reduce(
    (acc, { eurValue, fimValue, fimCollectValue }) => ({
      eurValue: acc.eurValue + eurValue,
      fimValue: acc.fimValue + fimValue,
      fimCollectValue: acc.fimCollectValue + fimCollectValue,
    }),
    { eurValue: 0, fimValue: 0, fimCollectValue: 0 }
  )
