import React from 'react'

import { Form, Input } from 'antd'

import BaseField from './BaseField'
const { TextArea } = Input

class TextField extends BaseField {
    getMaxLengthMsg() {
        const { maxLength, maxLengthMsg } = this.props
        return (
            maxLengthMsg ||
            `This field cannot be longer than ${maxLength} characters`
        )
    }

    getMinLengthMsg() {
        const { minLength, minLengthMsg } = this.props
        return (
            minLengthMsg ||
            `This field cannot be shorter than ${minLength} characters`
        )
    }

    getTextFieldRules() {
        const { maxLength, minLength, type, invalidEmailMsg } = this.props
        const rules = []
        if (maxLength) {
            rules.push({ max: maxLength, message: this.getMaxLengthMsg() })
        }
        if (minLength) {
            rules.push({ min: minLength, message: this.getMinLengthMsg() })
        }
        if (type === 'email') {
            rules.push({
                type,
                message: invalidEmailMsg || 'Định dạng email không hợp lệ!',
            })
        }

        return rules
    }
    render() {
        const { type, size, label, fieldName, disabled, onBlur } = this.props

        return (
            <Form.Item
                label={label}
                name={fieldName}
                rules={[...this.getRules(), ...this.getTextFieldRules()]}
            >
                {type === 'textarea' ? (
                    <TextArea
                        placeholder={this.getPlaceHolder()}
                        disabled={disabled}
                        onBlur={onBlur}
                    />
                ) : (
                    <Input
                        size={size}
                        placeholder={this.getPlaceHolder()}
                        disabled={disabled}
                        type={type}
                        onBlur={onBlur}
                    />
                )}
            </Form.Item>
        )
    }
}

export default TextField
