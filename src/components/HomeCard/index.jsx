import React, { Component } from "react";
import { NavLink } from "react-router-dom";

export class HomeCard extends Component {
    render() {
        return (
            <div className="homeCard">
                <NavLink to={"/house/" + this.props.id}>
                    <div className="homeCard__background"></div>
                    <img className="homeCard__image" src={this.props.img} alt="Logement" />
                    <p className="homeCard__text">{this.props.title}</p>
                </NavLink>
            </div>
        );
    }
}

export default HomeCard;