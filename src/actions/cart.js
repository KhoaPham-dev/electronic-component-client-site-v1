import reduxHelper from '../utils/redux'

export const reduxUtil = reduxHelper('CART')

const { defineAction, createAction } = reduxUtil

export const actionTypes = {
    SET_ITEMS_CART: defineAction('SET_ITEMS_CART'),
    SET_SELECTED_ITEM: defineAction('SET_SELECTED_ITEM'),
}

export const actions = {
    setItemsCart: createAction(actionTypes.SET_ITEMS_CART),
    setSelectedItem: createAction(actionTypes.SET_SELECTED_ITEM),
}