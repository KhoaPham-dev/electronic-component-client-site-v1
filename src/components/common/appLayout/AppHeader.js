import React, { useState } from 'react'
import { Layout, Menu, Space, Typography, Avatar, Input, Badge } from 'antd'
import { Link } from 'react-router-dom'

import { sitePathConfig } from '../../../constants/sitePathConfig'
import { useLocation } from 'react-router'

import {
    UserOutlined,
    ShoppingCartOutlined,
    CaretDownFilled,
    BankOutlined,
    CarryOutOutlined,
    ExportOutlined,
} from '@ant-design/icons'
import logo from '../../../assets/images/logo.png'
import SearchBar from './SearchBar'
import CartContainer from '../../../containers/cart/CartContainer'
import { ADDRESS_MODAL, CART_MODAL, LOGIN_MODAL, PROFILE_MODAL, RECOVERY_MODAL, REGISTER_MODAL, REQUEST_RECOVERY_MODAL } from '../../../constants/masterData'
import LoginContainer from '../../../containers/account/LoginContainer'
import RegisterContainer from '../../../containers/account/RegisterContainer'
import ProfileContainer from '../../../containers/account/ProfileContainer'
import RequestForgotPasswordContainer from '../../../containers/account/RequestForgotPasswordContainer'
import RecoveryPasswordContainer from '../../../containers/account/RecoveryPasswordContainer'
import AddressContainer from '../../../containers/address/AddressContainer'

const { Header } = Layout
const { Text } = Typography
const { SubMenu } = Menu



const AppHeader = ({ isAuth, onLogout, shortName, avatar, itemsCart }) => {
    const location = useLocation()
    const [showModal, setShowModal] = useState(-1)
    const [idHash, setIdHash] = useState()

    return (
        <Header className="app-header">
            <div className="logo">
                <img src={logo} alt=''/>
            </div>
            <div class="app-menu">
                <SearchBar />
            </div>
            <Menu
                className="app-menu-right"
                theme="light"
                mode="horizontal"
                key="menu-right"
                disabledOverflow={!isAuth}
                style={isAuth ? {
                    maxWidth: '200px'
                } : {}}
                overflowedIndicator={
                    <div>
                        <span style={{
                            marginRight: "0.5em"
                        }}>Xin chào, {shortName}</span>
                        <Badge count={itemsCart.length}>
                            <Avatar src={avatar} size="large"/>
                        </Badge>

                    </div>
                }
            >
                {
                    isAuth ? (<>
                        <Menu.Item key={CART_MODAL} onClick={() => setShowModal(CART_MODAL)}>
                            <ShoppingCartOutlined />
                            <Text strong>Giỏ hàng <Badge count={itemsCart.length}></Badge></Text>
                        </Menu.Item>
                        <Menu.Item key={PROFILE_MODAL} onClick={() => setShowModal(PROFILE_MODAL)}>
                            <UserOutlined />
                            <Text strong>Hồ sơ</Text>
                        </Menu.Item>
                        <Menu.Item key={ADDRESS_MODAL} onClick={() => setShowModal(ADDRESS_MODAL)}>
                            <BankOutlined />
                            <Text strong>Quản lý địa chỉ</Text>
                        </Menu.Item>
                        <Menu.Item key="4">
                            <CarryOutOutlined />
                            <Text strong>Đơn hàng của tôi</Text>
                        </Menu.Item>
                        <Menu.Item key="5" onClick={onLogout}>
                            <ExportOutlined />
                            <Text strong>Đăng xuất</Text>
                        </Menu.Item>
                    </>) : (<>
                        <Menu.Item key={LOGIN_MODAL} onClick={() => setShowModal(LOGIN_MODAL)}>
                            <UserOutlined />
                            <Text strong>Đăng nhập</Text>
                        </Menu.Item>
                        <Menu.Item key={CART_MODAL} onClick={() => setShowModal(CART_MODAL)}>
                            <ShoppingCartOutlined />
                            <Text strong>Giỏ hàng</Text>
                        </Menu.Item>
                    </>)
                }
            </Menu>
            {
                ({
                    [CART_MODAL]: <CartContainer
                    setShow={setShowModal}
                    />,
                    [LOGIN_MODAL]: <LoginContainer
                    setShow={setShowModal}
                    />,
                    [REGISTER_MODAL]: <RegisterContainer
                    setShow={setShowModal}
                    />,
                    [PROFILE_MODAL]: <ProfileContainer
                    setShow={setShowModal}
                    />,
                    [REQUEST_RECOVERY_MODAL]: <RequestForgotPasswordContainer
                    setShow={setShowModal}
                    setIdHash={setIdHash}
                    />,
                    [RECOVERY_MODAL]: <RecoveryPasswordContainer
                    setShow={setShowModal}
                    idHash={idHash}
                    />,
                    [ADDRESS_MODAL]: <AddressContainer
                    setShow={setShowModal}
                    />,
                })[showModal] ?? null
            }
        </Header>
    )
}

export default AppHeader
