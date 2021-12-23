import React, { useEffect, useState } from 'react';
import BasicModal from '../common/modal/BasicModal';
import {Row, Col, Spin, Button, List} from 'antd';
import { DEFAULT_PAGE_SIZE } from '../../constants';
import { actions } from '../../actions';
import { productListSelector, productChildListSelector, tbproductListLoadingSelector } from "../../selectors/product";
import { useDispatch, useSelector } from 'react-redux';
import { AppConstants } from '../../constants';
import noimage from '../../assets/images/noimage.png'
import Utils from '../../utils';
import { itemsCartSelector } from '../../selectors/cart';

const ProductChild = ({setShow, productId, productName, handleClickAddToCart,AvailableItem, minusItem, addItem, handleDeleteItem}) => {

    const productListChild = useSelector(productChildListSelector)
    const isLoading = useSelector(tbproductListLoadingSelector);
    const itemsCart = useSelector(itemsCartSelector);
    const dispatch = useDispatch();
    const pagination = { pageSize: DEFAULT_PAGE_SIZE }

    const [reloadState, setReloadstate] = useState('');

    useEffect(() => {
        const page = pagination.current ? pagination.current - 1 : 0;
        dispatch(actions.getProductListClientChild(
            {
                params: {
                    parentId: productId,
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
        title = "Danh sách sản phẩm con"
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
                                                <h3>{`${productName}  ${el.productName}`}</h3>
                                            </div>
                                            <div className='productchild_price'>
                                                <span>{`${Utils.formatMoney(el.productPrice)}`}</span>
                                            </div>
                                            {AvailableItem(el.id) === -1 ? 
                                            <div className='productchild_addtocart_container'>
                                                <div className='productchild_addtocart' onClick={() => {
                                                    let productChildToCart = {...el, productName: `${productName}  ${el.productName}`}
                                                    setReloadstate('Reloaded');
                                                    handleClickAddToCart(productChildToCart);
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

export default ProductChild