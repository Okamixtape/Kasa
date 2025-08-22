import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './_host-cta.scss';

const HostCTA = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const handleStart = () => {
        if (user) {
            navigate('/become-a-host/onboarding');
        } else {
            navigate('/login', { state: { from: '/become-a-host/onboarding' } });
        }
    };
    return (
        <section className="host-cta-section">
            <div className="host-cta-content">
                <h2>Prêt à vous lancer ?</h2>
                <p>Devenez hôte sur Kasa et commencez à gagner un revenu complémentaire en toute simplicité.</p>
                <button onClick={handleStart} className="host-cta-button">Commencer</button>
            </div>
        </section>
    );
};

export default HostCTA;
