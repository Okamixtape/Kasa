import React from 'react';
import './_banner.scss';
import homeBanner from '../../assets/homeBanner.png';
import homeBannerMobile from '../../assets/homeBanner-mobile.png';
import aboutBanner from '../../assets/aboutBanner.png';
import aboutBannerMobile from '../../assets/aboutBanner-mobile.png';

const Banner = ({ banner, title }) => {
    const bannerImage = banner === 'homeBanner' ? homeBanner : aboutBanner;
    const bannerImageMobile = banner === 'homeBanner' ? homeBannerMobile : aboutBannerMobile;

    if (banner === 'homeBanner') {
        return (
            <div className="banner -hero">
                <img 
                    className="banner__image" 
                    src={bannerImage} 
                    srcSet={`${bannerImageMobile} 768w, ${bannerImage} 1280w`}
                    sizes="(max-width: 768px) 100vw, 1280px"
                    alt="Intérieur d'un appartement lumineux" 
                />
                <div className="banner__mask"></div>
                <div className="hero-content">
                    <h1>Chez vous, partout et ailleurs</h1>
                    <p>Découvrez plus de 500 logements de qualité vérifiés</p>
                    <div className="trust-indicators">
                        ⭐ 4.8/5 • 🏠 500+ logements • ✅ 100% vérifiés
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="banner">
            <img 
                className="banner__image" 
                src={bannerImage} 
                srcSet={`${bannerImageMobile} 768w, ${bannerImage} 1280w`}
                sizes="(max-width: 768px) 100vw, 1280px"
                alt="Bannière de Kasa" 
            />
            <h1 className="banner__text">{title}</h1>
        </div>
    );
};

export default Banner;