import React from 'react';
import { NavLink } from 'react-router-dom';

const HomeCard = ({ id, img, title }) => {
    return (
        <div className="homeCard">
            <NavLink to={`/house/${id}`}>
                <div className="homeCard__background"></div>
                <img className="homeCard__image" src={img} alt={title} loading="lazy" />
                <p className="homeCard__text">{title}</p>
            </NavLink>
        </div>
    );
};

export default HomeCard;