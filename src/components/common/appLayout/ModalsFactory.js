import React from 'react'

import LoginContainer from '../../../containers/account/LoginContainer'
import RegisterContainer from '../../../containers/account/RegisterContainer'
import ProfileContainer from '../../../containers/account/ProfileContainer'
import RequestForgotPasswordContainer from '../../../containers/account/RequestForgotPasswordContainer'
import RecoveryPasswordContainer from '../../../containers/account/RecoveryPasswordContainer'
import AddressContainer from '../../../containers/address/AddressContainer'
import CartContainer from '../../../containers/cart/CartContainer'
import ProductDetailConatiner from '../../../containers/productList/ProductDetailContainer'
import {
    ADDRESS_MODAL,
    CART_MODAL,
    LOGIN_MODAL,
    PROFILE_MODAL,
    RECOVERY_MODAL,
    REGISTER_MODAL,
    REQUEST_RECOVERY_MODAL,
    ORDERS_LIST_MODAL,
    PRODUCT_DETAIL_MODAL,
    PRODUCT_CHILD_MODAL,
    PRODUCT_CHILD_MODAL_DETAIL
} from '../../../constants/masterData'
import OrdersListContainer from '../../../containers/orders/OrdersListContainer'
import ProductChildContainer from '../../../containers/productList/ProductChildContainer'
import ProductChildContainerDetail from '../../../containers/productList/ProductChildContainerDetail'

function ModalsFactory({
    idHash,
    showModal,
    setShowModal,
    setIdHash,
    productId,
    productName,
    timetoCancel,
    handleClickAddToCart,
    AvailableItem,
    minusItem,
    addItem,
    handleDeleteItem,
    HasChild,
    prepareUpdateCartChild,
    setprepareUpdateCartChild,
    quantityInCart,
    setQuantityInCart
}) {
    return ({
        [CART_MODAL]: <CartContainer
        setShow={setShowModal}
        />,
        [LOGIN_MODAL]: <LoginContainer
        setShow={setShowModal}
        />,
        [REGISTER_MODAL]: <RegisterContainer
        setShow={setShowModal}
        />,
        [PROFILE_MODAL]: <ProfileContainer
        setShow={setShowModal}
        />,
        [REQUEST_RECOVERY_MODAL]: <RequestForgotPasswordContainer
        setShow={setShowModal}
        setIdHash={setIdHash}
        />,
        [RECOVERY_MODAL]: <RecoveryPasswordContainer
        setShow={setShowModal}
        idHash={idHash}
        />,
        [ADDRESS_MODAL]: <AddressContainer
        setShow={setShowModal}
        />,
        [ORDERS_LIST_MODAL]: <OrdersListContainer
        setShow={setShowModal}
        timetoCancel={timetoCancel}
        />,
        [PRODUCT_DETAIL_MODAL]: <ProductDetailConatiner 
        setShow={setShowModal}
        productId={productId}
        productName={productName}
        HasChild={HasChild}
        />,
        [PRODUCT_CHILD_MODAL]: <ProductChildContainer 
        setShow={setShowModal}
        productId={productId}
        productName={productName}
        handleClickAddToCart={handleClickAddToCart}
        AvailableItem={AvailableItem}
        minusItem={minusItem}
        addItem={addItem}
        handleDeleteItem={handleDeleteItem}
        />,
        [PRODUCT_CHILD_MODAL_DETAIL]: <ProductChildContainerDetail 
        setShow={setShowModal}
        productId={productId}
        productName={productName}
        prepareUpdateCartChild={prepareUpdateCartChild}
        setprepareUpdateCartChild={setprepareUpdateCartChild}
        quantityInCart={quantityInCart}
        setQuantityInCart={setQuantityInCart}
        />
    })[showModal] ?? null
}

export default ModalsFactory
