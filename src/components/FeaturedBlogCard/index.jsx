import React from 'react';
import { Link } from 'react-router-dom';
import './_featured-blog-card.scss';

const FeaturedBlogCard = ({ article }) => {
    return (
        <div className="featured-blog-card">
                <img src={article.imageUrl} alt={article.title} className="featured-blog-card__image" />
                <div className="featured-blog-card__content">
                    <h3>{article.title}</h3>
                    <p>{article.excerpt}</p>
                    <Link to={`/blog/${article.id}`} className="featured-blog-card__link">Lire la suite</Link>
                </div>
        </div>
    );
};

export default FeaturedBlogCard;
