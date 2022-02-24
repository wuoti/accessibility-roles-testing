import { ChakraProvider, theme } from '@chakra-ui/react'
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
