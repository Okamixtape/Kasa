import React from 'react';
import Meta from '../../components/Meta';
import '../../style/pages/_legal-page.scss';

const PrivacyPolicyPage = () => (
    <main className="kasa__wrapper fade-in">
        <Meta title="Politique de Confidentialité - Kasa" description="Votre vie privée est importante pour nous. Consultez notre politique de confidentialité pour en savoir plus." />
        <div className="legal-page">
            <h1>Politique de Confidentialité</h1>
            <p>Dernière mise à jour : 25 août 2025</p>
            <p>Votre vie privée est importante pour nous. Cette politique de confidentialité explique quelles données personnelles Kasa collecte auprès de vous, par le biais de nos interactions avec vous et via nos produits, et comment nous les utilisons.</p>

            <h2>Collecte des données</h2>
            <p>Nous collectons des données pour fonctionner efficacement et vous fournir les meilleures expériences avec nos services. Vous fournissez certaines de ces données directement, par exemple lorsque vous créez un compte Kasa, soumettez une requête de recherche, ou contactez-nous pour du support.</p>

            <h2>Utilisation des données</h2>
            <p>Kasa utilise les données que nous collectons pour vous fournir les services que nous offrons, ce qui inclut l'utilisation de données pour améliorer et personnaliser vos expériences. Nous pouvons également utiliser les données pour communiquer avec vous, par exemple, en vous informant sur votre compte, les mises à jour de sécurité et les informations sur les produits.</p>

            <h2>Partage des données</h2>
            <p>Nous ne partageons pas vos données personnelles avec des tiers sans votre consentement, sauf si cela est nécessaire pour fournir un service que vous avez demandé ou lorsque la loi l'exige.</p>

            <h2>Vos droits</h2>
            <p>Vous avez le droit d'accéder, de corriger ou de supprimer les données personnelles que nous collectons. Vous pouvez également vous opposer au traitement de vos données personnelles.</p>
        </div>
    </main>
);

export default PrivacyPolicyPage;
