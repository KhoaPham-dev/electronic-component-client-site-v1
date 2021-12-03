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
import {
    actions as provinceActions,
    actionTypes as provinceTypes,
} from './province'
import {
    actions as addressActions,
    actionTypes as addressTypes,
} from './address'

export const actions = {
    ...appCommonActions,
    ...accountActions,
    ...productActions,
    ...cartActions,
    ...provinceActions,
    ...addressActions,
}

export const types = {
    ...appCommonTypes,
    ...accountTypes,
    ...productTypes,
    ...cartTypes,
    ...provinceTypes,
    ...addressTypes,
}
