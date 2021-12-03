import React from 'react'
import { Form, Col, Row } from "antd";

import BasicForm from "../common/entryForm/BasicForm";

import TextField from "../common/entryForm/TextField";
import DropdownField from "../common/entryForm/DropdownField";
import { PROVINCE_KIND_COMMUNE, PROVINCE_KIND_DISTRICT, PROVINCE_KIND_PROVINCE } from "../../constants/masterData";
import BasicModal from "../common/modal/BasicModal";

class AddressDetailForm extends BasicForm {

    handleProvinceChange = (parentId) =>{
        const { fetchProvince } = this.props;
        fetchProvince(PROVINCE_KIND_DISTRICT, parentId, true)
        this.setFieldValue("districtId", undefined);
        this.setFieldValue("communeId", undefined);
    }

    handleDistrictChange = (parentId) =>{
        const { fetchProvince } = this.props;
        fetchProvince(PROVINCE_KIND_COMMUNE, parentId, true)
        this.setFieldValue("communeId", undefined);
    }

    mappingComboboxListToOptions(comboboxData) {
        return comboboxData && comboboxData.map(c=>({
              value: c.id,
              label: c.provinceName,
        })) || [];
    }

    getInitialValue = () => {
        const { dataDetail, isEditing } = this.props;
        if(isEditing) {
            return {
                address: dataDetail.address,
                communeId: dataDetail.communeDto.id,
                districtId: dataDetail.districtDto.id,
                id: dataDetail.id,
                name: dataDetail.name,
                phone: dataDetail.phone,
                provinceId: dataDetail.provinceDto.id,
            }
        }
    }

    render() {
        const {
            dataDetail,
            isEditing,
            loadingSave,
            provinceData,
            formId,
        } = this.props
        return (
            <Form
                id={formId}
                ref={this.formRef}
                layout="vertical"
                onFinish={this.handleSubmit}
                initialValues={this.getInitialValue()}
            >
                <Row gutter={16}>
                    <Col span={12}>
                        <TextField
                            type="number"
                            fieldName="phone"
                            label="Số điện thoại"
                            required
                            minLength={0}
                            width="100%"
                        />
                    </Col>
                    <Col span={12}>
                        <TextField
                            fieldName="name"
                            label="Họ và tên"
                            required
                            disabled={loadingSave}
                        />
                    </Col>
                </Row>
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
            </Form>
        )
    }

}

export default AddressDetailForm
