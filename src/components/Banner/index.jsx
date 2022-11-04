import React, { Component } from "react";
import homeBanner from "../../assets/homeBanner.png";

class Banner extends Component {
    render() {
        return (
            <div className="banner">
                <img className="banner__image" src={homeBanner} alt="Bannière de Kasa" />
                <div className="banner__mask"></div>
                <p className="banner__text">Chez vous, partout et ailleurs</p>
            </div>
        );
    }
}

export default Banner;