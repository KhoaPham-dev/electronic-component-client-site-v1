import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { productListSelector, tbproductListLoadingSelector } from "../../selectors/product";
import {actions} from '../../actions/product';
import { List, Card, Spin } from 'antd';
import {ShoppingCartOutlined} from '@ant-design/icons'

const { Meta } = Card;

const ProductListPage = () => {

    const productList = useSelector(productListSelector)
    const isLoading = useSelector(tbproductListLoadingSelector);
    console.log(isLoading);
    const dispatch = useDispatch();
    console.log(productList);
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
                  gutter: 8, 
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
                        title={item.productName} 
                        style={{ width: 250, border: 'solid'}}
                        hoverable
                        cover={<img alt="example" src="https://i.pinimg.com/564x/75/b6/f8/75b6f831a9c0b392cc15befc2ae110fd.jpg" style={{height: '200px'}} />}
                        actions={[<ShoppingCartOutlined key = 'Shopping cart'/>]}
                        >{`${item.productPrice} Đ`}</Card>
                  </List.Item>
                )}
              />
            }
        </Spin>
    )
}

export default ProductListPage;