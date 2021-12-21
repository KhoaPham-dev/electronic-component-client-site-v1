import { call, put, takeLatest } from 'redux-saga/effects';

import { sendRequest } from '../services/apiService';
import { actionTypes, reduxUtil } from '../actions/settings';
import apiConfig from '../constants/apiConfig';
import { handleApiResponse } from '../utils/apiHelper';

const { defineActionLoading, defineActionSuccess, defineActionFailed } = reduxUtil;

const {
    GET_SETTINGS_LIST_CLIENT
} = actionTypes;



function* getSettingsListClient({ payload: { params, onCompleted } }) {
    const apiParams = apiConfig.settings.getSettingsListClient;
    const searchParams = { page: params.page, size: params.size };

    try {
        const { success, responseData } = yield call(sendRequest, apiParams, searchParams);
        if(success && responseData.result) {
            yield put({
                type: defineActionSuccess(GET_SETTINGS_LIST_CLIENT),
                settingsData: responseData.data,
            });
            onCompleted && onCompleted()
        }
    }
    catch(error) {
        console.log(error);
        yield put({ type: defineActionFailed(GET_SETTINGS_LIST_CLIENT) });
    }
}

const sagas = [
    takeLatest(defineActionLoading(GET_SETTINGS_LIST_CLIENT), getSettingsListClient),
]

export default sagas;