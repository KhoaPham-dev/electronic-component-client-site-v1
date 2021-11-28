import {
    actions as appCommonActions,
    actionTypes as appCommonTypes,
} from './appCommon'
import {
    actions as accountActions,
    actionTypes as accountTypes,
} from './account'
import {
    actions as productActions,
    actionTypes as productTypes,
} from './product'

export const actions = {
    ...appCommonActions,
    ...accountActions,
    ...productActions
}

export const types = {
    ...appCommonTypes,
    ...accountTypes,
    ...productTypes
}
