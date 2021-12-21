import { actionTypes, reduxUtil } from '../actions/settings';
import { getSessionObjectData, setSessionObjectData } from '../utils/sessionStorageHelper'
import { StorageKeys } from '../constants'
const { createReducer, defineActionSuccess, defineActionLoading, defineActionFailed } = reduxUtil;

const {
    GET_SETTINGS_LIST_CLIENT
} = actionTypes;

const initialState = { 
    settingsData: [],
    tbsettingsLoading: false,
};

const reducer = createReducer({

    [defineActionLoading(GET_SETTINGS_LIST_CLIENT)]: (state) => {
        return {
            ...state,
            tbsettingsLoading: true
        }
    },
    [defineActionSuccess(GET_SETTINGS_LIST_CLIENT)]: (state, { settingsData }) => {
        return {
            ...state,
            settingsData,
            tbsettingsLoading: false
        }
    },
}, initialState)

export default {
    reducer
};