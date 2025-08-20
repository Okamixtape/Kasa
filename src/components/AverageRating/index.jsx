import React from 'react';
import Rating from '../Rating';

const AverageRating = ({ reviews }) => {
    if (!reviews || reviews.length === 0) {
        return null; 
    }

    const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
    const average = totalRating / reviews.length;
    const reviewCount = reviews.length;

    return (
        <div className="averageRating">
            <Rating rating={average} />
            <p className="averageRating__count">({reviewCount} avis)</p>
        </div>
    );
};

export default AverageRating;
