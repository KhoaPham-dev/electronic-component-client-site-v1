import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {getNewsId, categoryListSelector} from '../../selectors/news'
import { actions } from '../../actions';
import Utils from '../../utils';
import { AppConstants } from '../../constants';
import { Spin, BackTop } from 'antd';
import { categoryKinds } from '../../constants/masterData';
import {ArrowUpOutlined} from '@ant-design/icons'

const NewsDetail = (breadcrumbs) => {

    const newsId = useSelector(getNewsId);
    const categoryListNews = useSelector(categoryListSelector);
    console.log(categoryListNews);
    const [dataDetail, setdataDetail] = useState({});
    const [isLoading, setisLoading] = useState(true);
    const dispatch = useDispatch();
    console.log(breadcrumbs);

    useEffect(() => {
        const params = {id: newsId[0].id}
        dispatch(actions.getNewsByIdClient(
            {params,
                onCompleted: ({data}) => {
                    setdataDetail(data);
                    const params = {kind: categoryKinds.CATEGORY_KIND_NEWS};
                    dispatch(actions.getCategoryTypeNews({params}))
                    setisLoading(false);
                },
                onError: (err) => {
                    console.log(err);
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
                
            const dataNewsIndex = dataNews.findIndex((el) => {
                    return el.id === dataDetail.categoryId
                    })
            if (dataNewsIndex === -1)
            {
                console.log(dataNewsIndex)
            }
            else
            {
                console.log(dataNewsIndex);
                breadcrumbs.changeBreadcrumb([
                    {name: `${dataNews[dataNewsIndex].categoryName}`,
                    path: `/news?categoryId=${dataNews[dataNewsIndex].id}`},
                    {name: `${dataDetail.title}`}])
            }
        }

    }, [categoryListNews])

    const style = {
        height: 40,
        width: 40,
        lineHeight: '40px',
        borderRadius: 4,
        backgroundColor: '#1088e9',
        color: '#fff',
        textAlign: 'center',
        fontSize: 14,
      };

    return (
        <div className='newsdetail_container'>
            <Spin size="small" wrapperClassName="full-screen-loading" spinning={isLoading}>
                <div className='content'>
                    <div dangerouslySetInnerHTML={{ __html: dataDetail && dataDetail.description ? Utils.replaceUrlHelper(dataDetail.description, "{{baseUrl}}", AppConstants.contentRootUrl) : null}}></div>
                </div>
                <BackTop>
                    <div style={style}><ArrowUpOutlined /></div>
                </BackTop>
            </Spin>
        </div>
    )
}

export default NewsDetail;