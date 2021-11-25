import { combineReducers } from 'redux'
import appCommon from './appCommon'
import account from './account'
import area from './area'

const rootReducer = combineReducers({
    appCommon: appCommon.reducer,
    account: account.reducer,
    area: area.reducer,
})

export default rootReducer
