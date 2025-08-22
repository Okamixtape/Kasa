import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Banner from '../../components/Banner';
import Gallery from '../../components/Gallery';
import SearchBar from '../../components/SearchBar';
import useDebounce from '../../hooks/useDebounce';
import BackToTopButton from '../../components/BackToTopButton';
import FeaturedBlogCard from '../../components/FeaturedBlogCard';
import HostCTA from '../../components/HostCTA';

const HomePage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const debouncedSearchTerm = useDebounce(searchTerm, 500);
    const [allHouseData, setAllHouseData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3001/api/logements')
            .then(response => response.json())
            .then(data => {
                setAllHouseData(data);
                setFilteredData(data);
            })
            .catch(error => console.error('Error fetching housing data:', error));
    }, []);

    useEffect(() => {
        const filtered = allHouseData.filter(house => {
            const term = debouncedSearchTerm.toLowerCase();
            const titleMatch = house.title.toLowerCase().includes(term);
            const locationMatch = house.location.toLowerCase().includes(term);
            return titleMatch || locationMatch;
        });
        setFilteredData(filtered);
    }, [debouncedSearchTerm, allHouseData]);

    const featuredArticle = {
        id: 'pourquoi-investir-immobilier-locatif',
        title: 'Pourquoi investir dans l’immobilier locatif en 2024 ?',
        excerpt: 'Découvrez les raisons pour lesquelles l’investissement locatif reste une valeur sûre et comment Kasa peut vous accompagner dans votre projet.',
        imageUrl: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
    };

    return (
        <>
            <Helmet>
                <title>Kasa - Location d&apos;appartements entre particuliers</title>
                <meta
                    name="description"
                    content="Trouvez le logement de vos rêves avec Kasa. Nous proposons des appartements de qualité, vérifiés par nos soins, pour un séjour inoubliable."
                />
            </Helmet>
            <main className="kasa__wrapper fade-in">
                <Banner banner="homeBanner" />
                <SearchBar onSearch={setSearchTerm} />
                <div role="status" aria-live="polite" className="visually-hidden">
                    {debouncedSearchTerm && `${filteredData.length} résultats trouvés`}
                </div>
                <Gallery filteredData={filteredData} />
                <HostCTA />
                <FeaturedBlogCard article={featuredArticle} />
            </main>
            <BackToTopButton />
        </>
    );
};

export default HomePage;