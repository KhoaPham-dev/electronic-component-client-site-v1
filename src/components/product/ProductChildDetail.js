import React, { useEffect, useState } from 'react';
import BasicModal from '../common/modal/BasicModal';
import {Row, Col, Spin, Button, List, Modal} from 'antd';
import { DEFAULT_PAGE_SIZE } from '../../constants';
import { actions } from '../../actions';
import { productListSelector, productChildListSelector, tbproductListLoadingSelector } from "../../selectors/product";
import { useDispatch, useSelector } from 'react-redux';
import { AppConstants } from '../../constants';
import noimage from '../../assets/images/noimage.png'
import Utils from '../../utils';
import { itemsCartSelector } from '../../selectors/cart';
const { confirm } = Modal

const ProductChildDetail = ({setShow, productId, productName, productIDSuggestion, productNameSuggestion, prepareUpdateCartChild, setprepareUpdateCartChild, quantityInCart, setQuantityInCart}) => {

    const productListChild = useSelector(productChildListSelector)
    const isLoading = useSelector(tbproductListLoadingSelector);
    const itemsCart = useSelector(itemsCartSelector);
    const dispatch = useDispatch();
    const pagination = { pageSize: DEFAULT_PAGE_SIZE }


    const handleDeleteItem = (index) => {
        confirm({
            title: 'Xóa',
            content: "Bạn có chắc muốn xóa sản phẩm này khỏi giỏ hàng?",
            okText: "Có",
            okType: 'danger',
            cancelText: "Không",
            centered: true,
            onOk: () => {
                minusItem(index)
            },
            onCancel() {
              // console.log('Cancel');
            },
        });
    }

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
          if (AvailableItem(id) === -1)
          {
            return true
          }
          else 
          {
            return false
          }
      }

    const handleClickAddToCart = (product) => {
        const index = itemsCart.findIndex((item) => {
          return item.id === product.id
        })
  
        if(index === -1)
        {
          const newItemsCart = JSON.parse(JSON.stringify(itemsCart));
          newItemsCart.push({
            ...product,
            quantity: 1,
          })
  
          setItemsCart(newItemsCart);
        }
      }
  
        const addItem = (index) => {
          let newItemsCart = JSON.parse(JSON.stringify(itemsCart));
  
          newItemsCart = newItemsCart.map(el =>
            el.id !== index ? el : {...el, quantity: el.quantity + 1}
          )
          setItemsCart(newItemsCart);
          setQuantityInCart(quantityInCart + 1)
      }
  
    const minusItem = (index) => {
          let newItemsCart = JSON.parse(JSON.stringify(itemsCart));
  
          for (let i =0; i < newItemsCart.length; i++)
          {
            if(newItemsCart[i].id === index)
            {
              if(newItemsCart[i].quantity > 1)
              {
                newItemsCart[i] = {...newItemsCart[i], quantity: newItemsCart[i].quantity -1}
                setItemsCart(newItemsCart);
                setQuantityInCart(quantityInCart - 1);
                break;
              }
              else 
              {
                newItemsCart = newItemsCart.filter(el => el !== newItemsCart[i]);
                setItemsCart(newItemsCart);
                setQuantityInCart(quantityInCart - 1)
                break;
              }
            }
          }
      }
  
    const setItemsCart = (newItemsCart) => {
        dispatch(actions.setItemsCart({
            itemsCart: newItemsCart
        }))
    }

    useEffect(() => {
        const page = pagination.current ? pagination.current - 1 : 0;
        dispatch(actions.getProductListClientChild(
            {
                params: {
                    parentId: productId || productIDSuggestion,
                }
            }
        ))
    }, [])

    const { data = [] } = productListChild || {}
    pagination.total = productListChild.totalElements;
    console.log(itemsCart);

    return (
        <BasicModal
        visible={true}
        title = "Danh sách sản phẩm con chi tiết"
        width = {550}
        onCancel={() => {
            setShow(false)
            }}
        centered
        maskClosable
        >
            <Spin size="large" wrapperClassName="full-screen-loading" spinning={isLoading}>
                <div className='container-productchild'>
                    {
                        data.map((el) => {
                            return (
                                <div className='container_row' key={el.id}>
                                    <Row gutter={16}>
                                        <Col span={10}>
                                            <div className='productchild_image'>
                                                <img alt='productchildImg' src={el.productImage ? `${AppConstants.contentRootUrl}${el.productImage}` : noimage}></img>
                                            </div>
                                        </Col>
                                        <Col span={14}>
                                            <div className='productchild_name'>
                                                <h3>{`${productName || productNameSuggestion}  ${el.productName}`}</h3>
                                            </div>
                                            <div className='productchild_price'>
                                                <span>{`${Utils.formatMoney(el.productPrice)}`}</span>
                                            </div>
                                            {AvailableItem(el.id) === -1 ? 
                                            <div className='productchild_addtocart_container'>
                                                <div className='productchild_addtocart' onClick={() => {
                                                    let productChildToCart = {...el, productName: `${productName || productNameSuggestion}  ${el.productName}`}
                                                    handleClickAddToCart(productChildToCart);
                                                    setQuantityInCart(quantityInCart + 1);
                                                }}>
                                                    <div>Thêm vào giỏ hàng</div>
                                                </div>
                                            </div> 
                                            : 
                                            <div className="container-plus-minus-buttons_row">
                                                <div className="inline-buttons_row">
                                                    <Button size="middle" onClick={() => {
                                                    if(itemsCart[AvailableItem(el.id)].quantity > 1)
                                                    {
                                                        minusItem(el.id)
                                                    }
                                                    else {
                                                        handleDeleteItem(el.id);
                                                    }
                                                    
                                                    }
                                                    }>-</Button>
                                                </div>
                                                <div className="inline-buttons_row" style={{padding: '0 15px'}}>
                                                    <div style={{fontWeight: 'bold', color: '#2196F3'}}>{itemsCart[AvailableItem(el.id)].quantity}</div>
                                                </div>
                                                <div className="inline-buttons_row">
                                                    <Button size="middle" onClick={() => {addItem(el.id)}}>+</Button>
                                                </div>
                                            </div>}
                                        </Col>
                                    </Row>
                                </div>
                            )
                        })
                    }
                </div>
            </Spin>
        </BasicModal>
    )
}

export default ProductChildDetail