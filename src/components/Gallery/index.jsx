import React, { Component } from "react";
import Card from "../Card/index";
import data from "../../data/logements.json";

export class Gallery extends Component {
    render() {
        const housingData = data;

        return (
            <div className="gallery">
                {housingData.map((housing) => (
                    <Card
                        key={housing.id}
                        id={housing.id}
                        img={housing.cover}
                        title={housing.title}
                    />
                ))}
            </div>
        );
    }
}

export default Gallery;