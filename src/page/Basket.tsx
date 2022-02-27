import { Grid, Heading, Stack } from '@chakra-ui/react'
import { useState } from 'react'
import BasketItemCard from '../component/BasketItemCard'
import BasketItemList from '../component/BasketItemList'
import ConfirmationModal from '../component/ConfirmationModal'
import PriceBreakdown from '../component/PriceBreakdown'
import { BasketItem, BasketItemType } from '../model/Model'
import { useBasket } from '../provider/BasketProvider'

export const Basket = (): JSX.Element => {
  const { basket, removeBasketItem } = useBasket()
  const [itemToRemove, setItemToRemove] = useState<
    (BasketItem & { type: BasketItemType }) | undefined
  >(undefined)

  return (
    <>
      <Grid
        templateColumns={'2fr 1fr'}
        gap={5}
        padding={['10px 10px', '20px 20px', '50px 50px', '50px 200px']}
        as="main"
        aria-labelledby="payment-options-title"
      >
        <Stack spacing={5}>
          <Heading as="h1" size="xl" id="payment-options-title">
            Basket
          </Heading>

          <Stack spacing={5}>
            {Object.entries(basket).map(([type, items]) => {
              const basketItemType = type as BasketItemType

              return (
                <BasketItemList
                  key={type}
                  type={basketItemType}
                  items={items}
                  onRemoveItem={(id) => {
                    const itemToRemove = items.find((item) => item.id === id)
                    if (itemToRemove) {
                      setItemToRemove({ ...itemToRemove, type: basketItemType })
                    }
                  }}
                />
              )
            })}
          </Stack>
        </Stack>
        <PriceBreakdown />
      </Grid>
      <ConfirmationModal
        isOpen={itemToRemove != null}
        onClose={() => {
          setItemToRemove(undefined)
        }}
        onConfirm={() => {
          if (itemToRemove) {
            removeBasketItem(itemToRemove?.id, itemToRemove?.type)
          }
          setItemToRemove(undefined)
        }}
      >
        {itemToRemove && (
          <BasketItemCard {...itemToRemove} showPaymentOptions={false} />
        )}
      </ConfirmationModal>
    </>
  )
}

export default Basket
