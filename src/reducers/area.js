import { actionTypes, reduxUtil } from '../actions/area'

const initialState = {
    provinces: null,
    areas: {},
}

const reducer = reduxUtil.createReducer(
    {
        [reduxUtil.defineActionSuccess(actionTypes.GET_AREA)]: (
            state,
            { data, params }
        ) => {
            if (params?.parentId) {
                return {
                    ...state,
                    areas: {
                        ...state.areas,
                        [params?.parentId]: data,
                    },
                }
            } else {
                return {
                    ...state,
                    provinces: data,
                }
            }
        },
    },
    initialState
)

export default {
    reducer,
}
