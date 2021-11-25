import { Layout } from 'antd'
import React, { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { actions } from '../../../actions/account'
import sitePathConfig from '../../../constants/sitePathConfig'
import { isAuthentication, userDataSelector } from '../../../selectors/account'
import { clsx } from '../../../utils/helper'
import Utils from '../../../utils/index'
import AppFooter from './AppFooter'
import AppHeader from './AppHeader'
import AppTitle from './AppTitle'

const { Content } = Layout

const MasterLayout = ({ children, history }) => {
    const dispatch = useDispatch()
    const isAuth = useSelector(isAuthentication)
    const userData = useSelector(userDataSelector)
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

    useEffect(() => {
        if (history.action === 'PUSH') {
            window.scrollTo(0, 0)
        }
    }, [history.location.pathname])

    return (
        <Layout className="master-layout">
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
            <AppTitle />
            <Content className={clsx('app-content', contentClass)}>
                {React.cloneElement(children, {})}
            </Content>
            <AppFooter />
        </Layout>
    )
}

export default MasterLayout
