import { actionTypes, reduxUtil } from '../actions/cart';

import { getSessionObjectData, setSessionObjectData } from '../utils/sessionStorageHelper'
import { StorageKeys } from '../constants'
const { createReducer, defineActionSuccess, defineActionLoading, defineActionFailed } = reduxUtil;

const {
    SET_ITEMS_CART,
    SET_SELECTED_ITEM,
} = actionTypes;


const initialState = {
    itemsCart: getSessionObjectData(StorageKeys.userData)?.itemsCart || [],
    // [
        // {
        //     id: 39,
        //     isShowNote: false,
        //     note: '',
        //     quantity: 2,
        //     parentId: 100,
        // },
    // ],
    selectedItem: null,
}

const reducer = createReducer({

    [SET_ITEMS_CART]: (state, {itemsCart}) => {
        const userData = getSessionObjectData(StorageKeys.userData) || {}
        setSessionObjectData(StorageKeys.userData, {
            ...userData,
            itemsCart,
        })
        return {
            ...state,
            itemsCart
        }
    },
    [SET_SELECTED_ITEM]: (state, payload) => {
        return {
            ...state,
            selectedItem: payload
        }
    },
}, initialState)

export default {
    reducer
};
