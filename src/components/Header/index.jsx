import React from 'react';
import './_header.scss';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import ProfileDropdown from '../ProfileDropdown';
import { useState, useEffect } from 'react';
import redLogo from '../../assets/redLogo.png';

const Header = () => {
    const { user } = useAuth();
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
            <div className="header__container">
                <div className="header__left">
                    <NavLink to="/">
                        <img className="header__logo" src={redLogo} alt="logo de Kasa" />
                    </NavLink>
                    <nav className="header__navbar">
                        <ul className="header__navbarList">
                            <li className="header__navbarListItem">
                                <NavLink className="header__navbarListAnchor" to="/">Accueil</NavLink>
                            </li>
                            <li className="header__navbarListItem">
                                <NavLink className="header__navbarListAnchor" to="/about">À propos</NavLink>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div className="header__actions">
                    <NavLink className="header__host-button" to="/become-host">Devenez hôte</NavLink>
                    {user ? (
                        <ProfileDropdown />
                    ) : (
                        <div className="header__auth-buttons">
                            <NavLink className="header__auth-button header__auth-button--login" to="/login">Connexion</NavLink>
                            <NavLink className="header__auth-button header__auth-button--signup" to="/signup">Inscription</NavLink>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;