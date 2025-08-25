import React from 'react';
import './_footer.scss';
import { Link } from 'react-router-dom';
import whiteLogo from "../../assets/whiteLogo.png";

const Footer = () => {
    return (
        <footer className="footer">
            <img className="footer__logo" src={whiteLogo} alt="logo de Kasa" />
            <nav className="footer__nav">
                <Link to="/blog">Blog</Link>
                <Link to="/become-host">Devenir hôte</Link>
                <Link to="/mentions-legales">Mentions légales</Link>
                <Link to="/politique-de-confidentialite">Politique de confidentialité</Link>
            </nav>
            <p className="footer__copyright">© 2024 Kasa. All rights reserved</p>
        </footer>
    );
};

export default Footer;