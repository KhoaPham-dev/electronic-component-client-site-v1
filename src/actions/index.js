import {
    actions as appCommonActions,
    actionTypes as appCommonTypes,
} from './appCommon'
import {
    actions as accountActions,
    actionTypes as accountTypes,
} from './account'

export const actions = {
    ...appCommonActions,
    ...accountActions,
}

export const types = {
    ...appCommonTypes,
    ...accountTypes,
}
