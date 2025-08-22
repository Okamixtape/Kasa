import React from 'react';
import './_review-card.scss';
import Rating from '../Rating';

const ReviewCard = ({ review }) => {
    const { author, rating, comment, date } = review;

    const formattedDate = new Date(date).toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <div className="reviewCard">
            <div className="reviewCard__header">
                <p className="reviewCard__author">{author}</p>
                <p className="reviewCard__date">{formattedDate}</p>
            </div>
            <div className="reviewCard__rating">
                <Rating rating={rating} />
            </div>
            <p className="reviewCard__comment">{comment}</p>
        </div>
    );
};

export default ReviewCard;
