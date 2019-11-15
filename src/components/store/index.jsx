import React from 'react';
import products from '../../data/products'

export default function Store() {
  return <div>
    { products.map(product => 
      <div>
        <div className="product-name">
          {product.title}
        </div>

        <div className="product-image">
        <img src={`/images/${product.sku}.jpg`}
                  alt={product.title} 
                  width={50}/>
        </div>
      </div>
    
      )
    }
  
  </div>
}