import { ChakraProvider, theme } from '@chakra-ui/react'
import React, {
  createContext,
  PropsWithChildren,
  ReactNode,
  useState,
} from 'react'
import { Basket, BasketItemType, createBasket } from './Model'
import PaymentOptions from './page/PaymentOptions'
import BasketProvider from './provider/BasketProvider'

const App = (): JSX.Element => {
  return (
    <ChakraProvider theme={theme}>
      <BasketProvider>
        <PaymentOptions />
      </BasketProvider>
    </ChakraProvider>
  )
}

export default App
