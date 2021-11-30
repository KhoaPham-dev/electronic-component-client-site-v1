import React from 'react'
import { Button, Empty, Form, Input, Modal } from 'antd'
import { DeleteFilled, EditOutlined, PlusOutlined, ShoppingOutlined } from '@ant-design/icons'

import BasicModal from '../common/modal/BasicModal'
import Utils from '../../utils'
import { getObjectData } from '../../utils/localStorageHelper'

const { TextArea } = Input
const { confirm } = Modal

function Cart({
    selectedItems,
    totalPrice,
    productList,
    addItem,
    editNoteItem,
    minusItem,
    deleteItem,
    handleGoToPayment,
    handleSubmitNote,
    setShow,
    show,
}) {
    const VAT = 10
    const saleOffPrice = totalPrice * (saleOff / 100)
    const totalSaleOffPrice = totalPrice - saleOffPrice
    const vatPrice = totalSaleOffPrice * (VAT / 100)
    const finalPrice = totalSaleOffPrice + vatPrice

    const handleDeleteItem = (index) => {
        confirm({
            title: 'Xóa',
            content: "Bạn có chắc muốn xóa sản phẩm này khỏi giỏ hàng?",
            okText: "Có",
            okType: 'danger',
            cancelText: "Không",
            centered: true,
            onOk: () => {
                deleteItem(index)
            },
            onCancel() {
              // console.log('Cancel');
            },
        });
    }

    return (
        <BasicModal
            className="cart-modal"
            title="Giỏ hàng"
            visible={show}
            onOk={onSubmit}
            onCancel={() => {
                setShow(false)
            }}
            formId="cart-form"
            centered
        >
            <div className='cart'>
                <div className="header">
                    <h2>Giỏ hàng</h2>
                </div>
                <div className="list">
                    <ul className="items">
                        {
                            selectedItems.length > 0
                            ? selectedItems.map((item, index) => {
                                const product = {
                                    ...item,
                                    ...productList.find(p => p.id === item.id)
                                }
                                const productSaleOffPrice = product.productPrice - (product.productPrice * (product.saleoff / 100))
                                return (<li ref={refItems[item.id]} key={product.id} className="item">
                                    <div className="item-content">
                                        <div className="col col-1">
                                            <p className="title">
                                                {product.productName}
                                            </p>
                                            <div className="action">
                                                {
                                                    !product.isShowNote && !product.note ? (
                                                        <Button
                                                        className="note-btn"
                                                        type="ghost"
                                                        onClick={() => editNoteItem(index)}
                                                        >
                                                            {t("common:add")} {t("translation:cart.note")}
                                                            <PlusOutlined />
                                                        </Button>
                                                    ) : null
                                                }
                                            </div>
                                            {
                                                product.note ? (
                                                    <p className="note-content">
                                                        {product.note}
                                                        {
                                                            !product.isShowNote && product.note ? (
                                                                <Button
                                                                className="note-btn"
                                                                type="link"
                                                                onClick={() => editNoteItem(index)}
                                                                >
                                                                    <EditOutlined />
                                                                </Button>
                                                            ) : null
                                                        }
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
                                            <div className="quantity-edition">
                                                <DeleteFilled 
                                                className="delete-btn"
                                                onClick={() => handleDeleteItem(index)}
                                                />
                                                <Button
                                                className="minus"
                                                onClick={() => {
                                                    if(product.quantity > 1) {
                                                        minusItem(index)
                                                    }
                                                    else {
                                                        handleDeleteItem(index)
                                                    }
                                                }}
                                                >
                                                    -
                                                </Button>
                                                <span className="quantity">{product.quantity}</span>
                                                <Button
                                                className="plus"
                                                onClick={() => addItem(index)}
                                                >
                                                    +
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={`note${!product.isShowNote ? " hide" : ""}`}>
                                        <Form
                                        id={"form-" + product.id}
                                        className="form"
                                        onFinish={(values) => handleSubmitNote(values['textarea-' + product.id], index)}
                                        initialValues={{
                                            ["textarea-" + product.id]: product.note
                                        }}
                                        >
                                            <Form.Item
                                            name={"textarea-" + product.id}
                                            noStyle
                                            >
                                                <TextArea
                                                placeholder={t("translation:cart.typeHere")}
                                                value={product.note}
                                                onPressEnter={(e) =>  handleSubmitNote(e.target.value, index)}
                                                />
                                            </Form.Item>
                                        </Form>
                                        <Button
                                        htmlType="submit"
                                        className="submit-note"
                                        type="primary"
                                        form={"form-" + product.id}
                                        >
                                        {t("common:accept")}
                                        </Button>
                                    </div>
                                </li>
                                )
                            })
                            : (<Empty image={<ShoppingSVG />} description={t("translation:cart.empty")}/>)
                        }
                    </ul>
                </div>
                {
                    selectedItems.length > 0
                    ? (
                        <div className="bottom">
                            <div className="calculate-total product">
                                <div className="title">{t("translation:cart.totalProductPrice")}</div>
                                <div className="total">
                                    {Utils.formatMoney(totalPrice)}
                                </div>
                            </div>
                            {
                                saleOff > 0 ? (
                                    <div className="calculate-total sale-off-price">
                                        <div className="title">{t("translation:cart.saleOffPrice")} ({saleOff}%):</div>
                                        <div className="total">
                                            {Utils.formatMoney(saleOffPrice)}
                                        </div>
                                    </div>
                                ) : null
                            }
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
                                <div className="title">{t("translation:cart.totalPayment")}</div>
                                <div className="total">
                                    {Utils.formatMoney(finalPrice)}
                                </div>
                            </div>
                        </div>
                    ) : null
                }
            </div>
        </BasicModal>
    )
}

export default Cart
