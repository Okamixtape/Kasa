import React, { useState, useEffect } from 'react';
import Meta from '../../components/Meta';
import Banner from '../../components/Banner';
import Gallery from '../../components/Gallery';
import SearchForm from '../../components/SearchForm';
import useDebounce from '../../hooks/useDebounce';
import BackToTopButton from '../../components/BackToTopButton';
import HomeHighlights from '../../components/HomeHighlights';
import GlobalMap from '../../components/GlobalMap';

const HomePage = () => {
    const [allHouseData, setAllHouseData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [filters, setFilters] = useState({ searchTerm: '', maxPrice: 500, tag: '' });
    const debouncedSearchTerm = useDebounce(filters.searchTerm, 500);
    const [favorites, setFavorites] = useState(new Set());
    const token = localStorage.getItem('token');

    useEffect(() => {
                fetch(`${process.env.REACT_APP_API_URL}/logements`)
            .then(response => response.json())
            .then(data => {
                setAllHouseData(data);
                setFilteredData(data);
            })
            .catch(error => console.error('Error fetching housing data:', error));

        if (token) {
                        fetch(`${process.env.REACT_APP_API_URL}/me/favorites`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            })
            .then(response => response.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setFavorites(new Set(data.map(fav => fav.id)));
                }
            })
            .catch(error => console.error('Error fetching favorites:', error));
        }
    }, [token]);

    useEffect(() => {
        const filtered = allHouseData.filter(house => {
            const term = filters.searchTerm.toLowerCase();
            const titleMatch = house.title.toLowerCase().includes(term);
            const locationMatch = house.location.toLowerCase().includes(term);
            const searchMatch = titleMatch || locationMatch;

            const priceMatch = house.price <= filters.maxPrice;
            const tagMatch = filters.tag ? house.tags && house.tags.includes(filters.tag) : true;

            return searchMatch && priceMatch && tagMatch;
        });
        setFilteredData(filtered);
    }, [filters, allHouseData]);

    const handleToggleFavorite = (logementId, isFavorite) => {
        const newFavorites = new Set(favorites);
        if (isFavorite) {
            newFavorites.add(logementId);
        } else {
            newFavorites.delete(logementId);
        }
        setFavorites(newFavorites);
    };

    const allTags = [...new Set(allHouseData.flatMap(house => house.tags || []))];

    const featuredArticle = {
        id: 'pourquoi-investir-immobilier-locatif',
        title: 'Pourquoi investir dans l’immobilier locatif en 2024 ?',
        excerpt: 'Découvrez les raisons pour lesquelles l’investissement locatif reste une valeur sûre et comment Kasa peut vous accompagner dans votre projet.',
        imageUrl: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
    };

    return (
        <>
            <Meta />
            <main className="kasa__wrapper fade-in">
                <Banner banner="homeBanner" />
                <SearchForm onFilterChange={setFilters} allTags={allTags} />
                <div role="status" aria-live="polite" className="visually-hidden">
                    {debouncedSearchTerm && `${filteredData.length} résultats trouvés`}
                </div>
                                <section className="global-map-container">
                    <h2 className="global-map-title">Découvrez nos logements sur la carte</h2>
                    <GlobalMap logements={filteredData} />
                </section>
                <HomeHighlights featuredArticle={featuredArticle} />
                <Gallery filteredData={filteredData} favorites={favorites} onToggleFavorite={handleToggleFavorite} />
            </main>
            <BackToTopButton />
        </>
    );
};

export default HomePage;