import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { sitePathConfig } from '../constants/sitePathConfig'

const PublicRoute = ({
    component: Component,
    exact,
    layoutComponent: LayoutComponent,
    path,
    ...rest
}) => {

    return (
        <Route
        path={path}
        exact={exact}
        render={props => (
            <LayoutComponent {...rest}>
                <Component {...rest} />
            </LayoutComponent>
            )
        }
        {...rest}
        />
    )
}

export default PublicRoute
