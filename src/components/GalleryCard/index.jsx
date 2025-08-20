import React from 'react';
import { Link } from 'react-router-dom';

const GalleryCard = ({ id, title, cover }) => {
    return (
        <Link to={`/house/${id}`} className="gallery-card">
            <img src={cover} alt={title} className="gallery-card__image" loading="lazy" />
            <div className="gallery-card__overlay"></div>
            <h2 className="gallery-card__title">{title}</h2>
        </Link>
    );
};

export default GalleryCard;
