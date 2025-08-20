import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Banner from '../../components/Banner';
import Gallery from '../../components/Gallery';
import allHouseData from '../../data/logements.json';
import Footer from '../../components/Footer';
import SearchBar from '../../components/SearchBar';
import useDebounce from '../../hooks/useDebounce';
import BackToTopButton from '../../components/BackToTopButton';

const HomePage = () => {
    const [searchTerm, setSearchTerm] = useState('');
        const debouncedSearchTerm = useDebounce(searchTerm, 500);
    const [filteredData, setFilteredData] = useState(allHouseData);

    useEffect(() => {
        const filtered = allHouseData.filter(house => {
            const term = debouncedSearchTerm.toLowerCase();
            const titleMatch = house.title.toLowerCase().includes(term);
            const locationMatch = house.location.toLowerCase().includes(term);
            return titleMatch || locationMatch;
        });
        setFilteredData(filtered);
    }, [debouncedSearchTerm]);

    return (
        <div className="kasa__wrapper fade-in">
            <Header />
            <Banner banner="homeBanner" />
            <SearchBar onSearch={setSearchTerm} />
                        <div role="status" aria-live="polite" className="visually-hidden">
                {debouncedSearchTerm && `${filteredData.length} résultats trouvés`}
            </div>
            <Gallery filteredData={filteredData} />
            <Footer />
            <BackToTopButton />
        </div>
    );
};

export default HomePage;