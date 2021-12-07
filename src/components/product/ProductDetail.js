import React, { useEffect, useState } from 'react'
import {Col, Row, Spin, Button, Divider } from "antd";
import { actions } from '../../actions';

import BasicModal from '../common/modal/BasicModal'
import { useDispatch, useSelector } from 'react-redux';
import { itemsCartSelector } from '../../selectors/cart';
import Utils from '../../utils';
import { AppConstants } from '../../constants';
import noimage from '../../assets/images/noimage.png';

const ProductDetail = ({setShow, productId}) => {
    
    const dispatch = useDispatch();
    const itemsCart = useSelector(itemsCartSelector);
    const [dataDetail, setdataDetail] = useState({});
    const [isLoading, setisLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);


    useEffect(() => {
        const params = {id: productId}
        dispatch(actions.getProudctByIdClient(
            {params,
                onCompleted: ({data}) => {
                    setdataDetail(data);
                    if(AvailableItem(productId) !== -1)
                    {
                        setQuantity(itemsCart[AvailableItem(productId)]?.quantity)
                    }
                    setisLoading(false);
                },
                onError: (err) => {
                    console.log(err);
                }
            }))
    }, [])

    const AvailableItem = (id) => {
        const indexItemsCart = itemsCart.findIndex((item) => {
          return item.id === id;
        })
  
        return indexItemsCart;
      }
    
    const handleClickAddToCart = (dataDetail) => {

          let newItemsCart = JSON.parse(JSON.stringify(itemsCart));

          if(AvailableItem(productId) === -1)
          {
            newItemsCart.push({
                categoryId: dataDetail.categoryId,
                id: dataDetail.id,
                productName: dataDetail.productName,
                productPrice: dataDetail.productPrice,
                quantity: quantity,
              })
          }
          else 
          {
              newItemsCart = newItemsCart.map((el) => {
                  if(el.id !== productId)
                  {
                      return el;
                  }
                  else 
                  {
                      return {
                          ...el,
                          quantity: quantity
                      }
                  }
              })
          }
          
  
          setItemsCart(newItemsCart);
    }

    const addItem = () => {
        setQuantity(quantity + 1)
    }

    const minusItem = () => {
        setQuantity(quantity - 1)
    }

    const setItemsCart = (newItemsCart) => {
        dispatch(actions.setItemsCart({
            itemsCart: newItemsCart
        }))
    }

    return (
            <BasicModal
            visible={true}
            title = "Thông tin chi tiết sản phẩm"
            width = {1200}
            onCancel={() => {
                    setShow(false)
                }}
            centered
            maskClosable>
                        <div>
                            <div className='product_info'>
                                <Spin size="large" wrapperClassName="full-screen-loading" spinning={isLoading}>
                                    <Row gutter={16}>
                                        <Col span={12}>
                                            <div className='product_image'>
                                                <img src={dataDetail.productImage ? `${AppConstants.contentRootUrl}${dataDetail.productImage}` : noimage}></img>
                                            </div>
                                        </Col>
                                        <Col span={12}>
                                        <div className='product_name'>
                                            <h3>
                                                {dataDetail?.productName}
                                            </h3>
                                        </div>
                                        <div className='product_price'>
                                            <span>
                                                {`${Utils.formatNumber(dataDetail?.productPrice)} Đ`}
                                            </span>
                                        </div>
                                        <div className='product_shortdescription'>
                                            <p>Mô tả sản phẩm</p>
                                            <p style={{'color': '#2980b9'}}>{dataDetail?.shortDescription}</p>
                                        </div>
                                        <div className='product_quantity'>
                                            <p className='inline-buttons' style={{'padding-right': '15px', 'margin-left': '-5px'}}>Số lượng</p>
                                            <div className="inline-buttons">
                                                <Button size="large" disabled={quantity === 1}  onClick={() => {
                                                    minusItem();
                                                }
                                                }>-</Button>
                                            </div>
                                            <div className="inline-buttons" style={{padding: '0 15px'}}>
                                                <div style={{'font-weight': 'bold', color: '#2196F3'}}>{quantity}</div>
                                            </div>
                                            <div className="inline-buttons">
                                                <Button size="large" onClick={() => {
                                                    addItem()
                                                }}>+</Button>
                                            </div>                                           
                                        </div>
                                        <div className='product_addtocart' onClick={() => {
                                            handleClickAddToCart(dataDetail);
                                            setShow(false)
                                        }}>
                                            <div>Thêm vào giỏ hàng</div>
                                        </div>
                                        </Col>
                                    </Row>
                                </Spin>
                            </div>
                            <div className='product_longdescription'>
                                <Divider orientation="left">THÔNG TIN SẢN PHẨM</Divider>
                                <div className='content'>
                                    <div dangerouslySetInnerHTML={{ __html: dataDetail && dataDetail.description ? Utils.replaceUrlHelper(dataDetail.description, "{{baseUrl}}", AppConstants.contentRootUrl) : null}}></div>
                                </div>
                            </div>
                        </div>   
            </BasicModal>
    )
}

export default ProductDetail;