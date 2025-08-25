import React from 'react';
import Meta from '../../components/Meta';
import Banner from '../../components/Banner';
import Collapse from '../../components/Collapse';
import TeamMemberCard from '../../components/TeamMemberCard';
import aboutData from '../../data/aboutItemsData.json';

const teamMembers = [
    {
        name: 'Alice Martin',
        role: 'Fondatrice & CEO',
        imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80'
    },
    {
        name: 'Julien Dubois',
        role: 'Responsable des Opérations',
        imageUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80'
    },
    {
        name: 'Chloé Lambert',
        role: 'Support Client',
        imageUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=461&q=80'
    }
];

const AboutPage = () => {
    return (
        <>
            <Meta 
                title="À Propos - Notre Mission et Nos Valeurs"
                description="Découvrez la mission de Kasa : réinventer l'hospitalité en offrant des logements de qualité, vérifiés par nos soins, pour une expérience de voyage exceptionnelle."
            />
            <main className="kasa__wrapper fade-in">
                <Banner banner="about" title="À propos de Kasa" />
                <section className="about-page__content">
                    <div className="about-page__intro">
                        <h2>Notre Mission : Réinventer l&apos;hospitalité</h2>
                        <p>
                            Fondée en 2020, Kasa est née d&apos;une vision simple : transformer la location de logements en une expérience exceptionnelle, où la confiance, le confort et la sécurité sont au cœur de chaque séjour. Nous croyons que voyager est une opportunité de découvrir, de se connecter et de créer des souvenirs inoubliables. C&apos;est pourquoi nous nous engageons à offrir des logements de qualité, vérifiés par nos soins, et un service personnalisé pour que chaque voyageur se sente chez lui, où qu&apos;il soit.
                        </p>
                    </div>
                    <div className="collapse__wrapper -aboutPage">
                        {aboutData.map(aboutItem => (
                            <Collapse
                                key={aboutItem.title}
                                title={aboutItem.title}
                                text={aboutItem.text}
                            />
                        ))}
                    </div>

                    <div className="about-page__quality">
                        <h2>Notre Engagement Qualité</h2>
                        <p>Chaque logement proposé sur Kasa est soumis à un processus de vérification rigoureux pour garantir qu'il répond à nos standards de qualité, de propreté et de confort. Notre équipe support est disponible 7j/7 pour répondre à vos questions et vous assister tout au long de votre séjour.</p>
                    </div>

                    <div className="about-page__team">
                        <h2>Notre Équipe</h2>
                        <div className="team-grid">
                            {teamMembers.map(member => (
                                <TeamMemberCard key={member.name} {...member} />
                            ))}
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
};

export default AboutPage;