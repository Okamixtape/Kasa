import React from 'react';
import './_banner.scss';
import homeBanner from '../../assets/homeBanner.png';
import aboutBanner from '../../assets/aboutBanner.png';
import SearchBar from '../SearchBar'; // Assuming we'll reuse and adapt SearchBar

const Banner = ({ banner, title, onSearch }) => {
    const bannerImage = banner === 'homeBanner' ? homeBanner : aboutBanner;

    if (banner === 'homeBanner') {
        return (
            <div className="banner -hero">
                <img className="banner__image" src={bannerImage} alt="Intérieur d'un appartement lumineux" />
                <div className="banner__mask"></div>
                <div className="hero-content">
                    <h1>Chez vous, partout et ailleurs</h1>
                    <p>Découvrez plus de 500 logements de qualité vérifiés</p>
                    <SearchBar onSearch={onSearch} />
                    <div className="trust-indicators">
                        ⭐ 4.8/5 • 🏠 500+ logements • ✅ 100% vérifiés
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="banner">
            <img className="banner__image" src={bannerImage} alt="Bannière de Kasa" />
            <h1 className="banner__text">{title}</h1>
        </div>
    );
};

export default Banner;