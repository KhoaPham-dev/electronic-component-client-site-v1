import { call, takeLatest, takeEvery, put } from 'redux-saga/effects'

import { sendRequest } from '../services/apiService'
import { actionTypes, reduxUtil } from '../actions/area'
import { actions } from '../actions'
import apiConfig from '../constants/apiConfig'
import { removeStorageItem, setStringData } from '../utils/localStorageHelper'
import { StorageKeys } from '../constants'
import { ensureArray } from '../utils/helper'
// import { handleApiResponse } from '../utils/apiHelper';

const { GET_AREA, GET_AREA_FIRST } = actionTypes

const { defineActionSuccess } = reduxUtil

function* getArea({ payload: { params, onCompleted, onError, onDone } }) {
    try {
        const { success, responseData } = yield call(
            sendRequest,
            apiConfig.area.listCombobox,
            params
        )
        if (success && responseData.result) {
            onCompleted && onCompleted(responseData)
            yield put({
                type: defineActionSuccess(GET_AREA),
                data: ensureArray(responseData.data?.data),
                params,
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
    takeLatest(GET_AREA, getArea),
    takeEvery(GET_AREA_FIRST, getArea),
]

export default sagas
