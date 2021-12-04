import React from 'react'
import BasicModal from '../common/modal/BasicModal'
import OrdersList from './OrdersList'

function OrdersListModal({
    dataList,
    setShow,
    loadingMore,
    sizeItemsWillLoadMore,
    filter,
    isListLoading,
    handleGetOrdersDetail,
    handleLoadMore,
    onSearch,
}) {
    return (
        <BasicModal
            className="orders-list-modal"
            title="Danh sách đơn hàng"
            visible={true}
            onCancel={() => {
                setShow(-1)
            }}
            centered
            maskClosable
        >
            <OrdersList
            dataList={dataList}
            loadingMore={loadingMore}
            sizeItemsWillLoadMore={sizeItemsWillLoadMore}
            handleGetOrdersDetail={handleGetOrdersDetail}
            handleLoadMore={handleLoadMore}
            filter={filter}
            onSearch={onSearch}
            isListLoading={isListLoading}
            />
        </BasicModal>
    )
}

export default OrdersListModal
