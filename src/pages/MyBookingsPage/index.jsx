import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import '../../style/pages/_my-bookings-page.scss';

const MyBookingsPage = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { user } = useAuth();

    useEffect(() => {
        if (!user) {
            setLoading(false);
            return;
        }

        const fetchBookings = async () => {
            setLoading(true);
            setError('');
            try {
                const token = localStorage.getItem('token');
                                const response = await fetch(`${process.env.REACT_APP_API_URL}/my-bookings`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch bookings');
                }

                const data = await response.json();
                setBookings(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, [user]);

    const handleCancelBooking = async (bookingId) => {
        if (!window.confirm('Êtes-vous sûr de vouloir annuler cette réservation ?')) {
            return;
        }

        setError('');
        try {
            const token = localStorage.getItem('token');
                        const response = await fetch(`${process.env.REACT_APP_API_URL}/bookings/${bookingId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || 'Impossible d\'annuler la réservation.');
            }

            // Filter out the cancelled booking from the state
            setBookings(currentBookings => currentBookings.filter(b => b.id !== bookingId));

        } catch (err) {
            setError(err.message);
        }
    };

    if (loading) {
        return <div>Loading bookings...</div>;
    }

    if (!user) {
        return (
            <main className="kasa__wrapper fade-in kasa__main-container">
                <h1>Mes réservations</h1>
                <p>Veuillez vous <Link to="/login">connecter</Link> pour voir vos réservations.</p>
            </main>
        );
    }
    
    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <>
            <Helmet>
                <title>Mes réservations - Kasa</title>
                <meta name="description" content="Consultez et gérez vos réservations sur Kasa. Retrouvez les détails de vos séjours passés et à venir." />
            </Helmet>
            <main className="kasa__wrapper fade-in">
                <h1>Mes réservations</h1>
                <p>Retrouvez ici l&apos;historique de vos séjours.</p>
                <div className="bookings-container">
                    {bookings.map(booking => (
                        <div key={booking.id} className="booking-card">
                            {booking.house ? (
                                <>
                                                                        <Link to={`/house/${booking.house.id}`}>
                                        <img src={booking.house.cover} alt={booking.house.title} className="booking-card__image" />
                                    </Link>
                                    <div className="booking-card__info">
                                                                                <Link to={`/house/${booking.house.id}`} className="booking-card__title-link">
                                            <h2>{booking.house.title}</h2>
                                        </Link>
                                        <p><strong>Du:</strong> {new Date(booking.startDate).toLocaleDateString()}</p>
                                        <p><strong>Au:</strong> {new Date(booking.endDate).toLocaleDateString()}</p>
                                        <div className="booking-card__actions">
                                            <button 
                                                onClick={() => handleCancelBooking(booking.id)} 
                                                className="booking-card__cancel-btn"
                                            >
                                                Annuler la réservation
                                            </button>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <p>Informations sur le logement non disponibles.</p>
                            )}
                        </div>
                    ))}
                </div>
            </main>
        </>
    );
};

export default MyBookingsPage;
