import React from 'react'
import { Button, Modal } from 'antd'
import moment from 'moment'

import BasicModal from '../common/modal/BasicModal'
import OrdersDetail from './OrdersDetail'

const { confirm } = Modal
function OrdersDetailModal({
    setShowDetailModal,
    dataDetail,
    isCancel,
    createdDate,
    ordersLimitCancelTime,
    handleCancelOrders,
    isModalLoading,
}) {
    const remainCancelTime =  ordersLimitCancelTime - moment.duration(moment().diff(createdDate, 'DD/MM/YYYY HH:mm:ss')).asHours()
    const remainCancelTimeInHours = Math.floor(remainCancelTime)
    const remainCancelTimeInMinutes = Math.floor((remainCancelTime - remainCancelTimeInHours) * 60)
    const _handleCancelOrders = () => {
        confirm({
            title: "Hủy đơn hàng",
            content: "Bạn có chắc muốn hủy đơn hàng?",
            okText: "Có",
            okType: 'danger',
            cancelText: "Không",
            centered: true,
            onOk: () => {
                handleCancelOrders()
            },
            onCancel() {
              // console.log('Cancel');
            },
        });
    }

    return (
        <BasicModal
            className="orders-detail-modal"
            title={`Chi tiết đơn hàng: #${dataDetail.ordersCode}`}
            visible={true}
            onCancel={() => {
                setShowDetailModal(false)
            }}
            additionalButton={
                <div className="action">
                    <Button disabled={!isCancel} loading={isModalLoading} type="ghost" className={`btn-cancel${isCancel ? " danger" : ""}`} onClick={_handleCancelOrders}>
                        HỦY ĐƠN HÀNG
                    </Button>
                    {
                        isCancel && (
                            <div>
                                Bạn không thể hủy đơn hàng này sau&nbsp;
                                <span className="remain-time">
                                    {
                                        remainCancelTimeInHours > 0
                                        ? `${remainCancelTimeInHours}H ${remainCancelTimeInMinutes}P`
                                        : `${remainCancelTimeInMinutes}P`
                                    }
                                </span>
                            </div>
                        )
                    }
                </div>
            }
            loading={isModalLoading}
            centered
            maskClosable
        >
            <OrdersDetail
            dataDetail={dataDetail}
            isCancel={isCancel}
            createdDate={createdDate}
            ordersLimitCancelTime={ordersLimitCancelTime}
            handleCancelOrders={handleCancelOrders}
            />
        </BasicModal>
    )
}

export default OrdersDetailModal
