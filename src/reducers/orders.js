import { actionTypes, reduxUtil } from '../actions/orders';

const { createReducer, defineActionSuccess } = reduxUtil;

const {
    GET_ORDERS_LIST,
    GET_ORDERS,
    CANCEL_ORDERS,
    CREATE_ORDERS,
} = actionTypes;

const initialState = {
    ordersData: {},
    ordersDetail: null,
};

const reducer = createReducer({
    [defineActionSuccess(GET_ORDERS_LIST)]: (state, { ordersData }) => {
        return {
            ...state,
            ordersData,
        }
    },
    [defineActionSuccess(GET_ORDERS)]: (state, { ordersDetail }) => {
        return {
            ...state,
            ordersDetail,
        }
    },
}, initialState)

export default {
    reducer
};