import React from 'react'
import { Switch, BrowserRouter, Redirect, Route } from 'react-router-dom'
import { sitePathConfig } from '../constants/sitePathConfig'

import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'
import NotFound from '../components/common/NotFound'
import Forbidden from '../containers/Forbidden'
import MasterLayout from '../components/common/appLayout/MasterLayout'
import ProductListPage from '../containers/productList/ProductListPage'

const RootRoute = () => {
    const {
        forbidden,
        homePage,
        aboutUs,
        news,
        product
    } = sitePathConfig

    return (
        <BrowserRouter>
            <Route
                path="/"
                render={props => (
                    <MasterLayout {...props}>
                        <Switch>
                            <PublicRoute
                                exact
                                path={'/'}
                                component={ProductListPage}
                            />
                            <PrivateRoute
                                exact
                                path={forbidden.path}
                                component={Forbidden}
                            />
                            <PublicRoute
                            exact path = {product.path}
                            component={ProductListPage}
                            />
                            <PublicRoute component={NotFound} accessAuth />
                        </Switch>
                    </MasterLayout>
                )}
            />
        </BrowserRouter>
    )
}

export default RootRoute
