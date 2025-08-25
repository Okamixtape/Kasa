import React from 'react';
import { Link } from 'react-router-dom';
import Meta from '../../components/Meta';
import '../../style/pages/_host-dashboard-page.scss';

const HostDashboardPage = () => {
    return (
        <>
            <Meta 
                title="Tableau de bord Hôte" 
                description="Gérez vos annonces, consultez vos réservations et suivez vos revenus."
            />
            <main className="kasa__wrapper fade-in kasa__main-container host-dashboard-page">
                <h1>Tableau de bord Hôte</h1>
                <p>Bienvenue sur votre tableau de bord. D'ici, vous pourrez gérer vos propriétés et réservations.</p>

                <div className="dashboard-modules">
                    <section className="dashboard-module">
                        <h2>Performances</h2>
                        <p>Suivez vos revenus et l'engagement de vos annonces.</p>
                        <Link to="/host/analytics" className="btn btn-primary">Voir mes statistiques</Link>
                    </section>
                    <section className="dashboard-module">
                        <h2>Mes propriétés</h2>
                        {/* Ici, nous mapperons sur les propriétés de l'hôte */}
                        <p>Vous n'avez pas encore de propriété. <Link to="/become-a-host/onboarding">Ajoutez votre premier logement !</Link></p>
                        {/* Exemple de carte de propriété: */}
                    </section>
                    <section className="dashboard-module">
                        <h2>Mes réservations</h2>
                        <p>Aucune réservation à venir pour le moment.</p>
                        {/* Exemple de réservation: */}
                    </section>
                </div>
            </main>
        </>
    );
};

export default HostDashboardPage;
