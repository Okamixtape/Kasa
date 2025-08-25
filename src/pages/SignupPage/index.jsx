import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Meta from '../../components/Meta';

const SignupPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');

        try {
                        const response = await fetch(`${process.env.REACT_APP_API_URL}/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to sign up');
            }

            navigate('/login');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <>
            <Meta 
                title="Inscription"
                description="Créez un compte Kasa pour réserver des logements et gérer votre profil."
            />
            <main className="kasa__wrapper fade-in kasa__main-container auth-page">
                <div className="auth-container">
                    <h1>Inscription</h1>
                    <form onSubmit={handleSubmit} className="auth-form">
                        <div className="form-group">
                            <label htmlFor="name">Nom</label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
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
                        <button type="submit" className="auth-button">S'inscrire</button>
                    </form>
                    <p className="auth-link">
                        Vous avez déjà un compte ? <Link to="/login">Connectez-vous</Link>
                    </p>
                </div>
            </main>
        </>
    );
};

export default SignupPage;
