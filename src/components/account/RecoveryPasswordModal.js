import React from 'react'
import BasicModal from '..//common/modal/BasicModal'
import RecoveryPasswordForm from './RecoveryPasswordForm'

function RecoveryPasswordModal({
    idHash,
    setShow,
    onSubmit,
    isModalLoading,
}) {
    return (
        <BasicModal
            className="recoveryPassword-modal"
            title="Thay đổi mật khẩu"
            visible={true}
            onOk={onSubmit}
            onCancel={() => {
                setShow(-1)
            }}
            width={500}
            formId="recoveryPassword-form"
            centered
            saveButtonName="Gửi"
            loading={isModalLoading}
        >
            <RecoveryPasswordForm
            formId="recoveryPassword-form"
            loadingSave={isModalLoading}
            />
        </BasicModal>
    )
}

export default RecoveryPasswordModal
