import { createSelector } from 'reselect'

export const addressDataSelector = createSelector(
    [state => state.address],
    address => address?.addressData
)