import React, { useMemo } from 'react'
import { Form, Row, Col, Radio, Button } from 'antd'

import TextField from '../common/entryForm/TextField'
import DropdownField from '../common/entryForm/DropdownField'
import { CASH_ONLINE_PAYMENT_KIND, CASH_ON_DELIVERY_PAYMENT_KIND } from '../../constants'
import FieldSet from '../common/elements/FieldSet'
import {ReactComponent as CodSVG} from '../../assets/images/cod.svg';
import {ReactComponent as CardSVG} from '../../assets/images/card.svg';
import { PROVINCE_KIND_COMMUNE, PROVINCE_KIND_DISTRICT, PROVINCE_KIND_PROVINCE } from '../../constants/masterData'
import Utils from '../../utils'

function MakeOrderPage({
    addressOptions,
    formRef,
    formId,
    handleSubmit,
    handleChangeAddress,
    isAllRequiredFieldsValidated,
    setIsAllRequiredFieldsValidated,
    provinceData,
    mappingComboboxListToOptions,
    handleProvinceChange,
    getFieldValue,
    handleDistrictChange,
    selectedItems,
    isAuth,
    isFormLoading,
}) {

    const totalPrice = useMemo(() => {
        return selectedItems.reduce((acc, cur) => {
            return acc + (cur.quantity * (cur.productPrice - cur.productPrice * ((cur.saleoff || 0) / 100)))
        }, 0)
    }, [selectedItems])
    const VAT = 10
    const vatPrice = totalPrice * (VAT / 100)
    const finalPrice = totalPrice + vatPrice

    return (<div className="make-orders-page">
        <Form
            id={formId}
            ref={formRef}
            layout="vertical"
            onFinish={handleSubmit}
            className="make-order-form container-xl"
            initialValues={{
                paymentMethod: CASH_ONLINE_PAYMENT_KIND,
            }}
            onChange={() => {
                setIsAllRequiredFieldsValidated()
            }}
        >
            <div className="section">
                <h2 className="title">
                    Thông tin đơn hàng
                </h2>
                <FieldSet title="Thông tin liên lạc">
                    {
                        isAuth && (
                        <Row gutter={16}>
                            <Col span={12}>
                                <DropdownField
                                label="Chọn địa chỉ"
                                options={addressOptions}
                                onChange={handleChangeAddress}
                                placeholder="Chọn địa chỉ"
                                allowClear
                                disabled={addressOptions.length <= 0 || isFormLoading}
                                />
                            </Col>
                        </Row>
                        )
                    }
                    <Row gutter={16}>
                        <Col span={12}>
                            <TextField
                            fieldName="receiverPhone"
                            label="Số điện thoại"
                            required
                            disabled={isFormLoading}
                            />
                        </Col>
                        <Col span={12}>
                            <TextField
                            fieldName="receiverName"
                            label="Họ và tên"
                            required
                            disabled={isFormLoading}
                            />
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <DropdownField
                            fieldName="provinceId"
                            label="Tỉnh/thành"
                            options={mappingComboboxListToOptions(provinceData[PROVINCE_KIND_PROVINCE])}
                            onChange={handleProvinceChange}
                            disabled={provinceData[PROVINCE_KIND_PROVINCE]?.length <= 0 || isFormLoading}
                            required
                            />
                        </Col>
                        <Col span={12}>
                            <DropdownField
                            fieldName="districtId"
                            label="Quận/huyện"
                            disabled={!getFieldValue("provinceId") || isFormLoading}
                            options = {mappingComboboxListToOptions(provinceData[PROVINCE_KIND_DISTRICT])}
                            onChange={handleDistrictChange}
                            required
                            />
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <DropdownField
                            fieldName="communeId"
                            label="Xã/phường"
                            disabled={!(getFieldValue("provinceId") && getFieldValue("districtId")) || isFormLoading}
                            options = {mappingComboboxListToOptions(provinceData[PROVINCE_KIND_COMMUNE])}
                            required
                            />
                        </Col>
                        <Col span={12}>
                            <TextField
                            fieldName="address"
                            label="Địa chỉ"
                            required
                            disabled={isFormLoading}
                            />
                        </Col>
                    </Row>
                </FieldSet>
            </div>
            <div className="section">
                <FieldSet title="Phương thức thanh toán" className="custom-fieldset payment-method">
                    <Form.Item
                    name="paymentMethod"
                    >
                        <Radio.Group>
                            <Row gutter={16} align="middle" className="first-row">
                                <Col span={1}>
                                    <Radio value={CASH_ON_DELIVERY_PAYMENT_KIND}></Radio>
                                </Col>
                                <Col span={23} style={{
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center'
                                }}
                                onClick={() => {
                                    formRef.current.setFieldsValue({'paymentMethod': CASH_ON_DELIVERY_PAYMENT_KIND})
                                }}
                                >
                                    <Col span={2}>
                                        <CodSVG className="icon"/>
                                    </Col>
                                    <Col span={17}>
                                        <div>Thanh toán khi nhận hàng</div>
                                    </Col>
                                </Col>
                            </Row>
                            <Row gutter={16} align="middle">
                                <Col span={1}>
                                    <Radio value={CASH_ONLINE_PAYMENT_KIND}></Radio>
                                </Col>
                                <Col span={23} style={{
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center'
                                }}
                                onClick={() => {
                                    formRef.current.setFieldsValue({'paymentMethod': CASH_ONLINE_PAYMENT_KIND})
                                }}
                                >
                                    <Col span={2}>
                                        <CardSVG className="icon"/>
                                    </Col>
                                    <Col span={17}>
                                        <div>Thanh toán bằng thẻ</div>
                                    </Col>
                                </Col>
                            </Row>
                        </Radio.Group>
                    </Form.Item>
                </FieldSet>
            </div>
            <div className="section last">
                <FieldSet>
                    <Button disabled={!isAllRequiredFieldsValidated || isFormLoading} className="btn-submit" size="large" htmlType="submit" type="primary">
                        Đặt hàng
                    </Button>
                    <div>Bằng việc nhấn vào nút "ĐẶT HÀNG", nghĩa là bạn đã đồng ý với các <span className="policy">Điều khoản và điều kiện</span> bảo vệ dữ liệu của chúng tôi</div>
                </FieldSet>
            </div>
        </Form>
        <div className="sidebar">
            <h2 className="title">
                Danh sách mặt hàng
            </h2>
            <div className="list">
                <ul className="items">
                    {
                        selectedItems.length > 0
                        && selectedItems.map((product, index) => {
                            const productSaleOffPrice = product.productPrice - (product.productPrice * (product.saleoff / 100))
                            return (
                                <li key={product.id} className="item">
                                    <div className="item-content">
                                        <div className="col col-1">
                                            <p className="title">
                                                {product.quantity} x {product.parentName ? product.parentName + '-' : ''} {product.productName}
                                            </p>
                                            {
                                                product.note ? (
                                                    <p className="note-content">
                                                        {product.note}
                                                    </p>
                                                ) : null
                                            }
                                        </div>
                                        <div className="col col-2">
                                            {
                                                product.saleoff > 0 ? (<>
                                                    <p className="discount-price">
                                                        {Utils.formatMoney(productSaleOffPrice * product.quantity)}
                                                    </p>
                                                    <p className="price has-discount">
                                                        {Utils.formatMoney(product.productPrice * product.quantity)}
                                                    </p>
                                                    </>
                                                ) : (
                                                    <p className="price">
                                                        {Utils.formatMoney(product.productPrice * product.quantity)}
                                                    </p>
                                                )
                                            }
                                        </div>
                                    </div>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
            {
                selectedItems.length > 0
                ? (
                    <div className="bottom">
                        <div className="calculate-total product">
                            <div className="title">Tổng tiền hàng:</div>
                            <div className="total">
                                {Utils.formatMoney(totalPrice)}
                            </div>
                        </div>
                        {
                            VAT > 0 ? (
                                <div className="calculate-total vat">
                                    <div className="title">VAT ({VAT}%):</div>
                                    <div className="total">
                                        {Utils.formatMoney(vatPrice)}
                                    </div>
                                </div>
                            ) : null
                        }
                        <div className="calculate-total product-vat">
                            <div className="title">Tổng tiền thanh toán:</div>
                            <div className="total">
                                {Utils.formatMoney(finalPrice)}
                            </div>
                        </div>
                    </div>
                ) : null
            }
        </div>
    </div>
    )
}

export default MakeOrderPage
