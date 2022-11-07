import React, { Component } from "react";
import { NavLink } from "react-router-dom";

export class Card extends Component {
    render() {
        return (
            <div className="card">
                <NavLink to={"/" + this.props.id}>
                    <div className="card__background"></div>
                    <img className="card__image" src={this.props.img} alt="Logement" />
                    <p className="card__text">{this.props.title}</p>
                </NavLink>
            </div>
        );
    }
}

export default Card;