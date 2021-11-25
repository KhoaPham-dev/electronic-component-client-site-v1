import { actionTypes, reduxUtil } from '../actions/appCommon'

const { createReducer } = reduxUtil
const { SHOW_FULL_SCREEN_LOADING, HIDE_FULL_SCREEN_LOADING } = actionTypes

const initialState = {
    fullScreenLoading: false,
}

const reducer = createReducer(
    {
        [SHOW_FULL_SCREEN_LOADING]: state => {
            return {
                ...state,
                fullScreenLoading: state.fullScreenLoading + 1,
            }
        },
        [HIDE_FULL_SCREEN_LOADING]: state => {
            return {
                ...state,
                fullScreenLoading: Math.max(0, state.fullScreenLoading - 1),
            }
        },
    },
    initialState
)

export default {
    reducer,
}
