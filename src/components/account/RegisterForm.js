import React from "react";
import { Form, Col, Row } from "antd";

import BasicForm from "../common/entryForm/BasicForm";

import TextField from "../common/entryForm/TextField";
import DropdownField from "../common/entryForm/DropdownField";
import FieldSet from "../common/elements/FieldSet";
import { PROVINCE_KIND_PROVINCE, PROVINCE_KIND_DISTRICT, PROVINCE_KIND_COMMUNE } from "../../constants/masterData";

class RegisterForm extends BasicForm {
    handleProvinceChange = (parentId) =>{
        const { fetchProvince } = this.props;
        fetchProvince(PROVINCE_KIND_DISTRICT, parentId)
        this.setFieldValue("districtId", undefined);
        this.setFieldValue("communeId", undefined);
    }

    handleDistrictChange = (parentId) =>{
        const { fetchProvince } = this.props;
        fetchProvince(PROVINCE_KIND_COMMUNE, parentId)
        this.setFieldValue("communeId", undefined);
    }

    mappingComboboxListToOptions(comboboxData) {
        return comboboxData && comboboxData.map(c=>({
              value: c.id,
              label: c.provinceName,
        })) || [];
    }

    compareToPassword = (rule, newPassword) => {
        const password = this.getFieldValue("customerPassword");
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
            provinceData,
        } = this.props;
		return (
            <Form
                id={formId}
                ref={this.formRef}
                layout="vertical"
                onFinish={this.handleSubmit}
            >
                <Row gutter={16}>
                    <Col span={12}>
                        <TextField
                            type="number"
                            fieldName="customerPhone"
                            label="Số điện thoại"
                            required
                            minLength={0}
                            width="100%"
                            disabled={loadingSave}
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
                            type="password"
                            fieldName="customerPassword"
                            label="Mật khẩu"
                            required
                            // validators={[this.validateToConfirmPassword]}
                            minLength={6}
                            disabled={loadingSave}
                        />
                    </Col>
                    <Col span={12}>
                        <TextField
                            fieldName="confirmPassword"
                            type="password"
                            label="Nhập lại mật khẩu"
                            required={this.getFieldValue("customerPassword")}
                            validators={[this.compareToPassword]}
                            disabled={loadingSave}
                        />
                    </Col>
                </Row>
                <FieldSet title="Địa chỉ">
                    <Row gutter={16}>
                        <Col span={12}>
                            <DropdownField
                            fieldName="provinceId"
                            label="Tỉnh/thành"
                            options={this.mappingComboboxListToOptions(provinceData[PROVINCE_KIND_PROVINCE])}
                            onChange={this.handleProvinceChange}
                            disabled={loadingSave || provinceData[PROVINCE_KIND_PROVINCE]?.length <= 0}
                            required
                            />
                        </Col>
                        <Col span={12}>
                            <DropdownField
                            fieldName="districtId"
                            label="Quận/huyện"
                            disabled={loadingSave || !this.getFieldValue("provinceId")}
                            options = {this.mappingComboboxListToOptions(provinceData[PROVINCE_KIND_DISTRICT])}
                            onChange={this.handleDistrictChange}
                            required
                            />
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <DropdownField
                            fieldName="communeId"
                            label="Xã/phường"
                            disabled={loadingSave || !(this.getFieldValue("provinceId") && this.getFieldValue("districtId"))}
                            options = {this.mappingComboboxListToOptions(provinceData[PROVINCE_KIND_COMMUNE])}
                            required
                            />
                        </Col>
                        <Col span={12}>
                            <TextField
                            fieldName="address"
                            label="Địa chỉ"
                            required
                            disabled={loadingSave}
                            />
                        </Col>
                    </Row>
                </FieldSet>
            </Form>
		);
	}
}

export default RegisterForm;
