import React from 'react';
import Header from '../../components/Header';
import Error from '../../components/Error';

const ErrorPage = () => {
    return (
        <div className="kasa__wrapper -paddingBottom fade-in">
            <Header />
            <Error />
        </div>
    );
};

export default ErrorPage;