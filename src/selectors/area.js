import { createSelector } from 'reselect'

export const provincesSelector = createSelector(
    [state => state.area],
    area => area.provinces
)

export const areasSelector = createSelector(
    [state => state.area],
    area => area.areas
)
