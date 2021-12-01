import React from 'react'

import BasicModal from '../common/modal/BasicModal'
import RegisterForm from './RegisterForm'

function RegisterModal({
    provinceData,
    isModalLoading,
    setShow,
    onSubmit,
    fetchProvince,
}) {
    return (
        <BasicModal
            className="register-modal"
            title="Đăng ký"
            visible={true}
            loading={isModalLoading}
            onOk={onSubmit}
            onCancel={() => {
                setShow(-1)
            }}
            formId="register-form"
            saveButtonName="Đăng ký"
            centered
            maskClosable
        >
            <RegisterForm
                fetchProvince={fetchProvince}
                provinceData={provinceData}
                loadingSave={isModalLoading}
            />
        </BasicModal>
    )
}

export default RegisterModal
