import { Empty, Tag, Button, Spin } from 'antd'
import React from 'react'
import { OrdersStates } from '../../constants'
import Utils from '../../utils'
import { convertStringToDateTimeString, convertUtcToTimezone } from '../../utils/datetimeHelper'
import SearchForm from '../common/entryForm/SearchForm'

function OrdersList({
    dataList,
    loadingMore,
    sizeItemsWillLoadMore,
    handleGetOrdersDetail,
    handleLoadMore,
    filter,
    onSearch,
    isListLoading,
}) {
    return (<Spin spinning={isListLoading}>
        <SearchForm
            searchFields={[{
                key: "code",
                seachPlaceholder: "Mã đơn hàng",
            }]}
            onSubmit={onSearch}
            initialValues={filter}
            allowClear
            className="search-form"
            onResetForm={() => onSearch({ code: "" })}
        />
        <div className="list">
            {
                dataList.map(order => {
                    const state = OrdersStates.find(state => state.value === order.ordersState)
                    return <div className="order-wrapper" key={order.id}>
                        <div className="order" style={{ color: state.color}} onClick={() => handleGetOrdersDetail(order.id)}>
                            <span className="vertical-line" style={{ backgroundColor: state.color}}></span>
                            <div className="first-line">
                                <div className="name-phone">{order.receiverName} ({order.receiverPhone})</div>
                                <div className="code">
                                    #{order.ordersCode}
                                </div>
                            </div>
                            <div className="second-line">
                                {order.ordersAddress}
                            </div>
                            <div className="third-line">
                                <div className="left">
                                    <div className="price">
                                        {Utils.formatMoney(order.ordersTotalMoney)}
                                    </div>
                                    <div className="created-date">
                                        {convertStringToDateTimeString(convertUtcToTimezone(order.createdDate, 'DD/MM/YYYY HH:mm:ss'), 'DD/MM/YYYY HH:mm:ss', 'DD/MM/YYYY HH:mm')}
                                    </div>
                                </div>
                                <div className="status">
                                    <Tag color={state.color}>{state.label}</Tag>
                                </div>
                            </div>
                        </div>
                    </div>
                })
            }
            {
                dataList.length <= 0 ? (
                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Đơn hàng trống"/>
                ): null
            }
            <div
                style={ sizeItemsWillLoadMore <= 0 ? { display: 'none' } : {}}
                className="load-more"
                onClick={() => handleLoadMore()}
            >
                {
                    loadingMore ? <div className="loader">Loading...</div> : <Button className="btn" type="primary" >Xem thêm {sizeItemsWillLoadMore} đơn hàng</Button>
                }
            </div>
        </div>
    </Spin>)
}

export default OrdersList
