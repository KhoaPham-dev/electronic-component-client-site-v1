import React from 'react'
import { useSelector } from 'react-redux'
import { sitePathConfig } from '../constants/sitePathConfig'
import { isAuthentication } from '../selectors/account'

import { Redirect, Route } from 'react-router-dom'

const PrivateRoute = ({ component: Component, siteProps, ...rest }) => {
    const isAuth = useSelector(isAuthentication)

    return (
        <Route
            {...rest}
            render={props =>
                isAuth ? (
                    <Component {...props} {...siteProps} />
                ) : (
                    <Redirect to={sitePathConfig.login.path} />
                )
            }
        />
    )
}

export default PrivateRoute
