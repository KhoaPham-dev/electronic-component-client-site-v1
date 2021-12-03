import { all } from 'redux-saga/effects'
import appCommon from './appCommon'
import account from './account'
import province from './province'
import product from './product'
import address from './address'

const sagas = [...appCommon, ...account, ...province, ...product, ...address]

function* rootSaga() {
    yield all(sagas)
}

export default rootSaga
