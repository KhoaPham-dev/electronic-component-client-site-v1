import React from 'react'
import BasicModal from '../common/modal/BasicModal'
import RequestForgotPasswordForm from './RequestForgotPasswordForm'
import { RECOVERY_MODAL } from '../../constants/masterData'

function RequestForgotPasswordModal({
    setShow,
    onSubmit,
    isModalLoading,
}) {
    return (
        <BasicModal
            className="recoveryPassword-modal"
            title="Yêu cầu đặt lại mật khẩu"
            visible={true}
            onOk={onSubmit}
            onCancel={() => {
                setShow(-1)
            }}
            width={500}
            formId="request-forgot-password-form"
            centered
            saveButtonName="Gửi"
            loading={isModalLoading}
        >
            <RequestForgotPasswordForm
            loadingSave={isModalLoading}
            formId="request-forgot-password-form"
            />
        </BasicModal>
    )
}

export default RequestForgotPasswordModal
