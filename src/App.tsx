import { ChakraProvider, theme } from '@chakra-ui/react'
import React from 'react'
import BasketProvider from './provider/BasketProvider'
import NavigationProvider, {
  useNavigation,
} from './provider/NavigationProvider'

const Navigator = (): JSX.Element => {
  const { page } = useNavigation()

  return page
}

const App = (): JSX.Element => {
  return (
    <ChakraProvider theme={theme}>
      <BasketProvider>
        <NavigationProvider>
          <Navigator />
        </NavigationProvider>
      </BasketProvider>
    </ChakraProvider>
  )
}

export default App
