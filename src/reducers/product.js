import { actionTypes, reduxUtil } from '../actions/product';

const { createReducer, defineActionSuccess, defineActionLoading, defineActionFailed } = reduxUtil;

const {
    GET_CATEGORY_TYPE_PRODUCTS,
    GET_PRODUCT_LIST_CLIENT
} = actionTypes;

const initialState = { 
    productCategoryType: [],
    productData: [],
    tbproductLoading: false,
};

const reducer = createReducer({

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
    
}, initialState)

export default {
    reducer
};