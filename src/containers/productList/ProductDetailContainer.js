import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import ProductDetail from '../../components/product/ProductDetail';

const ProductDetailContainer = ({setShow, categoryID, productId, productName, HasChild}) => {

    return (
        <ProductDetail
        setShow={setShow}
        categoryID={categoryID}
        productId={productId}
        productName={productName}
        HasChild={HasChild}
        />
    )
}

export default ProductDetailContainer;