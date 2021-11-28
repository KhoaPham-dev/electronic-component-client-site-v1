import { createSelector } from 'reselect'

export const productListSelector = createSelector(
    [state => state.product],
    product => product.productData
)

export const categoryListSelector = createSelector(
    [state => state.product],
    product => product.productCategoryType
)