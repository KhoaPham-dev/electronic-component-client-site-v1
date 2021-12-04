import { call, put, takeLatest } from 'redux-saga/effects';

import { sendRequest } from '../services/apiService';
import { actionTypes, reduxUtil } from '../actions/orders';
import apiConfig from '../constants/apiConfig';
import { handleApiResponse } from '../utils/apiHelper';

const { defineActionLoading, defineActionSuccess, defineActionFailed } = reduxUtil;

const {
    GET_ORDERS_LIST,
    CREATE_ORDERS,
    CANCEL_ORDERS,
    GET_ORDERS,
} = actionTypes;


function* getList({ payload: { params, onCompleted, onError } }) {
    const apiParams = apiConfig.orders.list;

    try {
        const { success, responseData } = yield call (sendRequest, apiParams, params);
        if(success && responseData.result) {
            yield put({
                type: defineActionSuccess(GET_ORDERS_LIST),
                ordersData: responseData.data
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

function* getOrders({ payload: { params, onCompleted, onError } }) {
    const apiParams = {
        ...apiConfig.orders.getById,
        path: `${apiConfig.orders.getById.path}/${params.id}`
    };

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

function* createOrders({ payload: { params, onCompleted, onError } }) {
    const apiParams = apiConfig.orders.create;

    try {
        const { success, responseData } = yield call (sendRequest, apiParams, params);
        if(success && responseData.result) {
            onCompleted && onCompleted(responseData.data)
        }
        else {
            onError && onError(responseData)
        }
    }
    catch(error) {
        onError && onError()
    }
}

function* cancelOrders({ payload: { params, onCompleted, onError } }) {
    const apiParams = {
        ...apiConfig.orders.cancel,
        path: `${apiConfig.orders.cancel.path}/${params.id}`
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
    takeLatest(GET_ORDERS_LIST, getList),
    takeLatest(GET_ORDERS, getOrders),
    takeLatest(CANCEL_ORDERS, cancelOrders),
    takeLatest(CREATE_ORDERS, createOrders),
]

export default sagas;