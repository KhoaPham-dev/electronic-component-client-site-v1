import React, { Component } from 'react';
import { Layout, Menu, Spin } from 'antd';
import { Link } from 'react-router-dom';
import { navMenuConfig } from '../../../constants/menuConfig';
import { AppConstants } from '../../../constants'
import {actions} from '../../../actions';
import { connect, useDispatch } from "react-redux";
import { categoryKinds } from '../../../constants/masterData';

const { Sider } = Layout;
const { SubMenu } = Menu;


class NavSider extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loadingMenuItem: null,
        }
        this.getCategoryTypeProducts();
    }

    handleLoadingMenuItem = (menuPath) => {
        this.setState({loadingMenuItem: menuPath})
        return true;
    }

    getList(categoryId) {
        const { getDataList } = this.props;
            const page = 0;
            const params = { page, size: 13, categoryId: categoryId};
            getDataList({ params });
      }

    getCategoryTypeProducts() {
        const {getCategoryTypeProducts} = this.props;
        const params = {kind: categoryKinds.CATEGORY_KIND_PRODUCT};
        getCategoryTypeProducts({params});
      }

    render() {
        const { onToggleNavSide, currentPathname, navSidercollapsed, userData, categoryList, loading } = this.props;
        const {
            loadingMenuItem,
        } = this.state;

        let CategoryList = [];

        if(!loading)
        {
            const productCategoryList = categoryList.data || [];

            CategoryList = [...productCategoryList];

            CategoryList = CategoryList.map((el) => {
            return {
                label: el.categoryName,
                value: el.id
            }
        })
        }

        return (
            <Spin size="small" wrapperClassName="full-screen-loading" spinning={loading}>
                <Sider
                    width={200}
                    // collapsible
                    collapsed={navSidercollapsed}
                    onCollapse={onToggleNavSide}
                    className={navSidercollapsed ? 'nav-sider nav-sider__collapsed' : 'nav-sider nav-sider__expanded'}
                    >
                    <Menu
                        theme="dark"
                        mode="inline"
                        className="custom-nav"
                    >
                        {!loading && CategoryList.map((navMenuItem, idx) =>
                            
                            <Menu.Item
                                className="custom-nav-item"
                                key={navMenuItem.value}
                                onClick={(e) => {
                                    this.getList(navMenuItem.value)
                                }}
                                >
                                <Link to={`/productList?categoryId=${navMenuItem.value}`}>
                                    <span>{navMenuItem.label}</span>
                                </Link>
                            </Menu.Item>
                        )}
                    </Menu>
                </Sider>
            </Spin>
        )
    }
}

const mapStateToProps = (state) => ({
    loading: state.product.tbproductLoading,
    dataList: state.product.productData || {},
    categoryList: state.product.productCategoryType || {}
  });
  
  const mapDispatchToProps = (dispatch) => ({
    getDataList: (payload) => dispatch(actions.getProductListClient(payload)),
    getCategoryTypeProducts: (payload) => dispatch(actions.getCategoryTypeProducts(payload)),
  });

export default connect(mapStateToProps, mapDispatchToProps)(NavSider);
