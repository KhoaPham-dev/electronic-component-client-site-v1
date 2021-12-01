import { actionTypes, reduxUtil } from '../actions/province'

const initialState = {
    provinceData: null,
}

const reducer = reduxUtil.createReducer(
    {
        [reduxUtil.defineActionSuccess(actionTypes.GET_PROVINCE_AUTO_COMPLETE)]: (
            state,
            payload,
        ) => {
            return {
                provinceData: {
                    ...state.provinceData,
                    ...payload.data,
                }
            }
        },
    },
    initialState
)

export default {
    reducer,
}
