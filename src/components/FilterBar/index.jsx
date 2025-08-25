import React, { useState, useEffect } from 'react';
import './_filter-bar.scss';

const FilterBar = ({ onFilterChange, allTags }) => {
    const [maxPrice, setMaxPrice] = useState(500);
    const [selectedTag, setSelectedTag] = useState('');

    useEffect(() => {
        onFilterChange({ maxPrice, tag: selectedTag });
    }, [maxPrice, selectedTag, onFilterChange]);

    return (
        <div className="filter-bar">
            <div className="filter-bar__group">
                <label htmlFor="price-filter">Prix maximum : <span>{maxPrice}€</span></label>
                <input
                    type="range"
                    id="price-filter"
                    min="50"
                    max="500"
                    step="10"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="filter-bar__slider"
                />
            </div>
            <div className="filter-bar__group">
                <label>Type de logement :</label>
                <div className="filter-bar__tags">
                    <button 
                        onClick={() => setSelectedTag('')} 
                        className={`filter-bar__tag ${selectedTag === '' ? '-active' : ''}`}>
                        Tous
                    </button>
                    {allTags.map(tag => (
                        <button 
                            key={tag} 
                            onClick={() => setSelectedTag(tag)} 
                            className={`filter-bar__tag ${selectedTag === tag ? '-active' : ''}`}>
                            {tag}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FilterBar;
