import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './style/main.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

const HomePage = lazy(() => import('./pages/HomePage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const HousePage = lazy(() => import('./pages/HousePage'));
const ErrorPage = lazy(() => import('./pages/ErrorPage'));


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <HelmetProvider>
            <BrowserRouter basename="/Kasa">
                <Suspense fallback={<div className="loader">Chargement...</div>}>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/about" element={<AboutPage />} />
                        <Route path="/house/:id" element={<HousePage />} />
                        <Route path="/*" element={<ErrorPage />} />
                    </Routes>
                </Suspense>
            </BrowserRouter>
        </HelmetProvider>
    </React.StrictMode>
);