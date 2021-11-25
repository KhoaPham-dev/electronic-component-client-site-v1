// Helps to standardize and keep actions unique across your application
const helper = moduleName => {
    // We will define our action type here
    const defineAction = actionName => `${moduleName}/${actionName}`
    const defineActionSuccess = actionName => `${actionName}_SUCCESS`
    const defineActionLoading = actionName => `${actionName}_LOADING`
    const defineActionFailed = actionName => `${actionName}_FAILED`

    // Then create action for the type
    const createAction = type => payload => ({ type, payload })

    // Then create action loading for the type
    const createActionWithLoading = type => payload => ({
        type: `${type}_LOADING`,
        payload,
    })

    // Consume all actions and initial state (if have) to make our reducer
    const createReducer =
        (cases, defaultState = {}) =>
        (state, action = {}) => {
            if (state === undefined) {
                return defaultState
            }
            if (cases[action.type]) {
                return cases[action.type](state, action)
            }
            return state
        }

    return {
        defineAction,
        defineActionSuccess,
        defineActionLoading,
        defineActionFailed,
        createAction,
        createActionWithLoading,
        createReducer,
    }
}

export default helper
