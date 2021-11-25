import React from 'react';
import {  PictureOutlined } from '@ant-design/icons';

const ImageCol = (value) => {
    if(value)
        return (
            <img className="img-col" src={value} alt=""/>
        )
    return <PictureOutlined className="empty-img-col"/>
}

export default ImageCol;
