import React from 'react'
import LoginModal from '../../components/account/LoginModal'

function LoginContainer({
    setShow
}) {
    return (
        <LoginModal
        setShow={setShow}
        />
    )
}

export default LoginContainer
