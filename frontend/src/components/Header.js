import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import { ReactComponent as HamburgerIcon } from '../assets/hamburger.svg';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <header className="header">
            <div className="logo">Mr. Roscoe's</div>
            <nav className={`nav-links ${isOpen ? 'open' : ''}`}>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/menu">Menu</Link></li>
                <li><Link to="/cart">Cart</Link></li>
                <li><Link to="/order">Order</Link></li>
            </nav>
            <div className="hamburger" onClick={toggleMenu}>
                <HamburgerIcon />
            </div>
        </header>
    );
};

export default Header;
