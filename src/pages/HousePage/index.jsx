import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Carousel from '../../components/Carousel';
import HouseCard from '../../components/HouseCard';
import Collapse from '../../components/Collapse';
import ReviewsSection from '../../components/ReviewsSection';
import BookingWidget from '../../components/BookingWidget';
import ErrorPage from '../ErrorPage';

const HousePage = () => {
    const { id } = useParams();
    const [house, setHouse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        setLoading(true);
        setError(false);
        fetch(`http://localhost:3001/api/logements/${id}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('House not found');
                }
                return response.json();
            })
            .then(data => {
                setHouse(data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Failed to fetch house data:', err);
                setError(true);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error || !house) {
        return <ErrorPage />;
    }

    const pageTitle = `${house.title} - Kasa`;
    const pageDescription = `Découvrez ce logement d'exception : ${house.title}, situé à ${house.location}. Profitez d'un séjour inoubliable.`;

    const structuredData = {
        '@context': 'https://schema.org',
        '@type': 'LodgingBusiness',
        name: house.title,
        description: house.description,
        image: house.pictures,
        address: {
            '@type': 'PostalAddress',
            addressLocality: house.location.split(' - ')[1] || house.location,
            addressCountry: 'FR',
        },
        starRating: {
            '@type': 'Rating',
            ratingValue: house.rating,
        },
    };

    return (
        <>
            <Helmet>
                <title>{pageTitle}</title>
                <meta name="description" content={pageDescription} />
                <script type="application/ld+json">
                    {JSON.stringify(structuredData)}
                </script>
            </Helmet>
            <main className="kasa__wrapper fade-in">
                <Carousel pictures={house.pictures} />
                <HouseCard
                    key={house.id}
                    title={house.title}
                    titleAs="h1" // Use h1 for the house page title
                    location={house.location}
                    tags={house.tags}
                    host={house.host}
                    reviews={house.reviews}
                />
                <div className="collapse__wrapper -housePage">
                    <Collapse
                        key="Description"
                        title="Description"
                        text={house.description}
                    />
                    <Collapse
                        key="Équipements"
                        title="Équipements"
                        text={house.equipments}
                    />
                </div>
                <ReviewsSection reviews={house.reviews} />
                <BookingWidget houseId={house.id} />
            </main>
        </>
    );
};

export default HousePage;
