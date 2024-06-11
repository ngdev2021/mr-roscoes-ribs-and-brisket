import React from 'react';
import './OrderSummary.css';

const OrderSummary = ({ order }) => {
  return (
    <div className="ordersummary-container">
      <h1>Order Summary</h1>
      <p>Thank you for your order, {order.name}!</p>
      <p>Your order will be ready in approximately 30 minutes.</p>
      <div className="order-details">
        <h2>Order Details:</h2>
        {order.items.map((item, index) => (
          <div key={index} className="order-item">
            <p>{item.name} x {item.quantity}</p>
            <p>${item.price * item.quantity}</p>
          </div>
        ))}
        <h2>Total: ${order.total}</h2>
      </div>
    </div>
  );
};

export default OrderSummary;
