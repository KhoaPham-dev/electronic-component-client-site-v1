import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { actions } from '../../actions'
import LoginModal from '../../components/account/LoginModal'
import { showErrorMessage, showSuccessMessage } from '../../services/notifyService'

function LoginContainer({
    setShow
}) {
    const dispatch = useDispatch()
    const [isModalLoading, setIsModalLoading] = useState(false)

    const onSubmit = (formValues) => {
        setIsModalLoading(true)
        dispatch(actions.login({
            params: {
                ...formValues,
            },
            onCompleted: (responseData) => {
                setIsModalLoading(false)
                setShow(-1)
                showSuccessMessage("Đăng nhập thành công")
            },
            onError: () => {
                setIsModalLoading(false)
                showErrorMessage("Đăng nhập thất bại, vui lòng thử lại!")
            }
        }))
    }


    return (
        <LoginModal
        setShow={setShow}
        isModalLoading={isModalLoading}
        onSubmit={onSubmit}
        />
    )
}

export default LoginContainer
