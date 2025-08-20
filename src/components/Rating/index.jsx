import React from 'react';
import { ReactComponent as Star } from '../../assets/star.svg';

const Rating = ({ rating }) => {
    const stars = [];
    const ratingNumber = Math.round(rating);

    for (let i = 0; i < 5; i++) {
        const color = ratingNumber > i ? '#FF6060' : '#E3E3E3';
        stars.push(<Star fill={color} key={i} />);
    }

    return <div className="houseCard__rating">{stars}</div>;
};

export default Rating;