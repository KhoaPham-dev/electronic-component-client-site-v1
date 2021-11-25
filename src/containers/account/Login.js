import React, { Component } from 'react'
import { connect } from 'react-redux'
import { showErrorMessage } from '../../services/notifyService'
import { actions } from '../../actions'
import { sitePathConfig } from '../../constants/sitePathConfig'

import LoginForm from '../../components/account/LoginForm'
class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
        }
        this.onLogin = this.onLogin.bind(this)
    }

    onLogin(valueForm) {
        const { login } = this.props
        this.setState({ loading: true })

        const onError = () => {
            this.setState({ loading: false })
            showErrorMessage(
                'Tên đăng nhập hoặc mật khẩu không đúng, vui lòng thử lại.'
            )
        }

        login({
            params: valueForm,
            onCompleted: () => {
                this.props.history.push(sitePathConfig.exams.path)
            },
            onError,
        })
    }

    render() {
        const { loading } = this.state

        return (
            <div className="login-container">
                <h1 className="page-title">Đăng nhập</h1>
                <div className="login-content">
                    <LoginForm onLogin={this.onLogin} loading={loading} />
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    loading: state.account.loading,
})

const mapDispatchToProps = dispatch => ({
    login: payload => dispatch(actions.login(payload)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
