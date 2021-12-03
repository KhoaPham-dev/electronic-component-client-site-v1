import reduxHelper from '../utils/redux'

export const reduxUtil = reduxHelper('ADDRESS')

const { defineAction, createActionWithLoading, createAction } = reduxUtil


export const actionTypes = {
    GET_ADDRESS_LIST: defineAction('GET_ADDRESS_LIST'),
    CREATE_ADDRESS: defineAction('CREATE_ADDRESS'),
    UPDATE_ADDRESS: defineAction('UPDATE_ADDRESS'),
    DELETE_ADDRESS: defineAction('DELETE_ADDRESS'),
}

export const actions = {
    getAddressList: createAction(actionTypes.GET_ADDRESS_LIST),
    createAddress: createAction(actionTypes.CREATE_ADDRESS),
    updateAddress: createAction(actionTypes.UPDATE_ADDRESS),
    deleteAddress: createAction(actionTypes.DELETE_ADDRESS),
}