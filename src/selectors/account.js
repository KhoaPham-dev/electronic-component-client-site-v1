import { createSelector } from 'reselect'

export const isAuthentication = createSelector(
    [state => state.account],
    account => !!Object.values(account.data).length
)

export const userDataSelector = createSelector(
    [state => state.account],
    account => account.data
)
