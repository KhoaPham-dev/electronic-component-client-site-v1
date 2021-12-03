import { actionTypes, reduxUtil } from '../actions/address';

const { createReducer, defineActionSuccess } = reduxUtil;

const {
    GET_ADDRESS_LIST,
} = actionTypes;

const initialState = {
    addressData: {},
};

const reducer = createReducer({
    [defineActionSuccess(GET_ADDRESS_LIST)]: (state, { addressData }) => {
        return {
            ...state,
            addressData,
        }
    },
}, initialState)

export default {
    reducer
};