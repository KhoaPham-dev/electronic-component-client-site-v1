import { actionTypes, reduxUtil } from '../actions/news';
import { getSessionObjectData, setSessionObjectData } from '../utils/sessionStorageHelper'
import { StorageKeys } from '../constants'
const { createReducer, defineActionSuccess, defineActionLoading, defineActionFailed } = reduxUtil;

const {
    GET_CATEGORY_TYPE_NEWS,
    GET_NEWS_LIST_CLIENT,
    GET_NEWSID
} = actionTypes;

const initialState = { 
    newsCategoryType: [],
    newsData: [],
    tbnewsLoading: false,
    newsId: getSessionObjectData(StorageKeys.userData)?.newsId || []
};

const reducer = createReducer({

    [GET_NEWSID]: (state, action) => {
        const {newsId} = action.payload
        const userData = getSessionObjectData(StorageKeys.userData) || {}
        setSessionObjectData(StorageKeys.userData, {
            ...userData,
            newsId,
        })
        return {
            ...state,
            newsId
        }
    },
    [defineActionLoading(GET_NEWS_LIST_CLIENT)]: (state) => {
        return {
            ...state,
            tbnewsLoading: true
        }
    },
    [defineActionSuccess(GET_NEWS_LIST_CLIENT)]: (state, { newsData }) => {
        return {
            ...state,
            newsData,
            tbnewsLoading: false
        }
    },
    [defineActionLoading(GET_CATEGORY_TYPE_NEWS)]: (state) => {
        return {
            ...state,
            tbnewsLoading: true
        }
    },
    [defineActionSuccess(GET_CATEGORY_TYPE_NEWS)]: (state, {newsCategoryType}) => {
        return {
            ...state,
            newsCategoryType,
            tbnewsLoading: false
        }
    }
}, initialState)

export default {
    reducer
};