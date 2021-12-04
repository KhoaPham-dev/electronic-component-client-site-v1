import apiConfig from './apiConfig';

export const sitePathConfig = {
    homePage: {
        path: '/',
        title: 'Trang chủ',
    },
    news: {
        path: '/news',
        title: 'Tin tức',
    },
    forbidden: {
        path: '/forbidden',
        title: 'Forbidden',
    },
    product: {
        path: '/productList',
        title: 'Danh sách sản phẩm'
    },
    makeOrders: {
        path: '/make-orders',
        title: 'Đặt hàng'
    },
    ordersDetail: {
        path: '/orders-detail',
        title: 'Chi tiết đơn hàng',
    },
}

export default sitePathConfig
