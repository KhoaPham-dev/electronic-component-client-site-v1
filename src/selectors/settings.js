import { createSelector } from 'reselect'

export const settingsListSelector = createSelector(
    [state => state.settings],
    settings => settings.settingsData
)

export const tbsettingsListLoadingSelector = createSelector(
    [state => state.settings],
    settings => settings.tbsettingsLoading
)

