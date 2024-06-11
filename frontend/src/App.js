import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Home from './components/Home';
import Menu from './components/Menu';
import Cart from './components/Cart';
import OrderForm from './components/OrderForm';
import OrderSummary from './components/OrderSummary';
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const App = () => {
    const [cart, setCart] = useState([]);

    const addToCart = (item, quantity) => {
        const existingItem = cart.find(cartItem => cartItem._id === item._id);

        if (existingItem) {
            setCart(cart.map(cartItem =>
                cartItem._id === item._id
                    ? { ...cartItem, quantity: cartItem.quantity + quantity }
                    : cartItem
            ));
        } else {
            setCart([...cart, { ...item, quantity }]);
        }
    };

    return (
        <>
            <Header cart={cart} />
            <Elements stripe={stripePromise}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/menu" element={<Menu addToCart={addToCart} />} />
                    <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
                    <Route path="/order" element={<OrderForm cart={cart} setCart={setCart} />} />
                    <Route path="/summary" element={<OrderSummary />} />
                </Routes>
            </Elements>
            <Footer />
        </>
    );
};

export default App;
