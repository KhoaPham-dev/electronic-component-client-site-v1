import reduxHelper from '../utils/redux'

export const reduxUtil = reduxHelper('SETTINGS')

const { defineAction, createActionWithLoading, createAction } = reduxUtil


export const actionTypes = {
    GET_SETTINGS_LIST_CLIENT: defineAction('GET_SETTINGS_LIST_CLIENT'),
}

export const actions = {
    getSettingsListClient: createActionWithLoading(actionTypes.GET_SETTINGS_LIST_CLIENT),
}