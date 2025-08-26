import React, { useState, useEffect } from 'react';
import Meta from '../../components/Meta';
import Gallery from '../../components/Gallery';
import SearchForm from '../../components/SearchForm';
import BackToTopButton from '../../components/BackToTopButton';
import GlobalMap from '../../components/GlobalMap';
import './_home-page.scss';

const HomePage = () => {
    const [allHouseData, setAllHouseData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [viewMode, setViewMode] = useState('list');
    const [filters, setFilters] = useState({
        searchTerm: '',
        maxPrice: 500,
        filters: { quartier: [], type: [], commodite: [] }
    });
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
                headers: { 'Authorization': `Bearer ${token}` },
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
        const applyFilters = () => {
            const filtered = allHouseData.filter(house => {
                const { searchTerm, maxPrice, filters: activeFilters } = filters;

                const term = searchTerm.toLowerCase();
                const searchMatch = !term || house.title.toLowerCase().includes(term) || house.location.toLowerCase().includes(term);
                const priceMatch = house.price <= maxPrice;

                const tagMatch = Object.entries(activeFilters).every(([category, tags]) => {
                    if (tags.length === 0) return true;
                    return tags.every(tag => house.tags?.includes(tag));
                });

                return searchMatch && priceMatch && tagMatch;
            });
            setFilteredData(filtered);
        };
        applyFilters();
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

    return (
        <>
            <Meta />
            <main className="kasa__wrapper fade-in">
                <div className="container home-page-grid">
                    <section className="hero">
                        <h1>Chez vous, partout et ailleurs</h1>
                        <p>Découvrez plus de 500 logements de qualité vérifiés</p>
                    </section>

                    <SearchForm onFilterChange={setFilters} />

                    <div className="results-header">
                        <div className="view-toggle">
                            <button 
                                className={`view-toggle__button ${viewMode === 'list' ? 'active' : ''}`}
                                onClick={() => setViewMode('list')}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
                                <span>Liste</span>
                            </button>
                            <button 
                                className={`view-toggle__button ${viewMode === 'map' ? 'active' : ''}`}
                                onClick={() => setViewMode('map')}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"></polygon><line x1="8" y1="2" x2="8" y2="18"></line><line x1="16" y1="6" x2="16" y2="22"></line></svg>
                                <span>Carte</span>
                            </button>
                        </div>
                        <div className="results-info">
                            <div className="results-count">
                                {filteredData.length} logement{filteredData.length > 1 ? 's' : ''} trouvé{filteredData.length > 1 ? 's' : ''}
                            </div>
                        </div>
                    </div>

                    <div className={`properties-grid view-section ${viewMode === 'list' ? 'visible' : ''}`}>
                        <Gallery filteredData={filteredData} favorites={favorites} onToggleFavorite={handleToggleFavorite} />
                    </div>

                    <div className={`map-container view-section ${viewMode === 'map' ? 'visible' : ''}`}>
                        <div className="map-header">
                            <div className="map-title">Localisation des logements</div>
                            <div className="map-subtitle">Carte des logements</div>
                        </div>
                        <GlobalMap logements={filteredData} />
                    </div>
                </div>
            </main>
            <BackToTopButton />
        </>
    );
};

export default HomePage;