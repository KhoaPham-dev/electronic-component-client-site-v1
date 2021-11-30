import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { productListSelector, tbproductListLoadingSelector } from "../../selectors/product";
import {itemsCartSelector} from '../../selectors/cart';
import {actions} from '../../actions';
import { List, Card, Spin } from 'antd';
import {AppConstants} from '../../constants/index';
import noimage from '../../assets/images/noimage.png';


const { Meta } = Card;

const ProductListPage = () => {

    const productList = useSelector(productListSelector)
    const isLoading = useSelector(tbproductListLoadingSelector);
    const itemsCart = useSelector(itemsCartSelector);
    console.log(itemsCart);
    const dispatch = useDispatch();

    const handleClickItem = (id) => {
      const index = itemsCart.findIndex((item) => {
        return item.id === id
      })

      if(index == -1)
      {
        const newItemsCart = JSON.parse(JSON.stringify(itemsCart));
        newItemsCart.push({
          id,
          quantity: 1
        })

        setItemsCart(newItemsCart);
      }
    }
    const setItemsCart = (newItemsCart) => {
      dispatch(actions.setItemsCart({
          itemsCart: newItemsCart
      }))
  }

    useEffect(() => {
        dispatch(actions.getProductListClient(
            {
                params: {
                    // categoryId: 88,
                    page: 0,
                    size: 13,
                }
            }
        ))
    }, [])
    
    const { data = [] } = productList || {}
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
                      console.log(page);
                    },
                    pageSize: 12,
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
                            description={`${item.productPrice} Đ`}
                          />
                        </Card>
                        <div className="button-add-to-cart" onClick={() => {handleClickItem(item.id)}}>
                          <div>Thêm vào giỏ hàng</div>
                        </div>
                  </List.Item>
                )}
              />
            }
        </Spin>
    )
}

export default ProductListPage;