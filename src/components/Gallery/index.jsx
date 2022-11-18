import React, { Component } from "react";
import HomeCard from "../HomeCard";
import data from "../../data/logements.json";

export class Gallery extends Component {
    render() {
        const houseData = data;

        return (
            <div className="gallery">
                {houseData.map((house) => (
                    <HomeCard
                        key={house.id}
                        id={house.id}
                        img={house.cover}
                        title={house.title}
                    />
                ))}
            </div>
        );
    }
}

export default Gallery;