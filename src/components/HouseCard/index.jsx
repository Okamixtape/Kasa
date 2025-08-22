import React from 'react';
import { Link } from 'react-router-dom';
import './_house-card.scss';
import AverageRating from '../AverageRating';
import { useAuth } from '../../context/AuthContext';

const HouseCard = ({ tags = [], reviews = [], host = { name: 'Hôte inconnu', picture: '' }, title, location, id, onBooking, titleAs: TitleTag = 'h3' }) => {
    const { user } = useAuth();
    const hostNameParts = host.name ? host.name.split(' ') : ['Hôte', 'Inconnu'];

    return (
        <div key={id} className="houseCard">
            <div>
                <TitleTag className="houseCard__title">{title}</TitleTag>
                <p className="houseCard__location">{location}</p>
                <div className="houseCard__tags">
                    {tags.map((tag) => (
                        <p className="houseCard__tag" key={tag}>{tag}</p>
                    ))}
                </div>
            </div>

        </div>
    );
};

export default HouseCard;