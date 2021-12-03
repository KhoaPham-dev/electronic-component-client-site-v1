import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { actions } from '../../actions'
import AddressDetailModal from '../../components/address/AddressDetailModal'
import { PROVINCE_KIND_COMMUNE, PROVINCE_KIND_DISTRICT, PROVINCE_KIND_PROVINCE } from '../../constants/masterData'
import { userDataSelector } from '../../selectors/account'
import { provinceSelector } from '../../selectors/province'
import { showErrorMessage, showSuccessMessage } from '../../services/notifyService'

function AddressDetailContainer({
    isEditing,
    setShowDetailModal,
    addressDetail,
}) {
    const dispatch = useDispatch()
    const provinceData = useSelector(provinceSelector)
    const [isModalLoading, setIsModalLoading] = useState(false)
    const userData = useSelector(userDataSelector)

    const onSubmit = (formValues) => {
            if(isEditing) {
                handleUpdateAddress(formValues)
            }
            else {
                handleAddAddress(formValues)
            }
    }

    const fetchAddressList = () => {
        dispatch(actions.getAddressList({}))
    }

    const handleUpdateAddress = (updatingAddress) => {
        setIsModalLoading(true)
        dispatch(actions.updateAddress({
            params: {
                id: addressDetail.id,
                ...updatingAddress,
            },
            onCompleted: () => {
                setIsModalLoading(false)
                setShowDetailModal(false)
                fetchAddressList()
                showSuccessMessage("Cập nhật địa chỉ thành công")
            },
            onError: () => {
                setIsModalLoading(false)
                showErrorMessage("Cập nhật thất bại, vui lòng thử lại!")
            }
        }))
    }

    const handleAddAddress = (newAddress) => {
        setIsModalLoading(true)
        dispatch(actions.createAddress({
            params: {
                customerId: userData?.id,
                ...newAddress,
            },
            onCompleted: () => {
                setIsModalLoading(false)
                setShowDetailModal(false)
                fetchAddressList()
                showSuccessMessage("Tạo mới địa chỉ thành công")
            },
            onError: () => {
                setIsModalLoading(false)
                showErrorMessage("Tạo mới địa chỉ thất bại, vui lòng thử lại!")
            }
        }))
    }

    const fetchProvince = (kind, parentId, noLoading) => {
        dispatch(actions.getProvinceAutoComplete({
            params: {
                kind,
                parentId,
            },
            noLoading,
        }))
    }

    useEffect(() => {
        fetchProvince(PROVINCE_KIND_PROVINCE)
        if(isEditing) {
            fetchProvince(PROVINCE_KIND_DISTRICT, addressDetail.provinceDto.id, true)
            fetchProvince(PROVINCE_KIND_COMMUNE, addressDetail.districtDto.id, true)
        }
    }, [])

    return (
        <AddressDetailModal
        isEditing={isEditing}
        dataDetail={addressDetail}
        isModalLoading={isModalLoading}
        provinceData={provinceData}
        setShowDetailModal={setShowDetailModal}
        onSubmit={onSubmit}
        fetchProvince={fetchProvince}
        />
    )
}

export default AddressDetailContainer
