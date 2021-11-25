import React from 'react'
import { Form, Input, Button } from 'antd'

const FormItem = Form.Item

const VerifyForm = ({ loading, onVerify }) => {
    return (
        <Form onFinish={onVerify} className="verify-account-form">
            <FormItem
                name="otp"
                rules={[
                    {
                        required: true,
                        message: 'Vui lòng nhập mã xác thực!',
                    },
                ]}
            >
                <Input size="large" name="otp" placeholder="Mã xác thực" />
            </FormItem>
            <FormItem className="text-center">
                <Button
                    loading={loading}
                    type="primary"
                    htmlType="submit"
                    size="large"
                    className="verify-account-form-button"
                >
                    Xác thực
                </Button>
            </FormItem>
        </Form>
    )
}

export default VerifyForm
