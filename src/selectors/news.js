import { createSelector } from 'reselect'

export const newsListSelector = createSelector(
    [state => state.news],
    news => news.newsData
)

export const categoryListSelector = createSelector(
    [state => state.news],
    news => news.newsCategoryType
)

export const tbnewsListLoadingSelector = createSelector(
    [state => state.news],
    news => news.tbnewsLoading
)

export const getNewsId = createSelector(
    [state => state.news],
    news => news?.newsId
)
