import React from 'react';

import ProductChild from '../../components/product/ProductChild'

const ProductChildContainer = ({setShow, productId, productName, handleClickAddToCart, AvailableItem, minusItem, addItem, handleDeleteItem}) => {



    return (
        <ProductChild
        setShow={setShow}
        productId={productId}
        productName={productName}
        handleClickAddToCart={handleClickAddToCart}
        AvailableItem={AvailableItem}
        minusItem={minusItem}
        addItem={addItem}
        handleDeleteItem={handleDeleteItem} 
        />
    )
}

export default ProductChildContainer ;