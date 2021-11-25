import { actionTypes, reduxUtil } from '../actions/account'

const initialState = {
    data: {},
    loading: false,
}

const reducer = reduxUtil.createReducer(
    {
        [reduxUtil.defineActionSuccess(actionTypes.GET_PROFILE)]: (
            state,
            { data }
        ) => {
            return {
                ...state,
                data,
            }
        },
        [reduxUtil.defineActionSuccess(actionTypes.UPDATE_PROFILE)]: (
            state,
            { data }
        ) => ({
            ...state,
            data: {
                ...state.data,
                ...data,
            },
        }),
        [reduxUtil.defineActionSuccess(actionTypes.LOGOUT)]: state => ({
            ...state,
            data: {},
        }),
        [actionTypes.CLEAR_PROFILE]: state => {
            return {
                ...state,
                data: {},
            }
        },
    },
    initialState
)

export default {
    reducer,
}
