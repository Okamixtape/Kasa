import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, Navigate } from 'react-router-dom';
import { articles } from '../../data/blogArticles';
import '../../style/pages/_blog-post-page.scss';

const BlogPostPage = () => {
    const { id } = useParams();
    const article = articles.find(a => a.id === id);

    if (!article) {
        return <Navigate to="/404" />;
    }

    return (
        <main className="blog-post-page container fade-in">
            <Helmet>
                <title>{`${article.title} - Kasa`}</title>
                <meta name="description" content={article.excerpt} />
            </Helmet>
            <article className="blog-post">
                <img src={article.imageUrl} alt={article.title} className="post-banner" />
                <h1>{article.title}</h1>
                <div className="post-meta">
                    <span>Par {article.author}</span>
                    <span>{article.date}</span>
                </div>
                <p className="post-intro">{article.intro}</p>
                
                <div className="post-content">
                    {article.content.map((item, index) => {
                        if (item.type === 'h2') {
                            return <h2 key={index}>{item.text}</h2>;
                        }
                        return <p key={index}>{item.text}</p>;
                    })}
                </div>

                <p className="post-conclusion">{article.conclusion}</p>
            </article>
        </main>
    );
};

export default BlogPostPage;
