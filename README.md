# New 
# Mr. Roscoe's Ribs and Brisket

## Overview
Mr. Roscoe's Ribs and Brisket is a web application designed for a mobile barbecue service. The app features an interactive menu, cart management, and a checkout system integrated with Stripe for payment processing. The application uses a monorepo structure to manage both the frontend and backend.

## Features
- **Interactive Menu**: Browse through different categories of items like meats, sides, desserts, and beverages.
- **Search and Filter**: Search for items and filter by category.
- **Cart Management**: Add items to the cart, adjust quantities, and view the cart.
- **Checkout**: Enter customer details and process payments through Stripe.
- **Order Confirmation**: Receive an order number and confirmation after a successful order.

## Technologies Used
- **Frontend**: React, Axios, Stripe, CSS
- **Backend**: Node.js, Express, MongoDB, Mongoose
- **Payment Processing**: Stripe

## Installation

### Prerequisites
- Node.js
- npm
- MongoDB
- Stripe account

### Clone the Repository
```bash
git clone https://github.com/ngdev2021/mr-roscoes-ribs-and-brisket.git
cd mr-roscoes-ribs-and-brisket
```

## Backend Setup
### Install Dependencies

```bash
cd backend
npm install
```

## Environment Variables
#### Create a .env file in the backend directory with the following content:

```bash 
MONGODB_URI=your_mongodb_connection_string
STRIPE_SECRET_KEY=your_stripe_secret_key
```

### Run the Backend Server

```bash
npm start
```

## Frontend Setup
### Install Dependencies

```bash
cd frontend
npm install
```

## Environment Variables
#### Create a .env file in the frontend directory with the following content:

```bash
REACT_APP_STRIPE_PUBLIC_KEY=your_stripe_public_key
```

### Run the Frontend Server

```bash
npm start
```

## Usage
### Access the Application
Open your web browser and navigate to http://localhost:3000.

### Browse the Menu
Browse through the menu items, search for specific items, and filter by categories.

### Add Items to Cart
Select items and adjust quantities before adding them to the cart.

### Checkout
Enter your details, review your order, and proceed to payment.

### Order Confirmation
Receive an order number and confirmation of your order.

## Directory Structure

mr-roscoes-ribs-and-brisket/
│
├── backend/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── seed/
│   ├── .env
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   ├── .env
│   ├── package.json
│   └── README.md
│
├── README.md
└── package.json

## Contributing
1. Fork the repository.
2. Create a new branch (git checkout -b feature-branch).
3. Make your changes.
4. Commit your changes (git commit -m 'Add some feature').
5. Push to the branch (git push origin feature-branch).
6. Open a Pull Request.

## License
This project is licensed under the MIT License.

## Acknowledgements
- Stripe
- React
- Node.js
- MongoDB