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
import {
    actions as cartActions,
    actionTypes as cartTypes,
} from './cart'

export const actions = {
    ...appCommonActions,
    ...accountActions,
    ...productActions,
    ...cartActions,
}

export const types = {
    ...appCommonTypes,
    ...accountTypes,
    ...productTypes,
    ...cartTypes,
}
