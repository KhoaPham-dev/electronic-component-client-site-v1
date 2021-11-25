import React from 'react'
import BasicForm from '../common/entryForm/BasicForm'
import TextField from '../common/entryForm/TextField'
import DropdownField from '../common/entryForm/DropdownField'
import DatePickerField from '../common/entryForm/DatePickerField'
import { Form, Button, Col, Row, Divider } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { genders } from '../../constants/masterData'
import { AppConstants, AREA_KIND, UploadFileTypes } from '../../constants'
import { showErrorMessage } from '../../services/notifyService'
import CropImageFiled from '../common/entryForm/CropImageFiled'
import Utils from '../../utils'

const FormItem = Form.Item

class RegisterForm extends BasicForm {
    constructor(props) {
        super(props)
        this.state = {
            avatar: props.dataDetail.avatarPath
                ? `${AppConstants.contentRootUrl}${props.dataDetail.avatarPath}`
                : '',
            avatarUploading: false,
        }
    }

    getInitialFormValues = () => {
        const { isEditing, dataDetail } = this.props
        if (!isEditing) {
            return {}
        }
        return dataDetail
    }

    validateToConfirmPassword = (rule, value) => {
        const {
            current: { validateFields, isFieldTouched },
        } = this.formRef
        isFieldTouched('confirmPassword') &&
            validateFields(['confirmPassword'], { force: true })
        return Promise.resolve()
    }

    compareToPassword = (rule, newPassword) => {
        const password = this.getFieldValue('password')
        if ((password || newPassword) && password !== newPassword) {
            return Promise.reject('Xác nhận mật khẩu không đúng!')
        } else {
            return Promise.resolve()
        }
    }

    handleChangeAvatar = info => {
        if (info.file.status === 'done') {
            Utils.getBase64(info.file.originFileObj, avatar =>
                this.setState({ avatar })
            )
        }
    }

    uploadFileAvatar = (file, onSuccess) => {
        const { uploadFile } = this.props
        this.setState({ avatarUploading: true })
        uploadFile({
            params: { fileObjects: { file }, type: UploadFileTypes.AVATAR },
            onCompleted: result => {
                this.setFieldValue('avatarPath', result.data.filePath)
                this.setState({ avatarUploading: false })
                onSuccess()
            },
            onError: err => {
                if (err && err.message) {
                    showErrorMessage(err.message)
                    this.setState({ avatarUploading: false })
                }
            },
        })
    }

    handleAreaChange =
        (field, resetFields = [], kind) =>
        value => {
            this.props.fetchAreasByParentId(kind, value)
            this.setFieldValue(field, value)
            for (let f of resetFields) {
                this.setFieldValue(f, '')
            }
        }

    updatePasswordRequire = fields => (rule, value) => {
        const required = fields.some(field => !!this.getFieldValue(field))

        if (!value && !required) {
            for (let f of fields) {
                this.formRef.current.setFields([
                    {
                        name: f,
                        errors: [],
                    },
                ])
            }
        }

        return required && !value
            ? Promise.reject('Trường này không được để trống')
            : Promise.resolve()
    }

    requiredMatchConfirmPassword = (rule, value) => {
        const newPassword = this.getFieldValue('newPassword')

        return newPassword && value && newPassword !== value
            ? Promise.reject('Xác nhận mật khẩu không đúng')
            : Promise.resolve()
    }

    render() {
        const {
            isEditing,
            formId,
            loadingProvince,
            loadingDistrict,
            loadingWard,
            provinces,
            districts,
            wards,
        } = this.props

        const { avatarUploading, avatar } = this.state

        return (
            <Form
                id={formId}
                ref={this.formRef}
                layout="vertical"
                onFinish={this.handleSubmit}
                initialValues={this.getInitialFormValues()}
            >
                <Row gutter={24}>
                    <Col xs={24}>
                        <CropImageFiled
                            fieldName="avatarPath"
                            loading={avatarUploading}
                            label="Ảnh đại diện"
                            imageUrl={avatar}
                            onChange={this.handleChangeAvatar}
                            uploadFile={this.uploadFileAvatar}
                        />
                    </Col>
                    {[
                        {
                            fieldName: 'username',
                            label: 'Tên đăng nhập',
                            required: true,
                            disabled: isEditing,
                        },
                        {
                            fieldName: 'email',
                            label: 'Email',
                            required: true,
                            type: 'email',
                            disabled: isEditing,
                        },
                        !isEditing && {
                            fieldName: 'password',
                            label: 'Mật khẩu',
                            required: true,
                            type: 'password',
                            // validators: [this.validateToConfirmPassword],
                        },
                        !isEditing && {
                            fieldName: 'confirmPassword',
                            label: 'Xác nhận mật khẩu',
                            required: true,
                            type: 'password',
                            validators: [this.compareToPassword],
                        },
                        {
                            fieldName: 'fullName',
                            label: 'Họ và tên',
                            required: true,
                        },
                        {
                            fieldName: 'phone',
                            label: 'Số điện thoại',
                            required: true,
                            type: 'number',
                        },
                        {
                            fieldName: 'sex',
                            label: 'Giới tính',
                            component: DropdownField,
                            options: genders,
                        },
                        // {
                        //     fieldName: 'lang',
                        //     label: 'lang',
                        //     required: true,
                        // },
                        {
                            fieldName: 'birthday',
                            label: 'Ngày sinh',
                            component: DatePickerField,
                            width: '100%',
                        },
                        {
                            fieldName: 'provinceId',
                            label: 'Tỉnh thành',
                            component: DropdownField,
                            optionValue: 'provinceId',
                            optionLabel: 'provinceName',
                            options: provinces,
                            loading: loadingProvince,
                            onChange: this.handleAreaChange(
                                'provinceId',
                                ['districtId', 'wardId'],
                                AREA_KIND.DISTRICT
                            ),
                            required: true,
                        },
                        {
                            fieldName: 'districtId',
                            label: 'Quận',
                            component: DropdownField,
                            optionValue: 'provinceId',
                            optionLabel: 'provinceName',
                            options: districts,
                            loading: loadingDistrict,
                            onChange: this.handleAreaChange(
                                'districtId',
                                ['wardId'],
                                AREA_KIND.WARD
                            ),
                            required: true,
                        },
                        {
                            fieldName: 'wardId',
                            label: 'Phường',
                            component: DropdownField,
                            optionValue: 'provinceId',
                            optionLabel: 'provinceName',
                            options: wards,
                            loading: loadingWard,
                            required: true,
                        },
                        {
                            fieldName: 'address',
                            label: 'Địa chỉ',
                            type: 'textarea',
                        },
                        isEditing && {
                            type: 'separate',
                        },
                        isEditing && {
                            fieldName: 'oldPassword',
                            label: 'Mật khẩu cũ',
                            type: 'password',
                            validators: [
                                this.updatePasswordRequire([
                                    'newPassword',
                                    'newPasswordConfirm',
                                ]),
                            ],
                        },
                        isEditing && {
                            fieldName: 'newPassword',
                            label: 'Mật khẩu mới',
                            type: 'password',
                            validators: [
                                this.updatePasswordRequire([
                                    'oldPassword',
                                    'newPasswordConfirm',
                                ]),
                            ],
                        },
                        isEditing && {
                            fieldName: 'newPasswordConfirm',
                            label: 'Xác nhận mật khẩu mới',
                            type: 'password',
                            validators: [
                                this.updatePasswordRequire([
                                    'oldPassword',
                                    'newPassword',
                                ]),
                                this.requiredMatchConfirmPassword,
                            ],
                        },
                    ]
                        .filter(Boolean)
                        .map(field => {
                            const Comp = field.component || TextField
                            if (field.type === 'separate') {
                                return (
                                    <Col xs={24}>
                                        <Divider />
                                    </Col>
                                )
                            }

                            return (
                                <Col xs={24} lg={12} xl={8}>
                                    <Comp
                                        {...field}
                                        fieldTitle={field.label}
                                        size="large"
                                    />
                                </Col>
                            )
                        })}
                </Row>
                <FormItem className="text-right">
                    <Button
                        type="primary"
                        htmlType="submit"
                        size="large"
                        className="login-form-button"
                    >
                        {isEditing ? 'Cập nhật' : 'Đăng ký'}
                    </Button>
                </FormItem>
            </Form>
        )
    }
}

export default RegisterForm
