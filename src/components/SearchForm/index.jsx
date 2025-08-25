import React, { useState, useEffect } from 'react';
import './_search-form.scss';
import { ReactComponent as SearchIcon } from '../../assets/search.svg';

const SearchForm = ({ onFilterChange, allTags }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [maxPrice, setMaxPrice] = useState(500);
    const [selectedTag, setSelectedTag] = useState('');

    useEffect(() => {
        onFilterChange({ searchTerm, maxPrice, tag: selectedTag });
    }, [searchTerm, maxPrice, selectedTag, onFilterChange]);

    const handleClearSearch = () => {
        setSearchTerm('');
    };

    return (
        <div className="search-form-container">
            <div className="search-form__main-filters">
                <div className="search-bar">
                    <SearchIcon className="search-bar__icon" />
                    <input
                        type="text"
                        className="search-bar__input"
                        placeholder="Rechercher une location..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    {searchTerm && (
                        <button type="button" className="search-bar__clear-button" onClick={handleClearSearch}>
                            &times;
                        </button>
                    )}
                </div>
                <div className="filter-group">
                    <label htmlFor="price-filter">Prix maximum : <span>{maxPrice}€</span></label>
                    <input
                        type="range"
                        id="price-filter"
                        min="50"
                        max="500"
                        step="10"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(Number(e.target.value))}
                        className="filter-slider"
                    />
                </div>
            </div>
            <div className="filter-group">
                <label>Type de logement :</label>
                <div className="filter-tags">
                    <button 
                        onClick={() => setSelectedTag('')} 
                        className={`filter-tag ${selectedTag === '' ? '-active' : ''}`}>
                        Tous
                    </button>
                    {allTags.map(tag => (
                        <button 
                            key={tag} 
                            onClick={() => setSelectedTag(tag)} 
                            className={`filter-tag ${selectedTag === tag ? '-active' : ''}`}>
                            {tag}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SearchForm;
