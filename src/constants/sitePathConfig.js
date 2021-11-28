import apiConfig from './apiConfig';

export const sitePathConfig = {
    login: {
        path: '/login',
        title: 'Đăng nhập',
        layoutConfig: {
            contentClass: 'login-page',
        },
    },
    register: {
        path: '/register',
        title: 'Đăng ký',
    },
    updateProfile: {
        path: '/update-profile',
        title: 'Cập nhật hồ sơ điện tử',
    },
    homePage: {
        path: '/',
        title: 'Trang chủ',
    },
    aboutUs: {
        path: '/about',
        title: 'Về chúng tôi',
    },
    exams: {
        path: '/exams',
        title: 'Khảo sát',
    },
    forbidden: {
        path: '/forbidden',
        title: 'Forbidden',
    },
    competences: {
        path: '/competences',
        title: 'Hồ sơ năng lực',
    },
    verifyAccount: {
        path: '/verify-account',
        title: 'Xác thực tài khoản',
    },
    forgotPassword: {
        path: '/forgot-password',
        title: 'Quên mật khẩu',
    },
    product: {
        path: '/productList',
    }
}

export default sitePathConfig
