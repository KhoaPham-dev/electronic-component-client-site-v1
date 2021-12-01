import React from "react";
import { Form, Col, Row } from "antd";

import BasicForm from "../../components/common/entryForm/BasicForm";

import TextField from "../../components/common/entryForm/TextField";
import { AppConstants } from "../../constants";
import logo from '../../assets/images/logo.png'

class LoginForm extends BasicForm {

	render() {
		const {
            formId,
            loadingSave,
        } = this.props;
		return (<>
            <div className="logo">
                <img src={logo}/>
            </div>
            <Form
                id={formId}
                ref={this.formRef}
                layout="vertical"
                onFinish={this.handleSubmit}
            >
                <Row gutter={16}>
                    <Col span={24}>
                        <TextField
                            fieldName="phone"
                            label="Email hoặc số điện thoại"
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
                            fieldName="password"
                            label="Mật khẩu"
                            required
                            minLength={6}
                            disabled={loadingSave}
                            formItemStyle={{
                                marginBottom: 0
                            }}
                        />
                    </Col>
                </Row>
            </Form>
		</>);
	}
}

export default LoginForm;
