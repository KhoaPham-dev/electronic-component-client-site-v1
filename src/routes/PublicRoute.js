import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { sitePathConfig } from '../constants/sitePathConfig'

const PublicRoute = ({
    component: Component,
    siteProps,
    accessAuth = false,
    ...rest
}) => {

    return (
        <Route
            {...rest}
            render={props =>
                <Component {...props} {...siteProps} />
            }
        />
    )
}

export default PublicRoute
