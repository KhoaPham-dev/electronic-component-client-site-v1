import { call, takeLatest, put, select } from 'redux-saga/effects'

import { sendRequest } from '../services/apiService'
import { actionTypes, reduxUtil } from '../actions/account'
import { actions } from '../actions'
import apiConfig from '../constants/apiConfig'
import { removeStorageItem, setStringData } from '../utils/localStorageHelper'
import { StorageKeys } from '../constants'
// import { handleApiResponse } from '../utils/apiHelper';

const { LOGIN, LOGOUT, UPDATE_PROFILE, GET_PROFILE, REGISTER } = actionTypes

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

function* logout() {
    try {
        // yield call(sendRequest, apiConfig.account.logout)
        removeStorageItem(StorageKeys.userToken)
        yield put({
            type: defineActionSuccess(LOGOUT),
        })
    } catch (error) {
        // onError(error);
    }
}

function* register({ payload: { params, onCompleted, onError } }) {
    try {
        yield put(actions.showFullScreenLoading())
        const { success, responseData } = yield call(
            sendRequest,
            apiConfig.customer.register,
            params
        )
        console.log({ success, responseData })
        if (success && responseData.result) {
            onCompleted(responseData)
        } else {
            onError(responseData)
        }
    } catch (error) {
        onError(error)
    } finally {
        yield put(actions.hideFullScreenLoading())
    }
}

function* getProfile({ payload: { onDone } }) {
    try {
        // yield put(actions.clearProfile());
        const result = yield call(sendRequest, apiConfig.customer.getProfile)
        yield put({
            type: defineActionSuccess(GET_PROFILE),
            data: result.responseData && result.responseData.data,
        })
        yield put(actions.hideFullScreenLoading())
    } catch (error) {
        yield put({ type: defineActionFailed(GET_PROFILE) })
    } finally {
        onDone()
    }
}

function* updateProfile({ payload: { params, onCompleted, onError, onDone } }) {
    try {
        yield put(actions.showFullScreenLoading())
        const { success, responseData } = yield call(
            sendRequest,
            apiConfig.customer.updateProfile,
            params
        )
        if (success && responseData.result) {
            const { provinceId, districtId, wardId, ...data } = params
            if (provinceId || districtId || wardId) {
                const { provinces, areas } = yield select(state => state.area)

                const provinceDto = provinces.find(
                    p => p.provinceId === provinceId
                )
                const districtDto =
                    areas[provinceId] &&
                    areas[provinceId].find(d => d.provinceId === districtId)
                const wardDto =
                    areas[districtId] &&
                    areas[districtId].find(w => w.provinceId === wardId)

                provinceDto && (data.provinceDto = provinceDto)
                districtDto && (data.districtDto = districtDto)
                wardDto && (data.wardDto = wardDto)
            }
            yield put({
                type: defineActionSuccess(actionTypes.UPDATE_PROFILE),
                data,
            })
            onCompleted && onCompleted(responseData)
        } else {
            onError(responseData)
        }
    } catch (error) {
        onError && onError(error)
    } finally {
        yield put(actions.hideFullScreenLoading())
    }
}

function* verifyAccount({ payload: { params, onError, onCompleted } }) {
    try {
        const { success, responseData } = yield call(
            sendRequest,
            apiConfig.account.verifyAccount,
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

function* requestForgotPassword({ payload: { params, onError, onCompleted } }) {
    try {
        const { success, responseData } = yield call(
            sendRequest,
            apiConfig.account.requestForgotPassword,
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
    takeLatest(defineActionLoading(LOGIN), login),
    takeLatest(defineActionLoading(REGISTER), register),
    takeLatest(LOGOUT, logout),
    takeLatest(actionTypes.VERIFY_ACCOUNT, verifyAccount),
    takeLatest(GET_PROFILE, getProfile),
    takeLatest(defineActionLoading(UPDATE_PROFILE), updateProfile),
    takeLatest(actionTypes.REQUEST_FORGOT_PASSWORD, requestForgotPassword),
    takeLatest(actionTypes.CHANGE_PASSWORD, changePassword),
]

export default sagas
