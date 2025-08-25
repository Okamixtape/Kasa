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
                <div class="profile-dropdown__user-info">
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
                            Mes réservations
                        </NavLink>
                    </li>
                    <li className="profile-dropdown__item">
                        <button onClick={handleLogout} className="profile-dropdown__link profile-dropdown__logout-button">
                            Déconnexion
                        </button>
                    </li>
                </ul>
            )}
        </div>
    );
};

export default ProfileDropdown;
