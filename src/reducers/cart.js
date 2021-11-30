import { actionTypes, reduxUtil } from '../actions/cart';

import { getSessionObjectData, setSessionObjectData } from '../utils/sessionStorageHelper'
import { StorageKeys } from '../constants'
const { createReducer, defineActionSuccess, defineActionLoading, defineActionFailed } = reduxUtil;

const {
    SET_ITEMS_CART,
    SET_SELECTED_ITEM,
} = actionTypes;


const initialState = {
    // itemsCart: getSessionObjectData(StorageKeys.userData)?.itemsCart || [],
    itemsCart: [
        {
            id: 93,
            isShowNote: false,
            note: '',
            quantity: 2,
            parentId: 100,
        },
    ],
    selectedItem: null,
}

const reducer = createReducer({

    [SET_ITEMS_CART]: (state, action) => {
        const { itemsCart, selectedItem } = action.payload
        const userData = getSessionObjectData(StorageKeys.userData) || {}
        setSessionObjectData(StorageKeys.userData, {
            ...userData,
            itemsCart,
        })
        return {
            ...state,
            itemsCart,
            selectedItem,
        }
    },
    [SET_SELECTED_ITEM]: (state, action) => {
        return {
            ...state,
            selectedItem: action.payload
        }
    },
}, initialState)

export default {
    reducer
};
