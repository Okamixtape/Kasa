import React, { Component } from "react";
import './_house-card.scss';

import AverageRating from "../AverageRating";

export class HouseCard extends Component {
    render() {
                const {
            tags = [],
            reviews = [],
            host = { name: 'Hôte inconnu', picture: '' },
            title,
            location,
            id,
            onBooking,
            titleAs: TitleTag = 'h3'
        } = this.props;

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
                <div className="houseCard__hostWrapper">
                    <div className="houseCard__host">
                        <p className="houseCard__name">
                            {hostNameParts[0]} <br />
                            {hostNameParts.slice(1).join(' ')}
                        </p>
                        <img
                            className="houseCard__picture"
                            src={host.picture}
                            alt={`Portrait de ${host.name}`}
                        />
                    </div>
                    <div className="menuhome__rating">
                                                <AverageRating reviews={reviews} />
                    </div>
                    <button className="houseCard__booking-button" onClick={onBooking}>Réserver</button>
                </div>
            </div>
        );
    }
}

export default HouseCard;