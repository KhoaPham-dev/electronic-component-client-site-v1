const baseHeader = {
    'Content-Type': 'application/json',
    Accept: '*/*',
}

const multipartFormHeader = {
    'Content-Type': 'multipart/form-data',
}

const apiConfig = {
    file: {
        upload: {
            path: 'v1/file/upload',
            method: 'POST',
            headers: multipartFormHeader,
        },
    },
    account: {
        login: {
            path: 'v1/account/client-login',
            method: 'POST',
            headers: baseHeader,
        },
        logout: {
            path: 'v1/account/logout',
            method: 'GET',
            headers: baseHeader,
        },
        verifyAccount: {
            path: 'v1/account/verify_account',
            method: 'POST',
            headers: baseHeader,
        },
        requestForgotPassword: {
            path: 'v1/account/request_forget_password',
            method: 'POST',
            headers: baseHeader,
        },
        changePassword: {
            path: 'v1/account/forget_password',
            method: 'POST',
            headers: baseHeader,
        },
        register: {
            path: 'v1/customer/register',
            method: 'POST',
            headers: baseHeader,
        }
    },
    customer: {
        getProfile: {
            path: 'v1/customer/profile',
            method: 'GET',
            headers: baseHeader,
        },
        register: {
            path: 'v1/customer/register',
            method: 'POST',
            headers: baseHeader,
        },
        updateProfile: {
            path: 'v1/customer/update_profile',
            method: 'PUT',
            headers: baseHeader,
        },
    },
    province: {
        autocomplete: {
            path: 'v1/province/auto-complete',
            method: 'GET',
            headers: baseHeader,
        },
    },
    category: {
        getCategoryList: {
            path: 'v1/category/auto-complete',
            method: 'GET',
            headers: baseHeader
        }
    },
    product:  {
        getProductClientList: {
            path: 'v1/product/client-list',
            method: 'GET',
            headers: baseHeader
        },
        getProductClientListChild: {
            path: 'v1/product/client-list',
            method: 'GET',
            headers: baseHeader
        },
        getProductByIdClient: {
            path: 'v1/product/client-get',
            method: 'GET',
            headers: baseHeader
        }
    },
    address:  {
        getList: {
            path: 'v1/addresses/auto-complete',
            method: 'GET',
            headers: baseHeader
        },
        create: {
            path: 'v1/addresses/create',
            method: 'POST',
            headers: baseHeader
        },
        update: {
            path: 'v1/addresses/update',
            method: 'PUT',
            headers: baseHeader
        },
        delete: {
            path: 'v1/addresses/delete',
            method: 'DELETE',
            headers: baseHeader
        },
    },
    orders: {
        list: {
            path: 'v1/orders/client-list-orders',
            method: 'GET',
            headers: baseHeader
        },
        create: {
            path: 'v1/orders/client-create',
            method: 'POST',
            headers: baseHeader
        },
        unAuthCreate: {
            path: 'v1/orders/un-auth-create-orders',
            method: 'POST',
            headers: baseHeader
        },
        getById: {
            path: 'v1/orders/client-get-orders',
            method: 'GET',
            headers: baseHeader
        },
        cancel: {
            path: 'v1/orders/client-cancel-orders',
            method: 'PUT',
            headers: baseHeader
        },
    },
    news: {
        getNewsListClient: {
            path: '/v1/news/client-list-news',
            method: 'GET',
            headers: baseHeader
        },
        getNewsByIdClient: {
            path: '/v1/news/client-news-detail',
            method: 'GET',
            headers: baseHeader
        }
    },
    settings: {
        getSettingsListClient: {
            path: '/v1/settings/client-list',
            method: 'GET',
            headers: baseHeader
        }
    }
}

export default apiConfig
