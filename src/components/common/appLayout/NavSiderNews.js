import React, { Component } from 'react';
import { Layout, Menu, Spin, Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import { navMenuConfig } from '../../../constants/menuConfig';
import { AppConstants } from '../../../constants'
import {actions} from '../../../actions';
import { connect, useDispatch } from "react-redux";
import { categoryKinds } from '../../../constants/masterData';
import {CaretRightOutlined, BarsOutlined} from '@ant-design/icons'
import {DEFAULT_PAGE_SIZE} from '../../../constants';

const { Sider } = Layout;
const { SubMenu } = Menu;


class NavSiderNews extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loadingMenuItem: null,
        }
        this.pagination = { pageSize: DEFAULT_PAGE_SIZE };
        this.getCategoryTypeNews();
    }

    handleLoadingMenuItem = (menuPath) => {
        this.setState({loadingMenuItem: menuPath})
        return true;
    }

    getList(categoryId) {
        const { getDataList } = this.props;
            const page = this.pagination.current ? this.pagination.current - 1 : 0;
            const params = { page, size: DEFAULT_PAGE_SIZE, categoryId: categoryId};
            getDataList({ params });
      }

    getCategoryTypeNews() {
        const {getCategoryTypeNews} = this.props;
        const params = {kind: categoryKinds.CATEGORY_KIND_NEWS};
        getCategoryTypeNews({params});
      }

    onChangeBreadcrumb(breadcrumbs) {
        this.setState({ breadcrumbs });
    }

    render() {
        const { onToggleNavSide, currentPathname, navSidercollapsed, userData, categoryList, loading, changeBreadcrumb } = this.props;
        const {
            loadingMenuItem,
            breadcrumbs
        } = this.state;

        let CategoryList_News = [];

        if(!loading)
        {
            const newsCategoryList = categoryList.data || [];

            CategoryList_News = [...newsCategoryList];

            CategoryList_News = CategoryList_News.map((el) => {
            return {
                label: el.categoryName,
                value: el.id
            }
        })
        }

        return (
            <div>
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
                        <Menu.Item
                                className="custom-nav-item"
                                key= 'getall'
                                onClick={(e) => {
                                    this.props.changeBreadcrumb([{name: 'Tất cả'}])
                                    this.getList()
                                }}
                                >
                                <Link to={`/news`}>
                                    <span><BarsOutlined/> Tất cả tin tức</span>
                                </Link>
                            </Menu.Item>
                        {!loading && CategoryList_News.map((navMenuItem, idx) =>
                            
                            <Menu.Item
                                className="custom-nav-item"
                                key={navMenuItem.value}
                                onClick={(e) => {
                                    this.props.changeBreadcrumb([{name: navMenuItem.label}])
                                    this.getList(navMenuItem.value)
                                }}
                                >
                                <Link to={`/news?categoryId=${navMenuItem.value}`}>
                                    <span><CaretRightOutlined/> {`${navMenuItem.label}`}</span>
                                </Link>
                            </Menu.Item>
                        )}
                    </Menu>
                </Sider>
            </Spin>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    loading: state.news.tbnewsLoading,
    dataList: state.news.newsData || {},
    categoryList: state.news.newsCategoryType || {}
  });
  
  const mapDispatchToProps = (dispatch) => ({
    getDataList: (payload) => dispatch(actions.getNewsListClient(payload)),
    getCategoryTypeNews: (payload) => dispatch(actions.getCategoryTypeNews(payload)),
  });

export default connect(mapStateToProps, mapDispatchToProps)(NavSiderNews);
