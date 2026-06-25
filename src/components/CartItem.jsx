import React from 'react';

const CartItem = ({ item, onIncrease, onDecrease, onRemove }) => {
  return (
    <li key={item.id} className="cart-item">
      <img src={item.image} alt={item.title} />
      <div className="cart-details">
        <p className="product-title">{item.title}</p>
      </div>
      <p className="product-price">R$ {item.price.toFixed(2)}</p>
      <div className="quantity-actions">
        <button onClick={() => onDecrease(item.id)}>-</button>
        <span className="product-quantity">{item.quantity}</span>
        <button onClick={() => onIncrease(item.id)}>+</button>
      </div>
      <button className="remove-btn" onClick={() => onRemove(item.id)}>
        Remover
      </button>
    </li>
  );
};

export default CartItem;
