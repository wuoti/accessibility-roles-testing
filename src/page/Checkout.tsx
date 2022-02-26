import { Box, Button, Flex, Heading, Stack } from '@chakra-ui/react'
import { useBasket } from '../provider/BasketProvider'
import { Page, useNavigation } from '../provider/NavigationProvider'
import {
  calculateTotalOfTotals,
  calculateTotalPrices,
} from '../util/price-calculation'

const Checkout = (): JSX.Element => {
  const { basket } = useBasket()
  const { goto } = useNavigation()
  const total = calculateTotalOfTotals(calculateTotalPrices(basket))

  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      width="100%"
      height="100vh"
      direction="column"
      spacing={3}
    >
      <Heading as="h1" size="xl">
        Checkout
      </Heading>
      <Heading as="h3" size="md">
        Total due {total.fimValue}mk and {total.eurValue}€
      </Heading>
      <Button onClick={() => goto(Page.PaymentOptions)}>Back to basket</Button>
    </Stack>
  )
}

export default Checkout
