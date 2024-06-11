import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
    return (
        <div className="home-container">
            <div className="hero">
                <h1>Welcome to Mr. Roscoe's Ribs and Brisket</h1>
                <p>Experience the best barbecue in town!</p>
                <Link to="/menu" className="cta">Order Now</Link>
            </div>
        </div>
    );
};

export default Home;
