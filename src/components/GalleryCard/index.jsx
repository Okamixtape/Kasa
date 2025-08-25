import React from 'react';
import { Link } from 'react-router-dom';
import './_gallery-card.scss';
import FavoriteButton from '../FavoriteButton';

const GalleryCard = ({ id, title, cover, price, isFavorite, onToggleFavorite }) => {
    return (
        <Link to={`/house/${id}`} className="gallery-card">
            <img src={cover} alt={title} className="gallery-card__image" loading="lazy" />
            <div className="gallery-card__overlay"></div>
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
