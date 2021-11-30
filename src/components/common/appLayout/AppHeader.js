import React, { useState } from 'react'
import { Layout, Menu, Space, Typography, Avatar, Input } from 'antd'
import { Link } from 'react-router-dom'

import { sitePathConfig } from '../../../constants/sitePathConfig'
import { useLocation } from 'react-router'

import { UserOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import logo from '../../../assets/images/logo.png'
import SearchBar from './SearchBar'
import CartContainer from '../../../containers/cart/CartContainer'
import { CART_MODAL, LOGIN_MODAL } from '../../../constants/masterData'
import LoginContainer from '../../../containers/account/LoginContainer'

const { Header } = Layout
const { Text } = Typography
const { SubMenu } = Menu



const AppHeader = ({ isAuth, onLogout, shortName, avatar }) => {
    const location = useLocation()
    const [showModal, setShowModal] = useState(-1)

    return (
        <Header className="app-header">
            <div className="logo">
                <img src={logo} alt=''/>
            </div>
            <div class="app-menu">
                <SearchBar />
                    {isAuth && (
                        <SubMenu
                            key="logged-subMenu"
                            title={<Text strong>{shortName}</Text>}
                            icon={
                                <Avatar
                                    size={24}
                                    src={avatar}
                                    icon={<UserOutlined />}
                                />
                            }
                            className="menu-right-logged"
                        >
                            <Menu.Item
                                key={sitePathConfig.updateProfile.path + '2'}
                            >
                                <Link to={sitePathConfig.updateProfile.path}>
                                    <Text strong>Hồ sơ</Text>
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="#" onClick={onLogout}>
                                <Text strong>Đăng xuất</Text>
                            </Menu.Item>
                        </SubMenu>
                    )}
            </div>
            {!isAuth && (
                <Menu
                    className="app-menu-right"
                    theme="light"
                    mode="horizontal"
                    selectedKeys={[location.pathname]}
                    key="menu-right"
                >
                    <Menu.Item key="1" onClick={() => setShowModal(LOGIN_MODAL)}>
                        <UserOutlined />
                        <Text strong>Đăng nhập</Text>
                    </Menu.Item>
                    <Menu.Item key="2" onClick={() => setShowModal(CART_MODAL)}>
                        <ShoppingCartOutlined />
                        <Text strong>Giỏ hàng</Text>
                    </Menu.Item>
                </Menu>
            )}
            {
                ({
                    [CART_MODAL]: <CartContainer
                    setShow={setShowModal}
                    />,
                    [LOGIN_MODAL]: <LoginContainer
                    setShow={setShowModal}
                    />,
                })[showModal] ?? null
            }
        </Header>
    )
}

export default AppHeader
