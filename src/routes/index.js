import React from 'react'
import { Switch, BrowserRouter, Redirect, Route } from 'react-router-dom'
import { sitePathConfig } from '../constants/sitePathConfig'

import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'
import NotFound from '../components/common/NotFound'
import Forbidden from '../containers/Forbidden'
import MasterLayout from '../components/common/appLayout/MasterLayout'
import ProductListPage from '../containers/productList/ProductListPage'
import MakeOrdersContainer from '../containers/makeOrders/MakeOrdersContainer'
import PaymentLayout from '../components/common/appLayout/PaymentLayout'

const RootRoute = () => {
    const {
        forbidden,
        homePage,
        aboutUs,
        news,
        product,
        makeOrders,
    } = sitePathConfig

    return (
        <BrowserRouter>
            <Route
                path="/"
                render={props => (
                    <Switch>
                        <PublicRoute
                            exact
                            path={homePage.path}
                            component={ProductListPage}
                            layoutComponent={MasterLayout}
                            {...props}
                        />
                        <PublicRoute
                            exact
                            path={product.path}
                            component={ProductListPage}
                            layoutComponent={MasterLayout}
                            {...props}
                        />
                        <PublicRoute
                            exact
                            path={makeOrders.path}
                            component={MakeOrdersContainer}
                            layoutComponent={PaymentLayout}
                            title="Đặt hàng"
                            {...props}
                        />
                        <PublicRoute component={NotFound}/>
                    </Switch>
                )}
            />
        </BrowserRouter>
    )
}

export default RootRoute
