import React, { useState, useRef, useEffect } from 'react';
import './_profile-dropdown.scss';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProfileDropdown = () => {
    const { user, logout } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const dropdownRef = useRef(null);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    if (!user) {
        return null;
    }

    return (
        <div className="profile-dropdown" ref={dropdownRef}>
            <button onClick={() => setIsOpen(!isOpen)} className="profile-dropdown__button">
                <div className="profile-dropdown__user-info">
                    <span>Bonjour, {user.name}</span>
                    <span className={`role-badge role-badge--${user.role}`}>{user.role === 'host' ? 'Hôte' : 'Locataire'}</span>
                </div>
                <svg className={`arrow ${isOpen ? 'open' : ''}`} width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 9L12 15L18 9" stroke="#FF6060" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </button>
            {isOpen && (
                <ul className="profile-dropdown__menu">
                    <li className="profile-dropdown__item">
                        <NavLink to="/my-bookings" className="profile-dropdown__link">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                            <span>Mes réservations</span>
                        </NavLink>
                    </li>
                    <li className="profile-dropdown__item">
                        <button onClick={handleLogout} className="profile-dropdown__link profile-dropdown__logout-button">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                            <span>Déconnexion</span>
                        </button>
                    </li>
                </ul>
            )}
        </div>
    );
};

export default ProfileDropdown;
