import { createContext, ReactNode, useContext, useState } from 'react'
import Checkout from '../page/Checkout'
import PaymentOptions from '../page/Basket'

export enum Page {
  PaymentOptions = 'PaymentOptions',
  Checkout = 'Checkout',
}

interface NavigationContext {
  goto: (page: Page) => void
  page: JSX.Element
}

const NavigationContext = createContext<NavigationContext | undefined>(
  undefined
)

export const useNavigation = () => {
  const navigation = useContext(NavigationContext)

  if (!navigation) {
    throw new Error('Navigation has not been initialised')
  }
  return navigation
}

const NavigationProvider = ({ children }: { children: ReactNode }) => {
  const [displayedPage, setDisplayedPage] = useState(Page.PaymentOptions)

  const goto = (page: Page) => setDisplayedPage(page)

  const pages = {
    [Page.PaymentOptions]: PaymentOptions,
    [Page.Checkout]: Checkout,
  }

  const RenderedPage = pages[displayedPage]
  return (
    <NavigationContext.Provider
      value={{
        goto,
        page: <RenderedPage />,
      }}
    >
      {children}
    </NavigationContext.Provider>
  )
}

export default NavigationProvider
