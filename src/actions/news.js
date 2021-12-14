import reduxHelper from '../utils/redux'

export const reduxUtil = reduxHelper('NEWS')

const { defineAction, createActionWithLoading, createAction } = reduxUtil


export const actionTypes = {
    GET_NEWS_LIST_CLIENT: defineAction('GET_NEWS_LIST_CLIENT'),
    GET_CATEGORY_TYPE_NEWS: defineAction('GET_CATEGORY_TYPE_NEWS'),
    GET_NEWS_BYID_CLIENT: defineAction('GET_NEWS_BYID_CLIENT'),
    GET_NEWSID: defineAction('GET_NEWSID')
}

export const actions = {
    getNewsListClient: createActionWithLoading(actionTypes.GET_NEWS_LIST_CLIENT),
    getCategoryTypeNews: createActionWithLoading(actionTypes.GET_CATEGORY_TYPE_NEWS),
    getNewsByIdClient: createAction(actionTypes.GET_NEWS_BYID_CLIENT),
    getNewsId: createAction(actionTypes.GET_NEWSID)
}