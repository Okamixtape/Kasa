import React from 'react';
import './_review-card.scss';
import Rating from '../Rating';

const ReviewCard = ({ review }) => {
    const { author, rating, comment, date, detailedRating } = review;

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
            {detailedRating && (
                <div className="reviewCard__detailed-rating">
                    <div className="detailed-rating__item">
                        <span>Propreté</span>
                        <Rating rating={detailedRating.cleanliness} />
                    </div>
                    <div className="detailed-rating__item">
                        <span>Communication</span>
                        <Rating rating={detailedRating.communication} />
                    </div>
                    <div className="detailed-rating__item">
                        <span>Arrivée</span>
                        <Rating rating={detailedRating.checkin} />
                    </div>
                    <div className="detailed-rating__item">
                        <span>Précision</span>
                        <Rating rating={detailedRating.accuracy} />
                    </div>
                    <div className="detailed-rating__item">
                        <span>Emplacement</span>
                        <Rating rating={detailedRating.location} />
                    </div>
                    <div className="detailed-rating__item">
                        <span>Rapport qualité-prix</span>
                        <Rating rating={detailedRating.value} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default ReviewCard;
