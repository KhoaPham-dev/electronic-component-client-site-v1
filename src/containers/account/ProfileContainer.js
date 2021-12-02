import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { userDataSelector } from '../../selectors/account'
import { actions } from '../../actions'
import ProfileModal from '../../components/account/ProfileModal'
import { convertDateTimeToString } from '../../utils/datetimeHelper'
import { StorageKeys } from '../../constants'
import { showErrorMessage, showSuccessMessage } from '../../services/notifyService'

function ProfileContainer({
    setShow
}) {
    const dispatch = useDispatch()
    const [isModalLoading, setIsModalLoading] = useState(false)
    const profileData = useSelector(userDataSelector)

    const onSubmit = (formValues) => {
        setIsModalLoading(true)
        dispatch(actions.updateProfile({
            params: {
                ...formValues,
                birthday: formValues.birthday ? convertDateTimeToString(formValues.birthday, 'DD/MM/YYYY HH:mm:ss') : undefined,
            },
            onCompleted: () => {
                fetchProfile({
                    onCompleted: (responseData) => {
                        setIsModalLoading(false)
                        showSuccessMessage("Cập nhật hồ sơ thành công!")
                    },
                })
                setIsModalLoading(false)
                setShow(-1)
            },
            onError: () => {
                setIsModalLoading(false)
                showErrorMessage("Cập nhật hồ sơ thất bại, vui lòng thử lại!")
            }
        }))
    }

    const handleUploadFile = (payload) => {
        dispatch(actions.uploadFile(payload))
    }

    const fetchProfile = (cb = {}) => {
        dispatch(actions.getProfile({
            ...cb
        }))
    }

    return (
        <ProfileModal
        isModalLoading={isModalLoading}
        setShow={setShow}
        profileData={profileData}
        onSubmit={onSubmit}
        uploadFile={handleUploadFile}
        />
    )
}

export default ProfileContainer
