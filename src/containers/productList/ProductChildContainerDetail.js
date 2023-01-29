import React from 'react';

import ProductChildDetail from '../../components/product/ProductChildDetail';

const ProductChildContainerDetail = ({setShow, productId, productName, productIDSuggestion, productNameSuggestion, prepareUpdateCartChild, setprepareUpdateCartChild, quantityInCart, setQuantityInCart}) => {



    return (
        <ProductChildDetail
        setShow={setShow}
        productId={productId}
        productName={productName}
        productIDSuggestion={productIDSuggestion}
        productNameSuggestion={productNameSuggestion}
        prepareUpdateCartChild={prepareUpdateCartChild}
        setprepareUpdateCartChild={setprepareUpdateCartChild}
        quantityInCart={quantityInCart}
        setQuantityInCart={setQuantityInCart}
        />
    )
}

export default ProductChildContainerDetail ;