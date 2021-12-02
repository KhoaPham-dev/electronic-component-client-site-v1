import { call, takeLatest, put, select } from 'redux-saga/effects'

import { sendRequest } from '../services/apiService'
import { actionTypes, reduxUtil } from '../actions/account'
import { actions } from '../actions'
import apiConfig from '../constants/apiConfig'
import { removeStorageItem, setStringData } from '../utils/localStorageHelper'
import { StorageKeys } from '../constants'
// import { handleApiResponse } from '../utils/apiHelper';

const { LOGIN, LOGOUT, UPDATE_PROFILE, GET_PROFILE, REGISTER, REQUEST_FORGOT_PASSWORD, CHANGE_PASSWORD } = actionTypes

const { defineActionLoading, defineActionSuccess, defineActionFailed } =
    reduxUtil

function* login({ payload: { params, onCompleted, onError } }) {
    try {
        const result = yield call(sendRequest, apiConfig.account.login, params)
        const { success, responseData } = result
        if (success && responseData.result) {
            const profileResult = yield call(
                sendRequest,
                apiConfig.customer.getProfile,
                {},
                responseData.data.token
            )
            if (profileResult.success && profileResult.responseData.result) {
                setStringData(StorageKeys.userToken, responseData.data.token)
                // put get profile success
                yield put({
                    type: defineActionSuccess(GET_PROFILE),
                    data: profileResult.responseData.data,
                })

                onCompleted()
            } else {
                onError(responseData)
            }
        } else {
            onError(responseData)
        }
    } catch (error) {
        onError(error)
    }
}

function* logout({ payload: { onCompleted }}) {
    try {
        // yield call(sendRequest, apiConfig.account.logout)
        removeStorageItem(StorageKeys.userToken)
        yield put({
            type: defineActionSuccess(LOGOUT),
        })
        onCompleted && onCompleted()
    } catch (error) {
        // onError(error);
    }
}

function* register({ payload: { params, onCompleted, onError } }) {
    try {
        const { success, responseData } = yield call(
            sendRequest,
            apiConfig.customer.register,
            params
        )
        if (success && responseData.result) {
            onCompleted && onCompleted(responseData)
        } else {
            onError && onError(responseData)
        }
    } catch (error) {
        onError && onError(error)
    } finally {
    }
}

function* getProfile({ payload: { onCompleted, onError, onDone } }) {
    try {
        const { success, responseData } = yield call(sendRequest, apiConfig.customer.getProfile)
        if(success && responseData.result) {
            yield put({
                type: defineActionSuccess(GET_PROFILE),
                data: responseData.data,
            })
            onCompleted && onCompleted();
        }
        else {
            onError && onError()
        }
    } catch (error) {
        yield put({ type: defineActionFailed(GET_PROFILE) })
    } finally {
        onDone && onDone()
    }
}

function* updateProfile({ payload: { params, onCompleted, onError, onDone } }) {
    try {
        const { success, responseData } = yield call(
            sendRequest,
            apiConfig.customer.updateProfile,
            params
        )
        if(success && responseData.result) {
            onCompleted && onCompleted();
        }
        else {
            onError && onError()
        }
    } catch (error) {
        onError && onError(error)
    } finally {
    }
}

function* requestForgotPassword({ payload: { params, onError, onCompleted } }) {
    try {
        const { success, responseData } = yield call(
            sendRequest,
            apiConfig.account.requestForgotPassword,
            params
        )
        if (success && responseData.result) {
            onCompleted && onCompleted(responseData.data)
        } else {
            onError && onError(responseData)
        }
    } catch (error) {
        onError && onError(error)
    }
}

function* changePassword({ payload: { params, onError, onCompleted } }) {
    try {
        const { success, responseData } = yield call(
            sendRequest,
            apiConfig.account.changePassword,
            params
        )
        if (success && responseData.result) {
            onCompleted(responseData)
        } else {
            onError(responseData)
        }
    } catch (error) {
        onError(error)
    }
}

const sagas = [
    takeLatest(LOGIN, login),
    takeLatest(REGISTER, register),
    takeLatest(LOGOUT, logout),
    takeLatest(GET_PROFILE, getProfile),
    takeLatest(UPDATE_PROFILE, updateProfile),
    takeLatest(REQUEST_FORGOT_PASSWORD, requestForgotPassword),
    takeLatest(CHANGE_PASSWORD, changePassword),
]

export default sagas
