import React, { useState } from 'react';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import './style.scss';

const BookingModal = ({ isOpen, onClose, house }) => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [isConfirmed, setIsConfirmed] = useState(false);

    const handleConfirm = () => {
        setIsConfirmed(true);
    };

    

    const numberOfNights = startDate && endDate ? Math.round((endDate - startDate) / (1000 * 60 * 60 * 24)) : 0;
    const totalPrice = numberOfNights * house?.price;

    if (!isOpen) {
        return null;
    }

    return (
        <div className="booking-modal__overlay" onClick={onClose}>
            <div className="booking-modal__content" onClick={(e) => e.stopPropagation()}>
                {isConfirmed ? (
                    <div className="booking-modal__confirmation">
                        <h2>Réservation confirmée !</h2>
                        <p>Votre séjour a bien été enregistré. Vous recevrez bientôt un e-mail de confirmation.</p>
                        <div className="booking-modal__summary">
                            <h3>Résumé de la réservation</h3>
                            <p><strong>Logement :</strong> {house.title}</p>
                            <p><strong>Date d&rsquo;arrivée :</strong> {startDate.toLocaleDateString()}</p>
                            <p><strong>Date de départ :</strong> {endDate.toLocaleDateString()}</p>
                            <p><strong>Nombre de nuits :</strong> {numberOfNights}</p>
                            <p className="booking-modal__total-price"><strong>Prix total :</strong> {totalPrice} €</p>
                        </div>
                        <div className="booking-modal__actions">
                            <button onClick={onClose} className="booking-modal__close-button">
                                Fermer
                            </button>
                        </div>
                    </div>
                ) : (
                    <>
                        <h2>Simuler une réservation</h2>
                        <div className="booking-modal__date-pickers">
                            <div className="booking-modal__date-picker-container">
                                <label>Date d&rsquo;arrivée</label>
                                <DatePicker
                                    selected={startDate}
                                    onChange={(date) => setStartDate(date)}
                                    selectsStart
                                    startDate={startDate}
                                    endDate={endDate}
                                    minDate={new Date()}
                                    placeholderText="jj/mm/aaaa"
                                    dateFormat="dd/MM/yyyy"
                                    className="booking-modal__datepicker-input"
                                />
                            </div>
                            <div className="booking-modal__date-picker-container">
                                <label>Date de départ</label>
                                <DatePicker
                                    selected={endDate}
                                    onChange={(date) => setEndDate(date)}
                                    selectsEnd
                                    startDate={startDate}
                                    endDate={endDate}
                                    minDate={startDate || new Date()}
                                    placeholderText="jj/mm/aaaa"
                                    dateFormat="dd/MM/yyyy"
                                    className="booking-modal__datepicker-input"
                                />
                            </div>
                        </div>
                        {startDate && endDate && (
                            <div className="booking-modal__summary">
                                <h3>Résumé de la réservation</h3>
                                <p>Date d&rsquo;arrivée : {startDate.toLocaleDateString()}</p>
                                <p>Date de départ : {endDate.toLocaleDateString()}</p>
                                <p>Nombre de nuits : {numberOfNights}</p>
                                <p className="booking-modal__total-price">Prix total : {totalPrice} €</p>
                            </div>
                        )}
                        <div className="booking-modal__actions">
                            <button onClick={onClose} className="booking-modal__close-button">
                                Fermer
                            </button>
                            {totalPrice > 0 && (
                                <button className="booking-modal__confirm-button" onClick={handleConfirm}>
                                    Confirmer la réservation
                                </button>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default BookingModal;
