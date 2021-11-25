import React from 'react';
import { Form, Input, Button, Select, DatePicker } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

import BasicForm from './BasicForm';
import Utils from '../../../utils';
import { FieldTypes } from '../../../constants/formConfig';
import { DATE_FORMAT_DISPLAY } from '../../../constants'

class SearchForm extends BasicForm {

    getPlaceHolder(item) {
        return item.seachPlaceholder || `Search by ${Utils.camelCaseToTitleCase(item.key)}`
    }

    getLabelFieldItem(item) {
        if (item.isShowFilterLabel)
            return item.title;
        return '';
    }

    getOptions(fieldItem) {
        let { options, initialValue, optionValueKey, optionLabelKey} = fieldItem;
        optionValueKey = optionValueKey || 'id';
        optionLabelKey = optionLabelKey || 'name';
        if(options && options.length > 0)
            return options;
        else if(initialValue)
            return [{ [optionValueKey]: initialValue, [optionLabelKey]: '' }];
        else
            return [];
    }

    onChangeDateField = (date, fieldItem) => {
        if(fieldItem.onChange) {
            fieldItem.onChange(date);
        }
        
        if(fieldItem.fieldNameChild) {
            this.setFieldValue(fieldItem.fieldNameChild, null);
        }
    }

    onFilterOption = (input, option) => {
        return Utils.removeAccents(option.children.toLowerCase()).indexOf(Utils.removeAccents(input.toLowerCase())) >= 0
    }

    onSelectValue = (value, fieldItem) => {
        const { isSubmitOnChangeValue, onSelectValue } = fieldItem;
        if(isSubmitOnChangeValue) {
            this.handleSubmit(this.formRef.current.getFieldsValue());
        }
        else if(onSelectValue) {
            onSelectValue(value);
        }
    }

    renderFormType(fieldItem) {
        if (fieldItem === undefined || fieldItem === null) {
            return null
        }
        if (fieldItem.fieldType === FieldTypes.DATE) {
            const dateFormat = fieldItem.format || DATE_FORMAT_DISPLAY;
            return (
                <DatePicker
                    style={{ minWidth: 190 }}
                    placeholder={this.getPlaceHolder(fieldItem)}
                    // defaultValue={fieldItem.initialValue}
                    format={dateFormat}
                    onChange={(date) => this.onChangeDateField(date, fieldItem)}
                    disabledDate={fieldItem.disabledDate}
                />
            )
        }
        else if (fieldItem.fieldType === FieldTypes.SELECT) {
            return (
                <Select
                    placeholder={this.getPlaceHolder(fieldItem)}
                    style={{ minWidth: 190 }}
                    defaultValue={fieldItem.initialValue}
                    onSelect={(value) => this.onSelectValue(value, fieldItem)}
                >
                    {
                        this.getOptions(fieldItem).map(item =>
                            <Select.Option key={item.value} >{item.label}</Select.Option>
                        )
                    }
                </Select>
            )
        }  else if (fieldItem.fieldType === FieldTypes.AUTOCOMPLETE) {
            let { onSearch, onSelect, optionValueKey, optionLabelKey, renderItem, loading } = fieldItem;
            optionValueKey = optionValueKey || 'id';
            optionLabelKey = optionLabelKey || 'name';
            return (
                <Select
                    showSearch
                    showArrow={loading || false}
                    loading={loading}
                    style={{ minWidth: 190 }}
                    placeholder={this.getPlaceHolder(fieldItem)}
                    defaultActiveFirstOption={false}
                    onSelect={onSelect}
                    onSearch={onSearch}
                    filterOption={onSearch ? false : this.onFilterOption}
                    // defaultValue={initialValue}
                    optionLabelProp="label"
                >
                    {
                        this.getOptions(fieldItem).map(option =>
                            renderItem
                            ?
                            renderItem(option[optionValueKey], option[optionValueKey], option)
                            :
                            <Select.Option key={option[optionValueKey]}>
                                {option[optionLabelKey]}
                            </Select.Option>
                        )
                    }
                </Select>

            )
        }else {
            return (
                <Input
                    // defaultValue={fieldItem.initialValue}
                    placeholder={this.getPlaceHolder(fieldItem)}
                />
            )
        }
    }

    componentDidMount() {
        this.formRef.current.setFieldsValue(this.props.initialValues);
    }

    render() {
        const { searchFields, hiddenAction } = this.props;

        return (
            <Form
                ref={this.formRef}
                layout="inline"
                onFinish={this.handleSubmit}
            >
                {
                    searchFields.map(fieldItem =>
                        <Form.Item
                            key={fieldItem.key}
                            label={this.getLabelFieldItem(fieldItem)}
                            name={fieldItem.key}
                        >
                            {
                                this.renderFormType(fieldItem)
                            }
                        </Form.Item>
                    )
                }
                {
                    hiddenAction
                    ?
                    null
                    :
                    <Form.Item>
                        <Button icon={<SearchOutlined />} type="primary" htmlType="submit">
                            Search
                        </Button>
                        <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
                            <i className="icfa fa-refresh" /> Clear
                        </Button>
                    </Form.Item>
                }
                
            </Form>
        );
    }
}

export default SearchForm;