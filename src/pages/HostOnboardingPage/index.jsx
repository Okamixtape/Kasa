import React from 'react';
import { Helmet } from 'react-helmet-async';
import HostOnboardingForm from '../../components/HostOnboardingForm';
import '../../components/HostOnboardingForm/_host-onboarding-form.scss';

const HostOnboardingPage = () => {
    return (
        <main className="host-onboarding-page container">
            <Helmet>
                <title>Créez votre annonce - Kasa</title>
            </Helmet>
            <HostOnboardingForm />
        </main>
    );
};

export default HostOnboardingPage;
