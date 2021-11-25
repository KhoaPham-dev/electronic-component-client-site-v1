import React from 'react';

import { Form, TimePicker } from 'antd';

import BaseField from './BaseField';

import { TIME_FORMAT_DISPLAY } from '../../../constants'

class TimePickerField extends BaseField {

    render() {
        const {
            width,
            size,
            format,
            label,
            fieldName,
            disabled,
            disabledDate
        } = this.props;
        const timeFormat = format || TIME_FORMAT_DISPLAY;
        return (
            <Form.Item
                label={label}
                name={fieldName}
                rules={this.getRules()}
            >
                
                <TimePicker size={size} disabledDate={disabledDate} style={{width: width || '60%'}} format={timeFormat} disabled={disabled}/>
            </Form.Item>
        )
    }
}

export default TimePickerField;
