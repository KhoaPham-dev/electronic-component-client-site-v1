import { call, put, takeLatest } from 'redux-saga/effects';

import { sendRequest } from '../services/apiService';
import { actionTypes, reduxUtil } from '../actions/news';
import apiConfig from '../constants/apiConfig';
import { handleApiResponse } from '../utils/apiHelper';

const { defineActionLoading, defineActionSuccess, defineActionFailed } = reduxUtil;

const {
    GET_NEWS_LIST_CLIENT,
    GET_CATEGORY_TYPE_NEWS,
    GET_NEWS_BYID_CLIENT
} = actionTypes;


function* getCategoryTypeNews({payload: {params}}) {
    const apiParams = apiConfig.category.getCategoryList;
    const searchParams = { kind: params.kind};

    if(params.kind)
    {
        searchParams.kind = params.kind
    }

    try {
        const result = yield call (sendRequest, apiParams, searchParams);
        yield put({
            type: defineActionSuccess(GET_CATEGORY_TYPE_NEWS),
            newsCategoryType: result.responseData && result.responseData.data
        })
    }
    catch(error) {
        yield put({type: defineActionFailed(GET_CATEGORY_TYPE_NEWS)});
    }
}

function* getNewsListClient({ payload: { params, onCompleted } }) {
    const apiParams = apiConfig.news.getNewsListClient;
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
                type: defineActionSuccess(GET_NEWS_LIST_CLIENT),
                newsData: responseData.data,
            });
            onCompleted && onCompleted()
        }
    }
    catch(error) {
        console.log(error);
        yield put({ type: defineActionFailed(GET_NEWS_LIST_CLIENT) });
    }
}

function* getNewsByIdClient({payload: {params, onCompleted, onError}}) {

    try {
        const apiParams = {
            ...apiConfig.news.getNewsByIdClient,
            path: `${apiConfig.news.getNewsByIdClient.path}/${params.id}`
        }
        const result = yield call(sendRequest, apiParams);
        handleApiResponse(result, onCompleted, onError);
    }
    catch(error) {
        console.log(error);
    }

}

const sagas = [
    takeLatest(defineActionLoading(GET_CATEGORY_TYPE_NEWS), getCategoryTypeNews),
    takeLatest(defineActionLoading(GET_NEWS_LIST_CLIENT), getNewsListClient),
    takeLatest(GET_NEWS_BYID_CLIENT, getNewsByIdClient)
]

export default sagas;