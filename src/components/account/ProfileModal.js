import React from 'react'

import BasicModal from '../common/modal/BasicModal'
import ProfileForm from './ProfileForm'

function ProfileModal({
    isModalLoading,
    setShow,
    onSubmit,
    profileData,
    uploadFile,
}) {
    return (
        <BasicModal
            className="profile-modal"
            title="Hồ sơ"
            visible={true}
            loading={isModalLoading}
            onOk={onSubmit}
            onCancel={() => {
                setShow(-1)
            }}
            formId="profile-form"
            saveButtonName="Lưu"
            centered
            maskClosable
        >
            <ProfileForm
                loadingSave={isModalLoading}
                profileData={profileData}
                uploadFile={uploadFile}
            />
        </BasicModal>
    )
}

export default ProfileModal
