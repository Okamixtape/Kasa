import React from 'react';
import './_rating-input.scss';

const RatingInput = ({ label, name, value, onChange }) => {
    return (
        <div className="rating-input">
            <label>{label}</label>
            <div className="stars">
                {[...Array(5)].map((_, index) => {
                    const ratingValue = index + 1;
                    return (
                        <span
                            key={ratingValue}
                            className={ratingValue <= value ? 'star-filled' : 'star-empty'}
                            onClick={() => onChange(name, ratingValue)}
                        >
                            ★
                        </span>
                    );
                })}
            </div>
        </div>
    );
};

export default RatingInput;
