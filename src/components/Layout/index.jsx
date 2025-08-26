import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import './_layout.scss';

const Layout = () => {
    return (
        <>
            <Header />
            <main className="main-content container">
                <Outlet />
            </main>
            <Footer />
        </>
    );
};

export default Layout;
