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
            path: '/v1/file/upload',
            method: 'POST',
            headers: multipartFormHeader,
        },
    },
    account: {
        login: {
            path: '/v1/account/client-login',
            method: 'POST',
            headers: baseHeader,
        },
        logout: {
            path: '/v1/account/logout',
            method: 'GET',
            headers: baseHeader,
        },
        verifyAccount: {
            path: '/v1/account/verify_account',
            method: 'POST',
            headers: baseHeader,
        },
        requestForgotPassword: {
            path: '/v1/account/request_forget_password',
            method: 'POST',
            headers: baseHeader,
        },
        changePassword: {
            path: '/v1/account/forget_password',
            method: 'POST',
            headers: baseHeader,
        },
    },
    customer: {
        getProfile: {
            path: '/v1/customer/profile',
            method: 'GET',
            headers: baseHeader,
        },
        register: {
            path: '/v1/customer/register',
            method: 'POST',
            headers: baseHeader,
        },
        updateProfile: {
            path: '/v1/customer/update-profile',
            method: 'PUT',
            headers: baseHeader,
        },
    },
    area: {
        listCombobox: {
            path: '/v1/province/list_combobox',
            method: 'GET',
            headers: baseHeader,
        },
    },
    category: {
        getCategoryList: {
            path: '/v1/category/auto-complete',
            method: 'GET',
            headers: baseHeader
        }
    },
    product:  {
        getProductClientList: {
            path: '/v1/product/client-list',
            method: 'GET',
            headers: baseHeader
        }
    }
}

export default apiConfig
