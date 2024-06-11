import React, { useState, useEffect } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import axios from 'axios';
import './Payment.css';

const Payment = ({ totalAmount, clearCart }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [clientSecret, setClientSecret] = useState('');

    useEffect(() => {
        const createPaymentIntent = async () => {
            try {
                const response = await axios.post('/api/payment/create-payment-intent', { amount: totalAmount });
                console.log('Client Secret:', response.data.clientSecret); // For debugging
                setClientSecret(response.data.clientSecret);
            } catch (error) {
                console.error('Error creating payment intent:', error);
            }
        };

        createPaymentIntent();
    }, [totalAmount]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const cardElement = elements.getElement(CardElement);

        const result = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: cardElement,
                billing_details: {
                    name: 'Customer Name',
                },
            },
        });

        if (result.error) {
            console.error('Payment failed:', result.error.message);
        } else {
            if (result.paymentIntent.status === 'succeeded') {
                clearCart();
                console.log('Payment successful!');
                // Show success message or redirect to success page
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className="payment-form">
            <CardElement />
            <button type="submit" disabled={!stripe || !clientSecret}>Pay</button>
        </form>
    );
};

export default Payment;
