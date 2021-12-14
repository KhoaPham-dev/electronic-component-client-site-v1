import { combineReducers } from 'redux'
import appCommon from './appCommon'
import account from './account'
import product from './product';
import cart from './cart';
import province from './province';
import address from './address';
import orders from './orders';
import news from './news';

const rootReducer = combineReducers({
    appCommon: appCommon.reducer,
    account: account.reducer,
    product: product.reducer,
    cart: cart.reducer,
    province: province.reducer,
    address: address.reducer,
    orders: orders.reducer,
    news: news.reducer
})

export default rootReducer
