import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { actions } from '../../actions'
import { RECOVERY_MODAL } from '../../constants/masterData'
import { showErrorMessage } from '../../services/notifyService'
import RequestFogotPasswordModal from '../../components/account/RequestForgotPasswordModal'

function RequestForgotPasswordContainer({
    setShow,
    setIdHash,
}) {
    const dispatch = useDispatch()
    const [isModalLoading, setIsModalLoading] = useState(false)
    const onSubmit = (formValues) => {
        setIsModalLoading(true)
        dispatch(actions.requestForgotPassword({
            params: {
                ...formValues
            },
            onCompleted: (responseData) => {
                setIsModalLoading(false)
                setIdHash(responseData.idHash)
                setShow(RECOVERY_MODAL)
            },
            onError: (err) => {
                setIsModalLoading(false)
                showErrorMessage("Đã xảy ra lỗi, vui lòng thử lại!")
            }
        }))
    }

    return (
        <RequestFogotPasswordModal
            isModalLoading={isModalLoading}
            setShow={setShow}
            onSubmit={onSubmit}
        />
    )
}

export default RequestForgotPasswordContainer
