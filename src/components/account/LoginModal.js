import React from 'react'
import { Button } from 'antd';

import BasicModal from '../../components/common/modal/BasicModal'
import LoginForm from './LoginForm';
import { REGISTER_MODAL, REQUEST_RECOVERY_MODAL } from '../../constants/masterData'

function LoginModal({
    isModalLoading,
    setShow,
    onSubmit,
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
                <Button className="modal-btn-save" key="submit" htmlType="submit" type="primary" loading={isModalLoading} form="login-form">
                   Đăng nhập
                </Button>
                <div className="options">
                    <div className="forgot-password" onClick={() => {
                        setShow(REQUEST_RECOVERY_MODAL)
                    }}>
                        Quên mật khẩu?
                    </div>
                    <div className="register" onClick={() => {
                        setShow(REGISTER_MODAL)
                    }}>
                        Đăng ký
                    </div>
                </div>
            </div>
            }
            width={500}
            formId="login-form"
            centered
        >
            <LoginForm
                loadingSave={isModalLoading}
            />
        </BasicModal>
    </>)
}

export default LoginModal
