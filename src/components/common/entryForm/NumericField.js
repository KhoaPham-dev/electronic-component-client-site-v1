import React from 'react';

import { Form, InputNumber } from 'antd';

import BaseField from './BaseField';

class NumericField extends BaseField {

    render() {
        const {
            label,
            fieldName,
            disabled,
            min,
            max,
            width
        } = this.props;

        return (
            <Form.Item
                label={label}
                name={fieldName}
                rules={this.getRules()}
            >
                <InputNumber
                    placeholder={this.getPlaceHolder()}
                    max={max}
                    min={min}
                    disabled={disabled}
                    style={{width: width || '60%'}}
                    formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={value => value.replace(/\$\s?|(,*)/g, '')}
                />
            </Form.Item>
        )
    }
}

export default NumericField;
