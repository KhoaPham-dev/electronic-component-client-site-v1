import React from 'react'
import { Form, Input, Button } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'

import { Link } from 'react-router-dom'
import sitePathConfig from '../../constants/sitePathConfig'

const FormItem = Form.Item

const LoginForm = ({ loading, onLogin }) => {
    const handleSubmit = values => {
        onLogin(values)
    }

    return (
        <Form onFinish={handleSubmit} className="login-form">
            <FormItem
                name="username"
                rules={[
                    { required: true, message: 'Vui lòng nhập tên đăng nhập!' },
                ]}
            >
                <Input
                    prefix={<UserOutlined />}
                    size="large"
                    name="username"
                    placeholder="Tên đăng nhập"
                />
            </FormItem>
            <FormItem
                name="password"
                rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
                className="mb-2"
            >
                <Input
                    prefix={<LockOutlined />}
                    size="large"
                    name="password"
                    type="password"
                    placeholder="Mật khẩu"
                />
            </FormItem>
            <FormItem className="mb-2">
                <Link to={sitePathConfig.forgotPassword.path}>
                    Quên mật khẩu?
                </Link>
            </FormItem>
            <FormItem>
                <Button
                    loading={loading}
                    type="primary"
                    htmlType="submit"
                    size="large"
                    className="login-form-button"
                >
                    Đăng nhập
                </Button>
            </FormItem>
        </Form>
    )
}

export default LoginForm
