import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';
import { ReactComponent as FacebookIcon } from '../assets/facebook.svg';
import { ReactComponent as TwitterIcon } from '../assets/twitter.svg';
import { ReactComponent as InstagramIcon } from '../assets/instagram.svg';

const Footer = () => {
    return (
        <footer>
            <div className="footer-content">
                <p>Follow us on:</p>
                <div className="social-media">
                    <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                        <FacebookIcon />
                    </a>
                    <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                        <TwitterIcon />
                    </a>
                    <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                        <InstagramIcon />
                    </a>
                </div>
                <div className="info-wrapper">
                    <p>Contact: info@mrroscoes.com</p>
                    <p><Link to="/terms">Terms of Service</Link> | <Link to="/privacy">Privacy Policy</Link></p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
