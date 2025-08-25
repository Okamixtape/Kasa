import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './_booking-confirmation-page.scss';

const BookingConfirmationPage = () => {
    const { bookingId } = useParams();
    const [booking, setBooking] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBooking = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch(`${process.env.REACT_APP_API_URL}/bookings/${bookingId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (!response.ok) {
                    throw new Error('Could not fetch booking details.');
                }
                const data = await response.json();
                setBooking(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBooking();
    }, [bookingId]);

    if (loading) return <div>Chargement de votre réservation...</div>;
    if (error) return <div>Erreur : {error}</div>;
    if (!booking) return <div>Aucune information de réservation trouvée.</div>;

    return (
        <div className="booking-confirmation-page">
            <h1>Merci pour votre réservation !</h1>
            <p>Votre séjour au <strong>{booking.house.title}</strong> est confirmé.</p>
            <div className="booking-details">
                <h2>Détails de la réservation</h2>
                <p><strong>Numéro de réservation :</strong> {booking.id}</p>
                <p><strong>Dates :</strong> du {new Date(booking.startDate).toLocaleDateString()} au {new Date(booking.endDate).toLocaleDateString()}</p>
                <p><strong>Prix total :</strong> {booking.totalPrice}€</p>
            </div>
            <Link to="/my-bookings" className="btn-primary">Voir toutes mes réservations</Link>
        </div>
    );
};

export default BookingConfirmationPage;
