import { actionTypes, reduxUtil } from '../actions/product';
import { getSessionObjectData, setSessionObjectData } from '../utils/sessionStorageHelper'
import { StorageKeys } from '../constants'
const { createReducer, defineActionSuccess, defineActionLoading, defineActionFailed } = reduxUtil;

const {
    GET_CATEGORY_TYPE_PRODUCTS,
    GET_PRODUCT_LIST_CLIENT,
    GET_PRODUCT_LIST_CLIENT_SUGGESTION,
    GET_PRODUCT_LIST_CLIENT_CHILD,
    GET_PRODUCT_AUTO_COMPLETE,
    GET_PRODUCT_FILTER_PRICE1,
    GET_PRODUCT_FILTER_PRICE2
} = actionTypes;

const initialState = { 
    productCategoryType: [],
    productData: [],
    productDataSuggestion: [],
    productDataChild: [],
    tbproductLoading: false,
    tbproductSuggestionLoading: false,
    productSearchList: [],
    newFilterValue1: 10000,
    newFilterValue2: 55000
};

const reducer = createReducer({

    [GET_PRODUCT_FILTER_PRICE1]: (state, action) => {
        const {newFilterValue1} = action.payload
        const userData = getSessionObjectData(StorageKeys.userData) || {}
        setSessionObjectData(StorageKeys.userData, {
            ...userData,
            newFilterValue1,
        })
        return {
            ...state,
            newFilterValue1
        }
    },
    [GET_PRODUCT_FILTER_PRICE2]: (state, action) => {
        const {newFilterValue2} = action.payload
        const userData = getSessionObjectData(StorageKeys.userData) || {}
        setSessionObjectData(StorageKeys.userData, {
            ...userData,
            newFilterValue2,
        })
        return {
            ...state,
            newFilterValue2
        }
    },
    [defineActionLoading(GET_PRODUCT_LIST_CLIENT)]: (state) => {
        return {
            ...state,
            tbproductLoading: true
        }
    },
    [defineActionSuccess(GET_PRODUCT_LIST_CLIENT)]: (state, { productData }) => {
        return {
            ...state,
            productData,
            tbproductLoading: false
        }
    },
    [defineActionLoading(GET_PRODUCT_LIST_CLIENT_SUGGESTION)]: (state) => {
        return {
            ...state,
            tbproductSuggestionLoading: true
        }
    },
    [defineActionSuccess(GET_PRODUCT_LIST_CLIENT_SUGGESTION)]: (state, { productDataSuggestion }) => {
        console.log(productDataSuggestion);
        return {
            ...state,
            productDataSuggestion,
            tbproductSuggestionLoading: false
        }
    },
    [defineActionLoading(GET_PRODUCT_LIST_CLIENT_CHILD)]: (state) => {
        return {
            ...state,
            tbproductLoading: true
        }
    },
    [defineActionSuccess(GET_PRODUCT_LIST_CLIENT_CHILD)]: (state, { productDataChild }) => {
        return {
            ...state,
            productDataChild,
            tbproductLoading: false
        }
    },
    [defineActionLoading(GET_CATEGORY_TYPE_PRODUCTS)]: (state) => {
        return {
            ...state,
            tbproductLoading: true
        }
    },
    [defineActionSuccess(GET_CATEGORY_TYPE_PRODUCTS)]: (state, {productCategoryType}) => {
        return {
            ...state,
            productCategoryType,
            tbproductLoading: false
        }
    },
    [defineActionSuccess(GET_PRODUCT_AUTO_COMPLETE)]: (state, { productSearchList }) => {
        return {
            ...state,
            productSearchList,
        }
    }
}, initialState)

export default {
    reducer
};