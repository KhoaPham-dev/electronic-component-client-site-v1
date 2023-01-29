import reduxHelper from '../utils/redux'

export const reduxUtil = reduxHelper('PRODUCT')

const { defineAction, createActionWithLoading, createAction } = reduxUtil


export const actionTypes = {
    GET_PRODUCT_LIST_CLIENT: defineAction('GET_PRODUCT_LIST_CLIENT'),
    GET_PRODUCT_LIST_CLIENT_SUGGESTION: defineAction('GET_PRODUCT_LIST_CLIENT_SUGGESTION'),
    GET_PRODUCT_LIST_CLIENT_CHILD: defineAction('GET_PRODUCT_LIST_CLIENT_CHILD'),
    GET_CATEGORY_TYPE_PRODUCTS: defineAction('GET_CATEGORY_TYPE_PRODUCTS'),
    GET_PRODUCT_AUTO_COMPLETE: defineAction('GET_PRODUCT_AUTO_COMPLETE'),
    GET_PRODUCT_BYID_CLIENT: defineAction('GET_PRODUCT_BYID_CLIENT'),
    GET_BEST_SELLING_PRODUCTS_BY_SIZE: defineAction('GET_BEST_SELLING_PRODUCTS_BY_SIZE'),
    GET_PRODUCT_FILTER_PRICE1: defineAction('GET_PRODUCT_FILTER_PRICE1'),
    GET_PRODUCT_FILTER_PRICE2: defineAction('GET_PRODUCT_FILTER_PRICE2')
}

export const actions = {
    getProductListClient: createActionWithLoading(actionTypes.GET_PRODUCT_LIST_CLIENT),
    getProductListClientSuggestion: createActionWithLoading(actionTypes.GET_PRODUCT_LIST_CLIENT_SUGGESTION),
    getProductListClientChild: createActionWithLoading(actionTypes.GET_PRODUCT_LIST_CLIENT_CHILD),
    getCategoryTypeProducts: createActionWithLoading(actionTypes.GET_CATEGORY_TYPE_PRODUCTS),
    getProductAutoComplete: createAction(actionTypes.GET_PRODUCT_AUTO_COMPLETE),
    getProudctByIdClient: createAction(actionTypes.GET_PRODUCT_BYID_CLIENT),
    getBestSellingProductBySize: createActionWithLoading(actionTypes.GET_BEST_SELLING_PRODUCTS_BY_SIZE),
    getProductFilterPrice1: createAction(actionTypes.GET_PRODUCT_FILTER_PRICE1),
    getProductFilterPrice2: createAction(actionTypes.GET_PRODUCT_FILTER_PRICE2)
}