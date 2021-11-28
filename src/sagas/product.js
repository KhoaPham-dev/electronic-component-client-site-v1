import { call, put, takeLatest } from 'redux-saga/effects';

import { sendRequest } from '../services/apiService';
import { actionTypes, reduxUtil } from '../actions/product';
import apiConfig from '../constants/apiConfig';
import { handleApiResponse } from '../utils/apiHelper';

const { defineActionLoading, defineActionSuccess, defineActionFailed } = reduxUtil;

const {
    GET_CATEGORY_TYPE_PRODUCTS,
    GET_PRODUCT_LIST_CLIENT
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

function* getProductListClient({ payload: { params } }) {
    const apiParams = apiConfig.product.getProductClientList;
    const searchParams = { page: params.page, size: params.size };
    if(params.search) {
        if(params.search.name) {
            searchParams.name = params.search.name
        }
    }
    if(params.categoryId) {
        searchParams.categoryId = params.categoryId
    }


    try {
        const result = yield call(sendRequest, apiParams, searchParams);
        yield put({
            type: defineActionSuccess(GET_PRODUCT_LIST_CLIENT),
            productData: result.responseData && result.responseData.data,
        });
    }
    catch(error) {
        console.log(error);
        yield put({ type: defineActionFailed(GET_PRODUCT_LIST_CLIENT) });
    }
}


const sagas = [
    takeLatest(defineActionLoading(GET_CATEGORY_TYPE_PRODUCTS), getCategoryTypeProducts),
    takeLatest(defineActionLoading(GET_PRODUCT_LIST_CLIENT), getProductListClient)
]

export default sagas;