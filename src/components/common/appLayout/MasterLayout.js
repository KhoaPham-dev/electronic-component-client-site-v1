import { Layout, Breadcrumb } from 'antd'
import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { actions } from '../../../actions/account'
import sitePathConfig from '../../../constants/sitePathConfig'
import { isAuthentication, userDataSelector } from '../../../selectors/account'
import { clsx } from '../../../utils/helper'
import Utils from '../../../utils/index'
import AppFooter from './AppFooter'
import AppHeader from './AppHeader'
import NavigationBar from './NavigationBar'
import Banner from './Banner'
import NavSider from './NavSider'
import { Link } from 'react-router-dom';

const { Content } = Layout

const MasterLayout = ({ children, history }) => {
    const dispatch = useDispatch()
    const isAuth = useSelector(isAuthentication)
    const userData = useSelector(userDataSelector)
    const [breadcrumbs, setBreadCumbs] = useState([]);
    const { contentClass } = useMemo(() => {
        const { layoutConfig = {} } =
            Object.values(sitePathConfig).find(
                site => site.path === history.location.pathname
            ) || {}
        return layoutConfig
    }, [history.location.pathname])

    const onLogout = () => {
        dispatch(actions.logout())
    }

    const onChangeBreadcrumb = (breadcrumbs) => {
        setBreadCumbs({ breadcrumbs });
    }

    useEffect(() => {
        if (history.action === 'PUSH') {
            window.scrollTo(0, 0)
        }
    }, [history.location.pathname])

    return (
        <Layout className="master-layout">
            <div style={{
                background: 'white'
            }}>
                <div className='helloheader'>Chào mừng đến với thế giới linh kiện điện tử...</div>
                <AppHeader
                onLogout={onLogout}
                isAuth={isAuth}
                shortName={
                    userData.fullName
                        ? userData.fullName.split(' ').pop()
                        : 'Hồ sơ'
                }
                avatar={Utils.getFileUrl(userData?.avatarPath)}
            />
            </div>
            
            <NavigationBar></NavigationBar>
            <Banner />
            <div  style={{background: 'white'}}>
                <Layout className='containtersider'>
                    <NavSider>              
                    </NavSider>
                    <Layout>
                                    <Content className="app-content">
                                        <div className="content-wrapper">
                                            {React.cloneElement(children, {
                                                // changeUserData: this.onChangeUserData,
                                                currentUser: userData,
                                                changeBreadcrumb: onChangeBreadcrumb,
                                                // showFullScreenLoading,
                                                // hideFullScreenLoading
                                            })}
                                            
                                        </div>
                                    </Content>
                        </Layout>
                </Layout>
            </div>
            <AppFooter />
        </Layout>
    )
}

export default MasterLayout
