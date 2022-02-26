import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Radio,
  RadioGroup,
  Stack,
  Text,
} from '@chakra-ui/react'
import { IconType } from 'react-icons'
import { FaCar, FaGlobe, FaHotel } from 'react-icons/fa'
import { BasketItem, BasketItemType, PaymentOptions } from '../model/Model'

interface BasketItemCardProps extends BasketItem {
  type: BasketItemType
  onRemove?: VoidFunction
  showPaymentOptions?: boolean
  selectedPaymentOptionId?: string
  selectPaymentOption?: (id: string) => void
}

const formatDate = (date: Date) =>
  date.toLocaleDateString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  })

interface PaymentOptionsSelectProps extends PaymentOptions {
  selectedPaymentOptionId: string
  selectPaymentOption: (value: string) => void
}

const PaymentOptionsSelect = ({
  selectedPaymentOptionId,
  selectPaymentOption,
  onlyEurPaymentOption,
  options,
}: PaymentOptionsSelectProps): JSX.Element => {
  return (
    <Stack flex={1}>
      <RadioGroup
        onChange={selectPaymentOption}
        value={selectedPaymentOptionId}
        aria-label="Payment options"
      >
        <Stack>
          {options.map(({ id, eurValue, fimValue }, i) => (
            <Radio
              key={id}
              value={id}
              data-testid={`payment-option-radio-button-${i}`}
            >
              <Text fontSize="sm">
                {fimValue}mk + {eurValue}€
              </Text>
            </Radio>
          ))}
          <hr />
          <Radio
            value={onlyEurPaymentOption.id}
            data-testid="only-cash-payment-option-radio-button"
          >
            <Text fontSize="sm">
              {onlyEurPaymentOption.eurValue}€ and collect{' '}
              {onlyEurPaymentOption.fimCollectValue}mk
            </Text>
          </Radio>
        </Stack>
      </RadioGroup>
    </Stack>
  )
}

const BasketItemCard = ({
  id,
  type,
  name,
  startDate,
  endDate,
  paymentOptions,
  onRemove,
  showPaymentOptions = true,
  selectPaymentOption,
  selectedPaymentOptionId,
}: BasketItemCardProps): JSX.Element => {
  if (
    showPaymentOptions &&
    (!selectPaymentOption || !selectedPaymentOptionId)
  ) {
    throw new Error(
      'Payment option handlers must be defined if payment options are visible'
    )
  }

  const icons: { [key in BasketItemType]: IconType } = {
    hotel: FaHotel,
    experience: FaGlobe,
    carHire: FaCar,
  }

  const Icon = icons[type]

  return (
    <Box position="relative" as="article" aria-label={name}>
      {onRemove && (
        <Button
          position="absolute"
          top={0}
          right={0}
          transform="translate(0, -100%)"
          variant="link"
          size="sm"
          onClick={onRemove}
        >
          Remove
        </Button>
      )}
      <Grid
        border={'1px solid black'}
        borderRadius={5}
        p={3}
        gap={5}
        templateColumns={'1fr 6fr'}
      >
        <Icon size="100%" />
        <Flex gap={3}>
          <Stack flex={2}>
            <Flex direction="row" justifyContent="space-between">
              <Heading as="h3" size="sm">
                {name}
              </Heading>
              <Text size="xs">id: {id}</Text>
            </Flex>

            <Text>
              {formatDate(startDate)} - {formatDate(endDate)}
            </Text>
          </Stack>
          {showPaymentOptions && (
            <PaymentOptionsSelect
              selectedPaymentOptionId={selectedPaymentOptionId!}
              selectPaymentOption={selectPaymentOption!}
              {...paymentOptions}
            />
          )}
        </Flex>
      </Grid>
    </Box>
  )
}

export default BasketItemCard
