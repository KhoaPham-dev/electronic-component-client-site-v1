import { createSelector } from 'reselect'

export const productListSelector = createSelector(
    [state => state.product],
    product => product.productData
)

export const productChildListSelector = createSelector(
    [state => state.product],
    product => product.productDataChild
)

export const categoryListSelector = createSelector(
    [state => state.product],
    product => product.productCategoryType
)

export const tbproductListLoadingSelector = createSelector(
    [state => state.product],
    product => product.tbproductLoading
)

export const productSearchListSelector = createSelector(
    [state => state.product],
    product => product.productSearchList
)