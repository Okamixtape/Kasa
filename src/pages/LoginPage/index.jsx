import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '../../context/AuthContext';
import '../../style/pages/_login.scss';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');

        try {
            const response = await fetch('http://localhost:3001/api/login', {
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

            login(data.token, data.userName);
            navigate('/');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <>
            <Helmet>
                <title>Connexion - Kasa</title>
                <meta
                    name="description"
                    content="Connectez-vous à votre compte Kasa pour accéder à vos réservations et gérer votre profil."
                />
            </Helmet>
            <main className="kasa__wrapper fade-in">
                <div className="login-container">
                    <h1 className="login-container__title">Connexion</h1>
                    <form onSubmit={handleSubmit} className="login-container__form">
                        <div className="input-group">
                            <label htmlFor="email">Adresse e-mail</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="input-field"
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="password">Mot de passe</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="input-field"
                            />
                        </div>
                        {error && <p className="error-message">{error}</p>}
                        <button type="submit" className="login-container__button">Se connecter</button>
                    </form>
                    <p className="login-container__redirect">
                        Vous n&apos;avez pas de compte ? <Link to="/signup">Inscrivez-vous</Link>
                    </p>
                </div>
            </main>
        </>
    );
};

export default LoginPage;
