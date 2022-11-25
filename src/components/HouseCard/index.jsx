import React, { Component } from "react";

import Rating from "../Rating";

export class HouseCard extends Component {
    render() {
        const tags = this.props.tags;

    return (
        <div key={this.props.id} className="houseCard">
            <div>
                <h3 className="houseCard__title">{this.props.title}</h3>
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
                    <Rating rating={this.props.rating} />
                </div>
            </div>
        </div>
        );
    }
}

export default HouseCard;