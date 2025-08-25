import React, { useState } from 'react';
import StarRating from '../StarRating';
import './_reviews.scss';

const Reviews = ({ reviews = [], logementId, onReviewSubmit, token }) => {
  const [comment, setComment] = useState('');
  // Add state for ratings if you build the form

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle submission logic here
  };

  return (
    <div className="reviews-section">
      <h2 className="reviews-section__title">Avis des clients ({reviews.length})</h2>
      <div className="reviews-list">
        {reviews.map((review) => (
          <div key={review.id || review.author} className="review-card">
            <div className="review-card__header">
              <div className="review-card__author-info">
                <p className="review-card__author">{review.author}</p>
                <p className="review-card__date">{review.date}</p>
              </div>
              <div className="review-card__rating">
                <StarRating rating={review.rating} />
              </div>
            </div>
            <p className="review-card__comment">{review.comment}</p>
            {review.details && (
              <div className="review-card__details">
                {Object.entries(review.details).map(([key, value]) => (
                  <div key={key} className="review-detail">
                    <span className="review-detail__name">{key}</span>
                    <div className="review-detail__rating">
                      <StarRating rating={value} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="review-form-wrapper">
        <h3>Laissez un avis</h3>
        <form onSubmit={handleSubmit} className="review-form">
          <textarea
            className="review-form__textarea"
            placeholder="Votre commentaire"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          />
          {/* Add star rating inputs here */}
          <button type="submit" className="review-form__button">Envoyer</button>
        </form>
      </div>
    </div>
  );
};

export default Reviews;
