import React, { useState } from 'react';
import axios from 'axios';

const NOMINATIM_API_URL = 'https://nominatim.openstreetmap.org/search';

const AddPropertyForm = ({ onNext, onBack }) => {
    const [formData, setFormData] = useState({
        title: '',
        address: '',
        city: '',
        postalCode: '',
        description: '',
        price: '',
        coordinates: null
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleGeocodeAndSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const fullAddress = `${formData.address}, ${formData.city}, ${formData.postalCode}`;

        try {
            const response = await axios.get(NOMINATIM_API_URL, {
                params: {
                    q: fullAddress,
                    format: 'json',
                    limit: 1
                },
                headers: {
                    'User-Agent': 'Kasa-App/1.0 (pour un projet éducatif)'
                }
            });

            if (response.data && response.data.length > 0) {
                const { lat, lon } = response.data[0];
                const finalData = {
                    ...formData,
                    coordinates: {
                        latitude: parseFloat(lat),
                        longitude: parseFloat(lon),
                    }
                };
                
                console.log('Submitting data with coordinates:', finalData);
                onNext(finalData);
            } else {
                setError('Impossible de vérifier l\'adresse. Veuillez vérifier les informations saisies.');
            }
        } catch (error) {
            console.error('Geocoding error:', error);
            setError('Une erreur est survenue lors de la vérification de l\'adresse.');
        }
    };

    return (
        <form onSubmit={handleGeocodeAndSubmit} className="add-property-form">
            <h2>Étape 2: Ajout de votre premier logement</h2>
            {error && <p className="error-message">{error}</p>}
            
            <input name="title" value={formData.title} onChange={handleChange} placeholder="Titre de l'annonce" required />
            <input name="address" value={formData.address} onChange={handleChange} placeholder="Adresse" required />
            <input name="city" value={formData.city} onChange={handleChange} placeholder="Ville" required />
            <input name="postalCode" value={formData.postalCode} onChange={handleChange} placeholder="Code Postal" required />
            <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description du logement" required />
            <input name="price" type="number" value={formData.price} onChange={handleChange} placeholder="Prix par nuit (€)" required />

            <div>
                <button type="button" onClick={onBack}>Précédent</button>
                <button type="submit">Suivant</button>
            </div>
        </form>
    );
};

export default AddPropertyForm;
