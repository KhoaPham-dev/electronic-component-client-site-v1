import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import ProductDetail from '../../components/product/ProductDetail';

const ProductDetailContainer = ({setShow, productId}) => {

    return (
        <ProductDetail
        setShow={setShow}
        productId={productId}
        />
    )
}

export default ProductDetailContainer;