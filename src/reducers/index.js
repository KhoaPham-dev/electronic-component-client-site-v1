import { combineReducers } from 'redux'
import appCommon from './appCommon'
import account from './account'
import area from './area'
import product from './product';
import cart from './cart';

const rootReducer = combineReducers({
    appCommon: appCommon.reducer,
    account: account.reducer,
    area: area.reducer,
    product: product.reducer,
    cart: cart.reducer,
})

export default rootReducer
