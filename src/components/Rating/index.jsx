import React, { Component } from "react";
import { ReactComponent as Star } from "../../assets/star.svg";

export class Rating extends Component {
    
    render() {
        const stars = [];
        let color = "";
        const ratingNumber = this.props.rating;
        console.log(ratingNumber);

        // On boucle sur le nombre d'étoile à colorier en rouge, le reste sera en gris
        for (let i = 0; i < 5; i++) {
        ratingNumber > i ? (color = "#FF6060") : (color = "#E3E3E3");
        stars.push(<Star fill={color} key={i} />);
        }

        return <div className="houseCard__rating">{stars}</div>;
    }
}

export default Rating;