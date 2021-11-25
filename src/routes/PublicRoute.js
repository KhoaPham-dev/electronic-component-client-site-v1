import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'
import { sitePathConfig } from '../constants/sitePathConfig'
import { isAuthentication } from '../selectors/account'

const PublicRoute = ({
    component: Component,
    siteProps,
    accessAuth = false,
    ...rest
}) => {
    const isAuth = useSelector(isAuthentication)

    return (
        <Route
            {...rest}
            render={props =>
                !isAuth || accessAuth ? (
                    <Component {...props} {...siteProps} />
                ) : (
                    <Redirect to={sitePathConfig.homePage.path} />
                )
            }
        />
    )
}

export default PublicRoute
