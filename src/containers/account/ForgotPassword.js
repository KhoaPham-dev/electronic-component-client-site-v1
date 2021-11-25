import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import qs from 'query-string'
import { useHistory } from 'react-router'
import { accountActions } from '../../actions/account'
import sitePathConfig from '../../constants/sitePathConfig'
import RequestForgotPasswordForm from '../../components/account/RequestForgotPasswordForm'
import ChangePasswordForm from '../../components/account/ChangePasswordForm'

import {
    showSuccessMessage,
    showErrorMessage,
} from '../../services/notifyService'
import { message } from 'antd'

const ForgotPassword = () => {
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const history = useHistory()

    const { hash } = qs.parse(history.location.search)

    const onSubmitRequest = valueForm => {
        setLoading(true)
        dispatch(
            accountActions.requestForgotPassword({
                params: valueForm,
                onError: error => {
                    setLoading(false)
                    showErrorMessage(
                        error?.message ||
                            'Yêu cầu thay đổi mật khẩu không thành công!'
                    )
                },
                onCompleted: ({ data }) => {
                    setLoading(false)
                    history.push({
                        pathname: history.location.pathname,
                        search: qs.stringify({
                            hash: data.idHash,
                        }),
                    })
                },
            })
        )
    }

    const onSubmitChange = valueForm => {
        setLoading(true)
        const params = {
            ...valueForm,
            idHash: hash,
        }
        delete params.newPasswordConfirm
        dispatch(
            accountActions.changePassword({
                params,
                onError: error => {
                    setLoading(false)
                    showErrorMessage(
                        error?.message || 'Thay đổi mật khẩu không thành công!'
                    )
                },
                onCompleted: ({ data, message }) => {
                    showSuccessMessage(
                        message || 'Thay đổi mật khẩu thành công!'
                    )
                    history.push(sitePathConfig.login.path)
                },
            })
        )
    }

    return (
        <div className="forgot-password-container">
            <h1 className="page-title text-center">
                {hash ? 'Mật khẩu mới' : 'Quên mật khẩu'}
            </h1>
            {hash ? (
                <ChangePasswordForm
                    loading={loading}
                    onSubmitChange={onSubmitChange}
                />
            ) : (
                <RequestForgotPasswordForm
                    loading={loading}
                    onSubmitRequest={onSubmitRequest}
                />
            )}
        </div>
    )
}

export default ForgotPassword
