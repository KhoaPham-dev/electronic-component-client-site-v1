import { createSelector } from 'reselect'

export const provinceSelector = createSelector(
    [state => state.province],
    province => province.provinceData
)
