import React, { useState } from 'react';
import axios from 'axios';
import Payment from './Payment';
import './OrderForm.css';

const OrderForm = ({ cart, setCart }) => {
    const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
    const [orderSubmitted, setOrderSubmitted] = useState(false);
    const [orderNumber, setOrderNumber] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/orders', { ...formData, items: cart });
            if (response.status === 200) {
                setOrderSubmitted(true);
                setOrderNumber(1000 + Math.floor(Math.random() * 9000)); // Generate a random order number starting from 1000
            }
        } catch (error) {
            console.error('Error placing order:', error);
            alert('Failed to place order. Please try again.');
        }
    };

    const clearCart = () => {
        setCart([]);
    };

    const totalAmount = cart.reduce((total, item) => total + item.price * item.quantity, 0) * 100; // Convert to cents

    return (
        <div className="checkout-container">
            {!orderSubmitted ? (
                <>
                    <h1>Checkout</h1>
                    <div className="checkout-form">
                        <div className="billing-details">
                            <h2>Billing Details</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label>Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        autoComplete="off"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        autoComplete="off"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Phone</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                        autoComplete="off"
                                    />
                                </div>
                                <button type="submit" className="submit-order-btn">Submit Order</button>
                            </form>
                        </div>
                        <div className="payment-details">
                            <h2>Payment Information</h2>
                            <Payment totalAmount={totalAmount} clearCart={clearCart} />
                        </div>
                    </div>
                </>
            ) : (
                <div className="order-summary">
                    <h2>Order Placed Successfully!</h2>
                    <p>Your order number is <strong>{orderNumber}</strong></p>
                </div>
            )}
        </div>
    );
};

export default OrderForm;
