import React from 'react'
import { HourglassOutlined , SolutionOutlined, CarOutlined, StopOutlined, CheckCircleOutlined } from '@ant-design/icons';
const AppConstants = {
    apiRootUrl: process.env.REACT_APP_API,
    contentRootUrl: `${process.env.REACT_APP_API}/v1/file/download`,
    langKey: 'vi',
}

const StorageKeys = {
    userData: 'hqtech-user-data',
    restaurantDetail: 'restaurant-detail',
    groupFoodDetail: 'group-food-detail',
    userToken: 'u-token',
}

const LayoutConfigs = {
    NAV_WIDTH_EXPANDED: 220,
    NAV_WIDTH_COLLAPSED: 80,
}

const UploadFileTypes = {
    AVATAR: 'AVATAR',
    LOGO: 'LOGO',
}

// Pagination config
export const DEFAULT_TABLE_ITEM_SIZE = 10
export const DEFAULT_PAGE_SIZE = 12
export const QRCODE_ITEM_PAGE_SIZE = 20
export const DATE_FORMAT_DISPLAY = 'DD-MM-YYYY'
export const DATE_FORMAT_VALUE = 'DD/MM/YYYY'
export const TIME_FORMAT_DISPLAY = 'HH:mm'

// Common status
export const STATUS_INACTIVE = 0
export const STATUS_ACTIVE = 1
export const STATUS_LOCK = -1
export const STATUS_DELETE = -2

export const AREA_KIND = {
    PROVINCE: 'PROVINCE_KIND_PROVINCE',
    DISTRICT: 'PROVINCE_KIND_DISTRICT',
    WARD: 'PROVINCE_KIND_WARD',
}

export const CurrentcyPositions = {
    FRONT: 0,
    BACK: 1,
}

export { AppConstants, StorageKeys, LayoutConfigs, UploadFileTypes }

export const CASH_ON_DELIVERY_PAYMENT_KIND = 1
export const CASH_ONLINE_PAYMENT_KIND = 2

export const OrdersStates = [
    {
        value: 0,
        label: 'Mới tạo',
        color: '#171717',
        icon: <HourglassOutlined />,
    },
    {
        value: 1,
        label: 'Đã duyệt',
        color: 'orange',
        icon: <SolutionOutlined />,
    },
    {
        value: 2,
        label: 'Vận chuyển',
        color: '#096dd9',
        icon: <CarOutlined />,
    },
    {
        value: 3,
        label: 'Hoàn tất',
        color: '#389e0d',
        icon: <CheckCircleOutlined />,
    },
    {
        value: 4,
        label: 'Đã hủy',
        color: '#cf1322',
        icon: <StopOutlined/>,
    },
]