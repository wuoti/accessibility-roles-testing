export interface OnlyEurPaymentOption {
  id: string
  eurValue: number
  fimCollectValue: number
  isSelected?: boolean
}

export interface PaymentOption {
  id: string
  eurValue: number
  fimValue: number
  isSelected?: boolean
}

export interface PaymentOptions {
  onlyEurPaymentOption: OnlyEurPaymentOption
  options: PaymentOption[]
}

export type BasketItemType = 'hotel' | 'experience' | 'carHire'

export interface BasketItem {
  id: string
  name: string
  startDate: Date
  endDate: Date
  paymentOptions: PaymentOptions
}

export type Basket = {
  [key in BasketItemType]: BasketItem[]
}

export const createBasket = (): Basket => {
  const now = new Date()
  const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000)

  const hotel: BasketItem[] = [
    {
      id: '1',
      name: 'Hotelli Vantaa',
      startDate: now,
      endDate: nextWeek,
      paymentOptions: {
        onlyEurPaymentOption: {
          id: '1',
          eurValue: 120,
          fimCollectValue: 720,
        },
        options: [
          {
            id: '2',
            eurValue: 60,
            fimValue: 360,
          },
          {
            id: '3',
            eurValue: 80,
            fimValue: 240,
            isSelected: true,
          },
        ],
      },
    },
    {
      id: '2',
      name: 'Hotelli Pasila',
      startDate: now,
      endDate: nextWeek,
      paymentOptions: {
        onlyEurPaymentOption: {
          id: '4',
          eurValue: 120,
          fimCollectValue: 720,
        },
        options: [
          {
            id: '5',
            eurValue: 60,
            fimValue: 360,
          },
          {
            id: '3',
            eurValue: 80,
            fimValue: 240,
            isSelected: true,
          },
        ],
      },
    },
  ]

  const experience: BasketItem[] = [
    {
      id: '3',
      name: 'Aurajoki cruise',
      startDate: now,
      endDate: nextWeek,
      paymentOptions: {
        onlyEurPaymentOption: {
          id: '4',
          eurValue: 120,
          fimCollectValue: 720,
        },
        options: [
          {
            id: '5',
            eurValue: 60,
            fimValue: 360,
          },
          {
            id: '6',
            eurValue: 80,
            fimValue: 240,
            isSelected: true,
          },
        ],
      },
    },
    {
      id: '4',
      name: 'Curling tournament',
      startDate: now,
      endDate: nextWeek,
      paymentOptions: {
        onlyEurPaymentOption: {
          id: '7',
          eurValue: 120,
          fimCollectValue: 720,
        },
        options: [
          {
            id: '8',
            eurValue: 60,
            fimValue: 360,
          },
          {
            id: '9',
            eurValue: 80,
            fimValue: 240,
            isSelected: true,
          },
        ],
      },
    },
  ]

  const carHire: BasketItem[] = [
    {
      id: '5',
      name: 'Automajava Oy',
      startDate: now,
      endDate: nextWeek,
      paymentOptions: {
        onlyEurPaymentOption: {
          id: '10',
          eurValue: 120,
          fimCollectValue: 720,
        },
        options: [
          {
            id: '11',
            eurValue: 60,
            fimValue: 360,
          },
          {
            id: '12',
            eurValue: 80,
            fimValue: 240,
            isSelected: true,
          },
        ],
      },
    },
  ]

  return {
    hotel,
    experience,
    carHire,
  }
}

export const getSelectedPaymentOptionId = (item: BasketItem) => {
  const selectedPaymentOptions = [
    ...item.paymentOptions.options.filter(({ isSelected }) => isSelected),
    ...(item.paymentOptions.onlyEurPaymentOption.isSelected
      ? [item.paymentOptions.onlyEurPaymentOption]
      : []),
  ]

  if (selectedPaymentOptions.length !== 1) {
    throw new Error('Must have exactly one payment option selected')
  }

  return selectedPaymentOptions[0].id
}
