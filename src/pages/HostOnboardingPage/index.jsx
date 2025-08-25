import React, { useState, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './_host-onboarding-page.scss';
import AddPropertyForm from '../../components/HostOnboardingForm/AddPropertyForm';

// Placeholder pour les composants de chaque étape
const IdentityVerification = ({ onNext }) => <div><h2>Étape 1: Vérification d'identité</h2><p>Veuillez fournir une pièce d'identité.</p><button onClick={onNext}>Suivant</button></div>;
const BankDetails = ({ onNext, onBack }) => <div><h2>Étape 3: Informations bancaires</h2><p>Configurez vos informations pour recevoir les paiements.</p><button onClick={onBack}>Précédent</button><button onClick={onNext}>Suivant</button></div>;

const HostOnboardingPage = () => {
    const [step, setStep] = useState(1);
    const [propertyData, setPropertyData] = useState(null);
    const { updateUserRole, token } = useAuth(); // Assuming token is available from context
    const navigate = useNavigate();

    const handleFinalSubmit = useCallback(async () => {
        if (!propertyData) {
            console.error("Property data is missing.");
            // Optionally: show an error to the user
            return;
        }

        try {
            // NOTE: This currently doesn't handle file uploads.
            // The backend expects multipart/form-data for pictures.
            // This will need to be enhanced if picture uploads are part of this form.
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/logements`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(propertyData),
            });

            if (!response.ok) {
                throw new Error('Failed to create listing.');
            }

            // If submission is successful, update role and navigate
            await updateUserRole('host');
            navigate('/host/dashboard');

        } catch (error) {
            console.error("Failed to submit property data:", error);
            // Optionally: show an error to the user
        }
    }, [propertyData, navigate, updateUserRole, token]);

    const renderStep = () => {
        switch (step) {
            case 1:
                return <IdentityVerification onNext={() => setStep(2)} />;
            case 2:
                return <AddPropertyForm onNext={(data) => { setPropertyData(data); setStep(3); }} onBack={() => setStep(1)} />;
            case 3:
                return <BankDetails onNext={handleFinalSubmit} onBack={() => setStep(2)} />;
            default:
                return <IdentityVerification onNext={() => setStep(2)} />;
        }
    };

    return (
        <main className="host-onboarding-page container">
            <Helmet>
                <title>Devenez Hôte - Kasa</title>
            </Helmet>
            <div className="onboarding-wizard">
                {renderStep()}
            </div>
        </main>
    );
};

export default HostOnboardingPage;
