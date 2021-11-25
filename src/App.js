import React, { useEffect, useState } from 'react'
import { Spin } from 'antd'
import RootRoute from './routes/index'

import { useDispatch, useSelector } from 'react-redux'
import { StorageKeys } from './constants'
import { getStringData } from './utils/localStorageHelper'
import { actions } from './actions/account'

const App = () => {
    const fullScreenLoading = useSelector(state => {
        return state.appCommon.fullScreenLoading
    })
    const dispatch = useDispatch()

    const userToken = getStringData(StorageKeys.userToken)

    const [waitingInit, setWaitingInit] = useState(!!userToken)

    useEffect(() => {
        if (userToken) {
            // call get user profile here
            // then set waiting init
            dispatch(
                actions.getProfile({
                    onDone: () => setWaitingInit(false),
                })
            )
        }
    }, [])

    return (
        <Spin
            size="large"
            wrapperClassName="full-screen-loading"
            spinning={waitingInit || fullScreenLoading > 0}
        >
            {!waitingInit && <RootRoute />}
        </Spin>
    )
}

export default App
