import React, { useEffect, useState } from 'react'
import {Col, Row, Spin, Button, Divider, Modal } from "antd";
import { actions } from '../../actions';

import BasicModal from '../common/modal/BasicModal'
import { useDispatch, useSelector } from 'react-redux';
import { itemsCartSelector } from '../../selectors/cart';
import Utils from '../../utils';
import { AppConstants } from '../../constants';
import noimage from '../../assets/images/noimage.png';
import ModalsFactory from '../common/appLayout/ModalsFactory';
import { PRODUCT_DETAIL_MODAL, PRODUCT_CHILD_MODAL, PRODUCT_CHILD_MODAL_DETAIL } from "../../constants/masterData";
const { confirm } = Modal

const ProductDetail = ({setShow, productId, productName, HasChild}) => {
    
    const dispatch = useDispatch();
    const itemsCart = useSelector(itemsCartSelector);
    const [dataDetail, setdataDetail] = useState({});
    const [isLoading, setisLoading] = useState(true);
    const [quantityNotinCart, setQuantityNotinCart] = useState(1);
    const [quantityInCart, setQuantityInCart] = useState(1);
    const [showModal, setShowModal] = useState(-1)
    const [idHash, setIdHash] = useState()
    const [prepareUpdateCartChild, setprepareUpdateCartChild] = useState([]);

    useEffect(() => {
        const params = {id: productId}
        dispatch(actions.getProudctByIdClient(
            {params,
                onCompleted: ({data}) => {
                    setdataDetail(data);
                    if(!checkCart(productId))
                    {
                        if(HasChild)
                        {
                            let quantity = 0;
                            let ChildItemCarts = itemsCart.filter((el) => {
                                return el.parentId === productId
                              })
                      
                              for (let i = 0 ; i < ChildItemCarts.length; i++)
                              {
                                quantity = quantity + ChildItemCarts[i].quantity
                              }
                              setQuantityInCart(quantity);
                        }
                        else 
                        {
                            if(AvailableItem(productId) !== -1)
                            {
                                setQuantityInCart(itemsCart[AvailableItem(productId)].quantity)
                            }
                        }
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
    
    const AvailableItemChild = (id) => {
        const indexItemsCartChild = itemsCart.findIndex((item) => {
          return item.parentId === id;
        })
  
        return indexItemsCartChild;
      }
    
      const checkCart = (id) => {
        if (HasChild)
        {
          if (AvailableItemChild(id) === -1)
          {
            return true
          }
          else 
          {
            return false
          }
        }
        else {
          if (AvailableItem(id) === -1)
          {
            return true
          }
          else 
          {
            return false
          }
        }
      }

      const disableButton = (id) => {
          if(!checkCart(id))
          {
              if(quantityInCart === 0)
              {
                  return true;
              }
              else 
              {
                  return false;
              }
          }
          else 
          {
              if(quantityNotinCart === 1)
              {
                  return true;
              }
              else
              {
                  return false;
              }
          }
      }
    
    const handleClickAddToCart = (dataDetail) => {

          let newItemsCart = JSON.parse(JSON.stringify(itemsCart));

          if(checkCart(productId))
          {
              if(HasChild)
              {

              }
              else 
              {
                newItemsCart.push({
                    categoryId: dataDetail.categoryId,
                    id: dataDetail.id,
                    productName: dataDetail.productName,
                    productPrice: dataDetail.productPrice,
                    quantity: quantityNotinCart,
                  }) 
              }
          }
          else 
          {
              if(HasChild)
              {

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
                            quantity: quantityInCart
                        }
                    }
                })

                if (newItemsCart[AvailableItem(productId)].quantity === 0)
                {
                    console.log('runned when quantity reach to 0')
                    newItemsCart = newItemsCart.filter((el) => {
                        return el.id !== productId
                    })
                }
              }    
          }
          setItemsCart(newItemsCart);
    }

    const handleDeleteItem = (dataDetail) => {
        confirm({
            title: 'Xóa',
            content: "Bạn có chắc muốn xóa sản phẩm này khỏi giỏ hàng?",
            okText: "Có",
            okType: 'danger',
            cancelText: "Không",
            centered: true,
            onOk: () => {
                handleClickAddToCart(dataDetail)
                setShow(false)
            },
            onCancel() {
              // console.log('Cancel');
            },
        });
    }

    const addItem = (id) => {
        if(!checkCart(id))
        {
            if(HasChild)
            {
                setShowModal(PRODUCT_CHILD_MODAL_DETAIL)
            }
            else
            {
                setQuantityInCart(quantityInCart + 1)
            }
        }
        else
        {
            if(HasChild)
            {
                setShowModal(PRODUCT_CHILD_MODAL_DETAIL)
            }
            else
            {
                setQuantityNotinCart(quantityNotinCart + 1)
            }
            
        }
        
    }

    const minusItem = (id) => {
        if(!checkCart(id))
        {
            if(HasChild)
            {
                setShowModal(PRODUCT_CHILD_MODAL_DETAIL)
            }
            else 
            {
                setQuantityInCart(quantityInCart - 1)
            }
        }
        else 
        {
            if(HasChild)
            {
                setShowModal(PRODUCT_CHILD_MODAL_DETAIL)
            }
            else
            {
                setQuantityNotinCart(quantityNotinCart - 1)
            }
        }
        
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
                                                <Button size="large" disabled={disableButton(productId)}  onClick={() => {
                                                    minusItem(productId);
                                                }
                                                }>-</Button>
                                            </div>
                                            <div className="inline-buttons" style={{padding: '0 15px'}}>
                                                <div style={{'font-weight': 'bold', color: '#2196F3'}}>{!checkCart(productId) ? quantityInCart : quantityNotinCart}</div>
                                            </div>
                                            <div className="inline-buttons">
                                                <Button size="large" onClick={() => {
                                                    addItem(productId)
                                                }}>+</Button>
                                            </div>                                           
                                        </div>
                                        <div className='product_addtocart' onClick={() => {
                                            if(checkCart(productId))
                                            {
                                                if (HasChild)
                                                {
                                                    setShowModal(PRODUCT_CHILD_MODAL_DETAIL)
                                                }
                                                else 
                                                {
                                                    handleClickAddToCart(dataDetail)
                                                    setShow(false)
                                                }
                                            }
                                            else 
                                            {
                                                if (HasChild)
                                                {
                                                    setShow(false);
                                                }
                                                else
                                                {
                                                    if(quantityInCart > 0)
                                                    {
                                                        handleClickAddToCart(dataDetail);
                                                        setShow(false)
                                                    }
                                                    else if (quantityInCart === 0) 
                                                    {
                                                        handleDeleteItem(dataDetail);
                                                    }
                                                }
                                            }                                           
                                        }}>
                                            {!checkCart(productId) ? <div>Cập nhật giỏ hàng</div> : <div>Thêm vào giỏ hàng</div>}
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
                            <ModalsFactory 
                            showModal={showModal} 
                            idHash={idHash}
                            setShowModal={setShowModal}
                            setIdHash={setIdHash}
                            productId={productId}
                            productName={productName}
                            prepareUpdateCartChild={prepareUpdateCartChild}
                            setprepareUpdateCartChild={setprepareUpdateCartChild}
                            quantityInCart={quantityInCart}
                            setQuantityInCart={setQuantityInCart}
                            />
                        </div>   
            </BasicModal>
    )
}

export default ProductDetail;