import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Meta from '../../components/Meta';
import Collapse from '../../components/Collapse';
import HouseCard from '../../components/HouseCard';
import BackLink from '../../components/BackLink';
import Reviews from '../../components/Reviews';
import Carousel from '../../components/Carousel';
import HouseSidebar from '../../components/HouseSidebar';
import ErrorPage from '../ErrorPage';
import Location from '../../components/Location';
import './_house-page.scss';

const HousePage = () => {
    const { id } = useParams();
    const [house, setHouse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const token = localStorage.getItem('token'); // Get token for review submission

    const handleReviewSubmit = (newReview) => {
        setHouse(prevHouse => ({
            ...prevHouse,
            reviews: [...prevHouse.reviews, newReview]
        }));
    };


    useEffect(() => {
        setLoading(true);
        setError(false);
                fetch(`${process.env.REACT_APP_API_URL}/logements/${id}`)
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
            <Meta title={house.title} description={pageDescription}>
                <script type="application/ld+json">
                    {JSON.stringify(structuredData)}
                </script>
            </Meta>
            <main className="kasa__wrapper fade-in">
                <BackLink />
                <Carousel pictures={house.pictures} title={house.title} />
                <div className="house-page__layout">
                    <div className="house-page__main-content">
                        <HouseCard
                            key={house.id}
                            title={house.title}
                            titleAs="h1"
                            location={house.location}
                            tags={house.tags}
                            host={house.host}
                            reviews={house.reviews}
                            price={house.price}
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
                                text={house.equipments.join(', ')}
                            />
                        </div>
                        <Location logement={house} />
                    </div>
                    <HouseSidebar house={house} />
                </div>
                <Reviews reviews={house.reviews} logementId={house.id} onReviewSubmit={handleReviewSubmit} token={token} />
            </main>
        </>
    );
};

export default HousePage;
