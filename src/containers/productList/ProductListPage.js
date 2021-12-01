import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { productListSelector, tbproductListLoadingSelector } from "../../selectors/product";
import {itemsCartSelector} from '../../selectors/cart';
import {actions} from '../../actions';
import { List, Card, Spin, Button } from 'antd';
import {AppConstants} from '../../constants/index';
import noimage from '../../assets/images/noimage.png';
import Utils from '../../utils';
import {DEFAULT_PAGE_SIZE} from '../../constants';


const { Meta } = Card;

const ProductListPage = () => {

    const productList = useSelector(productListSelector)
    const isLoading = useSelector(tbproductListLoadingSelector);
    const itemsCart = useSelector(itemsCartSelector);
    console.log(itemsCart);
    const dispatch = useDispatch();

    const pagination = { pageSize: DEFAULT_PAGE_SIZE }

    const AvailableItem = (id) => {
      const indexItemsCart = itemsCart.findIndex((item) => {
        return item.id === id;
      })

      return indexItemsCart;
    }

    const handleClickAddToCart = (id) => {
      const index = itemsCart.findIndex((item) => {
        return item.id === id
      })

      if(index === -1)
      {
        const newItemsCart = JSON.parse(JSON.stringify(itemsCart));
        newItemsCart.push({
          id,
          quantity: 1
        })

        setItemsCart(newItemsCart);
      }
    }

      const addItem = (index) => {
        let newItemsCart = JSON.parse(JSON.stringify(itemsCart));

        newItemsCart = newItemsCart.map(el =>
          el.id !== index ? el : {id: el.id, quantity: el.quantity + 1}
        )
        setItemsCart(newItemsCart);
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
              break;
            }
            else 
            {
              newItemsCart = newItemsCart.filter(el => el !== newItemsCart[i]);
              setItemsCart(newItemsCart);
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
        dispatch(actions.getProductListClient(
            {
                params: {
                    // categoryId: 88,
                    page: page,
                    size: pagination.pageSize,
                }
            }
        ))
    }, [])
    
    const { data = [] } = productList || {}
    pagination.total = productList.totalElements;
    console.log(pagination.total);
    console.log(data);

    function areEquals(a, b) {
      var keys1 = Object.keys(a)
      var keys2 = Object.keys(b)

      if(a['categoryId'] !== b['categoryId'])
      {
        return false;
      }
      return true ;
    }
    function checkArray(arr) {
      for (var i = 1; i < data.length; i++) {
        if (!areEquals(arr[0], arr[i])) return false
      }
      return true
    }

    console.log(checkArray(data));
    return (
        <Spin size="large" wrapperClassName="full-screen-loading" spinning={isLoading}>
            {
                <List
                grid={{ 
                  gutter: 16, 
                  column: 4,
                  xs: 1,
                  sm: 2,
                  md: 3,
                  lg: 4,
                  xxl: 3, }}
                dataSource={data}
                pagination={{
                    onChange: page => {
                      dispatch(actions.getProductListClient(
                          {
                              params: {
                                  categoryId: checkArray(data) ? data[0].categoryId : null,
                                  page: page -1,
                                  size: pagination.pageSize,
                              }
                          }
                      ))
                    },
                    ...pagination,
                    showSizeChanger: false, 
                    hideOnSinglePage: true
                  }}
                renderItem={item => (
                  <List.Item>
                    <Card 
                        style={{border: '1px solid #d9d9d'}}
                        hoverable
                        cover={<img alt="example" src= {item.productImage ? `${AppConstants.contentRootUrl}${item.productImage}` : noimage} />}
                        onClick={() => {console.log('Card clicked!')}}
                        >
                          <Meta
                            style={{alignItems: 'center'}}
                            title={item.productName} 
                            description={`${Utils.formatNumber(item.productPrice)} Đ`}
                          />
                        </Card>
                          { AvailableItem(item.id) === -1 ? 
                            <div className="button-add-to-cart" onClick={() => {handleClickAddToCart(item.id)}}>
                              <div>Thêm vào giỏ hàng</div>
                            </div>
                          :
                            <div className="container-plus-minus-buttons">
                              <div className="inline-buttons">
                                <Button danger = {true} size="large" onClick={() => {minusItem(item.id)}}>-</Button>
                              </div>
                              <div className="inline-buttons">
                                <div>{itemsCart[AvailableItem(item.id)].quantity}</div>
                              </div>
                              <div className="inline-buttons">
                                <Button size="large" onClick={() => {addItem(item.id)}}>+</Button>
                              </div>
                            </div>
                          }
                  </List.Item>
                )}
              />
            }
        </Spin>
    )
}

export default ProductListPage;