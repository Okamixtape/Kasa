import React, { useState, useEffect } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './_booking-widget.scss';
import fr from 'date-fns/locale/fr';
import { useAuth } from '../../context/AuthContext';

registerLocale('fr', fr);

const BookingWidget = ({ houseId }) => {
    const { user } = useAuth();
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [bookedDates, setBookedDates] = useState([]);

    useEffect(() => {
        const fetchBookedDates = async () => {
            try {
                const response = await fetch(`http://localhost:3001/api/houses/${houseId}/bookings`);
                if (!response.ok) {
                    throw new Error('Could not fetch booking data.');
                }
                const bookings = await response.json();
                const dateRanges = bookings.map(booking => ({
                    start: new Date(booking.startDate),
                    end: new Date(booking.endDate)
                }));
                setBookedDates(dateRanges);
            } catch (err) {
                console.error('Error fetching booked dates:', err.message);
            }
        };

        if (houseId) {
            fetchBookedDates();
        }
    }, [houseId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!user) {
            setError('Vous devez être connecté pour réserver.');
            return;
        }

        if (!startDate || !endDate) {
            setError('Veuillez sélectionner une date de début et de fin.');
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:3001/api/bookings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ houseId, startDate: startDate.toISOString().split('T')[0], endDate: endDate.toISOString().split('T')[0] }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'La réservation a échoué.');
            }

            setSuccess('Réservation réussie !');
            setBookedDates(prev => [...prev, { start: startDate, end: endDate }]);
            setStartDate(null);
            setEndDate(null);

        } catch (err) {
            setError(err.message);
        }
    };

    const onChange = (dates) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
    };

    if (!user) {
        return <p>Veuillez vous connecter pour réserver ce logement.</p>;
    }

    return (
        <div className="booking-widget">
            <h3>Réserver ce logement</h3>
            <form onSubmit={handleSubmit}>
                <div className="booking-widget__datepicker-container">
                    <DatePicker
                        selected={startDate}
                        onChange={onChange}
                        startDate={startDate}
                        endDate={endDate}
                        excludeDateIntervals={bookedDates}
                        selectsRange
                        inline
                        minDate={new Date()}
                        monthsShown={2}
                        locale="fr"
                        dateFormat="P"
                    />
                </div>
                <button type="submit" disabled={!startDate || !endDate}>Réserver</button>
                {error && <p className="error-message">{error}</p>}
                {success && <p className="success-message">{success}</p>}
            </form>
        </div>
    );
};

export default BookingWidget;
