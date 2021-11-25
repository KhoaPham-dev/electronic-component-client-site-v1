import reduxHelper from '../utils/redux'

export const reduxUtil = reduxHelper('AREA')

const { defineAction, createAction } = reduxUtil

export const actionTypes = {
    GET_AREA: defineAction('GET_AREA'),
    GET_AREA_FIRST: defineAction('GET_AREA_FIRST'),
}

export const actions = {
    getArea: createAction(actionTypes.GET_AREA),
    getAreaFirst: createAction(actionTypes.GET_AREA_FIRST),
}
