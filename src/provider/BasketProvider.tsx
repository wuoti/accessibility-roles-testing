import { createContext, ReactNode, useContext, useState } from 'react'
import { Basket, BasketItem, BasketItemType, createBasket } from '../Model'

type BasketContext = {
  basket: Basket
  removeBasketItem: (id: string, type: BasketItemType) => void
  selectPaymentOption: (
    basketItemId: string,
    type: BasketItemType,
    paymentOptionId: string
  ) => void
}

const BasketContext = createContext<BasketContext | undefined>(undefined)

export const useBasket = () => {
  const basket = useContext(BasketContext)

  if (!basket) {
    throw new Error('Basket has not been initialised')
  }

  return basket
}

const BasketProvider = ({ children }: { children: ReactNode }) => {
  const [basket, setBasket] = useState(createBasket())

  const selectPaymentOption = (
    basketItemId: string,
    type: BasketItemType,
    paymentOptionId: string
  ) => {
    setBasket((basket) => ({
      ...basket,
      [type]: basket[type].map((item) => {
        if (item.id !== basketItemId) {
          return item
        }

        return {
          ...item,
          paymentOptions: {
            ...item.paymentOptions,
            options: item.paymentOptions.options.map((paymentOption) => ({
              ...paymentOption,
              isSelected: paymentOption.id === paymentOptionId,
            })),
            onlyEurPaymentOption: {
              ...item.paymentOptions.onlyEurPaymentOption,
              isSelected:
                item.paymentOptions.onlyEurPaymentOption.id === paymentOptionId,
            },
          },
        }
      }),
    }))
  }

  const removeBasketItem = (id: string, type: BasketItemType) =>
    setBasket((basket) => ({
      ...basket,
      [type]: basket[type].filter((item) => item.id !== id),
    }))

  return (
    <BasketContext.Provider
      value={{ basket, removeBasketItem, selectPaymentOption }}
    >
      {children}
    </BasketContext.Provider>
  )
}

export default BasketProvider
