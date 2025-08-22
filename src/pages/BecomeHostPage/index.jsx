import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { FiCalendar, FiHeadphones, FiUsers } from 'react-icons/fi';
import '../../style/pages/_become-host-page.scss';

const BecomeHostPage = () => {
    return (
        <main className="become-host-page">
            <Helmet>
                <title>Devenez hôte - Kasa</title>
            </Helmet>
            <div className="hero-section">
                <h1>Devenez hôte sur Kasa</h1>
                <p>Ouvrez votre porte au monde et gagnez un revenu supplémentaire.</p>
                <Link to="/become-a-host/onboarding" className="cta-button">Commencer</Link>
            </div>
            <div className="content-section">
                <h2>Pourquoi devenir hôte sur Kasa ?</h2>
                <div className="features">
                    <div className="feature-item">
                        <FiCalendar className="feature-icon" />
                        <h3>Flexibilité totale</h3>
                        <p>Choisissez vos propres dates, prix et exigences pour les voyageurs. Nous sommes là pour vous aider à chaque étape.</p>
                    </div>
                    <div className="feature-item">
                        <FiHeadphones className="feature-icon" />
                        <h3>Assistance 24h/24, 7j/7</h3>
                        <p>De l'aide pour la configuration de votre annonce à l'assistance en cas de problème, notre équipe est toujours disponible pour vous.</p>
                    </div>
                    <div className="feature-item">
                        <FiUsers className="feature-icon" />
                        <h3>Rejoignez une communauté</h3>
                        <p>Faites partie d'une communauté mondiale d'hôtes et de voyageurs, et partagez des expériences uniques.</p>
                    </div>
                </div>
                <div className="testimonials-section">
                    <h2>Ce que nos hôtes en disent</h2>
                    <div className="testimonials">
                        <div className="testimonial-item">
                            <p className="testimonial-text">"Grâce à Kasa, j'ai pu louer mon appartement en toute simplicité pendant mes vacances. La plateforme est intuitive, l'assistance est incroyablement réactive, et j'ai accueilli des voyageurs respectueux. C'est une source de revenus que je gère avec une totale tranquillité d'esprit."</p>
                            <p className="testimonial-author">- Sophie, propriétaire à Paris</p>
                        </div>
                        <div className="testimonial-item">
                            <p className="testimonial-text">"Ce que j'apprécie le plus, c'est la flexibilité. Je choisis mes dates, mes tarifs, et Kasa s'occupe du reste. Rejoindre cette communauté m'a permis de valoriser mon bien tout en rencontrant des personnes formidables. Je recommande à 100 % !"</p>
                            <p className="testimonial-author">- Karim, propriétaire à Marseille</p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default BecomeHostPage;
