import { call, put, takeLatest } from 'redux-saga/effects';

import { sendRequest } from '../services/apiService';
import { actionTypes, reduxUtil } from '../actions/product';
import apiConfig from '../constants/apiConfig';
import { handleApiResponse } from '../utils/apiHelper';

const { defineActionLoading, defineActionSuccess, defineActionFailed } = reduxUtil;

const {
    GET_CATEGORY_TYPE_PRODUCTS,
    GET_PRODUCT_LIST_CLIENT,
    GET_PRODUCT_LIST_CLIENT_SUGGESTION,
    GET_PRODUCT_LIST_CLIENT_CHILD,
    GET_PRODUCT_AUTO_COMPLETE,
    GET_PRODUCT_BYID_CLIENT,
} = actionTypes;


function* getCategoryTypeProducts({payload: {params}}) {
    const apiParams = apiConfig.category.getCategoryList;
    const searchParams = { kind: params.kind};

    if(params.kind)
    {
        searchParams.kind = params.kind
    }

    try {
        const result = yield call (sendRequest, apiParams, searchParams);
        yield put({
            type: defineActionSuccess(GET_CATEGORY_TYPE_PRODUCTS),
            productCategoryType: result.responseData && result.responseData.data
        })
    }
    catch(error) {
        yield put({type: defineActionFailed(GET_CATEGORY_TYPE_PRODUCTS)});
    }
}

function* getProductListClient({ payload: { params, onCompleted } }) {
    const apiParams = apiConfig.product.getProductClientList;
    const searchParams = { page: params.page, size: params.size };
    
    if(params.name) {
        searchParams.name = params.name
    }

    if(params.categoryId) {
        searchParams.categoryId = params.categoryId
    }

    if(params.newFilterValue1) {
        searchParams.price1 = params.newFilterValue1
    }

    if(params.newFilterValue2) {
        searchParams.price2 = params.newFilterValue2
    }

    try {
        const { success, responseData } = yield call(sendRequest, apiParams, searchParams);
        if(success && responseData.result) {
            yield put({
                type: defineActionSuccess(GET_PRODUCT_LIST_CLIENT),
                productData: responseData.data,
            });
            onCompleted && onCompleted()
        }
    }
    catch(error) {
        console.log(error);
        yield put({ type: defineActionFailed(GET_PRODUCT_LIST_CLIENT) });
    }
}

function* getProductListClientSuggestion({ payload: { params, onCompleted } }) {
    const apiParams = apiConfig.product.getProductClientList;
    const searchParams = { page: params.page, size: params.size };
    
    if(params.name) {
        searchParams.name = params.name
    }

    if(params.categoryId) {
        searchParams.categoryId = params.categoryId
    }

    try {
        const { success, responseData } = yield call(sendRequest, apiParams, searchParams);
        if(success && responseData.result) {
            yield put({
                type: defineActionSuccess(GET_PRODUCT_LIST_CLIENT_SUGGESTION),
                productDataSuggestion: responseData.data,
            });
            onCompleted && onCompleted()
        }
    }
    catch(error) {
        console.log(error);
        yield put({ type: defineActionFailed(GET_PRODUCT_LIST_CLIENT_SUGGESTION) });
    }
}

function* getProductListClientChild({ payload: { params, onCompleted } }) {
    const apiParams = apiConfig.product.getProductClientListChild;
    const searchParams = { page: params.page, size: params.size };
    
    if(params.name) {
        searchParams.name = params.name
    }

    if(params.categoryId) {
        searchParams.categoryId = params.categoryId
    }

    if(params.parentId) {
        searchParams.parentId = params.parentId
    }


    try {
        const { success, responseData } = yield call(sendRequest, apiParams, searchParams);
        if(success && responseData.result) {
            yield put({
                type: defineActionSuccess(GET_PRODUCT_LIST_CLIENT_CHILD),
                productDataChild: responseData.data,
            });
            onCompleted && onCompleted()
        }
    }
    catch(error) {
        console.log(error);
        yield put({ type: defineActionFailed(GET_PRODUCT_LIST_CLIENT_CHILD) });
    }
}

function* getProductByIdClient({payload: {params, onCompleted, onError}}) {

    try {
        const apiParams = {
            ...apiConfig.product.getProductByIdClient,
            path: `${apiConfig.product.getProductByIdClient.path}/${params.id}`
        }
        const result = yield call(sendRequest, apiParams);
        handleApiResponse(result, onCompleted, onError);
    }
    catch(error) {
        console.log(error);
    }

}

function* getProductAutoComplete({ payload: { params } }) {
    const apiParams = apiConfig.product.getProductClientList;
    try {
        const { success, responseData } = yield call(sendRequest, apiParams);
        if(success && responseData.result) {
            yield put({
                type: defineActionSuccess(GET_PRODUCT_AUTO_COMPLETE),
                productSearchList: responseData.data && responseData.data.data,
            });
        }
    }
    catch(error) {
        console.log(error);
    }
}


const sagas = [
    takeLatest(defineActionLoading(GET_CATEGORY_TYPE_PRODUCTS), getCategoryTypeProducts),
    takeLatest(defineActionLoading(GET_PRODUCT_LIST_CLIENT), getProductListClient),
    takeLatest(defineActionLoading(GET_PRODUCT_LIST_CLIENT_SUGGESTION), getProductListClientSuggestion),
    takeLatest(defineActionLoading(GET_PRODUCT_LIST_CLIENT_CHILD), getProductListClientChild),
    takeLatest(GET_PRODUCT_AUTO_COMPLETE, getProductAutoComplete),
    takeLatest(GET_PRODUCT_BYID_CLIENT, getProductByIdClient)
]

export default sagas;