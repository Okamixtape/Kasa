import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './index.scss';

const EditListingPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchListing = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/logements/${id}`);
                if (!response.ok) {
                    throw new Error('Annonce non trouvée.');
                }
                const data = await response.json();
                if (user && data.hostId !== user.id) {
                    setError('Vous n\'êtes pas autorisé à modifier cette annonce.');
                } else {
                    setListing(data);
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchListing();
    }, [id, user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setListing(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/logements/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(listing),
            });

            if (!response.ok) {
                throw new Error('La mise à jour a échoué.');
            }

            navigate('/host/dashboard');
        } catch (err) {
            setError(err.message);
        }
    };

    if (loading) return <div>Chargement...</div>;
    if (error) return <div>Erreur: {error}</div>;
    if (!listing) return <div>Annonce non trouvée.</div>;
    if (user && listing.hostId !== user.id) return <div>Vous n'êtes pas autorisé à modifier cette annonce.</div>;

    return (
        <div className="edit-listing-page">
            <h1>Modifier l'annonce</h1>
            <form onSubmit={handleSubmit} className="edit-listing-form">
                <div className="form-group">
                    <label htmlFor="title">Titre</label>
                    <input type="text" id="title" name="title" value={listing.title} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea id="description" name="description" value={listing.description} onChange={handleChange} required />
                </div>
                <button type="submit" className="btn btn-primary">Enregistrer les modifications</button>
            </form>
        </div>
    );
};

export default EditListingPage;
