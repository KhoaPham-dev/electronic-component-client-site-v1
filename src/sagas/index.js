import { all } from 'redux-saga/effects'
import appCommon from './appCommon'
import account from './account'
import province from './province'
import product from './product'
import address from './address'
import orders from './orders'
import news from './news'

const sagas = [
    ...appCommon,
    ...account,
    ...province,
    ...product,
    ...address,
    ...orders,
    ...news
]

function* rootSaga() {
    yield all(sagas)
}

export default rootSaga
