import React, { useState, useEffect, useContext } from "react"
import { CartContext } from "./context"
import AdyenDropin from '../AdyenDropin';
import { Redirect } from 'react-router-dom';

import './cart.scss'


function formatPrice(price) {
  return `${(price ).toFixed(2)} €`
}

function totalPrice(items) {
  return items.reduce((acc, item) => acc + item.quantity * item.price, 0.0)
}

export default function Cart({ adyenToken }) {
  const ctx = useContext(CartContext)
  
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    setRedirect(true); // Probably need to set redirect based on some condition
  }, []);

  
  function checkout() {
    AdyenDropin.redirectToCheckout({
      products: ctx.items.map(item => ({
        quantity: item.quantity,
        sku: item.sku
      })),
      successUrl: "https://your-website.com/success",
      cancelUrl: "https://your-website.com/canceled"
    })
  }


  return (
    <div className="cart-container">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Image</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
        </thead>

        <tbody className="cart">
          {ctx.items.map(item => (
            <tr className="items" key={item.id}>
              <td className="itemName" >{item.name}</td>
              <td className="infoWrap">
                <img
                  src={`/images/${item.sku}.jpg`}
                  alt={item.name}
                  width={50}
                />
              </td>
              <td >{item.quantity}</td>
              <td className="itemNumber">{formatPrice(item.price * item.quantity)}</td>
            </tr>
          ))}
          <tr>
            <td style={{ textAlign: "right" }} colSpan={3}>
              Total:
            </td>
            <td>{formatPrice(totalPrice(ctx.items))}</td>
          </tr>

          <tr>
            <td style={{ textAlign: "right" }} colSpan={4}>
              <button className="button-shop" onClick={redirect}>Checkout</button>
            </td>

          </tr>
        </tbody>
      </table>
    </div>
  )
}