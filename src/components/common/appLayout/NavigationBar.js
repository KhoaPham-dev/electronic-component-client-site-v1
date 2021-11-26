import React from 'react'
import { Layout, Menu, Space, Typography, Avatar } from 'antd'
import { Link } from 'react-router-dom'

import { sitePathConfig } from '../../../constants/sitePathConfig'
import { useLocation } from 'react-router'

import { UserOutlined } from '@ant-design/icons'
import logo from '../../../assets/images/logoelectronic.jpg'

const { Header } = Layout
const { Text } = Typography
const { SubMenu } = Menu

const menus = [
    {
        title: 'Trang chủ',
        path: sitePathConfig.aboutUs.path,
    },
    {
        title: 'Sản phẩm',
        subs: [
            {
                title: 'Hồ sơ cá nhân',
                path: sitePathConfig.updateProfile.path,
            },
            {
                title: 'Hồ sơ năng lực',
                path: sitePathConfig.competences.path,
            },
        ],
    },
    {
        title: 'Tin tức',
        path: sitePathConfig.exams.path,
    },
    {
        title: 'Giỏ hàng',
        path: '/'
    }
]

const NavigationBar = ({ isAuth, onLogout, shortName, avatar }) => {
    const location = useLocation()

    return (
        <Header className="app-header-navbar">
            <Menu
                className="app-menu"
                theme="light"
                mode="horizontal"
                selectedKeys={[location.pathname]}
            >
                {menus.map(menu =>
                    menu.subs ? (
                        <SubMenu key="SubMenu" title={menu.title}>
                            {menu.subs.map(subMenu => (
                                <Menu.Item key={subMenu.path}>
                                    <Link to={subMenu.path}>
                                        {subMenu.title}
                                    </Link>
                                </Menu.Item>
                            ))}
                        </SubMenu>
                    ) : (
                        <Menu.Item key={menu.path}>
                            <Link to={menu.path}>{menu.title}</Link>
                        </Menu.Item>
                    )
                )}
                {/* {isAuth && (
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
                )} */}
            </Menu>
            {/* {!isAuth && (
                <Menu
                    className="app-menu-right"
                    theme="light"
                    mode="horizontal"
                    selectedKeys={[location.pathname]}
                    key="menu-right"
                >
                    <Menu.Item key={sitePathConfig.login.path}>
                        <Link to={sitePathConfig.login.path}>
                            <Text strong>Đăng nhập</Text>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key={sitePathConfig.register.path}>
                        <Link to={sitePathConfig.register.path}>
                            <Text strong>Đăng ký</Text>
                        </Link>
                    </Menu.Item>
                </Menu>
            )} */}
        </Header>
    )
}

export default NavigationBar
