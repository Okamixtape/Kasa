import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import Meta from '../../components/Meta';
import HouseCard from '../../components/HouseCard';
import '../../style/pages/_host-dashboard-page.scss';

const HostDashboardPage = () => {
    const { user } = useAuth();
    const [listings, setListings] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const handleDelete = async (listingId) => {
        if (window.confirm('Êtes-vous sûr de vouloir supprimer cette annonce ?')) {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/logements/${listingId}`, {
                    method: 'DELETE',
                });

                if (!response.ok) {
                    throw new Error('La suppression a échoué.');
                }

                setListings(listings.filter(listing => listing.id !== listingId));
            } catch (err) {
                setError(err.message);
            }
        }
    };

    useEffect(() => {
        if (!user) {
            setLoading(false);
            setError('Vous devez être connecté pour voir cette page.');
            return;
        }

        const fetchData = async () => {
            try {
                const [listingsRes, bookingsRes] = await Promise.all([
                    fetch(`${process.env.REACT_APP_API_URL}/users/${user.id}/logements`),
                    fetch(`${process.env.REACT_APP_API_URL}/users/${user.id}/bookings`)
                ]);

                if (!listingsRes.ok || !bookingsRes.ok) {
                    throw new Error('Erreur lors de la récupération des données.');
                }

                const listingsData = await listingsRes.json();
                const bookingsData = await bookingsRes.json();

                setListings(listingsData);
                setBookings(bookingsData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [user]);

    if (loading) {
        return <div>Chargement de votre tableau de bord...</div>;
    }

    if (error) {
        return <div>Erreur: {error}</div>;
    }
    return (
        <>
            <Meta 
                title="Tableau de bord Hôte" 
                description="Gérez vos annonces, consultez vos réservations et suivez vos revenus."
            />
            <main className="kasa__wrapper fade-in kasa__main-container host-dashboard-page">
                <h1>Tableau de bord Hôte</h1>
                <p>Bienvenue sur votre tableau de bord. D'ici, vous pourrez gérer vos propriétés et réservations.</p>

                <div className="dashboard-modules">
                    <section className="dashboard-module">
                        <h2>Performances</h2>
                        <p>Suivez vos revenus et l'engagement de vos annonces.</p>
                        <Link to="/host/analytics" className="btn btn-primary">Voir mes statistiques</Link>
                    </section>
                    <section className="dashboard-module">
                        <h2>Mes propriétés</h2>
                        <div className="listings-grid">
                            {listings.length > 0 ? (
                                listings.map(listing => (
                                    <div key={listing.id} className="listing-item">
                                        <HouseCard {...listing} />
                                        <div className="listing-actions">
                                            <Link to={`/host/listings/${listing.id}/edit`} className="btn btn-secondary">Modifier</Link>
                                            <button className="btn btn-danger" onClick={() => handleDelete(listing.id)}>Supprimer</button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>Vous n'avez pas encore de propriété. <Link to="/become-a-host/onboarding">Ajoutez votre premier logement !</Link></p>
                            )}
                        </div>
                    </section>
                    <section className="dashboard-module">
                        <h2>Mes réservations</h2>
                        <div className="bookings-list">
                            {bookings.length > 0 ? (
                                bookings.map(booking => {
                                    const listing = listings.find(l => l.id === booking.houseId);
                                    return (
                                        <div key={booking.id} className="booking-item">
                                            <p><strong>{listing ? listing.title : 'Logement inconnu'}</strong></p>
                                            <p>Du {new Date(booking.startDate).toLocaleDateString()} au {new Date(booking.endDate).toLocaleDateString()}</p>
                                        </div>
                                    );
                                })
                            ) : (
                                <p>Aucune réservation à venir pour le moment.</p>
                            )}
                        </div>
                    </section>
                </div>
            </main>
        </>
    );
};

export default HostDashboardPage;
