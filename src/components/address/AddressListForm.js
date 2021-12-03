import React from 'react'
import { Empty } from 'antd'

function AddressListForm({
    addressList,
    handleEditAddress,
    handleDeleteAddress,
}) {
    return (<>
        <div className="address-list">
            {
                addressList.map(item => {
                    const provincePath = `${item.communeDto?.provinceName}, ${item.districtDto?.provinceName}, ${item.provinceDto.provinceName}`
                    return <div className="item">
                        <div className="name">{item.name}</div>
                        <div className="phone">{item.phone}</div>
                        <div className="address">{item.address}, {provincePath}</div>
                        <div className="actions">
                            <div className="edit" onClick={() => handleEditAddress(item)}>
                                Chỉnh sửa
                            </div>
                            <div className="delete" onClick={() => handleDeleteAddress(item)}>
                                Xóa
                            </div>
                        </div>
                    </div>
                })
            }
            {
                addressList.length <= 0 && (
                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Danh sách trống"/>
                )
            }
        </div>
        </>
    )
}

export default AddressListForm
