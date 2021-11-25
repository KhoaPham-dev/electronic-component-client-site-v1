import { all } from 'redux-saga/effects'
import appCommon from './appCommon'
import account from './account'
import area from './area'

const sagas = [...appCommon, ...account, ...area]

function* rootSaga() {
    yield all(sagas)
}

export default rootSaga
