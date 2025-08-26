import React, { useState, useEffect } from 'react';
import './_search-form.scss';

const SearchForm = ({ onFilterChange }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [maxPrice, setMaxPrice] = useState(500);
    const [isFiltersVisible, setIsFiltersVisible] = useState(false);
    const [activeFilters, setActiveFilters] = useState({
        quartier: [],
        type: [],
        commodite: []
    });

    const tagCategories = {
        'Quartiers': ['Batignolles', 'Montmartre', 'Canal Saint Martin', 'République'],
        'Type de logement': ['Appartement', 'Studio', 'Loft', 'Maison'],
        'Commodités': ['Proche métros', 'Commerces', 'Culture', 'Nature']
    };

    useEffect(() => {
        onFilterChange({ searchTerm, maxPrice, filters: activeFilters });
    }, [searchTerm, maxPrice, activeFilters, onFilterChange]);

    const handleTagClick = (category, tag) => {
        const lowerCaseCategory = category.toLowerCase().replace(' de logement', '').replace('s', '');
        setActiveFilters(prevFilters => {
            const currentCategoryFilters = prevFilters[lowerCaseCategory] || [];
            const newCategoryFilters = currentCategoryFilters.includes(tag)
                ? currentCategoryFilters.filter(t => t !== tag)
                : [...currentCategoryFilters, tag];
            return { ...prevFilters, [lowerCaseCategory]: newCategoryFilters };
        });
    };

    return (
        <div className="search-section">
            <div className="search-bar">
                <input 
                    type="text" 
                    className="search-input" 
                    placeholder="Rechercher une location..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="price-range">
                    <span>Prix max:</span>
                    <input 
                        type="number" 
                        className="price-input" 
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                    />
                    <span>€</span>
                </div>
                <button className="toggle-filters" onClick={() => setIsFiltersVisible(!isFiltersVisible)}>
                    <span>Filtres</span>
                    <span>{isFiltersVisible ? '▲' : '▼'}</span>
                </button>
            </div>

            <div className={`filters-container ${isFiltersVisible ? 'active' : ''}`}>
                <div className="filters-grid">
                    {Object.entries(tagCategories).map(([category, tags]) => (
                        <div key={category} className="filter-group">
                            <h4>{category}</h4>
                            <div className="filter-tags">
                                {tags.map(tag => {
                                    const lowerCaseCategory = category.toLowerCase().replace(' de logement', '').replace('s', '');
                                    const isActive = activeFilters[lowerCaseCategory]?.includes(tag);
                                    return (
                                        <span 
                                            key={tag} 
                                            className={`filter-tag ${isActive ? 'active' : ''}`}
                                            onClick={() => handleTagClick(category, tag)}
                                        >
                                            {tag}
                                        </span>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SearchForm;
