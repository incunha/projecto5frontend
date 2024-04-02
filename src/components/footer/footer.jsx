import React from 'react';
import './footer.css'; 

function Footer() {
    return (
        <footer className="footer">
            <p>© 2024 Scrum</p>
            <div>
                <span>Privacy Policy</span>
                <span>Terms of Service</span>
            </div>
            <div>
                <span>info@scrum.com</span>
            </div>
            <div>
                <span>Follow us:</span>
                <span>Facebook/</span>
                <span>Twitter/</span>
                <span>Instagram/</span>
            </div>
        </footer>
    );
}

export default Footer;