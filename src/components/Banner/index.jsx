import React, { Component } from "react";
import './_banner.scss';
import homeBanner from "../../assets/homeBanner.png";
import aboutBanner from "../../assets/aboutBanner.png";

class Banner extends Component {
    render() {
        const { banner, title } = this.props;

        const bannerImage = banner === "homeBanner" ? homeBanner : aboutBanner;
        const bannerText = title || (banner === "homeBanner" ? "Chez vous, partout et ailleurs" : "");

        return (
            <div className="banner">
                <img className="banner__image" src={bannerImage} alt="Bannière de Kasa" />
                <div className="banner__mask"></div>
                <h1 className="banner__text">{bannerText}</h1>
            </div>
        );
    }
}

/*
// OLD CODE
class Banner extends Component {
    render() {
        return this.props.banner === "homeBanner" ? (
            <div className="banner">
                <img className="banner__image" src={homeBanner} alt="Bannière de Kasa" />
                <div className="banner__mask"></div>
                <h1 className="banner__text">Chez vous, partout et ailleurs</h1>
            </div>
        ) : (
            <div className="banner">
                <img className="banner__image" src={aboutBanner} alt="Bannière de Kasa" />
                <div className="banner__mask"></div>
                <h1 className="banner__text"></h1>
            </div>
        );
    }
}
*/

export default Banner;