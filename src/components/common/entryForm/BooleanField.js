import React from 'react';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';
import { Form, Switch } from 'antd';

import BaseField from './BaseField';

class BooleanField extends BaseField {

    render() {
        const { label, fieldName, disabled } = this.props;
        return (
            <Form.Item
                label={label}
                name={fieldName}
                rules={this.getRules()}
                valuePropName="checked"
            >
                <Switch checkedChildren={<CheckOutlined />} unCheckedChildren={<CloseOutlined />} disabled={disabled}/>
            </Form.Item>
        )
    }
}

export default BooleanField;
