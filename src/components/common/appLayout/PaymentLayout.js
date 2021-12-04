import React, { useEffect, useState } from 'react'
import { Layout, Breadcrumb, Typography, Avatar } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { actions } from '../../../actions/account'
import sitePathConfig from '../../../constants/sitePathConfig'
import { isAuthentication, userDataSelector } from '../../../selectors/account'
import AppFooter from './AppFooter'
import { Link, useHistory } from 'react-router-dom'
import { itemsCartSelector } from '../../../selectors/cart'
import logo from '../../../assets/images/logo.png'
import { LOGIN_MODAL } from '../../../constants/masterData'
import Utils from '../../../utils'
import ModalsFactory from './ModalsFactory'

const { Content, Header } = Layout
const { Text } = Typography

const PaymentLayout = ({ children, title }) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const isAuth = useSelector(isAuthentication)
    const userData = useSelector(userDataSelector)
    const itemsCart = useSelector(itemsCartSelector)
    const [breadcrumbs, setBreadCumbs] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [idHash, setIdHash] = useState()
    const shortName = (userData.customerFullName || "Khách").split(' ').pop()
    const avatar = Utils.getFileUrl(userData?.customerAvatarPath)

    const onChangeBreadcrumb = (breadcrumbs) => {
        setBreadCumbs(breadcrumbs);
    }

    return (
        <Layout className="payment-layout">
            <Header className="header">
                <Layout className="left-header">
                    <h2 className="page-title">
                        {title}
                    </h2>
                    <Breadcrumb className="app-breadcrumb" separator=">">
                        <Breadcrumb.Item>
                            <Link to="/">Trang chủ</Link>
                        </Breadcrumb.Item>
                        {
                            breadcrumbs
                            ?
                            breadcrumbs.map(breadcrumb =>
                                <Breadcrumb.Item key={breadcrumb.name}>
                                    {
                                        breadcrumb.path
                                        ?
                                            <Link className="routing" to={breadcrumb.path}>{breadcrumb.name}</Link>
                                        :
                                            breadcrumb.name
                                    }
                                </Breadcrumb.Item>
                            )
                            :
                            null
                        }
                    </Breadcrumb>
                </Layout>
                <img className="logo" src={logo}/>
                {
                    isAuth ? (
                        <div>
                            <span style={{
                                marginRight: "0.5em"
                            }}>Xin chào, {shortName}</span>
                            <Avatar src={avatar} size="large"/>
                        </div>
                    ) : (
                        <Layout className="right-header" onClick={() => setShowModal(LOGIN_MODAL)}>
                            <UserOutlined />
                            <Text>Đăng nhập để theo dõi <br /> thông tin đơn hàng</Text>
                        </Layout>
                    )
                }
            </Header>
            <Layout className="content">
                <Content className="content-wrapper">
                    {
                        React.cloneElement(children, {
                            changeBreadcrumb: onChangeBreadcrumb,
                        })
                    }
                </Content>
            </Layout>
            <AppFooter />
            <ModalsFactory
            showModal={showModal}
            idHash={idHash}
            setIdHash={setIdHash}
            setShowModal={setShowModal}
            />
        </Layout>
    )
}

export default PaymentLayout
