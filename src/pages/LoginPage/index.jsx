import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Meta from '../../components/Meta';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';


const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const { addNotification } = useNotification();
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');

        try {
                        const response = await fetch(`${process.env.REACT_APP_API_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to login');
            }

            // Simulate receiving permissions from the backend
            const permissions = data.user.role === 'host' 
                ? ['view_host_dashboard', 'manage_listings', 'view_analytics'] 
                : ['write_review', 'view_bookings'];
            const userWithPermissions = { ...data.user, permissions };

            login(data.token, userWithPermissions);
            addNotification(`Bienvenue, ${userWithPermissions.name} !`, 'success');
            navigate('/');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <>
            <Meta 
                title="Connexion"
                description="Connectez-vous à votre compte Kasa pour accéder à vos réservations et gérer votre profil."
            />
            <main className="kasa__wrapper fade-in kasa__main-container auth-page">
                <div className="auth-container">
                    <h1>Connexion</h1>
                    <form onSubmit={handleSubmit} className="auth-form">
                        <div className="form-group">
                            <label htmlFor="email">Adresse e-mail</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Mot de passe</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        {error && <p className="error-message">{error}</p>}
                        <button type="submit" className="auth-button">Se connecter</button>
                    </form>
                    <p className="auth-link">
                        Vous n'avez pas de compte ? <Link to="/signup">Inscrivez-vous</Link>
                    </p>
                </div>
            </main>
        </>
    );
};

export default LoginPage;
