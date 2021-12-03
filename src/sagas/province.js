import { call, takeLatest, takeEvery, put } from 'redux-saga/effects'

import { sendRequest } from '../services/apiService'
import { actionTypes, reduxUtil } from '../actions/province'
import { actions } from '../actions'
import apiConfig from '../constants/apiConfig'
import { removeStorageItem, setStringData } from '../utils/localStorageHelper'
import { StorageKeys } from '../constants'
import { ensureArray } from '../utils/helper'

const { GET_PROVINCE_AUTO_COMPLETE } = actionTypes

const { defineActionSuccess } = reduxUtil

function* getProvinceAutoComplete({ payload: { params, onCompleted, onError, onDone } }) {
    try {
        const searchParams = {}
        if(params.kind) {
            searchParams.kind = params.kind
        }
        if(params.parentId) {
            searchParams.parentId = params.parentId
        }
        const { success, responseData } = yield call(
            sendRequest,
            apiConfig.province.autocomplete,
            searchParams
        )
        if (success && responseData.result) {
            onCompleted && onCompleted(responseData)
            yield put({
                type: defineActionSuccess(GET_PROVINCE_AUTO_COMPLETE),
                data: {
                    [params.kind]: ensureArray(responseData.data?.data),
                }
            })
        } else {
            onError && onError(responseData)
        }
    } catch (error) {
        onError && onError(error)
    } finally {
        onDone && onDone()
    }
}

const sagas = [
    takeEvery(GET_PROVINCE_AUTO_COMPLETE, getProvinceAutoComplete),
]

export default sagas
