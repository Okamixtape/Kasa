import React from 'react';
import './_header.scss';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import ProfileDropdown from '../ProfileDropdown';
import { useState, useEffect, useRef } from 'react';
import redLogo from '../../assets/redLogo.png';

const Header = () => {
    const { user } = useAuth();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const headerRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };

        const handleClickOutside = (event) => {
            if (headerRef.current && !headerRef.current.contains(event.target)) {
                setMobileMenuOpen(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <header className={`header ${isScrolled ? 'scrolled' : ''} ${isMobileMenuOpen ? 'mobile-menu-open' : ''}`} ref={headerRef}>
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
                            {user && user.role === 'tenant' && (
                                <li className="header__navbarListItem">
                                    <NavLink className="header__navbarListAnchor" to="/favorites">Favoris</NavLink>
                                </li>
                            )}
                            {user && user.role === 'host' && (
                                <li className="header__navbarListItem">
                                    <NavLink className="header__navbarListAnchor" to="/host/dashboard">Tableau de bord</NavLink>
                                </li>
                            )}
                            {(!user || user.role === 'tenant') && (
                                <li className="header__navbarListItem header__navbarListItem--mobile-only">
                                    <NavLink className="header__host-button" to="/become-host">Devenez hôte</NavLink>
                                </li>
                            )}
                        </ul>
                    </nav>
                </div>
                                <div className="header__mobile-toggle" onClick={toggleMobileMenu}>
                    <div className="hamburger-icon">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
                <div className="header__actions">
                    {(!user || user.role === 'tenant') && (
                        <NavLink className="header__host-button" to="/become-host">Devenez hôte</NavLink>
                    )}
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