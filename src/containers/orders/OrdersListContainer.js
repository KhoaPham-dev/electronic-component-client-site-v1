import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import { actions } from '../../actions'
import OrdersListModal from '../../components/orders/OrdersListModal'
import { DEFAULT_TABLE_ITEM_SIZE } from '../../constants'
import { ordersDataSelector } from '../../selectors/orders'
import OrdersDetailContainer from './OrdersDetailContainer'

function OrdersListContainer({
    setShow,
    timetoCancel
}) {
    const history = useHistory()
    const dispatch = useDispatch()
    const initFilter = {
        code: ""
    }
    const {
        size = DEFAULT_TABLE_ITEM_SIZE,
        totalElements = DEFAULT_TABLE_ITEM_SIZE,
        data: dataList = [],
        orderTotalPrice,
    } = useSelector(ordersDataSelector)
    const [loadingMore, setLoadingMore] = useState(false)
    const sizeItemsWillLoadMore = Math.min(totalElements - size, DEFAULT_TABLE_ITEM_SIZE)
    const [filter, setFilter] = useState(initFilter)
    const [showDetailModal, setShowDetailModal] = useState(false)
    const [dataDetail, setDataDetail] = useState()
    const [isListLoading, setIsListLoading] = useState(false)
    const [isMount, setIsMount] = useState(false)

    const fetchMyOrdersList = (_size, noLoading) => {
        !noLoading && setIsListLoading(true)
        dispatch(actions.getOrdersList({
            params: {
                ...filter,
                size: _size || (size + Math.max(sizeItemsWillLoadMore, 0)),
            },
            onDone: () => {
                !isMount && setIsMount(true)
                !noLoading && setIsListLoading(false)
                setLoadingMore(false)
            },
        }))
    }

    const handleLoadMore = () => {
        setLoadingMore(true)
        fetchMyOrdersList(null, true)
    }

    const handleGetOrdersDetail = (ordersId) => {
        setIsListLoading(true)
        dispatch(actions.getOrders({
            params: {
                id: ordersId
            },
            onCompleted: (data) => {
                setDataDetail(data)
                setShowDetailModal(true)
            },
            onDone: () => {
                setIsListLoading(false)
            }
        }))
    }

    const onSearch = (formValues) => {
        if(formValues.code !== filter.code) {
            setFilter(formValues)
        }
    }

    useEffect(() => {
       fetchMyOrdersList(DEFAULT_TABLE_ITEM_SIZE)
    }, [filter])

    return (<>
        <OrdersListModal
        dataList={dataList}
        loadingMore={loadingMore}
        sizeItemsWillLoadMore={sizeItemsWillLoadMore}
        filter={filter}
        isListLoading={isListLoading}
        setShow={setShow}
        handleGetOrdersDetail={handleGetOrdersDetail}
        handleLoadMore={handleLoadMore}
        onSearch={onSearch}
        />
        {
            showDetailModal && (
                <OrdersDetailContainer
                dataDetail={dataDetail}
                listSize={size}
                setShowDetailModal={setShowDetailModal}
                handleGetOrdersDetail={handleGetOrdersDetail}
                fetchMyOrdersList={fetchMyOrdersList}
                timetoCancel={timetoCancel}
                />
            )
        }
    </>)
}

export default OrdersListContainer
