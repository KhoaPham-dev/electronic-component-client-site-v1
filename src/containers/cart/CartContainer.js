import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import Cart from '../../components/cart/Cart'

import { selectedItemsSelector } from '../../selectors/cart'
import { productListSelector } from '../../selectors/product'
import { actions } from '../../actions'

function CartContainer() {
    const dispatch = useDispatch()
    const history = useHistory()
    const selectedItems = useSelector(selectedItemsSelector)
    const productList = useSelector(productListSelector)
    const [totalPrice, setTotalPrice] = useState(0)

    const setSelectedItems = (newItems) => {
        dispatch(actions.setItemsCart({
            selectedItems: newItems
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
        setSelectedItems(selectedItems.filter((item, i) => i !== index))
    }

    const calculateTotalPrice = () => {
        setTotalPrice(selectedItems.reduce((acc, cur) => {
            const product = productList.find(p => p.id === cur.id) || {}
            return acc + (cur.quantity * (product.productPrice - product.productPrice * (product.saleoff / 100)))
        }, 0))
    }

    const handleGoToPayment = (value) => {
    }

    useEffect(() => {
        calculateTotalPrice()
        if(selectedItems.length <= 0) {
            setShowModal(false)
        }
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
        setShow={setShowModal}
        show={showModal}
        />
    )
}

export default CartContainer
