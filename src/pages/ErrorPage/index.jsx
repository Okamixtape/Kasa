import React from 'react';
import Meta from '../../components/Meta';
import Error from '../../components/Error';

const ErrorPage = () => {
    return (
        <>
            <Meta 
                title="Page non trouvée (404)"
                description="La page que vous cherchez n'existe pas ou a été déplacée."
            />
            <main className="kasa__wrapper -paddingBottom fade-in">
                <Error />
            </main>
        </>
    );
};

export default ErrorPage;