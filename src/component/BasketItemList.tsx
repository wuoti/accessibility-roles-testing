import { Heading, List, ListItem, Stack } from '@chakra-ui/react'
import { IconType } from 'react-icons'
import { FaCar, FaGlobe, FaHotel } from 'react-icons/fa'
import BasketItemCard from './BasketItemCard'
import {
  BasketItem,
  BasketItemType,
  getSelectedPaymentOptionId,
} from '../Model'
import { useBasket } from '../provider/BasketProvider'

interface BasketItemListProps {
  type: BasketItemType
  items: BasketItem[]
  onRemoveItem: (id: string) => void
}
const BasketItemList = ({
  type,
  items,
  onRemoveItem,
}: BasketItemListProps): JSX.Element | null => {
  const headings: { [key in BasketItemType]: string } = {
    hotel: 'Hotels',
    experience: 'Experiences',
    carHire: 'Car hires',
  }

  const { selectPaymentOption } = useBasket()

  if (!items.length) {
    return null
  }

  return (
    <Stack>
      <Heading as="h2" size="l">
        {headings[type]}
      </Heading>
      <List spacing={6}>
        {items.map((item) => (
          <ListItem key={item.id}>
            <BasketItemCard
              type={type}
              {...item}
              selectPaymentOption={(id) =>
                selectPaymentOption(item.id, type, id)
              }
              selectedPaymentOptionId={getSelectedPaymentOptionId(item)}
              onRemove={() => onRemoveItem(item.id)}
            />
          </ListItem>
        ))}
      </List>
    </Stack>
  )
}

export default BasketItemList
