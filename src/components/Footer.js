import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Contact Us</h3>
          <ul>
            <li><a href="mailto:info@doctorbookingapp.com">info@doctorbookingapp.com</a></li>
            <li><a href="tel:+1234567890">+1 234 567 890</a></li>
            <li>123 Health Street, Wellness City</li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/aboutus">About Us</a></li>
            <li><a href="/homepage">HomePage</a></li>
            <li><a href="/loginpage">Login</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Follow Us</h3>
          <ul>
            <li><a href="https://facebook.com">Facebook</a></li>
            <li><a href="https://twitter.com">Twitter</a></li>
            <li><a href="https://instagram.com">Instagram</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        &copy; 2024 Doctor Booking App | All Rights Reserved
      </div>
    </div>
  );
}

export default Footer;
