import React from 'react';
import './_house-card.scss';
import whiteLogo from '../../assets/whiteLogo.png';

const HouseCard = ({ cover, tags = [], reviews = [], host = { name: 'Hôte inconnu', picture: '' }, title, location, id, onBooking, titleAs: TitleTag = 'h3', price }) => {

    return (
        <div key={id} className="houseCard">
            {cover && <img src={cover} alt={title} className="houseCard__cover" />}
            {!cover && (
                <div className="houseCard__placeholder">
                    <img src={whiteLogo} alt="Kasa Logo" className="houseCard__placeholder-logo" />
                </div>
            )}
            <div className="houseCard__content">
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