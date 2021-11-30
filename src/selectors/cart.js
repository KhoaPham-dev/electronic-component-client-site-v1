import { createSelector } from 'reselect'

export const itemsCartSelector = createSelector(
    [state => state.cart],
    cart => cart?.itemsCart
)

export const selectedItemSelector = createSelector(
    [state => state.cart],
    cart => cart?.selectedItem
)

const cartSelector = {
    itemsCartSelector,
    selectedItemSelector,
}

export default cartSelector
