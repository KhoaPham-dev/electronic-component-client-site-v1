import React from 'react'
import BasicModal from '../common/modal/BasicModal'
import AddressDetailForm from './AddressDetailForm'

function AddressDetailModal({
    isEditing,
    dataDetail,
    setShowDetailModal,
    onSubmit,
    provinceData,
    formId,
    isModalLoading,
    fetchProvince,
}) {
    return (
        <BasicModal
            className="address-detail-modal"
            title={isEditing ? "Chỉnh sửa địa chỉ" : "Thêm mới địa chỉ"}
            visible={true}
            onOk={onSubmit}
            onCancel={() => {
                setShowDetailModal(false)
            }}
            formId="address-detail-form"
            centered
            saveButtonName="Lưu"
            maskClosable
            loading={isModalLoading}
        >
            <AddressDetailForm
            dataDetail={dataDetail}
            isEditing={isEditing}
            loadingSave={isModalLoading}
            provinceData={provinceData || {}}
            formId="address-detail-form"
            fetchProvince={fetchProvince}
            />
        </BasicModal>
    )
}

export default AddressDetailModal
