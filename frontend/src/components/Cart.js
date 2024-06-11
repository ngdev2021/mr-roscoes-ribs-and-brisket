import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Cart.css';

const Cart = ({ cart, setCart }) => {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const calculateTotal = () => {
      const totalAmount = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
      setTotal(totalAmount);
    };
    calculateTotal();
  }, [cart]);

  const handleQuantityChange = (index, delta) => {
    const newCart = [...cart];
    newCart[index].quantity += delta;
    if (newCart[index].quantity <= 0) {
      newCart.splice(index, 1);
    }
    setCart(newCart);
  };

  return (
    <div className="cart-container">
      <h1>Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div className="cart-content">
          <div className="cart-header">
            <p>Item</p>
            <p>Quantity</p>
            <p>Price</p>
            <p>Total Price</p>
          </div>
          {cart.map((item, index) => (
            <div key={index} className="cart-item">
              <div className="item-details">
                <img src={item.image} alt={item.name} className="item-image" />
                <div className="item-info">
                  <h2>{item.name}</h2>
                  <p>{item.description}</p>
                  <button onClick={() => handleQuantityChange(index, -item.quantity)} className="remove-btn">Remove</button>
                </div>
              </div>
              <div className="item-quantity">
                <button onClick={() => handleQuantityChange(index, -1)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => handleQuantityChange(index, 1)}>+</button>
              </div>
              <p>${item.price.toFixed(2)}</p>
              <p>${(item.price * item.quantity).toFixed(2)}</p>
            </div>
          ))}
          <div className="cart-footer">
            <div className="total">
              <h2>Subtotal:</h2>
              <p>${total.toFixed(2)}</p>
            </div>
            <div className="checkout-buttons">
              <Link to="/menu" className="continue-shopping-btn">Continue Shopping</Link>
              <Link to="/order" className="checkout-btn">Checkout</Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
