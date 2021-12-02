import React from 'react';
import { Form, Row, Col } from 'antd';
import BasicForm from '../common/entryForm/BasicForm';
import TextField from '../common/entryForm/TextField';

class RecoveryPasswordForm extends BasicForm {
    render() {
        const { formId, loadingSave } = this.props;
        return (
            <Form
                id={formId}
                ref={this.formRef}
                layout="vertical"
                onFinish={this.handleSubmit}
            >
                <div className="note">Vui lòng nhập mã xác thực đã được gửi vào email.</div>
                <Row gutter={16}>
                    <Col span={24}>
                        <TextField
                            fieldName="otp"
                            label="Mã xác thực"
                            required
                            minLength={0}
                            width="100%"
                            disabled={loadingSave}
                        />
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={24}>
                        <TextField
                            type="password"
                            fieldName="newPassword"
                            label="Mật khẩu mới"
                            required
                            minLength={6}
                            disabled={loadingSave}
                        />
                    </Col>
                </Row>
            </Form>
        );
    }
}

export default RecoveryPasswordForm;