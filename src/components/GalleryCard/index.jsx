import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './_gallery-card.scss';
import FavoriteButton from '../FavoriteButton';
import whiteLogo from '../../assets/whiteLogo.png';

const GalleryCard = ({ id, title, cover, price, isFavorite, onToggleFavorite }) => {
    const [imageError, setImageError] = useState(false);

    const handleImageError = () => {
        setImageError(true);
    };
    return (
        <Link to={`/house/${id}`} className="gallery-card">
            {cover && !imageError ? (
                <>
                    <img 
                        src={cover} 
                        alt={title} 
                        className="gallery-card__image" 
                        loading="lazy" 
                        onError={handleImageError} 
                    />
                    <div className="gallery-card__overlay"></div>
                </>
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
            <div className="gallery-card__info">
                <h2 className="gallery-card__title">{title}</h2>
                {price && <p className="gallery-card__price">{price}€ / nuit</p>}
            </div>
        </Link>
    );
};

export default GalleryCard;
