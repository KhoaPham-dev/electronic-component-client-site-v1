import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { productListSelector } from "../../selectors/product";
import {actions} from '../../actions/product';
import { List, Card, Avatar } from 'antd';
import {ShoppingCartOutlined} from '@ant-design/icons'

const { Meta } = Card;

const ProductListPage = () => {

    const productList = useSelector(productListSelector)
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
        <div>
            {
                <List
                grid={{ gutter: 16, column: 4 }}
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
                        style={{ width: 280}} 
                        hoverable
                        cover={<img alt="example" src="https://i.pinimg.com/564x/75/b6/f8/75b6f831a9c0b392cc15befc2ae110fd.jpg" style={{height: '200px'}} />}
                        actions={[<ShoppingCartOutlined key = 'Shopping cart'/>]}
                        >{`${item.productPrice} Đ`}</Card>
                  </List.Item>
                )}
              />
            }
        </div>
    )
}

export default ProductListPage;