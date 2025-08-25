import React from 'react';
import './_star-rating.scss';

const StarRating = ({ rating }) => {
  const totalStars = 5;
  const filledStars = Math.round(rating);

  return (
    <div className="star-rating">
      {[...Array(totalStars)].map((_, index) => (
        <span key={index} className={index < filledStars ? 'star -filled' : 'star'}>★</span>
      ))}
    </div>
  );
};

export default StarRating;
