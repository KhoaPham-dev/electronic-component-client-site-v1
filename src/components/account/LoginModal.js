import React from 'react'
import { Button } from 'antd';

import BasicModal from '../../components/common/modal/BasicModal'

function LoginModal({
    isModalLoading,
    setShow,
    onSubmit,
    logoPath,
}) {
    return (<>
        <BasicModal
            className="login-modal"
            title="Đăng nhập"
            visible={true}
            loading={isModalLoading}
            onOk={onSubmit}
            onCancel={() => setShow(-1)}
            maskClosable
            customOkButton={<div>
                {/* <Button className="modal-btn-save" key="submit" htmlType="submit" type="primary" loading={isModalLoading} form="login-form">
                   {t("login.saveButtonName")}
                </Button>
                <div className="options">
                    <div className="forgot-password" onClick={() => {
                        setShowRequestForgotPasswordModal(true)
                    }}>
                        {t("login.forgotPassword")}
                    </div>
                    <div className="register" onClick={() => {
                        setShowModal(REGISTER_MODAL)
                    }}>
                        {t("login.register")}
                    </div>
                </div> */}
                </div>
            }
            width={500}
            formId="login-form"
            centered
        >
            {/* <LoginForm
                t={t}
                loadingSave={isModalLoading}
                logoPath={logoPath}
            /> */}
            <div>hello</div>
        </BasicModal>
    </>)
}

export default LoginModal
