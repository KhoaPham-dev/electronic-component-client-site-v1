import React from 'react'
import ReactDOM from "react-dom"

const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });

function PayPal({
    value,
    formRef,
}) {
    const createOrder = (data, actions) => {
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        value: Math.floor(value / 23000),
                    },
                },
            ],
        });
    }

    const onApprove = (data, actions) => {
        return actions.order.capture().then((details) => {
            formRef.current.submit()
        })
    }

    return (
        <PayPalButton
        createOrder={(data, actions) => createOrder(data, actions)}
        onApprove={(data, actions) => onApprove(data, actions)}
        style= {{
            layout: 'horizontal',
            color: 'blue'
        }}
        />
    );
}

export default PayPal
