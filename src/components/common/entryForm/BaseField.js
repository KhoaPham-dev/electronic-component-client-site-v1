import { Component } from 'react'

import { FieldTypes } from '../../../constants/formConfig'
import Utils from '../../../utils'

class BaseField extends Component {
    constructor(props) {
        super(props)

        this.fieldType = FieldTypes.STRING
        this.getRules = this.getRules.bind(this)
        this.getInitValue = this.getInitValue.bind(this)
    }

    getPlaceHolder() {
        const { placeholder, required } = this.props

        if (placeholder) {
            return placeholder
        } else if (required) {
            return this.getRequiredMsg()
        }

        return ''
    }

    getRequiredMsg() {
        let { fieldName, requiredMsg, fieldTitle } = this.props

        if (requiredMsg) return requiredMsg

        if (!fieldTitle) {
            fieldName =
                this.props.fieldName.constructor === Array
                    ? fieldName[fieldName.length - 1]
                    : fieldName
            fieldTitle = Utils.camelCaseToTitleCase(fieldName)
        }

        let action = ''
        switch (this.fieldType) {
            case FieldTypes.SELECT:
                action = 'chọn'
                break
            default:
                action = 'điền'
        }

        return `Vui lòng ${action} ${fieldTitle}`
    }

    getRules() {
        const {
            //fieldName,
            required,
            // min,
            // max,
            // len,
            // compareTo,
            validators,
            validateTriggers,
        } = this.props

        const rules = []

        if (required) {
            rules.push({
                required,
                message: this.getRequiredMsg(),
            })
        }

        if (validators?.length > 0) {
            validators.forEach((validator, index) => {
                const rule = {
                    validator,
                }
                validateTriggers &&
                    validateTriggers[index] &&
                    (rule.validateTrigger = validateTriggers[index])
                rules.push(rule)
            })
        }

        return rules
    }

    getInitValue() {
        const { initialValue, dataDetail, fieldName } = this.props
        if (initialValue) return initialValue
        else if (dataDetail && dataDetail[fieldName])
            return dataDetail[fieldName]
        else return undefined
    }
}

export default BaseField
