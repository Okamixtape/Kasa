import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const propertyTypes = [
    { id: 'apartment', label: 'Appartement' },
    { id: 'house', label: 'Maison' },
    { id: 'guest-house', label: 'Maison d\'hôtes' },
    { id: 'hotel', label: 'Hôtel' },
];

const Step1 = ({ onNext, formData }) => {
    const [selectedType, setSelectedType] = useState(formData.propertyType || null);

    return (
        <div className="onboarding-step">
            <h2>Quel type de logement proposez-vous ?</h2>
            <div className="property-types">
                {propertyTypes.map((type) => (
                    <button 
                        key={type.id} 
                        className={`type-button ${selectedType === type.id ? 'selected' : ''}`}
                        onClick={() => setSelectedType(type.id)}
                    >
                        {type.label}
                    </button>
                ))}
            </div>
            <div className="navigation-buttons">
                <button onClick={() => onNext({ propertyType: selectedType })} disabled={!selectedType}>Suivant</button>
            </div>
        </div>
    );
};

const Step2 = ({ onNext, onBack, formData }) => {
    const [address, setAddress] = useState(formData.address || '');
    const [city, setCity] = useState(formData.city || '');
    const [postalCode, setPostalCode] = useState(formData.postalCode || '');
    const [country, setCountry] = useState(formData.country || '');

    const isFormValid = address && city && postalCode && country;

    return (
        <div className="onboarding-step">
            <h2>Où se situe votre logement ?</h2>
            <div className="address-form">
                <input type="text" placeholder="Adresse" value={address} onChange={(e) => setAddress(e.target.value)} />
                <input type="text" placeholder="Ville" value={city} onChange={(e) => setCity(e.target.value)} />
                <input type="text" placeholder="Code Postal" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} />
                <input type="text" placeholder="Pays" value={country} onChange={(e) => setCountry(e.target.value)} />
            </div>
            <div className="navigation-buttons">
                <button onClick={onBack} className="back-button">Précédent</button>
                <button onClick={() => onNext({ address, city, postalCode, country })} disabled={!isFormValid}>Suivant</button>
            </div>
        </div>
    );
};

const Counter = ({ label, value, onIncrement, onDecrement }) => (
    <div className="counter">
        <span className="counter-label">{label}</span>
        <div className="counter-controls">
            <button onClick={onDecrement} disabled={value <= 0}>-</button>
            <span className="counter-value">{value}</span>
            <button onClick={onIncrement}>+</button>
        </div>
    </div>
);

const Step3 = ({ onNext, onBack, formData }) => {
    const [guests, setGuests] = useState(formData.guests || 1);
    const [bedrooms, setBedrooms] = useState(formData.bedrooms || 1);
    const [bathrooms, setBathrooms] = useState(formData.bathrooms || 1);

    return (
        <div className="onboarding-step">
            <h2>Informations de base sur le logement</h2>
            <div className="basics-form">
                <Counter 
                    label="Voyageurs"
                    value={guests}
                    onIncrement={() => setGuests(guests + 1)}
                    onDecrement={() => setGuests(guests - 1)}
                />
                <Counter 
                    label="Chambres"
                    value={bedrooms}
                    onIncrement={() => setBedrooms(bedrooms + 1)}
                    onDecrement={() => setBedrooms(bedrooms - 1)}
                />
                <Counter 
                    label="Salles de bain"
                    value={bathrooms}
                    onIncrement={() => setBathrooms(bathrooms + 1)}
                    onDecrement={() => setBathrooms(bathrooms - 1)}
                />
            </div>
            <div className="navigation-buttons">
                <button onClick={onBack} className="back-button">Précédent</button>
                <button onClick={() => onNext({ guests, bedrooms, bathrooms })}>Suivant</button>
            </div>
        </div>
    );
};

const amenitiesList = [
    { id: 'wifi', label: 'Wi-Fi' },
    { id: 'kitchen', label: 'Cuisine' },
    { id: 'tv', label: 'Télévision' },
    { id: 'air-conditioning', label: 'Climatisation' },
    { id: 'washing-machine', label: 'Lave-linge' },
    { id: 'parking', label: 'Parking gratuit' },
];

const Step4 = ({ onNext, onBack, formData }) => {
    const [selectedAmenities, setSelectedAmenities] = useState(formData.amenities || []);

    const toggleAmenity = (amenityId) => {
        setSelectedAmenities((prev) => 
            prev.includes(amenityId) 
                ? prev.filter((id) => id !== amenityId) 
                : [...prev, amenityId]
        );
    };

    return (
        <div className="onboarding-step">
            <h2>Quels équipements proposez-vous ?</h2>
            <div className="amenities-grid">
                {amenitiesList.map((amenity) => (
                    <button 
                        key={amenity.id} 
                        className={`amenity-button ${selectedAmenities.includes(amenity.id) ? 'selected' : ''}`}
                        onClick={() => toggleAmenity(amenity.id)}
                    >
                        {amenity.label}
                    </button>
                ))}
            </div>
            <div className="navigation-buttons">
                <button onClick={onBack} className="back-button">Précédent</button>
                <button onClick={() => onNext({ amenities: selectedAmenities })}>Suivant</button>
            </div>
        </div>
    );
};

const Step5 = ({ onNext, onBack, formData }) => {
    const [photos, setPhotos] = useState(formData.photos || []);
    const [photoPreviews, setPhotoPreviews] = useState(formData.photos ? formData.photos.map(p => URL.createObjectURL(p)) : []);

    useEffect(() => {
        // Cleanup object URLs to avoid memory leaks
        return () => {
            photoPreviews.forEach(url => URL.revokeObjectURL(url));
        };
    }, [photoPreviews]);

    const handlePhotoUpload = (e) => {
        const files = Array.from(e.target.files);
        setPhotos(prev => [...prev, ...files]);
        
        const newPreviews = files.map(file => URL.createObjectURL(file));
        setPhotoPreviews(prev => [...prev, ...newPreviews]);
    };

    return (
        <div className="onboarding-step">
            <h2>Ajoutez des photos de votre logement</h2>
            <div className="photo-uploader">
                <input 
                    type="file" 
                    multiple 
                    accept="image/*" 
                    onChange={handlePhotoUpload} 
                    id="photo-upload-input"
                    style={{ display: 'none' }}
                />
                <label htmlFor="photo-upload-input" className="photo-upload-label">
                    Cliquez pour ajouter des photos
                </label>
                <div className="photo-preview-grid">
                    {photoPreviews.map((previewUrl, index) => (
                        <img key={index} src={previewUrl} alt={`Aperçu ${index + 1}`} className="photo-preview" />
                    ))}
                </div>
            </div>
            <div className="navigation-buttons">
                <button onClick={onBack} className="back-button">Précédent</button>
                <button onClick={() => onNext({ photos })} disabled={photos.length === 0}>Suivant</button>
            </div>
        </div>
    );
};

const Step6 = ({ onNext, onBack, formData }) => {
    const [title, setTitle] = useState(formData.title || '');
    const [description, setDescription] = useState(formData.description || '');

    const isFormValid = title.length >= 5 && description.length >= 20;

    return (
        <div className="onboarding-step">
            <h2>Titre et description de l'annonce</h2>
            <div className="text-inputs-form">
                <input 
                    type="text" 
                    placeholder="Titre de l'annonce (ex: Appartement cosy au coeur de Paris)" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                />
                <textarea 
                    placeholder="Décrivez votre logement en quelques mots..." 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)} 
                    rows="6"
                />
            </div>
            <div className="navigation-buttons">
                <button onClick={onBack} className="back-button">Précédent</button>
                <button onClick={() => onNext({ title, description })} disabled={!isFormValid}>Suivant</button>
            </div>
        </div>
    );
};

const Step7 = ({ onNext, onBack, formData }) => {
    const [price, setPrice] = useState(formData.price || '');

    const isFormValid = price > 0;

    return (
        <div className="onboarding-step">
            <h2>Fixez votre prix par nuit</h2>
            <div className="price-form">
                <input 
                    type="number" 
                    placeholder="Prix en €" 
                    value={price} 
                    onChange={(e) => setPrice(e.target.value)} 
                    className="price-input"
                />
            </div>
            <div className="navigation-buttons">
                <button onClick={onBack} className="back-button">Précédent</button>
                <button onClick={() => onNext({ price })} disabled={!isFormValid}>Suivant</button>
            </div>
        </div>
    );
};

const Step8 = ({ onBack, formData, navigate }) => {
    const handleSubmit = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('Vous devez être connecté pour publier une annonce.');
            return;
        }

        const data = new FormData();
        data.append('title', formData.title);
        data.append('description', formData.description);
        data.append('price', formData.price);
        data.append('location', formData.address); // Assuming the backend can parse this
        data.append('propertyType', formData.propertyType);
        if (formData.amenities) {
            formData.amenities.forEach(amenity => data.append('equipments[]', amenity));
        }
        if (formData.photos) {
            formData.photos.forEach(photo => {
                data.append('pictures', photo); // 'pictures' must match the backend field for file uploads
            });
        }

        try {
                        const response = await fetch(`${process.env.REACT_APP_API_URL}/logements`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    // Do NOT set 'Content-Type'. The browser will set it automatically for FormData.
                },
                body: data,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'La création de l\'annonce a échoué.');
            }

            alert('Annonce créée avec succès ! Vous allez être redirigé.');
            navigate('/');

        } catch (error) {
            console.error('Erreur lors de la soumission de l\'annonce:', error);
            alert(error.message);
        }
    };

    return (
        <div className="onboarding-step">
            <h2>Récapitulatif de l'annonce</h2>
            <div className="summary-details">
                <h3>{formData.title}</h3>
                <p>{formData.address}, {formData.city}, {formData.postalCode}, {formData.country}</p>
                <div className="photo-preview-grid">
                    {formData.photos && formData.photos.map((photo, index) => (
                        <img key={index} src={URL.createObjectURL(photo)} alt={`Aperçu ${index + 1}`} className="photo-preview" />
                    ))}
                </div>
                <p><strong>{formData.price}€</strong> par nuit</p>
                <p>{formData.description}</p>
            </div>
            <div className="navigation-buttons">
                <button onClick={onBack} className="back-button">Précédent</button>
                <button onClick={handleSubmit} className="publish-button">Publier l'annonce</button>
            </div>
        </div>
    );
};

const HostOnboardingForm = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({});

    const handleNext = (data) => {
        setFormData({ ...formData, ...data });
        setStep(step + 1);
    };

    const handleBack = () => {
        setStep(step - 1);
    };

    return (
        <div className="host-onboarding-form">
            {step === 1 && <Step1 onNext={handleNext} formData={formData} />}
            {/* Les étapes suivantes viendront ici */}
            {step === 2 && <Step2 onNext={handleNext} onBack={handleBack} formData={formData} />}
            {step === 3 && <Step3 onNext={handleNext} onBack={handleBack} formData={formData} />}
            {step === 4 && <Step4 onNext={handleNext} onBack={handleBack} formData={formData} />}
            {step === 5 && <Step5 onNext={handleNext} onBack={handleBack} formData={formData} />}
            {step === 6 && <Step6 onNext={handleNext} onBack={handleBack} formData={formData} />}
            {step === 7 && <Step7 onNext={handleNext} onBack={handleBack} formData={formData} />}
            {step === 8 && <Step8 onBack={handleBack} formData={formData} navigate={navigate} />}
        </div>
    );
};

export default HostOnboardingForm;
