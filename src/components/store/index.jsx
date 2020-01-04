import React, { useContext } from "react"
import products from "../../data/products"
import Cart from "../cart"
import Navbar from "../Navbar"
import AdyenDropin from "../AdyenDropin"

import { CartContext } from "../cart/context"
import './store.css'

export default function Store() {
  const cartCtx = useContext(CartContext)

  return (
    <div className="store-wrapper">
    <Navbar />
    <div className="store">

    <div className="product-wrapper">
      {products.map(product => (
        <div className="product-item" key={product.id}>
          <div className="product-image-container">
            <img
              className="product-image"
              src={`/images/${product.sku}.jpg`}
              alt={product.name}
              width={50}
            />
          </div>
          <div className="product-name">{product.name}</div>
          <div className="product-price">{product.price} €</div>

          <div>
            <button className="button-shop"onClick={() => cartCtx.addToCart(product)}>
              Add to cart
            </button>
          </div>
        </div>
      ))}
      </div>
      <div className="cart-container">
        <Cart />
        <AdyenDropin />
        {/* <Dropin /> */}

        </div>
    </div>
    </div>
  )
}