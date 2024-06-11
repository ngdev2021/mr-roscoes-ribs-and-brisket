#!/bin/bash

# Set environment variables
export PORT=5000
export MONGODB_URI="mongodb+srv://ngdev21:rylan07a@cluster0.34tiicv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

# Create project directory
mkdir mr-roscoes-ribs-and-brisket
cd mr-roscoes-ribs-and-brisket

# Initialize backend
mkdir backend
cd backend
npm init -y
npm install express mongoose dotenv cors body-parser stripe

# Create necessary files
touch server.js .env

# Write backend code
cat <<EOL > server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

app.use(bodyParser.json());
app.use(cors());

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

const orderSchema = new mongoose.Schema({
  name: String,
  address: String,
  phone: String,
  items: Array,
  total: Number,
  status: String
});

const Order = mongoose.model('Order', orderSchema);

app.post('/api/orders', async (req, res) => {
  const { name, address, phone, items, total } = req.body;
  const order = new Order({ name, address, phone, items, total, status: 'Pending' });
  try {
    await order.save();
    res.status(201).send(order);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.get('/api/orders', async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).send(orders);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post('/api/payment', async (req, res) => {
  const { amount, token } = req.body;
  try {
    const charge = await stripe.charges.create({
      amount: amount * 100,
      currency: 'usd',
      source: token,
      description: 'Mr. Roscoe\'s Ribs and Brisket Order'
    });
    res.status(200).send(charge);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(PORT, () => {
  console.log(\`Server is running on port \${PORT}\`);
});
EOL

# Create environment file
cat <<EOL > .env
PORT=5000
MONGODB_URI=mongodb+srv://ngdev21:rylan07a@cluster0.34tiicv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
STRIPE_SECRET_KEY=sk_test_4eC39HqLyjWDarjtT1zdp7dc
EOL

# Initialize frontend
cd ..
npx create-react-app frontend
cd frontend
npm install axios react-router-dom styled-components

# Create necessary files and folders
mkdir src/components
touch src/components/Header.js src/components/Footer.js src/components/Menu.js src/components/Cart.js src/components/OrderForm.js src/components/Home.js src/components/App.css src/components/Header.css src/components/Footer.css src/components/Menu.css src/components/Cart.css src/components/OrderForm.css

# Write frontend code
cat <<EOL > src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header>
      <nav>
        <div className="logo">Mr. Roscoe's Ribs and Brisket</div>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/menu">Menu</Link></li>
          <li><Link to="/cart">Cart</Link></li>
          <li><Link to="/order">Order</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
EOL

cat <<EOL > src/components/Footer.js
import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <div className="footer-container">
      <footer>
        <p>Follow us on:</p>
        <div className="social-media">
          <div className="social-media-link">
            <svg /* SVG content for Facebook */></svg>
          </div>
          <div className="social-media-link">
            <svg /* SVG content for Twitter */></svg>
          </div>
          <div className="social-media-link">
            <svg /* SVG content for Instagram */></svg>
          </div>
        </div>
        <div className="info-wrapper">
          <p>Contact: info@ridedine.com</p>
          <p><a href="#">Terms of Service</a> | <a href="#">Privacy Policy</a></p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
EOL

cat <<EOL > src/components/Menu.js
import React, { useState } from 'react';
import './Menu.css';
import axios from 'axios';

const Menu = () => {
  const [items] = useState([
    { id: 1, name: 'Ribs', price: 15.99 },
    { id: 2, name: 'Brisket', price: 17.99 },
    { id: 3, name: 'Pulled Pork', price: 14.99 },
  ]);

  const addToCart = async (item) => {
    try {
      await axios.post('/api/orders', { ...item });
      console.log(\`Added \${item.name} to cart\`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="menu-container">
      <h1>Menu</h1>
      <ul>
        {items.map(item => (
          <li key={item.id}>
            {item.name} - \$${item.price.toFixed(2)}
            <button onClick={() => addToCart(item)}>Add to Cart</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Menu;
EOL

cat <<EOL > src/components/Cart.js
import React from 'react';
import './Cart.css';

const Cart = () => {
  const cartItems = [
    { id: 1, name: 'Ribs', price: 15.99, quantity: 2 },
    { id: 2, name: 'Brisket', price: 17.99, quantity: 1 },
  ];

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="cart-container">
      <h1>Cart</h1>
      <ul>
        {cartItems.map(item => (
          <li key={item.id}>
            {item.name} - \$${item.price.toFixed(2)} x {item.quantity}
          </li>
        ))}
      </ul>
      <p>Total: \$${total.toFixed(2)}</p>
      <button>Proceed to Checkout</button>
    </div>
  );
};

export default Cart;
EOL

cat <<EOL > src/components/OrderForm.js
import React, { useState } from 'react';
import './OrderForm.css';
import axios from 'axios';

const OrderForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    amount: 0,
    token: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/payment', formData);
      console.log('Payment successful:', response.data);
    } catch (error) {
      console.error('Payment error:', error);
    }
  };

  return (
    <div className="order-form-container">
      <h1>Order Form</h1>
      <form onSubmit={handleSubmit}>
        <div className="form">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <label className="label-name">
            <span className="content-name">Name</span>
          </label>
        </div>
        <div className="form">
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
          <label className="label-name">
            <span className="content-name">Address</span>
          </label>
        </div>
        <div className="form">
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          <label className="label-name">
            <span className="content-name">Phone</span>
          </label>
        </div>
        <div className="form">
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            required
          />
          <label className="label-name">
            <span className="content-name">Amount</span>
          </label>
        </div>
        <div className="form">
          <input
            type="text"
            name="token"
            value={formData.token}
            onChange={handleChange}
            required
          />
          <label className="label-name">
            <span className="content-name">Token</span>
          </label>
        </div>
        <button type="submit">Place Order</button>
      </form>
    </div>
  );
};

export default OrderForm;
EOL

# Update App.js to include the new routes and components
cat <<EOL > src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Menu from './components/Menu';
import Cart from './components/Cart';
import OrderForm from './components/OrderForm';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<OrderForm />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
EOL

# Run the backend and frontend
cd ../backend && node server.js &
cd ../frontend && npm start
