import React, { useEffect, useState } from "react";
import {newsListSelector, tbnewsListLoadingSelector, categoryListSelector} from '../../selectors/news';
import { useDispatch, useSelector } from "react-redux";
import { DEFAULT_TABLE_ITEM_SIZE } from "../../constants";
import {actions} from '../../actions';
import { Spin, List } from "antd";
import {AppConstants} from '../../constants/index';
import noimage from '../../assets/images/noimage.png';
import {UserOutlined} from '@ant-design/icons'
import { categoryKinds } from '../../constants/masterData';

const NewsContainer = ({changeBreadcrumb, breadcrumbs}) => {

    const newsList = useSelector(newsListSelector)
    const isLoading = useSelector(tbnewsListLoadingSelector)
    const categoryListNews = useSelector(categoryListSelector);

    const dispatch = useDispatch();

    const pagination = { pageSize: DEFAULT_TABLE_ITEM_SIZE }

    useEffect(() => {
        const page = pagination.current ? pagination.current - 1 : 0;
        const params = {kind: categoryKinds.CATEGORY_KIND_NEWS};
        dispatch(actions.getCategoryTypeNews({params}))      

        dispatch(actions.getNewsListClient(
            {
                params: {
                    // categoryId: 88,
                    page: page,
                    size: pagination.pageSize,
                }
            }
        ))
    }, [])

    useEffect(() => {

      console.log(categoryListNews.data);
      if(typeof categoryListNews.data === 'undefined')
      {
          console.log(undefined);
      }
      else 
      {
          const dataNews = [...categoryListNews.data];
          console.log(dataNews);
          
          console.log(breadcrumbs);
          if (breadcrumbs.length === 0)
          {
            console.log('/');
          }
          else 
          {
          const dataNewsIndex = dataNews.findIndex((el) => {
                  return el.categoryName === breadcrumbs[0].name
                })
            if (dataNewsIndex === -1)
            {
                console.log(dataNewsIndex)
            }
            else
            {
              changeBreadcrumb([{name: breadcrumbs[0].name}])
              const page = pagination.current ? pagination.current - 1 : 0;
              dispatch(actions.getNewsListClient(
                {
                    params: {
                        categoryId: categoryListNews.data[dataNewsIndex].id,
                        page: page,
                        size: pagination.pageSize,
                    }
                }
            ))
            }
          }
          
      }

  }, [categoryListNews])


    const { data = [] } = newsList || {}
    pagination.total = newsList.totalElements;

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

      return (
        <div className="news_container">
          <Spin size="large" wrapperClassName="full-screen-loading" spinning={isLoading}>
              {
                  <List
                  size="large"
                  itemLayout="vertical"
                  dataSource={data}
                  pagination={{
                      onChange: page => {
                        dispatch(actions.getNewsListClient(
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
                    <List.Item 
                      key={item.id}
                      extra= {
                          <img
                          alt="example"
                          style = {{'height': '205px', 'width': '340px'}} 
                          src= {item.avatar ? `${AppConstants.contentRootUrl}${item.avatar}` : noimage}/>
                      }
                      onClick={() => {
                        dispatch(actions.getNewsId({newsId: [{id: item.id}]}))
                      }}
                      >
                          <div className="news_container_title">
                            <a onClick={() => {
                              dispatch(actions.getNewsId({newsId: [{id: item.id}]}))
                            }} href={`/newsDetail`}>{item.title}</a>
                          </div> 
                          <List.Item.Meta
                          avatar={<UserOutlined />}
                          title={`${item.createdBy} ${item.createdDate}`}
                          description={item.content}
                          />
                          <a onClick={() => {
                            dispatch(actions.getNewsId({newsId: [{id: item.id}]}))
                          }} href={`/newsDetail`}>Xem thêm</a> 
                    </List.Item>
                  )}
                />
              }
          </Spin>
        </div>
    )
}

export default NewsContainer;