import reduxHelper from '../utils/redux'

export const reduxUtil = reduxHelper('PROVINCE')

const { defineAction, createActionWithLoading, createAction } = reduxUtil


export const actionTypes = {
    GET_PROVINCE_AUTO_COMPLETE: defineAction('GET_PROVINCE_AUTO_COMPLETE'),
}

export const actions = {
    getProvinceAutoComplete: createAction(actionTypes.GET_PROVINCE_AUTO_COMPLETE),
}