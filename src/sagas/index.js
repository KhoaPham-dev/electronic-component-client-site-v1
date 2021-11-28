import { all } from 'redux-saga/effects'
import appCommon from './appCommon'
import account from './account'
import area from './area'
import product from './product';

const sagas = [...appCommon, ...account, ...area, ...product]

function* rootSaga() {
    yield all(sagas)
}

export default rootSaga
