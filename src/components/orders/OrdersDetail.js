import React from 'react'
import { Form, Row, Col, Steps, Button, Modal } from 'antd'

import TextField from '../common/entryForm/TextField'
import DropdownField from '../common/entryForm/DropdownField'
import { CASH_ONLINE_PAYMENT_KIND, CASH_ON_DELIVERY_PAYMENT_KIND, OrdersStates } from '../../constants'
import FieldSet from '../common/elements/FieldSet'
import {ReactComponent as CodSVG} from '../../assets/images/cod.svg';
import {ReactComponent as CardSVG} from '../../assets/images/card.svg';
import Utils from '../../utils'

const { Step } = Steps

function OrdersDetail({
    dataDetail,
    createdDate,
    ordersLimitCancelTime,
}) {

    const {
        ordersDetailDtos = [],
        ordersState,
        ordersPrevState,
        ordersSaleOff = 0,
        ordersTotalMoney,
        ordersVat,
        receiverPhone,
        receiverName,
        ordersAddress,
    } = dataDetail
    const saleOffPrice = ordersTotalMoney * (ordersSaleOff / 100)
    const totalPriceAfterSaleOff = ordersTotalMoney - saleOffPrice
    const vatPrice = totalPriceAfterSaleOff * Number(ordersVat / 100)
    const finalPrice = totalPriceAfterSaleOff + vatPrice
    return (
        <div className="orders-detail container-xl">
            <div className="orders-state">
                <div className="meta">
                    <h2 className="state">Tình trạng đơn hàng:</h2>
                </div>
                <Steps current={ordersState} size="small">
                    {
                        ordersState < OrdersStates[3].value
                        ? OrdersStates.map((state, i) => {
                            if(i >= OrdersStates.length - 1) return null
                            if(ordersState > state.value) {
                                return <Step
                                key={state.value}
                                title={state.label}
                                icon={state.icon}
                                className="finish"
                                status="finish"
                                />
                            }
                            else if (ordersState === state.value) {
                                return <Step
                                key={state.value}
                                title={state.label}
                                icon={state.icon}
                                className={`process${state.value === OrdersStates[4].value ? ' cancel' : ''}`}
                                status="process"
                                />
                            }
                            else if(ordersState < state.value){
                                return <Step
                                key={state.value}
                                title={state.label}
                                icon={state.icon}
                                className={`wait${state.value === OrdersStates[4].value ? ' cancel' : ''}`}
                                status="wait"
                                />
                            }
                            return null
                        })
                        : OrdersStates.map((state, i) => {
                            if(state.value < ordersPrevState) {
                                return <Step
                                key={state.value}
                                title={state.label}
                                icon={state.icon}
                                className="finish has-prev-state"
                                status="finish"
                                />
                            }
                            else if(state.value === ordersPrevState) {
                                return <Step
                                key={state.value}
                                title={state.label}
                                icon={state.icon}
                                className="finish is-prev-state"
                                status="finish"
                                />
                            }
                            else if(state.value === ordersState) {
                                return <Step
                                key={state.value}
                                title={state.label}
                                icon={state.icon}
                                className={`process${state.value === OrdersStates[4].value ? ' cancel' : ''}`}
                                status="process"
                                />
                            }
                            return null
                        })
                    }
                </Steps>
            </div>
            <FieldSet title="Danh sách mặt hàng">
            <div className="list">
                <ul className="items">
                    {
                        ordersDetailDtos.length > 0
                        && ordersDetailDtos.map((item, index) => {
                            const { productDto } = item
                            return (<li key={item.id} className="item">
                                <div className="item-content">
                                    <div className="col col-1">
                                        <p className="title">
                                            {item.amount} x {productDto.parentName ? productDto.parentName + '-' : ''} {productDto.productName}
                                        </p>
                                        {
                                            productDto.note ? (
                                                <p className="note-content">
                                                    {productDto.note}
                                                </p>
                                            ) : null
                                        }
                                    </div>
                                    <div className="col col-2">
                                        <p className="price">
                                            {Utils.formatMoney(item.price * item.amount)}
                                        </p>
                                    </div>
                                </div>
                            </li>
                            )
                        })
                    }
                </ul>
            </div>
            <div className="bottom">
                <div className="calculate-total product">
                    <div className="title">Tổng tiền hàng: </div>
                    <div className="total">
                        {Utils.formatMoney(ordersTotalMoney)}
                    </div>
                </div>
                {
                    ordersVat > 0 ? (
                        <div className="calculate-total vat">
                            <div className="title">VAT ({ordersVat}%):</div>
                            <div className="total">
                                {Utils.formatMoney(vatPrice)}
                            </div>
                        </div>
                    ) : null
                }
                <div className="calculate-total product-vat">
                    <div className="title">Tổng tiền thanh toán: </div>
                    <div className="total">
                        {Utils.formatMoney(finalPrice)}
                    </div>
                </div>
            </div>
            </FieldSet>
            <div className="orders-detail-form" >
                <div className="section orders-info" style={{ paddingTop: 24 }}>
                    <FieldSet title="Thông tin liên hệ">
                        <Row gutter={16}>
                            <Col span={24} className="name">
                                {receiverName}
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={24} className="phone">
                                {receiverPhone}
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={24} className="address">
                                {ordersAddress}
                            </Col>
                        </Row>
                    </FieldSet>
                </div>
                <div className="section">
                    <FieldSet title="Phương thức thanh toán" className="custom-fieldset payment-method">
                        <Row gutter={16} align="middle">
                            <Col span={2}>
                                {
                                    dataDetail.paymentMethod === CASH_ONLINE_PAYMENT_KIND
                                    ? <CardSVG className="icon"/>
                                    : <CodSVG className="icon"/>
                                }
                            </Col>
                            <Col span={18}>
                                <div>{dataDetail.paymentMethod === CASH_ONLINE_PAYMENT_KIND ? "Thanh toán bằng thẻ" : "Thanh toán khi nhận hàng"}</div>
                            </Col>
                        </Row>
                    </FieldSet>
                </div>
            </div>
        </div>
    )
}

export default OrdersDetail
