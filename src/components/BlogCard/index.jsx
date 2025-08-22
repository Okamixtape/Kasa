import React from 'react';
import { Link } from 'react-router-dom';

const BlogCard = ({ article }) => {
    return (
        <Link to={`/blog/${article.id}`} className="blog-card">
            <img src={article.imageUrl} alt={article.title} className="blog-card__image" />
            <div className="blog-card__content">
                <h3 className="blog-card__title">{article.title}</h3>
                <p className="blog-card__excerpt">{article.excerpt}</p>
                <div className="blog-card__footer">
                    <span>Par {article.author}</span>
                    <span>{article.date}</span>
                </div>
            </div>
        </Link>
    );
};

export default BlogCard;
