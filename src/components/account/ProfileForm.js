import React from "react";
import { Form, Col, Row } from "antd";

import BasicForm from "../common/entryForm/BasicForm";

import TextField from "../common/entryForm/TextField";
import DropdownField from "../common/entryForm/DropdownField";
import FieldSet from "../common/elements/FieldSet";
import { genders, PROVINCE_KIND_COMMUNE, PROVINCE_KIND_DISTRICT, PROVINCE_KIND_PROVINCE  } from "../../constants/masterData";
import BasicModal from "../common/modal/BasicModal";
import CropImageFiled from "../common/entryForm/CropImageFiled";
import Utils from '../../utils';
import { UploadFileTypes, AppConstants } from '../../constants/index'
import { showErrorMessage } from "../../services/notifyService";
import { convertStringToDateTime } from "../../utils/datetimeHelper";
import DatePickerField from "../common/entryForm/DatePickerField";

class ProfileForm extends BasicForm {
    constructor(props) {
        super(props);
        this.state = {
            avatar: props.profileData.customerAvatarPath
                ? `${AppConstants.contentRootUrl}/${props.profileData.customerAvatarPath }`
                : "",
            uploading: false,
        };
    }

    handleChangeAvatar = (info) => {
        if (info.file.status === "done") {
        Utils.getBase64(info.file.originFileObj, (avatar) =>
            this.setState({ avatar })
        );
        }
    };

    uploadFileAvatar = (file, onSuccess) => {
        const { uploadFile } = this.props;
        this.setState({ uploading: true });
        uploadFile({
        params: { fileObjects: { file }, type: UploadFileTypes.AVATAR },
        onCompleted: (result) => {
            this.setFieldValue("customerAvatarPath", result.data.filePath);
            this.setState({ uploading: false });
            onSuccess();
        },
        onError: (err) => {
            if (err && err.message) {
            showErrorMessage(err.message);
            this.setState({ uploading: false });
            }
        },
        });
    };

    getInitialFormValues = () => {
        const { isEditing, profileData } = this.props;
        return {
            customerAvatarPath: profileData.customerAvatarPath,
            customerEmail: profileData.customerEmail,
            customerFullName: profileData.customerFullName,
            customerPhone: profileData.customerPhone,
            sex: profileData.sex,
            birthday: convertStringToDateTime(profileData.birthday, 'DD/MM/YYYY HH:mm:ss', 'DD/MM/YYYY')
        };
    };

    onChangeDateBDate = (value) => {
        const Date = this.getFieldValue('birthday');
        if(Date) {
            this.setFieldValue('birthday', value);
        }
    }

    compareToPassword = (rule, password) => {
        const newPassword = this.getFieldValue("customerPassword");
        if ((password || newPassword) && password !== newPassword) {
          return Promise.reject("Mật khẩu không khớp");
        } else {
          return Promise.resolve();
        }
    };

	render() {
		const {
            formId,
            loadingSave,
            profileData,
        } = this.props;
        const { uploading, avatar } = this.state;
		return (
            <Form
                id={formId}
                ref={this.formRef}
                layout="vertical"
                onFinish={this.handleSubmit}
                initialValues={this.getInitialFormValues()}
            >
                <Row gutter={16}>
                    <Col span={12}>
                        <CropImageFiled
                            fieldName="customerAvatarPath"
                            loading={uploading}
                            label="Ảnh đại diện"
                            imageUrl={avatar}
                            onChange={this.handleChangeAvatar}
                            uploadFile={this.uploadFileAvatar}
                            disabled={loadingSave}
                        />
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <TextField
                            type="number"
                            fieldName="customerPhone"
                            label="Số điện thoại"
                            required
                            minLength={0}
                            width="100%"
                            disabled
                        />
                    </Col>
                    <Col span={12}>
                        <TextField
                            fieldName="customerFullName"
                            label="Họ và tên"
                            required
                            disabled={loadingSave}
                        />
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <TextField
                            autoComplete="off"
                            type="email"
                            fieldName="customerEmail"
                            label="Email"
                            disabled={loadingSave}
                        />
                    </Col>
                    <Col span={12}>
                        <DatePickerField
                        fieldName="birthday"
                        label="Ngày sinh"
                        width="100%"
                        onChange={this.onChangeDateBDate}
                        format={"DD/MM/YYYY"}
                        disabled={loadingSave}
                        placeholder="Chọn ngày sinh"
                        />
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <DropdownField
                            fieldName="sex"
                            label="Giới tính"
                            options={genders}
                            disabled={loadingSave}
                        />
                    </Col>
                </Row>
                <FieldSet title="Mật khẩu">
                    <Row gutter={16}>
                        <Col span={12}>
                            <TextField
                                autoComplete="off"
                                fieldName="oldPassword"
                                type="password"
                                label="Mật khẩu cũ"
                                required
                                disabled={loadingSave}
                                minLength={6}
                            />
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <TextField
                                type="password"
                                fieldName="customerPassword"
                                label="Mật khẩu mới"
                                minLength={6}
                                disabled={loadingSave}
                            />
                        </Col>
                        <Col span={12}>
                            <TextField
                                type="password"
                                fieldName="confirmCustomerPassword"
                                label="Xác nhận mật khẩu"
                                // minLength={6}
                                validators={[this.compareToPassword]}
                                disabled={loadingSave}
                            />
                        </Col>
                    </Row>
                </FieldSet>
            </Form>
		);
	}
}

export default ProfileForm;
