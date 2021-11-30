import React from 'react'
import { Layout, Menu, Space, Typography, Avatar, Input } from 'antd'
import { Link } from 'react-router-dom'

import { sitePathConfig } from '../../../constants/sitePathConfig'
import { useLocation } from 'react-router'

import { UserOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import logo from '../../../assets/images/logo.png'
import SearchBar from './SearchBar'

const { Header } = Layout
const { Text } = Typography
const { SubMenu } = Menu



const AppHeader = ({ isAuth, onLogout, shortName, avatar }) => {
    const location = useLocation()

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
                    <Menu.Item key={sitePathConfig.login.path}>
                        <Link to={sitePathConfig.login.path}>
                            <UserOutlined />
                            <Text strong>Đăng nhập</Text>
                        </Link>
                    </Menu.Item>
                    <Menu.Item to="/" key="2">
                        <ShoppingCartOutlined />
                        <Text strong>Giỏ hàng</Text>
                    </Menu.Item>
                </Menu>
            )}
        </Header>
    )
}

export default AppHeader
