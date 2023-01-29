import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import ProductDetailSuggestion from '../../components/product/ProductDetailSuggestion';

const ProductDetailContainerSuggestion = ({setShow, productIDSuggestion, productNameSuggestion, HasChildSuggestion}) => {

    return (
        <ProductDetailSuggestion
        setShow={setShow}
        productIDSuggestion={productIDSuggestion}
        productNameSuggestion={productNameSuggestion}
        HasChildSuggestion={HasChildSuggestion}
        />
    )
}

export default ProductDetailContainerSuggestion ;