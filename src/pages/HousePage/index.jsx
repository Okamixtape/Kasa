import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from '../../components/Header';
import Carousel from '../../components/Carousel';
import HouseCard from '../../components/HouseCard';
import Collapse from '../../components/Collapse';
import ReviewsSection from '../../components/ReviewsSection';
import BookingModal from '../../components/BookingModal';
import Footer from '../../components/Footer';

import data from '../../data/logements.json';
import ErrorPage from '../ErrorPage';

const HousePage = () => {
    const { id } = useParams();
    const houseData = data;
    const house = houseData.find((elt) => elt.id === id);
    const [isModalOpen, setIsModalOpen] = useState(false);

    if (!house) {
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
        <div className="kasa__wrapper fade-in">
            <Helmet>
                <title>{pageTitle}</title>
                <meta name="description" content={pageDescription} />
                <script type="application/ld+json">
                    {JSON.stringify(structuredData)}
                </script>
            </Helmet>
            <Header />
            <Carousel pictures={house.pictures} />
            <HouseCard
                key={house.id}
                title={house.title}
                titleAs="h1" // Use h1 for the house page title
                location={house.location}
                tags={house.tags}
                host={house.host}
                reviews={house.reviews}
                onBooking={() => setIsModalOpen(true)}
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
            <BookingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} house={house} />
            <Footer />
        </div>
    );
};

export default HousePage;
