import React from 'react';
import Header from '../../components/Header';
import Banner from '../../components/Banner';
import Collapse from '../../components/Collapse';
import Footer from '../../components/Footer';
import aboutData from '../../data/aboutItemsData.json';

const AboutPage = () => {
    return (
        <div className="kasa__wrapper fade-in">
            <Header />
            <Banner banner="aboutBanner" title="À propos de Kasa" />
            <section className="about-page__content">
                <div className="about-page__intro">
                    <h2>Notre Mission : Réinventer l&apos;hospitalité</h2>
                    <p>
                        Fondée en 2020, Kasa est née d&apos;une vision simple : transformer la location de logements en une expérience exceptionnelle, où la confiance, le confort et la sécurité sont au cœur de chaque séjour. Nous croyons que voyager est une opportunité de découvrir, de se connecter et de créer des souvenirs inoubliables. C&apos;est pourquoi nous nous engageons à offrir des logements de qualité, vérifiés par nos soins, et un service personnalisé pour que chaque voyageur se sente chez lui, où qu&apos;il soit.
                    </p>
                </div>
                <div className="collapse__wrapper">
                {aboutData.map(aboutItem => (
                    <Collapse
                        key={aboutItem.title}
                        title={aboutItem.title}
                        text={aboutItem.text}
                    />
                ))}
            </div>
            </section>
            <Footer />
        </div>
    );
};

export default AboutPage;