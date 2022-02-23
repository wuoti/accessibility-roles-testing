import { Box, Flex, Grid, HStack, Stack, Text, VStack } from '@chakra-ui/react'
import { useState } from 'react'
import { Basket, BasketItemType } from '../Model'
import { useBasket } from '../provider/BasketProvider'

interface TotalPrice {
  eurValue: number
  fimValue: number
  fimCollectValue: number
}

type TotalPricesByCategory = { [key in BasketItemType]?: TotalPrice }

const calculateTotalPrices = (basket: Basket): TotalPricesByCategory =>
  Object.entries(basket)
    .map(([type, items]) => [
      type as BasketItemType,
      items.reduce(
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
      (acc, [type, total]) => ({ ...acc, [type as BasketItemType]: total }),
      {}
    )

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

  const totalOfTotals = Object.values(totalPrices).reduce(
    (acc, { eurValue, fimValue, fimCollectValue }) => ({
      eurValue: acc.eurValue + eurValue,
      fimValue: acc.fimValue + fimValue,
      fimCollectValue: acc.fimCollectValue + fimCollectValue,
    }),
    { eurValue: 0, fimValue: 0, fimCollectValue: 0 }
  )

  return (
    <Stack border="1px solid black" borderRadius={5} p={3} mt="95px">
      <Stack spacing={5}>
        {Object.entries(totalPrices).map(([type, price]) => (
          <PriceBreakDownByType
            key={type}
            type={type as BasketItemType}
            totalPrice={price}
          />
        ))}
      </Stack>
      <hr />
      <Text fontWeight="bold" textAlign="right">
        Total due
      </Text>
      <Stack
        textAlign="right"
        direction="row"
        justifyContent="flex-end"
        columnGap={5}
      >
        <Text>{totalOfTotals.fimValue}mk</Text>
        <Text>{totalOfTotals.eurValue}€</Text>
      </Stack>
      {totalOfTotals.fimCollectValue > 0 && (
        <Text textAlign="center" fontSize="xs">
          Collect {totalOfTotals.fimCollectValue}mk with this purchase
        </Text>
      )}
    </Stack>
  )
}

export default PriceBreakdown
