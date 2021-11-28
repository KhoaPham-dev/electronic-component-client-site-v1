import reduxHelper from '../utils/redux'

export const reduxUtil = reduxHelper('PRODUCT')

const { defineAction, createActionWithLoading, createAction } = reduxUtil


export const actionTypes = {
    GET_PRODUCT_LIST_CLIENT: defineAction('GET_PRODUCT_LIST_CLIENT'),
    GET_CATEGORY_TYPE_PRODUCTS: defineAction('GET_CATEGORY_TYPE_PRODUCTS'),
}

export const actions = {
    getProductListClient: createActionWithLoading(actionTypes.GET_PRODUCT_LIST_CLIENT),
    getCategoryTypeProducts: createActionWithLoading(actionTypes.GET_CATEGORY_TYPE_PRODUCTS),
}