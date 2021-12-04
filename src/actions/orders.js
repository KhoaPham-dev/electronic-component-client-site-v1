import reduxHelper from '../utils/redux'

export const reduxUtil = reduxHelper('ORDERS')

const { defineAction, createActionWithLoading, createAction } = reduxUtil


export const actionTypes = {
    GET_ORDERS_LIST: defineAction('GET_ORDERS_LIST'),
    CREATE_ORDERS: defineAction('CREATE_ORDERS'),
    CANCEL_ORDERS: defineAction('CANCEL_ORDERS'),
    GET_ORDERS: defineAction('GET_ORDERS'),
}

export const actions = {
    getOrdersList: createAction(actionTypes.GET_ORDERS_LIST),
    createOrders: createAction(actionTypes.CREATE_ORDERS),
    cancelOrders: createAction(actionTypes.CANCEL_ORDERS),
    getOrders: createAction(actionTypes.GET_ORDERS),
}