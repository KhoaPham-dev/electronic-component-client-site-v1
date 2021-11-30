import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import Cart from '../../components/cart/Cart'

import { itemsCartSelector } from '../../selectors/cart'
import { productListSelector } from '../../selectors/product'
import { actions } from '../../actions'

function CartContainer({
    setShow,
}) {
    const dispatch = useDispatch()
    const history = useHistory()
    const selectedItems = useSelector(itemsCartSelector)
    const productList = useSelector(productListSelector)?.data || []
    const [totalPrice, setTotalPrice] = useState(0)

    const setSelectedItems = (newItems) => {
        dispatch(actions.setItemsCart({
            itemsCart: newItems
        }))
    }

    const updateSelectedItems = (key, value, index) => {
        setSelectedItems(selectedItems.map((item, i) => {
            if(i === index) return {
                ...item,
                [key]: value,
            }
            return item
        }))
    }

    const addItem = (index) => {
        updateSelectedItems('quantity', selectedItems[index].quantity + 1, index)
    }

    const minusItem = (index) => {
        updateSelectedItems('quantity', selectedItems[index].quantity - 1, index)
    }

    const editNoteItem = (index) => {
        updateSelectedItems('isShowNote', !selectedItems[index].isShowNote, index)
    }

    const handleSubmitNote = (value, index) => {
        setSelectedItems(selectedItems.map((item, i) => {
            if(i === index) return {
                ...item,
                note: value,
                isShowNote: false
            }
            return item
        }))
    }

    const deleteItem = (index) => {
        const newSelectedItems = selectedItems.filter((item, i) => i !== index)
        setSelectedItems(newSelectedItems)
        if(newSelectedItems.length <= 0) {
            setShow(false)
        }
    }

    const calculateTotalPrice = () => {
        setTotalPrice(selectedItems.reduce((acc, cur) => {
            const product = productList.find(p => p.id === cur.id) || {}
            return acc + (cur.quantity * (product.productPrice - product.productPrice * ((product.saleoff || 0) / 100)))
        }, 0))
    }

    const handleGoToPayment = (value) => {
    }

    useEffect(() => {
        calculateTotalPrice()
    }, [selectedItems, productList])

    return (
        <Cart
        selectedItems={selectedItems}
        totalPrice={totalPrice}
        productList={productList}
        addItem={addItem}
        editNoteItem={editNoteItem}
        minusItem={minusItem}
        deleteItem={deleteItem}
        handleGoToPayment={handleGoToPayment}
        handleSubmitNote={handleSubmitNote}
        setShow={setShow}
        />
    )
}

export default CartContainer
