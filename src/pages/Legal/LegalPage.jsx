import React from 'react';
import Meta from '../../components/Meta';
import '../../style/pages/_legal-page.scss';

const LegalPage = () => (
    <main className="kasa__wrapper fade-in">
        <Meta title="Mentions Légales - Kasa" description="Consultez les mentions légales de Kasa." />
        <div className="legal-page">
            <h1>Mentions Légales</h1>
            <h2>Éditeur du site</h2>
            <p>Kasa<br />Société par actions simplifiée<br />Adresse : 10 Rue de la Paix, 75002 Paris, France<br />Email : contact@kasa.com</p>
            
            <h2>Hébergement</h2>
            <p>Le site est hébergé par Vercel Inc.<br />340 S Lemon Ave #4133<br />Walnut, CA 91789, USA<br />Email: privacy@vercel.com</p>

            <h2>Propriété intellectuelle</h2>
            <p>L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.</p>

            <h2>Données personnelles</h2>
            <p>Les informations recueillies vous concernant sont indispensables pour répondre à vos demandes d'information et pour vous envoyer la Newsletter Kasa. Elles sont exclusivement destinées à Kasa. Vous disposez d'un droit d'accès, de modification, de rectification et de suppression des données qui vous concernent (art. 34 de la loi "Informatique et Libertés" du 6 janvier 1978). Pour l'exercer, adressez-vous à Kasa.</p>
        </div>
    </main>
);

export default LegalPage;
