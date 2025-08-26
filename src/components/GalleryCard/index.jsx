import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './_gallery-card.scss';
import FavoriteButton from '../FavoriteButton';
import whiteLogo from '../../assets/whiteLogo.png';
import { ReactComponent as StarIcon } from '../../assets/star.svg';

const GalleryCard = ({ id, title, cover, price, isFavorite, onToggleFavorite, tags = [], rating = 0 }) => {
    const [imageError, setImageError] = useState(false);

    const handleImageError = () => {
        setImageError(true);
    };

    const propertyType = tags.find(tag => ['Appartement', 'Maison', 'Loft', 'Studio'].includes(tag)) || 'Logement';

    const renderStars = () => {
        const stars = [];
        for (let i = 0; i < 5; i++) {
            stars.push(<StarIcon key={i} className={`star-icon ${i < rating ? 'filled' : ''}`} />);
        }
        return stars;
    };

    return (
        <div className="gallery-card-wrapper">
            <Link to={`/house/${id}`} className="gallery-card">
                <div className="card-image-container">
                    {cover && !imageError ? (
                        <img 
                            src={cover} 
                            alt={title} 
                            className="gallery-card__image" 
                            loading="lazy" 
                            onError={handleImageError} 
                        />
                    ) : (
                        <div className="gallery-card__placeholder">
                            <img src={whiteLogo} alt="Kasa Logo" className="gallery-card__placeholder-logo" />
                        </div>
                    )}
                    <FavoriteButton 
                        logementId={id} 
                        initialIsFavorite={isFavorite} 
                        onToggle={onToggleFavorite} 
                    />
                </div>
                <div className="gallery-card__info">
                    <div className="info-line-1">
                        <span className="property-type">{propertyType}</span>
                        <div className="rating">{renderStars()}</div>
                    </div>
                    <h2 className="gallery-card__title">{title}</h2>
                    <p className="gallery-card__price"><strong>{price}€</strong> / nuit</p>
                </div>
            </Link>
        </div>
    );
};

export default GalleryCard;
