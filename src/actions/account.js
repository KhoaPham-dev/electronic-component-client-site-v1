import reduxHelper from '../utils/redux'
import { StorageKeys } from '../constants'

export const reduxUtil = reduxHelper('ACCOUNT')

const { defineAction, createActionWithLoading, createAction } = reduxUtil

export const actionTypes = {
    LOGIN: defineAction('LOGIN'),
    LOGOUT: defineAction('LOGOUT'),
    GET_PROFILE: defineAction('GET_PROFILE'),
    UPDATE_PROFILE: defineAction('UPDATE_PROFILE'),
    CLEAR_PROFILE: defineAction('CLEAR_PROFILE'),
    REGISTER: defineAction('REGISTER'),
    VERIFY_ACCOUNT: defineAction('VERIFY_ACCOUNT'),
    REQUEST_FORGOT_PASSWORD: defineAction('REQUEST_FORGOT_PASSWORD'),
    CHANGE_PASSWORD: defineAction('CHANGE_PASSWORD'),
}

export const actions = {
    login: createAction(actionTypes.LOGIN),
    logout: createAction(actionTypes.LOGOUT),
    updateProfile: createActionWithLoading(actionTypes.UPDATE_PROFILE),
    getProfile: createAction(actionTypes.GET_PROFILE),
    clearProfile: createAction(actionTypes.CLEAR_PROFILE),
    register: createAction(actionTypes.REGISTER),
    verifyAccount: createAction(actionTypes.VERIFY_ACCOUNT),
    requestForgotPassword: createAction(actionTypes.REQUEST_FORGOT_PASSWORD),
    changePassword: createAction(actionTypes.CHANGE_PASSWORD),
    // logout: () => {
    //     if(window.localStorage && window.localStorage.getItem(StorageKeys.userData)) {
    //         window.localStorage.removeItem(StorageKeys.userData);
    //         return true;
    //     }
    //     return false;
    // },
    setUserData: data => {
        // Check browser to support localStorage API
        if (window.localStorage) {
            window.localStorage.setItem(
                StorageKeys.userData,
                JSON.stringify(data)
            )
            return true
        }

        return false
    },
    getUserData: () => {
        let result
        if (
            window.localStorage &&
            window.localStorage.getItem(StorageKeys.userData)
        ) {
            result = JSON.parse(
                window.localStorage.getItem(StorageKeys.userData)
            )
        }

        return result
    },
}

export const accountActions = actions
