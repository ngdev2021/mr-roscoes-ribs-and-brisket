# mr-roscoes-ribs-and-brisket

Mr. Roscoe's Ribs and Brisket
Overview
Mr. Roscoe's Ribs and Brisket is a web application designed for a mobile barbecue service. The app features an interactive menu, cart management, and a checkout system integrated with Stripe for payment processing. The application uses a monorepo structure to manage both the frontend and backend.

Features
Interactive Menu: Browse through different categories of items like meats, sides, desserts, and beverages.
Search and Filter: Search for items and filter by category.
Cart Management: Add items to the cart, adjust quantities, and view the cart.
Checkout: Enter customer details and process payments through Stripe.
Order Confirmation: Receive an order number and confirmation after a successful order.
Technologies Used
Frontend: React, Axios, Stripe, CSS
Backend: Node.js, Express, MongoDB, Mongoose
Payment Processing: Stripe
Installation
Prerequisites
Node.js
npm
MongoDB
Stripe account
Clone the Repository
bash
Copy code
git clone https://github.com/ngdev2021/mr-roscoes-ribs-and-brisket.git
cd mr-roscoes-ribs-and-brisket
Backend Setup
Install Dependencies

bash
Copy code
cd backend
npm install
Environment Variables
Create a .env file in the backend directory with the following content:

plaintext
Copy code
MONGODB_URI=your_mongodb_connection_string
STRIPE_SECRET_KEY=your_stripe_secret_key
Run the Backend Server

bash
Copy code
npm start
Frontend Setup
Install Dependencies

bash
Copy code
cd frontend
npm install
Environment Variables
Create a .env file in the frontend directory with the following content:

plaintext
Copy code
REACT_APP_STRIPE_PUBLIC_KEY=your_stripe_public_key
Run the Frontend Server

bash
Copy code
npm start
Usage
Access the Application
Open your web browser and navigate to http://localhost:3000.

Browse the Menu
Browse through the menu items, search for specific items, and filter by categories.

Add Items to Cart
Select items and adjust quantities before adding them to the cart.

Checkout
Enter your details, review your order, and proceed to payment.

Order Confirmation
Receive an order number and confirmation of your order.

Directory Structure
plaintext
Copy code
mr-roscoes-ribs-and-brisket/
│
├── backend/
│ ├── models/
│ ├── routes/
│ ├── controllers/
│ ├── seed/
│ ├── .env
│ ├── server.js
│ └── package.json
│
├── frontend/
│ ├── public/
│ ├── src/
│ ├── .env
│ ├── package.json
│ └── README.md
│
├── README.md
└── package.json
Contributing
Fork the repository.
Create a new branch (git checkout -b feature-branch).
Make your changes.
Commit your changes (git commit -m 'Add some feature').
Push to the branch (git push origin feature-branch).
Open a Pull Request.
License
This project is licensed under the MIT License.

Acknowledgements
Stripe
React
Node.js
MongoDB
