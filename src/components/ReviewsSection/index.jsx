import React from 'react';
import './_reviews-section.scss';
import ReviewCard from '../ReviewCard';
import ReviewForm from '../ReviewForm';

const ReviewsSection = ({ reviews, logementId, onReviewSubmit, token }) => {
    if (!reviews || reviews.length === 0) {
        return (
            <div className="reviewsSection">
                <h2 className="reviewsSection__title">Avis des clients</h2>
                <p className="reviewsSection__no-reviews">Il n&apos;y a pas encore d&apos;avis pour ce logement.</p>
            </div>
        );
    }

    return (
        <div className="reviewsSection">
            <h2 className="reviewsSection__title">Avis des clients ({reviews.length})</h2>
            <div className="reviewsSection__list">
                {reviews.map((review, index) => (
                    <ReviewCard key={index} review={review} />
                ))}
            </div>
            <ReviewForm logementId={logementId} onReviewSubmit={onReviewSubmit} token={token} />
        </div>
    );
};

export default ReviewsSection;
