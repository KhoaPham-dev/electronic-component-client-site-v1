import React from 'react'
import { Form, Input, Button } from 'antd'

const FormItem = Form.Item

const RequestForgotPasswordForm = ({ loading, onSubmitRequest }) => {
    return (
        <Form
            onFinish={onSubmitRequest}
            className="request-forgot-password-form"
        >
            <FormItem
                name="email"
                rules={[
                    {
                        required: true,
                        message: 'VUi lòng nhập email!',
                    },
                ]}
            >
                <Input size="large" name="email" placeholder="Email" />
            </FormItem>
            <FormItem className="text-center">
                <Button
                    loading={loading}
                    type="primary"
                    htmlType="submit"
                    size="large"
                    className="request-forgot-password-form-button"
                >
                    Gửi
                </Button>
            </FormItem>
        </Form>
    )
}

export default RequestForgotPasswordForm
