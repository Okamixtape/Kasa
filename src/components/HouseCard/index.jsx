import React, { Component } from "react";

import AverageRating from "../AverageRating";

export class HouseCard extends Component {
    render() {
        const { tags, titleAs: TitleTag = 'h3' } = this.props;

    return (
        <div key={this.props.id} className="houseCard">
            <div>
                <TitleTag className="houseCard__title">{this.props.title}</TitleTag>
                <p className="houseCard__location">{this.props.location}</p>
                <div className="houseCard__tags">
                    {tags.map((tag) => (
                    <p className="houseCard__tag" key={tag}>{tag}</p>
                    ))}
                </div>
            </div>
            <div className="houseCard__hostWrapper">
                <div className="houseCard__host">
                    <p className="houseCard__name">
                    {this.props.host.name.split(" ")[0]} <br />
                    {this.props.host.name.split(" ")[1]}
                    </p>
                    <img
                    className="houseCard__picture"
                    src={this.props.host.picture}
                    alt="utilisateur"
                    />
                </div>
                <div className="menuhome__rating">
                    <AverageRating reviews={this.props.reviews} />
                </div>
                <button className="houseCard__booking-button" onClick={this.props.onBooking}>Réserver</button>
            </div>
        </div>
        );
    }
}

export default HouseCard;