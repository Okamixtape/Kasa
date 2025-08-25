import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './style/main.scss';
import 'leaflet/dist/leaflet.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
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
const FavoritesPage = lazy(() => import('./pages/FavoritesPage'));
const BookingConfirmationPage = lazy(() => import('./pages/BookingConfirmationPage'));
const HostDashboardPage = lazy(() => import('./pages/HostDashboardPage'));
const HostAnalyticsPage = lazy(() => import('./pages/HostAnalyticsPage'));
const EditListingPage = lazy(() => import('./pages/EditListingPage'));
const LegalPage = lazy(() => import('./pages/Legal/LegalPage'));
const PrivacyPolicyPage = lazy(() => import('./pages/Legal/PrivacyPolicyPage'));


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <HelmetProvider>
            <AuthProvider>
                <NotificationProvider>
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
                            <Route path="favorites" element={<ProtectedRoute><FavoritesPage /></ProtectedRoute>} />
                            <Route path="booking-confirmation/:bookingId" element={<ProtectedRoute><BookingConfirmationPage /></ProtectedRoute>} />
                            <Route path="host/dashboard" element={<ProtectedRoute permission="view_host_dashboard"><HostDashboardPage /></ProtectedRoute>} />
                            <Route path="host/analytics" element={<ProtectedRoute permission="view_analytics"><HostAnalyticsPage /></ProtectedRoute>} />
                            <Route path="host/listings/:id/edit" element={<ProtectedRoute permission="edit_listing"><EditListingPage /></ProtectedRoute>} />
                            <Route path="mentions-legales" element={<LegalPage />} />
                            <Route path="politique-de-confidentialite" element={<PrivacyPolicyPage />} />
                            <Route path="*" element={<ErrorPage />} />
                        </Route>
                    </Routes>
                </Suspense>
                </BrowserRouter>
            </NotificationProvider>
        </AuthProvider>
    </HelmetProvider>
    </React.StrictMode>
);