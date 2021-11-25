import React from 'react'
import {
    SettingOutlined,
    UsergroupAddOutlined,
    ShopOutlined,
} from '@ant-design/icons'

// import AwesomeFontIcon from '../components/common/elements/AwesomeFontIcon';
import { sitePathConfig } from '../constants/sitePathConfig'

const navMenuConfig = [
    // dashboard: {
    //     label: 'Dashboard',
    //     path: '/dashboard',
    //     icon: <i className="icfa fa-comments"></i>,
    // },
    // {
    //     label: 'Administrator',
    //     icon: <AwesomeFontIcon className="fa-user-secret"/>,
    //     path: '/admins',
    //     permissions: [ROLE_SUPER_USER, ROLE_ADMIN]
    // },
    {
        label: 'Restaurant',
        icon: <ShopOutlined />,
        children: [
            {
                label: 'List Restaurant',
                ...sitePathConfig.restaurant,
            },
            {
                label: 'List Expired',
                ...sitePathConfig.restaurantExpired,
            },
        ],
    },
    {
        label: 'Restaurant',
        icon: <ShopOutlined />,
        children: [
            {
                label: 'List Restaurant',
                ...sitePathConfig.restaurantByCustomer,
                // childrenKeys: ['/group-food/', '/foods'],
            },
        ],
    },
    {
        label: 'Account Management',
        icon: <UsergroupAddOutlined />,
        children: [
            {
                label: 'Admin',
                ...sitePathConfig.admin,
            },
            {
                label: 'Customer',
                ...sitePathConfig.customer,
            },
            // {
            //     label: 'Role',
            //     ...siteConfig.role
            // },
        ],
    },
    {
        label: 'Setting',
        icon: <SettingOutlined />,
        children: [
            {
                label: 'System Setting',
                ...sitePathConfig.systemSetting,
            },
            {
                label: 'Group Permission',
                ...sitePathConfig.groupPermission,
            },
        ],
    },
]

export { navMenuConfig }
