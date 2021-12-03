import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Modal } from 'antd'
import { useHistory } from 'react-router'

import { addressDataSelector } from '../../selectors/address'
import { actions } from '../../actions'
import { showSuccessMessage, showErrorMessage } from '../../services/notifyService'
import AddressListModal from '../../components/address/AddressListModal'

const { confirm } = Modal
function AddressContainer({
    setShow,
}) {
    const dispatch = useDispatch()
    const history = useHistory()
    const addressData = useSelector(addressDataSelector) || {}
    const [addressDetail, setAddressDetail] = useState()
    const [isEditing, setIsEditing] = useState(false)
    const [showDetailModal, setShowDetailModal] = useState(false)

    const fetchAddressList = () => {
        dispatch(actions.getAddressList({
        }))
    }

    const handleEditAddress = (address) => {
        setAddressDetail(address)
        setIsEditing(true)
        setShowDetailModal(true)
    }

    const handleDeleteAddress = (address) => {
        confirm({
            title: "Xóa",
            content: "Bạn có chắc muốn xóa địa chỉ này?",
            okText: "Có",
            okType: 'danger',
            cancelText: "Không",
            centered: true,
            onOk: () => {
                dispatch(actions.deleteAddress({
                    params: {
                        id: address.id
                    },
                    onCompleted: () => {
                        fetchAddressList()
                        showSuccessMessage("Xóa địa chỉ thành công")
                    },
                    onError: () => {
                        showErrorMessage("Xóa địa chỉ thất bại, vui lòng thử lại!")
                    }
                }))
            },
            onCancel() {
              // console.log('Cancel');
            },
        });
    }

    const handleAddAddress = () => {
        setIsEditing(false)
        setShowDetailModal(true)
    }

    useEffect(() => {
        fetchAddressList()
    }, [])

    return (
        <AddressListModal
        addressList={addressData.data || []}
        showDetailModal={showDetailModal}
        isEditing={isEditing}
        addressDetail={addressDetail}
        setShow ={setShow }
        setShowDetailModal={(value) => {
            setShowDetailModal(value)
            !value && setAddressDetail(null)
        }}
        handleEditAddress={handleEditAddress}
        handleDeleteAddress={handleDeleteAddress}
        handleAddAddress={handleAddAddress}
        />
    )
}

export default AddressContainer
