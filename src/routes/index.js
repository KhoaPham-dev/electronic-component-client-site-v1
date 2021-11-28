import React from 'react'
import { Switch, BrowserRouter, Redirect, Route } from 'react-router-dom'
import { sitePathConfig } from '../constants/sitePathConfig'

import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'
import Login from '../containers/account/Login'
import NotFound from '../components/common/NotFound'
import Forbidden from '../containers/Forbidden'
import AboutUS from '../containers/about/AboutUS'
import Exams from '../containers/exams/Exams'
import Register from '../containers/account/Register'
import Competences from '../containers/competences/Competences'
import VerifyAccount from '../containers/account/VerifyAccount'
import ForgotPassword from '../containers/account/ForgotPassword'
import MasterLayout from '../components/common/appLayout/MasterLayout'
import ProductListPage from '../containers/productList/ProductListPage'

const RootRoute = () => {
    const {
        login,
        forbidden,
        homePage,
        aboutUs,
        news,
        register,
        updateProfile,
        competences,
        verifyAccount,
        forgotPassword,
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
                                path={login.path}
                                component={Login}
                            />
                            <PublicRoute
                                exact
                                path={aboutUs.path}
                                component={AboutUS}
                                accessAuth
                            />
                            <PublicRoute
                                exact
                                path={news.path}
                                component={Exams}
                                accessAuth
                            />
                            <PublicRoute
                                exact
                                path={register.path}
                                component={Register}
                            />
                            <PublicRoute
                                exact
                                path={forgotPassword.path}
                                component={ForgotPassword}
                            />
                            <PublicRoute
                                exact
                                path={verifyAccount.path}
                                component={VerifyAccount}
                            />
                            <PrivateRoute
                                exact
                                path={updateProfile.path}
                                siteProps={{
                                    isEditing: true,
                                }}
                                component={Register}
                            />
                            <PrivateRoute
                                exact
                                path={competences.path}
                                component={Competences}
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
