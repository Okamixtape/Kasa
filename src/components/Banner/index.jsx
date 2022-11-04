import React, { Component } from "react";
import homeBanner from "../../assets/homeBanner.png";
import aboutBanner from "../../assets/aboutBanner.png";

class Banner extends Component {
    render() {
        return this.props.banner === "homeBanner" ? (
            <div className="banner">
                <img className="banner__image" src={homeBanner} alt="Bannière de Kasa" />
                <div className="banner__mask"></div>
                <p className="banner__text">Chez vous, partout et ailleurs</p>
            </div>
        ) : (
            <div className="banner">
                <img className="banner__image" src={aboutBanner} alt="Bannière de Kasa" />
                <div className="banner__mask"></div>
                <p className="banner__text"></p>
            </div>
        );
    }
}

export default Banner;