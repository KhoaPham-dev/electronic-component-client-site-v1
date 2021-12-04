import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment'
import { PropertySafetyTwoTone } from '@ant-design/icons'
import { convertUtcToTimezone } from '../../utils/datetimeHelper'
import { OrdersStates } from '../../constants'
import { actions } from '../../actions'
import { showErrorMessage, showSuccessMessage } from '../../services/notifyService'
import OrdersDetailModal from '../../components/orders/OrdersDetailModal'

function OrdersDetailContainer({
    dataDetail,
    listSize,
    setShowDetailModal,
    handleGetOrdersDetail,
    fetchMyOrdersList,
}) {
    const dispatch = useDispatch()
    const ordersLimitCancelTime = 2
    const timeInXHoursAgo = moment().subtract(Number(ordersLimitCancelTime), 'hour')
    const createdDate = moment(convertUtcToTimezone(dataDetail.createdDate, 'DD/MM/YYYY HH:mm:ss'), 'DD/MM/YYYY HH:mm:ss')
    const isCancel = timeInXHoursAgo.isBefore(createdDate, 'second') && dataDetail.ordersState === OrdersStates[0].value
    const [isModalLoading, setIsModalLoading] = useState(false)

    const handleCancelOrders = () => {
        setIsModalLoading(true)
        dispatch(actions.cancelOrders({
            params: {
                id: dataDetail.id,
            },
            onCompleted: (data) => {
                showSuccessMessage("Hủy đơn hàng thành công")
                handleGetOrdersDetail(dataDetail.id)
                fetchMyOrdersList(listSize)
            },
            onError: () => {
                showErrorMessage("Gặp lỗi vui lòng thử lại")
            },
            onDone: () => {
                setIsModalLoading(false)
            }
        }))
    }

    return (
        <OrdersDetailModal
        dataDetail={dataDetail}
        isCancel={isCancel}
        createdDate={createdDate}
        ordersLimitCancelTime={ordersLimitCancelTime}
        isModalLoading={isModalLoading}
        setShowDetailModal={setShowDetailModal}
        handleCancelOrders={handleCancelOrders}
        />
    )
}

export default OrdersDetailContainer
