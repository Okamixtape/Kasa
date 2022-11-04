import React, { Component } from "react";
import image from "../../assets/homeBanner.png";

export class Card extends Component {
    render() {
        return (
            <div className="card">
                <img className="card__image" src={ image } alt="Logement" />
                <p className="card__text">Titre de la location</p>
            </div>
        );
    }
}

export default Card;