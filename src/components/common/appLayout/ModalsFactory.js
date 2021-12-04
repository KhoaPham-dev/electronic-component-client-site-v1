import React from 'react'

import LoginContainer from '../../../containers/account/LoginContainer'
import RegisterContainer from '../../../containers/account/RegisterContainer'
import ProfileContainer from '../../../containers/account/ProfileContainer'
import RequestForgotPasswordContainer from '../../../containers/account/RequestForgotPasswordContainer'
import RecoveryPasswordContainer from '../../../containers/account/RecoveryPasswordContainer'
import AddressContainer from '../../../containers/address/AddressContainer'
import CartContainer from '../../../containers/cart/CartContainer'
import {
    ADDRESS_MODAL,
    CART_MODAL,
    LOGIN_MODAL,
    PROFILE_MODAL,
    RECOVERY_MODAL,
    REGISTER_MODAL,
    REQUEST_RECOVERY_MODAL,
    ORDERS_LIST_MODAL,
} from '../../../constants/masterData'
import OrdersListContainer from '../../../containers/orders/OrdersListContainer'

function ModalsFactory({
    idHash,
    showModal,
    setShowModal,
    setIdHash
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
        />,
    })[showModal] ?? null
}

export default ModalsFactory
