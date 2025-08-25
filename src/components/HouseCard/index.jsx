import React from 'react';
import './_house-card.scss';

const HouseCard = ({ tags = [], reviews = [], host = { name: 'Hôte inconnu', picture: '' }, title, location, id, onBooking, titleAs: TitleTag = 'h3', price }) => {

    return (
        <div key={id} className="houseCard">
            <div>
                <TitleTag className="houseCard__title">{title}</TitleTag>
                <p className="houseCard__location">{location}</p>
                {price && <p className="houseCard__price">{price}€ / nuit</p>}
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