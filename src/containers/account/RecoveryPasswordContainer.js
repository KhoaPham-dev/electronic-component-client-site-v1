import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import RecoveryPasswordModal from '../../components/account/RecoveryPasswordModal'
import { actions } from '../../actions'
import { showErrorMessage, showSuccessMessage } from '../../services/notifyService'

function RecoveryPasswordContainer({
    idHash,
    setShow,
}) {
    const dispatch = useDispatch()
    const [isModalLoading, setIsModalLoading] = useState(false)
    const onSubmit = (formValues) => {
        setIsModalLoading(true)
        dispatch(actions.changePassword({
            params: {
                idHash,
                ...formValues,
            },
            onCompleted: (responseData) => {
                setShow(-1)
                showSuccessMessage("Đổi mật khẩu thành công")
                setIsModalLoading(false)
            },
            onError: (err) => {
                showErrorMessage("Đã xảy ra lỗi, vui lòng thử lại!")
                setIsModalLoading(false)
            }
        }))
    }

    return (
        <RecoveryPasswordModal
        idHash={idHash}
        setShow={setShow}
        onSubmit={onSubmit}
        isModalLoading={isModalLoading}
        />
    )
}

export default RecoveryPasswordContainer
