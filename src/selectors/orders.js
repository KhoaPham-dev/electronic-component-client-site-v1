import { createSelector } from 'reselect'

export const ordersDataSelector = createSelector(
    [state => state.orders],
    orders => orders?.ordersData
)

export const ordersDetailSelector = createSelector(
    [state => state.orders],
    orders => orders?.ordersDetail
)