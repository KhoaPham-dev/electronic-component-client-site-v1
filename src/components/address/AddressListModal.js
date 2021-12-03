import React from 'react'
import { Button } from 'antd'
import BasicModal from '../common/modal/BasicModal'
import AddressListForm from './AddressListForm'
import AddressDetailContainer from '../../containers/address/AddressDetailContainer'


function AddressListModal({
    setShow,
    addressList,
    showDetailModal,
    isEditing,
    setShowDetailModal,
    addressDetail,
    handleEditAddress,
    handleDeleteAddress,
    handleAddAddress,
}) {

    return (<>
        <BasicModal
            className="address-modal"
            title="Danh sách địa chỉ"
            visible={true}
            onCancel={() => {
                setShow(false)
            }}
            formId="address-form"
            centered
            onOk={handleAddAddress}
            customOkButton={
                <Button
                className="modal-btn-save"
                type="primary"
                onClick={handleAddAddress}
                >
                    Thêm mới
                </Button>
            }
        >
            <AddressListForm
            addressList={addressList}
            handleEditAddress={handleEditAddress}
            handleDeleteAddress={handleDeleteAddress}
            />
        </BasicModal>
        {
            showDetailModal ? (
                <AddressDetailContainer
                addressDetail={addressDetail}
                isEditing={isEditing}
                setShowDetailModal={setShowDetailModal}
                />
            ) : null
        }
        </>
    )
}

export default AddressListModal
