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
import {
    actions as ordersActions,
    actionTypes as ordersTypes,
} from './orders'
import {
    actions as newsActions,
    actionTypes as newsTypes
} from './news'
import {
    actions as settingsActions,
    actionTypes as settingsTypes
} from './settings';

export const actions = {
    ...appCommonActions,
    ...accountActions,
    ...productActions,
    ...cartActions,
    ...provinceActions,
    ...addressActions,
    ...ordersActions,
    ...newsActions,
    ...settingsActions
}

export const types = {
    ...appCommonTypes,
    ...accountTypes,
    ...productTypes,
    ...cartTypes,
    ...provinceTypes,
    ...addressTypes,
    ...ordersTypes,
    ...newsTypes,
    ...settingsTypes
}
