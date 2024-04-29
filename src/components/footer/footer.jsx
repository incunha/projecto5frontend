import React from 'react';
import './footer.css'; 

function Footer() {
    return (
        <footer className="footer">
            <div>
                <span>© 2024 Scrum</span>
            </div>
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
                <span>Instagram</span>
            </div>
        </footer>
    );
}

export default Footer;