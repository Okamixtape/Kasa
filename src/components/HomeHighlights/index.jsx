import React from 'react';
import HostCTA from '../HostCTA';
import FeaturedBlogCard from '../FeaturedBlogCard';
import './_home-highlights.scss';

const HomeHighlights = ({ featuredArticle }) => {
    return (
        <section className="home-highlights kasa__wrapper">
            <div className="home-highlights__grid">
                <div className="home-highlights__cta-container">
                    <HostCTA />
                </div>
                <div className="home-highlights__blog-container">
                    <FeaturedBlogCard article={featuredArticle} />
                </div>
            </div>
        </section>
    );
};

export default HomeHighlights;
