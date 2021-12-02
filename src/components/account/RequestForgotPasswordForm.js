import React, { Component } from 'react';
import { Form, Col, Row } from 'antd'

import BasicForm from '../common/entryForm/BasicForm';
import TextField from '../common/entryForm/TextField';

class RequestForgotPasswordForm extends BasicForm {
    render() {
        const { formId, loadingSave } = this.props;
        return (
            <Form
                id={formId}
                ref={this.formRef}
                layout="vertical"
                onFinish={this.handleSubmit}
            >
                <Row gutter={16}>
                    <Col span={24}>
                        <TextField
                            fieldName="email"
                            label="Email"
                            required
                            minLength={0}
                            width="100%"
                            disabled={loadingSave}
                        />
                    </Col>
                </Row>
            </Form>
        );
    }
}

export default RequestForgotPasswordForm;