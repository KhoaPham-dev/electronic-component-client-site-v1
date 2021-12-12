import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import MasterLayout from '../components/common/appLayout/MasterLayout'
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
        render={props => LayoutComponent ? (
            <LayoutComponent {...rest}>
                <Component {...rest} />
            </LayoutComponent>
            ) : <Component {...rest} />
        }
        {...rest}
        />
    )
}

export default PublicRoute
