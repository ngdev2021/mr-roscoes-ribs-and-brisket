const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// Create a new order
router.post('/', async (req, res) => {
    const { name, email, phone, items } = req.body;

    if (!name || !email || !phone || !items || items.length === 0) {
        return res.status(400).json({ message: 'All fields are required and items cannot be empty' });
    }

    try {
        const newOrder = new Order({
            name,
            email,
            phone,
            items,
            total: items.reduce((total, item) => total + item.price * item.quantity, 0)
        });

        const savedOrder = await newOrder.save();
        res.status(200).json(savedOrder);
    } catch (error) {
        res.status(500).json({ message: 'Error creating order', error });
    }
});

module.exports = router;
