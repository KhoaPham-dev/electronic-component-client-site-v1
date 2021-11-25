import React from 'react'
import { Form, Button } from 'antd'

import TextField from '../common/entryForm/TextField'
import BasicForm from '../common/entryForm/BasicForm'

const FormItem = Form.Item

class ChangePasswordForm extends BasicForm {
    compareToPassword = (rule, newPassword) => {
        const password = this.getFieldValue('newPassword')
        console.log({ password, newPassword })
        if ((password || newPassword) && password !== newPassword) {
            return Promise.reject('Xác nhận mật khẩu mới không đúng!')
        } else {
            return Promise.resolve()
        }
    }
    render() {
        const { loading, onSubmitChange } = this.props

        return (
            <Form
                onFinish={onSubmitChange}
                className="change-password-form"
                layout="vertical"
                ref={this.formRef}
            >
                <TextField
                    label="Mã xác thực"
                    required={true}
                    size="large"
                    fieldTitle="Mã xác thực"
                    fieldName="otp"
                />
                <TextField
                    label="Mật khẩu mới"
                    required={true}
                    type="password"
                    size="large"
                    fieldTitle="Mật khẩu mới"
                    fieldName="newPassword"
                />
                <TextField
                    label="Xác nhận mật khẩu mới"
                    required={true}
                    type="password"
                    size="large"
                    fieldTitle="Xác nhận mật khẩu mới"
                    fieldName="newPasswordConfirm"
                    validators={[this.compareToPassword]}
                />
                <FormItem className="text-center mt-2">
                    <Button
                        loading={loading}
                        type="primary"
                        htmlType="submit"
                        size="large"
                        className="change-password-form-button"
                    >
                        Thay đổi
                    </Button>
                </FormItem>
            </Form>
        )
    }
}

export default ChangePasswordForm
