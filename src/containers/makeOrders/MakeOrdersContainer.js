import React, { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import { actions } from '../../actions'
import MakeOrdersPage from '../../components/makeOrders/MakeOrdersPage'
import { PROVINCE_KIND_COMMUNE, PROVINCE_KIND_DISTRICT, PROVINCE_KIND_PROVINCE } from '../../constants/masterData'
import sitePathConfig from '../../constants/sitePathConfig'
import { isAuthentication } from '../../selectors/account'
import { addressDataSelector } from '../../selectors/address'
import { itemsCartSelector } from '../../selectors/cart'
import { provinceSelector } from '../../selectors/province'
import { showErrorMessage, showSuccessMessage } from '../../services/notifyService'

function MakeOrdersContainer({
    changeBreadcrumb,
}) {

    const breadcrumbs = [{name: "Đặt hàng"}]
    const formId = "make-order-form"
    const formRef = useRef()
    const dispatch = useDispatch()
    const history = useHistory()
    const addressData = useSelector(addressDataSelector)?.data
    const selectedItems = useSelector(itemsCartSelector)
    const provinceData = useSelector(provinceSelector)
    const isAuth = useSelector(isAuthentication)
    const [ isAllRequiredFieldsValidated, setIsAllRequiredFieldsValidated] = useState(false)
    const [isFormLoading, setIsFormLoading] = useState(false)

    const fetchAddressList = () => {
        dispatch(actions.getAddressList({}))
    }

    const getOrderDetailsList = () => {
        return selectedItems.map(item => {
            return {
                amount: item.quantity,
                note: item.note,
                productId: item.id,
            }
        })
    }

    const handleSubmit = (formValues) => {
        setIsFormLoading(true)
        dispatch(actions.createOrders({
            params: {
                ordersAddress: `${formValues.address}, ${getProvinceNameById(PROVINCE_KIND_COMMUNE, formValues.communeId)}, ${getProvinceNameById(PROVINCE_KIND_DISTRICT, formValues.districtId)}, ${getProvinceNameById(PROVINCE_KIND_PROVINCE, formValues.provinceId)}`,
                paymentMethod: formValues.paymentMethod,
                receiverName: formValues.receiverName,
                receiverPhone: formValues.receiverPhone,
                ordersDetailDtos: getOrderDetailsList(),
            },
            onCompleted: (data) => {
                setIsFormLoading(false)
                dispatch(actions.setItemsCart({
                    itemsCart: []
                }))
                showSuccessMessage("Đơn hàng đã được đặt thành công!")
                setTimeout(() => {
                    history.push(`${sitePathConfig.ordersDetail.path}?ordersId=${data.id}`)
                }, 750)
            },
            onError: () => {
                setIsFormLoading(false)
                showErrorMessage("Tạo đơn hàng thất bại, vui lòng thử lại!")
            }
        }))
    }

    const getAddressOptions = () => {
        return !!addressData && addressData.map(address => {
            const fullpath = `${address.address}, ${address.communeDto.provinceName}, ${address.districtDto.provinceName}, ${address.provinceDto.provinceName}`
            return {
                value: address.id,
                label: fullpath,
            }
        })
    }

    const handleChangeAddress = (value) => {
        if(!value) return
        const selectedAddress = addressData.find(a => a.id === value)
        formRef.current.setFieldsValue({
            provinceId: selectedAddress.provinceDto.id,
            districtId: selectedAddress.districtDto.id,
            communeId: selectedAddress.communeDto.id,
            address: selectedAddress.address,
            receiverName: selectedAddress.name,
            receiverPhone: selectedAddress.phone,
        })
        fetchProvince(PROVINCE_KIND_DISTRICT, selectedAddress.provinceDto.id)
        fetchProvince(PROVINCE_KIND_COMMUNE, selectedAddress.districtDto.id)
        setIsAllRequiredFieldsValidated(true)
    }

    const handleChangeIsAllRequiredFieldsValidated = () => {
        setIsAllRequiredFieldsValidated(!Object.values(formRef.current?.getFieldsValue("provinceName, districtName, communeName, address, receiverName, receiverPhone") || {})
                    .some(field => !field))
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

    const handleProvinceChange = (parentId) => {
        fetchProvince(PROVINCE_KIND_DISTRICT, parentId, true)
        setFieldValue("districtId", undefined);
        setFieldValue("communeId", undefined);
    }

    const handleDistrictChange = (parentId) => {
        fetchProvince(PROVINCE_KIND_COMMUNE, parentId, true)
        setFieldValue("communeId", undefined);
    }

    const mappingComboboxListToOptions = (comboboxData) => {
        return comboboxData && comboboxData.map(c=>({
              value: c.id,
              label: c.provinceName,
        })) || [];
    }

    const getFieldValue = (fieldName) => {
        if(formRef.current)
            return formRef.current.getFieldValue(fieldName);
        return '';
    }

    const setFieldValue = (fieldName, value) => {
        formRef.current.setFieldsValue({[fieldName]: value});
    }

    const getProvinceNameById = (provinceKind, provinceId) => {
        return provinceData && provinceData[provinceKind].find(province => province.id === provinceId).provinceName
    }

    useEffect(() => {
        changeBreadcrumb(breadcrumbs)
        if(!selectedItems || selectedItems.length <= 0) {
            history.push(sitePathConfig.homePage.path)
            return
        }
        fetchProvince(PROVINCE_KIND_PROVINCE)
    }, [])

    useEffect(() => {
          if(isAuth) {
            fetchAddressList()
          }
      }, [isAuth])

    return (
        <MakeOrdersPage
        addressOptions={getAddressOptions() || []}
        formRef={formRef}
        formId={formId}
        isAllRequiredFieldsValidated={isAllRequiredFieldsValidated}
        provinceData={provinceData || []}
        selectedItems={selectedItems || []}
        isAuth={isAuth}
        isFormLoading={isFormLoading}
        setIsAllRequiredFieldsValidated={handleChangeIsAllRequiredFieldsValidated}
        handleSubmit={handleSubmit}
        handleChangeAddress={handleChangeAddress}
        mappingComboboxListToOptions={mappingComboboxListToOptions}
        handleProvinceChange={handleProvinceChange}
        getFieldValue={getFieldValue}
        handleDistrictChange={handleDistrictChange}
        />
    )
}

export default MakeOrdersContainer