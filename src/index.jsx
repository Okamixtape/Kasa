import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './style/main.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

const HomePage = lazy(() => import('./pages/HomePage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const HousePage = lazy(() => import('./pages/HousePage'));
const ErrorPage = lazy(() => import('./pages/ErrorPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const SignupPage = lazy(() => import('./pages/SignupPage'));
const MyBookingsPage = lazy(() => import('./pages/MyBookingsPage'));
const BecomeHostPage = lazy(() => import('./pages/BecomeHostPage'));
const HostOnboardingPage = lazy(() => import('./pages/HostOnboardingPage'));
const BlogPostPage = lazy(() => import('./pages/BlogPostPage'));
const BlogIndexPage = lazy(() => import('./pages/BlogIndexPage'));


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <HelmetProvider>
            <AuthProvider>
                <BrowserRouter basename="/Kasa">
                <Suspense fallback={<div className="loader">Chargement...</div>}>
                    <Routes>
                        <Route path="/" element={<Layout />}>
                            <Route index element={<HomePage />} />
                            <Route path="about" element={<AboutPage />} />
                            <Route path="house/:id" element={<HousePage />} />
                            <Route path="login" element={<LoginPage />} />
                            <Route path="signup" element={<SignupPage />} />
                            <Route path="my-bookings" element={<MyBookingsPage />} />
                            <Route path="become-host" element={<ProtectedRoute><BecomeHostPage /></ProtectedRoute>} />
                            <Route path="become-a-host/onboarding" element={<ProtectedRoute><HostOnboardingPage /></ProtectedRoute>} />
                            <Route path="blog" element={<BlogIndexPage />} />
                            <Route path="blog/:id" element={<BlogPostPage />} />
                            <Route path="*" element={<ErrorPage />} />
                        </Route>
                    </Routes>
                </Suspense>
            </BrowserRouter>
        </AuthProvider>
    </HelmetProvider>
    </React.StrictMode>
);