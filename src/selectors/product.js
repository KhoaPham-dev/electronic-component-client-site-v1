import { createSelector } from 'reselect'

export const productListSelector = createSelector(
    [state => state.product],
    product => product.productData
)

export const productListSelectorSuggesstion = createSelector(
    [state => state.product],
    product => product.productDataSuggestion
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

export const tbproductListLoadingSelectorSuggestion = createSelector(
    [state => state.product],
    product => product.tbproductSuggestionLoading
)

export const productSearchListSelector = createSelector(
    [state => state.product],
    product => product.productSearchList
)

export const newFilterValue1Selector = createSelector(
    [state => state.product],
    product => product.newFilterValue1
)

export const newFilterValue2Selector = createSelector(
    [state => state.product],
    product => product.newFilterValue2
)