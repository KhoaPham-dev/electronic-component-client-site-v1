import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import qs from 'query-string'
import sitePathConfig from '../../constants/sitePathConfig'

import VerifyForm from '../../components/account/VerifyForm'
import { Alert } from 'antd'
import { accountActions } from '../../actions/account'
import {
    showErrorMessage,
    showSuccessMessage,
} from '../../services/notifyService'

const VerifyAccount = () => {
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const history = useHistory()

    const { email, id } = qs.parse(history.location.search)

    const onVerify = valueForm => {
        setLoading(true)
        dispatch(
            accountActions.verifyAccount({
                params: {
                    ...valueForm,
                    id,
                },
                onError: error => {
                    setLoading(false)
                    showErrorMessage(
                        error.message ||
                            'Xác thực tài khoản không thành công, vui lòng thử lại!'
                    )
                },
                onCompleted: ({ message }) => {
                    showSuccessMessage(
                        message || 'Xác thực tài khoản thành công'
                    )
                    history.push(sitePathConfig.login.path)
                    setLoading(false)
                },
            })
        )
    }

    useEffect(() => {
        if (!email || !id) {
            history.push(sitePathConfig.homePage.path)
        }
    }, [])

    return (
        <div className="verify-container">
            <h1 className="text-center">Xác thực tài khoản</h1>
            <Alert
                message={
                    <>
                        Vui lòng kiểm tra email <b>{email}</b> để lấy mã xác
                        thực.
                    </>
                }
                type="info"
                className="mb-4"
            />
            <VerifyForm onVerify={onVerify} loading={loading} />
        </div>
    )
}

export default VerifyAccount
