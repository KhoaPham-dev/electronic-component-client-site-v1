import { combineReducers } from 'redux'
import appCommon from './appCommon'
import account from './account'
import product from './product';
import cart from './cart';
import province from './province';
import address from './address';

const rootReducer = combineReducers({
    appCommon: appCommon.reducer,
    account: account.reducer,
    product: product.reducer,
    cart: cart.reducer,
    province: province.reducer,
    address: address.reducer,
})

export default rootReducer
