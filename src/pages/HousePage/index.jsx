import React, { Component } from "react";
import Header from "../../components/Header";
import HouseCard from "../../components/HouseCard";
import Collapse from "../../components/Collapse";
import Footer from "../../components/Footer";

import data from "../../data/logements.json";
import ErrorPage from "../ErrorPage";

export class HousePage extends Component {
    render() {
        const houseData = data;
        const id = window.location.pathname.substr(7);
    
        const house = houseData.find((elt) => elt.id === id);
    
    return house === undefined ? (
        <ErrorPage />
        ) : (
        <div className="kasa__wrapper">
            <Header />
            <HouseCard
                key={house.id}
                title={house.title}
                location={house.location}
                tags={house.tags}
                rating={house.rating}
                host={house.host}
            />
            <div className="collapse__wrapper">
                <Collapse key="Description" title="Description" text={house.description} />
                <Collapse key="Équipements" title="Équipements" text={house.equipments} />
            </div>
            <Footer />
        </div>
        );
    }
}

export default HousePage;