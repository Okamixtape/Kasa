import React from 'react';
import { Helmet } from 'react-helmet-async';
import BlogCard from '../../components/BlogCard';
import { articles } from '../../data/blogArticles';

const BlogIndexPage = () => {
    return (
        <>
            <Helmet>
                <title>Blog - Kasa</title>
                <meta name="description" content="Découvrez nos articles et conseils sur l'investissement immobilier et la location saisonnière." />
            </Helmet>
            <main className="blog-index-page kasa__wrapper fade-in">
                <h1>Notre Blog</h1>
                <p className="blog-intro">Conseils, actualités et inspirations pour les propriétaires et les voyageurs.</p>
                <div className="blog-grid">
                    {articles.map(article => (
                        <BlogCard key={article.id} article={article} />
                    ))}
                </div>
            </main>
        </>
    );
};

export default BlogIndexPage;
