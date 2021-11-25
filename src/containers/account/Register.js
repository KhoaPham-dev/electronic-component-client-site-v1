import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { actions } from '../../actions/account'
import { actions as areaActions } from '../../actions/area'
import { actions as appCommonActions } from '../../actions/appCommon'

import RegisterForm from '../../components/account/RegisterForm'
import { AREA_KIND } from '../../constants'
import { sitePathConfig } from '../../constants/sitePathConfig'
import { userDataSelector } from '../../selectors/account'
import { provincesSelector, areasSelector } from '../../selectors/area'
import {
    showErrorMessage,
    showSuccessMessage,
} from '../../services/notifyService'
import { ensureArray } from '../../utils/helper'
import {
    convertDateTimeToString,
    convertStringToDateTime,
} from '../../utils/datetimeHelper'
import qs from 'query-string'

const Register = ({ isEditing }) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const userData = useSelector(userDataSelector)
    const provinces = useSelector(provincesSelector)
    const areas = useSelector(areasSelector)
    const [loadingProvince, setLoadingProvince] = useState(false)
    const [loadingDistrict, setLoadingDistrict] = useState(false)
    const [loadingWard, setLoadingWard] = useState(false)
    const [provinceSelected, setProvinceSelected] = useState()
    const [districtSelected, setDistrictSelected] = useState()

    const prepareSubmitData = values => {
        const data = {
            ...values,
            birthday: `${convertDateTimeToString(values.birthday)} 00:00:00`,
        }

        isEditing && (data.id = userData.id)

        return data
    }

    const onSubmit = valueForm => {
        const params = prepareSubmitData(valueForm)
        if (isEditing) {
            dispatch(
                actions.updateProfile({
                    params,
                    onCompleted: ({ message }) => {
                        showSuccessMessage(
                            message || 'Cập nhật hồ sơ thành công'
                        )
                    },
                    onError: error => {
                        showErrorMessage(
                            error?.message ||
                                'Cập nhật hồ sơ không thành công, vui lòng thử lại'
                        )
                    },
                })
            )
        } else {
            dispatch(
                actions.register({
                    params,
                    onCompleted: ({ data, message }) => {
                        showSuccessMessage(
                            message ||
                                'Đăng ký tài khoản thành công, vui lòng xác thực tài khoản để có thể sử dụng tài khoản.'
                        )
                        history.push({
                            pathname: sitePathConfig.verifyAccount.path,
                            search: qs.stringify({
                                email: data.email,
                                id: data.id,
                            }),
                        })
                    },
                    onError: error => {
                        showErrorMessage(
                            error?.message ||
                                'Đăng ký không thành công, vui lòng thử lại'
                        )
                    },
                })
            )
        }
    }

    const getDataDetailsMapping = () => {
        return {
            ...userData,
            provinceId: userData.provinceDto?.provinceId,
            districtId: userData.districtDto?.provinceId,
            wardId: userData.wardDto?.provinceId,
            birthday: convertStringToDateTime(userData.birthday),
        }
    }

    const getAreasByParentId = parentId => {
        return ensureArray(areas[parentId])
    }

    const setAreaSelect = (parentId, kind) => {
        if (kind === AREA_KIND.DISTRICT) {
            setProvinceSelected(parentId)
            setDistrictSelected('')
        } else {
            setDistrictSelected(parentId)
        }
    }

    const fetchAreasByParentId = (kind, parentId, first) => {
        if (areas[parentId]) {
            return setAreaSelect(parentId, kind)
        }

        const fetchAction = first
            ? areaActions.getAreaFirst
            : areaActions.getArea

        const loadingAction =
            kind === AREA_KIND.DISTRICT ? setLoadingDistrict : setLoadingWard

        loadingAction(prev => prev + 1)
        dispatch(
            fetchAction({
                params: {
                    parentId,
                },
                onDone: () => {
                    loadingAction(prev => Math.max(prev - 1, 0))
                    setAreaSelect(parentId, kind)
                },
            })
        )
    }

    const uploadFile = payload => {
        dispatch(appCommonActions.uploadFile(payload))
    }

    useEffect(() => {
        if (provinces === null) {
            setLoadingProvince(true)
            dispatch(
                areaActions.getAreaFirst({
                    onDone: () => setLoadingProvince(false),
                })
            )
        }
    }, [])

    useEffect(() => {
        if (isEditing && userData) {
            userData.provinceDto?.provinceId &&
                fetchAreasByParentId(
                    AREA_KIND.DISTRICT,
                    userData.provinceDto?.provinceId,
                    true
                )
            userData.districtDto?.provinceId &&
                fetchAreasByParentId(
                    AREA_KIND.WARD,
                    userData.districtDto?.provinceId,
                    true
                )
        }
    }, [userData])

    return (
        <div className="register-container">
            <h1 className="page-title text-center">
                {isEditing ? 'Cập nhật hồ sơ' : 'Đăng ký'}
            </h1>
            <div className="register-content">
                <RegisterForm
                    formId="register-form"
                    dataDetail={getDataDetailsMapping()}
                    isEditing={isEditing}
                    onSubmit={onSubmit}
                    loadingProvince={loadingProvince}
                    loadingDistrict={loadingDistrict > 0}
                    loadingWard={loadingWard > 0}
                    getAreasByParentId={getAreasByParentId}
                    fetchAreasByParentId={fetchAreasByParentId}
                    provinces={ensureArray(provinces)}
                    districts={ensureArray(areas[provinceSelected])}
                    wards={ensureArray(areas[districtSelected])}
                    uploadFile={uploadFile}
                />
            </div>
        </div>
    )
}

export default Register
