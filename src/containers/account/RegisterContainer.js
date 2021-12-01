import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { actions } from '../../actions'

import { provinceSelector } from '../../selectors/province'
import { LOGIN_MODAL, PROVINCE_KIND_PROVINCE } from '../../constants/masterData'
import RegisterModal from '../../components/account/RegisterModal'
import { showErrorMessage, showSuccessMessage } from '../../services/notifyService'

function RegisterContainer({
    setShow
}) {
    const provinceData = useSelector(provinceSelector)
    const dispatch = useDispatch()
    const [isModalLoading, setIsModalLoading] = useState(false)
    const onSubmit = (formValues) => {
        setIsModalLoading(true)
        dispatch(actions.register({
            params: {
                ...formValues,
            },
            onCompleted: () => {
                setIsModalLoading(false)
                setShow(LOGIN_MODAL)
                showSuccessMessage("Đăng ký thành công")
            },
            onError: () => {
                setIsModalLoading(false)
                showErrorMessage("Đăng ký thất bại, vui lòng thử lại!")
            }
        }))
    }

    const fetchProvince = (kind, parentId) => {
        dispatch(actions.getProvinceAutoComplete({
            params: {
                kind,
                parentId,
            },
        }))
    }

    useEffect(() => {
        fetchProvince(PROVINCE_KIND_PROVINCE)
    }, [])

    return (
        <RegisterModal
        provinceData={provinceData || {}}
        isModalLoading={isModalLoading}
        setShow={setShow}
        onSubmit={onSubmit}
        fetchProvince={fetchProvince}
        />
    )
}

export default RegisterContainer
