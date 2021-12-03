import { call, put, takeLatest } from 'redux-saga/effects';

import { sendRequest } from '../services/apiService';
import { actionTypes, reduxUtil } from '../actions/address';
import apiConfig from '../constants/apiConfig';
import { handleApiResponse } from '../utils/apiHelper';

const { defineActionLoading, defineActionSuccess, defineActionFailed } = reduxUtil;

const {
    GET_ADDRESS_LIST,
    CREATE_ADDRESS,
    UPDATE_ADDRESS,
    DELETE_ADDRESS,
} = actionTypes;


function* getList({ payload: { params, onCompleted, onError } }) {
    const apiParams = apiConfig.address.getList;

    try {
        const { success, responseData } = yield call (sendRequest, apiParams);
        if(success && responseData.result) {
            yield put({
                type: defineActionSuccess(GET_ADDRESS_LIST),
                addressData: responseData.data
            })
            onCompleted && onCompleted(responseData)
        }
        else {
            onError && onError(responseData)
        }
    }
    catch(error) {
        onError && onError()
    }
}

function* updateAddress({ payload: { params, onCompleted, onError } }) {
    const apiParams = apiConfig.address.update;

    try {
        const { success, responseData } = yield call (sendRequest, apiParams, params);
        if(success && responseData.result) {
            onCompleted && onCompleted(responseData)
        }
        else {
            onError && onError(responseData)
        }
    }
    catch(error) {
        onError && onError()
    }
}

function* createAddress({ payload: { params, onCompleted, onError } }) {
    const apiParams = apiConfig.address.create;

    try {
        const { success, responseData } = yield call (sendRequest, apiParams, params);
        if(success && responseData.result) {
            onCompleted && onCompleted(responseData)
        }
        else {
            onError && onError(responseData)
        }
    }
    catch(error) {
        onError && onError()
    }
}

function* deleteAddress({ payload: { params, onCompleted, onError } }) {
    const apiParams = {
        ...apiConfig.address.delete,
        path: `${apiConfig.address.delete.path}/${params.id}`
    }

    try {
        const { success, responseData } = yield call (sendRequest, apiParams);
        if(success && responseData.result) {
            onCompleted && onCompleted(responseData)
        }
        else {
            onError && onError(responseData)
        }
    }
    catch(error) {
        onError && onError()
    }
}

const sagas = [
    takeLatest(GET_ADDRESS_LIST, getList),
    takeLatest(UPDATE_ADDRESS, updateAddress),
    takeLatest(DELETE_ADDRESS, deleteAddress),
    takeLatest(CREATE_ADDRESS, createAddress),
]

export default sagas;