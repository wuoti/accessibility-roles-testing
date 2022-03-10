import {
  Box,
  Button,
  Flex,
  List,
  ListItem,
  Stack,
  Text,
} from '@chakra-ui/react'
import { BasketItemType } from '../model/Model'
import { useBasket } from '../provider/BasketProvider'
import { Page, useNavigation } from '../provider/NavigationProvider'
import {
  calculateTotalOfTotals,
  calculateTotalPrices,
  TotalPrice,
} from '../util/price-calculation'

interface PriceBreakDownByTypeProps {
  type: BasketItemType
  totalPrice: TotalPrice
}

const PriceBreakDownByType = ({
  type,
  totalPrice,
}: PriceBreakDownByTypeProps): JSX.Element => {
  const titles: { [key in BasketItemType]: string } = {
    hotel: 'Hotel stay',
    experience: 'Experience',
    carHire: 'Car hire',
  }

  return (
    <Flex direction="row" justifyContent="space-between" fontSize="xs">
      <Box fontWeight="bold">{titles[type]}</Box>
      <Stack textAlign="right">
        {totalPrice.fimValue > 0 && <Box>{totalPrice.fimValue}mk</Box>}
        {totalPrice.eurValue > 0 && <Box>{totalPrice.eurValue}€</Box>}
        {totalPrice.fimCollectValue > 0 && (
          <Box>collect {totalPrice.fimCollectValue}mk</Box>
        )}
      </Stack>
    </Flex>
  )
}

const PriceBreakdown = (): JSX.Element => {
  const { basket } = useBasket()

  const totalPrices = calculateTotalPrices(basket)
  const totalOfTotals = calculateTotalOfTotals(totalPrices)

  const { goto } = useNavigation()

  return (
    <Stack
      border="1px solid black"
      borderRadius={5}
      p={3}
      mt="95px"
      spacing={3}
      as="aside"
      aria-label="Price breakdown"
    >
      <Stack spacing={5}>
        <List>
          {Object.entries(totalPrices).map(([type, price]) => (
            <ListItem key={type}>
              <PriceBreakDownByType
                type={type as BasketItemType}
                totalPrice={price}
              />
            </ListItem>
          ))}
        </List>
      </Stack>
      <hr />
      <Box>
        <Text fontWeight="bold" textAlign="right">
          Total due
        </Text>
        <Stack
          textAlign="right"
          direction="row"
          justifyContent="flex-end"
          spacing={6}
        >
          <Text data-testid="total-fim">{totalOfTotals.fimValue}mk</Text>
          <Text data-testid="total-eur">{totalOfTotals.eurValue}€</Text>
        </Stack>
        {totalOfTotals.fimCollectValue > 0 && (
          <Text
            textAlign="center"
            fontSize="xs"
            data-testid="fim-collect-value"
          >
            Collect {totalOfTotals.fimCollectValue}mk with this purchase
          </Text>
        )}
      </Box>
      <Button size="md" onClick={() => goto(Page.Checkout)}>
        Continue to checkout
      </Button>
    </Stack>
  )
}

export default PriceBreakdown
